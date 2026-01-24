import { OmnichannelBridge } from './src/lib/ai/omnichannel';

async function testLiveResponse() {
    console.log("--- AURA LIVE RESPONSE LOOP TEST ---");

    const mockMessage = {
        userId: "+905001112233",
        receiverId: "aura_gateway",
        content: "Merhaba, saç ekimi için uygun randevunuz var mı?",
        source: 'whatsapp' as const,
        timestamp: new Date().toISOString()
    };

    console.log(`[Test] Simulating incoming message: "${mockMessage.content}"`);

    // We trigger the bridge directly to simulate the gateway's background call
    const response = await OmnichannelBridge.processIncoming(mockMessage);

    if (response) {
        console.log("\n[Test] AI responded successfully!");
        console.log("- AI Response:", response.message.content);
        console.log("- Cultural Context:", response.context?.culture);
    } else {
        console.log("\n[Test] No response generated (check logs).");
    }

    console.log("\n--- TEST COMPLETE ---");
}

testLiveResponse().catch(console.error);
