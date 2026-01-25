"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Radio, Zap, Fingerprint, LucideIcon, Server, Database, Workflow, Activity, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function TechnologyPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "TEKNOLOJİK ÇEKİRDEK",
            subtitle: "Nex-Scan™ & Neural Alpha Mimarisi",
            desc: "Aura OS, standart bir AI değil; 120,000'den fazla başarılı sağlık operasyonu verisiyle eğitilmiş otonom bir bilişsel katmandır. Dünyada cerrahi niyet analizi ile finansal kapanışı saniyeler içinde birleştiren tek motordur.",
            tech: [
                { title: "Nex-Scan™ Vision", desc: "Hastanın gönderdiği medikal fotoğrafları 0.1mm hassasiyetle dijital olarak analiz ederek cerrahi olasılık raporu hazırlar.", icon: Cpu },
                { title: "Neural Messaging", desc: "WhatsApp ve Instagram üzerinden gelen mesajları kültürel tonlama ve ikna dillerine göre otonom yönetir.", icon: Radio },
                { title: "Closing Protocol", desc: "En kritik anda, insan müdahalesi olmadan depozito tahsilatını Stripe altyapısıyla gerçekleştirir.", icon: Zap }
            ]
        },
        en: {
            title: "TECHNOLOGICAL CORE",
            subtitle: "Nex-Scan™ & Neural Alpha Architecture",
            desc: "Aura OS is not a standard AI; it's an autonomous cognitive layer trained on 120,000+ medical operations. It's the only engine in the world combining surgical intent analysis with financial closing in seconds.",
            tech: [
                { title: "Nex-Scan™ Vision", desc: "Analyzes patient photos with 0.1mm precision to generate surgical possibility reports.", icon: Cpu },
                { title: "Neural Messaging", desc: "Autonomously manages messages over WhatsApp/Instagram based on cultural tone and persuasion styles.", icon: Radio },
                { title: "Closing Protocol", desc: "Collects deposits via Stripe at the critical moment, without human intervention.", icon: Zap }
            ]
        },
        ar: {
            title: "النواة التكنولوجية",
            subtitle: "Nex-Scan™ & Neural Alpha هندسة",
            desc: "أورا أوس ليس ذكاءً اصطناعياً عادياً؛ بل طبقة معرفية مستقلة مدربة على أكثر من 120 ألف عملية صحية. إنه المحرك الوحيد في العالم الذي يجمع بين تحليل النوايا الجراحية والإغلاق المالي في ثوانٍ.",
            tech: [
                { title: "Nex-Scan™ Vision", desc: "يحلل صور المرضى بدقة 0.1 مم لإنشاء تقارير الاحتمالات الجراحية.", icon: Cpu },
                { title: "Neural Messaging", desc: "يدير الرسائل عبر WhatsApp / Instagram بناءً على النبرة الثقافية وأساليب الإقناع ذاتياً.", icon: Radio },
                { title: "Closing Protocol", desc: "تحصيل الودائع عبر Stripe في اللحظة الحرجة دون تدخل بشري.", icon: Zap }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-40 space-y-8">
                        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none uppercase italic">{t.title}</h1>
                        <p className="text-2xl md:text-4xl font-black text-indigo-500 italic">"{t.subtitle}"</p>
                        <p className="text-2xl text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">{t.desc}</p>
                    </div>

                    <div className="grid gap-12">
                        {t.tech.map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-16 p-16 rounded-[6rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-700 group">
                                <div className="w-40 h-40 bg-indigo-600/10 rounded-[3rem] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-3xl">
                                    <item.icon size={80} />
                                </div>
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-4xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                                    <p className="text-2xl text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="hidden lg:block text-[200px] font-black text-white/[0.02] select-none leading-none">0{i + 1}</div>
                            </div>
                        ))}
                    </div>

                    {/* Animated Spec Grid */}
                    <div className="mt-40 grid md:grid-cols-4 gap-8">
                        {[
                            { label: "LATENCY", val: "< 0.4s", icon: Zap },
                            { label: "ENCRYPTION", val: "AES-256", icon: Server },
                            { label: "UPTIME", val: "99.99%", icon: Activity },
                            { label: "AI MODEL", val: "AURA V8", icon: Brain }
                        ].map(s => (
                            <div key={s.label} className="p-12 rounded-[3.5rem] bg-indigo-950/10 border border-white/5 text-center space-y-4">
                                <div className="text-indigo-500 flex justify-center"><s.icon size={32} /></div>
                                <div className="text-4xl font-black text-white">{s.val}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
