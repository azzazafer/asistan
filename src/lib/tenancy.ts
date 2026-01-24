import { supabase } from './db';

export interface TenantConfig {
    id: string;
    name: string;
    domain: string;
    settings: {
        whatsapp_number?: string;
        instagram_page_id?: string;
        telegram_bot_token?: string;
        [key: string]: any;
    };
}

/**
 * TenancyManager: System-wide Utility for current tenant context.
 * Used by SEO, persistence, and DB wrappers.
 */
export class TenancyManager {
    private static overrideTenant: string | null = null;
    private static overrideTier: 'STARTUP' | 'SME' | 'ENTERPRISE' | null = null;

    /**
     * Manually sets the current tenant context. Primarily used for testing/stress tests.
     */
    static setTenant(tenantId: string, tier: string = 'SME'): void {
        this.overrideTenant = tenantId;
        this.overrideTier = tier as any;
        console.log(`[Tenancy] Context manually set to: ${tenantId} (${tier})`);
    }

    /**
     * Detects the current tenant ID from headers (Server), Location (Client), or Override.
     */
    static getTenant(): string {
        if (this.overrideTenant) return this.overrideTenant;

        // SERVER SIDE (Next.js App Router)
        if (typeof window === 'undefined') {
            try {
                const { headers } = require('next/headers');
                const headerList = headers();
                return headerList.get('x-aura-tenant-id') || 'default_clinic';
            } catch (e) {
                // Not in a request context (e.g., build time or background job)
                return 'default_clinic';
            }
        }

        // CLIENT SIDE
        const host = window.location.host;
        if (host.includes('.auraos.com')) {
            return host.split('.')[0];
        }

        // Check for cookie fallback (set by middleware)
        const match = document.cookie.match(/(^|;)\s*aura_tenant_id\s*=\s*([^;]+)/);
        return match ? match[2] : 'default_clinic';
    }

    /**
     * Returns the service tier for the current tenant.
     */
    static getTier(): 'STARTUP' | 'SME' | 'ENTERPRISE' {
        if (this.overrideTier) return this.overrideTier;

        // For now, hardcoded or derived from tenantId
        const tenantId = this.getTenant();
        if (tenantId === 'default_clinic') return 'ENTERPRISE';
        return 'SME';
    }
}

export class TenancyService {
    private static cache: Map<string, string> = new Map(); // ReceiverID -> TenantID

    /**
     * Resolves the Tenant ID based on the receiver ID (e.g., the WhatsApp number that received the message).
     */
    static async resolveTenantId(receiverId: string, source: 'whatsapp' | 'instagram' | 'telegram'): Promise<string> {
        // 1. Check Cache
        const cacheKey = `${source}:${receiverId}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        if (!supabase) return 'default_clinic';

        // 2. Query Database
        // We look into settings JSONB column to find the matching receiver ID
        const { data: tenants, error } = await supabase
            .from('tenants')
            .select('id, settings')
            .eq('status', 'active');

        if (error || !tenants) {
            console.error('[Tenancy] Error fetching tenants:', error?.message);
            return 'default_clinic';
        }

        for (const tenant of tenants) {
            const settings = tenant.settings || {};
            let match = false;

            if (source === 'whatsapp' && settings.whatsapp_number === receiverId) match = true;
            if (source === 'instagram' && settings.instagram_page_id === receiverId) match = true;
            if (source === 'telegram' && settings.telegram_bot_token === receiverId) match = true;

            if (match) {
                console.log(`[Tenancy] Resolved: ${receiverId} -> ${tenant.id}`);
                this.cache.set(cacheKey, tenant.id);
                return tenant.id;
            }
        }

        console.warn(`[Tenancy] No mapping found for ${source}:${receiverId}. Falling back to default.`);
        return 'default_clinic';
    }

    /**
     * Clears local tenancy cache
     */
    static clearCache() {
        this.cache.clear();
    }
}
