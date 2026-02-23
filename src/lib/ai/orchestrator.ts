import { openai, ASSISTANT_SYSTEM_PROMPT } from '@/lib/openai';
import { tools, handleToolCall } from '@/lib/tools';
import { redactPII, validateResponse, detectPromptInjection, logAudit } from '@/lib/security';
import { RagService } from './rag-service';
import { funnelMachine } from './funnel-machine';
import Redis from 'ioredis';

// 🔥 V4 SALES PSYCHOLOGY IMPORTS (MANDATORY)
import { analyzeSentiment, shouldSendAutomatedMessage } from './sentiment-guard';
import { queueDelayedResponse } from './delayed-queue';
const MAX_SESSION_COST = 1.50; // USD

// Lazy Redis client - only connects when actually used, not during build
let redisClient: Redis | null = null;
let redisInitAttempted = false;

const getRedis = () => {
    // Return cached client if already initialized
    if (redisInitAttempted) return redisClient;

    // Skip Redis during build phase or if URL is missing
    if (!process.env.REDIS_URL) {
        console.warn('[REDIS] REDIS_URL not set. Redis features disabled.');
        redisInitAttempted = true;
        return null;
    }

    // Prevent connection during Vercel build (NODE_ENV might be 'production' during build)
    if (typeof window === 'undefined' && !process.env.REDIS_URL.startsWith('redis://')) {
        console.warn('[REDIS] Invalid REDIS_URL format. Skipping connection.');
        redisInitAttempted = true;
        return null;
    }

    try {
        console.log('[REDIS] Initializing lazy connection...');
        redisClient = new Redis(process.env.REDIS_URL, {
            lazyConnect: true, // Don't connect immediately
            retryStrategy: (times) => {
                if (times > 3) return null; // Stop retrying after 3 attempts
                return Math.min(times * 200, 2000); // Exponential backoff
            }
        });

        redisClient.on('error', (err) => {
            console.error('[REDIS] Connection error:', err.message);
        });

        redisClient.on('connect', () => {
            console.log('[REDIS] Connected successfully');
        });

        redisInitAttempted = true;
        return redisClient;
    } catch (error: any) {
        console.error('[REDIS] Initialization failed:', error.message);
        redisInitAttempted = true;
        return null;
    }
};

export const dynamic = 'force-dynamic';

export interface AuraResponse {
    message: {
        role: string;
        content: string;
    };
    analysis?: any;
    handover?: boolean;
    error?: string;
    context?: any;
}

export class AiOrchestrator {

    /**
     * Processes a message from any source and returns the AI's response.
     */
    static async processMessage(
        userId: string,
        messages: any[],
        imageData?: string,
        source: 'web' | 'whatsapp' | 'instagram' | 'telegram' = 'web',
        language: string = 'auto',
        refCode?: string
    ): Promise<AuraResponse> {
        try {
            // 1. TOKEN CIRCUIT BREAKER
            const sessionCost = await this.getSessionCost(userId);
            if (sessionCost > MAX_SESSION_COST) {
                console.warn(`[CIRCUIT BREAKER] Session ${userId} exceeded cost limit.`);
                return {
                    message: {
                        role: 'assistant',
                        content: "Sizinle daha detaylı görüşebilmemiz için şu an sizi kıdemli bir uzmanımıza bağlıyorum. Lütfen bekleyin."
                    },
                    handover: true
                };
            }

            // 2. INPUT SECURITY
            const lastMessage = messages[messages.length - 1]?.content || '';
            const isSafe = detectPromptInjection(lastMessage);
            if (!isSafe.safe) {
                return { message: { role: 'assistant', content: "Güvenlik protokolleri gereği bu isteği yerine getiremiyorum." } };
            }

            // 🔥 V4: SENTIMENT SAFETY GUARD (MANDATORY)
            // Check if user is in emotional crisis BEFORE proceeding
            const sentiment = await analyzeSentiment(messages);
            console.log(`[V4 Sentiment Guard] Emotional state: ${sentiment.emotional_state}, Action: ${sentiment.recommended_action}`);

            if (sentiment.recommended_action === 'abort') {
                console.warn(`[V4 Sentiment Guard] ⚠️ CRISIS DETECTED - Aborting automated response`);
                return {
                    message: {
                        role: 'assistant',
                        content: language === 'tr'
                            ? "Sizi anlıyorum. Şu an size bir insan destek uzmanı yönlendiriyorum."
                            : "I understand. I'm connecting you with a human support specialist."
                    },
                    handover: true,
                    context: { sentiment_crisis: true, reasoning: sentiment.reasoning }
                };
            }

            if (sentiment.recommended_action === 'delay_3days') {
                console.warn(`[V4 Sentiment Guard] 💔 Grief detected - Delaying response by 3 days`);
                return {
                    message: {
                        role: 'assistant',
                        content: language === 'tr'
                            ? "Sizi düşünüyoruz. Size uygun bir zamanda tekrar ulaşacağız."
                            : "We're thinking of you. We'll reach out at a better time."
                    },
                    context: { sentiment_delay: true, reasoning: sentiment.reasoning }
                };
            }

            // 3. VISION ANALYSIS (If image provided)
            let visionContext = "";
            if (imageData) {
                console.log(`[ORCHESTRATOR] Processing Vision for user ${userId}`);
                // Simple placeholder or actual call to VisionService
                visionContext = "\n[VISION ANALYSIS]: User uploaded an image. It appears to be related to hair transplantation needs.";
            }

            // 4. RAG RETRIEVAL
            const knowledgeChunks = await RagService.retrieveRelevantChunks(lastMessage, 'default_clinic');
            const knowledgeContext = knowledgeChunks.join('\n');

            // 5. CULTURE & SYSTEM PROMPT ENRICHMENT
            const { getCultureConfig } = require('./culture-matrix');
            // Basic mapping from language to culture code
            let cultureType = 'Global';
            if (language === 'tr') cultureType = 'Turkey';
            if (language === 'ar') cultureType = 'Middle East';
            if (language === 'de') cultureType = 'DACH';
            if (language === 'en') cultureType = 'UK/IE';

            const cultureData = getCultureConfig(cultureType);

            let enrichedPrompt = `${ASSISTANT_SYSTEM_PROMPT}

[KÜLTÜREL VE PSİKOLOJİK PROFİL (CULTURE MATRIX)]:
Hedef Kültür: ${cultureType}
Ton ve Üslup: ${cultureData.tone}
Öncelikler: ${cultureData.priority.join(', ')}

[DİL KURALI]: Kullanıcının yazdığı veya konuştuğu dili otomatik algıla ve MUTLAKA aynı dilde cevap ver.
[BAĞLAM KURALI]: Hasta sesli mesajla veya metinle bir konu belirttiyse (örn: diş implantı, saç ekimi, fiyat) MUTLAKA o konuya özel cevap ver. Asla genel 'nasıl yardımcı olabilirim' sorusu sorma.
[REFERANS KODU]: ${refCode || 'none'}
${visionContext}

[SOURCE OF TRUTH]:
${knowledgeContext}

Strategy: Act as a Closer. Redirect to booking. Use the Culturial Profile heavily.`;

            // 6. VISION INTENT FORCING
            // If an image is present, FORCE the AI to analyze it (prevents "How can I help?" responses)
            let processedMessages = [...messages];

            if (imageData) {
                console.log('👁️ VISION TRIGGERED: Forcing dental analysis intent');

                // Get the last user message
                const lastMessage = processedMessages[processedMessages.length - 1];

                if (lastMessage && lastMessage.role === 'user') {
                    // Override empty or generic messages with explicit analysis instruction
                    let userText = (lastMessage.content as string) || '';

                    if (!userText || userText.trim() === '' || userText.trim().length < 10) {
                        userText = "Lütfen bu diş görselini detaylı analiz et. Çürük, plak, diş eti sorunları ve estetik durumu hakkında profesyonel hekim yorumu yap.";
                    } else {
                        userText = `Görsel ile ilgili soru: ${userText}. (Lütfen görseli bir diş hekimi gözüyle analiz et)`;
                    }

                    // Update the last message with forced intent
                    processedMessages[processedMessages.length - 1] = {
                        ...lastMessage,
                        content: userText
                    };
                }

                // Enhance system prompt for vision
                enrichedPrompt = `${enrichedPrompt}

ÖZEL TALİMAT: Bir diş görseli gönderildi. 
- Görseli profesyonel bir diş hekimi gözüyle analiz et
- Çürük, diş taşı, diş eti çekilmesi, plak veya estetik sorunları tespit et
- ASLA "Nasıl yardımcı olabilirim?" gibi genel sorular sorma
- Doğrudan analizi yap ve bulgularını bildir
- Kısa, net ve ikna edici konuş`;
            }

            // 7. GPT-4o EXECUTION WITH VISION SUPPORT
            // Construct messages array with proper image support for GPT-4o
            const formattedMessages: any[] = [
                { role: 'system', content: enrichedPrompt }
            ];

            // Add conversation history with robust error handling
            try {
                for (let i = 0; i < processedMessages.length; i++) {
                    const msg = processedMessages[i];

                    // If this is the last user message and we have valid imageData, use vision format
                    if (i === processedMessages.length - 1 && msg.role === 'user' && imageData && typeof imageData === 'string') {
                        console.log(`[ORCHESTRATOR] 🔍 DIAGNOSTIC: Image data length: ${imageData.length}, starts with: ${imageData.substring(0, 50)}`);
                        try {
                            // Sanitize image URL - ensure it's a valid HTTP URL or base64
                            const imageUrl = imageData.startsWith('http')
                                ? imageData
                                : `data:image/jpeg;base64,${imageData}`;

                            console.log(`[ORCHESTRATOR] Adding vision to message. URL type: ${imageData.startsWith('http') ? 'HTTP' : 'Base64'}`);

                            formattedMessages.push({
                                role: 'user',
                                content: [
                                    { type: "text", text: msg.content },
                                    {
                                        type: "image_url",
                                        image_url: {
                                            url: imageUrl,
                                            detail: "low" // PERF: 3x faster, sufficient for dental analysis
                                        }
                                    }
                                ]
                            });
                        } catch (imgError: any) {
                            console.error('[ORCHESTRATOR] Image URL construction failed:', imgError.message);
                            // Fallback to text-only if image fails
                            formattedMessages.push({
                                role: msg.role,
                                content: msg.content
                            });
                        }
                    } else {
                        // Standard text message
                        formattedMessages.push({
                            role: msg.role,
                            content: msg.content
                        });
                    }
                }
            } catch (formatError: any) {
                console.error('[ORCHESTRATOR] Message formatting error:', formatError.message);
                // Fallback: use simple text format
                formattedMessages.push(...processedMessages.map(m => ({ role: m.role, content: m.content })));
            }

            console.log(`[ORCHESTRATOR] Calling OpenAI with ${formattedMessages.length} messages, model: gpt-4o-mini`);

            let response = await openai.chat.completions.create({
                model: 'gpt-4o-mini', // PERF: Speed optimization for Vercel timeout limit
                messages: formattedMessages,
                tools: tools as any,
                tool_choice: 'auto',
                temperature: 0.7
            });

            let aiMessage = response.choices[0].message;

            // Usage billing
            const usage = response.usage;
            if (usage) {
                const cost = (usage.prompt_tokens * 5 / 1000000) + (usage.completion_tokens * 15 / 1000000);
                await this.incrementSessionCost(userId, cost);
            }

            // 7. TOOL HANDLING
            while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
                const toolMessages: any[] = [];
                for (const toolCall of aiMessage.tool_calls) {
                    const result = await handleToolCall(toolCall, userId);
                    toolMessages.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(result)
                    });
                }

                const secondaryResponse = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: enrichedPrompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        aiMessage,
                        ...toolMessages
                    ] as any
                });
                aiMessage = secondaryResponse.choices[0].message;
            }

            // 8. OUTPUT GUARDRAIL
            const sanitizedOutput = validateResponse(aiMessage.content || '');
            if (!sanitizedOutput.safe) {
                aiMessage.content = "Sağlık sürecinizle ilgili en doğru bilgiyi uzmanımız size iletecektir.";
            }

            // 🧠 V4: MANAGER APPROVAL SIMULATION (MANDATORY)
            // Detect if AI is responding to price objection
            const aiContent = (aiMessage.content || '').toLowerCase();
            const userContent = lastMessage.toLowerCase();

            const isPriceObjection = (
                userContent.includes('pahalı') ||
                userContent.includes('expensive') ||
                userContent.includes('fiyat') ||
                userContent.includes('price') ||
                userContent.includes('غالي') // Arabic: expensive
            );

            const isOfferingDiscount = (
                aiContent.includes('indirim') ||
                aiContent.includes('discount') ||
                aiContent.includes('taksit') ||
                aiContent.includes('installment') ||
                aiContent.includes('özel') ||
                aiContent.includes('special')
            );

            // If AI is about to offer discount/package, DELAY the response
            // DEMO FIX: Yorum satırına alındı (Serverless ortamda Vercel 10s Timeout patlamaması için)
            /*
            if (isPriceObjection && isOfferingDiscount) {
                console.log('[V4 Manager Approval] 🕐 Price objection detected - Implementing delayed approval');

                // Send immediate "checking with manager" message
                const checkingMessage = language === 'tr'
                    ? "Anlıyorum. Size özel bir paket oluşturabilir miyim diye yöneticime danışıyorum. Lütfen kısa bir süre bekleyin... ⏳"
                    : "I understand. Let me consult with the manager to see if we can create a special package for you. Please wait a moment... ⏳";

                // Queue the actual offer for 45 seconds later
                try {
                    await queueDelayedResponse(
                        userId,
                        'manager_approval',
                        45, // 45 seconds delay
                        aiMessage.content || '',
                        { original_objection: userContent }
                    );

                    console.log('[V4 Manager Approval] ✅ Delayed response queued (45 seconds)');
                } catch (error: any) {
                    console.error('[V4 Manager Approval] Failed to queue delayed response:', error);
                    // Fallback: Send original message immediately if queue fails
                }

                // Return the "checking" message instead of the offer
                return {
                    message: {
                        role: 'assistant',
                        content: checkingMessage
                    },
                    context: {
                        v4_delayed_approval: true,
                        delay_seconds: 45,
                        sentiment: sentiment.emotional_state
                    }
                };
            }
            */

            return {
                message: {
                    role: aiMessage.role,
                    content: aiMessage.content || ''
                },
                context: {
                    sentiment: sentiment.emotional_state,
                    v4_active: true
                }
            };

        } catch (error: any) {
            console.error('[AI ORCHESTRATOR ERROR]', error);
            console.error('❌ OPENAI CRASH DETAILS:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                stack: error.stack?.split('\n').slice(0, 3)
            });

            // 🚨 DEBUG MODE: THROW the error so webhook can catch and display it
            // DO NOT return a polite message - we need to see the real error!
            throw new Error(`Orchestrator Failed: ${error.message || JSON.stringify(error)}`);
        }
    }

    /**
     * Summarizes medical chat history.
     */
    static async generateSummary(userId: string, history: any[]): Promise<string> {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Summarize the medical sales chat history. Focus on patient needs and clinical stage.' },
                { role: 'user', content: JSON.stringify(history) }
            ]
        });
        return response.choices[0].message.content || 'Summary unavailable.';
    }

    private static async getSessionCost(userId: string): Promise<number> {
        try {
            const redis = getRedis();
            if (!redis) return 0;

            // Ensure connection before command
            if (redis.status !== 'ready') {
                await redis.connect().catch(() => null);
            }

            const cost = await redis.get(`cost:${userId}`);
            return cost ? parseFloat(cost) : 0;
        } catch { return 0; }
    }

    private static async incrementSessionCost(userId: string, amount: number): Promise<void> {
        try {
            const redis = getRedis();
            if (!redis) return;

            // Ensure connection before command
            if (redis.status !== 'ready') {
                await redis.connect().catch(() => null);
            }

            await redis.incrbyfloat(`cost:${userId}`, amount);
            await redis.expire(`cost:${userId}`, 3600);
        } catch { }
    }
}
