import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * WHATSAPP WEBHOOK - SYNC VERSION
 * Processes message synchronously within Twilio's timeout (15s)
 * VisionFast ensures completion: ~2s download + ~5-7s analysis = ~9s total
 */
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const payload = Object.fromEntries(formData.entries());

        console.log(`[Webhook] Incoming from: ${payload.From} | Type: ${payload.NumMedia ? 'Media' : 'Text'}`);

        // SYNC PROCESSING: Wait for completion
        const normalized = await OmnichannelBridge.normalizeWhatsApp(payload);
        await OmnichannelBridge.processIncoming(normalized);

        // Success response
        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });

    } catch (error: any) {
        console.error('❌ WEBHOOK ERROR:', error);

        // Even on error, return 200 to Twilio to avoid retries
        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });
    }
}
