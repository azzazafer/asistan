/**
 * SENTIMENT SAFETY GUARD V5 — Zero-cost, Zero-latency
 * GPT çağrısı YOK. Kriz tespiti keyword scan ile yapılır.
 * Duygu skoru orchestrator.ts'deki tek GPT çağrısından JSON olarak gelir.
 */

export interface SentimentAnalysis {
    score: number;                   // -1 (çok negatif) ile +1 (çok pozitif)
    grief_detected: boolean;
    crisis_keywords: string[];
    emotional_state: 'neutral' | 'positive' | 'negative' | 'crisis';
    recommended_action: 'proceed' | 'delay_3days' | 'abort';
    reasoning: string;
}

const GRIEF_KEYWORDS = [
    // Turkish
    'cenaze', 'vefat', 'öldü', 'kaybettik', 'yoğun bakım', 'kaza', 'kanser',
    // English
    'funeral', 'died', 'passed away', 'icu', 'emergency', 'cancer', 'grieving',
    // Arabic
    'جنازة', 'وفاة', 'مات', 'عملية'
];

/**
 * Saf keyword taraması — GPT çağrısı yapmaz.
 * Orchestrator'daki tek GPT çağrısına eklenmiş sentiment JSON alanını
 * doğrudan kullan; bu fonksiyon sadece kriz bypass guard olarak çalışır.
 */
export function analyzeSentimentSync(messages: any[]): SentimentAnalysis {
    if (!messages || messages.length === 0) {
        return {
            score: 0,
            grief_detected: false,
            crisis_keywords: [],
            emotional_state: 'neutral',
            recommended_action: 'proceed',
            reasoning: 'No message history'
        };
    }

    const lastThreeContent = messages
        .slice(-3)
        .map(m => (m.content || '').toLowerCase())
        .join(' ');

    const detectedKeywords = GRIEF_KEYWORDS.filter(kw =>
        lastThreeContent.includes(kw.toLowerCase())
    );

    if (detectedKeywords.length > 0) {
        console.warn(`[Sentiment Guard] ⚠️ Crisis keywords: ${detectedKeywords.join(', ')}`);
        return {
            score: -0.9,
            grief_detected: true,
            crisis_keywords: detectedKeywords,
            emotional_state: 'crisis',
            recommended_action: 'delay_3days',
            reasoning: `Crisis keywords detected: ${detectedKeywords.join(', ')}`
        };
    }

    return {
        score: 0,
        grief_detected: false,
        crisis_keywords: [],
        emotional_state: 'neutral',
        recommended_action: 'proceed',
        reasoning: 'Keyword scan passed — full analysis in orchestrator GPT response'
    };
}

/**
 * Async wrapper — geriye dönük uyumluluk için bırakıldı.
 * Artık GPT çağrısı yapmaz, keyword scan döner.
 */
export async function analyzeSentiment(messages: any[]): Promise<SentimentAnalysis> {
    return analyzeSentimentSync(messages);
}

/**
 * orchestrator.ts'den gelen finalAnalysis.sentiment ile zenginleştirilmiş analiz.
 * Kriz tespiti keyword scan'den yapılır; skor GPT'den gelir.
 */
export function mergeSentimentFromGpt(
    keywordSentiment: SentimentAnalysis,
    gptSentiment?: { score?: number; emotional_state?: string; crisis_alert?: boolean }
): SentimentAnalysis {
    if (!gptSentiment) return keywordSentiment;

    // Kriz keyword bulunduysa keyword taraması üstündür
    if (keywordSentiment.grief_detected) return keywordSentiment;

    return {
        ...keywordSentiment,
        score: gptSentiment.score ?? keywordSentiment.score,
        emotional_state: (gptSentiment.emotional_state as any) ?? keywordSentiment.emotional_state,
        grief_detected: gptSentiment.crisis_alert ?? false,
        recommended_action: gptSentiment.crisis_alert ? 'delay_3days' : 'proceed',
        reasoning: 'Merged: keyword scan + orchestrator GPT analysis'
    };
}

/**
 * Automated follow-up için kriz kontrolü.
 * GPT çağrısı yapmaz.
 */
export async function shouldSendAutomatedMessage(lead: any): Promise<{
    should_send: boolean;
    reason: string;
    alternative_action?: string;
}> {
    const sentiment = analyzeSentimentSync(lead.history || []);

    if (sentiment.recommended_action === 'abort') {
        return {
            should_send: false,
            reason: 'Lead in severe crisis — message aborted',
            alternative_action: 'escalate_to_human'
        };
    }

    if (sentiment.recommended_action === 'delay_3days') {
        return {
            should_send: false,
            reason: `Crisis detected: ${sentiment.reasoning}`,
            alternative_action: 'schedule_compassionate_message_3days'
        };
    }

    return {
        should_send: true,
        reason: 'Sentiment keyword check passed'
    };
}
