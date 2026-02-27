import { openai, ASSISTANT_SYSTEM_PROMPT } from '@/lib/openai';
import { tools, handleToolCall } from '@/lib/tools';
import { redactPII, validateResponse, detectPromptInjection, logAudit } from '@/lib/security';
import { RagService } from './rag-service';
import { funnelMachine } from './funnel-machine';
import Redis from 'ioredis';

// 🔥 V4 SALES PSYCHOLOGY IMPORTS (MANDATORY)
import { analyzeSentimentSync, mergeSentimentFromGpt, shouldSendAutomatedMessage } from './sentiment-guard';
import { queueDelayedResponse } from './delayed-queue';
import { getLeadNeuralState } from '@/lib/persistence';
import { calculateLeadScore } from '@/lib/scoring';
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

            // 🔥 V5: SENTIMENT GUARD — senkron keyword scan, sıfır latency, sıfır maliyet
            const sentiment = analyzeSentimentSync(messages);
            console.log(`[Sentiment Guard] State: ${sentiment.emotional_state}, Action: ${sentiment.recommended_action}`);

            // Kriz tespit edildiyse sales mesajını engelle, compassion moduna geç
            if (sentiment.recommended_action !== 'proceed') {
                console.warn(`[Sentiment Guard] 🛑 Crisis mode — halting sales flow for ${userId}`);
                return {
                    message: {
                        role: 'assistant',
                        content: sentiment.crisis_keywords.length > 0
                            ? 'Zor bir dönemden geçtiğinizi anlıyorum. Şu an için en iyi dileklerimi sunarım. Hazır hissettiğinizde buradayım.'
                            : 'I understand you may be going through a difficult time. I\'m here whenever you\'re ready.'
                    },
                    context: { sentiment: sentiment.emotional_state, crisis_halt: true }
                };
            }

            // 🧠 NEURAL CORE v2.0: Strategic Reasoning (PRE-PROCESS)
            const previousNeuralState = await getLeadNeuralState(userId);
            const neuralScoring = calculateLeadScore({
                message: lastMessage,
                treatment: 'Dental', // Default or detected
                lastActivityTimestamp: Date.now()
            }, previousNeuralState || undefined);

            console.log(`[Neural Core] Rank: ${neuralScoring.rank}, Strategy: ${neuralScoring.suggested_strategy}`);

            // 3. VISION ANALYSIS (If image provided)
            let visionContext = "";
            if (imageData) {
                console.log(`[ORCHESTRATOR] Processing Vision for user ${userId}`);
                visionContext = "\n[VISION ANALYSIS]: User uploaded an image. It appears to be related to hair transplantation needs.";
            }

            // 4. RAG RETRIEVAL — tenant-isolated pgvector arama
            const ragTenantId = await (async () => {
                try {
                    const { TenancyService } = await import('@/lib/tenancy');
                    return await TenancyService.resolveTenantId(userId, 'whatsapp');
                } catch {
                    return process.env.AURA_DEFAULT_TENANT || 'unconfigured_tenant';
                }
            })();
            const knowledgeChunks = await RagService.retrieveRelevantChunks(lastMessage, ragTenantId);
            const knowledgeContext = knowledgeChunks.length > 0
                ? knowledgeChunks.join('\n')
                : '[RAG] Bu kiracı için henüz knowledge base kaydı bulunmamaktadır.';

            // 5. CULTURE & SYSTEM PROMPT ENRICHMENT
            const { getCultureConfig } = await import('@/lib/culture-matrix');
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

[DİL KİLİDİ - KESİN KURAL]: 
- Tespit edilen dil: ${language.toUpperCase()}. 
- Kullanıcı hangi dilde yazıyorsa veya konuşuyorsa %100 o dilde cevap verilecektir.
- Eğer kullanıcı Arapça (${language === 'ar' ? 'EVET' : 'HAYIR'}) konuşuyorsa, Türkçe veya İngilizce cevap vermek KESİNLİKLE yasaktır. 
- Sadece ${language.toUpperCase()} klavye ve karakterlerini kullanarak cevap üret.
- "Mış gibi" yapma, o dilin ana dili gibi davran.

[BAĞLAM KURALI]: Hasta konusu: Diş İmplantı / Estetik / Genel.
[REFERANS KODU]: ${refCode || 'none'}
${visionContext}

[SOURCE OF TRUTH]:
${knowledgeContext}

[STRATEGIC INTELLIGENCE PROTOCOL (NEURAL CORE v2.0)]:
- CURRENT RANK: ${neuralScoring.rank}
- SUGGESTED STRATEGY: ${neuralScoring.suggested_strategy}
- NEXT DIAGNOSTIC GOAL: ${neuralScoring.next_diagnostic_question}
- INTENT SCORE: ${neuralScoring.score}/100
- PAIN POINTS CAPTURED: ${neuralScoring.pain_point_vault.join(', ') || 'None yet'}

[INSTRUCTIONS]:
1. You MUST follow the SUGGESTED STRATEGY and NEXT DIAGNOSTIC GOAL.
2. Act as a high-authority Sales Closer / Consultant.
3. Respond in valid JSON format with EXACTLY these fields:
   - "neural_score": number (use ${neuralScoring.score} as base)
   - "suggested_rank": "${neuralScoring.rank}"
   - "intent_analysis": string (internal brief of user psychology)
   - "response": string (your empathetic, strategic message in ${language.toUpperCase()})
   - "sentiment": object with { "score": number (-1 to 1), "emotional_state": "neutral"|"positive"|"negative"|"crisis" }
   - "crisis_alert": boolean (true ONLY if user message contains signs of grief, death, serious illness, or emotional breakdown)
4. NEVER expose internal fields in the "response" field — it goes directly to the patient.`;

            // 6. VISION INTENT FORCING
            let processedMessages = [...messages];

            if (imageData) {
                console.log('👁️ VISION TRIGGERED: Forcing dental analysis intent');
                const lastMsg = processedMessages[processedMessages.length - 1];

                if (lastMsg && lastMsg.role === 'user') {
                    let userText = (lastMsg.content as string) || '';
                    if (!userText || userText.trim() === '' || userText.trim().length < 10) {
                        userText = "Lütfen bu diş görselini detaylı analiz et. Çürük, plak, diş eti sorunları ve estetik durumu hakkında profesyonel hekim yorumu yap.";
                    } else {
                        userText = `Görsel ile ilgili soru: ${userText}. (Lütfen görseli bir diş hekimi gözüyle analiz et)`;
                    }
                    processedMessages[processedMessages.length - 1] = { ...lastMsg, content: userText };
                }

                enrichedPrompt = `${enrichedPrompt}

ÖZEL TALİMAT: Bir diş görseli gönderildi. 
- Görseli profesyonel bir diş hekimi gözüyle analiz et
- Çürük, diş taşı, diş eti çekilmesi, plak veya estetik sorunları tespit et
- ASLA "Nasıl yardımcı olabilirim?" gibi genel sorular sorma
- Doğrudan analizi yap ve bulgularını bildir
- Kısa, net ve ikna edici konuş
- Still return JSON format.`;
            }

            // 7. GPT-4o EXECUTION WITH VISION SUPPORT
            const formattedMessages: any[] = [{ role: 'system', content: enrichedPrompt }];
            for (let i = 0; i < processedMessages.length; i++) {
                const msg = processedMessages[i];
                if (i === processedMessages.length - 1 && msg.role === 'user' && imageData) {
                    const imageUrl = imageData.startsWith('http') ? imageData : `data:image/jpeg;base64,${imageData}`;
                    formattedMessages.push({
                        role: 'user',
                        content: [
                            { type: "text", text: msg.content },
                            { type: "image_url", image_url: { url: imageUrl, detail: "low" } }
                        ]
                    });
                } else {
                    formattedMessages.push({ role: msg.role, content: msg.content });
                }
            }

            console.log(`[ORCHESTRATOR] Calling OpenAI, model: gpt-4o-mini`);

            let response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: formattedMessages,
                tools: tools as any,
                tool_choice: 'auto',
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            let aiMessage = response.choices[0].message;

            if (response.usage) {
                const cost = (response.usage.prompt_tokens * 5 / 1000000) + (response.usage.completion_tokens * 15 / 1000000);
                await this.incrementSessionCost(userId, cost);
            }

            // 7. TOOL HANDLING
            while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
                const toolMessages: any[] = [];
                for (const toolCall of aiMessage.tool_calls) {
                    const result = await handleToolCall(toolCall, userId);
                    toolMessages.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify(result) });
                }

                const secondaryResponse = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: enrichedPrompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        aiMessage,
                        ...toolMessages
                    ] as any,
                    response_format: { type: "json_object" }
                });
                aiMessage = secondaryResponse.choices[0].message;
            }

            // NEURAL PARSING - Robust Extraction
            let finalAnalysis: any = {};
            try {
                // Protect against "Markdown Prison" or AI prepending text
                const extractJSON = (text: string) => {
                    const start = text.indexOf('{');
                    const end = text.lastIndexOf('}');
                    if (start === -1 || end === -1) return text;
                    return text.substring(start, end + 1);
                };

                const cleanContent = extractJSON(aiMessage.content || '{}');
                finalAnalysis = JSON.parse(cleanContent);
                aiMessage.content = finalAnalysis.response || aiMessage.content;

                // GPT sentiment ile keyword sentimenti merge et
                const mergedSentiment = mergeSentimentFromGpt(sentiment, {
                    score: finalAnalysis.sentiment?.score,
                    emotional_state: finalAnalysis.sentiment?.emotional_state,
                    crisis_alert: finalAnalysis.crisis_alert
                });

                // Geç tespit edilen kriz — DB'ye kayıt yalnızca, mesaj gönderilmez
                if (mergedSentiment.recommended_action !== 'proceed') {
                    console.warn(`[Orchestrator] Late crisis flag from GPT for ${userId}`);
                    return {
                        message: { role: 'assistant', content: finalAnalysis.response || '' },
                        context: { sentiment: mergedSentiment.emotional_state, crisis_halt: true, v4_active: true }
                    };
                }

                if (finalAnalysis.neural_score !== undefined) {
                    const { getLeadByPhone, addLead } = await import('@/lib/leads');
                    // tenantId'yi userId üzerinden çözüyoruz (source bilinmiyor burada, 'web' varsayılan)
                    const { TenancyService } = await import('@/lib/tenancy');
                    const tenantId = await TenancyService.resolveTenantId(userId, 'whatsapp').catch(() => null);

                    if (tenantId) {
                        const lead = await getLeadByPhone(userId, tenantId);
                        if (lead) {
                            await addLead({
                                ...lead,
                                last_message: lastMessage,
                                summary: finalAnalysis.intent_analysis || lead.summary,
                                last_message_at: new Date().toISOString()
                            });
                            console.log(`[Neural CRM] Lead ${userId} synced. Sentiment: ${mergedSentiment.emotional_state}`);
                        }
                    }
                }
            } catch (e) {
                console.error("[Orchestrator] JSON Parse Error:", e);
            }

            const sanitizedOutput = validateResponse(aiMessage.content || '');
            if (!sanitizedOutput.safe) {
                aiMessage.content = "Sağlık sürecinizle ilgili en doğru bilgiyi uzmanımız size iletecektir.";
            }

            return {
                message: { role: aiMessage.role, content: aiMessage.content || '' },
                analysis: finalAnalysis,
                context: {
                    sentiment: finalAnalysis.sentiment?.emotional_state ?? sentiment.emotional_state,
                    crisis_alert: finalAnalysis.crisis_alert ?? false,
                    v5_active: true,
                    neural_metrics: {
                        score: finalAnalysis.neural_score,
                        rank: finalAnalysis.suggested_rank
                    }
                }
            };

        } catch (error: any) {
            console.error('[AI ORCHESTRATOR ERROR]', error);
            throw new Error(`Orchestrator Failed: ${error.message || JSON.stringify(error)}`);
        }
    }

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
            if (redis.status !== 'ready') await redis.connect().catch(() => null);
            const cost = await redis.get(`cost:${userId}`);
            return cost ? parseFloat(cost) : 0;
        } catch { return 0; }
    }

    private static async incrementSessionCost(userId: string, amount: number): Promise<void> {
        try {
            const redis = getRedis();
            if (!redis) return;
            if (redis.status !== 'ready') await redis.connect().catch(() => null);
            await redis.incrbyfloat(`cost:${userId}`, amount);
            await redis.expire(`cost:${userId}`, 3600);
        } catch { }
    }
}
