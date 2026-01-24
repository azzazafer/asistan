/**
 * Aura Health API - Security Status Endpoint
 * Returns security dashboard and system health
 */

import { NextResponse } from 'next/server';
import { getSecurityDashboard } from '@/lib/shield';
import { getSystemHealth } from '@/lib/analytics';

export async function GET() {
    try {
        const security = getSecurityDashboard();
        const health = getSystemHealth();

        return NextResponse.json({
            success: true,
            data: {
                security: {
                    threatLevel: security.threatLevel,
                    blockedIPs: security.blockedIPs,
                    recentEvents: security.recentEvents.length,
                    circuitBreakers: security.circuitBreakers,
                },
                system: health,
                shields: {
                    rateLimit: 'active',
                    ddosProtection: 'active',
                    sqlInjection: 'active',
                    xssFilter: 'active',
                    bruteForce: 'active',
                    circuitBreaker: 'active',
                    anomalyDetection: 'active',
                },
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error('[API] Security status error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to get security status' },
            { status: 500 }
        );
    }
}
