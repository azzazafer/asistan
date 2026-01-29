import { supabase } from './db';
import { calculateRank } from './gamification';
import { calculateLeadScore } from './scoring';
import { saveLeadLocally } from './persistence';
import { Lead, SubjectRank } from './types';
import { encrypt, decrypt } from './crypto';
import { redactPII } from './security';

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
        // We search by exact phone comparison (assuming non-collision or searching by encrypted variant if deterministic)
        // Note: For real production search on encrypted fields, usually a hash index is used.
        // For now, we fetch leads and decrypt them for identification.

        const { data: leads, error } = await supabase
            .from('leads')
            .select('*')
            .eq('tenant_id', tenantId);

        if (error) {
            console.error("Supabase getLeadByPhone error:", error.message);
            return null;
        }

        const found = (leads as Lead[]).find(l => {
            const decryptedPhone = l.phone.includes(':') ? decrypt(l.phone) : l.phone;
            return decryptedPhone === phone;
        });

        if (found) {
            return {
                ...found,
                name: found.name.includes(':') ? decrypt(found.name) : found.name,
                phone: found.phone.includes(':') ? decrypt(found.phone) : found.phone
            };
        }
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
        // ENCRYPTION & SCRUBBING LAYER (HIPAA/GDPR Hardening)
        const securedLead = {
            ...lead,
            name: encrypt(lead.name),
            phone: encrypt(lead.phone),
            last_message: lead.last_message ? encrypt(lead.last_message) : lead.last_message,
            // Scrub History for extra security before persistent storage
            history: lead.history ? lead.history.map(h => ({
                ...h,
                content: redactPII(h.content)
            })) : undefined
        };

        const { error } = await supabase.from('leads').upsert(securedLead);
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
