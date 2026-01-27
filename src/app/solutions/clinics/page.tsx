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
                            Otonom <span className="text-[#00F0FF]">Klinik.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-xl">
                            Aura OS, kliniğinizi pasif bir yapıdan otonom bir gelir motoruna dönüştürür. HBYS sisteminizle 12ms hızında konuşur, triajı AI ile yapar ve tahsilatı anında gerçekleştirir.
                        </p>
                    </div>
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] group">
                        <img
                            src="/images/aura_smart_clinic_alpha.png"
                            alt="Aura OS Smart Clinic"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    </div>
                </header>

                {/* Automation Features */}
                <div className="grid md:grid-cols-2 gap-10">
                    <FeatureCard
                        icon={<Database className="text-[#00F0FF]" />}
                        title="HBYS Derin Entegrasyon"
                        text="Fonet, Tiga ve diğer global sistemlerle otonom çift yönlü veri akışı. Manuel veri girişine son."
                    />
                    <FeatureCard
                        icon={<Camera className="text-[#00F0FF]" />}
                        title="AI Nöral Triaj"
                        text="Hasta fotoğraflarını 12ms içinde analiz eden Nex-Scan™ motoru ile doktor yükünü %70 azaltın."
                    />
                    <FeatureCard
                        icon={<Lock className="text-[#00F0FF]" />}
                        title="Otonom Tahsilat (Stripe)"
                        text="Link bazlı ödeme değil, AI satış temsilcisi ile telefon kapanmadan %20 kapora garantisi."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-[#00F0FF]" />}
                        title="Sıfır Hata Operasyon"
                        text="Yanlış fiyatlandırma ve mükerrer randevu riskini otonom denetim motoru ile ortadan kaldırır."
                    />
                </div>

                {/* ROI Section */}
                <div className="p-20 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[4rem] space-y-16">
                    <div className="max-w-3xl space-y-6">
                        <h2 className="text-4xl font-bold uppercase italic font-space text-white">Finansal Domine Modu</h2>
                        <p className="text-[#B0B0B0]">Aura OS kullanan klinikler, ilk 90 gün içinde operasyonel verimlilikte %120, net karda %45 artış raporlamaktadır.</p>
                    </div>
                    <div className="h-px bg-white/5" />
                    <button className="px-12 py-5 bg-white text-black rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#00F0FF] transition-all">
                        Klinik ROI Analizi Yapın <ArrowRight size={16} className="inline ml-2" />
                    </button>
                </div>
            </div>
        </AuraLayout>
    );
}

function FeatureCard({ icon, title, text }: any) {
    return (
        <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] space-y-8 hover:border-[#00F0FF]/20 transition-colors group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#00F0FF]/10 transition-colors">
                {icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white uppercase italic font-space tracking-tight">{title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
