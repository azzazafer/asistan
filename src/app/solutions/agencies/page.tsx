"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Layers, TrendingUp, Cpu, Workflow, ShieldCheck, Database, BarChart3 } from "lucide-react";

export default function AgenciesPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: { title: "Acente Zekası", subtitle: "Multi-Tenant Operasyonel Güç", desc: "Birden fazla kliniği tek bir merkezden yöneten acenteler için tasarlanmış dünyanın tek otonom altyapısı. Aura OS, her lead için bir 'Auction Engine' kurar ve en yüksek verimli kliniğe en sıcak anında leadi teslim eder.", features: [{ title: "Multi-Tenant Hub", desc: "Sınırsız sayıda klinik hesabını tek bir 'Command Center' üzerinden yönetin.", icon: <Layers /> }, { title: "Lead Auction Engine", desc: "Gelen her lead için kalite puanlaması yapar ve operasyonel kapasitesi en uygun kliniğe otonom atar.", icon: <TrendingUp /> }, { title: "Komisyon Takibi", desc: "Satışın kapandığı her operasyonda komisyon ve hakedişleri otonom olarak muhasebeleştirir.", icon: <BarChart3 /> }] },
        en: { title: "Agency Intelligence", subtitle: "Multi-Tenant Operational Power", desc: "The world's only autonomous infrastructure designed for agencies managing multiple clinics from a single hub. Aura OS sets up an 'Auction Engine' for each lead and delivers the lead to the most efficient clinic at its hottest moment.", features: [{ title: "Multi-Tenant Hub", desc: "Manage an unlimited number of clinic accounts through a single 'Command Center'.", icon: <Layers /> }, { title: "Lead Auction Engine", desc: "Scores each incoming lead for quality and autonomously assigns it to the clinic with the most suitable operational capacity.", icon: <TrendingUp /> }, { title: "Commission Tracking", desc: "Autonomously accounts for commissions and entitlements in every operation where a sale is closed.", icon: <BarChart3 /> }] },
        ar: { title: "ذكاء الوكالة", subtitle: "قوة تشغيلية متعددة المستأجرين", desc: "البنية التحتية المستقلة الوحيدة في العالم المصممة للوكالات التي تدير عيادات متعددة من مركز واحد. يقوم Aura OS بإنشاء 'محرك مزاد' لكل عميل محتمل ويسلم العميل المحتمل إلى العيادة الأكثر كفاءة في أنسب وقت.", features: [{ title: "Multi-Tenant Hub", desc: "إدارة عدد غير محدود من حسابات العيادات من خلال 'مركز قيادة' واحد.", icon: <Layers /> }, { title: "Lead Auction Engine", desc: "يقوم بتقييم كل عميل محتمل وارد من حيث الجودة ويخصصه تلقائيًا للعيادة ذات القدرة التشغيلية الأنسب.", icon: <TrendingUp /> }, { title: "تتبع العمولات", desc: "يقوم تلقائيًا بحساب العمولات والمستحقات في كل عملية يتم فيها إغلاق البيع.", icon: <BarChart3 /> }] }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-60 pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <div className="relative order-2 lg:order-1">
                            <img src="/images/agency_command.png" alt="Agency Command Center" className="rounded-[4rem] border border-white/10 shadow-3xl" />
                        </div>
                        <div className="space-y-12 order-1 lg:order-2">
                            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white">
                                {t.title}
                            </motion.h1>
                            <p className="text-3xl font-black text-emerald-400 italic">"{t.subtitle}"</p>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium">{t.desc}</p>
                            <button className="px-12 py-6 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-emerald-700 transition-all shadow-xl">Alpha Erişimi Al</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {t.features.map((f, i) => (
                            <div key={i} className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                                <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8">{f.icon}</div>
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
