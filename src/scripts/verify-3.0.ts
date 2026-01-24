import { translateJargon } from '../lib/jargon';
import { calculateLeadScore } from '../lib/scoring';
import { calculateRank, getRankLabel } from '../lib/gamification';

/**
 * Aura OS 3.0: Millimetric Verification Script
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 CORE VERIFICATION ===");

    // 1. Jargon Test
    console.log("\n[1] Testing Jargon Engine...");
    const rawText = "Patient needs FUE for hair and Zirconium for teeth.";
    const translatedText = translateJargon(rawText);
    console.log("Raw:", rawText);
    console.log("Translated:", translatedText);
    if (translatedText.includes('Follicular Unit Extraction') && translatedText.includes('Zirconium Dioxide Crown')) {
        console.log("✅ Jargon Translation: PASSED");
    } else {
        console.error("❌ Jargon Translation: FAILED");
    }

    // 2. Scoring Test: S-Rank (Neural VIP)
    console.log("\n[2] Testing S-Rank (Neural VIP) Logic...");
    const sRankLead = calculateLeadScore({
        treatment: 'Hollywood Smile',
        message: 'I want to decide now, I have the budget in Euro and I sent my photos.',
        hasMedicalReport: true,
        culture: 'UK'
    });
    console.log("S-Rank Lead Score:", sRankLead.score, "Rank:", sRankLead.rank);
    console.log("Reasons:", sRankLead.reasons);
    if (sRankLead.rank === 'S' && sRankLead.score >= 90) {
        console.log("✅ S-Rank Logic: PASSED");
    } else {
        console.error("❌ S-Rank Logic: FAILED");
    }

    // 3. Scoring Test: C-Rank (Cold)
    console.log("\n[3] Testing C-Rank (Cold) Logic...");
    const cRankLead = calculateLeadScore({
        treatment: 'Genel Bilgi',
        message: 'just looking',
        hasMedicalReport: false
    });
    console.log("C-Rank Lead Score:", cRankLead.score, "Rank:", cRankLead.rank);
    if (cRankLead.rank === 'C' && cRankLead.score < 40) {
        console.log("✅ C-Rank Logic: PASSED");
    } else {
        console.error("❌ C-Rank Logic: FAILED");
    }

    // 4. Gamification Sync Test
    console.log("\n[4] Testing Gamification Labels...");
    const sLabel = getRankLabel('S');
    console.log("S-Rank Label:", sLabel);
    if (sLabel === 'Neural VIP (S-Rank)') {
        console.log("✅ Gamification Labels: PASSED");
    } else {
        console.error("❌ Gamification Labels: FAILED");
    }

    console.log("\n=== VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
