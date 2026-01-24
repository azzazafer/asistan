import { supabase } from './db';
import { notifyStaff } from './whatsapp';

/**
 * Fintech Fulfillment Engine
 * Handles the recovery and settlement of Aura Neural Pay sessions.
 */
export class FintechFulfillment {

    /**
     * Called by Stripe Webhook on 'checkout.session.completed'
     */
    static async handlePaymentSuccess(sessionId: string, metadata: any) {
        const { leadId, tenantId } = metadata;
        console.log(`[Fintech] Payment Succeeded for Lead ${leadId}. Fulfilling...`);

        if (!supabase) return;

        // 1. Update Lead Status to 'KAPORA ALINDI' (Deposit Paid)
        const { error: leadUpdateError } = await supabase
            .from('leads')
            .update({
                status: 'Kapora Alındı',
                notes: `Neural Pay success (Session: ${sessionId})`
            })
            .eq('phone', leadId);

        if (leadUpdateError) console.error('[Fintech] Lead update failed:', leadUpdateError);

        // 2. Track Revenue in Analytics
        await supabase.from('audit_logs').insert({
            tenant_id: tenantId,
            action: 'REVENUE_CAPTURED',
            resource: `Lead:${leadId}`,
            details: `Neural Pay deposit of 250 EUR settled. Session: ${sessionId}`,
            clearance: 'ADMIN'
        });

        // 3. Notify Ahmet Bey (Human Consultant) via WhatsApp
        const successBrief = `💰 SATIŞ KAPANDI: Kapora Alındı!\n👤 Hasta ID: ${leadId}\n🏥 Klinik: ${tenantId}\n\nAura AI satışı başarıyla kapattı. Hasta operasyon tarihini netleştirmek için Ahmet Bey'i bekliyor.`;
        notifyStaff("+905000000000", leadId, successBrief);

        console.log(`[Fintech] Fulfillment Complete for ${leadId}.`);
    }

    /**
     * Handles failed or cancelled payments to trigger AI recovery
     */
    static async handlePaymentFailure(leadId: string, reason: string) {
        console.warn(`[Fintech] Payment failed for ${leadId}: ${reason}`);
        // Optionally trigger a "Payment Nudge" from the AI here
    }
}
