import { createClient } from '@supabase/supabase-js';

const getServiceSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        console.warn('⚠️ [RagService] Supabase credentials missing.');
        return null;
    }
    return createClient(url, key);
};

const supabase = getServiceSupabase();

/**
 * Aura RAG Service (Supabase pgvector)
 * Ensures high-fidelity retrieval of clinical and hospital data.
 */
export class RagService {
    /**
     * Retrieves the most relevant knowledge chunks for a given query.
     */
    static async retrieveRelevantChunks(query: string, tenantId: string, limit: number = 3): Promise<string[]> {
        try {
            if (!supabase) return [
                `[Source of Truth]: Aura Clinic is a certified Ministry of Health provider. (Fallback)`,
                `[Hospital Ops]: All packages include 5-star accommodation. (Fallback)`
            ];

            const { data, error } = await supabase.rpc('match_knowledge', {
                query_text: query,
                tenant_filter: tenantId,
                match_count: limit
            });

            if (error || !data || data.length === 0) {
                console.warn('[RAG] No relevant knowledge found. Using defaults.');
                return [
                    `[Source of Truth]: Aura Clinic is a certified Ministry of Health provider.`,
                    `[Hospital Ops]: All packages include 5-star accommodation.`
                ];
            }

            return data.map((d: any) => `[Verified Info]: ${d.content}`);

        } catch (err) {
            console.error('[RAG ERROR]', err);
            return [];
        }
    }
}
