import { getCultureConfig, CultureType } from './culture-matrix';
import { supabase } from './db';

/**
 * Aura WhatsApp & SMS Integration - Twilio
 * Handles patient communication via WhatsApp and SMS
 */

// ============================================
// TYPES
// ============================================
// ============================================
// STAFF NOTIFICATIONS
// ============================================
export const notifyStaff = async (to: string, patientId: string, message: string) => {
    return sendWhatsAppMessage(to, message, patientId);
};

export type MessageChannel = 'whatsapp' | 'sms' | 'email';

export interface MessageTemplate {
    id: string;
    name: string;
    channel: MessageChannel;
    content: Record<string, string>; // Language -> Content
    variables: string[];
}

export interface OutgoingMessage {
    id: string;
    channel: MessageChannel;
    to: string;
    from: string;
    body: string;
    status: 'queued' | 'sent' | 'delivered' | 'failed';
    createdAt: string;
    patientId?: string;
}

export interface IncomingMessage {
    id: string;
    channel: MessageChannel;
    from: string;
    to: string;
    body: string;
    receivedAt: string;
    patientId?: string;
}

// ============================================
// MESSAGE TEMPLATES (Multi-language)
// ============================================
export const MESSAGE_TEMPLATES: MessageTemplate[] = [
    {
        id: 'appointment_confirmation',
        name: 'Appointment Confirmation',
        channel: 'whatsapp',
        content: {
            tr: 'Merhaba {{name}}, {{date}} tarihli {{treatment}} randevunuz onaylanmıştır. Kapora: {{deposit}}. Sorularınız için yanıtlayın.',
            en: 'Hello {{name}}, your {{treatment}} appointment on {{date}} is confirmed. Deposit: {{deposit}}. Reply for questions.',
            ar: 'مرحباً {{name}}، تم تأكيد موعدك لـ {{treatment}} في {{date}}. العربون: {{deposit}}. رد للاستفسارات.',
            de: 'Hallo {{name}}, Ihr {{treatment}}-Termin am {{date}} ist bestätigt. Anzahlung: {{deposit}}. Antworten Sie bei Fragen.',
        },
        variables: ['name', 'date', 'treatment', 'deposit']
    },
    {
        id: 'appointment_reminder',
        name: 'Appointment Reminder',
        channel: 'whatsapp',
        content: {
            tr: 'Hatırlatma: {{name}}, yarın saat {{time}} için {{treatment}} randevunuz var. Hazır mısınız?',
            en: 'Reminder: {{name}}, you have a {{treatment}} appointment tomorrow at {{time}}. Are you ready?',
            ar: 'تذكير: {{name}}، لديك موعد {{treatment}} غداً الساعة {{time}}. هل أنت مستعد؟',
            de: 'Erinnerung: {{name}}, Sie haben morgen um {{time}} einen {{treatment}}-Termin. Sind Sie bereit?',
        },
        variables: ['name', 'time', 'treatment']
    },
    {
        id: 'payment_received',
        name: 'Payment Received',
        channel: 'whatsapp',
        content: {
            tr: 'Ödemeniz alındı! {{amount}} {{currency}} başarıyla işlendi. Teşekkürler {{name}}.',
            en: 'Payment received! {{amount}} {{currency}} processed successfully. Thank you {{name}}.',
            ar: 'تم استلام الدفع! تمت معالجة {{amount}} {{currency}} بنجاح. شكراً {{name}}.',
            de: 'Zahlung erhalten! {{amount}} {{currency}} erfolgreich verarbeitet. Danke {{name}}.',
        },
        variables: ['name', 'amount', 'currency']
    },
    {
        id: 'welcome_new_patient',
        name: 'Welcome New Patient',
        channel: 'whatsapp',
        content: {
            tr: 'Aura Health\'e hoş geldiniz {{name}}! Size nasıl yardımcı olabilirim? Tedavi seçenekleri, fiyatlar veya randevu için bana yazabilirsiniz.',
            en: 'Welcome to Aura Health {{name}}! How can I help you? Feel free to ask about treatments, prices, or appointments.',
            ar: 'مرحباً بك في Aura Health يا {{name}}! كيف يمكنني مساعدتك؟ اسأل عن العلاجات أو الأسعار أو المواعيد.',
            de: 'Willkommen bei Aura Health {{name}}! Wie kann ich Ihnen helfen? Fragen Sie nach Behandlungen, Preisen oder Terminen.',
        },
        variables: ['name']
    },
    {
        id: 'otp_verification',
        name: 'OTP Verification',
        channel: 'sms',
        content: {
            tr: 'Aura Health doğrulama kodunuz: {{otp}}. 5 dakika içinde geçerlidir.',
            en: 'Your Aura Health verification code: {{otp}}. Valid for 5 minutes.',
            ar: 'رمز التحقق الخاص بك من Aura Health: {{otp}}. صالح لمدة 5 دقائق.',
            de: 'Ihr Aura Health Bestätigungscode: {{otp}}. Gültig für 5 Minuten.',
        },
        variables: ['otp']
    },
    {
        id: 'payment_failed',
        name: 'Payment Failed',
        channel: 'whatsapp',
        content: {
            tr: 'Ödeme başarısız oldu {{name}}, ancak endişelenmeyin. Randevu slotunuzu 1 saat daha tutuyoruz. Tekrar deneyin: {{link}}. Yardım için buradayım.',
            en: 'Payment failed {{name}}, but do not worry. We are holding your slot for 1 hour. Try again: {{link}}. I am here to help.',
            ar: 'فشل الدفع يا {{name}}، ولكن لا تقلق. نحن نحتفظ بموعدك لمدة ساعة. حاول مرة أخرى: {{link}}. أنا هنا للمساعدة.',
            de: 'Zahlung fehlgeschlagen {{name}}, aber keine Sorge. Wir halten Ihren Termin für 1 Stunde. Versuchen Sie es erneut: {{link}}.',
        },
        variables: ['name', 'link']
    }
];

// ============================================
// MESSAGE STORAGE (REMOVED LOCAL ARRAYS)
// ============================================

// ============================================
// TWILIO INTEGRATION (Simulated)
// ============================================
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

/**
 * Staff Notification with Failover Logic (Phase 10)
 * If the primary agent is unavailable, escalates to the clinical manager.
 */
export const notifyStaffWithFailover = async (leadId: string, message: string) => {
    const primaryAgent = "+905000000000"; // Ahmet Bey
    const secondaryManager = "+905111111111"; // Clinical Manager

    console.log(`[Failover] Alerting Primary Agent: ${primaryAgent}`);
    const result = await sendWhatsAppMessage(primaryAgent, `[AURA ALERT]: ${message}`);

    if (!result.success) {
        console.warn(`[Failover] Primary Agent unreachable. Escalating to Manager: ${secondaryManager}`);
        await sendWhatsAppMessage(secondaryManager, `[ESCALATION ALERT - ${leadId}]: ${message}\n(Primary Agent failed to receive signal)`);
    }
};

export const sendWhatsAppMessage = async (
    to: string,
    body: string,
    patientId?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

        // Debug Log (Temporary)
        console.log(`[WhatsApp] Attempting send. Has SID: ${!!accountSid}, Has Token: ${!!authToken}`);

        if (!accountSid || !authToken) {
            console.warn('[WhatsApp] Missing credentials. Simulating send.');
            // Fallback for Dev/Simulation
            await saveMessageToDb({
                patient_id: patientId || to,
                role: 'assistant',
                content: body,
                source: 'whatsapp',
                tenant_id: 'default_clinic'
            });
            return { success: true, messageId: `sim_${Date.now()}` };
        }

        // REAL SEND
        const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        const formData = new URLSearchParams();
        formData.append('To', to.startsWith('whatsapp:') ? to : `whatsapp:${to}`);
        formData.append('From', fromNumber);
        formData.append('Body', body);

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[WhatsApp] Twilio Error:', data);
            throw new Error(data.message || 'Twilio Request Failed');
        }

        await saveMessageToDb({
            patient_id: patientId || to,
            role: 'assistant',
            content: body,
            source: 'whatsapp',
            tenant_id: 'default_clinic'
        });

        console.log(`[WhatsApp] Sent REAL message to ${to}`);
        return { success: true, messageId: data.sid };

    } catch (error: any) {
        console.error('[WhatsApp] Send failed:', error.message);
        return { success: false, error: error.message };
    }
};

export const sendWhatsAppVoice = async (
    to: string,
    mediaUrl: string,
    patientId?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

        // Ensure full URL if relative
        const fullMediaUrl = mediaUrl.startsWith('http')
            ? mediaUrl
            : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${mediaUrl}`;

        console.log(`[WhatsApp] Sending Voice to ${to}: ${fullMediaUrl}`);

        if (!accountSid || !authToken) {
            console.warn('[WhatsApp] Missing credentials. Simulating voice send.');
            await saveMessageToDb({
                patient_id: patientId || to,
                role: 'assistant',
                content: `[Voice Message]: ${fullMediaUrl}`,
                source: 'whatsapp',
                tenant_id: 'default_clinic'
            });
            return { success: true, messageId: `sim_voice_${Date.now()}` };
        }

        const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        const formData = new URLSearchParams();
        formData.append('To', to.startsWith('whatsapp:') ? to : `whatsapp:${to}`);
        formData.append('From', fromNumber);
        formData.append('MediaUrl', fullMediaUrl);

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[WhatsApp] Twilio Voice Error:', data);
            throw new Error(data.message || 'Twilio Voice Request Failed');
        }

        console.log(`[WhatsApp] Sent REAL voice message to ${to}`);
        return { success: true, messageId: data.sid };

    } catch (error: any) {
        console.error('[WhatsApp] Voice Send failed:', error.message);
        return { success: false, error: error.message };
    }
};

export const sendSMS = async (
    to: string,
    body: string,
    patientId?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_SMS_NUMBER || '+15005550006';

        console.log(`[SMS] Sending to ${to}: ${body.substring(0, 50)}...`);

        if (!accountSid || !authToken) {
            console.warn('[SMS] Missing credentials. Simulating send.');
            await saveMessageToDb({
                patient_id: patientId || to,
                role: 'assistant',
                content: body,
                source: 'sms',
                tenant_id: 'default_clinic'
            });
            return { success: true, messageId: `sim_sms_${Date.now()}` };
        }

        // REAL SEND
        const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        const formData = new URLSearchParams();
        formData.append('To', to);
        formData.append('From', fromNumber);
        formData.append('Body', body);

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[SMS] Twilio Error:', data);
            throw new Error(data.message || 'Twilio SMS Request Failed');
        }

        await saveMessageToDb({
            patient_id: patientId || to,
            role: 'assistant',
            content: body,
            source: 'sms',
            tenant_id: 'default_clinic'
        });

        console.log(`[SMS] Sent REAL message to ${to}`);
        return { success: true, messageId: data.sid };

    } catch (error: any) {
        console.error('[SMS] Send failed:', error.message);
        return { success: false, error: error.message };
    }
};

// ============================================
// TEMPLATE PROCESSOR
// ============================================
export const processTemplate = (
    templateId: string,
    language: string,
    variables: Record<string, string>
): string | null => {
    const template = MESSAGE_TEMPLATES.find(t => t.id === templateId);

    if (!template) {
        console.error(`[Template] Template not found: ${templateId}`);
        return null;
    }

    let content = template.content[language] || template.content['en'];

    for (const [key, value] of Object.entries(variables)) {
        content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    }

    return content;
};

export const sendTemplateMessage = async (
    channel: MessageChannel,
    to: string,
    templateId: string,
    language: string,
    variables: Record<string, string>,
    patientId?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    const body = processTemplate(templateId, language, variables);

    if (!body) {
        return { success: false, error: 'Template not found or invalid' };
    }

    if (channel === 'whatsapp') {
        return sendWhatsAppMessage(to, body, patientId);
    } else if (channel === 'sms') {
        return sendSMS(to, body, patientId);
    }

    return { success: false, error: 'Invalid channel' };
};

// ============================================
// OTP GENERATION & VERIFICATION
// ============================================
const otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();

export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (
    phone: string,
    language: string = 'en'
): Promise<{ success: boolean; error?: string }> => {
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(phone, { otp, expiresAt });

    const result = await sendTemplateMessage(
        'sms',
        phone,
        'otp_verification',
        language,
        { otp }
    );

    return { success: result.success, error: result.error };
};

export const verifyOTP = (phone: string, otp: string): boolean => {
    const stored = otpStore.get(phone);

    if (!stored) return false;
    if (Date.now() > stored.expiresAt) {
        otpStore.delete(phone);
        return false;
    }
    if (stored.otp !== otp) return false;

    otpStore.delete(phone);
    return true;
};

// ============================================
// DATABASE PERSISTENCE LAYER
// ============================================
export const saveMessageToDb = async (msg: {
    patient_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    source: string;
    tenant_id: string;
}) => {
    if (!supabase) return;
    await supabase.from('messages').insert(msg);
};

export const fetchHistoryFromDb = async (patientId: string): Promise<any[]> => {
    if (!supabase) return [];
    const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: true });
    return data || [];
};

export const getMessageHistory = async (patientId: string) => {
    const history = await fetchHistoryFromDb(patientId);
    return history.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.created_at
    }));
};

// ============================================
// INCOMING MESSAGE HANDLER (Webhook)
// ============================================
export const handleIncomingMessage = async (message: IncomingMessage, cultureConfig?: any): Promise<void> => {
    console.log(`[Incoming] ${message.channel} from ${message.from}: ${message.body}`);

    // Persist to DB
    await saveMessageToDb({
        patient_id: message.from,
        role: 'user',
        content: message.body,
        source: message.channel,
        tenant_id: 'default_clinic'
    });

    // Trigger AI Orchestration via Bridge
    const { OmnichannelBridge } = await import('./ai/omnichannel');
    await OmnichannelBridge.processIncoming({
        userId: message.from,
        receiverId: message.to,
        content: message.body,
        source: message.channel as any,
        timestamp: message.receivedAt
    });
};
