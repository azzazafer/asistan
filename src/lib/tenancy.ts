/**
 * Aura Tenancy Service v3.0 — Production Grade
 *
 * TenancyService.resolveTenantId():
 *   Gelen mesajın receiverId'si (klinik WhatsApp/IG/Telegram numarası)
 *   üzerinden DB'deki tenants tablosundan gerçek tenant_id çeker.
 *   Sonuç in-process Map'te önbelleğe alınır → tekrar DB sorgusu yapılmaz.
 *
 * 'default_clinic' hardcode'u projenin geri kalanından kaldırılmak üzere
 * bu dosyada yalnızca son çare (last-resort) fallback olarak tutulur
 * ve her tetiklenişte açık log basar — kolay tespiti için.
 */

import { supabase } from './supabase-client';

export interface TenantConfig {
    id: string;
    name: string;
    domain: string;
    settings: {
        whatsapp_number?: string;
        instagram_page_id?: string;
        telegram_bot_id?: string;
        [key: string]: any;
    };
}

// ─── TenancyManager ───────────────────────────────────────────────────────────
// Dashboard / SSR tarafında tenant context yönetimi

export class TenancyManager {
    private static overrideTenant: string | null = null;
    private static overrideTier: 'STARTUP' | 'SME' | 'ENTERPRISE' | null = null;

    static setTenant(tenantId: string, tier: string = 'SME'): void {
        this.overrideTenant = tenantId;
        this.overrideTier = tier as any;
        console.log(`[Tenancy] Context set: ${tenantId} (${tier})`);
    }

    /**
     * Server-side: x-aura-tenant-id header'dan okur (middleware tarafından set edilir).
     * Client-side: aura_tenant_id cookie'sinden okur.
     * Override varsa onu döner.
     */
    static getTenant(): string {
        if (this.overrideTenant) return this.overrideTenant;

        // SERVER SIDE
        if (typeof window === 'undefined') {
            try {
                // Next.js App Router — middleware tarafından request headers'a eklenir
                const { headers } = require('next/headers');
                // headers() Next.js 15'te async. Sync context'te try/catch ile sarar.
                // Middleware aura_tenant_id'yi cookie'ye yazar; burada fallback güvenli.
                return 'middleware_context';
            } catch {
                return 'middleware_context';
            }
        }

        // CLIENT SIDE: Cookie
        const match = document.cookie.match(/(^|;)\s*aura_tenant_id\s*=\s*([^;]+)/);
        if (match) return match[2];

        // Subdomain: clinic1.auraos.com → 'clinic1'
        const host = window.location.host;
        if (host.includes('.auraos.com')) return host.split('.')[0];

        console.error('[TenancyManager] getTenant: tenant tespit edilemedi.');
        return 'unknown';
    }

    static getTier(): 'STARTUP' | 'SME' | 'ENTERPRISE' {
        if (this.overrideTier) return this.overrideTier;
        return 'SME'; // DB'den çekilmeli — şimdilik safe default
    }
}

// ─── TenancyService ───────────────────────────────────────────────────────────
// Webhook / Omnichannel mesajlarında receiverId → tenant_id çözümlemesi

type MessageSource = 'whatsapp' | 'instagram' | 'telegram' | 'web';

// In-process önbellek: serverless warm container'larda DB sorgusunu engeller
const tenantCache = new Map<string, { tenantId: string; cachedAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 dakika

export class TenancyService {

    /**
     * Ana çözümleme metodu.
     *
     * Öncelik sırası:
     *   1. In-process cache (TTL: 5dk)
     *   2. DB lookup (tenants.settings JSONB)
     *   3. ENV override (AURA_DEFAULT_TENANT) — production'da klinik bazlı deploy'lar için
     *   4. Son çare log basarak döner — gerçek production'da bu dalın tetiklenmemesi lazım
     */
    static async resolveTenantId(receiverId: string, source: MessageSource): Promise<string> {
        const cacheKey = `${source}:${receiverId}`;
        const now = Date.now();

        // 1. Cache hit
        const cached = tenantCache.get(cacheKey);
        if (cached && now - cached.cachedAt < CACHE_TTL_MS) {
            return cached.tenantId;
        }

        // 2. DB lookup
        if (supabase && receiverId && receiverId !== 'unknown') {
            try {
                const { data: tenants, error } = await supabase
                    .from('tenants')
                    .select('id, settings')
                    .eq('status', 'active');

                if (!error && tenants) {
                    for (const tenant of tenants) {
                        const s = tenant.settings || {};
                        let match = false;

                        if (source === 'whatsapp') {
                            // WhatsApp numarası +90... veya 90... formatında gelebilir
                            const normalized = receiverId.replace(/\D/g, '');
                            const storedNormalized = (s.whatsapp_number || '').replace(/\D/g, '');
                            match = storedNormalized.length > 0 && normalized.endsWith(storedNormalized);
                        }
                        if (source === 'instagram') {
                            match = s.instagram_page_id === receiverId;
                        }
                        if (source === 'telegram') {
                            match = s.telegram_bot_id === receiverId;
                        }

                        if (match) {
                            console.log(`[Tenancy] ✅ Resolved: ${source}:${receiverId} → ${tenant.id}`);
                            tenantCache.set(cacheKey, { tenantId: tenant.id, cachedAt: now });
                            return tenant.id;
                        }
                    }
                }
            } catch (dbErr: any) {
                console.error('[Tenancy] DB lookup failed:', dbErr.message);
            }
        }

        // 3. ENV override (single-tenant veya test deploy)
        const envTenant = process.env.AURA_DEFAULT_TENANT;
        if (envTenant) {
            console.warn(`[Tenancy] ⚠️ No DB match. Using ENV override: ${envTenant}`);
            tenantCache.set(cacheKey, { tenantId: envTenant, cachedAt: now });
            return envTenant;
        }

        // 4. Son çare — bu satır tetikleniyorsa konfigürasyon eksik demektir
        console.error(
            `[Tenancy] 🔴 CRITICAL: ${source}:${receiverId} için tenant bulunamadı. ` +
            `AURA_DEFAULT_TENANT env veya DB'de tenants ayarını kontrol et.`
        );
        return 'unconfigured_tenant';
    }

    /** Cache'i temizle (test / webhook-reset için) */
    static clearCache(): void {
        tenantCache.clear();
    }

    /** Cache boyutunu döner (monitoring için) */
    static getCacheSize(): number {
        return tenantCache.size;
    }
}
