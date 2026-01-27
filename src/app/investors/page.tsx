"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Shield, Zap, ArrowUpRight } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function InvestorsPage() {
    return (
        <AuraLayout>
            <div className="pt-32 pb-40 px-6 max-w-[1400px] mx-auto space-y-32">
                <header className="max-w-3xl space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                        SERIES A • NEXTORIA FUNDING
                    </div>
                    <h1 className="text-6xl md:text-[7rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                        Geleceği <span className="text-[#00F0FF]">Finanse Etmek.</span>
                    </h1>
                    <p className="text-xl text-[#B0B0B0] leading-relaxed">
                        Aura OS, sağlık turizmi pazarını otonom hale getirerek global sermayeyi yeniden yapılandırıyor. 2026 hedefimiz $5B+ işlem hacmi.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-10">
                    <StatCard label="Pazar Büyüklüğü" value="$120B+" sub="Sağlık Turizmi 2026" />
                    <StatCard label="Dönüşüm Artışı" value="%40" sub="Sektörel Benchmark" />
                    <StatCard label="Net Kar Hedefi" value="%240" sub="Yıllık Tahmini" />
                </div>

                <div className="p-20 bg-white/[0.02] border border-white/5 rounded-[4rem] flex flex-col items-center text-center space-y-10">
                    <h2 className="text-4xl font-bold uppercase italic font-space text-white">Yatırımcı Sunumuna Erişim</h2>
                    <p className="text-[#B0B0B0] max-w-xl mx-auto">NDA kapsamında Aura OS Alpha mimarisi ve finansal projeksiyonları incelemek için yetki talep edin.</p>
                    <button className="px-12 py-5 bg-white text-black rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#00F0FF] transition-all">
                        Yetki Talep Et <ArrowUpRight size={16} className="inline ml-2" />
                    </button>
                </div>
            </div>
        </AuraLayout>
    );
}

function StatCard({ label, value, sub }: any) {
    return (
        <div className="p-10 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{label}</div>
            <div className="text-5xl font-bold text-white font-space italic">{value}</div>
            <div className="text-xs font-medium text-[#00F0FF] uppercase tracking-widest">{sub}</div>
        </div>
    );
}
