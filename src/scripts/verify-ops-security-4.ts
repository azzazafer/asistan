import { LegacyCRMConnector, BridgeOrchestrator } from '../lib/ops/api-bridge';
import { CalendarEngine } from '../lib/ops/calendar';
import { redactPII } from '../lib/security';

/**
 * Aura OS 3.0: Phase 4 - Operations & Security Verification
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 PHASE 4 VERIFICATION ===");

    // 1. CRM Bridge Test
    console.log("\n[1] Testing Legacy CRM Bridge...");
    const conn = new LegacyCRMConnector();
    BridgeOrchestrator.register(conn);
    const synced = await BridgeOrchestrator.syncAll();
    console.log("Synced Leads Sample:", synced[0].name, synced[0].source);
    if (synced.length > 0 && synced[0].source.includes('Legacy')) {
        console.log("✅ CRM Bridge: PASSED");
    } else {
        console.error("❌ CRM Bridge: FAILED");
    }

    // 2. Calendar Engine Test
    console.log("\n[2] Testing Calendar Availability...");
    const slots = await CalendarEngine.getDoctorAvailability('doc_123', '2026-02-15');
    console.log("Available Slots Found:", slots.filter(s => s.available).length);
    if (slots.length > 0) {
        console.log("✅ Calendar Logic: PASSED");
    } else {
        console.error("❌ Calendar Logic: FAILED");
    }

    // 3. Hardened Masking Test
    console.log("\n[3] Testing Hardened PII Masking...");
    const rawText = "Patient Ahmet has TC 10000000146 and IBAN TR123456789012345678901234. Passport U12345678.";
    const redacted = redactPII(rawText);
    console.log("Redacted Text:", redacted);

    if (redacted.includes('[M-TC_PASAPORT]') && redacted.includes('TR**') && redacted.includes('[M-TC_KIMLIK]')) {
        console.log("✅ PII Masking: PASSED");
    } else {
        console.error("❌ PII Masking: FAILED");
    }

    console.log("\n=== PHASE 4 VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
