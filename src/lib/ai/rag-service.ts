/**
 * Aura RAG Service v2.0 — pgvector + OpenAI text-embedding-3-small
 *
 * Halusinasyon = sifir. Sistem yalnizca knowledge_base'deki
 * doğrulanmis verilerden yararlanir. Tenant izolasyonu katı.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 boyut, $0.02/1M token
const EMBEDDING_DIMENSIONS = 1536;
const DEFAULT_MATCH_THRESHOLD = 0.70;
const DEFAULT_MATCH_COUNT = 3;

// ── Client factory'leri ──────────────────────────────────────────────────────

function getOpenAI(): OpenAI {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('[RAG] OPENAI_API_KEY eksik.');
    return new OpenAI({ apiKey: key });
}

function getServiceClient(): SupabaseClient {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('[RAG] Supabase service role credentials eksik.');
    return createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
    });
}

// ── Tip Tanimlari ────────────────────────────────────────────────────────────

export interface KnowledgeChunk {
    id: string;
    tenant_id: string;
    category: string;
    content: string;
    similarity: number;
}

export interface RagResult {
    context: string;          // Orchestrator'a gecilecek birlesmis metin
    chunks: KnowledgeChunk[]; // Ham parcalar (debug icin)
    found: boolean;           // Esik altinda hic sonuc yoksa false
}

// ── Ana Servis Sinifi ────────────────────────────────────────────────────────

export class RagService {

    /**
     * GOREV 3 — Ana fonksiyon.
     * 1. Kullanicinin mesajini vektore cevirir (text-embedding-3-small)
     * 2. match_documents RPC'ye gonderir (tenant isolasyonlu)
     * 3. En alakali 3 parcayi birlestirip doner
     */
    static async retrieveRelevantChunks(
        query: string,
        tenantId: string,
        options?: {
            matchThreshold?: number;
            matchCount?: number;
            category?: string;
        }
    ): Promise<string[]> {
        const result = await this.retrieve(query, tenantId, options);
        return result.chunks.map(c => `[${c.category.toUpperCase()}]: ${c.content}`);
    }

    /**
     * Tam sonuc nesnesi donduran versiyon (orchestrator icin)
     */
    static async retrieve(
        query: string,
        tenantId: string,
        options?: {
            matchThreshold?: number;
            matchCount?: number;
            category?: string;
        }
    ): Promise<RagResult> {
        if (!query || !tenantId) {
            return { context: '', chunks: [], found: false };
        }

        const threshold = options?.matchThreshold ?? DEFAULT_MATCH_THRESHOLD;
        const count = options?.matchCount ?? DEFAULT_MATCH_COUNT;

        // 1. Metni vektore donustur
        let embedding: number[];
        try {
            embedding = await this.embed(query);
        } catch (err: any) {
            console.error('[RAG] Embedding hatas\u0131:', err.message);
            return { context: '', chunks: [], found: false };
        }

        // 2. Supabase match_documents RPC
        const supabase = getServiceClient();
        const { data, error } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: count,
            p_tenant_id: tenantId
        });

        if (error) {
            console.error('[RAG] RPC hatas\u0131:', error.message);
            return { context: '', chunks: [], found: false };
        }

        if (!data || data.length === 0) {
            console.warn(`[RAG] "${query}" icin ${tenantId} tenant'inda sonuc bulunamad\u0131.`);
            return { context: '', chunks: [], found: false };
        }

        // 3. Kategori filtresi (opsiyonel)
        const filtered: KnowledgeChunk[] = options?.category
            ? data.filter((d: any) => d.category === options.category)
            : data;

        // 4. Birlestir
        const context = filtered
            .map(c => `[${c.category.toUpperCase()} | Benzerlik: ${(c.similarity * 100).toFixed(0)}%]: ${c.content}`)
            .join('\n\n');

        console.log(`[RAG] ${filtered.length} sonuc bulundu. En yuksek benzerlik: ${(filtered[0]?.similarity * 100).toFixed(1)}%`);

        return { context, chunks: filtered, found: true };
    }

    /**
     * OpenAI text-embedding-3-small ile vektör üretir.
     */
    static async embed(text: string): Promise<number[]> {
        const openai = getOpenAI();
        const response = await openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: text.slice(0, 8192), // Max token limiti
            dimensions: EMBEDDING_DIMENSIONS
        });
        return response.data[0].embedding;
    }

    /**
     * knowledge_base'e yeni dokuman ekler (embedding otomatik hesaplanir).
     * Admin panel veya onboarding'den cagrilir.
     */
    static async addDocument(params: {
        tenantId: string;
        category: string;
        content: string;
        language?: string;
    }): Promise<{ id: string } | null> {
        const supabase = getServiceClient();

        let embedding: number[];
        try {
            embedding = await this.embed(params.content);
        } catch (err: any) {
            console.error('[RAG] addDocument embedding hatas\u0131:', err.message);
            return null;
        }

        const { data, error } = await supabase
            .from('knowledge_base')
            .insert({
                tenant_id: params.tenantId,
                category: params.category,
                content: params.content,
                embedding,
                language: params.language || 'tr'
            })
            .select('id')
            .single();

        if (error) {
            console.error('[RAG] addDocument DB hatas\u0131:', error.message);
            return null;
        }

        console.log(`[RAG] Dokuman eklendi: ${data.id}`);
        return data;
    }

    /**
     * Seed verilerinin embedding kolonunu doldurur.
     * SQL seed script'i embedding'leri NULL birakmistir.
     * Bu fonksiyon bir kez calistirilmali:
     *   await RagService.embedKnowledgeBase('nextoria_demo')
     */
    static async embedKnowledgeBase(tenantId: string): Promise<{ success: number; failed: number }> {
        const supabase = getServiceClient();

        const { data: docs, error } = await supabase
            .from('knowledge_base')
            .select('id, content')
            .eq('tenant_id', tenantId)
            .is('embedding', null);

        if (error || !docs) {
            console.error('[RAG] embedKnowledgeBase fetch hatas\u0131:', error?.message);
            return { success: 0, failed: 0 };
        }

        console.log(`[RAG] ${docs.length} dokuman embedding'i hesaplanacak...`);
        let success = 0;
        let failed = 0;

        for (const doc of docs) {
            try {
                const embedding = await this.embed(doc.content);

                const { error: updateErr } = await supabase
                    .from('knowledge_base')
                    .update({ embedding })
                    .eq('id', doc.id);

                if (updateErr) throw updateErr;
                success++;
                console.log(`[RAG] OK ${doc.id} (${success}/${docs.length})`);

                // OpenAI rate limit icin bekle (tier 1: 500 RPM)
                await new Promise(r => setTimeout(r, 120));

            } catch (err: any) {
                console.error(`[RAG] FAIL ${doc.id}:`, err.message);
                failed++;
            }
        }

        console.log(`[RAG] embedKnowledgeBase tamamlandi. Basarili: ${success}, Basarisiz: ${failed}`);
        return { success, failed };
    }

    /**
     * Mevcut bir dokumani siler.
     */
    static async deleteDocument(id: string, tenantId: string): Promise<boolean> {
        const supabase = getServiceClient();
        const { error } = await supabase
            .from('knowledge_base')
            .delete()
            .eq('id', id)
            .eq('tenant_id', tenantId); // Cross-tenant silme engeli

        if (error) {
            console.error('[RAG] deleteDocument hatas\u0131:', error.message);
            return false;
        }
        return true;
    }
}
