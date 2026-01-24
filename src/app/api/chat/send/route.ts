import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/messaging';
import { sendTelegramMessage } from '@/lib/telegram';
import { addLead, getLeadByPhone } from '@/lib/leads';

/**
 * Unified Chat Sender
 * Allows the Dashboard to send messages via WhatsApp or Telegram.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, message, channel, tenantId } = body;

        if (!userId || !message) {
            return NextResponse.json({ error: 'Missing userId or message' }, { status: 400 });
        }

        console.log(`[Unified Sender] Sending to ${userId} via ${channel}: ${message}`);

        let result;

        // 1. Send via Channel
        if (channel === 'WhatsApp') {
            result = await sendWhatsAppMessage(userId, message);
        } else if (channel === 'Telegram') {
            result = await sendTelegramMessage(userId, message);
        } else {
            // Default fallback or Instagram (Not Implemented Yet for Send)
            return NextResponse.json({ error: 'Unsupported channel for outbound' }, { status: 400 });
        }

        if (!result.success) {
            return NextResponse.json({ error: result.error || 'Failed to send' }, { status: 500 });
        }

        // 2. Persist to History (Lead Database)
        // We act "as" the assistant or admin here.
        const effectiveTenantId = tenantId || 'default_clinic';
        const lead = await getLeadByPhone(userId, effectiveTenantId);

        if (lead) {
            const adminEntry = {
                role: 'assistant', // Or 'admin' if we want to distinguish humans
                content: `[HUMAN]: ${message}`, // Mark as human for clarity
                timestamp: new Date().toISOString()
            };
            const updatedHistory = [...(lead.history || []), adminEntry];
            await addLead({ ...lead, history: updatedHistory });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[Unified Sender Error]', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
