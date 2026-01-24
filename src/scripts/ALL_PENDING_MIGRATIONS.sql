-- ==========================================
-- AURA OS: MASTER MIGRATION (Phase 6 + 9)
-- Run this ONCE in Supabase SQL Editor.
-- ==========================================

-- ------------------------------------------
-- PHASE 6: SAAS & BUSINESS ENGINE
-- ------------------------------------------

-- 1. Tenants (Hospital Profiles)
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text default 'active', -- 'active', 'suspended'
  tier text default 'PRO',      -- 'PRO', 'ENTERPRISE'
  subscription_end timestamp with time zone,
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Audit Logs
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id),
  event_type text not null,
  description text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. RLS Policies
alter table public.tenants enable row level security;
create policy "Public Read for now" on public.tenants for select using (true); 

-- ------------------------------------------
-- PHASE 9: NEURAL SALES ENGINE
-- ------------------------------------------

-- 4. Sales Patterns (Strategy Library)
create table if not exists sales_patterns (
  id uuid default gen_random_uuid() primary key,
  tenant_id text default 'default', 
  trigger_topic text not null, 
  successful_response text not null, 
  confidence_score float default 1.0, 
  created_at timestamp with time zone default timezone('utc', now())
);

-- 5. Medical Glossary (AI Learning)
create table if not exists medical_glossary (
  id uuid default gen_random_uuid() primary key,
  term text not null unique,
  definition_tr text,
  definition_en text,
  confidence_score float default 0.0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 6. Lead Follow-ups (The Closer)
create table if not exists lead_followups (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references leads(id) on delete cascade,
  status text default 'pending',
  message_content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ==========================================
-- END OF MIGRATION
-- ==========================================
