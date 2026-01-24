import { AuctionEngine } from '../lib/ops/auction-engine';
import { recordCommission } from '../lib/payments';

async function testBankPhase() {
    console.log('=== AURA OS: PHASE 6 - BANK VERIFICATION ===\n');

    // 1. Test Auction Publication
    console.log('[1] Testing Lead Auction Publication...');
    const mockLeadId = '550e8400-e29b-41d4-a716-446655440000';
    const auction = await AuctionEngine.publishToAuction(mockLeadId, 100);

    if (auction) {
        console.log('✅ Auction Published:', auction.id);
    } else {
        console.log('❌ Auction Publication Failed (Check Supabase configuration)');
    }

    // 2. Test Commission Recording logic (Unit test simulate)
    console.log('\n[2] Testing Commission Recording logic...');
    try {
        await recordCommission(mockLeadId, 'agent_uuid_placeholder', 5000);
        console.log('✅ Commission function executed (Check public.commissions table)');
    } catch (e) {
        console.log('❌ Commission Recording Error:', e);
    }

    // 3. Test Auction Claiming
    if (auction) {
        console.log('\n[3] Testing Lead Claiming...');
        const claimResult = await AuctionEngine.claimLead(auction.id, 'agent_uuid_placeholder');
        console.log(`Result: ${claimResult.message}`);
    }

    console.log('\n=== VERIFICATION FINISHED ===');
}

testBankPhase();
