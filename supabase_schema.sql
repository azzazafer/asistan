-- Run this in your Supabase SQL Editor to enable Security Persistence

create table if not exists security_logs (
  id uuid default gen_random_uuid() primary key,
  type text,
  severity text,
  ip text,
  details text,
  blocked boolean,
  timestamp timestamptz default now()
);

create table if not exists security_blocks (
  ip text primary key,
  reason text,
  blocked_at timestamptz default now()
);

-- Index for faster blocked IP lookups
create index if not exists idx_security_blocks_ip on security_blocks(ip);

-- Portal PIN Management
alter table leads add column if not exists portal_pin text default '1234';
