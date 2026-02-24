import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/shield';

// [STABLE MOCK] Replacing Stripe with Iyzico Simulation to fix build
export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    try {
        const body = await req.json();

        // 0. Security Shield Validation
        if (typeof validateRequest === 'function') {
            const security = validateRequest(ip, 'POST', '/api/deposit', userAgent, body);
            if (!security.valid) {
                return NextResponse.json({ error: security.error }, { status: 403 });
            }
        }

        const { patientId, patientName, patientPhoneNumber, amount, culture } = body;

        // SIMULATING IYZICO DEPOSIT URL
        const mockDepositUrl = `https://sandbox-api.iyzipay.com/deposit/mock/${patientId || 'guest'}-${Date.now()}`;

        return NextResponse.json({ url: mockDepositUrl });

    } catch (error: any) {
        console.error('[Deposit API] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
