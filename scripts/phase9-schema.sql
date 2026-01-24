-- Phase 9: Neural Learning & Sales Closing Schema

-- 1. Sales Patterns (The "Strategy Library")
-- Stores successful arguments/strategies extracted from winning chats.
create table if not exists sales_patterns (
  id uuid default gen_random_uuid() primary key,
  tenant_id text not null, -- For multi-tenancy learning
  trigger_topic text not null, -- e.g., 'Price Objection', 'Safety Concern'
  successful_response text not null, -- The response that worked
  confidence_score float default 1.0, -- Increments with reuse
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Lead Follow-ups (The "Sniper" Queue)
-- Tracks scheduled or suggested nudges for leads.
create table if not exists lead_followups (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references leads(id) on delete cascade,
  status text check (status in ('pending', 'approved', 'sent', 'rejected')) default 'pending',
  strategy_used text, -- e.g., 'VALUE_PROP_REINFORCEMENT'
  message_content text not null,
  scheduled_for timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Update Medical Glossary (Ensure columns exist)
-- This table might already exist, adding for completeness of the module.
create table if not exists medical_glossary (
  id uuid default gen_random_uuid() primary key,
  term text not null unique,
  definition_tr text,
  definition_en text,
  definition_ar text,
  category text,
  confidence_score float default 0.0,
  verified_by text default 'system',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) policies if needed (omitted for brevity, assuming standard Aura policies apply)
