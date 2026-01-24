/**
 * Aura Closer v3.0 - Autonomous Follow-up & FOMO Engine
 * Handles post-inquiry cadences and situational urgency triggers.
 */

import { supabase } from './db';
import { Lead, SubjectRank } from './types';
import { OmnichannelBridge } from './ai/omnichannel';

export class FollowupEngine {

    /**
     * FOMO (Fear Of Missing Out) Generator
     * Injects situational urgency into messages
     */
    static getFOMOMessage(treatment: string, culture: string): string {
        const triggers: Record<string, string> = {
            'DACH': "Hinweis: Wir haben nur noch 2 chirurgische VIP-Termine für Februar frei. Deutsche Qualitätsstandards garantiert.",
            'UK/IE': "London-VIP Note: Only 3 exclusive slots left for early March due to high demand from the UK concierge service.",
            'Europe': "Note: We only have 3 VIP surgical slots left for February due to high seasonal demand.",
            'Turkey': "Bilgi: Şubat ayı için VIP paketimizde son 2 kontenjan kaldı. Erken rezervasyon avantajı için bugün karar vermeniz önerilir.",
            'Middle East': "Special Offer: Our Royal Suite is currently available for your preferred dates.",
            'Global': "Urgency Alert: Current price lock expires in 48 hours."
        };

        return triggers[culture] || triggers['Global'];
    }

    /**
     * Logic for calculating next follow-up date based on rank
     */
    static calculateNextFollowup(rank: SubjectRank, lastContact: Date): Date {
        const nextDate = new Date(lastContact);

        switch (rank) {
            case 'S': // Neural VIP - Aggressive follow-up
                nextDate.setHours(nextDate.getHours() + 24);
                break;
            case 'A': // High Intent - 3 day cadence
                nextDate.setDate(nextDate.getDate() + 3);
                break;
            case 'B': // Nurturing - 7 day cadence
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'C': // Low Priority - 14 day cadence
                nextDate.setDate(nextDate.getDate() + 14);
                break;
            default:
                nextDate.setDate(nextDate.getDate() + 30);
        }

        return nextDate;
    }

    /**
     * UNIFIED SALES SNIPER (Daily Follow-up)
     * Replaces duplicated logic in cron routes.
     */
    static async runDailySniper() {
        console.log("[Followup Engine] Running Unified Sales Sniper...");
        if (!supabase) throw new Error("Database offline during follow-up.");

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: leads, error } = await supabase
            .from('leads')
            .select('*')
            .eq('status', 'Beklemede')
            .lt('date', twentyFourHoursAgo);

        if (error || !leads) return { processed: 0, errors: [error?.message] };

        const results = [];
        for (const lead of leads) {
            try {
                const nudge = await this.getPersonalizedNudge(lead);

                // Call Bridge to send message
                const { sendWhatsAppMessage } = require('./messaging');
                const sendResult = await sendWhatsAppMessage(lead.phone, nudge, lead.id);

                if (sendResult.success) {
                    const { logAudit } = require('./security');
                    await logAudit({
                        action: 'SNIPER_FOLLOWUP_SENT',
                        userId: lead.phone,
                        resource: 'FollowupEngine',
                        details: `Followup sent to ${lead.name} using Sniper logic.`,
                        clearance: 'SYSTEM'
                    });

                    await supabase.from('leads').update({
                        date: new Date().toISOString(),
                        internal_notes: (lead.internal_notes || '') + `\n[SNIPER] ${new Date().toLocaleDateString()}: ${nudge.slice(0, 30)}...`,
                        history: [...(lead.history || []), {
                            role: 'assistant',
                            content: nudge,
                            timestamp: new Date().toISOString(),
                            type: 'follow-up'
                        }]
                    }).eq('id', lead.id);
                    results.push({ id: lead.id, status: 'success' });
                }
            } catch (err: any) {
                console.error(`[Sniper Error] Lead ${lead.id}:`, err.message);
                results.push({ id: lead.id, status: 'failed', error: err.message });
            }
        }
        return { processed: leads.length, results };
    }

    /**
     * Generates a context-aware nudge message.
     */
    private static async getPersonalizedNudge(lead: Lead): Promise<string> {
        const { AiOrchestrator } = require('./ai/orchestrator');

        const aiResponse = await AiOrchestrator.processMessage(
            lead.phone,
            [{ role: 'user', content: "[SYSTEM_FOLLOW_UP_TRIGGER]" }],
            undefined,
            lead.channel?.toLowerCase() as any || 'whatsapp',
            lead.culture === 'Turkey' ? 'tr' : 'en'
        );

        return aiResponse.message.content || "Hello, just checking in on your inquiry. How can we help?";
    }

    /**
     * Skeleton for background worker to process pending cadences (Step-by-step)
     */
    static async processPendingFollowups() {
        // ...Existing CADENCE logic (Rank-based)
    }
}
