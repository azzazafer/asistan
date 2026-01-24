import { NextResponse } from 'next/server';
import { SystemIntegrityGuard } from '@/lib/integrity';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const report = await SystemIntegrityGuard.performFullAudit();

        return NextResponse.json({
            success: true,
            report
        });
    } catch (error: any) {
        console.error('[API] Integrity check failed:', error);
        return NextResponse.json(
            { success: false, error: 'Integrity Audit Crash', detail: error.message },
            { status: 500 }
        );
    }
}
