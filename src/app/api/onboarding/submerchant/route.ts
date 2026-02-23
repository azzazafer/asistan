import { NextRequest, NextResponse } from 'next/server';
import { createSubMerchant } from '@/lib/iyzico/iyzico-logic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            tenantId,
            contactName,
            contactSurname,
            email,
            gsmNumber,
            address,
            iban,
            identityNumber, // TCKN
            legalCompanyTitle,
            subMerchantType
        } = body;

        // Basic Validation
        if (!tenantId || !contactName || !iban || !identityNumber) {
            return NextResponse.json(
                { error: 'Missing required fields for Sub-merchant creation' },
                { status: 400 }
            );
        }

        console.log(`[API] Creating Sub-merchant for ${tenantId}`);

        // Call Iyzico Logic (Mock or Real)
        const result: any = await createSubMerchant({
            tenantId,
            contactName,
            contactSurname,
            email,
            gsmNumber,
            address,
            iban,
            identityNumber,
            legalCompanyTitle,
            subMerchantType: subMerchantType || 'PRIVATE_COMPANY'
        });

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Sub-merchant created successfully'
        });

    } catch (error: any) {
        console.error('[API] Sub-merchant Creation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create sub-merchant' },
            { status: 500 }
        );
    }
}
