"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Globe, Shield, Rocket, Target, Zap } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function VisionPage() {
    return (
        <AuraLayout>
            <div className="pt-32 pb-40 px-6 max-w-[1400px] mx-auto space-y-40">
                {/* Hero Feature */}
                <header className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            INFINITE VISION • v13.5
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                            Yönetim <span className="text-[#00F0FF]">Bilinci.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-xl">
                            Aura OS, sağlık turizmini pasif araçlardan kurtarıp, otonom bir nöral ağa dönüştürüyor. Vizyonumuz, 2026 yılına kadar her 3 global sağlık operasyonundan birini otonom yönetmektir.
                        </p>
                    </div>
                    <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                        <img
                            src="/images/aura_infinite_vision.png"
                            alt="Aura OS Global Vision"
                            className="w-full h-full object-cover opacity-60 mix-blend-screen"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    </div>
                </header>

                {/* The Timeline of Dominance */}
                <div className="space-y-20">
                    <h2 className="text-3xl font-bold uppercase italic font-space text-white text-center">Stratejik Genişleme Projeksiyonu</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <VisionCard
                            year="2024"
                            title="Alpha Deployment"
                            text="Türkiye ve MENA bölgesindeki kliniklerde nöro-satış motorunun ilk başarı testi. %40 gelir artışı."
                        />
                        <VisionCard
                            year="2025"
                            title="Global Nexus"
                            text="Avrupa ve Amerika pazarında otonom triaj sistemlerinin yaygınlaşması. 50+ HBYS entegrasyonu."
                            active
                        />
                        <VisionCard
                            year="2026"
                            title="Absolute Autonomy"
                            text="Ecosystem genelinde insan müdahalesi olmadan satış kapatma oranının %90'a ulaşması."
                        />
                    </div>
                </div>

                {/* Values Section */}
                <div className="p-20 bg-white/[0.02] border border-white/5 rounded-[4rem] grid lg:grid-cols-3 gap-20">
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center text-[#00F0FF]"><Target size={24} /></div>
                        <h3 className="text-2xl font-bold text-white uppercase italic font-space">Hız</h3>
                        <p className="text-[#B0B0B0] text-sm leading-relaxed">İnsan karar alma süreçlerini 12ms'lik nöral yanıtlarla baypas ederek satışı anında kapatıyoruz.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center text-[#00F0FF]"><Shield size={24} /></div>
                        <h3 className="text-2xl font-bold text-white uppercase italic font-space">Güven</h3>
                        <p className="text-[#B0B0B0] text-sm leading-relaxed">HIPAA ve GDPR standartlarının ötesinde, otonom veri şifreleme ve anonimleştirme.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center text-[#00F0FF]"><Zap size={24} /></div>
                        <h3 className="text-2xl font-bold text-white uppercase italic font-space">Etki</h3>
                        <p className="text-[#B0B0B0] text-sm leading-relaxed">Geleneksel pazarlama maliyetlerini düşürüp, otonom satış ile ROI'yi maksimize ediyoruz.</p>
                    </div>
                </div>
            </div>
        </AuraLayout>
    );
}

function VisionCard({ year, title, text, active }: any) {
    return (
        <div className={`p-10 rounded-3xl border ${active ? 'border-[#00F0FF]/30 bg-[#00F0FF]/5 shadow-[0_0_50px_rgba(0,240,255,0.1)]' : 'border-white/5 bg-white/[0.01]'} space-y-6`}>
            <div className="text-4xl font-bold text-white font-space italic">{year}</div>
            <div className="space-y-2">
                <h4 className="text-[#00F0FF] text-[10px] font-black uppercase tracking-[0.4em]">{title}</h4>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
