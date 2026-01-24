
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/db';
import { sendTemplateMessage } from '@/lib/messaging';

export const dynamic = 'force-dynamic';

// Initialize Stripe (Lazy Load to prevent build failure)
const getStripe = () => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
        console.warn('[Stripe] Missing Secret Key');
        return new Stripe('sk_test_placeholder', { apiVersion: '2024-12-18.acacia' as any, typescript: true });
    }
    return new Stripe(key, {
        apiVersion: '2024-12-18.acacia' as any, // Latest consistent version
        typescript: true,
    });
};

/*
 * STRIPE WEBHOOK HANDLER
 * =======================
 * This is the "Cash Register" of Aura OS.
 * It listens for successful payments and triggers the "VIP Upgrade" workflow.
 * 
 * CRITICAL SECURITY:
 * 1. Verifies Stripe Signature (prevents fake requests).
 * 2. Updates Database (Deposit Paid).
 * 3. Notifies User via WhatsApp.
 */
export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.error('[Stripe] CRITICAL: Missing Webhook Secret. Access Denied.');
            return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
        }

        // Verify Signature (MANDATORY)
        event = getStripe().webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err: any) {
        console.error(`[Stripe] Webhook Signature Verification Failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle Specific Events
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            await handlePaymentSuccess(paymentIntent);
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object as Stripe.PaymentIntent;
            console.error(`[Stripe] Payment Failed: ${failedPayment.id}`);
            // Send "Payment Failed" reminder via WhatsApp
            const failMeta = failedPayment.metadata || {};
            if (failMeta.patientPhoneNumber) {
                await sendTemplateMessage(
                    'whatsapp',
                    failMeta.patientPhoneNumber,
                    'payment_failed',
                    failMeta.culture || 'en',
                    {
                        name: failMeta.patientName || 'Guest',
                        link: `https://aura.global/payment/${failedPayment.id}` // Placeholder for retry link
                    }
                );
                console.log('[Stripe] Payment Failed Notification Sent.');
            } else {
                console.warn('[Stripe] No phone number found for failed payment.');
            }
            break;

        default:
        // console.log(`[Stripe] Unhandled Event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}

// ============================================
// LOGIC: CASH --> DATABASE --> WHATSAPP
// ============================================
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    console.log(`[Stripe] Payment Succeeded: ${paymentIntent.id} | Amount: ${paymentIntent.amount}`);

    // 1. Extract Metadata (We attach this when creating the Intent)
    const { patientId, patientPhoneNumber, patientName, culture } = paymentIntent.metadata;

    if (!patientId && !patientPhoneNumber) {
        console.error('[Stripe] Critical: Missing metadata in payment intent.');
        return;
    }

    // 2. Update Database (Supabase)
    if (supabase) {
        const updateData = {
            status: 'DEPOSIT_PAID',
            score_rank: 'VIP_PLATINUM',
            score: 100,
            notes: `Deposit of ${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} received via Stripe. (ID: ${paymentIntent.id})`
        };

        const leadSelector = patientId ? { column: 'id', value: patientId } : { column: 'phone', value: patientPhoneNumber };

        const { data: lead, error: fetchError } = await supabase
            .from('leads')
            .select('id, agent_id, name')
            .eq(leadSelector.column, leadSelector.value)
            .maybeSingle();

        if (lead) {
            // Update Lead
            await supabase.from('leads').update(updateData).eq('id', lead.id);
            console.log('[Stripe] Lead upgraded to VIP_PLATINUM.');

            // [NEW] 2.1. Agent Commission Logic
            if (lead.agent_id) {
                const { getAgentStats, recordCommission, getAgentByCode } = require('@/lib/agents');
                // Fetch agent fully to get their current commission rate
                const { data: agent } = await supabase.from('agents').select('commission_rate').eq('id', lead.agent_id).single();

                if (agent) {
                    const amountPaid = paymentIntent.amount / 100;
                    const commissionResult = await recordCommission(
                        lead.agent_id,
                        lead.id,
                        amountPaid,
                        agent.commission_rate || 0.1, // Default 10% if not set
                        paymentIntent.currency.toUpperCase()
                    );
                    if (commissionResult) {
                        console.log(`[Stripe] Commission recorded for agent ${lead.agent_id}: ${commissionResult.amount_commission} ${paymentIntent.currency.toUpperCase()}`);
                    }
                }
            }
        } else {
            console.error('[Stripe] Lead not found for update.');
        }
    }

    // 3. Send WhatsApp Confirmation
    if (patientPhoneNumber) {
        await sendTemplateMessage(
            'whatsapp',
            patientPhoneNumber,
            'payment_received',
            culture || 'en', // Default to English if culture unknown
            {
                name: patientName || 'Valued Guest',
                amount: (paymentIntent.amount / 100).toFixed(2),
                currency: paymentIntent.currency.toUpperCase()
            }
        );
        console.log('[Stripe] WhatsApp confirmation sent.');
    }
}
