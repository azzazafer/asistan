import { supabase } from './supabase-client';
import { ScoreResult } from './scoring';

/**
 * Aura Persistence Layer v1.0
 * Handles the storage and retrieval of Neural Core states for long-term strategic memory.
 */

export const upsertLeadNeuralState = async (leadId: string, state: ScoreResult): Promise<void> => {
    if (!supabase) return;

    const { error } = await supabase
        .from('leads')
        .update({
            pain_point_vault: state.pain_point_vault,
            bias_analysis: state.bias_analysis,
            cialdini_matrix: state.cialdini_matrix,
            anchor_value: state.anchor_value,
            closing_probability: state.closing_probability,
            neural_score: state.score,
            neural_rank: state.rank,
            neural_status: state.status,
            reasons: state.reasons,
            suggested_strategy: state.suggested_strategy,
            next_diagnostic_question: state.next_diagnostic_question,
            last_activity_timestamp: new Date().toISOString()
        })
        .eq('id', leadId);

    if (error) {
        console.error(`[Neural Core Persistence] Failed to upsert state for lead ${leadId}:`, error);
        throw new Error('Database persistence failure');
    }
};

export const getLeadNeuralState = async (leadId: string): Promise<ScoreResult | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('leads')
        .select(`
            pain_point_vault,
            bias_analysis,
            cialdini_matrix,
            anchor_value,
            closing_probability,
            neural_score,
            neural_rank,
            neural_status,
            reasons,
            suggested_strategy,
            next_diagnostic_question
        `)
        .eq('id', leadId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error(`[Neural Core Persistence] Failed to fetch state for lead ${leadId}:`, error);
        return null;
    }

    if (!data) return null;

    // Map database fields back to ScoreResult interface
    return {
        score: data.neural_score,
        rank: data.neural_rank,
        status: data.neural_status,
        reasons: data.reasons || [],
        pain_point_vault: data.pain_point_vault || [],
        anchor_value: data.anchor_value || 0,
        bias_analysis: data.bias_analysis,
        cialdini_matrix: data.cialdini_matrix,
        suggested_strategy: data.suggested_strategy,
        next_diagnostic_question: data.next_diagnostic_question,
        closing_probability: data.closing_probability || 0
    } as ScoreResult;
};

/**
 * Saves lead data locally (Browser Storage) for secondary redundancy.
 */
export const saveLeadLocally = (lead: any): void => {
    if (typeof window !== 'undefined') {
        try {
            const memory = JSON.parse(localStorage.getItem('aura_lead_memory') || '{}');
            memory[lead.phone] = { ...lead, last_seen: new Date().toISOString() };
            localStorage.setItem('aura_lead_memory', JSON.stringify(memory));
        } catch (e) {
            console.warn("[Memory] Local persistence failed:", e);
        }
    }
};

/**
 * Returns all leads stored in local browser memory.
 * Falls back to empty array in server-side context.
 */
export const getLocalLeads = (): any[] => {
    if (typeof window === 'undefined') return [];
    try {
        const memory = JSON.parse(localStorage.getItem('aura_lead_memory') || '{}');
        return Object.values(memory);
    } catch {
        return [];
    }
};

/**
 * Syncs local lead memory with the server (Supabase).
 * Called from dashboard to reconcile offline-cached leads.
 */
export const syncWithServer = async (tenantId: string): Promise<{ synced: number; errors: number }> => {
    const localLeads = getLocalLeads();
    if (localLeads.length === 0) return { synced: 0, errors: 0 };

    const { addLead } = await import('./leads');
    let synced = 0;
    let errors = 0;

    for (const lead of localLeads) {
        try {
            await addLead({ ...lead, tenant_id: tenantId });
            synced++;
        } catch {
            errors++;
        }
    }

    if (synced > 0) {
        // Basarili sync sonrasi local memory'i temizle
        if (typeof window !== 'undefined') {
            localStorage.removeItem('aura_lead_memory');
        }
    }

    console.log(`[Persistence] Sync: ${synced} basarili, ${errors} hatali.`);
    return { synced, errors };
};

