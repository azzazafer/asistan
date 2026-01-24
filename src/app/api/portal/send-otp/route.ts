import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/lib/messaging';
import { getPatientData } from '@/lib/portal';

export async function POST(req: NextRequest) {
    try {
        const { accessCode, language } = await req.json();

        if (!accessCode) {
            return NextResponse.json({ error: 'Access code required' }, { status: 400 });
        }

        // 1. Detect Tenant
        const { TenancyManager } = require('@/lib/tenancy');
        const tenantId = TenancyManager.getTenant();

        // 2. Verify access code exists in DB with Tenancy
        const patientSpec = await getPatientData(accessCode, tenantId);
        if (!patientSpec || !patientSpec.lead?.phone) {
            return NextResponse.json({ error: 'System ID mismatch or invalid for this clinic.' }, { status: 404 });
        }

        const phone = patientSpec.lead.phone;

        // 2. Send OTP
        const result = await sendOTP(phone, language || 'en');

        if (!result.success) {
            return NextResponse.json({ error: result.error || 'Failed to send OTP' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            maskedPhone: phone.replace(/(\d{3})\d+(\d{4})/, '$1***$2') // Masked for security
        });

    } catch (error: any) {
        console.error('[SEND OTP ERROR]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
