import { openai, ASSISTANT_SYSTEM_PROMPT } from '@/lib/openai';
import { tools, handleToolCall } from '@/lib/tools';
import { redactPII, validateResponse, detectPromptInjection, logAudit } from '@/lib/security';
import { RagService } from './rag-service';
import { funnelMachine } from './funnel-machine';
import Redis from 'ioredis';
const MAX_SESSION_COST = 1.50; // USD

const getRedis = () => {
    if (!process.env.REDIS_URL) return null;
    try {
        const client = new Redis(process.env.REDIS_URL);
        client.on('error', () => { }); // Silence connection errors
        return client;
    } catch {
        return null;
    }
};

const redis = getRedis();
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

            // 5. SYSTEM PROMPT ENRICHMENT
            const enrichedPrompt = `${ASSISTANT_SYSTEM_PROMPT}

[CULTURAL CONTEXT]: Language is ${language}. Referral Code: ${refCode || 'none'}.
${visionContext}

[SOURCE OF TRUTH]:
${knowledgeContext}

Strategy: Act as a Closer. Redirect to booking.`;

            // 6. GPT-4o EXECUTION WITH VISION SUPPORT
            // Construct messages array with proper image support for GPT-4o
            const formattedMessages: any[] = [
                { role: 'system', content: enrichedPrompt }
            ];

            // Add conversation history
            for (let i = 0; i < messages.length; i++) {
                const msg = messages[i];

                // If this is the last user message and we have imageData, use vision format
                if (i === messages.length - 1 && msg.role === 'user' && imageData) {
                    formattedMessages.push({
                        role: 'user',
                        content: [
                            { type: "text", text: msg.content },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageData.startsWith('http') ? imageData : `data:image/jpeg;base64,${imageData}`
                                }
                            }
                        ]
                    });
                } else {
                    // Standard text message
                    formattedMessages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            }

            let response = await openai.chat.completions.create({
                model: 'gpt-4o',
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
                    model: 'gpt-4o',
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

            return {
                message: {
                    role: aiMessage.role,
                    content: aiMessage.content || ''
                }
            };

        } catch (error: any) {
            console.error('[AI ORCHESTRATOR ERROR]', error);
            return {
                message: { role: 'assistant', content: "Sistemde geçici bir sorun oluştu. Lütfen tekrar deneyin." },
                error: error.message
            };
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
            if (!redis) return 0;
            const cost = await redis.get(`cost:${userId}`);
            return cost ? parseFloat(cost) : 0;
        } catch { return 0; }
    }

    private static async incrementSessionCost(userId: string, amount: number): Promise<void> {
        try {
            if (!redis) return;
            await redis.incrbyfloat(`cost:${userId}`, amount);
            await redis.expire(`cost:${userId}`, 3600);
        } catch { }
    }
}
