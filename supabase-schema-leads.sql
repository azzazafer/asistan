-- Aura OS - Lead Generation & Sales Management Schema
-- This schema supports the "Sales Agent" philosophy with Lead Scoring and Multi-tenancy.

-- 1. Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT DEFAULT 'default_clinic',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    treatment TEXT NOT NULL,
    status TEXT DEFAULT 'Beklemede',
    source TEXT DEFAULT 'Aura AI',
    channel TEXT DEFAULT 'Web',
    culture TEXT,
    notes TEXT,
    rank TEXT, -- Gamification rank (BRONZE, GOLD etc.)
    score INTEGER DEFAULT 0, -- AI Sales Score (0-100)
    score_rank TEXT DEFAULT 'COLD', -- COLD, WARM, HOT, PLATINUM
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Leads
-- Admin can manage everything
CREATE POLICY admin_manage_all_leads ON leads
    FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- Clinics can only see their own tenant's leads
CREATE POLICY tenant_isolation_leads ON leads
    FOR ALL USING (tenant_id = (auth.jwt() ->> 'tenant_id'));

-- Public/Guest can insert leads (for landing page/AI agents)
CREATE POLICY guest_insert_leads ON leads
    FOR INSERT WITH CHECK (true);

-- 4. Automatic Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
