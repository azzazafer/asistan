import { openai } from '@/lib/openai';

/**
 * SENTIMENT SAFETY GUARD V4
 * Prevents AI from sending insensitive messages to leads in emotional crisis
 */

interface SentimentAnalysis {
    score: number; // -1 (very negative) to +1 (very positive)
    grief_detected: boolean;
    crisis_keywords: string[];
    emotional_state: 'neutral' | 'positive' | 'negative' | 'crisis';
    recommended_action: 'proceed' | 'delay_3days' | 'abort';
    reasoning: string;
}

/**
 * Keywords that indicate emotional crisis or grief
 */
const GRIEF_KEYWORDS = [
    // Turkish
    'cenaze', 'vefat', 'öldü', 'kaybettik', 'hastane', 'kaza', 'ameliyat',
    'yoğun bakım', 'hasta', 'acil', 'kanser', 'rahatsız', 'üzgün',
    // English
    'funeral', 'died', 'passed away', 'hospital', 'accident', 'surgery',
    'icu', 'emergency', 'cancer', 'sick', 'sad', 'grieving',
    // Arabic
    'جنازة', 'وفاة', 'مات', 'مستشفى', 'حادث', 'عملية'
];

/**
 * Analyze emotional state from recent messages
 */
export async function analyzeSentiment(messages: any[]): Promise<SentimentAnalysis> {
    if (!messages || messages.length === 0) {
        return {
            score: 0,
            grief_detected: false,
            crisis_keywords: [],
            emotional_state: 'neutral',
            recommended_action: 'proceed',
            reasoning: 'No message history available'
        };
    }

    // Get last 3 messages for context
    const lastThree = messages.slice(-3);
    const lastThreeContent = lastThree.map(m => m.content || '').join(' ').toLowerCase();

    // 1. FAST PATH: Keyword Detection
    const detectedKeywords = GRIEF_KEYWORDS.filter(keyword =>
        lastThreeContent.includes(keyword.toLowerCase())
    );

    if (detectedKeywords.length > 0) {
        console.log(`[Sentiment Guard] ⚠️ Crisis keywords detected: ${detectedKeywords.join(', ')}`);
        return {
            score: -0.9,
            grief_detected: true,
            crisis_keywords: detectedKeywords,
            emotional_state: 'crisis',
            recommended_action: 'delay_3days',
            reasoning: `Detected grief/crisis keywords: ${detectedKeywords.join(', ')}`
        };
    }

    // 2. SLOW PATH: AI Analysis (if no keywords found)
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an emotional intelligence analyzer for healthcare conversations.
          
          Analyze the emotional state of the last few messages.
          
          Return JSON format:
          {
            "score": -1 to +1 (emotional valence),
            "is_grieving": boolean,
            "emotional_state": "neutral" | "positive" | "negative" | "crisis",
            "reasoning": "brief explanation"
          }
          
          IMPORTANT: Detect subtle signs of crisis even if not explicitly stated.
          Examples of crisis: mentions of death, serious illness, accidents, hospital stays.`
                },
                {
                    role: 'user',
                    content: JSON.stringify(lastThree.map(m => ({
                        role: m.role,
                        content: m.content
                    })))
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3 // Low temperature for consistent analysis
        });

        const analysis = JSON.parse(response.choices[0].message.content || '{}');

        console.log(`[Sentiment Guard] AI Analysis:`, analysis);

        return {
            score: analysis.score || 0,
            grief_detected: analysis.is_grieving || false,
            crisis_keywords: [],
            emotional_state: analysis.emotional_state || 'neutral',
            recommended_action: analysis.is_grieving ? 'delay_3days' : 'proceed',
            reasoning: analysis.reasoning || 'AI sentiment analysis'
        };

    } catch (error: any) {
        console.error('[Sentiment Guard] AI analysis failed:', error);
        // Fail-safe: If AI fails, proceed cautiously
        return {
            score: 0,
            grief_detected: false,
            crisis_keywords: [],
            emotional_state: 'neutral',
            recommended_action: 'proceed',
            reasoning: 'Analysis failed, defaulting to safe proceed'
        };
    }
}

/**
 * Generate compassionate message for delayed follow-up (3 days later)
 */
export async function generateCompassionateMessage(
    leadName: string,
    language: string = 'tr'
): Promise<string> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `You are Aura, a compassionate healthcare assistant.
        
        The patient (${leadName}) was going through a difficult time (detected grief/crisis).
        It's been 3 days. Write a SHORT, compassionate check-in message.
        
        Language: ${language}
        
        Rules:
        - Be empathetic and professional
        - Don't mention sales or appointments
        - Just ask how they're doing
        - Keep it under 2 sentences
        - Warm but not overly emotional`
            },
            {
                role: 'user',
                content: `Generate compassionate check-in message for ${leadName}`
            }
        ],
        temperature: 0.7
    });

    return response.choices[0].message.content ||
        (language === 'tr'
            ? `${leadName}, nasılsınız? Sizi düşünüyoruz.`
            : `${leadName}, how are you doing? Thinking of you.`);
}

/**
 * Check if lead should receive automated follow-up
 * Returns false if lead is in emotional crisis
 */
export async function shouldSendAutomatedMessage(lead: any): Promise<{
    should_send: boolean;
    reason: string;
    alternative_action?: string;
}> {
    const sentiment = await analyzeSentiment(lead.history || []);

    if (sentiment.recommended_action === 'abort') {
        return {
            should_send: false,
            reason: 'Lead in severe crisis, message aborted',
            alternative_action: 'escalate_to_human'
        };
    }

    if (sentiment.recommended_action === 'delay_3days') {
        return {
            should_send: false,
            reason: `Emotional crisis detected: ${sentiment.reasoning}`,
            alternative_action: 'schedule_compassionate_message_3days'
        };
    }

    return {
        should_send: true,
        reason: 'Sentiment check passed, safe to proceed'
    };
}
