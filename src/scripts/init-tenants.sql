-- 1. Create Tenants Table (Hospital Profile)
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  address text,
  website text,
  timezone text default 'UTC+3',
  currency text default 'USD',
  owner_id uuid references auth.users(id), -- Link to the creator
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Create Audit Logs Table (Real System Events)
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id),
  event_type text not null, -- 'LOGIN', 'LEAD_CREATED', 'PDF_EXPORT', 'SETTINGS_UPDATE'
  description text,
  user_id uuid references auth.users(id),
  meta jsonb, -- Extra data
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. Update Profiles Table (if needed) to link to Tenant
-- (Assuming profiles table exists from previous phases)
alter table public.profiles 
add column if not exists tenant_id uuid references public.tenants(id);

-- 4. Enable RLS
alter table public.tenants enable row level security;
alter table public.audit_logs enable row level security;

-- 5. Policies (Simple for now: allow authenticated to do everything)
create policy "Enable all for authenticated users" on public.tenants
for all using (auth.role() = 'authenticated');

create policy "Enable all for authenticated users" on public.audit_logs
for all using (auth.role() = 'authenticated');
