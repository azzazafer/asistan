/**
 * Aura API Gateway v1.0
 * Security and routing for external integrations.
 */

import { generateSecureToken } from './security';

export interface APIKey {
    id: string;
    key: string;
    clinicalName: string;
    scopes: string[]; // ['read:leads', 'write:reports', 'sync:hbys']
    createdAt: string;
}

export class APIGateway {
    private static keys: APIKey[] = [];

    /**
     * Issue a new secure key for a partner clinic
     */
    static issueKey(clinicalName: string, scopes: string[]): APIKey {
        const key: APIKey = {
            id: `ak_${Date.now()}`,
            key: `aura_${generateSecureToken(24)}`,
            clinicalName,
            scopes,
            createdAt: new Date().toISOString()
        };
        this.keys.push(key);
        return key;
    }

    /**
     * Validates incoming request
     */
    static validateKey(inputKey: string, requiredScope: string): boolean {
        const found = this.keys.find(k => k.key === inputKey);
        if (!found) return false;
        return found.scopes.includes(requiredScope);
    }
}
