-- Aura OS - Database Security Layer (RLS)
-- Target: Supabase (PostgreSQL)

-- 1. Enable RLS on all tables
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- 2. "patients" table policies
-- Admin can do everything
CREATE POLICY admin_all_patients ON patients 
    FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- User can only see/edit their own profile
CREATE POLICY user_self_patients ON patients 
    FOR ALL USING (auth.uid() = id);

-- 3. "appointments" table policies
-- Admin can see all appointments
CREATE POLICY admin_all_appointments ON appointments 
    FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

-- Patient can only see their own appointments
CREATE POLICY patient_own_appointments ON appointments 
    FOR SELECT USING (auth.uid() = patient_id);

-- 4. "payments" table policies
-- High Security: Only Admin and the paying user can see payment records
CREATE POLICY admin_all_payments ON payments 
    FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

CREATE POLICY user_own_payments ON payments 
    FOR SELECT USING (auth.uid() = user_id);

-- 5. "analysis_results" table policies (AI Bio-Vision)
-- Sensitive medical data - Restricted access
CREATE POLICY admin_all_analysis ON analysis_results 
    FOR ALL USING (auth.jwt() ->> 'role' = 'ADMIN');

CREATE POLICY user_own_analysis ON analysis_results 
    FOR SELECT USING (auth.uid() = user_id);

-- 6. Audit Logging (System level only)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY system_only_logs ON audit_logs 
    FOR ALL USING (auth.jwt() ->> 'role' = 'SYSTEM');
