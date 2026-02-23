import { NextResponse } from 'next/server';

/**
 * MOCK STRIPE WEBHOOK (Disabled during Iyzico Migration)
 */
export async function POST(req: Request) {
    return NextResponse.json({ message: 'Stripe webhook endpoint disabled.' }, { status: 200 });
}
