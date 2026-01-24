import { saveLeadToCloud } from '../lib/db';

/**
 * Lead Simulator (Phase 12)
 * Generates high-intent synthetic leads to demonstrate Aura's conversion velocity 
 * and Dashboard ROI reporting.
 */
export const runDemoSimulation = async (tenantId: string) => {
    console.log(`[Demo] Seeding 'Shadow Setup' for clinic: ${tenantId}...`);

    const demoLeads = [
        {
            name: "John Doe (Demo)",
            phone: "+447000000001",
            treatment: "Hair Transplant",
            status: "Beklemede",
            source: "Instagram AI",
            channel: "Instagram",
            culture: "Europe",
            score: 85,
            rank: 'S'
        },
        {
            name: "Ahmed Al-Farsi (Demo)",
            phone: "+97150000001",
            treatment: "Hollywood Smile",
            status: "Randevu Alındı",
            source: "WhatsApp AI",
            channel: "WhatsApp",
            culture: "Middle East",
            score: 95,
            rank: 'S'
        }
    ];

    for (const lead of demoLeads) {
        await saveLeadToCloud({ ...lead, tenant_id: tenantId });
        console.log(`[Demo] Injected simulated lead: ${lead.name}`);
    }

    console.log("[Demo] Optimization complete. Dashboard ready for Hospital Preview.");
};

if (require.main === module) {
    runDemoSimulation('demo_clinic_aura');
}
