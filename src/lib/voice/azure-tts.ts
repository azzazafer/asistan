import { supabase } from "@/lib/db";

/**
 * @deprecated REPLACED BY src/lib/voice/openai-tts.ts (2026-01-21)
 * Keeping this file as a fallback/reference only.
 */
export async function textToSpeech(text: string, userId: string): Promise<string | null> {
    console.warn("[Azure TTS] DEPRECATED: This function should not be called. Using OpenAI TTS instead.");
    const speechKey = (process.env.AZURE_SPEECH_KEY || '').trim();
    const speechRegion = (process.env.AZURE_SPEECH_REGION || '').trim();

    if (!speechKey || !speechRegion) {
        console.error("[Azure TTS] ERROR: Credentials missing.");
        return null;
    }

    try {
        console.log(`[Azure TTS] Synthesizing for ${userId}...`);

        const url = `https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`;
        const ssml = `
            <speak version='1.0' xml:lang='tr-TR'>
                <voice xml:lang='tr-TR' xml:gender='Female' name='tr-TR-EmelNeural'>
                    ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </voice>
            </speak>
        `;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/ssml+xml',
                'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
                'User-Agent': 'Aura-Assistant'
            },
            body: ssml
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Azure TTS] API Error ${response.status}:`, errorText);
            return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`[Azure TTS] Synthesis Success: ${buffer.length} bytes`);

        if (!supabase) {
            console.error("[Azure TTS] Supabase client missing.");
            return null;
        }

        const fileName = `${userId.replace(/[^a-z0-9]/gi, '_')}-${Date.now()}.mp3`;

        const { data, error } = await supabase
            .storage
            .from('voice-replies')
            .upload(fileName, buffer, {
                contentType: 'audio/mpeg',
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            console.error("[Azure TTS] Storage Error:", error.message);
            return null;
        }

        const { data: urlData } = supabase.storage.from('voice-replies').getPublicUrl(fileName);
        console.log(`[Azure TTS] DONE! URL: ${urlData.publicUrl}`);

        return urlData.publicUrl;

    } catch (error: any) {
        console.error("[Azure TTS] Final Catch:", error.message);
        return null;
    }
}
