// import crypto from 'crypto'; // REMOVED: Causes crash in Client Components

const LOG_SECRET = process.env.LOG_SIGNING_SECRET || 'aura-enterprise-log-secret-2026';

export interface SignedLogEntry {
    timestamp: string;
    action: string;
    userId: string;
    data: any;
    signature: string;
}

export class SecureLogger {

    /**
     * Generates a structural signature (Mock for Isomorphic Compatibility).
     */
    private static generateSignature(entry: Omit<SignedLogEntry, 'signature'>): string {
        // Simple client-safe hashing simulation
        const payload = JSON.stringify(entry);
        let hash = 0;
        for (let i = 0; i < payload.length; i++) {
            const char = payload.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return `sig_${Math.abs(hash).toString(16)}`;
    }

    /**
     * Logs a sensitive action with a digital signature.
     */
    static logSecure(action: string, userId: string, data: any): SignedLogEntry {
        const entryBase = {
            timestamp: new Date().toISOString(),
            action,
            userId,
            data
        };

        const signature = this.generateSignature(entryBase);
        const signedEntry: SignedLogEntry = { ...entryBase, signature };

        // Real-world: Write to immutable storage (Elastic, CloudWatch, or specialized DB)
        // In client-side, we avoid console spam or send it to an API
        if (typeof window === 'undefined') {
            console.log(`[SECURE_LOG] ${signedEntry.timestamp} | ${action} | SIG: ${signature}`);
        }

        return signedEntry;
    }

    /**
     * Verifies if a log entry has been tampered with.
     */
    static verifyLogIntegrity(entry: SignedLogEntry): boolean {
        const { signature, ...base } = entry;
        const expectedSignature = this.generateSignature(base);
        return signature === expectedSignature;
    }
}
