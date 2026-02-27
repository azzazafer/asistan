import { supabase } from './db';
import { calculateRank } from './gamification';
import { calculateLeadScore } from './scoring';
import { saveLeadLocally, getLeadNeuralState } from './persistence';
import { Lead, SubjectRank } from './types';
import { encrypt, decrypt, generateSearchHash } from './crypto';
import { redactPII } from './security';
import { LearningService } from './ai/learning';

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
        const phoneHash = generateSearchHash(phone);

        const { data: found, error } = await supabase
            .from('leads')
            .select('*')
            .eq('tenant_id', tenantId)
            .eq('phone_hash', phoneHash)
            .maybeSingle();

        if (error) {
            console.error("Supabase getLeadByPhone error:", error.message);
            return null;
        }

        if (found) {
            return {
                ...(found as Lead),
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

    // 🧠 WIN ANALYSIS TRIGGER: Detect status change to "Randevu Onaylandı"
    let shouldTriggerLearning = false;
    if (supabase && lead.status === 'Randevu Onaylandı') {
        // Fetch old lead to compare status
        const existingLead = await getLeadByPhone(lead.phone, lead.tenant_id);
        if (existingLead && existingLead.status !== 'Randevu Onaylandı') {
            // Status JUST changed to converted
            shouldTriggerLearning = true;
        }
    }

    // 🧠 NEURAL CORE v2.0: Strategic Memory Integration
    if (!lead.score || lead.last_message) {
        // Fetch previous psychological state from memory
        const previousState = lead.id ? await getLeadNeuralState(lead.id) : null;

        const scoring = calculateLeadScore({
            treatment: lead.treatment,
            culture: lead.culture,
            message: lead.last_message || undefined,
            isReferral: lead.is_referral,
            lastActivityTimestamp: Date.now()
        }, previousState || undefined);

        // Map Neutral Core results to Lead object
        lead.score = scoring.score;
        lead.score_rank = scoring.rank;
        lead.rank = scoring.rank; // Sync both for compatibility
        lead.pain_point_vault = scoring.pain_point_vault;
        lead.anchor_value = scoring.anchor_value;
        lead.bias_analysis = scoring.bias_analysis;
        lead.cialdini_matrix = scoring.cialdini_matrix;
        lead.suggested_strategy = scoring.suggested_strategy;
        lead.next_diagnostic_question = scoring.next_diagnostic_question;
        lead.closing_probability = scoring.closing_probability;
        lead.neural_status = scoring.status;
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
            phone_hash: generateSearchHash(lead.phone),
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

        // 🧠 ACTIVATE LEARNING: Fire-and-forget win analysis
        if (shouldTriggerLearning && lead.history && lead.history.length > 3) {
            console.log(`🧠 [INTELLIGENCE ACTIVATED] Analyzing win for lead ${lead.id}...`);
            // Fire-and-forget: Don't await, don't block
            LearningService.analyzeWin(
                lead.id || 'unknown',
                lead.history,
                lead.tenant_id
            ).catch(e => console.error('[Win Analysis Error]', e));
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
