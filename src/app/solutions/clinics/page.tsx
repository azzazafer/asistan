"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Camera, Lock, Zap, Cpu, Globe, ArrowRight, ShieldCheck, Database } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function ClinicsPage() {
    return (
        <AuraLayout>
            <div className="pt-32 pb-40 px-6 max-w-[1400px] mx-auto space-y-40">
                {/* Header Section */}
                <header className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            SOLUTIONS • FOR CLINICS
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                            Otonom <br />
                            <span className="text-[#00F0FF]">Klinik.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-xl">
                            Aura OS, kliniğinizi pasif bir yapıdan otonom bir gelir motoruna dönüştürür. HBYS sisteminizle 12ms hızında konuşur, triajı AI ile yapar ve tahsilatı anında gerçekleştirir.
                        </p>
                    </div>
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] group aspect-square lg:aspect-video">
                        <img
                            src="/images/aura_clinic_autonomy_matrix.png"
                            alt="Aura OS Smart Clinic"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4000ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                        {/* Dynamic Overlay Elements */}
                        <div className="absolute top-10 left-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-1000">
                            <div className="text-[8px] font-black text-[#00F0FF] tracking-widest uppercase">Sync Status</div>
                            <div className="text-xl font-bold text-white italic">Active Nexus</div>
                        </div>
                    </div>
                </header>

                {/* Automation Features */}
                <div className="grid md:grid-cols-2 gap-10">
                    <FeatureCard
                        icon={<Database className="text-[#00F0FF]" />}
                        title="HBYS Derin Entegrasyon"
                        text="Fonet, Tiga ve diğer global sistemlerle otonom çift yönlü veri akışı. Manuel veri girişine son."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Camera className="text-[#00F0FF]" />}
                        title="AI Nöral Triaj"
                        text="Hasta fotoğraflarını 12ms içinde analiz eden Nex-Scan™ motoru ile doktor yükünü %70 azaltın."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Lock className="text-[#00F0FF]" />}
                        title="Otonom Tahsilat (Stripe)"
                        text="Link bazlı ödeme değil, AI satış temsilcisi ile telefon kapanmadan %20 kapora garantisi."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-[#00F0FF]" />}
                        title="Sıfır Hata Operasyon"
                        text="Yanlış fiyatlandırma ve mükerrer randevu riskini otonom denetim motoru ile ortadan kaldırır."
                        delay={0.4}
                    />
                </div>

                {/* ROI Section */}
                <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                    <div className="p-20 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[4rem] space-y-12 relative overflow-hidden group flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="max-w-3xl space-y-6 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold uppercase italic font-space text-white tracking-tighter leading-none">Finansal <br /> Domine Modu.</h2>
                            <p className="text-lg text-[#B0B0B0] leading-relaxed">Aura OS kullanan klinikler, ilk 90 gün içinde operasyonel verimlilikte %120 artış raporlamaktadır.</p>
                        </div>
                        <button
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    window.dispatchEvent(new CustomEvent('openNexScan'));
                                }
                            }}
                            className="px-10 py-5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#00F0FF] transition-all relative z-10 w-fit">
                            Klinik ROI Analizi Yapın <ArrowRight size={14} className="inline ml-2" />
                        </button>
                    </div>

                    <div className="rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] relative group">
                        <img
                            src="/images/aura_clinic_premium.png"
                            alt="Aura OS Premium Interface"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <div className="text-[8px] font-black text-[#00F0FF] tracking-widest uppercase mb-1">Aura Alpha UI</div>
                            <div className="text-lg font-bold text-white italic leading-tight">Elite Klinik Deneyimi</div>
                        </div>
                    </div>
                </div>

                {/* Patient Journey Preview */}
                <div className="py-20 space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold uppercase italic font-space text-white">Otonom Hasta Yolculuğu</h2>
                        <p className="text-[#B0B0B0] max-w-xl mx-auto text-sm">Hastanızın ilk kontağından kurulacak güvene kadar her adım otonom ve kusursuzdur.</p>
                    </div>
                    <div className="relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                        <img src="/images/patient_ui.png" alt="Patient Journey Experience" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    </div>
                </div>
            </div>
        </AuraLayout>
    );
}

function FeatureCard({ icon, title, text, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            viewport={{ once: true }}
            className="p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] space-y-8 hover:border-[#00F0FF]/20 transition-all duration-700 group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#00F0FF]/10 transition-all duration-500 relative z-10">
                {icon}
            </div>
            <div className="space-y-4 relative z-10">
                <h3 className="text-2xl font-bold text-white uppercase italic font-space tracking-tight">{title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{text}</p>
            </div>
        </motion.div>
    );
}

