const http = require('http');

async function sendWebhook(body, mediaUrl, contentType) {
    const formData = new URLSearchParams();
    formData.append('From', 'whatsapp:+905321002030');
    formData.append('To', 'whatsapp:+14155238886');
    if (body) formData.append('Body', body);
    if (mediaUrl) {
        formData.append('MediaUrl0', mediaUrl);
        formData.append('MediaContentType0', contentType);
    }

    console.log(`\n\n[>>> GÖNDERİLEN MESAJ (Hasta - +905321002030)]: ${body || '[MEDYA EKLENDİ]'}`);

    try {
        const response = await fetch('http://localhost:3001/api/webhooks/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        const text = await response.text();
        console.log(`[<<< AI YANITI (Twilio TwiML / Logged)]: \n${text}`);
    } catch (e) {
        console.error('[HATA]: Sunucu yanıt vermedi. Localhost:3000 çalışıyor mu?', e.message);
    }
}

async function runTest() {
    console.log("=== AURA OS DEMO AKIŞ TESTİ ===");

    // 1. Arapça selam
    await sendWebhook("مرحبا");

    // Bekle
    await new Promise(r => setTimeout(r, 6000));

    // 2. Arapça fiyat sor, diş implant
    await sendWebhook("كم تكلفة زراعة الأسنان، أريد خصم"); // "How much is dental implant, I want discount"

    console.log("\n=== TEST TAMAMLANDI ===");
    process.exit(0);
}

runTest();
