import { getCultureConfig, getSentimentInstruction } from '../lib/culture-matrix';

/**
 * Aura OS 3.0: Phase 3 - Cultural Intelligence Verification
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 PHASE 3 VERIFICATION: CULTURE ===");

    // 1. DACH Region Check
    console.log("\n[1] Testing DACH Region...");
    const dachConfig = getCultureConfig('DACH');
    console.log("DACH Priority:", dachConfig.priority);
    if (dachConfig.priority.includes('Precision') && dachConfig.tone.includes('Sie')) {
        console.log("✅ DACH Logic: PASSED");
    } else {
        console.error("❌ DACH Logic: FAILED");
    }

    // 2. UK/IE Region Check
    console.log("\n[2] Testing UK/IE Region...");
    const ukConfig = getCultureConfig('UK/IE');
    console.log("UK Title:", ukConfig.specialOffer.title);
    if (ukConfig.specialOffer.title.includes('London-VIP')) {
        console.log("✅ UK Logic: PASSED");
    } else {
        console.error("❌ UK Logic: FAILED");
    }

    // 3. Sentiment Override Check (Anxious in DACH)
    console.log("\n[3] Testing Sentiment Override (Anxious in DACH)...");
    const instruction = getSentimentInstruction('DACH', 'Anxious');
    console.log("Instruction:", instruction);
    if (instruction.includes('medical evidence') && instruction.includes('safety certifications')) {
        console.log("✅ Sentiment Override: PASSED");
    } else {
        console.error("❌ Sentiment Override: FAILED");
    }

    // 4. Fallback Check
    console.log("\n[4] Testing Fallback...");
    const fallback = getCultureConfig('Unknown');
    if (fallback.tone.includes('Fast, energetic')) {
        console.log("✅ Fallback Logic: PASSED");
    } else {
        console.error("❌ Fallback Logic: FAILED");
    }

    console.log("\n=== CULTURE VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
