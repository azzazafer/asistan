import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import Redis from 'ioredis';

export const dynamic = 'force-dynamic';

export async function GET() {
    const healthStatus: any = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
            supabase: 'checking',
            redis: 'checking'
        }
    };

    try {
        let sbError: any = null;
        if (!supabase) {
            healthStatus.services.supabase = 'unhealthy: client not initialized';
            healthStatus.status = 'degraded';
        } else {
            const { error } = await supabase.from('tenants').select('id').limit(1);
            sbError = error;
            if (sbError) {
                healthStatus.services.supabase = `unhealthy: ${sbError.message}`;
                healthStatus.status = 'degraded';
            } else {
                healthStatus.services.supabase = 'healthy';
            }
        }

        if (sbError) {
            console.warn('[Health Check] Supabase error:', sbError.message);
        } else {
            // This else block is reached if sbError is null.
            // If supabase was null, healthStatus.services.supabase would already be set to 'unhealthy: client not initialized'.
            // If supabase was available and no error, it would be 'healthy'.
            // This line ensures it's 'healthy' if no error occurred and supabase was initialized.
            // If supabase was not initialized, the previous 'unhealthy' status should persist.
            if (healthStatus.services.supabase === 'checking') { // Only set to healthy if it hasn't been set to unhealthy by client not initialized
                healthStatus.services.supabase = 'healthy';
            }
        }

        // 2. Check Redis
        if (process.env.REDIS_URL) {
            const redis = new Redis(process.env.REDIS_URL, {
                maxRetriesPerRequest: 1,
                commandTimeout: 2000
            });
            redis.on('error', () => { }); // Silence connection errors

            try {
                const ping = await redis.ping();
                if (ping === 'PONG') {
                    healthStatus.services.redis = 'healthy';
                } else {
                    healthStatus.services.redis = 'degraded: no pong';
                    healthStatus.status = 'degraded';
                }
            } catch (err: any) {
                healthStatus.services.redis = `unhealthy: ${err.message}`;
                healthStatus.status = 'degraded';
            } finally {
                redis.disconnect();
            }
        } else {
            healthStatus.services.redis = 'missing: REDIS_URL not set';
            healthStatus.status = 'degraded';
        }

        const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
        return NextResponse.json(healthStatus, { status: statusCode });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 });
    }
}
