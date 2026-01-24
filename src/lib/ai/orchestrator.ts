import { openai, ASSISTANT_SYSTEM_PROMPT } from '@/lib/openai';
import { tools, handleToolCall } from '@/lib/tools';
import { redactPII, validateResponse, detectPromptInjection, logAudit } from '@/lib/security';
import { getHospitalKnowledge } from '@/lib/hospital-config';
import { getCultureConfig } from '@/lib/culture-matrix';
import { getProfile } from '@/lib/db';
import { KnowledgeService } from './knowledge';
import { lookupGlossary } from '@/lib/glossary';

export interface AuraContext {
    userId: string;
    culture: 'Europe' | 'Middle East' | 'Global' | 'Turkey';
    source: 'web' | 'whatsapp' | 'instagram' | 'telegram';
}

export interface AuraResponse {
    message: any; // OpenAI Message Object
    analysis?: any; // Vision Analysis
    context?: any; // Cultural context used, useful for debugging
    error?: string;
}

export class AiOrchestrator {

    /**
     * Processes a message from any source (Web/WhatsApp) and returns the AI's response.
     */
    static async processMessage(
        userId: string,
        messages: any[],
        imageData?: string,
        source: 'web' | 'whatsapp' | 'instagram' | 'telegram' = 'web',
        overrideLanguage?: string,
        refCode?: string
    ): Promise<AuraResponse> {
        try {
            // 1. Security - Input Validation (Anti-Injection)
            const lastMessage = messages[messages.length - 1];
            if (lastMessage && lastMessage.role === 'user') {
                const injectionCheck = detectPromptInjection(lastMessage.content);
                if (!injectionCheck.safe) {
                    console.warn(`[SECURITY] Injection Detected from ${userId}: ${injectionCheck.reason}`);

                    await logAudit({
                        action: 'PROMPT_INJECTION_BLOCKED',
                        userId: userId,
                        resource: 'AiOrchestrator',
                        details: `Detected injection in: ${lastMessage.content.slice(0, 100)}...`,
                        clearance: 'USER'
                    });

                    return {
                        message: {
                            role: 'assistant',
                            content: "Sizi anlayamadım. Sağlık ve tedavi süreçlerinizle ilgili nasıl yardımcı olabilirim?"
                        }
                    };
                }

                // 2. Neural Guardrails v4 (Smarter Intent Analysis)
                const query = lastMessage.content.toLowerCase();
                const pricingTriggers = ['fiyat', 'ne kadar', 'kaç para', 'maliyet', 'ücret', 'price', 'cost', 'how much'];
                const medicalTriggers = ['teşhis', 'ameliyat yap', 'ilaç yaz', 'neden hastayım', 'hastalığım ne', 'diagnosis', 'why am i sick'];
                const paymentTriggers = ['ödeme yap', 'kaporayı yatır', 'nasıl öderim', 'link gönder', 'ödemeye hazırım', 'let me pay', 'send link'];

                const isPricingQuery = pricingTriggers.some(t => query.includes(t));
                const isMedicalQuery = medicalTriggers.some(t => query.includes(t));
                const isPaymentIntent = paymentTriggers.some(t => query.includes(t));

                if (isPaymentIntent) {
                    console.log(`[Neural Pay] High-Intent Payment Request Detected from ${userId}`);
                    messages.push({
                        role: 'system',
                        content: `[URGENT PAYMENT INTENT]: Kullanıcı ödeme yapmaya hazır görünüyor. 
                        Aura Neural Pay sistemini devreye sok. 'create_payment_link' aracını kullanarak kaporayı (Genelde 250 EUR) teklif et.`
                    });
                } else if (isPricingQuery || isMedicalQuery) {
                    console.log(`[GUARDRAIL] Sensitive Intent Detected: ${isPricingQuery ? 'PRICING' : 'MEDICAL'}`);

                    // We append a system instruction to guide the AI for this specific sensitive turn
                    messages.push({
                        role: 'system',
                        content: `[URGENT SECURITY GUARDRAIL]: User is asking about ${isPricingQuery ? 'pricing' : 'medical diagnosis/surgery'}. 
                        1. You MUST NOT provide specific numbers or diagnoses yourself.
                        2. Call 'get_legal_disclaimer' first.
                        3. Then, use 'request_human_intervention' or 'collect_triage_data' to handle the request safely.
                        4. Do not speculate.`
                    });
                }
            }

            // 2. Security - PII Redaction
            const safeMessages = messages.map((m: any) => ({
                ...m,
                content: typeof m.content === 'string' ? redactPII(m.content) : m.content
            }));

            // 3. Context & Profile Loading
            let profile = await getProfile(userId);

            // [NEW] 3.1. Lead Attribution (Phase 3)
            // Check if this message contains an agent referral code or if one was passed from cookies/URL
            const { AttributionService } = require('./attribution');
            let agentId = await AttributionService.detectAndLinkAgent(userId, lastMessage.content);

            // If No code in message, check the passed refCode (from URL/Cookie)
            if (!agentId && refCode) {
                const { getAgentByCode } = require('../agents');
                const agent = await getAgentByCode(refCode);
                if (agent) {
                    agentId = agent.id;
                    console.log(`[Attribution] Linked via URL/Cookie refCode: ${refCode} -> ${agentId}`);
                }
            }

            if (!agentId && profile) {
                agentId = profile.metadata?.agent_id;
            }

            // Detect Culture
            const userLang = (overrideLanguage || profile?.language || 'tr').toLowerCase();
            let culture: 'Europe' | 'Middle East' | 'Global' | 'Turkey' = 'Global';

            // Prioritize phone number country code if available for WhatsApp
            if (source === 'whatsapp' && userId.startsWith('+')) {
                if (userId.startsWith('+90')) culture = 'Turkey';
                else if (userId.startsWith('+49') || userId.startsWith('+44')) culture = 'Europe';
                else if (userId.startsWith('+971') || userId.startsWith('+966')) culture = 'Middle East';
            } else {
                // Fallback to profile language
                if (['tr'].includes(userLang)) culture = 'Turkey';
                else if (['ar'].includes(userLang)) culture = 'Middle East';
                else if (['en', 'de', 'fr'].includes(userLang)) culture = 'Europe';
            }

            const cultureConfig = getCultureConfig(culture);

            // Build System Prompt
            let contextPrompt = ASSISTANT_SYSTEM_PROMPT + getHospitalKnowledge();
            contextPrompt += `\n\n[NEURAL DYNAMIC MIRRORING & SALES INTENT]: 
- Kullanıcının kültürüne (${culture}) ve tonuna (${cultureConfig.tone}) uyum sağla.
- Platform: ${source.toUpperCase()} ${source === 'instagram' ? '(Görsel, sıcak, emoji kullanımı serbest)' : source === 'telegram' ? '(Hızlı, teknoloji odaklı, direkt)' : '(Profesyonel, net)'}.
- Stratejik Hedef: Kullanıcıyı bilgi vermekten ziyade randevu/satış aşamasına taşı.
- Kurallar: Kesinlikle "Canım", "Tatlım" deme. Profesyonel mesafeyi koru ama sıcak davran.
- Special Offer (Kullanılabilir): ${cultureConfig.specialOffer.title}
- [PILLAR 2 - LOYALTY SHIELD]: Aura üzerinden ödeme yapmanın avantajlarını (1000$ Ameliyat Garantisi, Ücretsiz Revizyon Sigortası) vurgula. Hastayı platform dışına (direkt hastane ile anlaşma) kaçmaktan vazgeçir.`;

            if (profile) {
                contextPrompt += `\n\n[USER CONTEXT]\nName: ${profile.name || 'Misafir'}\nLanguage: ${profile.language}`;
            }

            // [NEW] 3.2. Marketplace Comparative Intelligence (Phase 8)
            contextPrompt += `\n\n[MARKET NETWORK STRATEGY]:
- Klinik Önerirken: Sadece isim verme. Kliniklerin puanlarını (${95}/100 gibi), başarı oranlarını ve Aura onaylı (Verified) olduklarını vurgula.
- Karşılaştırma: Eğer kullanıcı kararsızsa, 'Aura Istanbul Elite' ile 'Aura Antalya Riviera' arasındaki farkları (Lokasyon avantajı, teknoloji vb.) kıyaslayarak bir satış danışmanı gibi yönlendirme yap.`;

            // [NEW] 3.3. God Mode Niche Knowledge (Phase 4 / Pillar 3)
            const activeTreatment = profile?.last_treatment || lastMessage.content;
            if (activeTreatment) {
                const niche = activeTreatment.toLowerCase().includes('ekim') ? 'hair' :
                    (activeTreatment.toLowerCase().includes('diş') || activeTreatment.toLowerCase().includes('dental') ? 'dental' : null);

                if (niche) {
                    const godMode = KnowledgeService.getGodModeLib(niche as any);
                    if (godMode) {
                        contextPrompt += `\n\n[GOD MODE NIHE DATA - ${niche.toUpperCase()}]:
${godMode.god_mode_data}
- Otorite: ${godMode.pitch}`;
                    }
                }
            }

            // [NEW] 3.5. Perpetual Learning - Semantic Knowledge Retrieval
            const query = lastMessage.content;
            const verifiedDocs = await KnowledgeService.getVerifiedInfo(query, undefined, culture);
            const medicalTerms = await KnowledgeService.searchGlossary(query, userLang, culture);

            if (verifiedDocs.length > 0 || medicalTerms) {
                contextPrompt += `\n\n[NEURAL KNOWLEDGE SYNC - VERIFIED SOURCES]:`;
                if (medicalTerms) {
                    contextPrompt += `\n- Jargon: ${medicalTerms.term} -> ${medicalTerms.definition}`;
                }
                verifiedDocs.forEach(doc => {
                    contextPrompt += `\n- Source (${doc.source}): ${doc.title} -> ${doc.content}`;
                });
            }

            // 4. Vision Analysis Integration
            let analysis: any = null;
            if (imageData) {
                // Dynamic import to avoid circular deps if any
                const { VisionAnalysisService } = require('@/lib/vision');
                console.log(`[VISION] Analyzing image for ${userId}...`);
                analysis = await VisionAnalysisService.analyzeMedicalImage(imageData);

                if (analysis.type !== 'unsupported') {
                    safeMessages.push({
                        role: 'system',
                        content: `[VISION SYSTEM REPORT]
                        Analysis Result:
                        - Condition: ${analysis.diagnosis}
                        - Severity: ${analysis.severity}
                        - Treatment: ${analysis.suggestedTreatment}
                        - Disclaimer: "${analysis.disclaimer}"
                        
                        Inform the user about this analysis kindly.`
                    });
                } else {
                    safeMessages.push({
                        role: 'system',
                        content: `[VISION ERROR] The uploaded image was not clear. Ask for a better photo.`
                    });
                }
            }

            // 5. OpenAI API Call
            const apiMessages: any[] = [
                { role: 'system', content: contextPrompt },
                ...safeMessages.map((m: any) => ({ role: m.role, content: m.content }))
            ];

            let response = await openai.chat.completions.create({
                model: 'gpt-4o-mini', // Faster for omnichannel chat
                messages: apiMessages,
                tools: tools as any,
                tool_choice: 'auto',
                temperature: 0.7,
            });

            let aiMessage = response.choices[0].message;

            // 6. Tool Execution Loop
            if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
                const toolMessages: any[] = [];
                for (const toolCall of aiMessage.tool_calls) {
                    const result = await handleToolCall(toolCall, userId);
                    toolMessages.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(result)
                    });
                }

                // Final response after tool execution
                const finalResponse = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        ...apiMessages,
                        aiMessage,
                        ...toolMessages
                    ] as any
                });
                aiMessage = finalResponse.choices[0].message;
            }

            // 7. Output Security Validation
            const safetyCheck = validateResponse(aiMessage.content || '');
            if (!safetyCheck.safe) {
                aiMessage.content = "Üzgünüm, size doğrudan tıbbi tavsiye veremem. Lütfen bir uzmanla görüşün.";
            }

            // 7.5. Semantic Enrichment
            if (aiMessage.content) {
                aiMessage.content = await lookupGlossary(aiMessage.content);
            }

            // 8. CRM Sync (NEW: Phase 3)
            // Save the exchange to the lead's history
            try {
                const { getLeadByPhone, addLead } = require('@/lib/leads');
                const tenantId = profile?.tenant_id || 'default_clinic';
                let lead = await getLeadByPhone(userId, tenantId);

                const chatEntry = {
                    role: 'user',
                    content: lastMessage.content,
                    timestamp: new Date().toISOString()
                };
                const aiEntry = {
                    role: 'assistant',
                    content: aiMessage.content,
                    timestamp: new Date().toISOString()
                };

                if (lead) {
                    const updatedHistory = [...(lead.history || []), chatEntry, aiEntry];
                    await addLead({ ...lead, history: updatedHistory, agent_id: agentId });
                } else if (['whatsapp', 'telegram', 'instagram'].includes(source)) {
                    // Capture as new lead
                    await addLead({
                        name: profile?.name || `${source.charAt(0).toUpperCase() + source.slice(1)} User (${userId.slice(-4)})`,
                        phone: userId,
                        treatment: 'Inquiry',
                        status: 'Beklemede',
                        source: `${source.charAt(0).toUpperCase() + source.slice(1)} AI`,
                        channel: source.charAt(0).toUpperCase() + source.slice(1),
                        culture: culture,
                        tenant_id: tenantId,
                        agent_id: agentId, // Attribution
                        attribution_source: agentId ? 'agent_referral' : 'direct',
                        history: [chatEntry, aiEntry]
                    });
                }
            } catch (crmError) {
                console.error('[CRM Sync Error]', crmError);
            }

            // 9. Neural Discovery (Background Learning)
            // If user mentioned a specific medical term we don't strictly know, capture it
            if (lastMessage.content.length < 30 && !medicalTerms) {
                const words = lastMessage.content.split(' ');
                if (words.length <= 3) {
                    KnowledgeService.captureDiscovery(lastMessage.content, messages.slice(-5).map(m => m.content).join('\n'));
                }
            }

            // 10. Audit Log Finalization
            await logAudit({
                action: 'AI_MESSAGE_PROCESSED',
                userId: userId,
                resource: 'AiOrchestrator',
                details: `Source: ${source}, Culture: ${culture}`,
                clearance: 'USER'
            });

            return {
                message: aiMessage,
                analysis: (imageData && typeof analysis !== 'undefined') ? analysis : null,
                context: { culture, source }
            };

        } catch (error: any) {
            console.error('[AiOrchestrator Neural Shield] Breach:', error);
            return {
                message: {
                    role: 'assistant',
                    content: 'Sistem komuta merkezinde geçici bir senkronizasyon hatası oluştu. Talebinizi ve analizlerinizi güvenle kaydettim. Birkaç dakika içinde tekrar deneyebilir misiniz?'
                },
                error: error.message
            };
        }
    }

    /**
     * Generates a concise summary of the conversation history.
     */
    static async generateSummary(userId: string, history: any[]): Promise<string> {
        try {
            const historyText = history.map(h => `${h.role === 'user' ? 'User' : 'Aura'}: ${h.content}`).join('\n');

            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Sen Aura OS satış asistanısın. Aşağıdaki konuşma geçmişini 2-3 cümle ile özetle. Hastanın ana şikayetini ve Aura\'nın ona olan yaklaşımını vurgula.'
                    },
                    { role: 'user', content: `Konuşma Geçmişi:\n${historyText}` }
                ],
                temperature: 0.5
            });

            return response.choices[0].message.content || 'Summary failed.';
        } catch (error) {
            console.error('[AiOrchestrator Summary Error]', error);
            return 'Özet oluşturulamadı.';
        }
    }
}
