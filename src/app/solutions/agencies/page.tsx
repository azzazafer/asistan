"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Layers, TrendingUp, BarChart3, Zap, Globe, Cpu, ArrowUpRight } from "lucide-react";

export default function AgenciesPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "ACENTE ZEKASI",
            subtitle: "Multi-Tenant Operasyonel Hakimiyet",
            heroDesc: "Birden fazla kliniği tek bir merkezden yöneten acenteler için tasarlanmış dünyanın tek otonom altyapısı. Aura OS, her lead için bir 'Auction Engine' kurar ve en yüksek verimli kliniğe en sıcak anında leadi teslim eder.",
            sections: [
                {
                    title: "Multi-Tenant Command Center",
                    desc: "Sınırsız sayıda klinik hesabını ve agent'ı tek bir 'Nexus' üzerinden yönetin. Tüm veri akışını gerçek zamanlı izleyin.",
                    icon: <Layers />
                },
                {
                    title: "Lead Auction Engine",
                    desc: "Gelen her lead için kalite/niyet puanlaması yapar ve operasyonel kapasitesi o an en uygun olan kliniğe otonom olarak atar. Boşa giden lead yok.",
                    icon: <TrendingUp />
                },
                {
                    title: "Automated Alpha Accounting",
                    desc: "Satışın kapandığı her operasyonda komisyon, hakediş ve ödeme dağıtımlarını otonom olarak muhasebeleştirir. İnsan hatasına yer yok.",
                    icon: <BarChart3 />
                }
            ]
        },
        en: {
            title: "AGENCY INTELLIGENCE",
            subtitle: "Multi-Tenant Operational Dominance",
            heroDesc: "The world's only autonomous infrastructure designed for agencies managing multiple clinics. Aura OS sets up an 'Auction Engine' for each lead and delivers it to the most efficient clinic at its hottest moment.",
            sections: [
                {
                    title: "Multi-Tenant Command Center",
                    desc: "Manage unlimited clinic accounts and agents through a single 'Nexus'. Monitor all data flows in real-time.",
                    icon: <Layers />
                },
                {
                    title: "Lead Auction Engine",
                    desc: "Scores each incoming lead for quality/intent and autonomously assigns it to the clinic with the most suitable current capacity. Zero wasted leads.",
                    icon: <TrendingUp />
                },
                {
                    title: "Automated Alpha Accounting",
                    desc: "Autonomously accounts for commissions and payments in every closed sale. No room for human error.",
                    icon: <BarChart3 />
                }
            ]
        },
        ar: {
            title: "ذكاء الوكالة",
            subtitle: "السيادة التشغيلية متعددة المستأجرين",
            heroDesc: "البنية التحتية المستقلة الوحيدة في العالم المصممة للوكالات التي تدير عيادات متعددة. يقوم Aura OS بإنشاء 'محرك مزاد' لكل عميل محتمل ويسلمه إلى العيادة الأكثر كفاءة.",
            sections: [
                {
                    title: "Multi-Tenant Command Center",
                    desc: "إدارة حسابات ووكلاء عيادات غير محدودة من خلال 'نيكسوس' واحد. مراقبة جميع تدفقات البيانات في الوقت الفعلي.",
                    icon: <Layers />
                },
                {
                    title: "Lead Auction Engine",
                    desc: "يقيم كل عميل محتمل من حيث الجودة ويخصصه تلقائياً للعيادة ذات القدرة الأنسب. لا ضياع للعملاء.",
                    icon: <TrendingUp />
                },
                {
                    title: "Automated Alpha Accounting",
                    desc: "محاسبة ذاتية للعمولات والمدفوعات في كل عملية بيع مغلقة. لا مجال للخطأ البشري.",
                    icon: <BarChart3 />
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
                        <div className="relative order-2 lg:order-1 group">
                            <div className="absolute inset-0 bg-emerald-600/20 blur-[150px] rounded-full animate-pulse" />
                            <img src="/images/agency_command.png" alt="Agency Center" className="relative z-10 rounded-[5rem] border border-white/10 shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        </div>
                        <div className="space-y-12 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-emerald-500/20">
                                <Globe size={14} /> NEXTORIA OMEGA • AGENCY
                            </div>
                            <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                                {t.title}
                            </motion.h1>
                            <p className="text-3xl font-black text-emerald-500 italic">"{t.subtitle}"</p>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium max-w-2xl">{t.heroDesc}</p>
                            <button className="px-12 py-6 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all shadow-2xl active:scale-95 flex items-center gap-4">OMNICHANNEL BAŞLAT <ArrowUpRight /></button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {t.sections.map((sec, i) => (
                            <div key={i} className="p-16 rounded-[5rem] bg-emerald-950/10 border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-900/10 transition-all duration-700 space-y-8 group">
                                <div className="w-20 h-20 bg-emerald-600/10 rounded-3xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xl">
                                    {sec.icon}
                                </div>
                                <h3 className="text-3xl font-black uppercase text-white tracking-tight">{sec.title}</h3>
                                <p className="text-xl text-slate-400 font-medium leading-relaxed">{sec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
