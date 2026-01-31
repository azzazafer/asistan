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

        // CRITICAL: Process asynchronously - don't await!
        // This allows webhook to return 200 immediately
        OmnichannelBridge.processIncoming(
            await OmnichannelBridge.normalizeWhatsApp(payload)
        ).catch(async (error: any) => {
            console.error('❌ ASYNC PROCESSING ERROR:', error);

            // Send error to user using existing messaging function
            if (debugPhone) {
                try {
                    const { sendWhatsAppMessage } = await import('@/lib/messaging');
                    await sendWhatsAppMessage(
                        debugPhone,
                        `🚨 Analiz hatası: ${error.message?.substring(0, 500)}`
                    );
                } catch (msgError: any) {
                    console.error('Failed to send error notification:', msgError);
                }
            }
        });

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
