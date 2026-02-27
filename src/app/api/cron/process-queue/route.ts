/**
 * /api/cron/process-queue/route.ts
 * Vercel Cron — Her 5 dakikada tetiklenir (vercel.json: "* /5 * * * *")
 * message_queue tablosundaki bekleyen mesajları okur, kanalına gönderir.
 *
 * Guarantees:
 *   - Optimistic lock (status -> processing) ile double-send engellenir
 *   - max_attempts asildiginda status -> failed, tekrar denenmez
 *   - Exponential backoff: her basarisizlikta bekleme suresi artar
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('[ProcessQueue] Supabase service role credentials eksik.');
    return createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
    });
}

const BATCH_SIZE = 20;

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceClient();
    const now = new Date().toISOString();

    // Pending veya failed, retry zamani gelmis, deneme limiti asilmamis
    const { data: toProcess, error: queryErr } = await supabase
        .from('message_queue')
        .select('*')
        .in('status', ['pending', 'failed'])
        .lte('next_retry_at', now)
        .lt('attempts', 3)
        .order('next_retry_at', { ascending: true })
        .limit(BATCH_SIZE);

    if (queryErr) {
        console.error('[ProcessQueue] DB fetch error:', queryErr.message);
        return NextResponse.json({ error: queryErr.message }, { status: 500 });
    }

    if (!toProcess || toProcess.length === 0) {
        return NextResponse.json({ processed: 0, message: 'Kuyruk bos.' });
    }

    console.log(`[ProcessQueue] ${toProcess.length} mesaj isleniyor.`);

    const results: { id: string; status: 'sent' | 'failed' | 'exhausted' }[] = [];

    for (const msg of toProcess) {
        // Optimistic lock — baska instance almadiysa guncelle
        const { error: lockErr } = await supabase
            .from('message_queue')
            .update({ status: 'processing', updated_at: new Date().toISOString() })
            .eq('id', msg.id)
            .eq('status', msg.status);

        if (lockErr) {
            console.warn(`[ProcessQueue] ${msg.id} lock alinamadi, atlaniyor.`);
            continue;
        }

        const sendResult = await dispatch(msg);
        const newAttempts = (msg.attempts || 0) + 1;
        const maxAttempts = msg.max_attempts || 3;

        if (sendResult.success) {
            await supabase.from('message_queue').delete().eq('id', msg.id);
            results.push({ id: msg.id, status: 'sent' });
            console.log(`[ProcessQueue] OK ${msg.id} gonderildi, silindi.`);
        } else {
            const exhausted = newAttempts >= maxAttempts;
            const backoffMs = Math.min(newAttempts * 5 * 60 * 1000, 60 * 60 * 1000);
            const nextRetry = new Date(Date.now() + backoffMs).toISOString();

            await supabase
                .from('message_queue')
                .update({
                    status: exhausted ? 'failed' : 'pending',
                    attempts: newAttempts,
                    last_error: sendResult.error || 'unknown',
                    next_retry_at: exhausted ? now : nextRetry,
                    updated_at: new Date().toISOString()
                })
                .eq('id', msg.id);

            results.push({ id: msg.id, status: exhausted ? 'exhausted' : 'failed' });
            console.warn(
                `[ProcessQueue] FAIL ${msg.id} | Deneme: ${newAttempts}/${maxAttempts} | ${exhausted ? 'Kapatildi' : `Retry: ${nextRetry}`}`
            );
        }
    }

    const summary = {
        processed: toProcess.length,
        sent: results.filter(r => r.status === 'sent').length,
        failed: results.filter(r => r.status === 'failed').length,
        exhausted: results.filter(r => r.status === 'exhausted').length
    };

    console.log('[ProcessQueue] Tamamlandi:', summary);
    return NextResponse.json(summary);
}

async function dispatch(
    msg: { id: string; target: string; source: string; content: string }
): Promise<{ success: boolean; error?: string }> {
    switch (msg.source) {
        case 'whatsapp':
            return sendViaTwilio(msg.target, msg.content, 'whatsapp');
        case 'sms':
            return sendViaTwilio(msg.target, msg.content, 'sms');
        case 'telegram':
            return sendViaTelegram(msg.target, msg.content);
        default:
            return { success: false, error: `Bilinmeyen kanal: ${msg.source}` };
    }
}

async function sendViaTwilio(
    to: string,
    body: string,
    channel: 'whatsapp' | 'sms'
): Promise<{ success: boolean; error?: string }> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
        return { success: false, error: 'Twilio credentials eksik' };
    }

    const from = channel === 'whatsapp'
        ? (process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886')
        : (process.env.TWILIO_SMS_NUMBER || '');

    const toFormatted = channel === 'whatsapp'
        ? (to.startsWith('whatsapp:') ? to : `whatsapp:${to}`)
        : to;

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const form = new URLSearchParams();
    form.append('To', toFormatted);
    form.append('From', from);
    form.append('Body', body);

    try {
        const res = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: form,
                signal: AbortSignal.timeout(10_000)
            }
        );
        const data = await res.json();
        if (!res.ok) return { success: false, error: data.message || `HTTP ${res.status}` };
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

async function sendViaTelegram(
    chatId: string,
    text: string
): Promise<{ success: boolean; error?: string }> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return { success: false, error: 'TELEGRAM_BOT_TOKEN eksik' };

    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text }),
            signal: AbortSignal.timeout(10_000)
        });
        const data = await res.json();
        if (!data.ok) return { success: false, error: data.description };
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
