import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/shield';

/**
 * ⚠️ FEATURE DISABLED: Telemedicine
 * Reason: No video SDK integration (Daily.co/Twilio Video not configured)
 * Status: Ghost code - creates DB entries but no actual video capability
 * Action: Return 503 until video SDK is integrated
 */
export async function POST(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    try {
        const body = await req.json();

        // 0. Security Shield Validation
        const security = validateRequest(ip, 'POST', '/api/telemedicine/create-room', userAgent, body);
        if (!security.valid) {
            return NextResponse.json({ error: security.error }, { status: 403 });
        }

        // ⚠️ FEATURE DISABLED
        const DAILY_API_KEY = process.env.DAILY_API_KEY;

        if (!DAILY_API_KEY) {
            console.warn('[Telemedicine] FEATURE DISABLED - No video SDK configured');
            return NextResponse.json({
                error: 'Telemedicine service temporarily unavailable',
                message: 'Video consultation feature requires configuration. Please contact support.',
                code: 'VIDEO_SDK_NOT_CONFIGURED'
            }, { status: 503 }); // Service Unavailable
        }

        // If SDK is configured in the future, use real implementation
        const { appointmentId } = body;

        const response = await fetch('https://api.daily.co/v1/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DAILY_API_KEY}`
            },
            body: JSON.stringify({
                name: `aura-${appointmentId || Date.now()}`,
                properties: {
                    enable_chat: true,
                    start_audio_off: false,
                    start_video_off: false,
                    lang: 'en'
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create room');
        }

        return NextResponse.json({
            success: true,
            roomUrl: data.url,
            isMock: false
        });

    } catch (error: any) {
        console.error('[TELEMEDICINE ROOM ERROR]', error.message);
        return NextResponse.json({
            error: 'Failed to create video consultation room',
            details: error.message
        }, { status: 500 });
    }
}
