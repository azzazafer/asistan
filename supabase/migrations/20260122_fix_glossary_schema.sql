-- Aura Intelligence: Medical Glossary Comprehensive Fix + RLS Permissions
DO $$
BEGIN
    -- Ensure columns exist if table was created partially
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'category') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN category TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'definition_tr') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN definition_tr TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'definition_en') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN definition_en TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'definition_ar') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN definition_ar TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'synonyms') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN synonyms TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'confidence_score') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN confidence_score DECIMAL DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'verified_by') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN verified_by TEXT DEFAULT 'auto';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'medical_glossary' AND COLUMN_NAME = 'last_verified_at') THEN
        ALTER TABLE public.medical_glossary ADD COLUMN last_verified_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

ALTER TABLE public.medical_glossary ENABLE ROW LEVEL SECURITY;

-- Reset and Add Policies
DROP POLICY IF EXISTS select_public_glossary ON public.medical_glossary;
DROP POLICY IF EXISTS insert_public_glossary ON public.medical_glossary;
DROP POLICY IF EXISTS update_public_glossary ON public.medical_glossary;

CREATE POLICY select_public_glossary ON public.medical_glossary FOR SELECT USING (true);
CREATE POLICY insert_public_glossary ON public.medical_glossary FOR INSERT WITH CHECK (true);
CREATE POLICY update_public_glossary ON public.medical_glossary FOR UPDATE USING (true);
