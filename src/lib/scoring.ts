/**
 * Aura Neural Lead Scoring Engine v2.0
 * Calculates "The Closer" probability based on intent and revenue potential.
 */

export type LeadScoreRank = 'S' | 'A' | 'B' | 'C';

export interface BiasAnalysis {
    emotional_fear: number;    // Kahneman System 1 (0-100)
    technical_barrier: number; // Kahneman System 2 (0-100)
}

export interface CialdiniMatrix {
    authority: number;   // 0-100
    reciprocity: number; // 0-100
    scarcity: number;    // 0-100
    social_proof: number;// 0-100
    liking: number;      // 0-100
    consistency: number; // 0-100
}

export interface ScoreResult {
    score: number;
    rank: LeadScoreRank;
    status: 'ACTIVE' | 'GHOSTED' | 'WON' | 'LOST';
    reasons: string[];
    pain_point_vault: string[];
    anchor_value: number;
    bias_analysis: BiasAnalysis;
    cialdini_matrix: CialdiniMatrix;
    suggested_strategy: string;
    next_diagnostic_question: string;
    followup_payload?: string;
    closing_probability: number;
}

const TREATMENT_VALUES: Record<string, number> = {
    'Hair Transplant': 45,
    'Dental Veneers': 40,
    'Dental Implant': 50,
    'Rhinoplasty': 55,
    'Liposuction': 50,
    'Face Lift': 60,
    'Hollywood Smile': 65, // High Value
};

const ANCHOR_MAP: Record<string, number> = {
    'Hair Transplant': 3000,
    'Dental Veneers': 4000,
    'Dental Implant': 2500,
    'Rhinoplasty': 7000,
    'Liposuction': 6000,
    'Face Lift': 8500,
    'Hollywood Smile': 10000,
};

const VALIDATION_BRIDGES = [
    "Fiyat konusundaki hassasiyetinizi anlıyorum...",
    "Maliyet yönetimi elbette önceliğiniz...",
    "Bütçe dengesini gözetmenizi takdir ediyorum..."
];

const SUCCESS_STORIES = [
    { treatment: 'Hair Transplant', culture: 'UK', story: "London-based entrepreneur recovered his hairline and 100% confidence in 6 months." },
    { treatment: 'Dental Veneers', culture: 'Europe', story: "German executive achieved a perfect smile with zero operational downtime." },
    { treatment: 'Rhinoplasty', culture: 'USA', story: "NYC influencer resolved breathing issues while achieving aesthetic symmetry." },
    { treatment: 'Hollywood Smile', culture: 'Europe', story: "Parisian model secured 3 international contracts after her smile transformation." },
    { treatment: 'Hair Transplant', culture: 'Europe', story: "Berlin tech lead stopped hair loss and establishment social proof in his network." }
];

const INTENT_KEYWORDS = [
    { words: ['fiyat', 'ne kadar', 'price', 'cost', 'how much', 'euro', 'dolar', '€', '$'], points: 15, reason: 'Budget discussion started' },
    { words: ['randevu', 'appointment', 'ne zaman', 'when', 'müsait'], points: 20, reason: 'Urgency / Timing mention' },
    { words: ['fotoğraf', 'photo', 'resim', 'ekli', 'attım'], points: 25, reason: 'Direct diagnostic data shared' },
    { words: ['karar', 'kesin', 'istiyorum', 'ready'], points: 30, reason: 'High decision intent' }
];

const NEGATIVE_KEYWORDS = [
    { words: ['merak', 'just curious', 'sadece sordum', 'arkadaşım', 'maybe later', 'sonra'], points: -15, reason: 'Low commitment / Tire kicking' },
    { words: ['istemiyorum', 'iptal', 'vazgeçtim', 'no', 'stop'], points: -30, reason: 'Active rejection' }
];

const PAIN_POINT_INDICATORS = [
    { words: ['ağrı', 'pain', 'korku', 'fear', 'mutsuz', 'unhappy', 'özgüven', 'confidence', 'kötü', 'bad', 'sorun', 'problem'], category: 'Emotional' },
    { words: ['hızlı', 'fast', 'hemen', 'urgent', 'acil'], category: 'Operational' },
    { words: ['başarısız', 'failed', 'daha önce', 'before', 'tekrar', 'again'], category: 'Past Trauma' }
];


/**
 * Neural Scoring Matrix v2
 */
export const calculateLeadScore = (
    lead: {
        message?: string;
        treatment: string;
        culture?: string;
        hasMedicalReport?: boolean;
        budgetMentioned?: boolean;
        phoneRegion?: string;
        isReferral?: boolean;
        lastActivityTimestamp?: number;
    },
    previous_state?: ScoreResult
): ScoreResult => {
    let score = 0;
    const reasons: string[] = previous_state ? [...previous_state.reasons] : [];

    // Memory Extraction (Pain Point Vault)
    const current_pain_points: string[] = [];

    // State Persistence Logic
    let anchor_value = previous_state?.anchor_value || 0;

    // Initial Neural State or Carry Over
    const current_bias: BiasAnalysis = { emotional_fear: 0, technical_barrier: 0 };
    const current_cialdini: CialdiniMatrix = {
        authority: 30, reciprocity: 20, scarcity: 10, social_proof: 40, liking: 50, consistency: 20
    };

    // 1. Treatment Base (0-40)
    const treatmentBase = TREATMENT_VALUES[lead.treatment as keyof typeof TREATMENT_VALUES] || 30;
    score += (treatmentBase * 0.5); // Weight 50%
    if (treatmentBase >= 50) {
        if (!reasons.includes('High-revenue potential treatment')) reasons.push('High-revenue potential treatment');
        current_cialdini.scarcity += 15;
    }

    // 2. Neural Intent & Pain Point Extraction
    if (lead.message) {
        const lowerMsg = lead.message.toLowerCase();

        // Pain Point Vault Extraction
        PAIN_POINT_INDICATORS.forEach(indicator => {
            if (indicator.words.some(word => lowerMsg.includes(word))) {
                const foundWord = indicator.words.find(w => lowerMsg.includes(w));
                current_pain_points.push(`${indicator.category}: ${foundWord}`);
                current_bias.emotional_fear += 10;
            }
        });

        // Positive Intent & Anchoring
        INTENT_KEYWORDS.forEach(intent => {
            if (intent.words.some(word => lowerMsg.includes(word))) {
                score += intent.points;
                if (!reasons.includes(intent.reason)) reasons.push(intent.reason);

                // If price related, set anchor ONLY if not already set
                if (intent.reason === 'Budget discussion started' && anchor_value === 0) {
                    anchor_value = ANCHOR_MAP[lead.treatment] || 5000; // Dynamic loss/opportunity cost anchor
                    reasons.push('Neural Anchoring: Sector-specific loss cost established');
                }
            }
        });

        // Price Resistance Logic (Emotional Fear Shift)
        if (lowerMsg.includes('pahalı') || lowerMsg.includes('expensive')) {
            current_bias.emotional_fear += 25;
            if (!reasons.includes('Price resistance detected: Switch to anchoring strategy')) {
                reasons.push('Price resistance detected: Switch to anchoring strategy');
            }
            current_cialdini.scarcity += 20;
        }

        // Negative Intent
        NEGATIVE_KEYWORDS.forEach(neg => {
            if (neg.words.some(word => lowerMsg.includes(word))) {
                score += neg.points;
                if (!reasons.includes(neg.reason)) reasons.push(neg.reason);
            }
        });
    }

    // 3. Document / Referral Bonus
    if (lead.hasMedicalReport) {
        score += 20;
        if (!reasons.includes('Medical assessment data provided')) reasons.push('Medical assessment data provided');
        current_cialdini.authority += 25;
        current_bias.technical_barrier -= 15;
    }
    if (lead.isReferral) {
        score += 15;
        if (!reasons.includes('Referral trust bond detected')) reasons.push('Referral trust bond detected');
        current_cialdini.social_proof += 30;
        current_cialdini.liking += 20;
    }

    // 4. Cultural Bonus
    if (lead.culture === 'UK' || lead.culture === 'USA' || lead.culture === 'Europe') {
        score += 10;
        reasons.push('Tier-1 market location');
    }

    // 5. Memory Merging & Weighted Moving Average (70/30)
    const merged_pain_points = Array.from(new Set([
        ...(previous_state?.pain_point_vault || []),
        ...current_pain_points
    ]));

    const merged_bias: BiasAnalysis = previous_state ? {
        emotional_fear: Math.round((previous_state.bias_analysis.emotional_fear * 0.7) + (current_bias.emotional_fear * 0.3)),
        technical_barrier: Math.round((previous_state.bias_analysis.technical_barrier * 0.7) + (current_bias.technical_barrier * 0.3))
    } : current_bias;

    const merged_cialdini: CialdiniMatrix = previous_state ? {
        authority: Math.round((previous_state.cialdini_matrix.authority * 0.7) + (current_cialdini.authority * 0.3)),
        reciprocity: Math.round((previous_state.cialdini_matrix.reciprocity * 0.7) + (current_cialdini.reciprocity * 0.3)),
        scarcity: Math.round((previous_state.cialdini_matrix.scarcity * 0.7) + (current_cialdini.scarcity * 0.3)),
        social_proof: Math.round((previous_state.cialdini_matrix.social_proof * 0.7) + (current_cialdini.social_proof * 0.3)),
        liking: Math.round((previous_state.cialdini_matrix.liking * 0.7) + (current_cialdini.liking * 0.3)),
        consistency: Math.round((previous_state.cialdini_matrix.consistency * 0.7) + (current_cialdini.consistency * 0.3))
    } : current_cialdini;

    // 6. Cap and Rank (Refactored with Pain Point Coefficient)
    // Bonus for depth of diagnostics
    score += (merged_pain_points.length * 5);
    score = Math.min(Math.round(score), 100);

    let rank: LeadScoreRank = 'C';
    // 'S' Rank requires at least 3 verified pain points ("bullets")
    if (score >= 90 && merged_pain_points.length >= 3) rank = 'S';
    else if (score >= 70) rank = 'A';
    else if (score >= 40) rank = 'B';

    // 7. Ghosting & Probability Engine (Layer 5)
    let status: 'ACTIVE' | 'GHOSTED' | 'WON' | 'LOST' = 'ACTIVE';
    const GHOSTING_THRESHOLD = 48 * 60 * 60 * 1000; // 48 Hours
    if (lead.lastActivityTimestamp && (Date.now() - lead.lastActivityTimestamp > GHOSTING_THRESHOLD)) {
        status = 'GHOSTED';
        reasons.push('Lead transition to GHOSTED status (48h inactivity)');
    }

    // Closing Probability Formula: (Pain Point Count * Authority Score) / Technical Barrier
    const technicalInv = Math.max(1, (100 - merged_bias.technical_barrier)); // Invert barrier for positive correlation
    const rawProb = (merged_pain_points.length * merged_cialdini.authority) / Math.max(1, merged_bias.technical_barrier);
    const closing_probability = Math.min(99, Math.round(rawProb));

    // 8. Strategy Engine (Diagnostic, Socratic, Kahneman & Cialdini Logic)
    let suggested_strategy = '';
    let next_diagnostic_question = '';
    const hasPriceResistance = lead.message?.toLowerCase().includes('pahalı') || lead.message?.toLowerCase().includes('expensive');

    // CIALDINI 1: Reciprocity Trigger (The "Unfair Advantage" gift)
    const isFirstInteraction = !previous_state;
    const reciprocityGift = isFirstInteraction ? "URGENT VALUE: Sizin durumunuzdaki benzer 50 vakanın %80'inin yaptığı kritik hata, operasyonel hızı yanlış önceliklendirmekti. Size bu konuda özel bir yol haritası hazırladım. | " : "";

    // CIALDINI 2: Mirror Social Proof (Liking & Social Proof)
    const relevantStories = SUCCESS_STORIES
        .filter(s => s.treatment === lead.treatment || s.culture === lead.culture)
        .slice(0, 3)
        .map(s => `(${s.story})`)
        .join(' ');

    // CIALDINI 3: Scarcity Logic (Rational Urgency)
    const scarcityFrame = "NOTICE: Bu verimlilik analizi ve çözüm seti verileriniz dinamik olduğu için 48 saat geçerlidir.";

    // Logic Rules
    const isUnderDiagnosticThreshold = merged_pain_points.length < 3;
    const needsConsistencyCheck = (previous_state?.cialdini_matrix.consistency || 0) < 50;

    if (isUnderDiagnosticThreshold) {
        suggested_strategy = 'DIAGNOSTIC PROBING: Insufficient pain points. Dig deeper.';
        next_diagnostic_question = 'Besides the obvious, what is the #1 way this situation is affecting your business?';
    } else {
        switch (rank) {
            case 'S':
                suggested_strategy = 'DIRECT CLOSE: High intent achieved. Focus on loss aversion.';
                next_diagnostic_question = 'Shall we finalize the booking for next week to stop this issue or wait?';
                break;
            case 'A':
                suggested_strategy = 'SOCIAL PROOF: Validate with case studies.';
                next_diagnostic_question = 'Would you like to see how we solved this for someone in a similar position?';
                break;
            case 'B':
                suggested_strategy = 'AUTHORITY STRENGTHENING: Reduce technical barriers.';
                next_diagnostic_question = 'Would it help if I sent you our success protocol?';
                break;
            default:
                suggested_strategy = 'DIAGNOSTIC DEEPENING: Map operational impacts.';
                next_diagnostic_question = 'How long have you been looking for a solution?';
        }
    }

    // --- KAHNEMAN ENHANCEMENTS ---

    // 1. Loss Aversion Framing
    if (merged_pain_points.length > 0 && anchor_value > 0) {
        const primaryPain = merged_pain_points[0].split(': ')[1];
        const lossFrame = `LOSS AVERSION: Remind them that every day without Aura OS, they lose roughly $${anchor_value} due to ${primaryPain}.`;
        suggested_strategy = `${lossFrame} | ${suggested_strategy}`;
    }

    // 2. Substitution Effect (Difficulty matching)
    if (hasPriceResistance) {
        suggested_strategy = `SUBSTITUTION: Switching to easy Socratic question to bypass price barrier.`;
        const randomBridge = VALIDATION_BRIDGES[Math.floor(Math.random() * VALIDATION_BRIDGES.length)];
        next_diagnostic_question = `${randomBridge} Is improving your business performance a priority for you right now?`;
    } else if (needsConsistencyCheck && rank !== 'S') {
        suggested_strategy = `SOCRATIC PROMPTING: Building YES-sequence.`;
        next_diagnostic_question = 'Do you agree that solving this issue is a priority?';
    }

    // 3. Cognitive Ease & Value-Language Filter (System 1 Optimization)
    const applyValueFraming = (text: string) => {
        const jargonMap: Record<string, string> = {
            'api': 'verimlilik artışı',
            'entegrasyon': 'süreç kontrolü',
            'dashboard': 'anlık takip paneli',
            'sistem': 'çözüm mekanizması',
            'yazılım': 'dijital asistan',
            'technical': 'operasyonel'
        };

        let framedText = text.toLowerCase();
        Object.keys(jargonMap).forEach(key => {
            framedText = framedText.replace(new RegExp(key, 'g'), jargonMap[key]);
        });

        // Restore sentence casing roughly
        return framedText.charAt(0).toUpperCase() + framedText.slice(1);
    };

    const simplifyForSystem1 = (text: string) => {
        const framed = applyValueFraming(text);
        const words = framed.split(' ');
        if (words.length > 15) {
            return words.slice(0, 12).join(' ') + '... Süreci hemen başlatalım.';
        }
        return framed;
    };

    next_diagnostic_question = simplifyForSystem1(next_diagnostic_question);

    // Final Strategy Assembly with Cialdini Protocol
    suggested_strategy = applyValueFraming(suggested_strategy);
    suggested_strategy = `${reciprocityGift}${suggested_strategy} | SOCIAL PROOF: ${relevantStories} | ${scarcityFrame}`;

    // 9. Follow-up Payload Generator (Pusu ve Takip)
    let followup_payload = '';
    if (status === 'GHOSTED' || closing_probability < 50) {
        const deepPain = merged_pain_points.find(p => p.startsWith('Past Trauma') || p.startsWith('Emotional'))
            || merged_pain_points[0] || 'mevcut durumunuz';
        const painValue = deepPain.includes(':') ? deepPain.split(': ')[1] : deepPain;

        followup_payload = `Merhaba, geçen görüşmemizde bahsettiğiniz "${painValue}" konusu nedeniyle vaktinizi kaybetmeye devam etmeniz beni profesyonel olarak endişelendiriyor. ` +
            `Süreci ertelemek, şu anki ${anchor_value}$ olan fırsat maliyetinizi her geçen gün artırıyor. Analiz verilerinizin geçerliliğini yitirmesine son 24 saat kalmışken, ` +
            `çözüm mekanizmasını hemen devreye almamızı öneririm. Ne dersiniz?`;

        followup_payload = applyValueFraming(followup_payload);
    }

    return {
        score,
        rank,
        status,
        reasons: Array.from(new Set(reasons)),
        pain_point_vault: merged_pain_points,
        anchor_value,
        bias_analysis: merged_bias,
        cialdini_matrix: merged_cialdini,
        suggested_strategy,
        next_diagnostic_question,
        followup_payload,
        closing_probability
    };
};

export const getRankColor = (rank: LeadScoreRank): string => {
    switch (rank) {
        case 'S': return '#FFD700'; // GOLD
        case 'A': return '#FF4D4D'; // RED
        case 'B': return '#FFA500'; // ORANGE
        default: return '#A0A0A0';  // GREY
    }
};
