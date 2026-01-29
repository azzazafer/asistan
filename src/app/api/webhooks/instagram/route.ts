import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

export const dynamic = 'force-dynamic';

/**
 * Instagram Webhook
 * Handles incoming messages from Instagram (via Meta Graph API).
 */
export async function GET(req: NextRequest) {
    // Mode and Token verification for Facebook/Meta App setup
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
            console.log('[INSTAGRAM WEBHOOK] Verified.');
            return new NextResponse(challenge, { status: 200 });
        } else {
            return new NextResponse('Forbidden', { status: 403 });
        }
    }
    return new NextResponse('Bad Request', { status: 400 });
}

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        // Basic validation for manual test payloads or real Meta payloads
        if (!payload) {
            return NextResponse.json({ ok: true, reason: 'no_payload' });
        }

        console.log('[INSTAGRAM WEBHOOK] Payload received');

        // Note: Real Instagram payload navigation is complex (entry -> messaging). 
        // This is a simplified handler that OmnichannelBridge.normalizeInstagram expects.
        // In a real scenario, you iterate over payload.entry[0].messaging

        const messagingEvents = payload.entry?.[0]?.messaging || [];

        for (const event of messagingEvents) {
            // 1. Normalize
            const normalized = OmnichannelBridge.normalizeInstagram(event);

            // 2. Process through Neural Engine
            if (normalized) {
                await OmnichannelBridge.processIncoming(normalized);
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error('[INSTAGRAM WEBHOOK ERROR]', error.message);
        return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
    }
}
