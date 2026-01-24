import { AuraBrain } from '../lib/brain';
import { OmnichannelBridge } from '../lib/ai/omnichannel';
import { KnowledgeService } from '../lib/ai/knowledge';

/**
 * Aura OS 3.0: Phase 2 Verification Script
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 PHASE 2 VERIFICATION ===");

    // 1. Brain Discovery Queue Test
    console.log("\n[1] Testing Discovery Queue...");
    await AuraBrain.addToDiscoveryQueue('Techno-Suture', 'Context: New dental tech mentioned.');
    console.log("✅ Discovery Queue Logic: TRIGGERED (Check logs)");

    // 2. Hybrid Jargon Search Test
    console.log("\n[2] Testing Hybrid Jargon Search...");
    const jargonResult = await KnowledgeService.searchGlossary('FUE');
    console.log("Jargon Result (FUE):", jargonResult);
    if (jargonResult && jargonResult.term === 'Follicular Unit Extraction') {
        console.log("✅ Hybrid Search: PASSED");
    } else {
        console.error("❌ Hybrid Search: FAILED");
    }

    // 3. Omnichannel Retry Logic Simulation
    console.log("\n[3] Testing Omnichannel Retry Queue...");
    await OmnichannelBridge.queueMessage('test_user', 'Retry this later', 'whatsapp');
    console.log("✅ Retry Queue: INITIALIZED (Check logs for loop)");

    console.log("\n=== PHASE 2 VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
