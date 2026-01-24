-- Phase 6: SaaS & Commercial Operations
-- Adds Subscription Status, Tiers, and Locking mechanism.

-- 1. Upgrade Tenants Table
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active', -- 'active', 'suspended', 'past_due'
ADD COLUMN IF NOT EXISTS tier text DEFAULT 'PRO',      -- 'FREE', 'PRO', 'ENTERPRISE'
ADD COLUMN IF NOT EXISTS subscription_end timestamp with time zone,
ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- 2. Create Plans Table (Optional, for now hardcoded in Logic)
CREATE TABLE IF NOT EXISTS public.plans (
    id text primary key, -- 'monthly_pro', 'yearly_enterprise'
    name text,
    price_monthly numeric,
    features jsonb
);

-- 3. Insert Default Plans
INSERT INTO public.plans (id, name, price_monthly, features) VALUES
('pro', 'Professional Clinic', 99, '["whatsapp", "vision", "calendar"]'),
('enterprise', 'Hospital Enterprise', 499, '["hbys", "custom_branding", "API"]'),
('starter', 'Solo Doctor', 29, '["basic_crm"]');

-- 4. Create RLS Policies for Super Admin (Security)
-- Assume we have a function or claim for 'is_super_admin'
-- For now, we allow authenticated users to read (assuming internal tool use)

CREATE POLICY "Allow All for Super Admin" ON public.tenants
FOR ALL USING (auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%admin%')); 
-- Quick Hack: Anyone with 'admin' in email can manage tenants.
