"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Layers, TrendingUp, BarChart3, Zap, Globe, Cpu, ArrowUpRight, Workflow } from "lucide-react";

export default function AgenciesPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "AGENCY INTELLIGENCE • 9.0",
            title: "Leadleriniz Çöp Olmasın.",
            subtitle: "Hangi hastanın tedavi olduğunu görün, komisyonunuzu anlık takip edin.",
            bento: [
                { title: "Multi-Tenant Nexus", desc: "Sınırsız sayıda klinik hesabını ve agent'ı tek bir 'Karargah' üzerinden yönetin.", icon: <Layers /> },
                { title: "Lead Auction Engine", desc: "Gelen her lead için kalite puanlaması yapar ve en uygun kliniğe otonom atar.", icon: <TrendingUp /> },
                { title: "Alpha Accounting", desc: "Komisyon ve hakediş dağıtımlarını otonom olarak muhasebeleştirin.", icon: <BarChart3 /> }
            ]
        },
        en: {
            tag: "AGENCY INTELLIGENCE • 9.0",
            title: "No More Wasted Leads.",
            subtitle: "See which patient got treated, track your commission instantly.",
            bento: [
                { title: "Multi-Tenant Nexus", desc: "Manage unlimited clinic accounts and agents through a single 'Command Center'.", icon: <Layers /> },
                { title: "Lead Auction Engine", desc: "Scores each lead and autonomously assigns it to the most suitable clinic.", icon: <TrendingUp /> },
                { title: "Alpha Accounting", desc: "Autonomously account for commissions and payment distributions.", icon: <BarChart3 /> }
            ]
        },
        ar: {
            tag: "AGENCY INTELLIGENCE • 9.0",
            title: "لا مزيد من العملاء الضائعين.",
            subtitle: "تعرف على المريض الذي تلقى العلاج، وتتبع عمولتك على الفور.",
            bento: [
                { title: "Multi-Tenant Nexus", desc: "إدارة حسابات ووكلاء عيادات غير محدودة من خلال 'مركز قيادة' واحد.", icon: <Layers /> },
                { title: "Lead Auction Engine", desc: "يقيم كل عمil ويخصصه تلقائياً للعيادة الأكثر ملاءمة.", icon: <TrendingUp /> },
                { title: "Alpha Accounting", desc: "محاسبة ذاتية للعمولات وتوزيعات المدفوعات.", icon: <BarChart3 /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    {/* Hero */}
                    <div className="mb-40 space-y-12 max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-emerald-500/20">
                            <Globe size={14} /> {t.tag}
                        </div>
                        <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase italic leading-[0.85] drop-shadow-3xl">
                            {t.title}
                        </motion.h1>
                        <p className="text-3xl font-black text-emerald-500 italic">"{t.subtitle}"</p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 p-12 rounded-[4rem] bg-emerald-500 text-black space-y-8 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
                                {t.bento[1].icon}
                            </div>
                            <h3 className="text-4xl font-black uppercase leading-tight">{t.bento[1].title}</h3>
                            <p className="text-xl font-bold opacity-80">{t.bento[1].desc}</p>
                        </div>

                        <div className="lg:col-span-8 p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all group overflow-hidden relative">
                            <div className="relative z-10 space-y-8">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                    {t.bento[0].icon}
                                </div>
                                <h3 className="text-5xl font-black uppercase text-white tracking-tight">{t.bento[0].title}</h3>
                                <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">{t.bento[0].desc}</p>
                            </div>
                            <img src="/images/agency_command.png" alt="" className="absolute -bottom-20 -right-20 w-1/2 opacity-20 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        </div>

                        <div className="lg:col-span-12 p-16 rounded-[4rem] bg-zinc-900 border border-white/5 flex flex-col md:flex-row items-center gap-16 group">
                            <div className="flex-1 space-y-8">
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-emerald-400">
                                    {t.bento[2].icon}
                                </div>
                                <h3 className="text-5xl font-black uppercase text-white tracking-tight">{t.bento[2].title}</h3>
                                <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">{t.bento[2].desc}</p>
                            </div>
                            <div className="w-full md:w-1/3 bg-black/40 p-8 rounded-[3rem] border border-white/10 text-center">
                                <div className="text-[10px] font-black tracking-widest text-emerald-500 uppercase mb-4">Live Commission Stream</div>
                                <div className="text-5xl font-black text-white">$12,450.00</div>
                                <div className="mt-8 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} className="h-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
