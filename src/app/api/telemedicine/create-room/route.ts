import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/shield';

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

        const { appointmentId, patientName } = body;

        // 1. Daily.co API Keys (In a real app, use environment variables)
        const DAILY_API_KEY = process.env.DAILY_API_KEY;

        if (!DAILY_API_KEY) {
            console.warn('[Telemedicine] DAILY_API_KEY missing. Returning mock room.');
            return NextResponse.json({
                success: true,
                roomUrl: `https://aura-health.daily.co/mock-session-${appointmentId || 'default'}`,
                isMock: true
            });
        }

        // 2. Real Daily.co Room Creation
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
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
