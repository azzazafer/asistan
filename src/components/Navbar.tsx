"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useLanguage, Language } from "@/context/LanguageContext";

export default function Navbar() {
    const { userRole, setRole, setDemoOpen, setCoreModulesOpen } = useUser();
    const { language, setLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isClinic = userRole === 'clinic';
    const accentColor = isClinic ? "#3b82f6" : "#a855f7";

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const navItems = [
        { label: t('nav.solutions'), href: "#sovereign-funnel" },
        { label: t('nav.terminal'), href: "#neural-core" },
        { label: "SİBER ÇEKİRDEK", href: "#siber-cekirdek" },
        { label: t('nav.roi'), href: "#madde-7" },
        { label: t('nav.labs'), href: "#labs-section" },
        { label: t('nav.contact'), href: "#contact" },
    ];

    const toggleLanguage = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <nav id="sovereign-nav" className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>

            <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-2 lg:gap-4">
                <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center flex-shrink-0 group">
                        <div className="relative w-32 lg:w-40 h-8 lg:h-12 group-hover:scale-[1.02] transition-transform duration-500">
                            <Image
                                src="/logo.png"
                                alt="Aura OS Logo"
                                fill
                                className="object-contain brightness-[1.6] saturate-[1.6] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                priority
                            />
                        </div>
                    </a>

                    {/* Siber Çekirdek Desktop Link */}
                    <button onClick={() => setCoreModulesOpen(true)} className="hidden lg:flex items-center text-[10px] font-mono font-black text-gray-400 hover:text-white tracking-widest uppercase transition-colors whitespace-nowrap group">
                        <span className="text-red-500 mr-1.5 group-hover:animate-pulse">_</span>
                        Siber Çekirdek
                    </button>
                </div>

                {/* APPLE STYLE ROLE TOGGLE (CENTERED) */}
                <div className="hidden lg:flex flex-1 justify-center min-w-min">
                    <div className="bg-white/5 p-1 rounded-full border border-white/20 flex gap-0.5 relative overflow-hidden backdrop-blur-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <div
                            className={`absolute inset-y-1 w-[49%] bg-white/20 border border-white/30 backdrop-blur-md transition-all duration-500 rounded-full ${isClinic ? 'left-1' : 'left-[50%]'}`}
                            style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
                        />
                        <button
                            onClick={() => setRole('clinic')}
                            className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all uppercase whitespace-nowrap drop-shadow-md ${isClinic ? 'text-white' : 'text-gray-500 hover:text-gray-200'}`}
                            style={isClinic ? { textShadow: "0 2px 4px rgba(0,0,0,0.8)" } : {}}
                        >
                            {language === 'AR' ? 'عيادة أسنان' : 'DİŞ KLİNİĞİ'}
                        </button>
                        <button
                            onClick={() => setRole('agency')}
                            className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all uppercase whitespace-nowrap drop-shadow-md ${!isClinic ? 'text-white' : 'text-gray-500 hover:text-gray-200'}`}
                            style={!isClinic ? { textShadow: "0 2px 4px rgba(0,0,0,0.8)" } : {}}
                        >
                            {language === 'AR' ? 'وكالة' : 'ACENTE'}
                        </button>
                    </div>
                </div>

                {/* Right: Lang, Theme & Demo */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-5 flex-shrink-0">
                    {/* Clean Simple Lang Selector */}
                    <div className="flex gap-1 border-r border-white/10 pr-3 xl:pr-4">
                        {(['TR', 'EN', 'DE', 'AR'] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => toggleLanguage(lang)}
                                className={`text-[9px] xl:text-[10px] font-mono font-black px-1.5 py-1 transition-all rounded ${language === lang ? 'text-blue-400 bg-blue-400/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setDemoOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black px-5 xl:px-6 py-2.5 rounded-xl transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)] active:scale-95 uppercase tracking-widest whitespace-nowrap"
                    >
                        Demo ⚡
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
                    <div className={`w-6 h-0.5 mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: accentColor }} />
                    <div className={`w-6 h-0.5 mb-1.5 ${menuOpen ? "opacity-0" : ""}`} style={{ background: accentColor }} />
                    <div className={`w-6 h-0.5 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: accentColor }} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-[#050505] border-t border-white/10 px-6 py-10 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 mb-8 w-full">
                            <button onClick={() => { setRole('clinic'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${isClinic ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>DİŞ KLİNİĞİ</button>
                            <button onClick={() => { setRole('agency'); setMenuOpen(false); }} className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${!isClinic ? 'bg-purple-600 text-white' : 'text-gray-500'}`}>ACENTE</button>
                        </div>
                        {navItems.map(item => (
                            item.label === "SİBER ÇEKİRDEK" ? (
                                <button key={item.label} onClick={() => { setCoreModulesOpen(true); setMenuOpen(false); }} className="text-sm font-mono text-gray-400 hover:text-white tracking-[0.2em] uppercase font-black text-center w-full">
                                    {item.label}
                                </button>
                            ) : (
                                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm font-mono text-gray-400 hover:text-white tracking-[0.2em] uppercase font-black text-center w-full block">
                                    {item.label}
                                </a>
                            )
                        ))}
                        <button onClick={() => { setDemoOpen(true); setMenuOpen(false); }} className="w-full bg-blue-600 py-4 rounded-xl text-white font-black text-xs tracking-widest">DEMO ⚡</button>

                        <div className="flex gap-4 mt-8">
                            {(['TR', 'EN', 'DE', 'AR'] as Language[]).map((lang) => (
                                <button key={lang} onClick={() => toggleLanguage(lang)} className={`text-xs font-mono font-bold ${language === lang ? 'text-blue-500' : 'text-gray-600'}`}>{lang}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
