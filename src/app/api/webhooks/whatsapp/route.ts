import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for vision processing

/**
 * Twilio WhatsApp Webhook
 * Handles incoming messages from WhatsApp users via Twilio.
 */
export async function POST(req: NextRequest) {
    try {
        // Twilio sends form-urlencoded data, not JSON
        const formData = await req.formData();
        const payload = Object.fromEntries(formData.entries());

        console.log(`[WHATSAPP WEBHOOK] Incoming from ${payload.From}`);

        // 1. Normalize
        const normalized = await OmnichannelBridge.normalizeWhatsApp(payload);

        // 2. Process through Neural Engine
        // EMERGENCY DEBUG: Echo back immediately to prove connectivity
        if (normalized.content.includes('echo')) {
            console.log('[DEBUG] Echo override triggered');
            const { sendWhatsAppMessage } = require('@/lib/messaging');
            await sendWhatsAppMessage(normalized.userId, `ECHO: ${normalized.content}`);
            return new NextResponse('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
        }

        if (normalized.content) {
            await OmnichannelBridge.processIncoming(normalized);
        }

        // Twilio expects XML TwiML or just a 200 OK. 
        // We'll return simple XML to acknowledge avoid warnings if needed, or just standard 200.
        // For simple msg receiving, 200 OK is usually enough but best practice is empty TwiML.
        return new NextResponse('<Response></Response>', {
            headers: { 'Content-Type': 'text/xml' }
        });

    } catch (error: any) {
        console.error('[WHATSAPP WEBHOOK ERROR]', error.message);
        console.error('❌ WEBHOOK CRASH:', {
            message: error.message,
            stack: error.stack?.split('\n').slice(0, 3)
        });

        // 🚨 DEBUG MODE: Send the actual error to WhatsApp for diagnosis
        try {
            const { sendWhatsAppMessage } = require('@/lib/messaging');
            const formData = await req.formData();
            const payload = Object.fromEntries(formData.entries());
            const userPhone = payload.From?.replace('whatsapp:', '');

            if (userPhone) {
                const errorMessage = error.message || 'Unknown Error';
                const debugText = `🐛 DEBUG LOG:\n${errorMessage.substring(0, 800)}\n\nStack: ${error.stack?.split('\n').slice(0, 2).join('\n') || 'No stack'}`;

                await sendWhatsAppMessage(userPhone, debugText);
                console.log('[DEBUG] Error sent to user:', userPhone);
            }
        } catch (innerError: any) {
            console.error('[DEBUG] Failed to send error to WhatsApp:', innerError.message);
        }

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
