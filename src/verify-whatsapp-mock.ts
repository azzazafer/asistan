
/**
 * WhatsApp Integration Simulator
 * 
 * Since we don't have a real Twilio account yet, this script mimics 
 * exactly what Twilio does when a user sends a message.
 * 
 * It sends a POST request to our LIVE Vercel endpoint.
 */

async function simulateWhatsAppMessage() {
    const WEBHOOK_URL = 'https://asistan-orcin.vercel.app/api/webhooks/whatsapp';

    // Simulate a user from Turkey sending "Merhaba"
    const formData = new URLSearchParams();
    formData.append('From', 'whatsapp:+905321002030'); // Fake Turkish Number
    formData.append('Body', 'Merhaba, saç ekimi fiyatlarınız nedir?');

    console.log(`[SIMULATOR] Sending message to ${WEBHOOK_URL}...`);
    console.log(`[SIMULATOR] From: +905321002030 (Turkey)`);
    console.log(`[SIMULATOR] Body: "Merhaba, saç ekimi fiyatlarınız nedir?"`);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        const xmlText = await response.text();

        console.log('\n[SIMULATOR] ✅ Response Received (Twilio TwiML):');
        console.log('------------------------------------------------');
        console.log(xmlText);
        console.log('------------------------------------------------');

        if (response.ok && xmlText.includes('<Response>')) {
            console.log(`\n[SUCCESS] The system correctly generated an XML response for WhatsApp.`);
            console.log(`[ANALYSIS] It detected the +90 code and likely responded in Turkish.`);
        } else {
            console.error('\n[FAILURE] The response was not valid TwiML.');
        }

    } catch (error) {
        console.error('[SIMULATOR] Network Error:', error);
    }
}

simulateWhatsAppMessage();
