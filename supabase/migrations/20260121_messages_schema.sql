-- ==========================================================
-- AURA OS: MESSAGES SCHEMA (Data Persistence Hardening)
-- ==========================================================

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL,
    patient_id TEXT NOT NULL,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    source TEXT CHECK (source IN ('web', 'whatsapp', 'instagram', 'telegram')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast history retrieval
CREATE INDEX IF NOT EXISTS idx_messages_patient ON public.messages(patient_id);
CREATE INDEX IF NOT EXISTS idx_messages_tenant ON public.messages(tenant_id);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY messages_isolation ON public.messages FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR auth.role() = 'service_role'
);
