"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";

export default function CalculateLossPage() {
    const [leads, setLeads] = useState(100);
    const [conversion, setConversion] = useState(5);
    const [avgValue, setAvgValue] = useState(3000);

    const currentRevenue = (leads * (conversion / 100)) * avgValue;
    const auraRevenue = (leads * (0.15)) * avgValue; // Typical Aura conversion is 15%
    const loss = auraRevenue - currentRevenue;

    return (
        <AuraLayout>
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-20">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase italic tracking-tighter text-white font-space">
                        Ciro Kaybını <span className="text-[#FF4500]">Hesapla</span>
                    </h1>
                    <p className="text-[#B0B0B0] text-xl">Aura OS kullanmadığınız her gün ne kadar kaybettiğinizi görün.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] backdrop-blur-xl">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Aylık Lead Sayısı</label>
                            <input
                                type="range" min="10" max="2000" step="10"
                                value={leads}
                                onChange={(e) => setLeads(Number(e.target.value))}
                                className="w-full accent-[#00F0FF]"
                            />
                            <div className="text-2xl font-bold text-white">{leads} Lead</div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mevcut Dönüşüm Oranı (%)</label>
                            <input
                                type="range" min="1" max="20" step="0.5"
                                value={conversion}
                                onChange={(e) => setConversion(Number(e.target.value))}
                                className="w-full accent-[#00F0FF]"
                            />
                            <div className="text-2xl font-bold text-white">%{conversion}</div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ortalama Paket Değeri ($)</label>
                            <input
                                type="number"
                                value={avgValue}
                                onChange={(e) => setAvgValue(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:outline-none focus:border-[#00F0FF]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center text-center space-y-8 p-10 bg-[#FF4500]/5 rounded-[2rem] border border-[#FF4500]/20">
                        <TrendingDown size={48} className="text-[#FF4500]" />
                        <div className="space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF4500]">Yıllık Fırsat Maliyeti</div>
                            <div className="text-5xl md:text-6xl font-black text-white font-space">
                                ${(loss * 12).toLocaleString()}
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold leading-relaxed">
                            Aura OS otonom triaj ve scarcity motoru ile <br /> dönüşüm oranınızı %15+ seviyesine çıkarır.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/signup">
                        <button className="px-12 py-5 bg-[#00F0FF] text-black rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,240,255,0.4)]">
                            Kayıpları Durdur: Alpha'ya Katıl
                        </button>
                    </Link>
                </div>
            </div>
        </AuraLayout>
    );
}
