import { openai } from '../openai';

/**
 * FAST-PATH VISION HANDLER
 * Lightweight vision processing for speed (5-7s target)
 * Bypasses orchestrator features: no history, tools, or RAG
 */

interface QuickAnalyzeParams {
    imageData: string; // Base64 data URL
    userMessage?: string;
    language?: string; // e.g. 'ar', 'en', 'tr', 'de'
}

export class VisionFast {
    /**
     * Quick vision analysis optimized for speed
     * Returns dental analysis within 5-7 seconds
     */
    static async quickAnalyze(params: QuickAnalyzeParams): Promise<string> {
        const { imageData, userMessage, language = 'tr' } = params;

        try {
            console.log(`⚡ [VISION-FAST] Starting quick analysis for language: ${language}...`);

            // Language specific default prompt
            const defaultPrompts: any = {
                tr: "Bu diş görselini analiz et. Çürük, plak, diş eti sorunları ve estetik durumu kısaca listele. Randevuya çağır.",
                ar: "حلل هذه الصورة السريرية للأسنان. اذكر التسوس واللويحة ومشاكل اللثة والناحية التجميلية باختصار. وجه المريض لتحديد موعد.",
                de: "Analysieren Sie dieses klinische Zahnbild. Listen Sie Karies, Plaque, Zahnfleischprobleme und ästhetik kurz auf. Termin vereinbaren.",
                en: "Analyze this clinical dental image. Briefly list decay, plaque, gum issues and aesthetic status. Direct to appointment booking."
            };

            const promptText = userMessage && userMessage.trim().length > 5
                ? `[LANGUAGE: ${language}] User question: ${userMessage}. Analyze image and respond in ${language.toUpperCase()}.`
                : defaultPrompts[language] || defaultPrompts['en'];

            // Construct minimal payload (NO HISTORY - saves tokens and time)
            const messages = [
                {
                    role: "system",
                    content: `You are Aura OS, a combined AI Health Architect and Senior Sales Closer.
          
MISSION: Analyze image fast and respond briefly in ${language.toUpperCase()} only.
- Detect decay, plaque, gum issues or aesthetic problems.
- Always direct to clinic booking after analysis.
- IMPORTANT: Use professional terminology in ${language.toUpperCase()}.

⚠️ VOICE MODE: Responses are converted to voice.
- Direct conversational style.
- Instead of "as seen in image", say "In your teeth/smile I see...".`
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
