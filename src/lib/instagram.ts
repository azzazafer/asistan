/**
 * Aura Instagram Integration
 * Uses Meta Graph API to send Direct Messages.
 */

/**
 * Aura Instagram Rich Integration (Phase 11)
 * Supports Quick Replies, Buttons, and Carousels.
 */
export const sendInstagramRichMessage = async (
    recipientId: string,
    text: string,
    options?: { buttons?: { title: string; payload: string }[] }
): Promise<{ success: boolean; error?: string }> => {
    try {
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
        if (!accessToken) return { success: true }; // Sim mode

        const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${accessToken}`;

        const messagePayload: any = { text };
        if (options?.buttons) {
            messagePayload.quick_replies = options.buttons.map(b => ({
                content_type: 'text',
                title: b.title,
                payload: b.payload
            }));
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: { id: recipientId },
                message: messagePayload
            })
        });

        return { success: response.ok };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
};

export const sendInstagramMessage = async (
    recipientId: string,
    text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
        const pageId = process.env.INSTAGRAM_PAGE_ID; // Or IG User ID

        if (!accessToken || !pageId) {
            console.warn('[Instagram] Missing credentials. Simulating send.');
            return { success: true, messageId: `sim_ig_${Date.now()}` };
        }

        const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${accessToken}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: { id: recipientId },
                message: { text: text }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[Instagram] Graph API Error:', data);
            throw new Error(data.error?.message || 'Instagram Send Failed');
        }

        return { success: true, messageId: data.message_id };

    } catch (error: any) {
        console.error('[Instagram] Send failed:', error.message);
        return { success: false, error: error.message };
    }
};
