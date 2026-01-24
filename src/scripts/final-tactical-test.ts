import { FallbackBridge } from '../lib/fallback-bridge';
import { normalizeCurrency } from '../lib/payments';
import { sendInstagramRichMessage } from '../lib/instagram';
import { sendTelegramRichMessage } from '../lib/telegram';

/**
 * The 'Satanic' Stress Test v2.0
 * Specifically targets the new 'Unicorn' points to find breaking logic.
 */
async function runSatanicFinalityTest() {
    console.log("--- STARTING RUTHLESS FINALITY TEST ---");

    // 1. FALLBACK BRIDGE TEST (Resilience)
    console.log("[Test 1] Simulating Meta API Blackout...");
    const fallbackResult = await FallbackBridge.triggerFallback("+905000000000", "Critical Message", 'whatsapp');
    if (fallbackResult.success && fallbackResult.channelUsed === 'sms') {
        console.log("✅ Fallback Bridge: RESILIENT (Switched to SMS)");
    } else {
        console.error("❌ Fallback Bridge: FAILED");
    }

    // 2. FX ORACLE TEST (Precision)
    console.log("[Test 2] Simulating Global Currency Normalization...");
    const amounts = [
        { val: 100, from: 'GBP', expected: 117 },
        { val: 100, from: 'USD', expected: 92 },
        { val: 1000, from: 'TRY', expected: 30 }
    ];

    for (const a of amounts) {
        const res = await normalizeCurrency(a.val, a.from);
        if (Math.abs(res - a.expected) < 0.1) {
            console.log(`✅ FX Oracle: ${a.from} Correct (${res})`);
        } else {
            console.error(`❌ FX Oracle: ${a.from} INCORRECT (Got ${res}, expected ${a.expected})`);
        }
    }

    // 3. RICH UI PAYLOAD TEST (Delivery)
    console.log("[Test 3] Auditing Rich UI Payloads...");
    const igRes = await sendInstagramRichMessage("user_1", "Hello", { buttons: [{ title: 'Pay', payload: 'PAY' }] });
    const tgRes = await sendTelegramRichMessage("chat_1", "Hello", [{ text: 'Link', url: 'http://test.com' }]);

    if (igRes.success && tgRes.success) {
        console.log("✅ Rich UI Adapters: WIRED (Sim-mode success)");
    } else {
        console.error("❌ Rich UI Adapters: BROKEN PATHS");
    }

    console.log("--- TEST COMPLETE ---");
}

runSatanicFinalityTest();
