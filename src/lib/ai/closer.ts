import { supabase } from '../db';
import { openai } from '../openai';
import { LearningService } from './learning';

export interface StaleLead {
    id: string;
    name: string;
    phone: string;
    last_interaction: string;
    history: any[];
    drop_off_reason?: string;
    suggested_nudge?: string;
    lang: string;
}

/**
 * The "Sales Sniper" Module.
 * Responsible for reactivating stale leads with contextual intelligence.
 */
export class SalesCloser {

    /**
     * Find leads who haven't replied in 24 hours but are potentially interested (Score > 40).
     */
    static async identifyStaleLeads(tenantId: string = 'default_clinic'): Promise<StaleLead[]> {
        if (!supabase) return [];

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        // 1. Fetch leads
        const { data: leads } = await supabase
            .from('leads')
            .select('*')
            .eq('tenant_id', tenantId)
            .lt('date', twentyFourHoursAgo) // Modified date assumption (using 'date' as last interaction for now)
            .neq('status', 'Randevu Onaylandı')
            .gt('score', 40) // Only filter "warm" leads
            .order('date', { ascending: false })
            .limit(5); // Process batch of 5 for safety

        if (!leads) return [];

        const results: StaleLead[] = [];

        for (const lead of leads) {
            // 2. Analyze Drop-off
            const analysis = await this.analyzeDropOff(lead.history || []);

            // 3. Generate Nudge
            if (analysis.reason) {
                const nudge = await this.generateContextualNudge(lead, analysis.reason);
                results.push({
                    id: lead.id,
                    name: lead.name,
                    phone: lead.phone,
                    last_interaction: lead.date,
                    history: lead.history,
                    drop_off_reason: analysis.reason,
                    suggested_nudge: nudge,
                    lang: lead.culture === 'Turkey' ? 'tr' : 'en' // Simplification
                });
            }
        }

        return results;
    }

    /**
     * Analyze context to find WHY they stopped.
     */
    private static async analyzeDropOff(history: any[]): Promise<{ reason: string }> {
        if (!history || history.length === 0) return { reason: 'GHOSTED_EARLY' };

        const lastFew = history.slice(-5);

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o', // Higher intelligence for drop-off analysis
                messages: [
                    {
                        role: 'system',
                        content: `Analyze the conversation. Classified the DROP-OFF REASON (Why user stopped replying).
                        Categories:
                        - PRICE_SHOCK (User saw price and stopped)
                        - PHOTO_HESITATION (Asked for photos, user stopped)
                        - TRUST_DOUBT (User asked about safety/results)
                        - STRIPE_ABANDONED (Clicked pay link but didn't finish)
                        - BUSY/NO_REPLY (Just stopped randomly)
                        - GHOSTED_EARLY (Stopped after greeting)
                        
                        Return JSON: { "reason": "CATEGORY" }`
                    },
                    { role: 'user', content: JSON.stringify(lastFew) }
                ],
                response_format: { type: "json_object" }
            });

            return JSON.parse(response.choices[0].message.content || '{"reason": "BUSY"}');
        } catch (e) {
            return { reason: 'BUSY' }; // Fallback
        }
    }

    /**
     * Generate the specific message to convert them back.
     */
    private static async generateContextualNudge(lead: any, reason: string): Promise<string> {
        let strategyContext = "";

        // 1. Check if we have a learned strategy for this reason
        if (reason === 'PRICE_SHOCK') {
            const learnedStrategy = await LearningService.getWinningStrategy('Price');
            if (learnedStrategy) strategyContext = `Use this proven winning strategy: "${learnedStrategy}"`;
        } else if (reason === 'TRUST_DOUBT') {
            const learnedStrategy = await LearningService.getWinningStrategy('Trust');
            if (learnedStrategy) strategyContext = `Use this proven winning strategy: "${learnedStrategy}"`;
        }

        // 2. Generate Message
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are Aura, a Senior Medical Sales Consultant.
                    The user (${lead.name}) stopped replying due to: ${reason}.
                    ${strategyContext}
                    Write a SHORT, high-impact WhatsApp message to re-engage them and lead them towards booking a consultation.
                    
                    Rules:
                    - NEVER use "canım" or "tatlım".
                    - Use a professional, warm, yet results-oriented tone.
                    - If reason is PRICE_SHOCK, offer a "Limited Time VIP Consultation Slot" or mention a premium benefit.
                    - If reason is TRUST_DOUBT, mention a specific success metric or "Patient Results Gallery".
                    
                    Language: ${lead.culture === 'Turkey' ? 'Turkish' : 'English'}.`
                },
                { role: 'user', content: "Generate the conversion nudge." }
            ]
        });

        return response.choices[0].message.content || "Merhaba, size nasıl yardımcı olabilirim?";
    }

    /**
     * Identifies and automatically sends nudges to stale leads.
     */
    static async runAutoPilot(tenantId: string = 'default_clinic'): Promise<number> {
        console.log(`[SalesCloser] Auto-Pilot run started for ${tenantId}...`);
        const staleLeads = await this.identifyStaleLeads(tenantId);

        let sentCount = 0;
        const { sendWhatsAppMessage } = require('../messaging');

        for (const lead of staleLeads) {
            if (lead.suggested_nudge) {
                console.log(`[SalesCloser] Sending nudge to ${lead.name} (${lead.phone})...`);
                const result = await sendWhatsAppMessage(lead.phone, lead.suggested_nudge);
                if (result.success) {
                    sentCount++;
                    // Update lead history to record the nudge
                    const { getLeadByPhone, addLead } = require('../leads');
                    const leadData = await getLeadByPhone(lead.phone, tenantId);
                    if (leadData) {
                        const nudgeHistory = {
                            role: 'assistant',
                            content: `[AUTO-NUDGE]: ${lead.suggested_nudge}`,
                            timestamp: new Date().toISOString(),
                            metadata: { type: 'auto_nudge', reason: lead.drop_off_reason }
                        };
                        await addLead({
                            ...leadData,
                            history: [...(leadData.history || []), nudgeHistory],
                            last_message_at: new Date().toISOString()
                        });
                    }
                }
            }
        }

        console.log(`[SalesCloser] Auto-Pilot finished. Sent ${sentCount} nudges.`);
        return sentCount;
    }
}
