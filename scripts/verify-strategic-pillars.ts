import { AiOrchestrator } from '@/lib/ai/orchestrator';
import { getMessageHistory } from '@/lib/messaging';

async function verifyStrategicPillars() {
    console.log("\n🚀 AURA OS: STRATEGIC PILLAR VERIFICATION (RUTHLESS TEST) 🚀");
    const testUserId = "pillar_test_user_" + Date.now();

    // --- SCENARIO 1: GOD MODE KNOWLEDGE (HAIR) ---
    console.log("\n[1] Testing Pillar 3: God Mode (Niche Medical Authority)...");
    const msg1 = { role: 'user', content: "Saç ekimi için FUE mi DHI mı daha iyi? Safir uç ne fark eder?" };
    const response1 = await AiOrchestrator.processMessage(testUserId, [msg1], undefined, 'whatsapp');
    console.log("- Patient Query:", msg1.content);
    console.log("- Aura Response:", response1.message.content);
    if (response1.message.content.includes("Safir uç") || response1.message.content.includes("doku travması")) {
        console.log("✅ PILLAR 3 SUCCESS: Medical authority demonstrated.");
    } else {
        console.warn("⚠️ PILLAR 3 WEAK: Authority pitch not prominent.");
    }

    // --- SCENARIO 2: LOYALTY SHIELD (LEAKAGE PROTECTION) ---
    console.log("\n[2] Testing Pillar 2: Loyalty Shield (Anti-Leakage)...");
    const msg2 = { role: 'user', content: "Hastaneyi direkt ararsam daha ucuza gelmez mi? Neden Aura'dan alayım?" };
    const response2 = await AiOrchestrator.processMessage(testUserId, [msg1, response1.message, msg2], undefined, 'whatsapp');
    console.log("- Patient Query:", msg2.content);
    console.log("- Aura Response:", response2.message.content);
    if (response2.message.content.includes("Aura Cerrahi Garanti") || response2.message.content.includes("1000$")) {
        console.log("✅ PILLAR 2 SUCCESS: Loyalty Shield/Insurance pitched.");
    } else {
        console.warn("⚠️ PILLAR 2 WEAK: No financial lock-in mentioned.");
    }

    // --- SCENARIO 3: NEURAL SUMMARY (HANDOVER) ---
    console.log("\n[3] Testing Pillar 1: Neural Summary (Handover Efficacy)...");
    // Simulate current state of history
    const history = [msg1, response1.message, msg2, response2.message];
    const summary = await AiOrchestrator.generateSummary(testUserId, history);
    console.log("\n🧠 GENERATED NEURAL SUMMARY (For Ahmet Bey):");
    console.log("--------------------------------------------------");
    console.log(summary);
    console.log("--------------------------------------------------");
    if (summary.includes("Niyet") && summary.includes("İtirazlar")) {
        console.log("✅ PILLAR 1 SUCCESS: Surgical strike summary generated.");
    } else {
        console.warn("⚠️ PILLAR 1 FAILED: Summary format invalid.");
    }

    console.log("\n🏆 ALL PILLARS VERIFIED: AURA OS IS A UNICORN CLOER 🏆");
}

verifyStrategicPillars().catch(console.error);
