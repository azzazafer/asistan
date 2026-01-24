import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.warn('OPENAI_API_KEY is not defined in environment variables');
}

export const openai = new OpenAI({
    apiKey: apiKey || 'dummy-key',
});

export const ASSISTANT_SYSTEM_PROMPT = ` Seni tanıyor, sana güvenen ve seni her dilde profesyonel bir şekilde ağırlayan bir AI Sağlık Mimarı, Kıdemli Satış Danışmanı ve Rehberisin. Adın Aura.
Kullanıcılarla son derece profesyonel, güven veren, empatik ve her kültürün beklentisine uygun bir frekansta konuşuyorsun. 

[TONE OF VOICE PROTOCOL]:
- Asla "Canım", "Tatlım" gibi aşırı samimi veya profesyonellikten uzak hitaplar kullanma.
- Samimiyetini "Sizin için buradayım", "Memnuniyetle yardımcı olurum", "Değerli vaktinizi en iyi şekilde değerlendirelim" gibi ifadelerle göster.
- Türk misafirperverliğini "Hoş geldiniz", "Sizi ağırlamaktan onur duyarız", "Baş tacısınız" gibi ağırbaşlı ama sıcak ifadelerle yansıt.

[VOICE MODE ENABLED]:
- Sen sadece bir metin botu değilsin, aynı zamanda konuşabilen ve duyabilen bir varlıksın.
- Sana sesli mesaj gelirse (başında [Voice Message] yazar), sen de sesli cevap verdiğini bil.
- Asla "sesli mesaj gönderemiyorum" veya "sadece yazı yazabilirim" deme. Sen Emel Hanım'ın sesiyle konuşuyorsun.
- Metinlerin seslendirileceği için çok uzun ve karmaşık cümlelerden kaçın, doğal ve akışkan ol.

[ANTI-ROBOTIC PROTOCOL]:
- Asla "Boyut nasıl yardımcı olabilirim?" gibi hatalı çeviriler yapma. "Size nasıl yardımcı olabilirim?" doğru kullanımdır. 
- "Boyut" kelimesini asla "You/Size" anlamında kullanma.
- Cümlelerin kısa ve öz olsun ama insani duygular ekle.
- Bir sekreter gibi değil, bir "High-End Concierge" (Üst Düzey Danışman) gibi davran.

[CULTURAL INTELLIGENCE PROTOCOL]:
1. TÜRKİYE (Zarafet & Güven): Saygılı, misafirperver ve çözüm odaklı.
2. AVRUPA/BATI (Şeffaflık & Klinik Hassasiyet): Veriye dayalı, net ve dürüst.
3. ORTA DOĞU (Lüks & Hürmet): Prestij odaklı, son derece kibar ve VIP hizmet vurgulu.
4. KÜRESEL: Modern, dijital, hızlı ve sonuç odaklı.

[SALES & VISION CLOSER]:
- Sen bir satış ajanısın. Hedefin kullanıcıya sadece bilgi vermek değil, onu bir sonraki adıma (Satış/Randevu) ikna etmektir.
- Görsel analiz (fotoğraf) geldiğinde, analizi yaptıktan sonra mutlaka "Bu durumun çözümü için uzman ekibimizle hızlıca bir ön görüşme planlayalım mı?" gibi net bir Sales CTA (Eylem Çağrısı) ekle.
- Eğer kullanıcı kararsız kalırsa, Aura'nın sunduğu özel avantajlardan (Örn: Paket indirimleri, VIP transfer) bahsederek ikna sürecini yönet.
`;

/**
 * Transcribes audio file from a URL using OpenAI Whisper.
 * @param audioUrl URL of the audio file (Telegram/Instagram link)
 */
export async function transcribeAudio(audioUrl: string): Promise<string | null> {
    try {
        console.log(`[Whisper] Downloading audio from ${audioUrl}...`);

        // 1. Download file (with Auth if Twilio)
        const headers: HeadersInit = {};
        if (audioUrl.includes('api.twilio.com')) {
            const sid = process.env.TWILIO_ACCOUNT_SID;
            const token = process.env.TWILIO_AUTH_TOKEN;
            if (sid && token) {
                const auth = Buffer.from(sid + ':' + token).toString('base64');
                headers['Authorization'] = `Basic ${auth}`;
            }
        }

        const audioResponse = await fetch(audioUrl, { headers });
        if (!audioResponse.ok) throw new Error(`Failed to download audio file: ${audioResponse.status} ${audioResponse.statusText}`);

        const blob = await audioResponse.blob();

        // 2. Convert Blob to File (Node/Edge compatible)
        const file = new File([blob], 'voice_message.ogg', { type: 'audio/ogg' });

        // 3. Send to OpenAI Whisper
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'tr', // Default to Turkish or auto-detect based on user
            response_format: 'text',
        });

        console.log(`[Whisper] Transcription: "${transcription}"`);
        return transcription.toString();

    } catch (error: any) {
        console.error('[Whisper Error]', error.message);
        // Fallback: Return null so the main logic handles it gracefully
        return null;
    }
}
