-- 1. TENANTS TABLOSU (Hastaneler)
CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    package_type TEXT DEFAULT 'starter',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SUBSCRIPTIONS TABLOSU (Stripe Ödemeleri)
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT REFERENCES tenants(id),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    package_type TEXT,
    status TEXT,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES TABLOSU (Kullanıcı verileri)
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY, -- Telefon numarası veya UID
    tenant_id TEXT REFERENCES tenants(id),
    name TEXT,
    language TEXT DEFAULT 'en',
    history JSONB DEFAULT '[]'::jsonb,
    last_treatment TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LEADS TABLOSU (Aday Hastalar)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT REFERENCES tenants(id),
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
    history JSONB DEFAULT '[]'::jsonb,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LOCATIONS TABLOSU (Hastanelerin Şubeleri/Lokasyonları)
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT REFERENCES tenants(id),
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. APPOINTMENTS TABLOSU (Randevular & Ameliyatlar)
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT REFERENCES tenants(id),
    lead_id UUID REFERENCES leads(id),
    location_id UUID REFERENCES locations(id),
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'canceled'
    type TEXT DEFAULT 'consultation', -- 'consultation', 'surgery', 'follow-up'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GÜVENLİK (RLS) AKTİVASYONU
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- 8. POLİTİKALAR (Hardened Isolation)
CREATE OR REPLACE FUNCTION auth.get_tenant_id() RETURNS TEXT AS $$
    SELECT (auth.jwt() -> 'user_metadata' ->> 'tenant_id')::text;
$$ LANGUAGE SQL STABLE;

CREATE POLICY tenant_isolation_tenants ON tenants FOR SELECT USING (id = auth.get_tenant_id() OR auth.role() = 'service_role');
CREATE POLICY tenant_isolation_subscriptions ON subscriptions FOR SELECT USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');
CREATE POLICY tenant_isolation_profiles ON profiles FOR ALL USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');
CREATE POLICY guest_insert_leads ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY tenant_isolation_leads ON leads FOR ALL USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');
CREATE POLICY tenant_isolation_locations ON locations FOR ALL USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');
CREATE POLICY tenant_isolation_appointments ON appointments FOR ALL USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');

-- 9. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- 10. DOCUMENTS TABLOSU (Hasta Evrakları / Reçeteler)
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id TEXT REFERENCES tenants(id),
    lead_id UUID REFERENCES leads(id),
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    type TEXT, -- 'prescription', 'x-ray', 'report'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_documents ON documents FOR ALL USING (tenant_id = auth.get_tenant_id() OR auth.role() = 'service_role');

-- 11. MEDICAL_GLOSSARY TABLOSU (Sektörel Jargonlar)
CREATE TABLE IF NOT EXISTS medical_glossary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term TEXT UNIQUE NOT NULL,
    category TEXT, -- 'hair', 'dental', 'aesthetic'
    definition_tr TEXT,
    definition_en TEXT,
    definition_ar TEXT,
    synonyms TEXT[],
    confidence_score DECIMAL DEFAULT 0,
    verified_by TEXT DEFAULT 'auto', -- 'auto', 'human', 'doctor'
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. VERIFIED_KNOWLEDGE TABLOSU (Bakanlık, PubMed, Resmi Veriler)
CREATE TABLE IF NOT EXISTS verified_knowledge (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL, -- 'Ministry of Health', 'PubMed', 'ISHRS'
    source_url TEXT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    importance_score INTEGER DEFAULT 1, -- 1-5 arasi
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Learning Tables
ALTER TABLE medical_glossary ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY select_public_glossary ON medical_glossary FOR SELECT USING (true);
CREATE POLICY select_public_knowledge ON verified_knowledge FOR SELECT USING (true);
CREATE POLICY admin_all_glossary ON medical_glossary FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY admin_all_knowledge ON verified_knowledge FOR ALL USING (auth.role() = 'service_role');

-- Triggers
CREATE TRIGGER update_glossary_updated_at BEFORE UPDATE ON medical_glossary FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_updated_at BEFORE UPDATE ON verified_knowledge FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
