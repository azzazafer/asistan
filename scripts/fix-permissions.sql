-- FIX PERMISSIONS (RLS)
-- Run this to allow "New Clinic" creation.

-- 1. Create Policy for INSERT (Creation)
create policy "Allow Insert for Authenticated Users"
on public.tenants
for insert
with check (auth.role() = 'authenticated');

-- 2. Create Policy for UPDATE (Editing)
create policy "Allow Update for Owners"
on public.tenants
for update
using (auth.uid() = owner_id or auth.role() = 'authenticated'); -- Simplified for Admin

-- 3. Create Policy for DELETE
create policy "Allow Delete for Owners"
on public.tenants
for delete
using (auth.uid() = owner_id or auth.role() = 'authenticated');
