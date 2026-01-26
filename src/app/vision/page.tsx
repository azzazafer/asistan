"use client";

import React from "react";
import AuraLayout from "@/components/AuraLayout";
import { Compass, Target, Globe, ArrowUpRight, Shield, Cpu, Eye, Zap, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function VisionGodModePage() {
    return (
        <AuraLayout>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Visual Backdrop */}
                <div className="absolute top-[30%] left-[-10%] w-[120%] h-[120%] bg-[#00F0FF]/[0.01] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1400px] mx-auto space-y-60">

                    {/* --- INTRO: THE MANIFESTO --- */}
                    <div className="space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.8em] border border-white/5">
                            <Eye size={14} /> INFINITE VISION • V12
                        </motion.div>
                        <h1 className="text-6xl md:text-[11rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic font-space">
                            Yönetim<br />
                            <span className="text-[#00F0FF]">Bilinci.</span>
                        </h1>
                    </div>

                    {/* --- LARGE QUOTE / MISSION --- */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative p-12 md:p-32 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-6xl font-bold text-white italic leading-[1.1] tracking-tight font-space"
                            >
                                "Aura OS misyonu; medikal turizm ve fintech süreçlerini pasif araçlar olmaktan çıkarıp, kurumların <b>otonom yönetim bilinci</b> haline getirmektir."
                            </motion.p>
                        </div>
                    </div>

                    {/* --- VIZYON & STRATEJI --- */}
                    <div className="grid lg:grid-cols-2 gap-20">
                        <article className="space-y-12">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-white/10"><Target size={32} /></div>
                            <h2 className="text-5xl font-bold uppercase italic text-white tracking-tighter font-space">Vizyon</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-2 border-[#00F0FF]/20 pl-10">
                                Dünyadaki her 3 başarılı sağlık operasyonundan birinin Aura OS sinir ağları tarafından yönetildiği bir gelecek inşa ediyoruz.
                            </p>
                        </article>

                        <article className="space-y-12 lg:mt-40">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-white/10"><Wind size={32} /></div>
                            <h2 className="text-5xl font-bold uppercase italic text-white tracking-tighter font-space">Strateji</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed italic border-l-2 border-[#00F0FF]/20 pl-10">
                                Operasyonel mükemmeliyeti, otonom yapay zeka ve fintech entegrasyonu ile birleştirerek küresel bir standart oluşturmak.
                            </p>
                        </article>
                    </div>

                    {/* --- CORE VALUES --- */}
                    <div className="pt-20 border-t border-white/5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            {[
                                { label: "Hız", val: "12ms" },
                                { label: "Doğruluk", val: "%99.9" },
                                { label: "Kontrol", val: "Otonom" },
                                { label: "Mimari", val: "Alpha" }
                            ].map((v, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">{v.label}</div>
                                    <div className="text-3xl font-bold text-white font-space italic">{v.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL SIGNATURE --- */}
            <footer className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <div className="text-[10px] font-black uppercase tracking-[1em] text-slate-800 mb-8">NEXTORIA ALPHA DIVISION • 2024</div>
                <div className="flex justify-center gap-12 opacity-20 mb-8">
                    <Shield size={24} />
                    <Cpu size={24} />
                    <Zap size={24} />
                </div>
            </footer>
        </AuraLayout>
    );
}
