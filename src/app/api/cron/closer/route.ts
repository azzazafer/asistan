import { NextResponse } from 'next/server';
import { SalesCloser } from '@/lib/ai/closer';

export async function POST(req: Request) {
    try {
        console.log('[Auto-Pilot] Starting sales run...');
        const sentCount = await SalesCloser.runAutoPilot();

        return NextResponse.json({
            success: true,
            sentCount: sentCount
        });

    } catch (error: any) {
        console.error('[Auto-Pilot Error]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
