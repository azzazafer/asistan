"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Orbit, Compass, Target, Globe, ArrowUpRight, Award, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "VİZYON 2026",
            subtitle: "Yönetim Bilincinin Otonom Geleceği",
            mission: "Aura OS misyonu; sağlık teknolojilerini pasif birer 'araç' olmaktan çıkarıp, kurumların otonom 'yönetim bilinci' haline getirmektir.",
            vision: "Dünyadaki her 3 başarılı sağlık operasyonundan birinin Aura OS sinir ağları tarafından yönetildiği bir ekosistem inşa ediyoruz."
        },
        en: {
            title: "VISION 2026",
            subtitle: "The Autonomous Future of Management Consciousness",
            mission: "Aura OS's mission is to move healthcare tech from passive 'tools' to an autonomous 'management consciousness' for institutions.",
            vision: "Building an ecosystem where 1 out of every 3 global health operations is powered by Aura OS neural networks."
        },
        ar: {
            title: "رؤية 2026",
            subtitle: "المستقبل الذاتي لوعي الإدارة",
            mission: "مهمة أورا أوس هي تحويل تكنولوجيا الرعاية الصحية من 'أدوات' سلبية إلى 'وعي إداري' ذاتي للمؤسسات.",
            vision: "بناء نظام بيئي تدار فيه واحدة من كل 3 عمليات صحية عالمية عبر شبكات أورا أوس العصبية."
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-40 space-y-12">
                        <h1 className="text-6xl md:text-[12rem] font-black tracking-tighter text-white leading-none uppercase italic">{t.title}</h1>
                        <div className="flex justify-center flex-col lg:flex-row gap-10">
                            <div className="p-16 rounded-[6rem] bg-indigo-950/10 border border-indigo-500/10 flex-1 space-y-12 hover:bg-indigo-900/10 transition-all group/card">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover/card:scale-110 transition-transform"><Compass /></div>
                                <p className="text-4xl font-black italic text-white leading-tight">"{t.mission}"</p>
                            </div>
                            <div className="p-16 rounded-[6rem] bg-emerald-950/10 border border-emerald-500/10 flex-1 space-y-12 hover:bg-emerald-900/10 transition-all group/card">
                                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover/card:scale-110 transition-transform"><Target /></div>
                                <p className="text-4xl font-black italic text-emerald-400 leading-tight">"{t.vision}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Global Nexus Illustration with Depth */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-indigo-600/15 blur-[200px] rounded-full" />
                        <img src="/images/global_nexus.png" alt="Global Network" className="w-full h-auto rounded-[6rem] border border-white/10 opacity-60 group-hover:opacity-100 transition-all duration-[2000ms] shadow-3xl" />
                        <div className="absolute inset-0 z-20 flex items-center justify-center p-20 text-center">
                            <div className="space-y-6">
                                <h3 className="text-4xl md:text-6xl font-black uppercase text-white shadow-3xl">COGNITIVE DOMINANCE</h3>
                                <p className="text-2xl text-slate-400 font-medium italic">Global Operations • Scaled Autonomously</p>
                            </div>
                        </div>
                    </div>

                    {/* Core Values / Scale */}
                    <div className="mt-40 grid md:grid-cols-2 gap-12">
                        <div className="p-16 rounded-[5rem] bg-[#020202] border border-white/5 space-y-8">
                            <Award className="text-indigo-500" size={60} />
                            <h4 className="text-3xl font-black uppercase text-white">SİSTEMİK MÜKEMMELİYET</h4>
                            <p className="text-xl text-slate-500 font-medium italic leading-relaxed">Hata payını teknolojiyle sıfırlayan, insani sınırları otonom zekayla aşan bir yapı.</p>
                        </div>
                        <div className="p-16 rounded-[5rem] bg-[#020202] border border-white/5 space-y-8">
                            <Workflow className="text-emerald-500" size={60} />
                            <h4 className="text-3xl font-black uppercase text-white">EVRENSEL ENTEGRASYON</h4>
                            <p className="text-xl text-slate-500 font-medium italic leading-relaxed">Dünyadaki tüm dilleri, kültürleri ve ödeme sistemlerini tek bir sinir ağında birleştirme gücü.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
