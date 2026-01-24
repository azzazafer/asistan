'use server';

import { supabase } from '@/lib/supabase-client';

export async function getSuperAdminStats() {
    if (!supabase) return null;

    try {
        // 1. Total Leads Count
        const { count: leadCount, error: leadError } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });

        // 2. Active Clinics (Unique Tenants)
        // Note: In a real multi-tenant setup, we would query a 'tenants' table.
        // For now, we count unique tenant_ids in leads as a proxy if tenants table is empty/missing
        const { data: uniqueTenants, error: tenantError } = await supabase
            .from('leads')
            .select('tenant_id');

        // Calculate unique tenants in JS (since distinct count is tricky with Supabase JS client efficiently without RPC)
        const activeClinics = uniqueTenants
            ? new Set(uniqueTenants.map((l: { tenant_id: any }) => l.tenant_id)).size
            : 0;

        // 3. Recent Activity (Latest Leads)
        const { data: recentLeads, error: feedError } = await supabase
            .from('leads')
            .select('id, name, status, created_at, tenant_id')
            .order('created_at', { ascending: false })
            .limit(5);

        return {
            leads: leadCount || 0,
            clinics: activeClinics || 1, // Default to 1 (self) if 0
            recentActivity: recentLeads || []
        };
    } catch (e) {
        console.error('Super Admin Stats Error:', e);
        return null;
    }
}
