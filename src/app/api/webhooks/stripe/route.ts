import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase-client';
import Redis from 'ioredis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
});

const redis = new Redis(process.env.REDIS_URL || '');
export const dynamic = 'force-dynamic';

/**
 * Idempotent Stripe Webhook Handler
 * Processes payments and updates lead state.
 */
export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // 1. IDEMPOTENCY CHECK (Redis)
    const eventId = event.id;
    const isProcessed = await redis.get(`webhook:processed:${eventId}`);
    if (isProcessed) {
        console.log(`[Webhook] Event ${eventId} already processed. Skipping.`);
        return NextResponse.json({ received: true });
    }

    // 2. Handle the event
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const leadId = paymentIntent.metadata.lead_id;

                if (leadId) {
                    console.log(`✅ Payment Succeeded for Lead ${leadId}`);

                    // Update database state
                    await supabase
                        .from('leads')
                        .update({
                            status: 'Paid',
                            payment_status: 'Completed',
                            funnel_state: 'converted'
                        })
                        .eq('id', leadId);
                }
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // 3. Mark as processed (TTL 24h)
        await redis.set(`webhook:processed:${eventId}`, 'true', 'EX', 86400);

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error('[Webhook Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
