import { NextResponse } from 'next/server';
import { SalesCloser } from '@/lib/ai/closer';

export async function POST(req: Request) {
    try {
        // SECURITY: Verify cron secret
        const authHeader = req.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            console.error('[Cron] Unauthorized access attempt');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('[Auto-Pilot] Starting sales run...');
        const sentCount = await SalesCloser.runAutoPilot();

        return NextResponse.json({
            success: true,
            sentCount: sentCount,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('[Auto-Pilot Error]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

/**
 * GET: Health check for cron endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'active',
        endpoint: '/api/cron/closer',
        purpose: 'Daily automated lead follow-up'
    });
}

