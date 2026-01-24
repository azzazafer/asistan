import { supabase } from './db';

export interface PatientData {
    lead: any;
    appointments: any[];
    documents: any[];
}

export async function getPatientData(accessCode: string, tenantId: string): Promise<PatientData | null> {
    if (!supabase) return null;

    // 1. Fetch Lead (The Patient) with Tenancy
    const { data: lead, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('tenant_id', tenantId)
        .or(`phone.eq.${accessCode},id.eq.${accessCode.includes('-') ? accessCode : '00000000-0000-0000-0000-000000000000'}`) // ID check if UUID
        .maybeSingle();

    if (leadError || !lead) return null;

    // 2. Fetch Appointments for this lead (Multi-Tenant)
    const { data: appointments } = await supabase
        .from('appointments')
        .select(`
            *,
            doctor:doctors(name, specialty)
        `)
        .eq('lead_id', lead.id)
        .eq('tenant_id', tenantId)
        .order('start_time', { ascending: true });

    // 3. Fetch Documents for this lead (Multi-Tenant)
    const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .eq('lead_id', lead.id)
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

    return {
        lead,
        appointments: appointments || [],
        documents: documents || []
    };
}
