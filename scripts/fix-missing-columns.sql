-- FIX MISSING COLUMNS
-- The 'tenants' table already existed, so the previous script didn't update it.
-- This script FORCES the new columns to be added.

-- 1. Add 'status' column if missing
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- 2. Add 'tier' column if missing
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS tier text DEFAULT 'PRO';

-- 3. Add 'subscription_end' column if missing
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS subscription_end timestamp with time zone;

-- 4. Add 'stripe_customer_id' column if missing (for future use)
ALTER TABLE public.tenants 
ADD COLUMN IF NOT EXISTS stripe_customer_id text;

-- 5. Refresh Cache (Notify Supabase)
NOTIFY pgrst, 'reload schema';
