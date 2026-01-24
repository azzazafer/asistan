import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/messaging';
import { getPatientData } from '@/lib/portal';

export async function POST(req: NextRequest) {
    try {
        const { accessCode, otp } = await req.json();

        if (!accessCode || !otp) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // 1. Detect Tenant
        const { TenancyManager } = require('@/lib/tenancy');
        const tenantId = TenancyManager.getTenant();

        // 2. Fetch Patient Data with Tenancy
        const patientSpec = await getPatientData(accessCode, tenantId);
        if (!patientSpec || !patientSpec.lead?.phone) {
            return NextResponse.json({ error: 'Patient not found or invalid for this clinic' }, { status: 404 });
        }

        const phone = patientSpec.lead.phone;

        // 3. Verify OTP
        const isValid = verifyOTP(phone, otp);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            data: patientSpec,
            sessionToken: `aura_session_${Date.now()}_${Math.random().toString(36).substring(7)}`
        });

    } catch (error: any) {
        console.error('[VERIFY OTP ERROR]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
