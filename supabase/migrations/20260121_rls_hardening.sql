-- Aura OS Zero-Trust RLS Hardening
-- Ensures strict tenant isolation across all primary tables.

-- 1. Enable RLS on all sensitive tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Define Tenant-Based Isolation Policies
-- Rule: Users (Hospitals/Agents) can only see data where their tenant_id matches.

-- LEADS POLICY
DROP POLICY IF EXISTS "Tenant Isolation for Leads" ON leads;
CREATE POLICY "Tenant Isolation for Leads" ON leads
    FOR ALL
    USING (tenant_id::text = (auth.jwt() ->> 'tenant_id')::text);

-- APPOINTMENTS POLICY
DROP POLICY IF EXISTS "Tenant Isolation for Appointments" ON appointments;
CREATE POLICY "Tenant Isolation for Appointments" ON appointments
    FOR ALL
    USING (tenant_id::text = (auth.jwt() ->> 'tenant_id')::text);

-- PROFILES POLICY (Public viewable by same tenant)
DROP POLICY IF EXISTS "Tenant Isolation for Profiles" ON profiles;
CREATE POLICY "Tenant Isolation for Profiles" ON profiles
    FOR ALL
    USING (tenant_id::text = (auth.jwt() ->> 'tenant_id')::text);

-- 3. Service Role Bypass (For internal AI operations)
-- These ignore RLS to allow AI processing, but must be called via secure server routes.
ALTER TABLE debug_logs FORCE ROW LEVEL SECURITY;
CREATE POLICY "Service Role Full Access" ON debug_logs
    FOR ALL 
    USING (auth.role() = 'service_role');

-- 4. Audit Log Inviolability 
-- Only INSERT allowed, no UPDATE/DELETE
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Audit Append Only" ON audit_logs
    FOR INSERT 
    WITH CHECK (true);
CREATE POLICY "Audit View by Admin" ON audit_logs
    FOR SELECT
    USING (auth.jwt() ->> 'role' = 'admin');
