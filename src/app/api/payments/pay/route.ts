import { NextRequest, NextResponse } from 'next/server';
import { createMarketplacePayment } from '@/lib/iyzico/iyzico-logic';

/**
 * PATIENT PAYMENT ENDPOINT (B2B2C - IYZICO MARKETPLACE)
 * 
 * Usage: Frontend calls this when patient clicks "Pay Deposit" or "Pay Full Amount"
 * 
 * Flow:
 * 1. Patient selects package (e.g. Professional 1000TL)
 * 2. Frontend calls /api/payments/pay
 * 3. Backend calls Iyzico to split payment (85% Doctor, 15% Platform)
 * 4. Returns Iyzico Payment Form (or 3D Secure HTML)
 */
export async function POST(request: NextRequest) {
    console.log('[API] /api/payments/pay HIT');
    try {
        const body = await request.json();
        const {
            tenantId,
            amount, // in TL (e.g. 1000.00)
            paidPrice, // usually same as amount 
            packageType,
            cardHolderName,
            cardNumber,
            expireMonth,
            expireYear,
            cvc,
            buyerName,
            buyerSurname,
            buyerEmail,
            buyerGsm,
            buyerAddress,
            buyerIp
        } = body;

        // Basic Validation
        if (!tenantId || !amount || !cardNumber) {
            console.warn('[API] Missing required fields');
            return NextResponse.json(
                { error: 'Missing required fields (tenantId, amount, card info)' },
                { status: 400 }
            );
        }

        console.log(`[API] Processing Iyzico Payment for ${tenantId}: ${amount} TL`);

        // CALL IYZICO LOGIC
        let result;
        try {
            result = await createMarketplacePayment({
                tenantId,
                price: amount,
                paidPrice: paidPrice || amount,
                uiPackageType: packageType || 'standard',
                cardHolderName,
                cardNumber,
                expireMonth,
                expireYear,
                cvc,
                buyerName: buyerName || 'Guest User',
                buyerSurname: buyerSurname || '',
                buyerEmail: buyerEmail || 'guest@auraos.com',
                buyerGsm: buyerGsm || '+905000000000',
                buyerAddress: buyerAddress || 'Istanbul, Turkey',
                buyerIp: buyerIp || '127.0.0.1' // Should be real IP in prod
            });
        } catch (logicError: any) {
            console.error('[API] Logic Error Stack:', logicError.stack);
            return NextResponse.json(
                { error: logicError.message || 'Iyzico logic failed', details: logicError.stack },
                { status: 500 }
            );
        }

        // SUCCESS
        return NextResponse.json({
            success: true,
            message: 'Payment processed successfully',
            data: result
        });

    } catch (error: any) {
        console.error('[API] Fatal Payment Error:', error);
        return NextResponse.json(
            { error: error.message || 'Payment processing failed' },
            { status: 500 }
        );
    }
}
