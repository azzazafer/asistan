-- Phase 5: Clinical Smart Calendar Schema

-- 1. Doctors / Staff
-- Simple profile table for assigning appointments.
create table if not exists doctors (
  id uuid default gen_random_uuid() primary key,
  tenant_id text not null,
  name text not null,
  specialty text, -- e.g., 'Hair Transplant Surgeon', 'Dentist'
  color text default '#4F46E5', -- Color for calendar events
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Appointments
-- The core operational unit.
create table if not exists appointments (
  id uuid default gen_random_uuid() primary key,
  tenant_id text not null,
  lead_id uuid references leads(id) on delete set null, -- Optional link to a sales lead
  doctor_id uuid references doctors(id) on delete set null,
  patient_name text not null, -- Can be from lead or manual
  title text not null, -- e.g., "Consultation with Mr. X"
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'noshow')) default 'pending',
  type text check (type in ('consultation', 'operation', 'checkup', 'other')) default 'consultation',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS (Assuming standard policies)
alter table doctors enable row level security;
alter table appointments enable row level security;

-- Policy example (Open for now/Auth based)
create policy "Enable all access for authenticated users" on doctors for all using (auth.role() = 'authenticated');
create policy "Enable all access for authenticated users" on appointments for all using (auth.role() = 'authenticated');
