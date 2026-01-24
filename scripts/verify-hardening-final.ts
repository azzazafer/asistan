import { FollowupEngine } from '../lib/followup';
import { logAudit, getAuditLogs } from '../lib/security';
import { addLead } from '../lib/leads';

/**
 * Aura OS 3.0: System Hardening & Realism Verification
 */

async function runVerification() {
    console.log("=== AURA OS 3.0 HARDENING VERIFICATION ===");

    // 1. Audit Log Persistence Test
    console.log("\n[1] Testing Audit Log Persistence...");
    await logAudit({
        action: 'VERIFICATION_TEST',
        userId: 'tester_01',
        resource: 'HardeningSuite',
        details: 'Testing explicit audit persistence',
        clearance: 'ADMIN'
    });
    console.log("✅ Audit Log: INJECTED (Check Supabase for 'VERIFICATION_TEST')");

    // 2. Strict Tenancy Test
    console.log("\n[2] Testing Strict Tenancy Enforcement...");
    try {
        await (addLead as any)({ name: 'Faulty Lead', phone: '000' });
        console.error("❌ Strict Tenancy: FAILED (Accepted lead without tenant_id)");
    } catch (e: any) {
        console.log(`✅ Strict Tenancy: PASSED (${e.message})`);
    }

    // 3. Unified Followup Test
    console.log("\n[3] Testing Unified Followup Engine...");
    try {
        const report = await FollowupEngine.runDailySniper();
        console.log(`Followup Report: ${report.processed} leads processed.`);
        console.log("✅ Unified Followup: PASSED");
    } catch (e: any) {
        console.error("❌ Unified Followup: FAILED", e.message);
    }

    console.log("\n=== HARDENING VERIFICATION COMPLETE ===");
}

runVerification().catch(console.error);
