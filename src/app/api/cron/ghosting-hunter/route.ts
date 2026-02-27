/**
 * /api/cron/ghosting-hunter/route.ts
 *
 * Vercel Cron tarafından tetiklenir (vercel.json → schedule: "0 * * * *")
 * Her saat başı çalışır. 48 saattir yazışmayan ACTIVE lead'leri bulur,
 * followup mesajını WhatsApp ile gönderir, statüyü GHOSTED yapar.
 *
 * Güvenlik: CRON_SECRET env değişkeni ile korunur.
 * Vercel, cron isteklerine otomatik olarak Authorization: Bearer <CRON_SECRET> ekler.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { calculateLeadScore } from '@/lib/scoring';
import { decrypt } from '@/lib/crypto';

// Service role client — RLS bypass için zorunlu (cron server-side çalışır)
function getServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('[GhostingHunter] Supabase service role credentials eksik.');
    return createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
    });
}

const GHOSTING_THRESHOLD_MS = 48 * 60 * 60 * 1000; // 48 saat

export async function GET(req: NextRequest) {
    // ── Güvenlik: sadece Vercel Cron veya yetkili internal çağrı ──
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceClient();
    const cutoff = new Date(Date.now() - GHOSTING_THRESHOLD_MS).toISOString();

    // ── 1. 48 saattir yazmayan ACTIVE lead'leri çek ──
    const { data: ghostCandidates, error: fetchErr } = await supabase
        .from('leads')
        .select('id, phone, name, treatment, culture, anchor_value, followup_payload, tenant_id')
        .eq('neural_status', 'ACTIVE')
        .lt('last_activity_timestamp', cutoff)
        .is('ghost_followup_sent_at', null)   // daha önce gönderilmemiş
        .limit(50);                            // batch: tek seferde en fazla 50

    if (fetchErr) {
        console.error('[GhostingHunter] DB fetch hatası:', fetchErr.message);
        return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    if (!ghostCandidates || ghostCandidates.length === 0) {
        return NextResponse.json({ processed: 0, message: 'Ghost candidate yok.' });
    }

    console.log(`[GhostingHunter] ${ghostCandidates.length} aday tespit edildi.`);

    const results: { id: string; status: 'sent' | 'queued' | 'skipped'; reason?: string }[] = [];

    for (const lead of ghostCandidates) {
        try {
            // ── 2. Telefon numarasını çöz ──
            let phone: string = lead.phone || '';
            try {
                if (phone.includes(':')) phone = decrypt(phone);
            } catch {
                console.warn(`[GhostingHunter] Lead ${lead.id} phone decrypt başarısız, raw kullanılıyor.`);
            }

            if (!phone) {
                results.push({ id: lead.id, status: 'skipped', reason: 'phone_missing' });
                continue;
            }

            // ── 3. followup_payload: DB'dekini kullan, yoksa scoring'den üret ──
            let message = lead.followup_payload || '';

            if (!message) {
                const scoring = calculateLeadScore({
                    treatment: lead.treatment || 'Genel',
                    culture: lead.culture,
                    lastActivityTimestamp: Date.now() - GHOSTING_THRESHOLD_MS - 1000
                });
                message = scoring.followup_payload || '';
            }

            if (!message) {
                // Son çare genel mesaj
                message = `Merhaba, daha önce başlattığımız görüşmeyi tamamlamak ister misiniz? Size yardımcı olmaktan memnuniyet duyarım.`;
            }

            // ── 4. WhatsApp gönder veya message_queue'ya yaz ──
            const sendResult = await sendWhatsAppViaTwilio(phone, message);

            if (sendResult.success) {
                // ── 5. lead'i GHOSTED olarak işaretle ──
                await supabase
                    .from('leads')
                    .update({
                        neural_status: 'GHOSTED',
                        ghost_followup_sent_at: new Date().toISOString()
                    })
                    .eq('id', lead.id);

                results.push({ id: lead.id, status: 'sent' });
                console.log(`[GhostingHunter] ✅ Lead ${lead.id} → GHOSTED, mesaj gönderildi.`);
            } else {
                // ── 6. Gönderim başarısız → message_queue'ya kalıcı olarak yaz ──
                await supabase.from('message_queue').insert({
                    tenant_id: lead.tenant_id || process.env.AURA_DEFAULT_TENANT || 'unconfigured_tenant',
                    target: phone,
                    source: 'whatsapp',
                    content: message,
                    status: 'pending',
                    last_error: sendResult.error || 'Twilio send failed',
                    next_retry_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 dk sonra retry
                });

                // Lead statüsü yine de GHOSTED yapılır; mesaj queue'da bekler
                await supabase
                    .from('leads')
                    .update({ neural_status: 'GHOSTED' })
                    .eq('id', lead.id);

                results.push({ id: lead.id, status: 'queued', reason: sendResult.error });
                console.warn(`[GhostingHunter] ⚠️ Lead ${lead.id} → queue'ya eklendi. Hata: ${sendResult.error}`);
            }
        } catch (leadErr: any) {
            console.error(`[GhostingHunter] Lead ${lead.id} işleme hatası:`, leadErr.message);
            results.push({ id: lead.id, status: 'skipped', reason: leadErr.message });
        }
    }

    const summary = {
        total: ghostCandidates.length,
        sent: results.filter(r => r.status === 'sent').length,
        queued: results.filter(r => r.status === 'queued').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        results
    };

    console.log('[GhostingHunter] Tamamlandı:', summary);
    return NextResponse.json(summary);
}

// ── Twilio REST — SDK'sız, minimal dependency ──────────────────────────────
async function sendWhatsAppViaTwilio(
    to: string,
    body: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

    if (!accountSid || !authToken) {
        return { success: false, error: 'Twilio credentials eksik' };
    }

    const toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    try {
        const form = new URLSearchParams();
        form.append('To', toFormatted);
        form.append('From', fromNumber);
        form.append('Body', body);

        const res = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: form,
                signal: AbortSignal.timeout(10_000) // 10 sn timeout
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return { success: false, error: data.message || `Twilio HTTP ${res.status}` };
        }

        return { success: true, messageId: data.sid };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
