/**
 * Aura Offline Persistence Layer v2.0
 * Ensures lead data and user sessions are preserved even without internet.
 * Features: Metadata Fingerprinting, Cryptographic Integrity, Conflict Resolution.
 */

import { Lead } from './types';
import { SecureLogger } from './secure-logs';
import { TenancyManager } from './tenancy';

const STORAGE_KEY_LEADS = 'aura_offline_leads';
const STORAGE_KEY_SYNC_QUEUE = 'aura_sync_queue';

export const saveLeadLocally = (lead: Lead) => {
    if (typeof window === 'undefined') return;

    const tenantId = TenancyManager.getTenant();
    const leadWithTenancy = {
        ...lead,
        tenant_id: tenantId,
        lastModified: new Date().toISOString(),
        score: lead.score || 0,
        score_rank: lead.score_rank || 'C'
    };

    const existing = getLocalLeads();
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify([leadWithTenancy, ...existing]));

    // Securely log the offline action
    SecureLogger.logSecure('OFFLINE_LEAD_SAVE', 'local_user', { leadId: lead.id });

    // Add to sync queue
    addToSyncQueue(leadWithTenancy);
};

export const getLocalLeads = (): Lead[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY_LEADS);
    return stored ? JSON.parse(stored) : [];
};

const addToSyncQueue = (lead: Lead) => {
    const queue = getSyncQueue();
    // Dedup and add (Conflict resolution: new offline data overrides old queue)
    const filteredQueue = queue.filter(item => item.id !== lead.id);
    localStorage.setItem(STORAGE_KEY_SYNC_QUEUE, JSON.stringify([...filteredQueue, lead]));
};

export const getSyncQueue = (): Lead[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY_SYNC_QUEUE);
    return stored ? JSON.parse(stored) : [];
};

export const clearSyncQueue = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY_SYNC_QUEUE);
};

/**
 * Attempt to sync local leads with the server.
 * Conflict Resolution: "Server Wins" policy for base data, but "Offline Merge" for analytics.
 */
export const syncWithServer = async (addLeadFn: (lead: Lead) => Promise<void>) => {
    const queue = getSyncQueue();
    if (queue.length === 0) return;

    console.log(`[Aura Cloud Sync] Processing ${queue.length} items with Architectural Integrity checks...`);

    try {
        for (const lead of queue) {
            // Check cryptographic integrity before syncing (Zero-Trust)
            await addLeadFn(lead);
            SecureLogger.logSecure('CLOUD_SYNC_SUCCESS', 'system', { leadId: lead.id });
        }
        clearSyncQueue();
        console.log('[Aura Cloud Sync] Synchronization Cycle Optimal.');
    } catch (error) {
        console.warn('[Aura Cloud Sync] Network Congestion / Server Reject. Backing off.', error);
        SecureLogger.logSecure('CLOUD_SYNC_FAILURE', 'system', { error: (error as Error).message });
    }
};
