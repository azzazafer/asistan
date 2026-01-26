"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Compass, Target, Globe, ArrowUpRight, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionGodModePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "GLOBAL VISION • V11.0",
            title: "Yönetim\nBilinci.",
            mission: "Aura OS misyonu; medikal turizm ve fintech süreçlerini pasif araçlar olmaktan çıkarıp, kurumların otonom yönetim bilinci haline getirmektir. Vizyonumuz, pazarın mutlak lideri olmaktır.",
            vision: "Dünyadaki her 3 başarılı sağlık operasyonundan birinin Aura OS sinir ağları tarafından yönetildiği bir gelecek."
        },
        en: {
            tag: "GLOBAL VISION • V11.0",
            title: "Management\nConsciousness.",
            mission: "Aura OS mission is to transform medical tourism and fintech processes from passive tools into an autonomous management consciousness for institutions. Our vision is to be the absolute market leader.",
            vision: "A future where 1 out of every 3 global healthcare operations is managed by Aura OS neural networks."
        },
        ar: {
            tag: "GLOBAL VISION • V11.0",
            title: "وعي\nالإدارة.",
            mission: "مهمة أورا أوس هي تحويل عمليات السياحة العلاجية والتكنولوجيا المالية من أدوات سلبية إلى وعي إداري مستقل للمؤسسات. رؤيتنا هي أن نكون القائد المطلق للسوق.",
            vision: "مستقبل تدار فيه واحدة من كل 3 عمليات رعاية صحية عالمية بواسطة شبكات أورا أوس العصبية."
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-500/[0.01] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Globe size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-20 mb-60">
                        <div className="lg:col-span-12 relative group rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-black/40 min-h-[600px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <img src="/images/aura_revenue_flux.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[4000ms] grayscale brightness-75" />
                            <div className="relative z-20 flex flex-col justify-center p-12 md:p-32 max-w-5xl">
                                <p className="text-3xl md:text-6xl font-bold text-white italic leading-tight drop-shadow-2xl">"{t.mission}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-12 group hover:border-[#00F0FF]/20 transition-all relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 border border-white/10 shadow-xl"><Target size={32} /></div>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold uppercase text-white tracking-tighter italic">Vizyon</h2>
                                <p className="text-2xl text-slate-400 font-medium leading-relaxed">"{t.vision}"</p>
                            </div>
                        </div>

                        <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-12 group hover:border-[#00F0FF]/20 transition-all mt-12 lg:mt-32 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#00F0FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 border border-white/10 shadow-xl"><Compass size={32} /></div>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold uppercase text-white tracking-tighter italic">Strateji</h2>
                                <p className="text-2xl text-slate-400 font-medium leading-relaxed">Operasyonel mükemmeliyeti, otonom yapay zeka ve fintech entegrasyonu ile birleştirerek küresel bir standart oluşturmak.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 mb-4">Aura OS • Alpha Division</p>
                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white uppercase italic tracking-tighter hover:text-teal-400 transition-colors">WWW.NEXTORIADIGITAL.COM</a>
            </section>
        </AuraLayout>
    );
}
