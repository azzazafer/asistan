import { supabase } from '../db';
import { openai } from '../openai';

/**
 * The "Neural Student" Module.
 * Responsible for:
 * 1. Learning new strategies from successful closes (Win Analysis).
 * 2. Learning new vocabulary from patient chats (Glossary).
 * 3. Retrieving the best strategy for a given objection.
 */
export class LearningService {

    /**
     * [WIN ANALYSIS]: Called when a lead status changes to 'Randevu Onaylandı'.
     * Analyzes the chat history to find the "Winning Move".
     */
    static async analyzeWin(leadId: string, history: any[], tenantId: string = 'default_clinic') {
        if (!history || history.length < 4) return; // Need enough context

        console.log(`[Neural Learning] Analyzing win for Lead ${leadId}...`);

        try {
            // 1. Ask OpenAI to extract the strategy
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are a Sales Strategy Analyst. 
                        Analyze this chat history where the client eventually bought (converted).
                        Identify the key OBJECTION the client had (e.g., Price, Pain, Trust) and the WINNING RESPONSE the agent gave that overcame it.
                        
                        Return JSON format:
                        {
                            "trigger_topic": "Price" | "Pain" | "Trust" | "Timing" | "Other",
                            "successful_response": "The abstract concept or specific phrase used (e.g. 'offered installment plan')",
                            "confidence": 0.9
                        }`
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(history.slice(-10)) // Analyze last 10 messages
                    }
                ],
                response_format: { type: "json_object" }
            });

            const result = JSON.parse(response.choices[0].message.content || '{}');

            if (result.trigger_topic && result.successful_response) {
                // 2. Save to Strategy Library
                await supabase.from('sales_patterns').insert({
                    tenant_id: tenantId,
                    trigger_topic: result.trigger_topic,
                    successful_response: result.successful_response,
                    confidence_score: result.confidence || 0.8
                });
                console.log(`[Neural Learning] Learned new strategy for ${result.trigger_topic}: "${result.successful_response}"`);
            }

        } catch (e) {
            console.error('[Win Analysis Failed]', e);
        }
    }

    /**
     * [STRATEGY RETRIEVAL]: Get the best response for a given objection.
     */
    static async getWinningStrategy(topic: string, tenantId: string = 'default_clinic'): Promise<string | null> {
        if (!supabase) return null;

        const { data } = await supabase
            .from('sales_patterns')
            .select('successful_response')
            .eq('tenant_id', tenantId)
            .ilike('trigger_topic', `%${topic}%`)
            .order('confidence_score', { ascending: false })
            .limit(1);

        if (data && data.length > 0) {
            return data[0].successful_response;
        }
        return null;
    }

    /**
     * [GLOSSARY LEARNING]: Capture and define new terms.
     */
    static async captureGlossaryTerm(term: string, context: string) {
        if (!supabase) return;

        // check if exists
        const { data: existing } = await supabase.from('medical_glossary').select('id').eq('term', term).single();
        if (existing) return;

        console.log(`[Neural Learning] Defining new term: ${term}...`);

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `Define this medical/aesthetic term in 3 languages (TR, EN, AR) based on the context.
                        Return JSON: { "tr": "...", "en": "...", "ar": "...", "category": "..." }`
                    },
                    { role: 'user', content: `Term: ${term}\nContext: ${context}` }
                ],
                response_format: { type: "json_object" }
            });

            const defs = JSON.parse(response.choices[0].message.content || '{}');

            await supabase.from('medical_glossary').insert({
                term,
                definition_tr: defs.tr,
                definition_en: defs.en,
                definition_ar: defs.ar,
                category: defs.category || 'General',
                confidence_score: 0.8,
                verified_by: 'ai_auto'
            });

        } catch (e) {
            console.error('[Glossary Learning Failed]', e);
        }
    }
}
