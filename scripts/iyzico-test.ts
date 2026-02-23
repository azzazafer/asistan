
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runIyzicoTest() {
    console.log("\n🇹🇷 IYZICO MARKETPLACE GHOST TEST INIT...");
    console.log("========================================");

    // 1. Define Payload (Simulating Frontend)
    const payload = {
        tenantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // The Ghost Clinic
        amount: 100.00,
        packageType: 'professional',
        cardHolderName: 'Sandbox User',
        cardNumber: '5555666677778888', // Dummy
        expireMonth: '12',
        expireYear: '30',
        cvc: '123'
    };

    console.log("📤 Sending Payload to /api/payments/pay...");

    try {
        const res = await fetch('http://localhost:3000/api/payments/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await res.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("\n❌ API Returned Non-JSON Response!");
            console.error("------------------------------------------------");
            // Log first 1000 chars of HTML to identify the Next.js error
            console.error(text.substring(0, 1000));
            console.error("------------------------------------------------");
            return;
        }

        console.log("\n📥 RESPONSE:");
        console.log(JSON.stringify(data, null, 2));

        console.log("\n🧐 ANALİZ:");
        if (data.success) {
            console.log("✅ SUCCESS! Iyzico returned a payment form/initiation.");
        } else if (data.error) {
            console.log("⚠️ API returned error:");
            console.log(`   ${data.error}`);

            if (data.details) {
                console.log(`   Details: ${data.details}`);
            }

            if (data.error.includes("Valid subMerchantKey") || data.error.includes("sub-merchant")) {
                console.log("✅ ARCHITECTURE VERIFIED: The system successfully retrieved the SubMerchantKey from DB and sent it to Iyzico.");
            } else if (data.error.includes("Clinic is not a connected")) {
                console.log("❌ DB LOOKUP FAILED: Could not find the submerchant key in connected_accounts.");
            }
        }

    } catch (e) {
        console.error("❌ Request Failed (is localhost:3000 running?):", e);
    }
}

runIyzicoTest();
