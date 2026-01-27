import { supabase } from '@/lib/supabase-client';
import { AiOrchestrator, AuraResponse } from './orchestrator';
import { transcribeAudio } from '@/lib/openai';
import { sendWhatsAppMessage, sendWhatsAppVoice } from '@/lib/messaging';
import { sendInstagramMessage } from '@/lib/instagram';
import { sendTelegramMessage } from '@/lib/telegram';
import { textToSpeech } from '@/lib/voice/openai-tts';
import { getLeadByPhone, addLead } from '@/lib/leads';
import { getMessageHistory } from '@/lib/messaging';
import { getAgentByCode } from '@/lib/agents';

/**
 * Aura OS Omnichannel Bridge - Version 12.1 [STABLE]
 * Handles routing and normalization for all messaging channels.
 */
export type MessageSource = 'whatsapp' | 'instagram' | 'telegram' | 'web';

export interface NormalizedMessage {
    userId: string;
    receiverId: string;
    content: string;
    mediaUrl?: string; // [NEW] Phase 11 Support
    source: MessageSource;
    timestamp: string;
}

export interface QueuedMessage {
    id: string;
    target: string;
    source: MessageSource;
    content: string;
    attempts: number;
    last_error?: string;
    created_at: string;
}

export class OmnichannelBridge {
    private static retryQueue: QueuedMessage[] = [];
    private static isProcessing = false;

    static async processIncoming(message: NormalizedMessage | null): Promise<AuraResponse | null> {
        if (!message) return null;

        const { TenancyService } = require('@/lib/tenancy');
        const tenantId = await TenancyService.resolveTenantId(message.receiverId, message.source);

        console.log(`[Bridge] Processing ${message.source} from ${message.userId} for tenant ${tenantId}`);

        // [NEW] 0. DEDUPLICATION (Phase 10)
        const { ConflictResolver } = require('./deduplication');
        const primaryIdentity = await ConflictResolver.resolveContact(message.userId, message.source, undefined, undefined);
        if (primaryIdentity && primaryIdentity !== message.userId) {
            console.log(`[Bridge] Linked Identity Detected! Merging ${message.userId} -> ${primaryIdentity}`);
            message.userId = primaryIdentity; // Transparently treat as the same lead
        }

        // 0. VERSION CHECK (DEBUG)
        console.log("[Bridge] VERSION: 2026-01-21-Voice-OpenAI-V2-FORCE");

        // 1. TYPING INDICATOR (Sales Psychology)
        console.log(`[Bridge] Activating typing indicator for ${message.userId}...`);
        // Note: Real implementation would call source-specific APIs (Meta/Twilio/Telegram)

        // 2. REFERRAL DETECTION
        let isReferral = false;
        try {
            const referralCodeMatch = message.content.match(/[A-Z]{2,}\d{4}/);
            if (referralCodeMatch) {
                const code = referralCodeMatch[0];
                const agent = await getAgentByCode(code);
                if (agent) {
                    isReferral = true;
                    const existingLead = await getLeadByPhone(message.userId, tenantId);
                    if (existingLead && !existingLead.agent_id) {
                        await addLead({
                            ...existingLead,
                            agent_id: agent.id,
                            tenant_id: tenantId,
                            attribution_source: `referral_code_${message.source}`,
                            is_referral: true
                        });
                    } else if (!existingLead) {
                        await addLead({
                            phone: message.userId,
                            name: `Yeni Hasta (${message.source})`,
                            status: 'Beklemede',
                            source: message.source,
                            channel: message.source as any,
                            treatment: 'Genel Bilgi',
                            date: new Date().toISOString().split('T')[0],
                            agent_id: agent.id,
                            tenant_id: tenantId,
                            attribution_source: `referral_code_${message.source}`,
                            is_referral: true,
                            last_message: message.content
                        });
                    }
                }
            }
        } catch (error) {
            console.error("[Bridge] Referral Error:", error);
        }

        // 3. MEDIA HANDLING (Neural Vision Integration)
        let imageData: any = null;
        if (message.mediaUrl || message.content.includes('[Image Attached]') || message.content.includes('http')) {
            const { VisionAnalysisService } = require('@/lib/vision');
            console.log(`[Bridge] Media detected from ${message.userId}. Executing Neural Vision Analysis...`);

            // In production, we pass the real mediaUrl or base64
            imageData = message.mediaUrl || 'processing_media';

            try {
                const analysis = await VisionAnalysisService.analyzeMedicalImage(imageData);
                if (analysis && analysis.type !== 'unsupported') {
                    console.log(`[Bridge] Vision Analysis Success: ${analysis.diagnosis}`);
                    // We enrich the message context with vision results for the orchestrator
                    message.content += `\n[SYSTEM-VISION-ATTACHED]: ${JSON.stringify(analysis)}`;
                }
            } catch (visionError) {
                console.error("[Bridge] Vision Engine Error:", visionError);
            }
        }

        // 4. AI ORCHESTRATION (Context-Aware)
        const history = await getMessageHistory(message.userId);
        const context = [...history, { role: 'user', content: message.content }];

        const auraResponse = await AiOrchestrator.processMessage(
            message.userId,
            context,
            message.mediaUrl || imageData, // Pass mediaUrl from webhook directly
            message.source
        );

        // 4. RESPONSE DELIVERY
        if (auraResponse && auraResponse.message.content) {

            // Financial Intent Detection & CRM Sync (Ruthless Audit: Phase 3)
            try {
                const payTriggers = ['ödeme', 'pay', 'hesap no', 'iban', 'fiyat', 'kapora', 'deposit'];
                const hasPayIntent = payTriggers.some(t => message.content.toLowerCase().includes(t));

                if (hasPayIntent) {
                    console.log(`[Bridge] High-Intent Financial Trigger Detected for ${message.userId}. Updating CRM status...`);
                    const lead = await getLeadByPhone(message.userId, tenantId);
                    if (lead) {
                        await addLead({
                            ...lead,
                            status: 'Ödeme Bekliyor',
                            last_message: message.content,
                            last_message_at: new Date().toISOString()
                        });
                    }
                }
            } catch (finErr) {
                console.error("[Bridge] Financial Status Sync Error:", finErr);
            }

            const isVoiceRequest = message.content.includes('[Voice Message]') ||
                message.content.toLowerCase().includes('sesli');

            let directSent = false;

            if (isVoiceRequest && message.source === 'whatsapp') {
                try {
                    const audioUrl = await textToSpeech(auraResponse.message.content, message.userId);
                    if (audioUrl) {
                        const voiceResult = await sendWhatsAppVoice(message.userId, audioUrl);
                        if (voiceResult.success) directSent = true;
                    }
                } catch (e: any) {
                    console.error("[Bridge] Voice Fail:", e.message);
                }
            }

            if (!directSent) {
                try {
                    const content = auraResponse.message.content;

                    // [NEW] 4.1. RICH CTA DETECTION (Phase 11) - Refined
                    let buttons: any[] = [];

                    // Payment Detection
                    if (content.includes('checkout.stripe.com')) {
                        const stripeUrl = content.match(/https?:\/\/checkout\.stripe\.com[^\s]+/)?.[0];
                        buttons.push({
                            text: '💳 Depozitoyu Tamamla',
                            url: stripeUrl,
                            title: 'Ödeme Yap',
                            payload: 'PAY_NOW',
                            callback_data: 'pay_intent'
                        });
                    }

                    // Marketplace/Clinic Detection
                    if (content.includes('/marketplace/')) {
                        const clinicUrl = content.match(/https?:\/\/[^\s]+\/marketplace\/[^\s]+/)?.[0];
                        buttons.push({
                            text: '🏥 Kliniği İncele',
                            url: clinicUrl,
                            title: 'Detaylar',
                            payload: 'VIEW_DETAILS',
                            callback_data: 'view_clinic'
                        });
                    }

                    // Calendar/Booking Detection
                    if (content.match(/randevu|book|appointment/i) && content.includes('/portal')) {
                        const portalUrl = content.match(/https?:\/\/[^\s]+\/portal[^\s]*/)?.[0];
                        buttons.push({
                            text: '🗓️ Randevu Al',
                            url: portalUrl,
                            title: 'Randevu',
                            payload: 'BOOK_NOW',
                            callback_data: 'book_app'
                        });
                    }

                    if (message.source === 'whatsapp') {
                        // WhatsApp buttons require a specific template or Business API, defaulting to text for now
                        await sendWhatsAppMessage(message.userId, content);
                    } else if (message.source === 'instagram') {
                        const { sendInstagramRichMessage, sendInstagramMessage } = require('../instagram');
                        if (buttons.length > 0) {
                            // Instagram quick replies are text-based triggers
                            await sendInstagramRichMessage(message.userId, content, {
                                buttons: buttons.map(b => ({ title: b.text, payload: b.payload }))
                            });
                        } else {
                            await sendInstagramMessage(message.userId, content);
                        }
                    } else if (message.source === 'telegram') {
                        const { sendTelegramRichMessage, sendTelegramMessage } = require('../telegram');
                        if (buttons.length > 0) {
                            // Telegram inline keyboards support direct URLs
                            await sendTelegramRichMessage(message.userId, content, buttons.map(b => ({
                                text: b.text,
                                url: b.url,
                                callback_data: b.callback_data
                            })));
                        } else {
                            await sendTelegramMessage(message.userId, content);
                        }
                    }
                    directSent = true;
                } catch (sendError: any) {
                    console.error(`[Bridge] ${message.source} Send Fail, attempting fallback...`, sendError.message);
                    const { FallbackBridge } = require('../fallback-bridge');
                    const fallbackResult = await FallbackBridge.triggerFallback(message.userId, auraResponse.message.content, message.source);

                    if (!fallbackResult.success) {
                        await this.queueMessage(message.userId, auraResponse.message.content, message.source);
                    } else {
                        directSent = true;
                    }
                }
            }
        }

        return auraResponse;
    }

    static async queueMessage(target: string, content: string, source: MessageSource) {
        const id = `q_${Date.now()}`;
        const queued: QueuedMessage = {
            id, target, source, content,
            attempts: 0,
            created_at: new Date().toISOString()
        };

        this.retryQueue.push(queued);

        // Critical: Persist to Supabase for durability (HIPAA/GDPR Reliability)
        if (supabase) {
            await supabase.from('queued_messages').upsert({
                id: id,
                target: target,
                source: source,
                content: content,
                attempts: 0,
                status: 'pending',
                created_at: queued.created_at
            });

            await supabase.from('debug_logs').insert({
                event_name: 'omni_message_queued',
                severity: 'medium',
                data: queued,
                source: 'bridge'
            });
        }
        this.processQueue();
    }

    private static async processQueue() {
        if (this.isProcessing || this.retryQueue.length === 0) return;
        this.isProcessing = true;

        while (this.retryQueue.length > 0) {
            const msg = this.retryQueue.shift();
            if (!msg) break;

            msg.attempts++;
            try {
                if (msg.source === 'whatsapp') await sendWhatsAppMessage(msg.target, msg.content);
                else if (msg.source === 'instagram') await sendInstagramMessage(msg.target, msg.content);
                else if (msg.source === 'telegram') await sendTelegramMessage(msg.target, msg.content);
                console.log(`[Bridge] Retried successfully: ${msg.id}`);
            } catch (error: any) {
                if (msg.attempts < 3) {
                    console.log(`[Bridge] Retry ${msg.attempts} failed for ${msg.id}, re-queuing.`);
                    this.retryQueue.push(msg);
                    await new Promise(r => setTimeout(r, 10000 * msg.attempts));
                } else {
                    console.error(`[Bridge] Max retries reached for ${msg.id}`);
                }
            }
        }
        this.isProcessing = false;
    }

    // --- NORMALIZERS ---

    static async normalizeWhatsApp(payload: any): Promise<NormalizedMessage> {
        let content = payload.Body || '';
        const mediaUrl = payload['MediaUrl0'];
        if (mediaUrl && payload['MediaContentType0']?.startsWith('audio/')) {
            const transcription = await transcribeAudio(mediaUrl);
            content = transcription ? `[Voice Message]: ${transcription}` : '[Voice Message]';
        }
        return {
            userId: payload.From?.replace('whatsapp:', '') || 'unknown',
            receiverId: payload.To?.replace('whatsapp:', '') || 'unknown',
            content, source: 'whatsapp', timestamp: new Date().toISOString()
        };
    }

    static normalizeInstagram(event: any): NormalizedMessage | null {
        const senderId = event.sender?.id;
        const text = event.message?.text;
        const mediaUrl = event.message?.attachments?.[0]?.payload?.url; // [NEW] Phase 11 Media Support

        if (!senderId) return null;

        return {
            userId: senderId,
            receiverId: event.recipient?.id || 'unknown',
            content: text || '',
            mediaUrl: mediaUrl,
            source: 'instagram',
            timestamp: new Date().toISOString()
        };
    }

    static async normalizeTelegram(payload: any): Promise<NormalizedMessage | null> {
        const chatId = payload.message?.chat?.id;
        const text = payload.message?.text;
        const photo = payload.message?.photo; // [NEW] Phase 11 Photo Support

        if (!chatId) return null;

        let mediaUrl = undefined;
        if (photo && photo.length > 0) {
            // Take the highest resolution photo (last in array)
            const fileId = photo[photo.length - 1].file_id;
            // Note: In production, call getFile to get the direct URL
            mediaUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/<file_path_placeholder>?file_id=${fileId}`;
        }

        return {
            userId: chatId.toString(),
            receiverId: 'telegram_bot',
            content: text || '',
            mediaUrl: mediaUrl,
            source: 'telegram',
            timestamp: new Date().toISOString()
        };
    }
}
