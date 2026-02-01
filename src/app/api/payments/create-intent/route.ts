import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy-load Stripe client to avoid build-time errors
function getStripeClient() {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
        throw new Error('STRIPE_SECRET_KEY not configured');
    }
    return new Stripe(apiKey, {
        apiVersion: '2024-12-18.acacia' as any,
    });
}

/**
 * Timeout wrapper for external API calls
 * Prevents indefinite hanging on slow network conditions
 */
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    );
    return Promise.race([promise, timeout]);
}

/**
 * STRIPE PAYMENT INTENT CREATOR
 * =============================
 * Creates a Payment Intent with metadata for lead attribution.
 * Production-hardened with 10-second timeout.
 */

export async function POST(req: NextRequest) {
    try {
        const stripe = getStripeClient(); // Lazy-load Stripe

        const { amount, currency, patientId, patientName, patientPhoneNumber, culture } = await req.json();

        if (!amount || !currency) {
            return NextResponse.json({ error: 'Amount and currency required' }, { status: 400 });
        }

        console.log(`[Stripe] Creating intent for ${patientName} (${amount} ${currency.toUpperCase()})`);

        // ✅ PRODUCTION FIX: Add 10-second timeout to prevent hanging
        const paymentIntent = await withTimeout(
            stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents
                currency: currency.toLowerCase(),
                automatic_payment_methods: { enabled: true },
                metadata: {
                    patientId: patientId || 'unknown',
                    patientName: patientName || 'Valued Guest',
                    patientPhoneNumber: patientPhoneNumber || 'unknown',
                    culture: culture || 'en'
                },
            }),
            10000 // 10 seconds max
        );

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            id: paymentIntent.id
        });

    } catch (err: any) {
        console.error('[Stripe Intent Error]', err.message);

        if (err.message === 'Request timeout') {
            return NextResponse.json({
                error: 'Payment service timeout. Please try again.'
            }, { status: 504 }); // Gateway Timeout
        }

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
