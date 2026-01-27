"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, ArrowUpRight, Globe, Shield, MessageSquare, Radio, Cpu, Award, Workflow, Lock } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

import ScarcityToast from "./ScarcityToast";
import BrandBadge from "./BrandBadge";

interface AuraLayoutProps {
    children: React.ReactNode;
}

export default function AuraLayout({ children }: AuraLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-[#00F0FF]/40 overflow-x-hidden font-inter">
            {/* --- GLOBAL DESIGN DNA: BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#00F0FF]/[0.03] blur-[250px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/[0.03] blur-[200px] rounded-full" />
                {/* Thin Grid Overlap */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            {/* --- STICKY HEADER (FINTECH STYLE) --- */}
            <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? 'py-4 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent border-b border-transparent'}`}>
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    {/* Logo: Minimalist Neural Knot */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 flex items-center justify-center relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-[#00F0FF]/20 rounded-lg"
                            />
                            <Brain size={22} className="text-[#00F0FF] relative z-10" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white font-space">
                            AURA <span className="text-[#00F0FF]">OS</span>
                        </span>
                    </Link>

                    {/* Center Links (Desktop) */}
                    <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <Link href="/solutions/clinics" className="hover:text-white transition-colors">Klinikler</Link>
                        <Link href="/solutions/agencies" className="hover:text-white transition-colors">Acenteler</Link>
                        <Link href="/technology" className="hover:text-white transition-colors">Teknoloji</Link>
                        <Link href="/vision" className="hover:text-white transition-colors">Vizyon</Link>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">
                            Giriş Yap
                        </Link>
                        <Link href="/signup">
                            <button className="px-8 py-3 bg-transparent border border-[#00F0FF]/40 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00F0FF] hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(0,240,255,0.1)] active:scale-95">
                                Operasyonu Başlat
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white relative z-[1001]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* --- MOBILE DROPDOWN --- */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-4 right-4 mt-4 bg-[#050505]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 lg:hidden z-[999] shadow-3xl"
                        >
                            <nav className="flex flex-col gap-8">
                                <Link href="/solutions/clinics" className="text-lg font-bold tracking-tight text-white font-space" onClick={() => setIsMenuOpen(false)}>Klinikler</Link>
                                <Link href="/solutions/agencies" className="text-lg font-bold tracking-tight text-white font-space" onClick={() => setIsMenuOpen(false)}>Acenteler</Link>
                                <Link href="/technology" className="text-lg font-bold tracking-tight text-white font-space" onClick={() => setIsMenuOpen(false)}>Teknoloji</Link>
                                <Link href="/vision" className="text-lg font-bold tracking-tight text-white font-space" onClick={() => setIsMenuOpen(false)}>Vizyon</Link>
                                <div className="h-px bg-white/5 w-full" />
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-[#00F0FF] text-black rounded-xl font-black uppercase tracking-widest text-center shadow-lg">
                                    Operasyonu Başlat
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="relative z-10">{children}</main>
            <ScarcityToast />
            <BrandBadge />

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
                        <div className="text-[9px] font-black uppercase tracking-[0.6em] text-[#00F0FF]/80">Ürün</div>
                        <nav className="flex flex-col gap-5">
                            <Link href="/#scarcity" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Scarcity Engine™</Link>
                            <Link href="/#nexscan" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Nex-Scan™ Triaj</Link>
                            <Link href="/#stripe" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Stripe Bridge</Link>
                        </nav>
                    </div>

                    {/* Kurumsal Column */}
                    <div className="space-y-8">
                        <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600">Kurumsal</div>
                        <nav className="flex flex-col gap-5">
                            <Link href="/vision" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Vizyon 2026</Link>
                            <Link href="/investors" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Yatırımcı İlişkileri</Link>
                            <Link href="/security" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Güvenlik (GDPR/HIPAA)</Link>
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
