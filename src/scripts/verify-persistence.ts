import { handleIncomingMessage, getMessageHistory } from '../lib/messaging';

async function verifyPersistence() {
    console.log('=== AURA OS: PERSISTENCE & TRIGGER VERIFICATION ===\n');

    const testUser = '+905009998877';
    const testMsg = 'Merhaba, burun ameliyatı süreci nasıl işliyor?';

    // 1. Test Incoming Trigger & DB Save
    console.log('[1] Testing Incoming Message Trigger...');
    try {
        await handleIncomingMessage({
            id: 'webhook_test_01',
            channel: 'whatsapp',
            from: testUser,
            to: '+908500000000',
            body: testMsg,
            receivedAt: new Date().toISOString()
        });
        console.log('✅ Trigger executed (Check logs for Bridge orchestration)');
    } catch (e) {
        console.log('❌ Trigger failed:', e);
    }

    // 2. Test History Retrieval from DB
    console.log('\n[2] Testing History Retrieval after (simulated) restart...');
    const history = await getMessageHistory(testUser);

    if (history.length > 0) {
        console.log(`✅ History Found: ${history.length} messages.`);
        console.log('Last Message Content:', history[history.length - 1].content);
        if (history.some(m => m.content === testMsg)) {
            console.log('✅ Message Persistence Verified in DB.');
        }
    } else {
        console.log('❌ No history found in DB. Retention FAILED.');
    }

    console.log('\n=== PERSISTENCE VERIFICATION FINISHED ===');
}

verifyPersistence();
