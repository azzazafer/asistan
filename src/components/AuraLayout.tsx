"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, ArrowUpRight, Globe, Shield, MessageSquare, Radio, Cpu, Award, Workflow } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

import ScarcityToast from "./ScarcityToast";
import BrandBadge from "./BrandBadge";

interface AuraLayoutProps {
    children: React.ReactNode;
    lang: 'tr' | 'en' | 'ar';
    setLang: (l: 'tr' | 'en' | 'ar') => void;
}

const NAV_CONTENT = {
    tr: { nav: { cli: "Ultra-Premium Klinik", age: "Global Acente Ağı", tech: "Mimari Alpha", vision: "Vizyon 2026", getStarted: "Operasyonu Başlat" }, footer: { signature: "POWERED BY NEXTORIA DIGITAL", rights: "© 2026 Aura OS Galactic Operations. Tüm Hakları Saklıdır." } },
    en: { nav: { cli: "Ultra-Premium Clinic", age: "Global Agency Network", tech: "Alpha Architecture", vision: "Vision 2026", getStarted: "Start Operation" }, footer: { signature: "POWERED BY NEXTORIA DIGITAL", rights: "© 2026 Aura OS Galactic Operations. All Rights Reserved." } },
    ar: { nav: { cli: "عيادات النخبة", age: "شبكة الوكالات العالمية", tech: "هندسة ألفا", vision: "رؤية 2026", getStarted: "بدء التشغيل" }, footer: { signature: "بدعم من نكستوريا ديجيتال", rights: "© 2026 Aura OS Galactic Operations. جميع الحقوق محفوظة." } }
};

export default function AuraLayout({ children, lang, setLang }: AuraLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const t = NAV_CONTENT[lang];
    const isRTL = lang === 'ar';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Aura OS",
        "operatingSystem": "Web-Based",
        "applicationCategory": "BusinessApplication",
        "author": {
            "@type": "Organization",
            "name": "Nextoria Digital",
            "url": "https://www.nextoriadigital.com"
        },
        "description": "The world's first autonomous revenue engine for ultra-premium health tourism."
    };

    return (
        <div className={`min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-[#00F0FF]/40 overflow-x-hidden ${isRTL ? 'text-right font-arabic' : 'text-left font-prestige'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Script id="aura-seo-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* --- GOD-MODE BACKGROUND LAYER (CLEAN & DEEP) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00F0FF]/[0.02] blur-[200px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/[0.02] blur-[150px] rounded-full" />
            </div>
            <div className="fixed inset-0 z-1 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* --- PRESTIGE NAV (STREAMLINED) --- */}
            <nav className="fixed top-0 w-full z-[1000] px-4 md:px-8 py-6">
                <div className={`max-w-[1600px] mx-auto flex items-center justify-between transition-all duration-700 rounded-3xl px-8 h-20 ${isScrolled ? 'bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl overflow-hidden' : 'bg-transparent border border-transparent'}`}>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#00F0FF] rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform duration-500">
                            <Brain size={22} className="text-black" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em] text-white leading-none">
                                AURA <span className="text-[#00F0FF]">OS</span>
                            </span>
                            <span className="text-[7px] font-black text-slate-500 tracking-[0.4em] uppercase mt-1">A NEXTORIA PRODUCT</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                            {/* Solutions Dropdown */}
                            <div className="relative group/item cursor-pointer py-4">
                                <span className="hover:text-white transition-colors flex items-center gap-2 uppercase">
                                    {lang === 'tr' ? 'Çözümler' : lang === 'ar' ? 'الحلول' : 'Solutions'}
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300">
                                    <div className="bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 w-[280px] shadow-3xl space-y-6">
                                        <Link href="/solutions/clinics" className="flex items-center gap-4 group/link">
                                            <div className="p-2 bg-white/5 rounded-lg group-hover/link:bg-[#00F0FF] group-hover/link:text-black transition-all">
                                                <Award size={14} />
                                            </div>
                                            <span className="text-[9px] font-black tracking-widest text-slate-400 group-hover/link:text-white transition-colors">{t.nav.cli}</span>
                                        </Link>
                                        <Link href="/solutions/agencies" className="flex items-center gap-4 group/link">
                                            <div className="p-2 bg-white/5 rounded-lg group-hover/link:bg-[#00F0FF] group-hover/link:text-black transition-all">
                                                <Globe size={14} />
                                            </div>
                                            <span className="text-[9px] font-black tracking-widest text-slate-400 group-hover/link:text-white transition-colors">{t.nav.age}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Dropdown */}
                            <div className="relative group/item cursor-pointer py-4">
                                <span className="hover:text-white transition-colors flex items-center gap-2 uppercase">
                                    {lang === 'tr' ? 'Teknoloji' : lang === 'ar' ? 'التكنولوجيا' : 'Technology'}
                                </span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300">
                                    <div className="bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 w-[280px] shadow-3xl space-y-6">
                                        <Link href="/technology" className="flex items-center gap-4 group/link">
                                            <div className="p-2 bg-white/5 rounded-lg group-hover/link:bg-[#00F0FF] group-hover/link:text-black transition-all">
                                                <Cpu size={14} />
                                            </div>
                                            <span className="text-[9px] font-black tracking-widest text-slate-400 group-hover/link:text-white transition-colors">{t.nav.tech}</span>
                                        </Link>
                                        <Link href="/security" className="flex items-center gap-4 group/link">
                                            <div className="p-2 bg-white/5 rounded-lg group-hover/link:bg-[#00F0FF] group-hover/link:text-black transition-all">
                                                <Shield size={14} />
                                            </div>
                                            <span className="text-[9px] font-black tracking-widest text-slate-400 group-hover/link:text-white transition-colors">{lang === 'tr' ? 'Güvenlik' : lang === 'ar' ? 'الأمن' : 'Security'}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/vision" className="hover:text-white transition-colors py-4">{t.nav.vision}</Link>
                        </div>

                        <div className="h-6 w-px bg-white/10" />

                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                            {(['tr', 'en', 'ar'] as const).map((l) => (
                                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all duration-500 ${lang === l ? 'bg-[#00F0FF] text-black' : 'text-slate-500 hover:text-white'}`}>{l}</button>
                            ))}
                        </div>

                        <Link href="/login">
                            <button className="px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00F0FF] transition-all duration-500 active:scale-95 shadow-xl relative z-[1010]">
                                {t.nav.getStarted}
                            </button>
                        </Link>
                    </div>

                    <button className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white relative z-[1001] active:scale-95 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* --- MOBILE DROPDOWN MENU --- */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-4 right-4 mt-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 lg:hidden z-[999] shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
                        >
                            <nav className="flex flex-col gap-8">
                                <Link href="/solutions/clinics" className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.cli}</Link>
                                <Link href="/solutions/agencies" className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.age}</Link>
                                <Link href="/technology" className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.tech}</Link>
                                <Link href="/vision" className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.vision}</Link>
                                <div className="h-px bg-white/5 w-full" />
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-[#00F0FF] text-black rounded-xl font-black uppercase tracking-widest text-center shadow-lg active:scale-[0.98] transition-transform">
                                    {t.nav.getStarted}
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="relative z-10">{children}</main>
            <ScarcityToast />
            <BrandBadge />

            {/* --- PRESTIGE FOOTER --- */}
            <footer className="py-20 md:py-32 px-8 border-t border-white/5 bg-[#050505] relative z-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-5 gap-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#00F0FF] rounded-lg flex items-center justify-center shadow-2xl">
                                <Brain size={24} className="text-black" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase italic py-2 text-white leading-none">AURA <span className="text-[#00F0FF]/60">OS</span></span>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700 leading-loose max-w-[320px]">
                            NEXTORIA PRESTIGE INFRASTRUCTURE<br />VERSION 12.0 • GOD-MODE REALITY<br />AUTONOMOUS REVENUE ENGINE
                        </p>
                        <div className="flex gap-4">
                            {['Radio', 'Globe', 'Shield'].map((icon, i) => (
                                <div key={i} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-600 hover:text-[#00F0FF] hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                                    {icon === 'Radio' && <Radio size={18} />}
                                    {icon === 'Globe' && <Globe size={18} />}
                                    {icon === 'Shield' && <Shield size={18} />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
                        <div className="space-y-8">
                            <div className="text-[9px] font-black uppercase tracking-[0.6em] text-[#00F0FF]/80">Çözümler</div>
                            <nav className="flex flex-col gap-6">
                                <Link href="/solutions/clinics" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">{t.nav.cli}</Link>
                                <Link href="/solutions/agencies" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">{t.nav.age}</Link>
                            </nav>
                        </div>
                        <div className="space-y-8">
                            <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600">Teknoloji</div>
                            <nav className="flex flex-col gap-6">
                                <Link href="/technology" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">{t.nav.tech}</Link>
                                <Link href="/security" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">GÜVENLİK</Link>
                                <Link href="/vision" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">{t.nav.vision}</Link>
                            </nav>
                        </div>
                        <div className="space-y-8">
                            <div className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-600">Nextoria</div>
                            <div className="space-y-4">
                                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="block text-[10px] font-black uppercase tracking-[0.4em] text-white/50 leading-tight hover:text-[#00F0FF] transition-colors">{t.footer.signature}</a>
                                <p className="text-[8px] font-bold text-slate-800 tracking-[0.2em] uppercase leading-relaxed">{t.footer.rights}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-20">
                    <div className="flex gap-12">
                        <Award size={32} strokeWidth={1} />
                        <Workflow size={32} strokeWidth={1} />
                        <Cpu size={32} strokeWidth={1} />
                    </div>
                    <div className="text-[8px] font-black tracking-[0.5em] uppercase text-slate-500">
                        Designed for the top 1% health institutions
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; background: #050505; color: #E0E0E0; margin:0; padding:0; overflow-x:hidden; -webkit-font-smoothing: antialiased; }
        .font-prestige { font-family: 'Space Grotesk', sans-serif; }
        .font-arabic { font-family: system-ui, sans-serif; }
        h1, h2, h3, h4 { letter-spacing: -0.1em !important; font-weight: 700; color: #FFFFFF; }
        p, span, li { color: #E0E0E0; }
        ::selection { background: #00F0FF; color: black; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #333333; }
        .glass-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(0,240,255,0.2); backdrop-filter: blur(10px); }
        .glass-btn:hover { border-color: rgba(0,240,255,0.5); background: rgba(255,255,255,0.05); }
        .shadow-3xl { shadow: 0 40px 80px -20px rgba(0,0,0,0.8); }
      `}</style>
        </div>
    );
}
