import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, clinic, phone, source = 'landing_page' } = body;

        if (!name || !email || !clinic) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Log for tracking (in production, integrate with CRM)
        const demoRequest = {
            id: `demo_${Date.now()}`,
            name,
            email,
            phone: phone || '',
            clinic,
            source,
            timestamp: new Date().toISOString()
        };

        console.log(`[DEMO REQUEST] New demo request:`, demoRequest);

        // In production, you would:
        // 1. Send email notification to sales team
        // 2. Add to CRM (e.g., HubSpot, Salesforce)
        // 3. Send confirmation email to prospect

        return NextResponse.json({
            success: true,
            message: 'Demo request received successfully',
            requestId: demoRequest.id
        });

    } catch (error: any) {
        console.error('[DEMO API] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
