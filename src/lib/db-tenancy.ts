/**
 * Aura Enterprise DB Tenancy Wrapper v1.0
 * Automatically injects tenant_id into every query to prevent data bleeding.
 * This is the ultimate "Zero-Bleed" safety layer.
 */

import { TenancyManager } from './tenancy';

export interface QueryOptions {
    includeDeleted?: boolean;
    bypassTenancy?: boolean; // Use with EXTREME caution (System level only)
}

export class DBTenancyWrapper {

    /**
     * Injects the current tenant ID into any query filter.
     * Use this before every database call.
     */
    static injectTenantFilter<T extends Record<string, any>>(filter: T, options?: QueryOptions): T & { tenantId: string } {
        if (options?.bypassTenancy) {
            console.warn(`[Tenancy] EXTREME CAUTION: Bypassing tenancy for query on ${JSON.stringify(filter)}`);
            return filter as any;
        }

        const tenantId = TenancyManager.getTenant();

        // Ensure no attempt to spoof or override the tenantId in the filter
        if (filter.tenantId && filter.tenantId !== tenantId) {
            throw new Error(`[SECURITY_VIOLATION] Attempted to query tenant ${filter.tenantId} from context ${tenantId}`);
        }

        return {
            ...filter,
            tenantId
        };
    }

    /**
     * Wraps a result set to ensure every item belongs to the current tenant.
     * Final safety check on the way out to the UI.
     */
    static validateResultSet<T extends { tenantId?: string }>(results: T[]): T[] {
        const tenantId = TenancyManager.getTenant();

        // Filter out any anomalous data that might have leaked through (double safety)
        const validResults = results.filter(item => {
            if (!item.tenantId) {
                console.warn("[Tenancy] Entry missed tenantId attribute. Potential data leak risk.");
                return false;
            }
            return item.tenantId === tenantId;
        });

        if (validResults.length !== results.length) {
            console.error(`[TENANCY_LEAK_DETECTED] Intercepted ${results.length - validResults.length} leaked rows from unauthorized tenants!`);
        }

        return validResults;
    }

    /**
     * Injects tenancy into data mutation (Insert/Update)
     */
    static secureMutation<T extends Record<string, any>>(data: T): T & { tenantId: string, updatedAt: string } {
        const tenantId = TenancyManager.getTenant();

        return {
            ...data,
            tenantId,
            updatedAt: new Date().toISOString()
        };
    }
}
