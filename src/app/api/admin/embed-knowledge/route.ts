/**
 * /api/admin/embed-knowledge/route.ts
 * TEK KULLANIMLIK — Embedding'leri doldurunca bu dosyayi silebilirsin.
 * Korumalı: AURA_ALPHA_CLEARANCE_KEY header'i gerektirir.
 */

import { NextRequest, NextResponse } from 'next/server';
import { RagService } from '@/lib/ai/rag-service';

export async function GET(req: NextRequest) {
    // Guvenlik: sadece admin anahtariyla calisir
    const key = req.headers.get('x-admin-key') || req.nextUrl.searchParams.get('key');
    const validKey = process.env.CRON_SECRET || process.env.AURA_ALPHA_CLEARANCE_KEY;

    if (!validKey || key !== validKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tenantId = req.nextUrl.searchParams.get('tenant') || 'nextoria_demo';

    console.log(`[EmbedAdmin] ${tenantId} icin embedding basliyor...`);

    try {
        const result = await RagService.embedKnowledgeBase(tenantId);

        return NextResponse.json({
            status: 'completed',
            tenant: tenantId,
            success: result.success,
            failed: result.failed,
            message: `${result.success} dokuman basariyla vektorlendi.`
        });
    } catch (err: any) {
        console.error('[EmbedAdmin] Hata:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
