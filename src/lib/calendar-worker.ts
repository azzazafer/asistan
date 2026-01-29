import Redis from 'ioredis';
import { createClient } from '@supabase/supabase-js';

const redis = new Redis(process.env.REDIS_URL!);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Smart Calendar Worker
 * Syncs hospital slots to Redis every 5 minutes to ensure sub-10ms AI response times.
 */
export async function syncClinicSlots() {
    console.log('[CalendarWorker] Starting slot synchronization...');

    try {
        // 1. Fetch active clinics
        const { data: locations, error } = await supabase.from('locations').select('id, hospital_api_config');

        if (error) throw error;

        for (const clinic of locations) {
            // 2. Simulate Hospital API Call (The slow part)
            // In production: const slots = await hitHospitalAPI(clinic.hospital_api_config);
            const mockSlots = [
                { time: '2026-02-01T10:00:00Z', available: true },
                { time: '2026-02-01T11:00:00Z', available: true },
                { time: '2026-02-01T14:30:00Z', available: true }
            ];

            // 3. Save to Redis (The fast part)
            const cacheKey = `slots:clinic:${clinic.id}`;
            await redis.set(cacheKey, JSON.stringify(mockSlots), 'EX', 600); // 10 min TTL

            console.log(`[CalendarWorker] Cached slots for clinic ${clinic.id}`);
        }

    } catch (error) {
        console.error('[CalendarWorker] Critical sync error:', error);
    }
}

/**
 * AI Tool Logic: Read from Redis Cache
 */
export async function getCachedSlots(clinicId: string) {
    const data = await redis.get(`slots:clinic:${clinicId}`);
    return data ? JSON.parse(data) : null;
}
