import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getLeads } from '@/lib/leads';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const tenantIdParam = searchParams.get('tenantId');

        // --- DEMO MODE DATA INJECTION ---
        if (tenantIdParam === 'demo_clinic_1') {
            console.log('[API] Demo Mode Activated. Serving Synthetic Neural Data.');
            return NextResponse.json({
                leads: [
                    { id: '1', name: 'Ayşe Yılmaz', phone: '+905551112233', status: 'Randevu Onaylandı', channel: 'WhatsApp', date: new Date().toISOString(), score: 98, last_message: 'Peki, yarın 14:00 uygun.', culture: 'TR', treatment: 'Zirkonyum' },
                    { id: '2', name: 'John Smith', phone: '+447712345678', status: 'Yeni', channel: 'Instagram', date: new Date(Date.now() - 3600000).toISOString(), score: 45, last_message: 'How much for full set?', culture: 'EN', treatment: 'All-on-4' },
                    { id: '3', name: 'Fatima Al-Zahra', phone: '+971501234567', status: 'Teklif Gönderildi', channel: 'WhatsApp', date: new Date(Date.now() - 86400000).toISOString(), score: 85, last_message: 'Fiyatı onaylıyorum, transfer dahil mi?', culture: 'AR', treatment: 'Hollywood Smile' },
                    { id: '4', name: 'Hans Müller', phone: '+491511234567', status: 'Müzakere', channel: 'Web', date: new Date(Date.now() - 172800000).toISOString(), score: 65, last_message: 'Ist das inklusiv Hotel?', culture: 'DE', treatment: 'Implant' },
                    { id: '5', name: 'Mehmet Demir', phone: '+905329998877', status: 'Randevu Onaylandı', channel: 'Referans', date: new Date(Date.now() - 250000000).toISOString(), score: 92, last_message: 'Hocam selam, arkadaşım sizi önerdi.', culture: 'TR', treatment: 'Diş Beyazlatma' }
                ]
            });
        }
        // --------------------------------

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                },
            }
        );

        // 1. Verify Authentication (Bypass if using Demo Key)
        let tenantId = tenantIdParam;

        // If not explicit demo call, try real auth
        if (!tenantId || tenantId !== 'demo_clinic_1') {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                // Allow public access if explicitly requested via query param for testing, otherwise 401
                if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            } else {
                tenantId = user.app_metadata?.tenant_id || user.user_metadata?.tenant_id;
            }
        }

        if (!tenantId) {
            return NextResponse.json({ error: 'System Configuration Error: No Tenant Bound' }, { status: 403 });
        }

        const leads = await getLeads(tenantId);
        return NextResponse.json({ leads });
    } catch (error: any) {
        console.error('[API leads ERROR]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
