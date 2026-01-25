"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Radio, Zap, Fingerprint, Server, Activity, Brain, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export default function TechnologyPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "TECH STACK • 9.0 ALPHA",
            title: "Nex-Scan™ & Neural Alpha.",
            subtitle: "Aura OS bir AI değil; 120,000+ canlı operasyonla eğitilmiş bir sinir ağıdır.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "Hastanın gönderdiği medikal fotoğrafları 0.1mm hassasiyetle analiz eden otonom görme sistemi.", icon: <Cpu /> },
                { title: "Neural Messaging", desc: "Kültürel tonlama ve ikna dillerine göre mesajları otonom yöneten 12ms hızında bir katman.", icon: <Radio /> },
                { title: "Closing Protocol", desc: "Maksimum niyet anında depozitoyu otonom olarak Stripe üzerinden tahsil eder.", icon: <Zap /> }
            ]
        },
        en: {
            tag: "TECH STACK • 9.0 ALPHA",
            title: "Nex-Scan™ & Neural Alpha.",
            subtitle: "Aura OS is not an AI; it's a neural network trained on 120,000+ live operations.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "Autonomous vision system analyzing patient photos with 0.1mm precision.", icon: <Cpu /> },
                { title: "Neural Messaging", desc: "A 12ms layer managing messages based on cultural tone and persuasion logic.", icon: <Radio /> },
                { title: "Closing Protocol", desc: "Autonomously collects deposits via Stripe at the moment of peak intent.", icon: <Zap /> }
            ]
        },
        ar: {
            tag: "TECH STACK • 9.0 ALPHA",
            title: "Nex-Scan™ & Neural Alpha.",
            subtitle: "أورا أوس ليس ذكاءً اصطناعياً؛ بل شبكة عصبية مدربة على أكثر من 120 ألف عملية مباشرة.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "نظام رؤية مستقل يحلل صور المرضى بدقة 0.1 مم.", icon: <Cpu /> },
                { title: "Neural Messaging", desc: "طبقة 12ms تدير الرسائل بناءً على النبرة الثقافية ومنطق الإقناع.", icon: <Radio /> },
                { title: "Closing Protocol", desc: "تحصيل الودائع تلقائياً عبر Stripe في لحظة ذروة النية.", icon: <Zap /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-40 space-y-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-indigo-500/20 mx-auto">
                            <Cpu size={14} /> {t.tag}
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none uppercase italic drop-shadow-3xl">{t.title}</h1>
                        <p className="text-2xl md:text-4xl font-black text-indigo-500 italic">"{t.subtitle}"</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-40">
                        {t.grid.map((item, i) => (
                            <div key={i} className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all group flex flex-col justify-between h-full">
                                <div className="space-y-8">
                                    <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-3xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-4xl font-black uppercase text-white tracking-tight">{item.title}</h3>
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="mt-8 text-[80px] font-black text-white/[0.02] select-none leading-none">0{i + 1}</div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Spec Matrix */}
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { label: "SYNC SPEED", val: "12ms", icon: <Zap /> },
                            { label: "AI TRAINING", val: "120K+", icon: <Brain /> },
                            { label: "RECOVERY", val: "%94", icon: <Activity /> },
                            { label: "UPTIME", val: "99.999%", icon: <Server /> }
                        ].map(s => (
                            <div key={s.label} className="p-12 rounded-[3.5rem] bg-indigo-950/10 border border-white/5 text-center space-y-4 group hover:bg-indigo-600 transition-all cursor-default">
                                <div className="text-indigo-400 group-hover:text-white flex justify-center">{s.icon}</div>
                                <div className="text-4xl font-black text-white">{s.val}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white/60">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
