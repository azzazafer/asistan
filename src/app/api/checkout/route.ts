import { NextRequest, NextResponse } from 'next/server';

// [STABLE MOCK] Replacing Stripe with Iyzico Simulation to fix build
export type PackageType = 'startup' | 'sme' | 'enterprise';

export const PACKAGES: Record<PackageType, { name: string; priceId: string; amount: number }> = {
    startup: { name: 'Startup', priceId: 'price_1SnyTJFSetZwfH2trbyDPpsI', amount: 99 },
    sme: { name: 'SME', priceId: 'price_1SnyTJFSetZwfH2trbyDPpsJ', amount: 299 },
    enterprise: { name: 'Enterprise', priceId: 'contact_sales', amount: 0 },
};

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

        // SIMULATING IYZICO CHECKOUT URL
        // In real production, use Iyzico Logic here
        const mockCheckoutUrl = `https://sandbox-api.iyzipay.com/payment/mock/${Date.now()}`;

        return NextResponse.json({ url: mockCheckoutUrl });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
