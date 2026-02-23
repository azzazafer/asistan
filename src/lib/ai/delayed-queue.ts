import { supabase } from '../supabase-client';

/**
 * DELAYED RESPONSE QUEUE V4
 * Implements "Manager Approval" simulation with delayed responses
 */

interface DelayedResponse {
    id: string;
    lead_id: string;
    response_type: 'manager_approval' | 'value_package' | 'custom';
    scheduled_at: Date;
    message_template: string;
    status: 'pending' | 'sent' | 'cancelled';
    metadata?: any;
}

/**
 * Queue a delayed response (e.g., manager approval after 45 seconds)
 */
export async function queueDelayedResponse(
    leadId: string,
    responseType: 'manager_approval' | 'value_package',
    delaySeconds: number,
    messageTemplate: string,
    metadata?: any
): Promise<string> {
    const scheduledAt = new Date(Date.now() + delaySeconds * 1000);

    const { data, error } = await supabase
        .from('delayed_responses')
        .insert({
            lead_id: leadId,
            response_type: responseType,
            scheduled_at: scheduledAt.toISOString(),
            message_template: messageTemplate,
            status: 'pending',
            metadata: metadata || {}
        })
        .select()
        .single();

    if (error) {
        console.error('[Delayed Queue] Failed to queue response:', error);
        throw error;
    }

    console.log(`[Delayed Queue] ✅ Queued ${responseType} for lead ${leadId} at ${scheduledAt.toISOString()}`);

    return data.id;
}

/**
 * Process pending delayed responses (called by cron job)
 */
export async function processPendingResponses(): Promise<number> {
    const now = new Date().toISOString();

    // Fetch all responses scheduled to be sent now or earlier
    const { data: pending, error } = await supabase
        .from('delayed_responses')
        .select('*')
        .eq('status', 'pending')
        .lte('scheduled_at', now)
        .limit(50); // Process in batches

    if (error || !pending || pending.length === 0) {
        return 0;
    }

    console.log(`[Delayed Queue] Processing ${pending.length} pending responses...`);

    let sentCount = 0;
    const { sendWhatsAppMessage } = require('../messaging');

    for (const response of pending) {
        try {
            // Get lead details
            const { data: lead } = await supabase
                .from('leads')
                .select('*')
                .eq('id', response.lead_id)
                .single();

            if (!lead) {
                console.warn(`[Delayed Queue] Lead ${response.lead_id} not found, skipping`);
                await markResponseAs(response.id, 'cancelled');
                continue;
            }

            // Send WhatsApp message
            const result = await sendWhatsAppMessage(lead.phone, response.message_template);

            if (result.success) {
                await markResponseAs(response.id, 'sent');
                sentCount++;
                console.log(`[Delayed Queue] ✅ Sent ${response.response_type} to ${lead.name}`);
            } else {
                console.error(`[Delayed Queue] Failed to send to ${lead.name}:`, result.error);
            }

        } catch (error: any) {
            console.error(`[Delayed Queue] Error processing response ${response.id}:`, error);
        }
    }

    return sentCount;
}

/**
 * Mark response as sent or cancelled
 */
async function markResponseAs(responseId: string, status: 'sent' | 'cancelled'): Promise<void> {
    await supabase
        .from('delayed_responses')
        .update({ status })
        .eq('id', responseId);
}

/**
 * Cancel a pending delayed response
 */
export async function cancelDelayedResponse(leadId: string): Promise<void> {
    await supabase
        .from('delayed_responses')
        .update({ status: 'cancelled' })
        .eq('lead_id', leadId)
        .eq('status', 'pending');

    console.log(`[Delayed Queue] Cancelled pending responses for lead ${leadId}`);
}
