import { NextRequest, NextResponse } from 'next/server';
import { stripe, PACKAGES, PackageType } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const { packageType, hospitalName, email, fullName } = await req.json();

        if (!packageType || !hospitalName || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const selectedPackage = PACKAGES[packageType as PackageType];

        if (!selectedPackage) {
            return NextResponse.json(
                { error: 'Invalid package type' },
                { status: 400 }
            );
        }

        // Enterprise package requires contact sales
        if (packageType === 'enterprise') {
            return NextResponse.json(
                { error: 'Please contact sales for Enterprise package' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: selectedPackage.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
            customer_email: email,
            metadata: {
                hospitalName,
                packageType,
                fullName: fullName || '',
            },
            subscription_data: {
                metadata: {
                    hospitalName,
                    packageType,
                    fullName: fullName || '',
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
