import { FollowupEngine } from '../lib/followup';

/**
 * Aura OS 3.0: Phase 3 - Sales Optimization Verification
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 PHASE 3 VERIFICATION: SALES ===");

    // 1. FOMO Trigger Test
    console.log("\n[1] Testing FOMO Triggers...");
    const fomoTR = FollowupEngine.getFOMOMessage('Hair', 'Turkey');
    const fomoUK = FollowupEngine.getFOMOMessage('Hair', 'UK/IE');

    console.log("TR FOMO:", fomoTR);
    console.log("UK FOMO:", fomoUK);

    if (fomoTR.includes('Şubat') && fomoUK.includes('London-VIP')) {
        console.log("✅ FOMO Logic: PASSED");
    } else {
        console.error("❌ FOMO Logic: FAILED");
    }

    // 2. Follow-up Cadence Test
    console.log("\n[2] Testing Follow-up Cadences...");
    const lastContact = new Date('2026-01-21T10:00:00Z');

    const nextS = FollowupEngine.calculateNextFollowup('S', lastContact);
    const nextB = FollowupEngine.calculateNextFollowup('B', lastContact);

    console.log("Rank S Next:", nextS.toISOString());
    console.log("Rank B Next:", nextB.toISOString());

    // S should be +1 day (24h)
    // B should be +7 days
    const diffS = (nextS.getTime() - lastContact.getTime()) / (1000 * 60 * 60);
    const diffB = (nextB.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24);

    if (diffS === 24 && diffB === 7) {
        console.log("✅ Cadence Logic: PASSED");
    } else {
        console.error("❌ Cadence Logic: FAILED (S Diff:", diffS, "B Diff:", diffB, ")");
    }

    console.log("\n=== SALES VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
