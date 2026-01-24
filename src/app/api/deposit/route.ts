import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { validateRequest } from '@/lib/shield';

export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    try {
        const body = await req.json();

        // 0. Security Shield Validation
        const security = validateRequest(ip, 'POST', '/api/deposit', userAgent, body);
        if (!security.valid) {
            return NextResponse.json({ error: security.error }, { status: 403 });
        }

        const { patientId, patientName, patientPhoneNumber, amount, culture } = body;

        // Default to $200.00 (20000 cents) if not specified
        const depositAmount = amount ? parseInt(amount) * 100 : 20000;
        const currency = 'usd'; // Global health tourism standard

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment', // One-time payment (not subscription)
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Medical Treatment Deposit',
                            description: `Deposit for ${patientName || 'Patient'}. (Non-refundable)`,
                        },
                        unit_amount: depositAmount,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancel`,
            customer_email: undefined, // Optional, can collect on checkout page
            metadata: {
                patientId: patientId || 'guest',
                patientName: patientName || '',
                patientPhoneNumber: patientPhoneNumber || '',
                culture: culture || 'en'
            },
            payment_intent_data: {
                metadata: {
                    patientId: patientId || 'guest',
                    patientName: patientName || '',
                    patientPhoneNumber: patientPhoneNumber || '',
                    culture: culture || 'en'
                }
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('[Deposit API] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
