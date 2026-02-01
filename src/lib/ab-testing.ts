import crypto from 'crypto';

/**
 * A/B Testing Framework for Aura OS
 * Provides deterministic variant assignment based on user ID
 */

export type Variant = 'A' | 'B';

/**
 * Deterministically assigns a user to variant A or B
 * Same user always gets same variant (consistent experience)
 * ~50/50 split across all users
 */
export function getVariant(userId: string, testName: string): Variant {
    // Create hash from userId + testName
    const hash = crypto.createHash('md5')
        .update(userId + testName)
        .digest('hex');

    // Convert first 8 chars to number
    const numericHash = parseInt(hash.substring(0, 8), 16);

    // Even = A, Odd = B
    return numericHash % 2 === 0 ? 'A' : 'B';
}

/**
 * Prompt variants for different tests
 */
export const PromptVariants = {
    // Test: Greeting Tone
    greeting_tone: {
        A: `Professional Clinical Tone:
- Use formal medical terminology
- Emphasize certifications and safety data
- Focus on scientific credibility
- Example: "Our clinic maintains ISO 9001:2015 certification..."`,

        B: `Warm Conversational Tone:
- Use friendly, accessible language
- Emphasize comfort and personal care
- Focus on patient experience stories
- Example: "Patients tell us they feel like family here..."`
    },

    // Test: Urgency Level
    urgency_level: {
        A: `High Urgency:
- Mention limited slots
- Use time-sensitive language
- Example: "Only 3 consultation slots left this week..."`,

        B: `Low Pressure:
- Focus on patient's timeline
- No artificial scarcity
- Example: "We're here when you're ready to take the next step..."`
    }
};

/**
 * Get variant instruction for a specific test
 */
export function getVariantInstruction(userId: string, testName: keyof typeof PromptVariants): string {
    const variant = getVariant(userId, testName);
    return PromptVariants[testName][variant];
}

/**
 * Log variant assignment for analytics
 */
export interface VariantLog {
    userId: string;
    testName: string;
    variant: Variant;
    timestamp: string;
}

export function logVariant(userId: string, testName: string, variant: Variant): VariantLog {
    const log: VariantLog = {
        userId,
        testName,
        variant,
        timestamp: new Date().toISOString()
    };

    console.log(`[A/B Test] User ${userId} assigned to ${testName}:${variant}`);
    return log;
}
