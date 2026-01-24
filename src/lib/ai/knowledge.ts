import { supabase } from '../db';

export interface MedicalTerm {
    term: string;
    definition: string;
    category: string;
    synonyms?: string[];
}

export interface VerifiedInfo {
    source: string;
    title: string;
    content: string;
}

export class KnowledgeService {

    /**
     * Search for a term in the medical glossary with database analysis
     */
    static async searchGlossary(query: string, lang: string = 'tr', region?: string): Promise<MedicalTerm | null> {
        if (!supabase) return null;

        // 1. Primary Precise Search
        let { data, error } = await supabase
            .from('medical_glossary')
            .select('*')
            .or(`term.ilike.%${query}%,synonyms.cs.{${query}}`)
            .order('confidence_score', { ascending: false })
            .limit(1);

        // 2. Secondary Keyword Extraction (Neural Fallback)
        if ((!data || data.length === 0) && query.length > 5) {
            console.log(`[Knowledge] Precise match failed for "${query}". Trying keyword extraction...`);

            // Extract core medical nouns (Simplified simulation of NLP)
            const keywords = query.split(' ').filter(word => word.length > 4);
            if (keywords.length > 0) {
                const keywordQuery = keywords.map(k => `term.ilike.%${k}%`).join(',');
                const secondarySearch = await supabase
                    .from('medical_glossary')
                    .select('*')
                    .or(keywordQuery)
                    .order('confidence_score', { ascending: false })
                    .limit(1);

                if (secondarySearch.data && secondarySearch.data.length > 0) {
                    data = secondarySearch.data;
                    console.log(`[Knowledge] Secondary match found for keyword: ${data[0].term}`);
                }
            }
        }

        if (error || !data || data.length === 0) return null;

        const record = data[0];
        return {
            term: record.term,
            definition: lang === 'tr' ? record.definition_tr : (lang === 'ar' ? record.definition_ar : record.definition_en),
            category: record.category
        };
    }

    /**
     * Retrieve official information from verified sources (MOH, PubMed etc)
     */
    static async getVerifiedInfo(query: string, category?: string, region?: string): Promise<VerifiedInfo[]> {
        if (!supabase) return [];

        let dbQuery = supabase
            .from('verified_knowledge')
            .select('*')
            .or(`title.ilike.%${query}%,content.ilike.%${query}%`);

        if (category) {
            dbQuery = dbQuery.eq('category', category);
        }

        if (region) {
            // Filter by health ministry or specific region if tagged
        }

        const { data, error } = await dbQuery.order('importance_score', { ascending: false }).limit(3);

        if (error || !data) return [];

        return data.map((d: any) => ({
            source: d.source_name,
            title: d.title,
            content: d.content
        }));
    }

    /**
     * Store new jargon discovered from patient chats for verification
     */
    static async captureDiscovery(term: string, context: string, lang: string = 'tr') {
        if (!supabase) return;

        // Insert as pending verification
        await supabase.from('medical_glossary').insert({
            term,
            definition_tr: `[Pending AI Definition for ${term}]`,
            verified_by: 'auto',
            confidence_score: 0.1
        });

        console.log(`[Neural Discovery] New jargon captured: ${term}`);
    }

    /**
     * Pillar 3: "God Mode" Niche Library
     * Returns deep technical/surgical details for Hair and Dental treatments.
     */
    static getGodModeLib(niche: 'hair' | 'dental') {
        const libs = {
            hair: {
                techniques: ["FUE", "DHI", "Sapphire FUE", "U-FUE (Unshaven)"],
                god_mode_data: `
- Sapphire FUE: Safir uçlar, çelik uçlara göre doku travmasını %30 azaltır ve daha sık ekim (45-50 greft/cm2) imkanı sağlar.
- DHI (Direct Hair Implantation): Choi Implanter kalemleri ile kanal açma ve ekim aynı anda yapılır. Donör bölgeden alınan greftler dışarıda daha az beklediği için tutunma oranı %95 üzerindedir.
- Norwood Skalası: AI, hastanın kellik seviyesini (N1-N7) tespit ederken tepe ve ön hat açıklığına odaklanır.`,
                pitch: "Dermatoloji uzmanlarımız sadece greft sayısına değil, Greft/Saç teli oranına odaklanarak maksimum yoğunluk sağlar."
            },
            dental: {
                implants: ["Straumann", "Nobel Biocare", "Osstem"],
                god_mode_data: `
- Straumann (Swiss): Yüzey teknolojisi (SLA) sayesinde kemikleşme hızı 3-4 haftaya iner. Başarı oranı %98.8'dir.
- All-on-4: Hiç dişi olmayan hastalar için 4 implant üzerine full ark protez sabitlenir. Sinüs greftleme ihtiyacını %80 azaltır.
- Zirkonyum: Işık geçirgenliği %40'dır, bu da doğal diş minesine en yakın estetiği sağlar.`,
                pitch: "Kliniklerimizde sadece FDA onaylı ve ömür boyu garanti sertifikalı implant markaları kullanılır."
            }
        };
        return (libs as any)[niche] || null;
    }
}
