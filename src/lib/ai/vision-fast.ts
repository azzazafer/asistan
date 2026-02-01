import { openai } from '../openai';

/**
 * FAST-PATH VISION HANDLER
 * Lightweight vision processing for speed (5-7s target)
 * Bypasses orchestrator features: no history, tools, or RAG
 */

interface QuickAnalyzeParams {
    imageData: string; // Base64 data URL
    userMessage?: string;
}

export class VisionFast {
    /**
     * Quick vision analysis optimized for speed
     * Returns dental analysis within 5-7 seconds
     */
    static async quickAnalyze(params: QuickAnalyzeParams): Promise<string> {
        const { imageData, userMessage } = params;

        try {
            console.log('⚡ [VISION-FAST] Starting quick analysis...');

            // Force simple, focused prompt for speed
            const promptText = userMessage && userMessage.trim().length > 5
                ? `Görsel ile ilgili soru: ${userMessage}. Lütfen görseli kısaca analiz et.`
                : "Bu diş görselini analiz et. Çürük, plak, diş eti sorunları ve estetik durumu kısaca listele. Randevuya çağır.";

            // Construct minimal payload (NO HISTORY - saves tokens and time)
            const messages = [
                {
                    role: "system",
                    content: `Sen Aura OS, profesyonel diş hekimi asistanısın.
          
GÖREV: Görseli hızlı analiz et ve kısa cevap ver.
- Çürük, plak, diş eti sorunları varsa belirt
- Estetik sorunları not et
- Kliniğe randevu almaya yönlendir
- Uzun paragraflar yazma, net ve kısa ol

⚠️ SES MODU: Metinlerin seslendirildiğini bil. 
- ASLA "ben konuşamam" veya "sesli mesaj gönderemem" deme
- Doğrudan konuş, sanki telefonda sohbet ediyormuşsun gibi
- "Resimde görüldüğü gibi" yerine "Dişlerinizde gördüğüm kadarıyla" de`
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: promptText },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageData,
                                detail: "low" // CRITICAL: Low detail = 3x faster processing
                            }
                        }
                    ]
                }
            ];

            console.log('⚡ [VISION-FAST] Calling OpenAI (gpt-4o-mini, low detail)...');

            // Use fastest model with strict limits
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini", // Fastest vision-capable model
                messages: messages as any,
                max_tokens: 300, // Limit response length for speed
                temperature: 0.6,
            });

            const response = completion.choices[0].message.content || 'Analiz tamamlanamadı.';

            console.log(`⚡ [VISION-FAST] Analysis complete (${response.length} chars)`);

            return response;

        } catch (error: any) {
            console.error('❌ [VISION-FAST] Error:', error);

            // Return user-friendly error
            if (error.code === 'insufficient_quota') {
                return '🚨 OpenAI quota aşıldı. Lütfen sistem yöneticisine bildirin.';
            } else if (error.code === 'timeout') {
                return '⏱️ Görsel analizi zaman aşımına uğradı. Lütfen tekrar deneyin veya daha küçük bir görsel gönderin.';
            } else {
                // For debugging, expose actual error
                throw error; // Let webhook catch and send to user
            }
        }
    }
}
