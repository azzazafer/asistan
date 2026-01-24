import { openai } from '@/lib/openai';
import { supabase } from '@/lib/db';
import { randomUUID } from 'crypto';

/**
 * Converts text to speech using OpenAI's TTS-1 model.
 * Cost: ~$0.015 per 1K characters (Same as Azure Neural).
 * Quality: Superior naturalness (Breath, intonation).
 */
export async function textToSpeech(text: string, userId: string): Promise<string | null> {
    try {
        console.log(`[OpenAI TTS] Synthesizing for ${userId}...`);

        // 1. Generate Audio via OpenAI
        const response = await openai.audio.speech.create({
            model: 'tts-1', // Standard model (Cost effective)
            voice: 'nova',  // 'nova' is most compatible with Emel/Aura persona (Warm/Feminine)
            input: text,
            response_format: 'mp3',
        });

        const buffer = Buffer.from(await response.arrayBuffer());
        console.log(`[OpenAI TTS] Synthesis Success: ${buffer.length} bytes`);

        if (!supabase) {
            console.error("[OpenAI TTS] Supabase client missing.");
            return null;
        }

        // 2. Upload to Supabase Storage
        const fileName = `${userId.replace(/[^a-z0-9]/gi, '_')}-${Date.now()}-openai.mp3`;

        const { error } = await supabase
            .storage
            .from('voice-replies')
            .upload(fileName, buffer, {
                contentType: 'audio/mpeg',
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            console.error("[OpenAI TTS] Storage Error:", error.message);
            return null;
        }

        // 3. Get Public URL
        const { data: urlData } = supabase.storage.from('voice-replies').getPublicUrl(fileName);
        console.log(`[OpenAI TTS] DONE! URL: ${urlData.publicUrl}`);

        return urlData.publicUrl;

    } catch (error: any) {
        console.error("[OpenAI TTS] Error:", error.message);
        return null;
    }
}
