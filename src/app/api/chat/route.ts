import { NextResponse } from 'next/server';
import { AiOrchestrator } from '@/lib/ai/orchestrator';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body.messages;
        const userId = body.userId || 'anonymous';
        const imageData = body.image; // Optional base64 image
        const language = body.language; // Explicit language override

        // 1. Rate Limiting
        const ratelimit = checkRateLimit(userId);
        if (!ratelimit.allowed) {
            return NextResponse.json({
                error: 'Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin.',
                message: { role: 'assistant', content: 'Şu an çok fazla talep alıyorum. Güvenliğiniz için kısa bir mola verelim mi?' }
            }, { status: 429 });
        }

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // 2. Delegate to AI Orchestrator
        console.log(`[Chat API] Delegating to Orchestrator for user: ${userId} (Lang: ${language || 'auto'})`);

        const { cookies } = require('next/headers');
        const cookieStore = await cookies();
        const refCode = cookieStore.get('aura_ref_code')?.value;

        const response = await AiOrchestrator.processMessage(
            userId,
            messages,
            imageData,
            'web',
            language,
            refCode // New optional param
        );

        if (response.error) {
            throw new Error(response.error);
        }

        return NextResponse.json({
            message: response.message,
            analysis: response.analysis,
            context: response.context // Optional debugging info
        });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
