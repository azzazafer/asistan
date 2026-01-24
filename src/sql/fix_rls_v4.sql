-- Aura OS 3.0: Shield V4 Security Patch
-- Goal: Zero-Trust RLS for Sales, Glossary, and Followups
-- Run this in Supabase SQL Editor

-- 1. Sales Patterns (Tenant Isolated)
alter table sales_patterns enable row level security;

create policy "Sales Patterns: Tenant Access"
on sales_patterns
for all
using (tenant_id = (auth.jwt() ->> 'tenant_id')::text)
with check (tenant_id = (auth.jwt() ->> 'tenant_id')::text);

-- 2. Medical Glossary (Global Read, Admin Write)
alter table medical_glossary enable row level security;

create policy "Glossary: Public Read"
on medical_glossary
for select
to authenticated
using (true);

create policy "Glossary: Admin Write"
on medical_glossary
for all
using ((auth.jwt() ->> 'role')::text = 'admin')
with check ((auth.jwt() ->> 'role')::text = 'admin');

-- 3. Lead Followups (Join Policy via Leads)
alter table lead_followups enable row level security;

create policy "Followups: Tenant/Agent Access"
on lead_followups
for all
using (
  exists (
    select 1 from leads
    where leads.id = lead_followups.lead_id
    and leads.tenant_id = (auth.jwt() ->> 'tenant_id')::text
  )
);
