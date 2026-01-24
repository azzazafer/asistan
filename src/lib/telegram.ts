/**
 * Aura Telegram Integration
 * Uses Telegram Bot API to send messages.
 */

/**
 * Aura Telegram Rich Integration (Phase 11)
 * Supports Inline Keyboards for high-conversion CTAs.
 */
export const sendTelegramRichMessage = async (
    chatId: string,
    text: string,
    buttons?: { text: string; url?: string; callback_data?: string }[]
): Promise<{ success: boolean; error?: string }> => {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) return { success: true }; // Sim mode

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const payload: any = {
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        };

        if (buttons) {
            payload.reply_markup = {
                inline_keyboard: [buttons.map(b => ({
                    text: b.text,
                    url: b.url,
                    callback_data: b.callback_data
                }))]
            };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        return { success: response.ok };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
};

export const sendTelegramMessage = async (
    chatId: string,
    text: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!botToken) {
            console.warn('[Telegram] Missing Token. Simulating send.');
            return { success: true, messageId: `sim_tg_${Date.now()}` };
        }

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            console.error('[Telegram] API Error:', data);
            throw new Error(data.description || 'Telegram Send Failed');
        }

        return { success: true, messageId: data.result.message_id.toString() };

    } catch (error: any) {
        console.error('[Telegram] Send failed:', error.message);
        return { success: false, error: error.message };
    }
};
