-- ==========================================================
-- AURA OS: INTELLIGENCE ACTIVATION - DATABASE FOUNDATION
-- Migration: 20260201_intelligence_schema.sql
-- Purpose: Create tables and columns required for self-learning
-- ==========================================================

-- 1. CREATE SALES PATTERNS TABLE (The "Strategy Library")
-- Stores successful sales arguments extracted from winning conversations
CREATE TABLE IF NOT EXISTS public.sales_patterns (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id text NOT NULL,
    trigger_topic text NOT NULL, -- e.g., "Price", "Trust", "Timing"
    successful_response text NOT NULL, -- The exact strategy that worked
    confidence_score decimal DEFAULT 0.8, -- Increases with reuse
    created_at timestamptz DEFAULT now()
);

-- 2. SECURITY: Row Level Security Policies
ALTER TABLE public.sales_patterns ENABLE ROW LEVEL SECURITY;

-- Allow service role (backend) full access
CREATE POLICY "sales_patterns_service_role_select" ON public.sales_patterns
    FOR SELECT TO service_role USING (true);

CREATE POLICY "sales_patterns_service_role_insert" ON public.sales_patterns
    FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "sales_patterns_service_role_update" ON public.sales_patterns
    FOR UPDATE TO service_role USING (true);

-- 3. UPGRADE LEADS TABLE: Add Funnel State Column
-- Enables XState funnel machine tracking
DO $$
BEGIN
    -- Check if column already exists to avoid errors
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'leads' 
        AND column_name = 'funnel_state'
    ) THEN
        ALTER TABLE public.leads ADD COLUMN funnel_state text DEFAULT 'qualifying';
        RAISE NOTICE 'Added funnel_state column to leads table';
    ELSE
        RAISE NOTICE 'funnel_state column already exists, skipping';
    END IF;
END $$;

-- 4. CREATE INDEX for Performance
-- Speeds up learning queries by topic
CREATE INDEX IF NOT EXISTS idx_sales_patterns_topic ON public.sales_patterns(trigger_topic);
CREATE INDEX IF NOT EXISTS idx_sales_patterns_tenant ON public.sales_patterns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_leads_funnel_state ON public.leads(funnel_state);

-- 5. ADD COMMENTS for Documentation
COMMENT ON TABLE public.sales_patterns IS 'Neural learning system: Stores proven sales strategies extracted from successful conversions';
COMMENT ON COLUMN public.sales_patterns.trigger_topic IS 'The objection or topic this strategy addresses (Price, Trust, Safety, etc.)';
COMMENT ON COLUMN public.sales_patterns.successful_response IS 'The exact response or strategy that overcame the objection';
COMMENT ON COLUMN public.sales_patterns.confidence_score IS 'Confidence level (0.0-1.0) based on how many times this strategy has worked';
COMMENT ON COLUMN public.leads.funnel_state IS 'Current stage in XState sales funnel machine (qualifying, objection_handling, closing, payment_pending, converted)';

-- ==========================================================
-- VERIFICATION QUERIES (Run these to confirm success)
-- ==========================================================

-- Check if sales_patterns table exists
-- SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'sales_patterns');

-- Check if funnel_state column exists
-- SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'funnel_state';

-- Count existing sales patterns (should be 0 initially)
-- SELECT COUNT(*) FROM public.sales_patterns;
