"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Radio, Zap, Brain, Workflow, Server, Activity, ChevronRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedNumber from "@/components/AnimatedNumber";

export default function TechGodModePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "INFRASTRUCTURE ALPHA • V11.0",
            title: "Otonom\nMimari.",
            subtitle: "Aura OS bir araç değildir; 120,000+ operasyonel veri setiyle eğitilmiş, otonom bir nöral ağdır. Rakiplerin aksine, biz sadece arayüz sunmuyoruz, zekayı sunuyoruz.",
            grid: [
                { title: "Nex-Scan™ Neural Vision", desc: "Tıbbi verileri ve hasta niyetini 0.1mm hassasiyetle analiz eden otonom görme katmanı.", icon: <Cpu /> },
                { title: "Closing Protocol 11.0", desc: "Lead niyetini 12ms hızında analiz ederek satışı otonom kapatan God-Mode protokolü.", icon: <Zap /> }
            ]
        },
        en: {
            tag: "INFRASTRUCTURE ALPHA • V11.0",
            title: "Autonomous\nArchitecture.",
            subtitle: "Aura OS is not a tool; it's an autonomous neural network trained on 120,000+ operational datasets. Unlike others, we don't just provide an interface; we provide intelligence.",
            grid: [
                { title: "Nex-Scan™ Neural Vision", desc: "Autonomous vision layer analyzing medical data and patient intent with 0.1mm precision.", icon: <Cpu /> },
                { title: "Closing Protocol 11.0", desc: "God-Mode protocol that autonomously closes sales by analyzing intent in 12ms.", icon: <Zap /> }
            ]
        },
        ar: {
            tag: "INFRASTRUCTURE ALPHA • V11.0",
            title: "بنية\nمستقلة.",
            subtitle: "أورا أوس ليس مجرد أداة؛ بل هو شبكة عصبية مستقلة مدربة على أكثر من 120 ألف مجموعة بيانات. على عكس الآخرين، نحن لا نقدم واجهة فحسب، بل نقدم ذكاءً.",
            grid: [
                { title: "Nex-Scan™ Neural Vision", desc: "طبقة رؤية مستقلة تحلل البيانات الطبية ونوايا المريض بدقة 0.1 مم.", icon: <Cpu /> },
                { title: "Closing Protocol 11.0", desc: "بروتوكول God-Mode يغلق المبيعات ذاتياً من خلال تحلیل النية في 12 مللي ثانية.", icon: <Zap /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <img src="/images/aura_secure_tech.png" alt="" className="w-full h-full object-cover filter grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                </div>

                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Cpu size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                        <p className="text-2xl md:text-3xl text-slate-500 font-bold max-w-4xl italic">"{t.subtitle}"</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-40">
                        {t.grid.map((item, i) => (
                            <div key={i} className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-teal-500/30 transition-all group flex flex-col justify-between min-h-[500px] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="space-y-10 relative z-10">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 border border-white/10 shadow-2xl group-hover:bg-[#00F0FF] group-hover:text-black transition-all">{item.icon}</div>
                                    <h3 className="text-4xl font-bold uppercase text-white tracking-tighter italic">{item.title}</h3>
                                    <p className="text-2xl text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                                <div className="text-[120px] font-black text-white/[0.02] select-none leading-none absolute -bottom-10 -right-10">0{i + 1}</div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Spec Matrix: High Density */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "SYNC SPEED", val: 12, suffix: "ms", icon: <Zap /> },
                            { label: "AI TRAINING", val: 120540, suffix: "+", icon: <Brain /> },
                            { label: "ENCRYPTION", val: 256, prefix: "AES-", icon: <Shield /> },
                            { label: "CORE VERSION", val: 11, prefix: "ALPHA ", icon: <Server /> }
                        ].map((s, idx) => (
                            <div key={idx} className="p-12 rounded-[2rem] bg-black/40 border border-white/5 text-center space-y-4 group hover:bg-[#00F0FF] transition-all cursor-crosshair">
                                <div className="text-teal-500 group-hover:text-black flex justify-center">{s.icon}</div>
                                <div className="text-4xl font-bold text-white group-hover:text-black">
                                    <AnimatedNumber
                                        value={s.val}
                                        prefix={s.prefix}
                                        suffix={s.suffix}
                                        format={idx === 1}
                                    />
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-700 group-hover:text-black/60">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 mb-4">POWERED BY NEXTORIA DIGITAL</p>
                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white uppercase italic tracking-tighter hover:text-teal-400 transition-colors">WWW.NEXTORIADIGITAL.COM</a>
            </section>
        </AuraLayout>
    );
}
