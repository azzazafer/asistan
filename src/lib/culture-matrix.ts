/**
 * Aura Global Culture Matrix v3.0
 * Manages cultural adaptation logic, tone shifts based on sentiment, and granular regions.
 */

export type CultureType = 'DACH' | 'UK/IE' | 'Europe' | 'Middle East' | 'Global' | 'Turkey';
export type SentimentType = 'Neutral' | 'Anxious' | 'Decisive' | 'Demanding';

interface CultureConfig {
    priority: string[];
    tone: string;
    sentimentOverrides?: Record<SentimentType, string>;
    specialOffer: {
        title: string;
        details: string;
        cta: string;
    };
}

export const CULTURE_MATRIX: Record<CultureType, CultureConfig> = {
    'DACH': {
        priority: ['Precision', 'Certifications', 'Termine', 'Expertise'],
        tone: 'Highly formal (Sie), data-driven, and punctual. Avoid excessive emojis.',
        sentimentOverrides: {
            'Anxious': 'Provide detailed medical evidence and safety certifications immediately.',
            'Decisive': 'Direct to booking / available slots without fluff.',
            'Demanding': 'Maintain high professionalism, cite clinic protocols and data.',
            'Neutral': 'Standard professional efficiency.'
        },
        specialOffer: {
            title: 'TÜV Certified Safety Package',
            details: 'Includes German-standard post-op care kit and 10-year success guarantee.',
            cta: 'View German Certs'
        }
    },
    'UK/IE': {
        priority: ['Value', 'Trust', 'Straight-talk', 'Comfort'],
        tone: 'Friendly but direct. Use "British English" spelling. Polite but clear.',
        sentimentOverrides: {
            'Anxious': 'Focus on "Comfort" and "Peace of Mind". Shared patient stories.',
            'Decisive': 'Focus on "Price/Value" and "Next Steps".',
            'Demanding': 'Be firm but helpful. Focus on the "All-inclusive" convenience.',
            'Neutral': 'Polite and informative.'
        },
        specialOffer: {
            title: 'London-VIP Concierge',
            details: 'Includes direct WhatsApp line to a UK-based care coordinator.',
            cta: 'Chat with Coordinator'
        }
    },
    'Europe': {
        priority: ['Safety', 'GDPR', 'Transparency'],
        tone: 'Professional, reliable, and efficient.',
        specialOffer: {
            title: 'Gold Standard Safety Package',
            details: 'Includes lifetime warranty and full insurance coverage.',
            cta: 'View Certifications'
        }
    },
    'Middle East': {
        priority: ['Luxury', 'Hospitality', 'VIP Support', 'Family Honor', 'Religious Sensitivity'],
        tone: 'Highly formal, warm, and poetic. Use "Sayyidi" or "Afandi" appropriately. Focus on the clinic as a "Second Home".',
        sentimentOverrides: {
            'Anxious': 'Assure them with "InshaAllah" for successful outcomes (culturally expected) and focus on 24/7 personal dedicated assistants who handle everything.',
            'Decisive': 'Direct them to the "Platinum Royal Suite" – focus on privacy, private transport, and elite surgical teams.',
            'Demanding': 'Exaggerated hospitality: "Your comfort is our command." Offer immediate VIP consultation with the Chief Surgeon.',
            'Neutral': 'Warm, expansive, and welcoming. Focus on the long-term relationship.'
        },
        specialOffer: {
            title: 'Royal VIP Suite Experience',
            details: 'Includes a private 5-star villa, dedicated GCC-certified translator, and 24/7 personal chauffeur.',
            cta: 'Claim Your VIP Status'
        }
    },
    'Global': {
        priority: ['Tech', 'Results', 'Efficiency'],
        tone: 'Fast, energetic, and tech-forward.',
        specialOffer: {
            title: '2026 Innovation Access',
            details: 'Early access to robot-assisted surgical diagnostics.',
            cta: 'See Results'
        }
    },
    'Turkey': {
        priority: ['Trust', 'Family Values', 'Personal Care', 'Hospitality'],
        tone: 'Samimi, misafirperver, "Abicim/Ablacım" dengesinde ama profesyonel. Güven odaklı.',
        sentimentOverrides: {
            'Anxious': 'Empatik yaklaşım: "Bize emanetsiniz." Süreci bir aile ortamı sıcaklığında anlatma.',
            'Decisive': 'Net ve hızlı aksiyon: "Hemen yerinizi ayıralım." VIP transfer detayları.',
            'Demanding': 'Nezaketten ödün vermeden çözüm odaklılık: "Size en iyi hizmeti sunmak görevimiz."',
            'Neutral': 'Nazik, yol gösterici ve bilgilendirici.'
        },
        specialOffer: {
            title: 'Huzur ve Güven Paketi',
            details: 'Özel sağlık danışmanlığı, 7/24 şahsi asistan ve havaalanı-otel VIP transfer.',
            cta: 'Sıcak Bir Başlangıç Yap'
        }
    }
};

export const getCultureConfig = (culture: string): CultureConfig => {
    return CULTURE_MATRIX[culture as CultureType] || CULTURE_MATRIX['Global'];
};

/**
 * Neural Sentiment Adapter
 * Injects sentiment-aware instructions into the prompt context.
 */
export const getSentimentInstruction = (culture: string, sentiment: SentimentType = 'Neutral'): string => {
    const config = getCultureConfig(culture);
    if (config.sentimentOverrides && config.sentimentOverrides[sentiment]) {
        return `\n[CULTURAL SENTIMENT ADAPTATION]: ${config.sentimentOverrides[sentiment]}`;
    }
    return '';
};
