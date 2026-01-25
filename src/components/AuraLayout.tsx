"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, ArrowUpRight, Globe, Shield, MessageSquare, Database, Radio, Cpu, Award, Workflow } from "lucide-react";
import Link from "next/link";

interface AuraLayoutProps {
    children: React.ReactNode;
    lang: 'tr' | 'en' | 'ar';
    setLang: (l: 'tr' | 'en' | 'ar') => void;
}

const NAV_CONTENT = {
    tr: { nav: { cli: "Klinikler", age: "Acenteler", tech: "Teknoloji", vision: "Vizyon", getStarted: "Sisteme Hükmet" }, footer: { signature: "NEXTORIA DIGITAL ALPHA • OMEGA ZENITH", rights: "© 2026 Aura OS Galactic Operations. Tüm Hakları Saklıdır." } },
    en: { nav: { cli: "Clinics", age: "Agencies", tech: "Technology", vision: "Vision", getStarted: "Dominate Now" }, footer: { signature: "NEXTORIA DIGITAL ALPHA • OMEGA ZENITH", rights: "© 2026 Aura OS Galactic Operations. All Rights Reserved." } },
    ar: { nav: { cli: "العيادات", age: "الوكالات", tech: "التكنولوجيا", vision: "الرؤية", getStarted: "أحكم سيطرتك" }, footer: { signature: "NEXTORIA DIGITAL ALPHA • OMEGA ZENITH", rights: "© 2026 Aura OS Galactic Operations. جميع الحقوق محفوظة." } }
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

    return (
        <div className={`min-h-screen bg-[#000000] text-slate-100 selection:bg-indigo-500/40 overflow-x-hidden ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* --- OMEGA NAV --- */}
            <nav className="fixed top-0 w-full z-[1000] px-4 md:px-10 py-6 transition-all duration-500">
                <div className={`max-w-[1600px] mx-auto flex items-center justify-between transition-all duration-700 rounded-[2.5rem] px-8 md:px-12 h-20 md:h-24 ${isScrolled ? 'bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] scale-[0.98]' : 'bg-transparent border border-transparent'}`}>
                    <Link href="/" className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-1000 group-hover:rotate-[360deg] group-hover:bg-indigo-500">
                            <Brain size={28} className="text-white" />
                        </div>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic py-2 leading-none text-white whitespace-nowrap">
                            Aura <span className="text-indigo-500">OS</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 xl:gap-14 text-white">
                        <Link href="/solutions/clinics" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all whitespace-nowrap">{t.nav.cli}</Link>
                        <Link href="/solutions/agencies" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all whitespace-nowrap">{t.nav.age}</Link>
                        <Link href="/technology" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all whitespace-nowrap">{t.nav.tech}</Link>
                        <Link href="/vision" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all whitespace-nowrap">{t.nav.vision}</Link>

                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 mx-2 min-w-[150px]">
                            {(['tr', 'en', 'ar'] as const).map((l) => (
                                <button key={l} onClick={() => setLang(l)} className={`flex-1 px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-500 ${lang === l ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>{l}</button>
                            ))}
                        </div>
                        <button className="bg-white text-black px-10 py-4.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap">
                            {t.nav.getStarted}
                        </button>
                    </div>

                    <button className="lg:hidden p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* --- MOBILE OVERLAY --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[900] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-10 lg:hidden px-10 text-white">
                        <Link href="/solutions/clinics" className="text-3xl font-black uppercase tracking-widest hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.cli}</Link>
                        <Link href="/solutions/agencies" className="text-3xl font-black uppercase tracking-widest hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.age}</Link>
                        <Link href="/technology" className="text-3xl font-black uppercase tracking-widest hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.tech}</Link>
                        <Link href="/vision" className="text-3xl font-black uppercase tracking-widest hover:text-indigo-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.vision}</Link>
                        <div className="h-px w-20 bg-white/20 my-4" />
                        <button className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-widest shadow-2xl">{t.nav.getStarted}</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10">{children}</main>

            {/* --- OMEGA FOOTER --- */}
            <footer className="py-20 md:py-40 px-8 border-t border-white/5 bg-black relative z-20">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-20 md:gap-32">
                    <div className="lg:col-span-1 space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-indigo-600 rounded-[2.2rem] flex items-center justify-center shadow-3xl"><Brain size={34} /></div>
                            <span className="text-4xl font-black tracking-tighter uppercase italic py-2 text-white leading-none">AURA <span className="text-indigo-500">OS</span></span>
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 leading-loose max-w-[280px]">
                            NEXTORIA ALPHA INFRASTRUCTURE<br />VERSION 8.0.01 • OMEGA BUILD<br />OPERATING MANUAL FOR THE FUTURE
                        </p>
                        <div className="flex gap-4">
                            {[Radio, Globe, Shield, MessageSquare].map((Icon, i) => (
                                <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer"><Icon size={20} /></div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                        <div className="space-y-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-500">SEKTÖRLER</div>
                            <Link href="/solutions/clinics" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">{t.nav.cli}</Link>
                            <Link href="/solutions/agencies" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">{t.nav.age}</Link>
                            <Link href="/technology" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">{t.nav.tech}</Link>
                        </div>
                        <div className="space-y-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500">ALPHA</div>
                            <Link href="/vision" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">{t.nav.vision}</Link>
                            <Link href="/security" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">GÜVENLİK</Link>
                            <Link href="#" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">DOCS</Link>
                        </div>
                    </div>

                    <div className="lg:col-span-1 text-center lg:text-right space-y-20">
                        <div className="space-y-4">
                            <div className="text-[13px] font-black uppercase tracking-[0.7em] text-white leading-tight">{t.footer.signature}</div>
                            <p className="text-[10px] font-black text-slate-800 tracking-[0.4em] italic leading-relaxed">{t.footer.rights}</p>
                        </div>
                        <div className="flex justify-center lg:justify-end gap-8 opacity-20">
                            <Award size={48} strokeWidth={1} />
                            <Workflow size={48} strokeWidth={1} />
                            <Cpu size={48} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&display=swap');
        body { font-family: 'Outfit', sans-serif; background: #000000; color: #f8fafc; margin:0; padding:0; overflow-x:hidden; -webkit-font-smoothing: antialiased; }
        .font-arabic { font-family: system-ui, sans-serif; }
        h1, h2, h3, h4 { letter-spacing: -0.05em !important; }
        ::selection { background: #4f46e5; color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background: #111111; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #222222; }
      `}</style>
        </div>
    );
}
