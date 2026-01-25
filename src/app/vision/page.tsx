"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Compass, Target, Award, Workflow, ArrowUpRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "VISION 2026 • 9.0 ALPHA",
            title: "Yönetim Bilinci.",
            mission: "Aura OS misyonu; sağlık teknolojilerini pasif birer 'araç' olmaktan çıkarıp, kurumların otonom 'yönetim bilinci' haline getirmektir.",
            vision: "Dünyadaki her 3 başarılı sağlık operasyonundan birinin Aura OS sinir ağları tarafından yönetildiği bir gelecek."
        },
        en: {
            tag: "VISION 2026 • 9.0 ALPHA",
            title: "Management Consciousness.",
            mission: "Aura OS mission is to move healthcare tech from passive 'tools' into an autonomous 'management consciousness' for institutions.",
            vision: "A future where 1 out of every 3 global healthcare operations is managed by Aura OS neural networks."
        },
        ar: {
            tag: "VISION 2026 • 9.0 ALPHA",
            title: "وعي الإدارة.",
            mission: "مهمة أورا أوس هي نقل تكنولوجيا الرعاية الصحية من 'أدوات' سلبية إلى 'وعي إداري' مستقل للمؤسسات.",
            vision: "مستقبل تدار فيه واحدة من كل 3 عمليات رعاية صحية عالمية ناجحة بواسطة شبكات أورا أوس العصبية."
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-40 space-y-12">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-indigo-500/20 mx-auto">
                            <Globe size={14} /> {t.tag}
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none uppercase italic">{t.title}</h1>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-40">
                        <div className="p-16 rounded-[6rem] bg-indigo-950/10 border border-indigo-500/10 space-y-12 hover:bg-indigo-900/10 transition-all group shadow-2xl">
                            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-3xl"><Compass size={40} /></div>
                            <h2 className="text-4xl font-black uppercase text-indigo-400">Misyon</h2>
                            <p className="text-5xl font-black italic text-white leading-[1.1]">"{t.mission}"</p>
                        </div>
                        <div className="p-16 rounded-[6rem] bg-emerald-950/10 border border-emerald-500/10 space-y-12 hover:bg-emerald-900/10 transition-all group shadow-2xl mt-12 lg:mt-32">
                            <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-3xl"><Target size={40} /></div>
                            <h2 className="text-4xl font-black uppercase text-emerald-400">Vizyon</h2>
                            <p className="text-5xl font-black italic text-emerald-400 leading-[1.1]">"{t.vision}"</p>
                        </div>
                    </div>

                    {/* Global Scale Asset */}
                    <div className="relative rounded-[5rem] overflow-hidden border border-white/5 group">
                        <div className="absolute inset-0 bg-black/60 z-10" />
                        <img src="/images/global_nexus.png" alt="Global Network" className="w-full h-[500px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4000ms]" />
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-20">
                            <h3 className="text-6xl font-black text-white uppercase tracking-tighter italic">COGNITIVE DOMINANCE</h3>
                            <p className="text-2xl text-slate-400 font-bold mt-4">Scaling Human Intelligence via Otonom AI.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
