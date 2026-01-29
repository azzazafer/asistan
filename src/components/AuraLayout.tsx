"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./ui/Navbar";
import { Brain, Shield, Lock } from "lucide-react";
import Link from "next/link";

import ScarcityToast from "./ScarcityToast";
import BrandBadge from "./BrandBadge";
import NexScanDemo from "./NexScanDemo";

interface AuraLayoutProps {
    children: React.ReactNode;
}

export default function AuraLayout({ children }: AuraLayoutProps) {
    const [isNexScanOpen, setIsNexScanOpen] = useState(false);

    useEffect(() => {
        // GLOBAL LISTENER FOR DEMO
        const toggleNexScan = () => setIsNexScanOpen(true);
        window.addEventListener('openNexScan', toggleNexScan);

        return () => {
            window.removeEventListener('openNexScan', toggleNexScan);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-[#00F0FF]/40 overflow-x-hidden font-inter">
            {/* ... Background Layer ... */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00F0FF]/[0.03] blur-[250px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/[0.03] blur-[200px] rounded-full" />
                {/* Thin Grid Overlap */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            <Navbar />

            <main className="relative z-10">{children}</main>
            <ScarcityToast />
            <BrandBadge />
            <NexScanDemo isOpen={isNexScanOpen} onClose={() => setIsNexScanOpen(false)} />

            {/* --- PRESTIGE FOOTER (TRUST ANCHOR) --- */}
            <footer className="py-32 px-8 border-t border-white/5 bg-[#050505] relative z-20">
                <div className="max-w-[1400px] mx-auto grid lg:grid-cols-4 gap-20">
                    {/* Brand Column */}
                    <div className="space-y-10">
                        <Link href="/" className="flex items-center gap-4">
                            <Brain size={28} className="text-[#00F0FF]" />
                            <span className="text-2xl font-bold tracking-tighter text-white font-space">AURA OS</span>
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 leading-relaxed">
                            NEXTORIA ALPHA INFRASTRUCTURE<br />
                            VERSION 13.0 • GLOBAL HUB<br />
                            AUTONOMOUS REVENUE ENGINE
                        </p>
                    </div>

                    {/* Ürün Column */}
                    <div className="space-y-8">
                        <div className="text-[9px] font-black uppercase tracking-[0.6em] text-[#00F0FF]/80">Otonom Ürünler</div>
                        <nav className="flex flex-col gap-5">
                            <Link href="/#scarcity" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Scarcity Engine™</Link>
                            <Link href="/#nexscan" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Nex-Scan™ Triaj</Link>
                            <Link href="/#stripe" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Stripe Bridge</Link>
                            <Link href="/calculate-loss" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">ROI Hesaplayıcı</Link>
                            <Link href="/onboarding" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Hızlı Kurulum Klavuzu</Link>
                        </nav>
                    </div>

                    {/* Kurumsal Column */}
                    <div className="space-y-8">
                        <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600">Kurumsal & Hukuk</div>
                        <nav className="flex flex-col gap-5">
                            <Link href="/vision" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Vizyon 2026</Link>
                            <Link href="/investors" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Yatırımcı İlişkileri</Link>
                            <Link href="/security" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Güvenlik Standartları</Link>
                            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">KVKK & Gizlilik</Link>
                            <Link href="/help" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Destek Merkezi</Link>
                        </nav>
                    </div>

                    {/* trust/Badges Column */}
                    <div className="space-y-10 text-right lg:text-right flex flex-col items-end">
                        <div className="flex gap-4 opacity-30 grayscale">
                            <div className="w-12 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center"><Shield size={20} /></div>
                            <div className="w-12 h-12 bg-white/5 rounded border border-white/10 flex items-center justify-center"><Lock size={20} /></div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[8px] font-black tracking-[0.3em] uppercase text-slate-800">Designed for the top 1% health institutions.</p>
                            <p className="text-[8px] font-black tracking-[0.3em] uppercase text-slate-500">© 2026 Aura OS.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;700;900&display=swap');
                
                :root {
                    --bg-dark: #050505;
                    --teal-primary: #00F0FF;
                    --text-muted: #B0B0B0;
                }

                body { 
                    background: var(--bg-dark); 
                    color: #E0E0E0; 
                    -webkit-font-smoothing: antialiased;
                    font-family: 'Inter', sans-serif;
                }

                .font-space { font-family: 'Space Grotesk', sans-serif; }
                .font-inter { font-family: 'Inter', sans-serif; }

                h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.05em; color: #FFFFFF; }
                
                ::selection { background: var(--teal-primary); color: black; }
                
                ::-webkit-scrollbar { width: 3px; }
                ::-webkit-scrollbar-track { background: var(--bg-dark); }
                ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
            `}</style>
        </div>
    );
}
