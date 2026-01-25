"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Layers, TrendingUp, BarChart3, Zap, Globe, Cpu, ArrowUpRight, Workflow, ChevronRight } from "lucide-react";

export default function AgenciesPrestigePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "AGENCY LEADERSHIP • V10.0",
            title: "Finansal Şeffaflık\nve Ölçekleme.",
            subtitle: "Acente Karargahı: Sınırsız sayıda klinik hesabını tek bir otonom ağ üzerinden yönetin ve komisyon akışını saniyeler içinde takip edin.",
            bento: [
                { title: "Multi-Account Nexus", desc: "Zayıf CRM'leri bırakın. Tüm partner kliniklerinizi tek bir global ekrandan yönetin.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "Hangi hastanın operasyonu gerçekleştiğini anlık görün, hakedişinizi saniyeler içinde hesaplayın.", icon: <BarChart3 size={24} /> }
            ]
        },
        en: {
            tag: "AGENCY LEADERSHIP • V10.0",
            title: "Financial Transparency\nand Scaling.",
            subtitle: "Agency Command: Manage unlimited clinical accounts via a single autonomous network and track commission flows in seconds.",
            bento: [
                { title: "Multi-Account Nexus", desc: "Leave weak CRMs behind. Manage all partner clinics from one global interface.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "See which operations are completed instantly, calculate your commissions in seconds.", icon: <BarChart3 size={24} /> }
            ]
        },
        ar: {
            tag: "AGENCY LEADERSHIP • V10.0",
            title: "الشفافية المالية\nوالتوسع.",
            subtitle: "قيادة الوكالات: قم بإدارة حسابات عيادات غير محدودة عبر شبكة مستقلة واحدة وتتبع تدفقات العمولات في ثوانٍ.",
            bento: [
                { title: "Multi-Account Nexus", desc: "اترك أنظمة CRM الضعيفة وراءك. قم بإدارة جميع العيادات الشريكة من واجهة عالمية واحدة.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "اطلع على العمليات المكتملة فوراً، واحسب عمولاتك في ثوانٍ.", icon: <BarChart3 size={24} /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505] overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header: Global Domination Tone */}
                    <div className="mb-40 space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-emerald-500/20">
                            <Globe size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">
                            {t.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-emerald-500/80 italic border-l border-emerald-500/20 pl-10 max-w-4xl">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Asymmetrical 3D Visual Section */}
                    <div className="grid lg:grid-cols-12 gap-20 items-center mb-60">
                        <div className="lg:col-span-5 space-y-12">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">{t.bento[0].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.bento[0].title}</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">{t.bento[0].desc}</p>
                            <button className="glass-btn px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 flex items-center gap-4">
                                NETWORK STATUS <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="lg:col-span-7 relative group">
                            <motion.div initial={{ rotateY: -15, scale: 0.95 }} whileInView={{ rotateY: 20, scale: 1 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.15)] bg-black/40 p-8">
                                <img src="/images/agency_command.png" alt="" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Full Width Revenue Stream simulation */}
                    <div className="p-20 md:p-32 rounded-[6rem] bg-zinc-900 border border-white/5 flex flex-col md:flex-row items-center gap-20 group">
                        <div className="flex-1 space-y-10">
                            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400">{t.bento[1].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.bento[1].title}</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">{t.bento[1].desc}</p>
                        </div>
                        <div className="w-full md:w-[400px] p-12 bg-black/60 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                            <div className="text-[10px] font-black tracking-[0.6em] text-emerald-500 uppercase mb-6 opacity-60">Live Commission Pulse</div>
                            <div className="text-6xl font-black text-white">$42,910.40</div>
                            <div className="mt-12 h-1 bg-white/10 rounded-full">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 2 }} className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
