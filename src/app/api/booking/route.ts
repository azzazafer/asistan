import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Data validation
        if (!data.name || !data.treatment || !data.date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('Received Booking Request:', data);

        // This is where you'd integrate with Google Calendar or a database
        // For now, we simulate success

        return NextResponse.json({
            success: true,
            bookingId: Math.random().toString(36).substr(2, 9),
            message: 'Randevunuz başarıyla oluşturuldu!'
        });
    } catch (error: any) {
        console.error('Booking API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
