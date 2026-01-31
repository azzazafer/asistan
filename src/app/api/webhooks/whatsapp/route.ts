import { NextRequest, NextResponse } from 'next/server';
import { OmnichannelBridge } from '@/lib/ai/omnichannel';

// FORCE DYNAMIC: Prevents Vercel from caching static responses
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Extend timeout for vision processing

/**
 * Production-Grade WhatsApp Webhook
 * Handles incoming messages with bulletproof error handling and debug messaging
 */
export async function POST(req: NextRequest) {
    let debugPhone = ''; // Variable accessible to the catch block - NO stream re-read needed

    try {
        // 1. SAFE DATA EXTRACTION (Read Once Policy)
        const formData = await req.formData();
        const payload = Object.fromEntries(formData.entries());

        // Extract phone safely for debug purposes
        const rawFrom = payload.From as string | undefined;
        debugPhone = rawFrom ? rawFrom.replace('whatsapp:', '') : '';

        console.log(`[Webhook] Incoming from: ${debugPhone} | Type: ${payload.NumMedia ? 'Media' : 'Text'}`);

        // 2. NORMALIZE & ORCHESTRATION HANDOFF
        // Wrap orchestration to catch logic errors separate from system errors
        try {
            const normalized = await OmnichannelBridge.normalizeWhatsApp(payload);

            if (normalized.content) {
                await OmnichannelBridge.processIncoming(normalized);
            }
        } catch (processError: any) {
            console.error('❌ ORCHESTRATOR ERROR:', processError);
            throw new Error(`Logic Error: ${processError.message}`);
        }

        // 3. SUCCESS RESPONSE TO TWILIO
        // Always return 200 XML to Twilio to stop them from retrying
        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });

    } catch (error: any) {
        console.error('❌ FATAL WEBHOOK CRASH:', error);
        console.error('Stack:', error.stack?.split('\n').slice(0, 5));

        // 4. FAIL-SAFE DEBUG MESSAGING
        // If we have the phone number, tell the user what happened
        if (debugPhone) {
            try {
                const accountSid = process.env.TWILIO_ACCOUNT_SID;
                const authToken = process.env.TWILIO_AUTH_TOKEN;
                const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || process.env.TWILIO_SMS_NUMBER;

                if (accountSid && authToken && fromNumber) {
                    const client = require('twilio')(accountSid, authToken);

                    const errorMessage = error.message || "Unknown System Error";

                    // Send RAW Error to WhatsApp for Root Cause Analysis
                    await client.messages.create({
                        from: fromNumber,
                        to: `whatsapp:${debugPhone}`,
                        body: `🚨 SYSTEM CRASH REPORT:\n\n${errorMessage.substring(0, 1000)}\n\n(This is a raw debug message to find the root cause)`
                    });

                    console.log('[DEBUG] Crash report sent to user:', debugPhone);
                }
            } catch (twilioError: any) {
                console.error('Failed to send crash report:', twilioError.message);
            }
        }

        // Return 200 even on error to prevent Twilio retry loops (which cause spam)
        return new NextResponse('<Response></Response>', {
            status: 200,
            headers: { 'Content-Type': 'text/xml' },
        });
    }
}
