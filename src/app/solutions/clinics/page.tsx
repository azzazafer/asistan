"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Clock, HeartPulse, Camera, Zap, Shield, ArrowUpRight } from "lucide-react";

export default function ClinicsPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "KLİNİK OTONOMİSİ",
            subtitle: "Gece Gelen Leadleri Nakit Akışına Dönüştürün",
            heroDesc: "Aura OS, kliniğinize gelen her lead'i 0.4 saniye içinde yakalar. Chatbotlardan farklı olarak; hastanın fotoğrafını analiz eder, medikal geçmişini sorgular ve operasyon niyet puanlaması yaparak depozitoyu otonom olarak tahsil eder.",
            sections: [
                {
                    title: "Nex-Scan™ Cerrahi Triaş",
                    desc: "Hastanın gönderdiği medikal fotoğrafları (Diş, Saç, Estetik) Aura'nın eğitilmiş görme yeteneği ile analiz edin. Hangi hastanın 'Ready-to-Close' olduğunu anında görün.",
                    icon: <Camera />
                },
                {
                    title: "Autonomic Night-Shift",
                    desc: "Siz uyurken gelen Avrupa ve Orta Doğu kaynaklı leadleri otonom olarak sıcak tutun. Aura, hastanın ana dilinde tıbbi konsültasyon yapar ve ödemeyi saniyeler içinde alır.",
                    icon: <Clock />
                },
                {
                    title: "HMS & CRM Alpha Sync",
                    desc: "Mevcut klinik yönetim sisteminizle (HMS) kusursuz entegrasyon. Veri sızıntısı yok, manuel giriş yok, hata yok.",
                    icon: <HeartPulse />
                }
            ]
        },
        en: {
            title: "CLINIC AUTONOMY",
            subtitle: "Convert Night Leads into Cash Flow",
            heroDesc: "Aura OS captures every lead in 0.4 seconds. Unlike chatbots, it analyzes photos, queries medical history, and autonomously collects deposits by scoring intent.",
            sections: [
                {
                    title: "Nex-Scan™ Surgical Triage",
                    desc: "Analyze patient photos with Aura's trained vision. Instantly identify 'Ready-to-Close' patients.",
                    icon: <Camera />
                },
                {
                    title: "Autonomic Night-Shift",
                    desc: "Keep leads warm while you sleep. Aura performs medical consultation in the patient's native language and collects payments instantly.",
                    icon: <Clock />
                },
                {
                    title: "HMS & CRM Alpha Sync",
                    desc: "Seamless integration with your HMS. No data leaks, no manual entry, no errors.",
                    icon: <HeartPulse />
                }
            ]
        },
        ar: {
            title: "استقلالية العيادة",
            subtitle: "تحويل العملاء الليليين إلى تدفق نقدي",
            heroDesc: "أورا أوس يلتقط كل عميل محتمل في 0.4 ثانية. على عكس الروبوتات، فإنه يحلل الصور، ويستعلم عن التاريخ الطبي، ويحصل الودائع ذاتياً.",
            sections: [
                {
                    title: "Nex-Scan™ الترياج الجراحي",
                    desc: "تحليل صور المرضى من خلال رؤية أورا المدربة. تعرف فوراً على المرضى المستعدين للإغلاق.",
                    icon: <Camera />
                },
                {
                    title: "Autonomic Night-Shift",
                    desc: "حافظ على حيوية العملاء أثناء نومك. تقوم أورا بالاستشارة الطبية بلغتهم وتحصيل المدفوعات.",
                    icon: <Clock />
                },
                {
                    title: "HMS & CRM Alpha Sync",
                    desc: "تكامل سلس مع نظام إدارة العيادات الخاص بك. لا تسريب للبيانات، لا إدخال يدوي، لا أخطاء.",
                    icon: <HeartPulse />
                }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-60">
                        <div className="space-y-12">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-indigo-500/20">
                                <Zap size={14} /> NEXTORIA OMEGA • CLINIC
                            </div>
                            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                                {t.title}
                            </motion.h1>
                            <p className="text-3xl font-black text-indigo-500 italic">"{t.subtitle}"</p>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium max-w-2xl">{t.heroDesc}</p>
                            <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-2xl">ALPHA ERİŞİMİ AL</button>
                                <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">DEMO TALEBİ</button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-600/30 blur-[150px] rounded-full animate-pulse" />
                            <img src="/images/patient_ui.png" alt="Clinical Dashboard" className="relative z-10 rounded-[5rem] border border-white/10 shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {t.sections.map((sec, i) => (
                            <div key={i} className="p-16 rounded-[5rem] bg-indigo-950/10 border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-900/10 transition-all duration-700 space-y-8 group">
                                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                                    {sec.icon}
                                </div>
                                <h3 className="text-3xl font-black uppercase text-white tracking-tight">{sec.title}</h3>
                                <p className="text-xl text-slate-400 font-medium leading-relaxed">{sec.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-60 p-20 rounded-[5rem] bg-[#020202] border border-white/5 text-center space-y-12">
                        <Shield className="mx-auto text-indigo-500" size={64} />
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">SURGICAL-GRADE VERİ GÜVENLİĞİ</h2>
                        <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium italic">"Aura OS, klinik verilerinizi Sovereign AI prensibiyle korur. Verileriniz modellere satılmaz, sızdırılmaz ve en güçlü HIPAA protokolleriyle saklanır."</p>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
