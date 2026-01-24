-- ==========================================================
-- AURA OS: FOUNDATION HARDENING (Storage & Monitoring)
-- ==========================================================

-- 1. VOICE STORAGE POLICIES
-- Ensure bucket exists (This part is often manual in Supabase UI, but we can try to policy it)
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-replies', 'voice-replies', true)
ON CONFLICT (id) DO NOTHING;

-- 1.1 Allow public upload (Aura service role / backend)
CREATE POLICY "Allow public upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'voice-replies');

-- 1.2 Allow public select (Patient playing the voice note)
CREATE POLICY "Allow public select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'voice-replies');

-- 2. ENHANCED DEBUG LOGS (Harmonization with UUID)
-- We already have debug_logs in 20260117_debug_logs.sql, 
-- but we ensure it supports all 3.0 event types.
ALTER TABLE public.debug_logs 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'system';

-- 3. SECURITY BLOCKS (For Shield.ts persistence)
CREATE TABLE IF NOT EXISTS public.security_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip TEXT UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

ALTER TABLE public.security_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service_role full control" ON public.security_blocks
    USING (auth.role() = 'service_role');
