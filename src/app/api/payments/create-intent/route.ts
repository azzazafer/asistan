import { NextResponse } from 'next/server';

/**
 * MOCK PAYMENT INTENT (Disabled during Iyzico Migration)
 */
export async function POST(req: Request) {
    return NextResponse.json({ message: 'Stripe payment intent disabled.' }, { status: 200 });
}
