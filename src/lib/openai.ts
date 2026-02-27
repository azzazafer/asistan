import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OPENAI_API_KEY is not defined in environment variables');
}

export const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key',
    dangerouslyAllowBrowser: true, // Allow running in client-side for dev/demo purposes
});

export const ASSISTANT_SYSTEM_PROMPT = `You are Aura, an AI Health Architect and Senior Sales Consultant. 
You are professional, empathetic, and culturally intelligent. You serve as a high-end concierge for premium clinics.

[TONE OF VOICE PROTOCOL]:
- Professional, welcoming, and sophisticated.
- Never use overly casual or "too cute" language.
- Demonstrate empathy through phrases like "I am here for you" or "Let's make the best use of your time."
- Reflect local hospitality nuances based on the language spoken.

[VOICE MODE - CRITICAL]:
- ⚠️ IMPORTANT: You are a speaking AI. Your text is converted to voice.
- Never say you cannot speak or send voice messages.
- Be concise, fluent, and conversational.
- Direct conversational style, as if on a phone call.

[ANTI-ROBOTIC PROTOCOL]:
- Avoid literal translations. 
- Sentences should be short and human-like.
- Act as a High-End Concierge, not a rigid bot.

[SALES CLOSER MISSION]:
- Your goal is to guide users to the next step (Booking/Consultation).
- Always include a Call to Action (CTA), especially after medical analysis.
- Highlight VIP services or clinic advantages if the user is hesitant.
`;

/**
 * Transcribes audio file from a URL using OpenAI Whisper.
 * @param audioUrl URL of the audio file (Telegram/Instagram link)
 */
export async function transcribeAudio(audioUrl: string): Promise<string | null> {
    try {
        console.log(`[Whisper] Downloading audio from ${audioUrl}...`);

        // 1. Download file (with Auth if Twilio)
        const headers: HeadersInit = {};
        if (audioUrl.includes('api.twilio.com')) {
            const sid = process.env.TWILIO_ACCOUNT_SID;
            const token = process.env.TWILIO_AUTH_TOKEN;
            if (sid && token) {
                const auth = Buffer.from(sid + ':' + token).toString('base64');
                headers['Authorization'] = `Basic ${auth}`;
            }
        }

        const audioResponse = await fetch(audioUrl, { headers });
        if (!audioResponse.ok) throw new Error(`Failed to download audio file: ${audioResponse.status} ${audioResponse.statusText}`);

        const blob = await audioResponse.blob();

        // 2. Convert Blob to File (Node/Edge compatible)
        const file = new File([blob], 'voice_message.ogg', { type: 'audio/ogg' });

        // 3. Send to OpenAI Whisper
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            // [V4 FIX]: Removed hardcoded 'tr' to allow multi-language auto-detection
            response_format: 'text',
        });

        console.log(`[Whisper] Transcription: "${transcription}"`);
        return transcription.toString();

    } catch (error: any) {
        console.error('[Whisper Error]', error.message);
        // Fallback: Return null so the main logic handles it gracefully
        return null;
    }
}
