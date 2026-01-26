"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Clock, Camera, Zap, Shield, ChevronRight, Cpu, Radio, Award, TrendingUp, DollarSign, Activity, Users } from "lucide-react";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function ClinicsGodModePage() {
    return (
        <AuraLayout>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00F0FF]/[0.03] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1400px] mx-auto space-y-40">
                    {/* --- HERO: THE AGGRESSIVE ROI --- */}
                    <div className="space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Activity size={14} /> CLINICAL REVENUE ENGINE
                        </motion.div>
                        <h1 className="text-6xl md:text-[9rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic font-space">
                            Boş Koltuk<br />
                            <span className="text-[#00F0FF]">Maliyetini Sıfırlayın.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-[#B0B0B0] italic border-l-2 border-[#00F0FF]/20 pl-10 max-w-4xl leading-relaxed">
                            Aura OS, klinik kapasitenizi %100 doğrulukla HBYS üzerinden okur. Doluluk oranınız düştüğü an, global reklam ağlarını ve "Scarcity Engine™"i tetikleyerek otonom satışı başlatır.
                        </p>
                    </div>

                    {/* --- THE CALCULATOR MOCKUP --- */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

                        <div className="space-y-10">
                            <div className="inline-block px-4 py-1 bg-[#00F0FF]/10 text-[#00F0FF] text-[8px] font-black tracking-widest uppercase rounded">ROI CALCULATOR ALPHA</div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none font-space">Kaybınızı<br />Hissedin.</h2>
                            <p className="text-lg text-[#B0B0B0] font-medium leading-relaxed">Klinik kapasitenizdeki %10'luk bir boşluk, yıllık ortalama <b>€450,000</b> net ciro kaybı demektir. Aura bu deliği 12ms hızında kapatır.</p>

                            <div className="space-y-6 pt-6">
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-[#00F0FF]/40 transition-all">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#B0B0B0]">Günlük Boş Randevu</span>
                                    <span className="text-2xl font-bold text-white font-space">14</span>
                                </div>
                                <div className="p-6 bg-[#00F0FF]/5 rounded-2xl border border-[#00F0FF]/20 flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#00F0FF]">Potansiyel Geri Kazanım</span>
                                    <span className="text-2xl font-bold text-[#00F0FF] font-space">€12.4K+ <span className="text-[10px] uppercase font-black">/ Gün</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="relative group flex justify-center">
                            <div className="w-full aspect-square max-w-[400px] border border-white/10 rounded-full flex items-center justify-center relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-t-2 border-[#00F0FF] rounded-full opacity-20"
                                />
                                <div className="text-center space-y-4">
                                    <div className="text-8xl font-black text-white tracking-tighter shadow-white">%98</div>
                                    <div className="text-[10px] font-black text-[#00F0FF] tracking-[0.6em] uppercase">VERİMLİLİK SKORU</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- THREE CORE PILLARS --- */}
                    <div className="grid lg:grid-cols-3 gap-10">
                        <PillarCard
                            icon={<Camera className="text-[#00F0FF]" />}
                            title="Nex-Scan™ Triaj"
                            text="Doktorlarınızın vaktini 'çöp lead'lerle harcatmayın. AI, hasta fotoğraflarını saniyeler içinde analiz eder ve operasyon uygunluk raporunu hazırlar."
                        />
                        <PillarCard
                            icon={<Users className="text-[#00F0FF]" />}
                            title="Çok Kanallı Otonomi"
                            text="Londra, Berlin veya Dubai fark etmeksizin; tüm dünyadaki hastalar Aura'nın nöral ağında tekilleşir ve doğru kliniğe otomatik atanır."
                        />
                        <PillarCard
                            icon={<TrendingUp className="text-[#00F0FF]" />}
                            title="Finansal Şeffaflık"
                            text="Kaçan her euroyu takip edin. Stripe Bridge entegrasyonu ile kaporalar doğrudan hesabınıza, komisyonlar ise otonom olarak partnerlere dağıtılır."
                        />
                    </div>
                </div>
            </section>

            {/* --- CTA: OPERASYONEL GÜÇ --- */}
            <section className="py-40 px-6 bg-[#030303] text-center border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold text-white uppercase italic tracking-tighter font-space">Klinik Otonomisine<br />Şimdi Geçin.</h2>
                    <p className="text-xl text-[#B0B0B0] font-medium italic">Aura OS v12.0 Alpha - Sınırlı sayıda elit sağlık kuruluşu için aktif.</p>
                    <button className="px-12 py-5 bg-[#00F0FF] text-black rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:scale-110 shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all">
                        Alpha Giriş Talebi
                    </button>
                </div>
            </section>
        </AuraLayout>
    );
}

function PillarCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 hover:border-[#00F0FF]/20 transition-all group space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity"><Zap size={100} /></div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-white/10 group-hover:scale-110 transition-transform duration-500">{icon}</div>
            <div className="space-y-6">
                <h3 className="text-3xl font-bold uppercase italic text-white tracking-tighter font-space">{title}</h3>
                <p className="text-lg text-[#B0B0B0] font-medium leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
