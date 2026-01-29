import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Redis from 'ioredis';

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
        // 1. Check Supabase
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { error: sbError } = await supabase.from('tenants').select('id').limit(1);

        if (sbError) {
            healthStatus.services.supabase = `unhealthy: ${sbError.message}`;
            healthStatus.status = 'degraded';
        } else {
            healthStatus.services.supabase = 'healthy';
        }

        // 2. Check Redis
        if (process.env.REDIS_URL) {
            const redis = new Redis(process.env.REDIS_URL, {
                maxRetriesPerRequest: 1,
                commandTimeout: 2000
            });

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
