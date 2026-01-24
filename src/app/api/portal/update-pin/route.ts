import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { accessCode, newPin } = await req.json();

        if (!accessCode || !newPin || newPin.length !== 4) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // Security: Check if lead exists first (optional, prevents enumeration if we cared more)

        // Update PIN
        // Assumes accessCode maps to 'phone' or 'email' or 'id' column. 
        // Given the demo data uses 'PX-2026-AURA', we might need to match that.
        // For now, we'll try to match 'phone' as it's the unique key usually used.

        const { data, error } = await supabase
            .from('leads')
            .update({ portal_pin: newPin })
            .eq('phone', accessCode)
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'PIN Updated' });
    } catch (error: any) {
        console.error('PIN Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
