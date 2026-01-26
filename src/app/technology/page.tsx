"use client";

import React from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Radio, Zap, Brain, Workflow, Server, Activity, ChevronRight, Shield, Terminal, Boxes, Network } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedNumber from "@/components/AnimatedNumber";

export default function TechGodModePage() {
    return (
        <AuraLayout>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Visual Backdrop: Data Rain / Grid Effect */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00F0FF]/[0.02] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1400px] mx-auto space-y-60">
                    {/* --- HERO: THE ARCHITECTURE --- */}
                    <div className="space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.8em] border border-white/5">
                            <Cpu size={14} /> INFRASTRUCTURE ALPHA • V12
                        </motion.div>
                        <h1 className="text-6xl md:text-[11rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic font-space">
                            Otonom<br />
                            <span className="text-[#00F0FF]">Mimari.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-[#B0B0B0] font-bold max-w-4xl italic border-l-2 border-[#00F0FF]/20 pl-10">
                            "Aura OS bir araç değildir; 120,000+ operasyonel veri setiyle eğitilmiş, otonom bir nöral ağdır. Rakiplerin aksine, biz sadece arayüz sunmuyoruz, zekayı sunuyoruz."
                        </p>
                    </div>

                    {/* --- TECH SPECS GRID --- */}
                    <div className="grid lg:grid-cols-2 gap-10">
                        <TechFeature
                            icon={<Terminal className="text-[#00F0FF]" />}
                            title="Nex-Scan™ Neural Vision"
                            text="Tıbbi verileri ve hasta niyetini 0.1mm hassasiyetle analiz eden otonom görme katmanı. Lead score otonom belirlenir."
                        />
                        <TechFeature
                            icon={<Zap className="text-[#00F0FF]" />}
                            title="Closing Protocol 12.0"
                            text="Lead niyetini 12ms hızında analiz ederek satışı otonom kapatan God-Mode protokolü. Stripe ile tam entegre."
                        />
                    </div>

                    {/* --- TECHNICAL MATRIX: LIVE PULSE --- */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-white/5">
                        <MetricItem icon={<Network />} label="Sync Speed" val="12ms" />
                        <MetricItem icon={<Brain />} label="AI Training" val="120K+" />
                        <MetricItem icon={<Boxes />} label="Nodes Active" val="GLOBAL" />
                        <MetricItem icon={<Terminal />} label="Latency" val="0.4ms" />
                    </div>

                    {/* --- THE ENGINE VISUAL --- */}
                    <div className="relative group rounded-[4rem] overflow-hidden border border-white/5 bg-black/40 p-20 text-center space-y-12">
                        <div className="text-[10px] font-black tracking-[1em] text-[#00F0FF] uppercase opacity-40">ALPHA CORE INITIALIZATION</div>
                        <h2 className="text-5xl md:text-8xl font-bold text-white uppercase italic tracking-tighter font-space group-hover:scale-105 transition-transform duration-1000">Kendi Kendini<br />Yöneten Sistem.</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Aura, HBYS verilerini okur, stokları analiz eder ve pazarlama bütçenizi en yüksek ROI'yi alacak şekilde otonom dağıtır.</p>
                    </div>
                </div>
            </section>

            <footer className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <div className="text-[10px] font-black uppercase tracking-[1em] text-slate-800 mb-8">ALPHA TECHNOLOGY • NEXTORIA DIGITAL Nexus</div>
                <div className="flex justify-center gap-12 opacity-10">
                    <Cpu size={24} />
                    <Workflow size={24} />
                    <Server size={24} />
                </div>
            </footer>
        </AuraLayout>
    );
}

function TechFeature({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-[#00F0FF]/20 transition-all group flex flex-col justify-between min-h-[500px] relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity"><Boxes size={150} /></div>
            <div className="space-y-10 relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">{icon}</div>
                <h3 className="text-4xl font-bold uppercase italic text-white tracking-tighter font-space leading-tight">{title}</h3>
                <p className="text-xl text-[#B0B0B0] font-medium leading-relaxed">{text}</p>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-[10px] font-black uppercase text-slate-700 tracking-widest group-hover:text-white transition-colors cursor-pointer">
                TEKNİK DÖKÜM <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
        </div>
    );
}

function MetricItem({ icon, label, val }: { icon: React.ReactNode, label: string, val: string }) {
    return (
        <div className="space-y-4 text-center">
            <div className="flex justify-center text-slate-700">{icon}</div>
            <div className="text-4xl font-bold text-white font-space italic">{val}</div>
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">{label}</div>
        </div>
    );
}
