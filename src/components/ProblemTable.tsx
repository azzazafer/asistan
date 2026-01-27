"use client";

import React from "react";
import { Check, X, Shield, Minus, ShieldCheck, Zap } from "lucide-react";

export default function ProblemTable() {
    return (
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl">
            {/* Eski Dünya */}
            <div className="p-6 md:p-12 lg:p-20 bg-[#050505] space-y-12 opacity-40 hover:opacity-100 transition-opacity duration-700 group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/5">
                        <Minus size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white/50 uppercase italic font-space">Eski Dünya</h3>
                        <p className="text-[10px] font-black tracking-widest text-slate-600 uppercase">Geleneksel CRM & Manuel Manuel Yönetim</p>
                    </div>
                </div>

                <div className="space-y-10">
                    <Row icon={<X className="text-red-500/40" />} text="Sadece Randevu Yazar" desc="Lead'i sadece listeler, satış yapamaz." />
                    <Row icon={<X className="text-red-500/40" />} text="İnsan Hızında Yanıt" desc="Yanıt süreleri dakikalar, bazen saatler sürer." />
                    <Row icon={<X className="text-red-500/40" />} text="%40 Lead Çöp Olur" desc="Takip edilmeyen leadler rakibe gider." />
                </div>
            </div>

            {/* Aura Dünyası */}
            <div className="p-6 md:p-12 lg:p-20 bg-[#080808] space-y-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00F0FF]/[0.05] blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent" />

                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] border border-[#00F0FF]/20 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white uppercase italic font-space">Aura Dünyası</h3>
                        <p className="text-[10px] font-black tracking-widest text-[#00F0FF] uppercase">Yapay Zeka Gelir Motoru</p>
                    </div>
                </div>

                <div className="space-y-10 relative z-10">
                    <Row active icon={<Check className="text-[#00F0FF]" />} text="Satışı Kapatır" desc="Randevu yerine doğrudan kapora tahsil eder." />
                    <Row active icon={<Check className="text-[#00F0FF]" />} text="12ms Refleks Hızı" desc="Otonom nöronlar anında reaksiyon verir." />
                    <Row active icon={<Check className="text-[#00F0FF]" />} text="%0 No-Show Garantisi" desc="Ödemesi alınmış, kesinleşmiş operasyonlar." />
                </div>
            </div>
        </div>
    );
}

function Row({ icon, text, desc, active = false }: { icon: React.ReactNode, text: string, desc: string, active?: boolean }) {
    return (
        <div className="flex gap-6 items-start">
            <div className={`mt-1 shrink-0 ${active ? 'animate-pulse' : ''}`}>{icon}</div>
            <div className="space-y-1">
                <div className={`text-lg font-bold tracking-tight ${active ? 'text-white' : 'text-slate-500'}`}>{text}</div>
                <div className={`text-[11px] font-medium leading-relaxed ${active ? 'text-slate-400' : 'text-slate-700'}`}>{desc}</div>
            </div>
        </div>
    );
}
