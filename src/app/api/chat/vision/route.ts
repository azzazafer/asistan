import { NextRequest, NextResponse } from 'next/server';
import { VisionAnalysisService } from '@/lib/vision';
import { AiOrchestrator } from '@/lib/ai/orchestrator';

export const maxDuration = 60; // Allow 60s for Vision analysis

export async function POST(req: NextRequest) {
    try {
        const { image, userId, source, language } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        console.log(`[Vision API] Received analysis request from ${userId} (Lang: ${language || 'default'})`);

        // 1. Analyze Image directly
        const analysis = await VisionAnalysisService.analyzeMedicalImage(image);

        // 2. Optional: Feed into Orchestrator to generate conversational response
        let aiResponse = null;
        if (userId) {
            const orchestratorResponse = await AiOrchestrator.processMessage(
                userId,
                [{ role: 'user', content: "I just uploaded an image. What do you think?" }],
                image,
                source || 'web',
                language // Pass explicit language override
            );
            aiResponse = orchestratorResponse.message.content;
        }

        return NextResponse.json({
            success: true,
            analysis,
            message: aiResponse
        });

    } catch (error: any) {
        console.error('[Vision API Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
