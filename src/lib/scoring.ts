/**
 * Aura Neural Lead Scoring Engine v2.0
 * Calculates "The Closer" probability based on intent and revenue potential.
 */

export type LeadScoreRank = 'S' | 'A' | 'B' | 'C';

export interface ScoreResult {
    score: number;
    rank: LeadScoreRank;
    reasons: string[];
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

const INTENT_KEYWORDS = [
    { words: ['fiyat', 'ne kadar', 'price', 'cost', 'how much', 'euro', 'dolar', '€', '$'], points: 15, reason: 'Budget discussion started' },
    { words: ['randevu', 'appointment', 'ne zaman', 'when', 'müsait'], points: 20, reason: 'Urgency / Timing mention' },
    { words: ['fotoğraf', 'photo', 'resim', 'ekli', 'attım'], points: 25, reason: 'Direct diagnostic data shared' },
    { words: ['karar', 'kesin', 'istiyorum', 'ready'], points: 30, reason: 'High decision intent' }
];

/**
 * Neural Scoring Matrix v2
 */
export const calculateLeadScore = (lead: {
    message?: string;
    treatment: string;
    culture?: string;
    hasMedicalReport?: boolean;
    budgetMentioned?: boolean;
    phoneRegion?: string;
    isReferral?: boolean;
}): ScoreResult => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Treatment Base (0-40)
    const treatmentBase = TREATMENT_VALUES[lead.treatment as keyof typeof TREATMENT_VALUES] || 30;
    score += (treatmentBase * 0.5); // Weight 50%
    if (treatmentBase >= 50) reasons.push('High-revenue potential treatment');

    // 2. Intent Analysis (Sales Sniffing)
    if (lead.message) {
        INTENT_KEYWORDS.forEach(intent => {
            if (intent.words.some(word => lead.message?.toLowerCase().includes(word))) {
                score += intent.points;
                reasons.push(intent.reason);
            }
        });
    }

    // 3. Document / Referral Bonus
    if (lead.hasMedicalReport) {
        score += 20;
        reasons.push('Medical assessment data provided');
    }
    if (lead.isReferral) {
        score += 15;
        reasons.push('Referral trust bond detected');
    }

    // 4. Cultural Bonus (Simplified for 3.0 Logic)
    if (lead.culture === 'UK' || lead.culture === 'USA' || lead.culture === 'Europe') {
        score += 10;
        reasons.push('Tier-1 market location');
    }

    // Cap and Rank
    score = Math.min(Math.round(score), 100);

    let rank: LeadScoreRank = 'C';
    if (score >= 90) rank = 'S';
    else if (score >= 70) rank = 'A';
    else if (score >= 40) rank = 'B';

    return { score, rank, reasons };
};

export const getRankColor = (rank: LeadScoreRank): string => {
    switch (rank) {
        case 'S': return '#FFD700'; // GOLD
        case 'A': return '#FF4D4D'; // RED
        case 'B': return '#FFA500'; // ORANGE
        default: return '#A0A0A0';  // GREY
    }
};
