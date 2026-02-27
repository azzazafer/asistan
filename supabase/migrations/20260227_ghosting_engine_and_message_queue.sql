-- ============================================================
-- Aura OS: Supabase Migration
-- Ghosting Engine + DB-backed Message Queue
-- Tarih: 2026-02-27
-- ============================================================

-- ──────────────────────────────────────────────────────────────
-- 1. message_queue tablosu
--    Twilio'ya gönderilemeyen mesajları kalıcı olarak tutar.
--    RAM array'in yerini alır — serverless restart'tan etkilenmez.
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.message_queue (
    id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    tenant_id       TEXT NOT NULL,
    target          TEXT NOT NULL,          -- Alıcı telefon/kullanıcı ID
    source          TEXT NOT NULL CHECK (source IN ('whatsapp','sms','instagram','telegram')),
    content         TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','processing','sent','failed')),
    attempts        INTEGER NOT NULL DEFAULT 0,
    max_attempts    INTEGER NOT NULL DEFAULT 3,
    last_error      TEXT,
    next_retry_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index: cron sadece pending + retry zamanı gelen kayıtları çeksin
CREATE INDEX IF NOT EXISTS idx_message_queue_status_retry
    ON public.message_queue (status, next_retry_at)
    WHERE status IN ('pending', 'failed');

-- Index: kiracı bazlı sorgular için
CREATE INDEX IF NOT EXISTS idx_message_queue_tenant
    ON public.message_queue (tenant_id);

-- Row Level Security
ALTER TABLE public.message_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_role_all_message_queue ON public.message_queue;
CREATE POLICY service_role_all_message_queue
    ON public.message_queue
    USING (auth.role() = 'service_role');

-- ──────────────────────────────────────────────────────────────
-- 2. leads tablosuna ghosting engine için sütun ekle
--    (Yoksa ekle, varsa dokunma)
-- ──────────────────────────────────────────────────────────────
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'leads' AND column_name = 'last_activity_timestamp'
    ) THEN
        ALTER TABLE public.leads
            ADD COLUMN last_activity_timestamp TIMESTAMPTZ DEFAULT NOW();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'leads' AND column_name = 'neural_status'
    ) THEN
        ALTER TABLE public.leads
            ADD COLUMN neural_status TEXT DEFAULT 'ACTIVE'
                CHECK (neural_status IN ('ACTIVE','GHOSTED','WON','LOST'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'leads' AND column_name = 'followup_payload'
    ) THEN
        ALTER TABLE public.leads
            ADD COLUMN followup_payload TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'leads' AND column_name = 'ghost_followup_sent_at'
    ) THEN
        ALTER TABLE public.leads
            ADD COLUMN ghost_followup_sent_at TIMESTAMPTZ;
    END IF;
END $$;

-- Index: ghosting-hunter cron sadece ACTIVE + eski kayıtları çeksin
CREATE INDEX IF NOT EXISTS idx_leads_ghosting
    ON public.leads (neural_status, last_activity_timestamp)
    WHERE neural_status = 'ACTIVE';
