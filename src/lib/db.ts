/**
 * Aura DB Layer v4.0 (Global SaaS & Edge Optimized)
 * Multi-Tenancy support and Connection Pooling.
 */


import { supabase } from './supabase-client';
export { supabase };

// Memory Helper for tracking user context
export interface UserProfile {
    id: string; // phone or unique id
    tenant_id: string; // Master Clinic ID (Phase 6)
    name?: string;
    language: string;
    history: any[];
    last_treatment?: string; // Snake case to match DB
    role?: string; // 'admin', 'doctor', 'user', etc.
    metadata?: any; // New: Phase 3
}

// Simulated local memory for development (Fallback ONLY if DB fails)
const localMemory: Record<string, UserProfile> = {};

// Auth Helper
export const getCurrentUser = async () => {
    if (!supabase) return null;
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
};

export const getProfile = async (id: string): Promise<UserProfile | null> => {
    // Try Supabase first
    if (supabase) {
        try {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
            if (!error && data) return data;

            // If not found in profiles but exists in auth, create profile
            const user = await getCurrentUser();
            if (user && user.id === id) {
                const newProfile: UserProfile = {
                    id: user.id,
                    tenant_id: user.user_metadata?.tenant_id || 'default_clinic',
                    name: user.user_metadata?.full_name || '',
                    language: 'tr',
                    history: []
                };
                await saveProfile(newProfile);
                return newProfile;
            }

            if (error && error.code !== 'PGRST116') {
                console.error('Supabase Read Error:', error);
            }
        } catch (e) {
            console.error('Supabase Connection Failed:', e);
        }
    }

    // Fallback meant for development only
    return localMemory[id] || null;
};

export const saveProfile = async (profile: UserProfile) => {
    if (supabase) {
        const { error } = await supabase.from('profiles').upsert({
            id: profile.id,
            tenant_id: profile.tenant_id, // Phase 6 Tenancy
            name: profile.name,
            language: profile.language,
            history: profile.history,
            last_treatment: profile.last_treatment,
            role: profile.role || 'user',
            metadata: profile.metadata || {}
        });

        if (error) console.error('Supabase Write Error:', error);
    }

    // Always update local cache for speed/fallback
    localMemory[profile.id] = profile;
};

// Lead Management
export interface Agent {
    id: string;
    name: string;
    email: string;
    phone: string;
    referral_code: string;
    commission_rate: number;
    status: 'active' | 'pending' | 'suspended';
}

export const getAgentByCode = async (code: string): Promise<Agent | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('referral_code', code.toUpperCase())
        .eq('status', 'active')
        .single();

    if (error || !data) return null;
    return data;
};

export const fetchLeadsFromCloud = async (tenantId: string = 'default_clinic') => {
    const { decryptAES256 } = await import('./security');
    if (supabase) {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('tenant_id', tenantId)
            .order('date', { ascending: false });

        if (!error && data) {
            return data.map((lead: any) => ({
                ...lead,
                phone: decryptAES256(lead.phone),
                notes: lead.notes ? decryptAES256(lead.notes) : lead.notes
            }));
        }
        console.error('Supabase Fetch Error:', error);
    }
    return null;
};

export const saveLeadToCloud = async (lead: any) => {
    const { encryptAES256 } = await import('./security');
    if (supabase) {
        // Ensure lead matches DB schema and sensitive data is encrypted
        const dbLead = {
            tenant_id: lead.tenant_id || 'default_clinic',
            name: lead.name,
            phone: encryptAES256(lead.phone),
            treatment: lead.treatment,
            status: lead.status,
            source: lead.source,
            channel: lead.channel,
            culture: lead.culture,
            notes: lead.notes ? encryptAES256(lead.notes) : null,
            rank: lead.rank,
            score: lead.score || 0,
            score_rank: lead.score_rank || 'COLD',
            agent_id: lead.agent_id || null,
            attribution_source: lead.attribution_source || 'direct',
            date: new Date().toISOString()
        };

        const { error } = await supabase.from('leads').upsert(dbLead);
        if (error) {
            console.error('Supabase Save Error:', error);
            return false;
        }
        return true;
    }
    return false;
};
