import { NextRequest, NextResponse } from 'next/server';
import { processPendingResponses } from '@/lib/ai/delayed-queue';

/**
 * DELAYED RESPONSE PROCESSOR CRON
 * Runs every minute to send queued manager approval messages
 */
export async function POST(req: NextRequest) {
    try {
        // SECURITY: Verify CRON_SECRET
        const authHeader = req.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            console.error('[Delayed Processor] Unauthorized access attempt');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('[Delayed Processor] Starting...');
        const sentCount = await processPendingResponses();

        console.log(`[Delayed Processor] ✅ Processed ${sentCount} delayed responses`);

        return NextResponse.json({
            success: true,
            sentCount: sentCount,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('[Delayed Processor Error]', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

/**
 * GET: Health check
 */
export async function GET() {
    return NextResponse.json({
        status: 'active',
        endpoint: '/api/cron/process-delayed',
        purpose: 'Processes delayed manager approval messages',
        schedule: 'Every minute'
    });
}
