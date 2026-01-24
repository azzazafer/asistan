-- Aura OS Phase: White-Label & Multi-Tenancy
-- ===========================================

-- 1. TENANTS Table
CREATE TABLE IF NOT EXISTS public.tenants (
    id TEXT PRIMARY KEY, -- e.g., 'aura-clinic', 'zafer-health'
    name TEXT NOT NULL,
    domain TEXT UNIQUE, -- e.g., 'clinic.auraos.com'
    logo_url TEXT,
    primary_color TEXT DEFAULT '#4f46e5',
    secondary_color TEXT DEFAULT '#000000',
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'active'
);

-- 2. Insert Default Tenant (Aura Core)
INSERT INTO public.tenants (id, name, domain, primary_color)
VALUES ('default_clinic', 'Aura Health Core', 'localhost', '#4f46e5')
ON CONFLICT (id) DO NOTHING;

-- 3. Update Profiles to have foreign key to Tenants (Optional but good)
-- ALTER TABLE public.profiles ADD CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
