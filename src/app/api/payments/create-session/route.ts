import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy-load Stripe client to avoid build-time errors
function getStripeClient() {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
        throw new Error('STRIPE_SECRET_KEY not configured');
    }
    return new Stripe(apiKey, {
        apiVersion: '2025-01-27.acacia' as any,
    });
}

/**
 * Stripe Connect: Create Checkout Session (Direct Charge)
 * The money goes to the clinic, Aura takes a platform fee.
 */
export async function POST(req: Request) {
    try {
        const stripe = getStripeClient(); // Lazy-load Stripe

        const { amount, currency, clinicStripeAccountId, leadId, metadata } = await req.json();

        // 1. Validation
        if (!amount || !clinicStripeAccountId || !leadId) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        // 2. Create Checkout Session
        // We use "Destination Charge" logic where the platform creates the charge and transfers to the clinic.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency || 'eur',
                        product_data: {
                            name: 'Aura OS Treatment Deposit',
                            description: 'Medical treatment reservation fee',
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Aura Platform Fee (e.g., 20% commission)
            payment_intent_data: {
                application_fee_amount: Math.round(amount * 0.20 * 100),
                transfer_data: {
                    destination: clinicStripeAccountId,
                },
                metadata: {
                    lead_id: leadId,
                    ...metadata
                },
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('[Stripe Connect Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
