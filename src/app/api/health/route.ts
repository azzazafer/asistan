/**
 * Aura Health API - System Health Check
 * Returns overall system health status
 */

import { NextResponse } from 'next/server';
import { getSystemHealth } from '@/lib/analytics';

export async function GET() {
    try {
        const health = getSystemHealth();

        return NextResponse.json({
            status: health.status,
            uptime: health.uptime,
            latency: health.latency,
            errorRate: health.errorRate,
            activeUsers: health.activeUsers,
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[API] Health check error:', error);
        return NextResponse.json(
            { status: 'unhealthy', error: 'Health check failed' },
            { status: 503 }
        );
    }
}
