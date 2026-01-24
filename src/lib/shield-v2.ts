/**
 * Aura Advanced Shield v2.0 (Resilience & Anti-Fraud)
 * Implements Circuit Breaker patterns and behavioral fingerprinting.
 */

export type ServiceStatus = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface ShieldConfig {
    failureThreshold: number;
    resetTimeout: number; // ms
}

const SHIELD_CONFIG: ShieldConfig = {
    failureThreshold: 5,
    resetTimeout: 30000 // 30 seconds
};

export class AdvancedShield {
    private static failures: Record<string, number> = {};
    private static lastFailure: Record<string, number> = {};
    private static state: Record<string, ServiceStatus> = {};

    /**
     * Circuit Breaker: Prevents cascading failures.
     * If a service fails too many times, it "opens" the circuit and stops calls.
     */
    static checkCircuit(serviceName: string): boolean {
        const currentState = this.state[serviceName] || 'CLOSED';

        if (currentState === 'OPEN') {
            const timeSinceLastFailure = Date.now() - (this.lastFailure[serviceName] || 0);

            if (timeSinceLastFailure > SHIELD_CONFIG.resetTimeout) {
                this.state[serviceName] = 'HALF_OPEN';
                console.log(`[Shield] Circuit HALF_OPEN for ${serviceName}. Testing recovery...`);
                return true;
            }
            return false; // Circuit is still open, block traffic
        }

        return true;
    }

    static recordFailure(serviceName: string) {
        this.failures[serviceName] = (this.failures[serviceName] || 0) + 1;
        this.lastFailure[serviceName] = Date.now();

        if (this.failures[serviceName] >= SHIELD_CONFIG.failureThreshold) {
            this.state[serviceName] = 'OPEN';
            console.error(`[Shield] CIRCUIT BREAKER OPEN for ${serviceName}! High failure rate detected.`);
        }
    }

    static recordSuccess(serviceName: string) {
        this.failures[serviceName] = 0;
        this.state[serviceName] = 'CLOSED';
    }

    /**
     * Anti-Fraud Fingerprinting
     * Identifies suspicious behavior patterns.
     */
    static detectAnomalousRequest(headers: Record<string, string>, payload: any): { safe: boolean; reason?: string } {
        const userAgent = headers['user-agent'] || '';
        const ip = headers['x-forwarded-for'] || 'unknown';

        // Check for common bot patterns
        if (userAgent.toLowerCase().includes('bot') || userAgent.toLowerCase().includes('crawler')) {
            return { safe: false, reason: 'Automated Crawler Detected' };
        }

        // Check for rapid-fire payloads (Heuristic)
        if (payload && JSON.stringify(payload).length > 1000000) {
            return { safe: false, reason: 'Payload Oversize Attack' };
        }

        return { safe: true };
    }
}
