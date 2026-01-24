
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';
import * as fs from 'fs';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        // Convert File to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Save to temp file because OpenAI SDK expects a file path or ReadStream
        // (It handles File objects in browser but in Node environment file path is safer/standard)
        const tempFilePath = join(tmpdir(), `aura-voice-${randomUUID()}.webm`);
        await writeFile(tempFilePath, buffer);

        console.log(`[VOICE] Transcribing ${tempFilePath}...`);

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: 'whisper-1',
            language: 'tr', // Default to Turkish but it auto-detects well
        });

        // Cleanup temp file
        fs.unlinkSync(tempFilePath);

        return NextResponse.json({ text: transcription.text });

    } catch (error: any) {
        console.error('Voice Transcription Error:', error);
        return NextResponse.json({ error: error.message || 'Processing failed' }, { status: 500 });
    }
}
