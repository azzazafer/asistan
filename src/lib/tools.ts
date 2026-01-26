import { saveProfile } from './db';
import { addLead } from './leads';
import { notifyStaff } from './whatsapp';
import { logAudit } from './security';

// These are the "tools" the AI can use
export const tools = [
    {
        type: 'function',
        function: {
            name: 'update_crm_lead',
            description: 'Kullanıcı bilgilerini CRM sistemine kaydeder veya günceller.',
            parameters: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Kullanıcının tam adı' },
                    phone: { type: 'string', description: 'Kullanıcının telefon numarası' },
                    treatment: { type: 'string', description: 'İlgilendiği tedavi türü' },
                    culture: { type: 'string', enum: ['Europe', 'Middle East', 'Global', 'Turkey'], description: 'Kullanıcının kültürel kökeni' },
                    channel: { type: 'string', enum: ['Web', 'WhatsApp', 'Instagram', 'Telegram'], description: 'İletişim kurulan kanal' },
                    notes: { type: 'string', description: 'Şikayeti veya ek notlar' }
                },
                required: ['name', 'phone']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'check_doctor_availability',
            description: 'Belirli bir tarihte müsait olan doktorları kontrol eder.',
            parameters: {
                type: 'object',
                properties: {
                    treatment: { type: 'string', description: 'Tedavi türü' },
                    date: { type: 'string', description: 'Tarih (YYYY-MM-DD)' }
                },
                required: ['treatment', 'date']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'offer_special_deal',
            description: 'Kullanıcının kültürüne ve ilgisine göre özel bir kampanya veya paket sunar.',
            parameters: {
                type: 'object',
                properties: {
                    deal_title: { type: 'string', description: 'Kampanya başlığı' },
                    description: { type: 'string', description: 'Kampanya detayları' }
                },
                required: ['deal_title', 'description']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'collect_triage_data',
            description: 'Hastanın şikayeti hakkında yapılandırılmış klinik veriler toplar (Ağrı şiddeti, süre, önceki operasyonlar vb.)',
            parameters: {
                type: 'object',
                properties: {
                    symptoms: { type: 'string', description: 'Ana şikayetler' },
                    duration: { type: 'string', description: 'Şikayetin süresi' },
                    painLevel: { type: 'number', minimum: 1, maximum: 10, description: 'Ağrı seviyesi (1-10)' },
                    previousSurgeries: { type: 'string', description: 'Daha önce geçirilmiş operasyonlar' }
                },
                required: ['symptoms', 'duration']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'transfer_to_whatsapp',
            description: 'Kullanıcıyı doğrudan bir satış temsilcisi veya danışman ile WhatsApp üzerinden görüştürür.',
            parameters: {
                type: 'object',
                properties: {
                    consultant_type: { type: 'string', enum: ['Medical', 'Logistics', 'Finance'], description: 'Görüşmek istenen danışman türü' },
                    priority: { type: 'string', enum: ['Standard', 'High'], description: 'Öncelik durumu' }
                }
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'request_call',
            description: 'Hastane telefonundan kullanıcının aranmasını sağlar veya hastane numarasını paylaşır.',
            parameters: {
                type: 'object',
                properties: {
                    phone_number: { type: 'string', description: 'Aranacak numara' },
                    preferred_time: { type: 'string', description: 'Tercih edilen arama zamanı' }
                },
                required: ['phone_number']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'create_payment_link',
            description: 'Kullanıcı için kapora veya tedavi ödeme bağlantısı oluşturur.',
            parameters: {
                type: 'object',
                properties: {
                    amount: { type: 'number', description: 'Ödenmesi gereken tutar' },
                    currency: { type: 'string', enum: ['EUR', 'USD', 'TRY'], description: 'Para birimi' },
                    description: { type: 'string', description: 'Ödeme açıklaması (Örn: Saç ekimi kaporası)' }
                },
                required: ['amount']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'get_hospital_locations',
            description: 'Hastanenin aktif şubelerini ve lokasyon bilgilerini listeler.',
            parameters: {
                type: 'object',
                properties: {}
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'book_treatment_appointment',
            description: 'Hasta için belirli bir şubede ameliyat veya muayene randevusu oluşturur.',
            parameters: {
                type: 'object',
                properties: {
                    lead_id: { type: 'string', description: 'Lead/Hasta ID' },
                    location_id: { type: 'string', description: 'Şube ID' },
                    title: { type: 'string', description: 'Randevu başlığı (Örn: Saç Ekimi Operasyonu)' },
                    start_time: { type: 'string', description: 'Başlangıç zamanı (ISO 8601 format - Örn: 2026-02-15T09:00:00Z)' },
                    type: { type: 'string', enum: ['consultation', 'surgery', 'follow-up'], description: 'Randevu türü' }
                },
                required: ['location_id', 'title', 'start_time']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'request_human_intervention',
            description: 'AI tıbbi bir teşhis koyamayacağını veya hassas bir süreci yönetemeyeceğini anladığında, hastayı canlı bir hasta danışmanına bağlamak için bu aracı çağırır.',
            parameters: {
                type: 'object',
                properties: {
                    reason: { type: 'string', description: 'Devretme nedeni (Örn: Tıbbi teşhis talebi, agresif davranış vb.)' }
                },
                required: ['reason']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'search_clinics',
            description: 'Belirli bir tedavi ve lokasyon için Aura ekosistemindeki kliniklerden öneri sunar.',
            parameters: {
                type: 'object',
                properties: {
                    treatment: { type: 'string', description: 'Aranan tedavi (Örn: Hair Transplant)' },
                    location: { type: 'string', description: 'Tercih edilen şehir/ülke' }
                },
                required: ['treatment']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'get_legal_disclaimer',
            description: 'Tıbbi konular tartışıldığında kullanıcıya sunulması gereken yasal feragatnameyi döndürür. AI bu aracı tıbbi tavsiye vermediğini netleştirmek için çağırabilir.',
            parameters: {
                type: 'object',
                properties: {
                    language: { type: 'string', description: 'Dil (tr, en, ar, de)' }
                }
            }
        }
    }
];

import { DEFAULT_HOSPITAL } from './hospital-config';

// Tool Implementation Handlers
export const handleToolCall = async (toolCall: any, userId: string) => {
    const { name, arguments: argsString } = toolCall.function;
    const args = JSON.parse(argsString);

    console.log(`AI Tool Call: ${name}`, args);

    if (name === 'update_crm_lead') {
        const newLead = {
            name: args.name,
            phone: args.phone,
            treatment: args.treatment || 'Belirtilmedi',
            culture: args.culture || 'Global',
            channel: args.channel || 'Web',
            status: 'Beklemede' as const,
            source: 'Aura AI',
            date: new Date().toLocaleString(),
            notes: args.notes,
            tenant_id: 'default_clinic'
        };

        await addLead(newLead);

        await logAudit({
            action: 'CRM_LEAD_CREATED',
            userId: userId,
            resource: 'Tools.update_crm_lead',
            details: `Name: ${args.name}, Treatment: ${args.treatment}`,
            clearance: 'ADMIN'
        });

        await saveProfile({
            id: userId,
            tenant_id: 'default_clinic',
            name: args.name,
            language: 'tr',
            history: [],
            last_treatment: args.treatment
        });

        return { success: true, message: 'Bilgileriniz başarıyla CRM sistemine kaydedildi.' };
    }

    if (name === 'check_doctor_availability') {
        const { HBYSBridge } = require('./hbys-bridge');
        const treatment = args.treatment || 'Genel';
        const date = args.date || new Date().toISOString().split('T')[0];

        const result = await HBYSBridge.getAvailability(treatment, date);

        return {
            available: result.available,
            suggestedDoctor: result.doctor,
            specialty: result.department,
            department: result.department,
            slots: result.slots,
            note: "Aura live medical bridge active."
        };
    }

    if (name === 'offer_special_deal') {
        const dealTitle = args.deal_title;
        const description = args.description;

        return {
            success: true,
            message: `Aura has activated a special deal: ${dealTitle}`,
            details: description,
            validUntil: '72 hours',
            incentive: 'VIP airport pickup upgraded to private limousine.'
        };
    }

    if (name === 'collect_triage_data') {
        const symptoms = args.symptoms;
        const painLevel = args.painLevel || 'N/A';

        // Notify Staff via WhatsApp
        notifyStaff("+905000000000", userId, `Yeni Triage Verisi: ${symptoms}. Ağrı: ${painLevel}`);

        return {
            success: true,
            reportId: `TRG-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
            message: "Klinik verileriniz başarıyla işlendi ve ilgili doktora ön hazırlık raporu olarak iletildi.",
            summary: `Hasta Şikayeti: ${symptoms}, Ağrı Seviyesi: ${painLevel}`
        };
    }

    if (name === 'transfer_to_whatsapp') {
        const type = args.consultant_type || 'General';
        const whatsappLink = `https://wa.me/905000000000?text=Merhaba,%20${type}%20birimiyle%20görüşmek%20istiyorum.`;

        return {
            success: true,
            link: whatsappLink,
            message: "Sizi doğrudan WhatsApp hattımıza yönlendiriyorum. Lütfen aşağıdaki bağlantıya tıklayın.",
            action: "EXTERNAL_LINK_OPEN"
        };
    }

    if (name === 'request_call') {
        return {
            success: true,
            message: "Arama talebiniz alındı. Hasta danışmanlarımız en kısa sürede sizi arayacaktır.",
            hospital_phone: "+90 212 000 00 00"
        };
    }

    if (name === 'create_payment_link') {
        const { createPaymentLink } = require('./payments');
        const plink = await createPaymentLink(
            args.amount,
            args.description || 'Medical Deposit',
            userId
        );

        if (plink) {
            await logAudit({
                action: 'PAYMENT_LINK_GENERATED',
                userId: userId,
                resource: 'Tools.create_payment_link',
                details: `Amount: ${args.amount} ${args.currency || 'EUR'}, Link: ${plink.id}`,
                clearance: 'USER'
            });

            return {
                success: true,
                message: "Ödeme bağlantınız hazırlandı. Güvenli ödeme için aşağıdaki linki kullanabilirsiniz.",
                payment_url: plink.url,
                link_id: plink.id
            };
        } else {
            return {
                success: false,
                error: "Ödeme bağlantısı oluşturulamadı. Lütfen teknik destek ile iletişime geçin."
            };
        }
    }

    if (name === 'get_hospital_locations') {
        const { supabase } = require('./db');
        const { data, error } = await supabase.from('locations').select('*');
        if (error) return { error: error.message };

        // Fallback if no locations in DB yet
        if (!data || data.length === 0) {
            return {
                locations: [
                    { id: 'loc_istanbul_main', name: 'Aura Istanbul Central', address: 'Sisli, Istanbul' },
                    { id: 'loc_antalya_branch', name: 'Aura Antalya Beach Clinic', address: 'Muratpasa, Antalya' }
                ]
            };
        }
        return { locations: data };
    }

    if (name === 'book_treatment_appointment') {
        const { supabase } = require('./db');
        const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', userId).single();
        const tenantId = profile?.tenant_id || 'default_clinic';

        // Calculate end time (default +2 hours)
        const start = new Date(args.start_time);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        const { data, error } = await supabase.from('appointments').insert({
            tenant_id: tenantId,
            location_id: args.location_id,
            title: args.title,
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            type: args.type || 'consultation',
            status: 'scheduled'
        }).select().single();

        if (error) {
            console.error('[AI Tool book_appointment] Error:', error);
            return { success: false, error: 'Randevu oluşturulurken bir hata oluştu.' };
        }

        return {
            success: true,
            appointment: data,
            message: `Randevunuz başarıyla oluşturuldu. Şube: ${args.location_id}, Zaman: ${args.start_time}`
        };
    }

    if (name === 'request_human_intervention') {
        const reason = args.reason || 'Belirtilmedi';
        console.warn(`[GUARDRAIL] Human Intervention Requested for ${userId}: ${reason}`);

        await logAudit({
            action: 'HUMAN_INTERVENTION_REQUESTED',
            userId: userId,
            resource: 'Tools.request_human_intervention',
            details: `Reason: ${reason}`,
            clearance: 'ADMIN'
        });

        // Notify staff via WhatsApp/Dashboard with Failover
        const { notifyStaffWithFailover } = require('./messaging');
        await notifyStaffWithFailover(userId, `ACİL: Hasta canlı danışman bekliyor. Neden: ${reason}`);

        return {
            success: true,
            message: "Talebiniz üzerine sizi en deneyimli sağlık danışmanlarımızdan birine aktarıyorum. Kısa süre içinde sizinle iletişime geçecekler.",
            queue_status: "priority"
        };
    }

    if (name === 'search_clinics') {
        const { MarketplaceService } = require('./marketplace');
        const clinics = await MarketplaceService.searchClinics(args.treatment, args.location);

        return {
            success: true,
            clinics: clinics,
            message: `${args.treatment} için Aura onaylı en iyi klinik seçeneklerini buldum.`
        };
    }

    if (name === 'get_legal_disclaimer') {
        const lang = args.language || 'tr';
        const disclaimers: Record<string, string> = {
            tr: "ÖNEMLİ: Bu görüşme bir ön bilgilendirme niteliğindedir ve tıbbi bir muayene veya kesin teşhis yerine geçmez. Lütfen yüz yüze konsültasyon için randevu alınız.",
            en: "IMPORTANT: This conversation is for informational purposes only and does not replace a medical examination or definitive diagnosis. Please book a face-to-face consultation.",
            ar: "هام: هذه المحادثة للأغراض الإعلامية فقط ولا تحل محل الفحص الطبي أو التشخيص النهائي. يرجى حجز استشارة مباشرة.",
            de: "WICHTIG: Dieses Gespräch dient nur zu Informationszwecken und ersetzt keine ärztliche Untersuchung veya endgültige Diagnose."
        };

        return {
            disclaimer: disclaimers[lang] || disclaimers['en'],
            note: "AI generated this via mandatory security tool call."
        };
    }

    return { error: 'Unknown function' };
};
