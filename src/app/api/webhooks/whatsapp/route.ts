import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * ASYNC VISION WEBHOOK
 * Returns immediately to Twilio, processes vision in background
 */
export async function POST(req: NextRequest) {
    let debugPhone = '';

    try {
        const formData = await req.formData();
        const payload = Object.fromEntries(formData.entries());

        const rawFrom = payload.From as string | undefined;
        debugPhone = rawFrom ? rawFrom.replace('whatsapp:', '') : '';

        console.log(`[Webhook] Incoming from: ${debugPhone} | Type: ${payload.NumMedia ? 'Media' : 'Text'}`);

        // DIAGNOSTIC: Send confirmation that webhook is running
        if (debugPhone) {
            const { sendWhatsAppMessage } = await import('@/lib/messaging');
            await sendWhatsAppMessage(debugPhone, '🔍 DEBUG: Webhook received your message!').catch(() => { });
        }

        // CRITICAL: Fully async - don't await ANYTHING!
        // Normalization happens in background including image download
        (async () => {
            const { sendWhatsAppMessage } = await import('@/lib/messaging');

            try {
                console.log('🚀 BACKGROUND TASK STARTED');
                await sendWhatsAppMessage(debugPhone, '1️⃣ Background task started').catch(() => { });

                const normalized = await OmnichannelBridge.normalizeWhatsApp(payload);
                console.log('✅ Normalization complete');
                await sendWhatsAppMessage(debugPhone, '2️⃣ Normalization complete').catch(() => { });

                await OmnichannelBridge.processIncoming(normalized);
                console.log('✅ Processing complete');
                await sendWhatsAppMessage(debugPhone, '3️⃣ Processing complete').catch(() => { });

            } catch (error: any) {
                console.error('❌ ASYNC PROCESSING ERROR:', error);

                // Send detailed error to user
                await sendWhatsAppMessage(
                    debugPhone,
                    `❌ ERROR at step: ${error.message}\n\nStack: ${error.stack?.substring(0, 300)}`
                ).catch(() => { });
            }
        })(); // Execute immediately, don't await

        // IMMEDIATE RESPONSE - Don't wait for OpenAI
        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });

    } catch (error: any) {
        console.error('❌ WEBHOOK CRASH:', error);

        if (debugPhone) {
            try {
                const { sendWhatsAppMessage } = await import('@/lib/messaging');
                await sendWhatsAppMessage(
                    debugPhone,
                    `🚨 Webhook hatası: ${error.message?.substring(0, 800)}`
                );
            } catch (msgError: any) {
                console.error('Failed to send crash report:', msgError.message);
            }
        }

        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });
    }
}
