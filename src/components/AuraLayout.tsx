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
    tr: { nav: { cli: "Klinikler", age: "Acenteler", tech: "Teknoloji", vision: "Vizyon", getStarted: "Sisteme Hükmet" }, footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations." } },
    en: { nav: { cli: "Clinics", age: "Agencies", tech: "Technology", vision: "Vision", getStarted: "Dominate Now" }, footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations." } },
    ar: { nav: { cli: "العيادات", age: "الوكالات", tech: "التكنولوجيا", vision: "الرؤية", getStarted: "أحكم سيطرتك" }, footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations." } }
};

export default function AuraLayout({ children, lang, setLang }: AuraLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = NAV_CONTENT[lang];
    const isRTL = lang === 'ar';

    return (
        <div className={`min-h-screen bg-[#010101] text-slate-100 selection:bg-indigo-500/40 ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>

            {/* --- ELITE NAV --- */}
            <nav className="fixed top-0 w-full z-[200] px-6 py-6 lg:py-10 pointer-events-none">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-8 md:px-12 h-20 md:h-24 shadow-2xl pointer-events-auto">
                    <Link href="/" className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-1000 group-hover:rotate-[360deg]">
                            <Brain size={28} className="text-white" />
                        </div>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic py-2 leading-none text-white">
                            Aura <span className="text-indigo-500">OS</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-10 xl:gap-14 text-white">
                        <Link href="/solutions/clinics" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">{t.nav.cli}</Link>
                        <Link href="/solutions/agencies" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">{t.nav.age}</Link>
                        <Link href="/technology" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">{t.nav.tech}</Link>
                        <Link href="/vision" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">{t.nav.vision}</Link>

                        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 mx-4">
                            {(['tr', 'en', 'ar'] as const).map((l) => (
                                <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-500 ${lang === l ? 'bg-indigo-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white'}`}>{l}</button>
                            ))}
                        </div>
                        <button className="bg-white text-black px-10 py-4.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95">
                            {t.nav.getStarted}
                        </button>
                    </div>

                    <button className="lg:hidden p-3 bg-white/5 rounded-full pointer-events-auto text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* --- MOBILE MENU --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[150] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-10 lg:hidden px-10 text-white">
                        <Link href="/solutions/clinics" className="text-2xl font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{t.nav.cli}</Link>
                        <Link href="/solutions/agencies" className="text-2xl font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{t.nav.age}</Link>
                        <Link href="/technology" className="text-2xl font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{t.nav.tech}</Link>
                        <Link href="/vision" className="text-2xl font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{t.nav.vision}</Link>
                        <X size={40} className="mt-10 opacity-50" onClick={() => setIsMenuOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <main>{children}</main>

            {/* --- FOOTER --- */}
            <footer className="py-20 md:py-40 px-8 border-t border-white/5 bg-black/95 backdrop-blur-3xl relative">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-20 md:gap-24">
                    <div className="lg:col-span-1 space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center"><Brain size={34} /></div>
                            <span className="text-4xl font-black tracking-tighter uppercase italic py-2 text-white">Aura <span className="text-indigo-400">OS</span></span>
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 leading-loose">
                            Nextoria Digital Alpha Infrastructure<br />V7.0.01 • Global Build
                        </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-16">
                        <div className="space-y-8">
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Çözümler</div>
                            <Link href="/solutions/clinics" className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">Klinik Otonomisi</Link>
                            <Link href="/solutions/agencies" className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">Acente Zekası</Link>
                            <Link href="/technology" className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">Nex-Scan™ AI</Link>
                        </div>
                        <div className="space-y-8">
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Kurumsal</div>
                            <Link href="/vision" className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">Vizyon 2026</Link>
                            <Link href="/security" className="block text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">Güvenlik</Link>
                        </div>
                    </div>

                    <div className="lg:col-span-1 text-center lg:text-right space-y-6">
                        <div className="text-[13px] font-black uppercase tracking-[0.7em] text-white leading-tight">{t.footer.signature}</div>
                        <p className="text-[10px] font-black text-slate-700 tracking-[0.4em] italic">{t.footer.rights}</p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&display=swap');
        body { font-family: 'Outfit', sans-serif; background: #010101; color: #f1f1f1; margin:0; padding:0; overflow-x:hidden; }
        .font-arabic { font-family: system-ui, sans-serif; }
      `}</style>
        </div>
    );
}
