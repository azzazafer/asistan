"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";



const SYSTEM_STATUS = [
    { label: "Neural Core v5.0", status: "ACTIVE", color: "#00ff88" },
    { label: "JWE Encryption", status: "SEALED", color: "#8b00ff" },
    { label: "Sovereign Uptime", status: "99.97%", color: "#3b82f6" },
    { label: "Madde 7 Protocol", status: "LIVE", color: "#ffd700" },
    { label: "Anti-Hack Shield", status: "ARMED", color: "#ff00ff" },
    { label: "KVKK Compliance", status: "A++", color: "#00ff88" },
];

export default function Footer() {
    const { setDemoOpen, setCoreModulesOpen, setLegalModalOpen, setLegalType } = useUser();
    const { t } = useLanguage();
    const [encSeed, setEncSeed] = useState("...");

    useEffect(() => {
        const chars = "0123456789abcdef";
        const seed = Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * 16)]).join("");
        setEncSeed(seed.match(/.{8}/g)?.join("-") || seed);
    }, []);

    return (
        <footer className="relative mt-16 border-t border-white/5 bg-black/80">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2">
                        <div className="relative w-48 h-12 mb-6 pointer-events-none">
                            <Image
                                src="/logo.png"
                                alt="Aura OS Logo"
                                fill
                                className="object-contain brightness-[1.3] saturate-[1.2]"
                            />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-8 max-w-xs">
                            {t('footer.desc')}
                        </p>
                        <div className="space-y-1.5 opacity-60">
                            {SYSTEM_STATUS.map(s => (
                                <div key={s.label} className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-gray-600 uppercase tracking-widest">{s.label}</span>
                                    <span className="font-bold" style={{ color: s.color }}>{s.status}</span>
                                </div>
                            ))}
                            <div className="text-[8px] font-mono text-gray-700 mt-4">SEED: {encSeed}</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-mono font-black text-gray-400 mb-6 tracking-widest uppercase">{t('footer.platform')}</div>
                        <ul className="space-y-3">
                            <li><a href="#neural-core" className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">{t('footer.links.neural')}</a></li>
                            <li><a href="#sovereign-funnel" className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">{t('footer.links.funnel')}</a></li>
                            <li><a href="#madde-7" className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">{t('footer.links.roi')}</a></li>
                            <li><a href="#labs-section" className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">{t('footer.links.labs')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <div className="text-[10px] font-mono font-black text-gray-400 mb-6 tracking-widest uppercase">{t('footer.quick_links')}</div>
                        <ul className="space-y-3">
                            <li>
                                <button onClick={() => setCoreModulesOpen(true)} className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">
                                    {t('footer.links.core')}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setDemoOpen(true)} className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest mt-1">
                                    {t('footer.links.sim')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="text-[10px] font-mono font-black text-gray-400 mb-6 tracking-widest uppercase">{t('footer.legal')}</div>
                        <ul className="space-y-3">
                            <li>
                                <button onClick={() => { setLegalType('kvkk'); setLegalModalOpen(true); }} className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest">
                                    {t('footer.links.kvkk')}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => { setLegalType('terms'); setLegalModalOpen(true); }} className="text-xs text-gray-500 hover:text-blue-400 transition-colors font-mono uppercase tracking-widest mt-1">
                                    {t('footer.links.terms')}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center md:items-start gap-4 pb-8 lg:pb-0">
                    <div className="flex items-center justify-center md:justify-start gap-6 opacity-40 grayscale hover:grayscale-0 transition-all w-full md:w-auto">
                        <div className="text-[10px] font-mono text-gray-500">JWE-RS256 SEALED</div>
                        <div className="text-[10px] font-mono text-gray-500">KVKK COMPLIANT</div>
                        <div className="text-[10px] font-mono text-gray-500">GDPR VERIFIED</div>
                    </div>

                    <div className="w-full flex justify-center md:justify-between items-center mt-4">
                        <div className="text-[9px] font-mono text-gray-700 tracking-widest uppercase">{t('footer.rights')}</div>
                    </div>
                </div>
            </div>

            {/* OTONOM LİSANS MÜHRÜ - DESİGN BY NEXTORIA */}
            <a
                href="https://www.nextoriadigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 left-4 z-[50] opacity-80 hidden md:flex flex-col items-center bg-black/90 backdrop-blur-xl border border-[#00ff88]/20 rounded-lg p-2.5 hover:border-[#00ff88]/60 hover:opacity-100 transition-all group shadow-[0_0_20px_rgba(0,255,136,0.15)]"
            >
                <div className="text-[8px] font-black tracking-[0.3em] text-gray-500 mb-1">DESIGN BY</div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-[#00ff88] rounded-sm flex items-center justify-center text-black font-black text-[9px] shadow-[0_0_10px_rgba(0,255,136,0.8)]">N</div>
                    <span className="text-[11px] font-mono font-black text-white tracking-[0.4em] group-hover:text-[#00ff88] transition-colors uppercase">NEXTORIA</span>
                </div>
                <div className="text-[6px] text-gray-500 mt-2 border-t border-white/10 pt-1 w-full text-center">LICENSED CYBER-CORE PRODUCT</div>
            </a>

            {/* MOBILE ONLY LİSANS MÜHRÜ IN FOOTER BOTTOM CENTER */}
            <div className="md:hidden flex flex-col items-center justify-center pb-8 border-t border-white/5 pt-6 bg-black group">
                <a
                    href="https://www.nextoriadigital.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1"
                >
                    <div className="text-[8px] font-black tracking-[0.3em] text-gray-500">DESIGN BY</div>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-4 h-4 bg-[#00ff88] rounded-sm flex items-center justify-center text-black font-black text-[10px]">N</div>
                        <span className="text-[11px] font-mono font-black text-white tracking-[0.4em] uppercase">NEXTORIA</span>
                    </div>
                    <div className="text-[6px] text-gray-600 mt-2">LICENSED CYBER-CORE PRODUCT</div>
                </a>
            </div>
        </footer>
    );
}
