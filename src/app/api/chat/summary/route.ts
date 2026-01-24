import { NextResponse } from 'next/server';
import { AiOrchestrator } from '@/lib/ai/orchestrator';
import { supabase } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // 1. Fetch history from DB (Simplification: fetch from supabase directly)
        const { data: lead } = await supabase
            .from('leads')
            .select('history')
            .eq('phone', userId)
            .maybeSingle();

        if (!lead || !lead.history) {
            return NextResponse.json({ error: 'Lead history not found' }, { status: 404 });
        }

        // 2. Generate Summary via AI Orchestrator
        const summary = await AiOrchestrator.generateSummary(userId, lead.history);

        return NextResponse.json({ success: true, summary });

    } catch (error: any) {
        console.error('[API Summary Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
