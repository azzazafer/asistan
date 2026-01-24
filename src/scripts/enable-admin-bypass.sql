-- ENABLE ADMIN BYPASS (Impersonation)
-- Allow users with 'admin' in their email to READ ALL DATA.
-- This is critical for the "Login As" feature.

-- 1. Leads Table
create policy "Admins Read All Leads"
on public.leads
for select
using ( auth.jwt() ->> 'email' like '%admin%' );

-- 2. Appointments Table (if exists)
create policy "Admins Read All Appointments"
on public.appointments
for select
using ( auth.jwt() ->> 'email' like '%admin%' );

-- 3. Profiles
create policy "Admins Read All Profiles"
on public.profiles
for select
using ( auth.jwt() ->> 'email' like '%admin%' );

-- 4. Audit Logs
create policy "Admins Read All Logs"
on public.audit_logs
for select
using ( auth.jwt() ->> 'email' like '%admin%' );

NOTIFY pgrst, 'reload schema';
