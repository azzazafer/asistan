"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

type AssistantStep = "WELCOME" | "EMAIL" | "VOLUME" | "RESULT_VIP" | "RESULT_LOW";

interface AssistantContent {
    welcome: string;
    clinic: string;
    agency: string;
    email_req: string;
    email_placeholder: string;
    next: string;
    volume_req: string;
    v1: string;
    v2: string;
    v3: string;
    vip_msg: string;
    vip_btn: string;
    low_msg: string;
    low_btn: string;
}

export default function AuraAssistant() {
    const { language } = useLanguage();
    const isRTL = language === "AR";

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<AssistantStep>("WELCOME");
    const [formData, setFormData] = useState({
        role: "",
        email: "",
        volume: ""
    });

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [step, isOpen]);

    // Otonom Çeviri Motoru (Yerel - Hızlı İnfaz)
    const assistantTranslations: Record<string, AssistantContent> = {
        TR: {
            welcome: "Aura OS Siber Karargahına hoş geldiniz. Ben 2A2 Otonom Asistan. Sistemi sizin için optimize etmem adına lütfen seçin:",
            clinic: "Diş Kliniği / Hastane",
            agency: "Sağlık Turizmi Acentesi",
            email_req: "Harika. Size özel sızıntı tespit raporunuzu ve ROI planınızı hazırlayabilmem için kurumsal e-posta adresinizi girer misiniz?",
            email_placeholder: "E-posta adresiniz...",
            next: "DEVAM ET ⚡",
            volume_req: "Teşekkürler. Son olarak, aylık ortalama hasta/lead hacminiz nedir?",
            v1: "0-50",
            v2: "50-200",
            v3: "200+ VIP",
            vip_msg: "Kapasiteniz Aura OS otonomisi için optimum seviyede. Sizi doğrudan kurucumuz Zafer Bey'in VIP hattına ve takvimine aktarıyorum.",
            vip_btn: "⚡ Kurucu Onaylı VIP Görüşme Başlat",
            low_msg: "Raporunuz sistem tarafından hazırlanıp mailinize iletilecektir. İlginiz için teşekkürler.",
            low_btn: "📥 ROI Analiz Raporunu İndir (PDF)"
        },
        EN: {
            welcome: "Welcome to Aura OS Cyber HQ. I am 2A2 Autonomous Assistant. To optimize the system for you, please select:",
            clinic: "Dental Clinic / Hospital",
            agency: "Medical Tourism Agency",
            email_req: "Great. Could you enter your corporate email address so I can prepare your custom leakage report and ROI plan?",
            email_placeholder: "Your email address...",
            next: "CONTINUE ⚡",
            volume_req: "Thanks. Finally, what is your average monthly patient/lead volume?",
            v1: "0-50",
            v2: "50-200",
            v3: "200+ VIP",
            vip_msg: "Your capacity is at the optimum level for Aura OS autonomy. I am transferring you directly to our founder Mr. Zafer's VIP line and calendar.",
            vip_btn: "⚡ Start Founder Approved VIP Meeting",
            low_msg: "Your report will be prepared by the system and sent to your email. Thank you for your interest.",
            low_btn: "📥 Download ROI Analysis Report (PDF)"
        },
        DE: {
            welcome: "Willkommen im Aura OS Cyber HQ. Ich bin der autonome Assistent 2A2. Um das System für Sie zu optimieren, wählen Sie bitte aus:",
            clinic: "Zahnklinik / Krankenhaus",
            agency: "Medizintourismus-Agentur",
            email_req: "Großartig. Könnten Sie Ihre geschäftliche E-Mail-Adresse eingeben, damit ich Ihren individuellen Leckagebericht und ROI-Plan erstellen kann?",
            email_placeholder: "Ihre E-Mail-Adresse...",
            next: "WEITER ⚡",
            volume_req: "Vielen Dank. Wie hoch ist schließlich Ihr durchschnittliches monatliches Patienten-/Lead-Volumen?",
            v1: "0-50",
            v2: "50-200",
            v3: "200+ VIP",
            vip_msg: "Ihre Kapazität liegt auf dem optimalen Niveau für die Aura OS Autonomie. Ich leite Sie direkt an die VIP-Leitung und den Kalender unseres Gründers Herrn Zafer weiter.",
            vip_btn: "⚡ Von Gründer genehmigtes VIP-Meeting starten",
            low_msg: "Ihr Bericht wird vom System erstellt und per E-Mail an Sie versandt. Vielen Dank für Ihr Interesse.",
            low_btn: "📥 ROI-Analysebericht herunterladen (PDF)"
        },
        AR: {
            welcome: "مرحباً بكم في مقر أورا أو إس السيبراني. أنا مساعد 2A2 المستقل. لتحسين النظام من أجلك، يرجى الاختيار:",
            clinic: "عيادة أسنان / مستشفى",
            agency: "وكالة للسياحة العلاجية",
            email_req: "رائع. هل يمكنك إدخال بريدك الإلكتروني المؤسسي حتى أتمكن من إعداد تقرير التسرب المخصص وخطة العائد على الاستثمار؟",
            email_placeholder: "بريدك الإلكتروني...",
            next: "استمرار ⚡",
            volume_req: "شكراً. أخيراً، ما هو متوسط حجم المرضى/العملاء المحتملين الشهري؟",
            v1: "0-50",
            v2: "50-200",
            v3: "200+ VIP",
            vip_msg: "قدرتك في المستوى الأمثل لاستقلالية أورا أو إس. أقوم بتحويلك مباشرة إلى خط كبار الشخصيات وجدول أعمال مؤسسنا السيد ظافر.",
            vip_btn: "⚡ بدء اجتماع كبار الشخصيات المعتمد من المؤسس",
            low_msg: "سيتم إعداد تقريرك بواسطة النظام وإرساله إلى بريدك الإلكتروني. شكراً لاهتمامك.",
            low_btn: "📥 تحميل تقرير تحليل العائد (PDF)"
        }
    };

    const cur = assistantTranslations[language] || assistantTranslations["EN"];

    const handleRole = (role: string) => {
        setFormData({ ...formData, role });
        setStep("EMAIL");
    };

    const handleEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.email.includes("@")) {
            setStep("VOLUME");
        }
    };

    const handleVolume = (volume: string) => {
        setFormData({ ...formData, volume });
        if (volume === "0-50") {
            setStep("RESULT_LOW");
        } else {
            setStep("RESULT_VIP");
        }
    };

    const getWhatsAppUrl = () => {
        const text = `Merhaba Zafer Bey, Aura OS asistanı üzerinden ulaşıyorum. Rolüm: [${formData.role}], Hacim: [${formData.volume}], Mail: [${formData.email}]. Sistemi kurmak istiyoruz.`;
        return `https://wa.me/905510596718?text=${encodeURIComponent(text)}`;
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-6 z-[9999] md:top-auto md:bottom-10 w-16 h-16 rounded-full bg-blue-600 border-2 border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all group"
            >
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
                <span className="text-3xl group-hover:rotate-12 transition-transform">🤖</span>
            </button>
        );
    }

    return (
        <div
            className={`fixed bottom-6 right-6 z-[9999] w-[350px] md:w-[400px] h-[550px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500`}
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-900/40 to-black border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl text-white font-black">
                        A
                    </div>
                    <div className="text-left">
                        <div className="text-white text-sm font-black tracking-widest uppercase">AURA CORE AI</div>
                        <div className="text-[9px] font-mono text-green-500 uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Otonom Mod Hazır
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors text-xl">✕</button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">

                {/* Fixed Welcome Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 shrink-0 font-bold">
                        AI
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs text-gray-300 leading-relaxed shadow-xl text-left">
                        {cur.welcome}
                    </div>
                </div>

                {/* Step 1: Welcome Options */}
                <div className="space-y-2 ml-11">
                    <button
                        onClick={() => handleRole(cur.clinic)}
                        disabled={step !== "WELCOME"}
                        className={`w-full p-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-widest ${formData.role === cur.clinic ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'}`}
                    >
                        {cur.clinic}
                    </button>
                    <button
                        onClick={() => handleRole(cur.agency)}
                        disabled={step !== "WELCOME"}
                        className={`w-full p-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-widest ${formData.role === cur.agency ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'}`}
                    >
                        {cur.agency}
                    </button>
                </div>

                {/* Step 2: Email */}
                {(step === "EMAIL" || formData.email) && (
                    <>
                        <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 shrink-0 font-bold">AI</div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs text-gray-300 leading-relaxed text-left">
                                {cur.email_req}
                            </div>
                        </div>
                        {step === "EMAIL" && (
                            <form onSubmit={handleEmail} className="ml-11 flex gap-2">
                                <input
                                    type="email"
                                    required
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                                    placeholder={cur.email_placeholder}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <button type="submit" className="px-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black text-white">{cur.next}</button>
                            </form>
                        )}
                        {formData.email && step !== "EMAIL" && (
                            <div className="flex justify-end pr-4">
                                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none text-xs font-mono shadow-lg">
                                    {formData.email}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Step 3: Volume */}
                {(step === "VOLUME" || formData.volume) && (
                    <>
                        <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 shrink-0 font-bold">AI</div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs text-gray-300 leading-relaxed text-left">
                                {cur.volume_req}
                            </div>
                        </div>
                        {step === "VOLUME" && (
                            <div className="ml-11 grid grid-cols-1 gap-2">
                                {[cur.v1, cur.v2, cur.v3].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => handleVolume(v)}
                                        className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-bold tracking-widest"
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        )}
                        {formData.volume && step !== "VOLUME" && (
                            <div className="flex justify-end pr-4">
                                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none text-xs font-black tracking-widest uppercase">
                                    {formData.volume}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* FINAL RESULTS */}
                {(step === "RESULT_VIP" || step === "RESULT_LOW") && (
                    <div className="flex gap-3 animate-in slide-in-from-bottom-10 duration-1000">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-400 shrink-0 font-bold">AI</div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs text-gray-300 leading-relaxed w-full text-left">
                            {step === "RESULT_VIP" ? cur.vip_msg : cur.low_msg}

                            {step === "RESULT_VIP" && (
                                <a
                                    href={getWhatsAppUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 flex flex-col items-center gap-4 bg-green-600/20 border border-green-500/50 p-6 rounded-3xl hover:bg-green-600/30 transition-all group shadow-[0_0_30px_rgba(34,197,94,0.2)] animate-pulse"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,197,94,0.6)] group-hover:scale-110 transition-transform">
                                        ⚡
                                    </div>
                                    <span className="text-[12px] font-black tracking-tighter text-white text-center uppercase leading-tight">
                                        {cur.vip_btn}
                                    </span>
                                </a>
                            )}

                            {step === "RESULT_LOW" && (
                                <button
                                    onClick={() => alert("Simulated PDF Download Started...")}
                                    className="mt-6 w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black text-white hover:bg-blue-600 transition-all uppercase tracking-widest"
                                >
                                    {cur.low_btn}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 text-center">
                <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Aura OS Neural Core v6.2 — Sealed By Zafer</p>
            </div>
        </div>
    );
}
