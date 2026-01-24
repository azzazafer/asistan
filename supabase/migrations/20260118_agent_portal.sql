-- Aura OS Phase III: Agent Portal & Commissions Schema

-- 1. AGENTS Table
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    referral_code TEXT UNIQUE NOT NULL, -- Örn: ZAFER2026
    commission_rate DECIMAL(5,2) DEFAULT 10.00, -- Varsayılan %10 komisyon
    status TEXT DEFAULT 'active', -- 'active', 'pending', 'suspended'
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. LEADS Table Enhancement
-- Not: Leads tablosuna agent linkleri ekliyoruz
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS agent_id UUID REFERENCES public.agents(id),
ADD COLUMN IF NOT EXISTS attribution_source TEXT, -- 'referral_link', 'manual_entry'
ADD COLUMN IF NOT EXISTS internal_notes TEXT;

-- 3. COMMISSIONS Table
-- Ödemeler gerçekleştiğinde acenteye yazılan payları takip eder
CREATE TABLE IF NOT EXISTS public.commissions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    lead_id UUID NOT NULL, -- Hangi hasta için?
    agent_id UUID REFERENCES public.agents(id),
    amount_total DECIMAL(12,2) NOT NULL, -- Toplam ödeme (Stripe'tan gelen)
    amount_commission DECIMAL(12,2) NOT NULL, -- Acenteye giden pay
    status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'cancelled'
    stripe_session_id TEXT -- Stripe ile eşleşmesi için
);

-- 4. RLS POLICIES (Security)
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- Politikalar: Acenteler sadece kendi verilerini görebilsin (Auth entegrasyonu ile zenginleştirilecek)
CREATE POLICY "Agents see own profile" ON public.agents FOR SELECT USING (true); -- Geçici olarak basit
CREATE POLICY "Agents see own commissions" ON public.commissions FOR SELECT USING (true);

-- 5. INDEXING for PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_agent_id ON public.leads(agent_id);
CREATE INDEX IF NOT EXISTS idx_agents_referral_code ON public.agents(referral_code);
