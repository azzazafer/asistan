import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { AiOrchestrator } from '@/lib/ai/orchestrator';
import { sendWhatsAppMessage } from '@/lib/messaging';

/**
 * AURA "SALES SNIPER" - AUTONOMOUS FOLLOW-UP CRON
 * ===============================================
 * Triggers every morning (via Vercel Cron) to re-engage stale leads.
 * 
 * Logic:
 * 1. Find leads with status 'Beklemede' (Pending) and no activity in 24h.
 * 2. Generate a highly personalized "nudge" based on their chat history.
 * 3. Send message via WhatsApp.
 */

export async function GET(req: NextRequest) {
    // SECURITY: Verify Cron Secret
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.warn('[Cron] Unauthorized access attempt.');
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const { FollowupEngine } = require('@/lib/followup');
        const report = await FollowupEngine.runDailySniper();

        return NextResponse.json({
            success: true,
            ...report
        });

    } catch (err: any) {
        console.error("[Cron Fail]", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
