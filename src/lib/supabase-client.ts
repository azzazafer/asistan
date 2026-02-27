/**
 * Aura Supabase Client — Global Singleton Pattern
 *
 * Vercel/Next.js serverless ortamında her Lambda invocation'da
 * yeni client oluşturmak Supabase connection pool'unu tüketir.
 * Bu implementasyon global scope'da tek instance tutar:
 *   - Eğer globalThis üzerinde var olan bir client varsa → onu döner
 *   - Varsa yeniden createClient yapmaz → pool korunur
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

const isConfigured =
    supabaseUrl &&
    supabaseUrl.startsWith('http') &&
    supabaseAnonKey.length > 0;

if (!isConfigured) {
    console.warn(
        '[Supabase] ⚠️ Credentials eksik. Aura OS Amnesia Mode aktif (veri kaybedilir).'
    );
}

// Global singleton tipi — TypeScript global'e ekleme
declare global {
    // eslint-disable-next-line no-var
    var __supabase_singleton: SupabaseClient | null;
}

function getSupabaseClient(): SupabaseClient | null {
    if (!isConfigured) return null;

    // Mevcut instance'ı yeniden kullan (serverless warm container)
    if (globalThis.__supabase_singleton) {
        return globalThis.__supabase_singleton;
    }

    // Yeni instance oluştur — yalnızca ilk cold start'ta
    const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            // Serverless ortamda cookie/localStorage yok; token'ı memory'de tut
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        },
        db: {
            // pgbouncer transaction mode: her sorgu ayrı connection kullanmaz
            schema: 'public'
        },
        global: {
            headers: {
                // Aura OS identifier — Supabase dashboard'da izlenebilir
                'x-aura-client': 'aura-os-v5'
            }
        }
    });

    globalThis.__supabase_singleton = client;
    console.log('[Supabase] ✅ Global singleton client oluşturuldu.');
    return client;
}

export const supabase = getSupabaseClient();
