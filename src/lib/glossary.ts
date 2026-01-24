import { supabase } from './db';

export interface GlossaryEntry {
    term: string;
    definition_tr: string;
    definition_en: string;
    category: string;
}

export const lookupGlossary = async (text: string): Promise<string> => {
    if (!supabase) return text;

    // Fetch all terms (or we could use a smarter search, but for small glossary this is fine)
    const { data: glossary } = await supabase
        .from('medical_glossary')
        .select('term, definition_tr');

    if (!glossary) return text;

    let enrichedText = text;
    glossary.forEach((entry: any) => {
        const regex = new RegExp(`\\b${entry.term}\\b`, 'gi');
        if (regex.test(enrichedText)) {
            enrichedText = enrichedText.replace(regex, `${entry.term} [${entry.definition_tr}]`);
        }
    });

    return enrichedText;
};

export const getTermDefinition = async (term: string): Promise<string | null> => {
    if (!supabase) return null;

    const { data } = await supabase
        .from('medical_glossary')
        .select('definition_tr')
        .ilike('term', term)
        .single();

    return data?.definition_tr || null;
};
