-- Aura OS: Unified Identity & Master Patient Index
-- Merges different platform IDs into a single patient identity.

-- Enable pgvector if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS patient_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    master_id UUID DEFAULT gen_random_uuid(), -- Used to link different identity rows if needed
    wa_id TEXT UNIQUE, -- WhatsApp Number
    ig_id TEXT UNIQUE, -- Instagram Scoped ID
    tg_id TEXT UNIQUE, -- Telegram ID
    email TEXT UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    context_summary TEXT, -- Human readable summary
    context_vector VECTOR(1536) -- Embedding for identity matching/persona retrieval
);

-- RLS Isolation
ALTER TABLE patient_identities ENABLE ROW LEVEL SECURITY;

-- Indexing for fast lookups
CREATE INDEX idx_identities_wa_id ON patient_identities(wa_id);
CREATE INDEX idx_identities_ig_id ON patient_identities(ig_id);
CREATE INDEX idx_identities_email ON patient_identities(email);

-- Update Trigger
CREATE TRIGGER update_patient_identities_modtime
    BEFORE UPDATE ON patient_identities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
