"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Globe, Layers, BarChart3, TrendingUp, Zap, ChevronRight, Cpu, Shield } from "lucide-react";

export default function AgenciesGodModePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "AGENCY DOMINANCE • V11.0",
            title: "Küresel\nAcente Ağı.",
            subtitle: "Acente Karargahı: Sınırsız sayıda klinik hesabını tek bir otonom ağ üzerinden yönetin. Tüm finansal hakedişleri ve komisyon akışını 12ms hızında simüle edin.",
            bento: [
                { title: "Multi-Account Nexus", desc: "Zayıf ve yavaş CRM'leri tarihe gömün. Tüm partner kliniklerinizi tek bir global ekrandan yönetin.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "Hangi hastanın operasyonu gerçekleştiğini anlık görün, hakedişinizi saniyeler içinde şeffafça hesaplayın.", icon: <BarChart3 size={24} /> }
            ]
        },
        en: {
            tag: "AGENCY DOMINANCE • V11.0",
            title: "Global\nAgency Network.",
            subtitle: "Agency Command: Manage unlimited clinical accounts via a single autonomous network. Simulate all financial payouts and commission flows in 12ms.",
            bento: [
                { title: "Multi-Account Nexus", desc: "Bury weak and slow CRMs in history. Manage all partner clinics from one global interface.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "See which patient operations are completed instantly, calculate your commissions transparently in seconds.", icon: <BarChart3 size={24} /> }
            ]
        },
        ar: {
            tag: "AGENCY DOMINANCE • V11.0",
            title: "شبكة\nالوكالات العالمية.",
            subtitle: "قيادة الوكالات: قم بإدارة حسابات عيادات غير محدودة عبر شبكة مستقلة واحدة. محاكاة جميع المدفوعات المالية وتدفقات العمولات في 12 مللي ثانية.",
            bento: [
                { title: "Multi-Account Nexus", desc: "ادفن أنظمة CRM الضعيفة والبطيئة في التاريخ. قم بإدارة جميع العيادات الشريكة من واجهة عالمية واحدة.", icon: <Layers size={24} /> },
                { title: "Revenue Transparency", desc: "اطلع على العمليات المكتملة فوراً، واحسب عمولاتك بشفافية في ثوانٍ.", icon: <BarChart3 size={24} /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Background density fills */}
                <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-emerald-500/[0.01] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1600px] mx-auto">
                    {/* Header Section */}
                    <div className="mb-40 space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-emerald-500/20">
                            <Globe size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">
                            {t.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-emerald-500/80 italic border-l-2 border-emerald-500/20 pl-10 max-w-4xl">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* 3D Visual & Info Grid */}
                    <div className="grid lg:grid-cols-12 gap-20 items-center mb-60">
                        <div className="lg:col-span-12 xl:col-span-5 space-y-12 order-2 xl:order-1">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10">{t.bento[0].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.bento[0].title}</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">{t.bento[0].desc}</p>
                            <button className="glass-btn px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 flex items-center gap-4 group">
                                NETWORK STATUS <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="lg:col-span-12 xl:col-span-7 relative group order-1 xl:order-2">
                            <motion.div initial={{ rotateY: -20, scale: 0.95 }} whileInView={{ rotateY: 15, scale: 1 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-black/40 p-8 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img src="/images/agency_command.png" alt="" className="w-full h-auto brightness-75 group-hover:brightness-100" />
                            </motion.div>
                        </div>
                    </div>

                    {/* High-End Feature Card */}
                    <div className="p-20 md:p-32 rounded-[6rem] bg-white/[0.01] border border-white/10 flex flex-col xl:flex-row items-center gap-20 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex-1 space-y-10 relative z-10">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/5">{t.bento[1].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.bento[1].title}</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">{t.bento[1].desc}</p>
                        </div>
                        <div className="w-full lg:w-[500px] p-16 bg-black/60 rounded-[4rem] border border-white/5 text-center relative overflow-hidden shadow-3xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                            <div className="text-[10px] font-black tracking-[0.8em] text-emerald-400 uppercase mb-8 opacity-60">Live Commission Pulse</div>
                            <div className="text-7xl font-bold text-white tracking-tighter">$42,910.40</div>
                            <div className="mt-16 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 2 }} className="h-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final God-Mode Footnote */}
            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <div className="flex justify-center gap-8 mb-8 opacity-20">
                    <Shield size={32} />
                    <Cpu size={32} />
                    <TrendingUp size={32} />
                </div>
                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white uppercase italic tracking-tighter hover:text-emerald-400 transition-colors">WWW.NEXTORIADIGITAL.COM</a>
            </section>
        </AuraLayout>
    );
}
