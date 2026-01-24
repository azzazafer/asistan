import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getLeads } from '@/lib/leads';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
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

        // 1. Verify Authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Resolve Tenant ID (Priority: app_metadata -> user_metadata -> default)
        // Multi-tenant isolation MUST happen at the session level.
        const tenantId = user.app_metadata?.tenant_id || user.user_metadata?.tenant_id;

        if (!tenantId) {
            console.error(`[API] Security Violation: User ${user.id} has no tenant_id binding.`);
            return NextResponse.json({ error: 'System Configuration Error: No Tenant Bound' }, { status: 403 });
        }

        const leads = await getLeads(tenantId);
        return NextResponse.json({ leads });
    } catch (error: any) {
        console.error('[API leads ERROR]', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
