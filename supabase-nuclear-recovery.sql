-- AURA OS: NUCLEAR RECOVERY SCHEMA v2.2
-- Bu script mevcut hatalı tabloları siler ve her şeyi SIFIRDAN kurar.
-- UYARI: Bu işlem mevcut tablo verilerini temizler.

-- 1. ESKİ TABLOLARI TEMİZLE (Nuclear Drop)
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. PROFILES TABLOSU (Yeni Şema)
CREATE TABLE profiles (
    id TEXT PRIMARY KEY,
    tenant_id TEXT DEFAULT 'default_clinic',
    name TEXT,
    language TEXT DEFAULT 'en',
    history JSONB DEFAULT '[]'::jsonb,
    last_treatment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEADS TABLOSU (Yeni Şema + Satış Ajanı Kolonları)
CREATE TABLE leads (
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
    rank TEXT DEFAULT 'BRONZE',
    score INTEGER DEFAULT 0,
    score_rank TEXT DEFAULT 'COLD',
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GÜVENLİK (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 5. POLİTİKALAR
CREATE POLICY guest_insert_leads ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY admin_manage_all_leads ON leads FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- 6. AUTOMATIC UPDATED_AT TRIGGER
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
