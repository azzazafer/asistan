
/**
 * Aura OS Fast-Path Intent Analyzer ⚡
 * Goal: Sub-12ms intent detection for critical paths.
 * Grounding the marketing claim with structural reality.
 */

export interface FastPathIntent {
    intent: 'pricing' | 'medical' | 'emergency' | 'payment' | 'appointment' | 'unknown';
    confidence: number;
    fastPath: boolean;
}

const INTENT_PATTERNS = {
    pricing: [/fiyat/i, /ne kadar/i, /ücret/i, /maliyet/i, /kaç para/i, /price/i, /cost/i, /how much/i, /كم السعر/i, /تكلفة/i],
    medical: [/ağrı/i, /şişlik/i, /kanama/i, /iltihap/i, /doktor/i, /operasyon/i, /tedavi/i, /pain/i, /swelling/i, /bleeding/i, /treatment/i, /ألم/i, /نزيف/i, /علاج/i],
    emergency: [/acil/i, /yardım/i, /ölüyorum/i, /emergency/i, /help/i, /sos/i, /طوارئ/i, /مساعدة/i],
    payment: [/ödeme/i, /kart/i, /taksit/i, /iban/i, /havale/i, /eft/i, /payment/i, /card/i, /installment/i, /دفع/i, /بطاقة/i],
    appointment: [/randevu/i, /kayıt/i, /müsait/i, /gün/i, /saat/i, /appointment/i, /booking/i, /schedule/i, /موعد/i, /حجز/i],
};

export class FastPathLoader {
    static analyze(text: string): FastPathIntent {
        const startTime = performance.now();

        for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
            if (patterns.some(pattern => pattern.test(text))) {
                const endTime = performance.now();
                const latency = endTime - startTime;

                console.log(`[FAST-PATH] Intent: ${intent} detected in ${latency.toFixed(4)}ms`);

                return {
                    intent: intent as any,
                    confidence: 0.95,
                    fastPath: true
                };
            }
        }

        return {
            intent: 'unknown',
            confidence: 0,
            fastPath: false
        };
    }
}
