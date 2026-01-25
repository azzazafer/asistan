"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { CheckCircle2, TrendingUp, Clock, Users, ArrowUpRight, HeartPulse, Stethoscope, Camera } from "lucide-react";

export default function ClinicsPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: { title: "Klinik Otonomisi", subtitle: "Gece Gelen Leadleri Satışa Dönüştürün", desc: "Aura OS, kliniğinize gelen her lead'i 0.4 saniye içinde yakalar.", features: [{ title: "Surgical Vision™", desc: "Hastanın gönderdiği görselleri analiz eder.", icon: <Camera /> }, { title: "Gece Lead Kurtarma", desc: "Siz uyurken gelen leadleri sıcak tutar.", icon: <Clock /> }, { title: "HMS Entegrasyonu", desc: "Mevcut sisteminize tam entegre.", icon: <HeartPulse /> }] },
        en: { title: "Clinic Autonomy", subtitle: "Convert Night Leads into Sales", desc: "Aura OS captures every lead in 0.4 seconds.", features: [{ title: "Surgical Vision™", desc: "Analyzes patient photos.", icon: <Camera /> }, { title: "Night Lead Recovery", desc: "Keeps leads warm while you sleep.", icon: <Clock /> }, { title: "HMS Integration", desc: "Full sync with your current system.", icon: <HeartPulse /> }] },
        ar: { title: "استقلالية العيادة", subtitle: "تحويل العملاء الليليين إلى مبيعات", desc: "أورا أوس تلتقط كل عميل محتمل في 0.4 ثانية.", features: [{ title: "Surgical Vision™", desc: "يحلل صور المرضى.", icon: <Camera /> }, { title: "تعافي العملاء الليليين", desc: "يبقي العملاء نشطين أثناء نومك.", icon: <Clock /> }, { title: "تكامل HMS", desc: "مزامنة كاملة مع نظامك الحالي.", icon: <HeartPulse /> }] }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-60 pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <div className="space-y-12">
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white">
                                {t.title}
                            </motion.h1>
                            <p className="text-3xl font-black text-indigo-400 italic">"{t.subtitle}"</p>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium">{t.desc}</p>
                            <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all">Ücretsiz Analiz Al</button>
                        </div>
                        <div className="relative">
                            <img src="/images/patient_ui.png" alt="Clinic Dashboard" className="rounded-[4rem] border border-white/10 shadow-3xl" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {t.features.map((f, i) => (
                            <div key={i} className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
                                <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8">{f.icon}</div>
                                <h3 className="text-3xl font-black mb-6 uppercase text-white">{f.title}</h3>
                                <p className="text-slate-400 text-lg font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
