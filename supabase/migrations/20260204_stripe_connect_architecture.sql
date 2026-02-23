-- STRIPE CONNECT & PAYMENT SPLITTING ARCHITECTURE
-- Purpose: Enable B2B2C payment distribution (Platform → Clinic → Agency)
-- Date: 2026-02-04

-- =====================================================
-- 1. CONNECTED ACCOUNTS (Clinic Stripe Accounts)
-- =====================================================
CREATE TABLE IF NOT EXISTS connected_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship
    tenant_id TEXT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Stripe Connect Data
    stripe_account_id TEXT UNIQUE NOT NULL, -- Clinic's Stripe Connected Account ID
    account_type TEXT NOT NULL DEFAULT 'standard', -- 'standard' or 'express' or 'custom'
    
    -- Status
    charges_enabled BOOLEAN DEFAULT false, -- Can receive payments
    payouts_enabled BOOLEAN DEFAULT false, -- Can receive payouts
    details_submitted BOOLEAN DEFAULT false, -- KYC completed
    
    -- Metadata
    country TEXT DEFAULT 'TR',
    currency TEXT DEFAULT 'try',
    
    -- Onboarding
    onboarding_url TEXT, -- Stripe Connect onboarding link
    onboarding_completed_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes
    UNIQUE(tenant_id)
);

CREATE INDEX idx_connected_accounts_tenant ON connected_accounts(tenant_id);
CREATE INDEX idx_connected_accounts_stripe ON connected_accounts(stripe_account_id);

-- =====================================================
-- 2. AGENCIES (Partner/Referral System)
-- =====================================================
CREATE TABLE IF NOT EXISTS agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Agency Info
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    
    -- Stripe Connect
    stripe_account_id TEXT UNIQUE, -- Agency's Stripe Connected Account
    
    -- Commission Structure
    commission_rate DECIMAL(5,2) DEFAULT 20.00, -- % of platform fee (e.g., 20% of our 15%)
    min_payout DECIMAL(10,2) DEFAULT 100.00, -- Minimum payout threshold
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    verified BOOLEAN DEFAULT false,
    
    -- Metrics
    total_referrals INT DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agencies_email ON agencies(email);
CREATE INDEX idx_agencies_stripe ON agencies(stripe_account_id);

-- =====================================================
-- 3. UPDATE TENANTS TABLE (Add Agency Reference)
-- =====================================================
ALTER TABLE tenants 
ADD COLUMN IF NOT EXISTS referred_by_agency_id UUID REFERENCES agencies(id);

CREATE INDEX IF NOT EXISTS idx_tenants_agency ON tenants(referred_by_agency_id);

-- =====================================================
-- 4. PAYMENT SPLITS (Transaction History)
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Payment Reference
    stripe_payment_intent_id TEXT UNIQUE NOT NULL,
    stripe_charge_id TEXT,
    
    -- Parties
    tenant_id TEXT NOT NULL REFERENCES tenants(id),
    agency_id UUID REFERENCES agencies(id), -- NULL if no referral
    
    -- Amounts (in smallest currency unit, e.g., cents/kuruş)
    total_amount BIGINT NOT NULL, -- Total payment from patient
    
    clinic_amount BIGINT NOT NULL, -- Amount to clinic (85%)
    platform_fee BIGINT NOT NULL, -- Platform fee (15%)
    agency_fee BIGINT DEFAULT 0, -- Agency fee (% of platform fee)
    
    -- Currency
    currency TEXT DEFAULT 'try',
    
    -- Status
    status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    
    -- Transfer IDs
    clinic_transfer_id TEXT, -- Stripe Transfer ID to clinic
    agency_transfer_id TEXT, -- Stripe Transfer ID to agency
    
    -- Metadata
    package_type TEXT, -- 'starter', 'professional', 'enterprise'
    description TEXT,
    
    -- Error Tracking
    error_message TEXT,
    retry_count INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_splits_tenant ON payment_splits(tenant_id);
CREATE INDEX idx_payment_splits_agency ON payment_splits(agency_id);
CREATE INDEX idx_payment_splits_status ON payment_splits(status);
CREATE INDEX idx_payment_splits_intent ON payment_splits(stripe_payment_intent_id);

-- =====================================================
-- 5. COMMISSION RULES (Package-Specific Splits)
-- =====================================================
CREATE TABLE IF NOT EXISTS commission_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Rule Definition
    package_type TEXT NOT NULL UNIQUE, -- 'starter', 'professional', 'enterprise'
    
    -- Split Percentages (stored as decimals, e.g., 85.00 = 85%)
    clinic_percentage DECIMAL(5,2) NOT NULL DEFAULT 85.00,
    platform_percentage DECIMAL(5,2) NOT NULL DEFAULT 15.00,
    
    -- Agency Commission (% of platform fee)
    agency_commission_percentage DECIMAL(5,2) DEFAULT 20.00,
    
    -- Metadata
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Rules
INSERT INTO commission_rules (package_type, clinic_percentage, platform_percentage, agency_commission_percentage, description)
VALUES 
    ('starter', 90.00, 10.00, 20.00, 'Starter package: 90% clinic, 10% platform fee'),
    ('professional', 85.00, 15.00, 20.00, 'Professional package: 85% clinic, 15% platform fee'),
    ('enterprise', 80.00, 20.00, 15.00, 'Enterprise package: 80% clinic, 20% platform fee (lower agency cut)')
ON CONFLICT (package_type) DO NOTHING;

-- =====================================================
-- 6. ENABLE RLS (Row Level Security)
-- =====================================================
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_rules ENABLE ROW LEVEL SECURITY;

-- Policies (Basic - can be enhanced later)
CREATE POLICY "Tenants can view their own connected account"
    ON connected_accounts FOR SELECT
    USING (tenant_id = current_setting('app.current_tenant', true));

CREATE POLICY "Payment splits visible to relevant parties"
    ON payment_splits FOR SELECT
    USING (
        tenant_id = current_setting('app.current_tenant', true) OR
        auth.uid() IN (SELECT id FROM auth.users WHERE role = 'service_role')
    );

-- =====================================================
-- 7. FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_connected_accounts_updated_at
    BEFORE UPDATE ON connected_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agencies_updated_at
    BEFORE UPDATE ON agencies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_splits_updated_at
    BEFORE UPDATE ON payment_splits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_commission_rules_updated_at
    BEFORE UPDATE ON commission_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Stripe Account Types:
--    - 'standard': Full Stripe account, clinic manages their own
--    - 'express': Simplified onboarding, platform manages most
--    - 'custom': Full control by platform (complex)
--
-- 2. Payment Flow:
--    Patient → Aura Platform → [85% Clinic, 15% Platform] → [20% of 15% → Agency]
--
-- 3. Security:
--    - All transfers are atomic (Stripe handles)
--    - RLS enabled for data access control
--    - Audit trail via payment_splits table
--
-- 4. Future Enhancements:
--    - Payout schedules (daily, weekly, monthly)
--    - Dispute handling
--    - Refund logic
--    - Multi-currency support
