"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Radio, Zap, Brain, Workflow, Server, Activity, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function TechPrestigePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "INFRASTRUCTURE ALPHA • V10.0",
            title: "Teknoloji\nMimarisi.",
            subtitle: "Aura OS bir araç değildir; 120,000+ operasyonel veri setiyle eğitilmiş otonom bir sinir ağıdır.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "Medikal verileri 0.1mm hassasiyetle analiz eden otonom görme katmanı.", icon: <Cpu /> },
                { title: "Neural Closing", desc: "Müşteri niyetini 12ms hızında analiz ederek satışı otonom kapatan protokol.", icon: <Zap /> }
            ]
        },
        en: {
            tag: "INFRASTRUCTURE ALPHA • V10.0",
            title: "Tech\nArchitecture.",
            subtitle: "Aura OS is not a tool; it's an autonomous neural network trained on 120,000+ operational datasets.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "Autonomous vision layer analyzing medical data with 0.1mm precision.", icon: <Cpu /> },
                { title: "Neural Closing", desc: "Protocol that autonomously closes sales by analyzing intent in 12ms.", icon: <Zap /> }
            ]
        },
        ar: {
            tag: "INFRASTRUCTURE ALPHA • V10.0",
            title: "بنية\nالتكنولوجيا.",
            subtitle: "أورا أوس ليس مجرد أداة؛ بل هو شبكة عصبية مستقلة مدربة على أكثر من 120 ألف مجموعة بيانات عملياتية.",
            grid: [
                { title: "Nex-Scan™ Vision", desc: "طبقة رؤية مستقلة تحلل البيانات الطبية بدقة 0.1 مم.", icon: <Cpu /> },
                { title: "Neural Closing", desc: "بروتوكول يغلق المبيعات ذاتياً من خلال تحليل النية في 12 مللي ثانية.", icon: <Zap /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5 mx-auto lg:mx-0">
                            <Cpu size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                        <p className="text-2xl md:text-3xl text-slate-500 font-bold max-w-3xl italic">"{t.subtitle}"</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-40">
                        {t.grid.map((item, i) => (
                            <div key={i} className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-teal-500/30 hover:bg-white/[0.03] transition-all group flex flex-col justify-between min-h-[400px]">
                                <div className="space-y-10">
                                    <div className="w-16 h-16 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 shadow-2xl group-hover:bg-teal-500 group-hover:text-black transition-all">{item.icon}</div>
                                    <h3 className="text-4xl font-bold uppercase text-white tracking-tighter italic">{item.title}</h3>
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="text-[100px] font-black text-white/[0.02] select-none leading-none">0{i + 1}</div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Spec Matrix */}
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { label: "SYNC SPEED", val: "12ms", icon: <Zap /> },
                            { label: "AI TRAINING", val: "120K+", icon: <Brain /> },
                            { label: "LATENCY", val: "0.2ms", icon: <Activity /> },
                            { label: "SERVER MASK", val: "PRESTIGE", icon: <Server /> }
                        ].map(s => (
                            <div key={s.label} className="p-12 rounded-[2rem] bg-black/40 border border-white/5 text-center space-y-4 group hover:bg-teal-500 transition-all cursor-default">
                                <div className="text-teal-500 group-hover:text-black flex justify-center">{s.icon}</div>
                                <div className="text-4xl font-bold text-white group-hover:text-black">{s.val}</div>
                                <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600 group-hover:text-black/60">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
