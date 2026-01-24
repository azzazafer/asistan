import { supabase } from './db';
import { calculateRank } from './gamification';
import { calculateLeadScore } from './scoring';
import { saveLeadLocally } from './persistence';
import { Lead, SubjectRank } from './types';

// Global Lead Memory Removed to enforce database integrity in production.

export const getLeads = async (tenantId: string): Promise<Lead[]> => {
    if (!supabase) {
        console.warn("[Aura leads] Supabase client missing. System in degraded state.");
        return [];
    }

    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('date', { ascending: false });

    if (error) {
        console.error("Supabase getLeads error:", error.message);
        return [];
    }
    return data || [];
};

export const getLeadByPhone = async (phone: string, tenantId: string): Promise<Lead | null> => {
    if (supabase) {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('phone', phone)
            .eq('tenant_id', tenantId)
            .maybeSingle();

        if (error) {
            console.error("Supabase getLeadByPhone error:", error.message);
            return null;
        }
        return data;
    }
    return null;
};

export const addLead = async (lead: Lead) => {
    if (!lead.tenant_id) {
        throw new Error("[CRM] CRITICAL: Cannot persist lead without tenant_id.");
    }

    // Generate score if missing or if message content is fresh
    if (!lead.score || lead.last_message) {
        const scoring = calculateLeadScore({
            treatment: lead.treatment,
            culture: lead.culture,
            message: lead.last_message || undefined,
            isReferral: lead.is_referral
        });
        lead.score = scoring.score;
        lead.score_rank = scoring.rank;
    }

    // Generate rank from score
    if (!lead.rank && lead.score !== undefined) {
        lead.rank = calculateRank(lead.score);
    }


    if (supabase) {
        const { error } = await supabase.from('leads').upsert(lead);
        if (error) {
            console.error("Supabase addLead error:", error.message);
        }
    } else {
        console.warn("[Aura leads] Database connection offline. Lead could not be persisted to cloud.");
    }

    // Also save locally for persistence
    if (typeof window !== 'undefined') {

        saveLeadLocally(lead);
    }

    console.log("New Lead Processed:", lead);
};
