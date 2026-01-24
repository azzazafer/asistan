-- ==========================================================
-- AURA OS: THE BANK - AUCTION & COMMISSION SCHEMA
-- ==========================================================

-- 1. AUCTIONS TABLE
CREATE TABLE IF NOT EXISTS public.auctions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    min_price DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'claimed', 'expired', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
    winner_agent_id UUID REFERENCES public.agents(id),
    claimed_at TIMESTAMPTZ
);

ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;

CREATE POLICY auctions_isolation ON public.auctions FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR auth.role() = 'service_role'
);

-- 2. COMMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
    type TEXT DEFAULT 'sale' CHECK (type IN ('sale', 'referral', 'bonus')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY commissions_isolation ON public.commissions FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR auth.role() = 'service_role'
);

-- 3. AUDIT LOGS FOR BANKING
-- Insert trigger or explicit logging will be handled via logAudit in TS
