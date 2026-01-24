/**
 * Aura WhatsApp Bridge v1.0
 * Handles two-way communication between Aura AI and WhatsApp via Twilio.
 */

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

export interface WhatsAppMessage {
    to: string;
    body: string;
    mediaUrl?: string;
}

export const sendWhatsAppMessage = async (msg: WhatsAppMessage): Promise<{ success: boolean; sid?: string; error?: string }> => {
    try {
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
            console.warn('[WhatsApp] Twilio credentials missing. Simulating send.');
            return { success: true, sid: `sim_msg_${Date.now()}` };
        }

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                To: msg.to.startsWith('whatsapp:') ? msg.to : `whatsapp:${msg.to}`,
                From: TWILIO_WHATSAPP_NUMBER,
                Body: msg.body,
                ...(msg.mediaUrl && { MediaUrl: msg.mediaUrl })
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Twilio API Error');
        }

        return { success: true, sid: data.sid };
    } catch (error: any) {
        console.error('[WhatsApp] Failed to send message:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Sends an urgent notification to the medical staff.
 */
export const notifyStaff = async (staffPhone: string, patientName: string, detail: string) => {
    return sendWhatsAppMessage({
        to: staffPhone,
        body: `🚨 *AURA UYARI*: ${patientName} için yeni bir tıbbi analiz başlattı.\nDetay: ${detail}`
    });
};
