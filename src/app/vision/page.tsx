"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Compass, Target, Globe, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionPrestigePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "GLOBAL VISION • V10.0",
            title: "Yönetim\nBilinci.",
            mission: "Aura OS misyonu; sağlık teknolojilerini pasif birer araç olmaktan çıkarıp, kurumların otonom yönetim bilinci haline getirmektir.",
            vision: "Dünyadaki her 3 başarılı sağlık operasyonundan birinin Aura OS sinir ağları tarafından yönetildiği bir gelecek."
        },
        en: {
            tag: "GLOBAL VISION • V10.0",
            title: "Operational\nConsciousness.",
            mission: "Aura OS mission is to transform healthcare technologies into autonomous management consciousness for institutions.",
            vision: "A future where 1 out of every 3 global healthcare operations is managed by Aura OS neural networks."
        },
        ar: {
            tag: "GLOBAL VISION • V10.0",
            title: "وعي\nالإدارة.",
            mission: "مهمة أورا أوس هي تحويل تكنولوجيات الرعاية الصحية إلى وعي إداري مستقل للمؤسسات.",
            vision: "مستقبل تدار فيه واحدة من كل 3 عمليات رعاية صحية عالمية بواسطة شبكات أورا أوس العصبية."
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Globe size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-20 mb-60">
                        <div className="lg:col-span-12 relative group rounded-[4rem] overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-black/60 z-10" />
                            <img src="/images/global_nexus.png" alt="" className="w-full h-auto object-cover opacity-40 group-hover:scale-105 transition-transform duration-[4000ms] grayscale" />
                            <div className="absolute inset-0 z-20 flex flex-col justify-center p-20 max-w-4xl">
                                <p className="text-4xl md:text-6xl font-bold text-teal-400 italic leading-tight">"{t.mission}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="p-16 rounded-[4rem] bg-indigo-950/5 border border-white/5 space-y-10 group hover:border-teal-500/20 transition-all">
                            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-teal-400"><Target size={30} /></div>
                            <h2 className="text-4xl font-bold uppercase text-white tracking-tighter italic">Vizyon</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">"{t.vision}"</p>
                        </div>
                        <div className="p-16 rounded-[4rem] bg-teal-950/5 border border-white/5 space-y-10 group hover:border-teal-500/20 transition-all mt-12 lg:mt-32">
                            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-teal-400"><Compass size={30} /></div>
                            <h2 className="text-4xl font-bold uppercase text-white tracking-tighter italic">Strateji</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">Pazar liderliğini operasyonel kusursuzlukla inşa etmek.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
