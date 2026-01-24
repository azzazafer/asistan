-- ==========================================================
-- AURA OS: NEURAL FEED - SURGICAL FIX (TYPE CASTING)
-- ==========================================================

-- 1. AUDIT LOGS TABLE
-- UUID as default for consistency if your schema uses UUIDs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL, -- Changed to UUID to match your schema
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS GÜVENLİK (Explicit Casting added: ::uuid)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS audit_logs_strict_isolation ON public.audit_logs;
CREATE POLICY audit_logs_strict_isolation ON public.audit_logs FOR SELECT USING (
    tenant_id::text = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR auth.role() = 'service_role'
);

-- 2. AKIŞ TETİKLEYİCİ FONKSİYONU
CREATE OR REPLACE FUNCTION public.log_lead_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (tenant_id, description, metadata)
        VALUES (NEW.tenant_id::uuid, '🔍 Yeni Lead: ' || NEW.name || ' (' || NEW.channel || ')', jsonb_build_object('lead_id', NEW.id));
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status <> NEW.status) THEN
            INSERT INTO public.audit_logs (tenant_id, description, metadata)
            VALUES (NEW.tenant_id::uuid, '⚡ Faz Kayması: ' || NEW.name || ' -> ' || NEW.status, jsonb_build_object('lead_id', NEW.id, 'old_status', OLD.status, 'new_status', NEW.status));
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. BIND TRIGGER
DROP TRIGGER IF EXISTS tr_log_lead_changes ON public.leads;
CREATE TRIGGER tr_log_lead_changes
AFTER INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.log_lead_changes();
