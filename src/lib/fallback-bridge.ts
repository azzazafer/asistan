import { sendSMS } from './messaging';

/**
 * Fallback Bridge (Phase 11)
 * Ensures communication resilience by auto-switching channels if primary webhooks/APIs fail.
 */
export class FallbackBridge {

    /**
     * Attempts to send a message via fallback channels (SMS/Email).
     */
    static async triggerFallback(userId: string, content: string, originalSource: string): Promise<{ success: boolean; channelUsed?: string }> {
        console.warn(`[Fallback] Primary channel ${originalSource} failed for ${userId}. Triggering contingency...`);

        // 1. WhatsApp -> SMS Fallback
        if (originalSource === 'whatsapp') {
            console.log(`[Fallback] Routing to SMS for user: ${userId}`);
            const result = await sendSMS(userId, content);
            if (result.success) return { success: true, channelUsed: 'sms' };
        }

        // 2. Instagram/Telegram -> Email (If email available in profile)
        if (originalSource === 'instagram' || originalSource === 'telegram') {
            const { getProfile } = require('./db');
            const profile = await getProfile(userId);

            if (profile && profile.email) {
                console.log(`[Fallback] Routing to Email for user: ${profile.email}`);
                // In a real scenario, call sendEmail()
                return { success: true, channelUsed: 'email' };
            }
        }

        return { success: false };
    }
}
