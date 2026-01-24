import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { validateRequest } from '@/lib/shield';

/**
 * Aura TTS API v1.0
 * Converts text to high-quality audio using OpenAI's tts-1 model.
 */
export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    try {
        const body = await req.json();

        // 0. Security Shield Validation
        const security = validateRequest(ip, 'POST', '/api/tts', userAgent, body);
        if (!security.valid) {
            return NextResponse.json({ error: security.error }, { status: 403 });
        }

        const { text, voice = 'nova' } = body;

        if (!text) {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        console.log(`[TTS] Generating audio for: ${text.substring(0, 30)}...`);

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice as any,
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        return new Response(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': buffer.length.toString(),
            },
        });

    } catch (error: any) {
        console.error('TTS API Error:', error);
        return NextResponse.json({ error: error.message || 'Speech generation failed' }, { status: 500 });
    }
}
