"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Load saved language
        const savedLang = localStorage.getItem('aura_lang') as 'tr' | 'en' | 'ar' || 'tr';
        setLang(savedLang);

        // Apply RTL for Arabic
        if (savedLang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const switchLanguage = (newLang: 'tr' | 'en' | 'ar') => {
        setLang(newLang);
        localStorage.setItem('aura_lang', newLang);

        // Apply RTL for Arabic
        if (newLang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
    };

    const navText = {
        tr: { clinics: 'Klinikler', partner: 'Partner/Ajans', tech: 'Teknoloji', vision: 'Vizyon', login: 'Giriş', cta: 'Ücretsiz Başla' },
        en: { clinics: 'Clinics', partner: 'Partner/Agency', tech: 'Technology', vision: 'Vision', login: 'Login', cta: 'Start Free' },
        ar: { clinics: 'العيادات', partner: 'الشريك/الوكالة', tech: 'التكنولوجيا', vision: 'الرؤية', login: 'تسجيل الدخول', cta: 'ابدأ مجانًا' }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-slate-950/80 backdrop-blur-md border-b border-white/5'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group z-10">
                    <div className="w-12 h-12 flex items-center justify-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative w-full h-full p-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl border border-emerald-500/20 backdrop-blur-md overflow-hidden"
                        >
                            <Image
                                src="/aura-logo.png"
                                alt="Aura OS Logo"
                                fill
                                className="object-cover p-1.5"
                                priority
                            />
                        </motion.div>
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-2xl font-bold tracking-tighter text-white font-space uppercase">
                            AURA <span className="text-emerald-400">OS</span>
                        </span>
                        <span className="text-[7px] tracking-[0.4em] text-emerald-400/60 font-black uppercase">Autonomous Logic</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
                    <Link href="/solutions/clinics" className="hover:text-emerald-400 transition-all">{navText[lang].clinics}</Link>
                    <Link href="/solutions/agencies" className="hover:text-emerald-400 transition-all">{navText[lang].partner}</Link>
                    <Link href="/technology" className="hover:text-blue-400 transition-all">{navText[lang].tech}</Link>
                    <Link href="/vision" className="hover:text-white transition-all">{navText[lang].vision}</Link>
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        <Globe size={14} className="text-emerald-400" />
                        {(['tr', 'en', 'ar'] as const).map((l) => (
                            <button
                                key={l}
                                onClick={() => switchLanguage(l)}
                                className={`text-[10px] font-black uppercase px-2 py-1 rounded transition-all ${lang === l ? 'bg-emerald-500 text-white' : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors">
                        {navText[lang].login}
                    </Link>
                    <Link href="/signup">
                        <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-95">
                            {navText[lang].cta}
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white relative z-[1001] hover:bg-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[998]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="absolute top-full left-4 right-4 mt-4 bg-slate-900/95 backdrop-blur-4xl border border-white/10 rounded-[2.5rem] p-10 lg:hidden z-[999] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                            <nav className="flex flex-col gap-10 relative z-10">
                                <Link href="/solutions/clinics" className="text-2xl font-bold tracking-tight text-white font-space hover:text-emerald-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{navText[lang].clinics}</Link>
                                <Link href="/solutions/agencies" className="text-2xl font-bold tracking-tight text-white font-space hover:text-emerald-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{navText[lang].partner}</Link>
                                <Link href="/technology" className="text-2xl font-bold tracking-tight text-white font-space hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>{navText[lang].tech}</Link>
                                <Link href="/vision" className="text-2xl font-bold tracking-tight text-white font-space hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>{navText[lang].vision}</Link>

                                {/* Mobile Language Switcher */}
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-emerald-400" />
                                    {(['tr', 'en', 'ar'] as const).map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => { switchLanguage(l); setIsMenuOpen(false); }}
                                            className={`text-sm font-bold uppercase px-3 py-2 rounded transition-all ${lang === l ? 'bg-emerald-500 text-white' : 'text-white/60 hover:text-white'
                                                }`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>

                                <div className="h-px bg-white/10 w-full" />
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-center shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all">
                                    {navText[lang].cta}
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
