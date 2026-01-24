import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Connection State Check
const isSupabaseConfigured = supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey;

if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase is NOT configured. Aura OS is running in Amnesia Mode (Data will be lost).');
}

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;
