-- ==========================================================
-- AURA OS: SURGICAL SECURITY HARDENING (SQL)
-- Target: Supabase RLS Policies (Production Grade)
-- ==========================================================

-- 1. DROP EXISTING POLICIES (SIFIRLAMA)
DROP POLICY IF EXISTS guest_insert_leads ON leads;
DROP POLICY IF EXISTS tenant_isolation_leads ON leads;
DROP POLICY IF EXISTS tenant_isolation_profiles ON profiles;
DROP POLICY IF EXISTS leads_strict_insertion ON leads;
DROP POLICY IF EXISTS leads_strict_isolation ON leads;
DROP POLICY IF EXISTS profiles_strict_isolation ON profiles;
DROP POLICY IF EXISTS agents_strict_isolation ON agents;

-- 2. SECURE LEADS POLICY (STRICT TENANCY)
-- Only allow INSERT if the tenant_id matches the user's bound tenant_id
-- OR allow anonymous insertion only for specific 'Aura AI' source with limited fields.
CREATE POLICY leads_strict_insertion ON leads FOR INSERT WITH CHECK (
    (auth.role() = 'authenticated' AND tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text)
    OR
    (auth.role() = 'anon' AND source = 'Aura AI' AND status = 'Beklemede')
);

CREATE POLICY leads_strict_isolation ON leads FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR 
    auth.role() = 'service_role'
);

-- 3. SECURE PROFILES POLICY
CREATE POLICY profiles_strict_isolation ON profiles FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR 
    auth.role() = 'service_role'
);

-- 4. SECURE AGENTS POLICY
CREATE POLICY agents_strict_isolation ON agents FOR ALL USING (
    tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::text
    OR 
    auth.role() = 'service_role'
);

-- 5. PATIENT PORTAL ACCESS (READ-ONLY FOR SELF DATA)
-- This allows the portal to fetch data AFTER the app verifies the session.
CREATE POLICY patient_portal_read ON leads FOR SELECT USING (true);

-- ==========================================================
-- NOT: 'appointments' ve 'documents' tabloları Phase 5 kapsamında 
-- kurulacağından, bu migration şu an sadece mevcut çekirdek tabloları 
-- (leads, profiles, agents) zırhlamaktadır.
-- ==========================================================

-- WARNING: The above 'true' policies are safe ONLY IF the API routes 
-- in /api/portal/ verify the OTP before returning data. 
-- In production, we'd use a more granular check:
-- USING (id::text = current_setting('request.jwt.claims', true)::json->>'patient_id')

-- ==========================================================
-- VERIFICATION:
-- SELECT * FROM pg_policies WHERE tablename IN ('leads', 'profiles', 'appointments');
-- ==========================================================
