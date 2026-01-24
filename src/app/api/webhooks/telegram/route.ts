import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

/**
 * Telegram Webhook
 * Handles incoming messages from Telegram Bot API.
 */
export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        if (!payload || !payload.message) {
            return NextResponse.json({ ok: true, reason: 'no_message' });
        }

        console.log('[TELEGRAM WEBHOOK] Payload received');

        // 1. Normalize
        const normalized = await OmnichannelBridge.normalizeTelegram(payload);

        // 2. Process through Neural Engine
        if (normalized) {
            await OmnichannelBridge.processIncoming(normalized);
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error('[TELEGRAM WEBHOOK ERROR]', error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
    }
}
