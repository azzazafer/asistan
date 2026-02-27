-- ============================================================
-- Aura OS: pgvector RAG Engine Migration
-- Tarih: 2026-02-27
-- Supabase SQL Editor'da calistir.
-- ============================================================

-- 1. pgvector uzantisini aktif et
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. knowledge_base tablosu
CREATE TABLE IF NOT EXISTS public.knowledge_base (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       TEXT NOT NULL,
    category        TEXT NOT NULL,   -- 'price' | 'faq' | 'doctor_bio' | 'procedure' | 'ops'
    content         TEXT NOT NULL,   -- Ham metin (embedding'in kaynak metni)
    embedding       vector(1536),    -- OpenAI text-embedding-3-small ciktisi
    language        TEXT DEFAULT 'tr',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Vektör indeksi (HNSW — cosine benzerlik icin en hizli)
CREATE INDEX IF NOT EXISTS idx_knowledge_base_embedding
    ON public.knowledge_base
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- Tenant bazli sorgular icin B-tree index
CREATE INDEX IF NOT EXISTS idx_knowledge_base_tenant
    ON public.knowledge_base (tenant_id, category);

-- 4. RLS
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_role_all_knowledge ON public.knowledge_base;
CREATE POLICY service_role_all_knowledge
    ON public.knowledge_base
    USING (auth.role() = 'service_role');

-- Anonim okuma (webhook'tan embedding sorgusu yaparken)
DROP POLICY IF EXISTS anon_select_knowledge ON public.knowledge_base;
CREATE POLICY anon_select_knowledge
    ON public.knowledge_base
    FOR SELECT
    USING (true);

-- 5. match_documents RPC
--    Parametre olarak p_tenant_id alir — cross-tenant veri sizdiri OLMAZ.
CREATE OR REPLACE FUNCTION match_documents(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.70,
    match_count     int   DEFAULT 3,
    p_tenant_id     text  DEFAULT ''
)
RETURNS TABLE (
    id          uuid,
    tenant_id   text,
    category    text,
    content     text,
    similarity  float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        kb.id,
        kb.tenant_id,
        kb.category,
        kb.content,
        1 - (kb.embedding <=> query_embedding) AS similarity
    FROM public.knowledge_base kb
    WHERE
        kb.tenant_id = p_tenant_id
        AND kb.embedding IS NOT NULL
        AND 1 - (kb.embedding <=> query_embedding) >= match_threshold
    ORDER BY kb.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
