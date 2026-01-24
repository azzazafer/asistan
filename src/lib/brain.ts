/**
 * Aura Brain v3.0 - Intelligence Expansion
 * Handles Perpetual Learning, Knowledge Discovery, and Self-Correction.
 */

import { supabase } from './db';

export interface DiscoveryLog {
    id: string;
    term: string;
    context: string;
    status: 'pending' | 'verified' | 'ignored';
    confidence: number;
    discovered_at: string;
}

export class AuraBrain {

    /**
     * Perpetual Learning Loop
     * Fetches current state of knowledge from the database.
     */
    static async syncMedicalKnowledge(): Promise<{ totalTerms: number; pendingVerifications: number }> {
        console.log("[Brain] Initiating Neural Knowledge Sync...");

        if (!supabase) return { totalTerms: 0, pendingVerifications: 0 };

        // count verified terms
        const { count: termsCount } = await supabase
            .from('medical_glossary')
            .select('*', { count: 'exact', head: true });

        // count pending discoveries
        const { count: discoveryCount } = await supabase
            .from('discovery_logs')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        const syncResult = {
            totalTerms: termsCount || 0,
            pendingVerifications: discoveryCount || 0
        };

        await supabase.from('debug_logs').insert({
            event_name: 'brain_sync_complete',
            severity: 'low',
            data: syncResult,
            source: 'brain'
        });

        console.log(`[Brain] Sync complete: ${syncResult.totalTerms} terms found.`);
        return syncResult;
    }

    /**
     * Self-Correction Engine
     * Adjusts system context or terminology based on verified feedback hooks
     */
    static async selfCorrectionEngine(correction: { term: string; correctDefinition: string }) {
        console.log(`[Brain] Applying self-correction for: ${correction.term}`);

        if (supabase) {
            const { error } = await supabase
                .from('medical_glossary')
                .upsert({
                    term: correction.term,
                    definition_tr: correction.correctDefinition,
                    verified_by: 'ai_self_correction',
                    confidence_score: 0.95
                });

            if (error) console.error("[Brain] Correction fail:", error.message);
        }
    }

    /**
     * Discovery Queue Manager
     * Flags unknown technical terms for human-in-the-loop verification
     */
    static async addToDiscoveryQueue(term: string, context: string) {
        if (!supabase) return;

        // Check if term already exists in Glossary
        const { data: existing } = await supabase
            .from('medical_glossary')
            .select('id')
            .ilike('term', term)
            .maybeSingle();

        if (existing) return;

        console.log(`[Brain] New Discovery: "${term}" - Adding to validation queue.`);

        await supabase.from('discovery_logs').insert({
            term,
            context: context.substring(0, 500),
            status: 'pending',
            confidence: 0.1
        });
    }
}
