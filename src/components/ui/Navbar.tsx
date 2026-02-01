"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-[2000] transition-all duration-700 ${isScrolled ? 'py-4 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]' : 'py-8 bg-transparent border-b border-transparent'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative w-full h-full p-1 bg-gradient-to-br from-[#00F0FF]/20 to-transparent rounded-xl border border-white/10 backdrop-blur-md overflow-hidden"
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
                            AURA <span className="text-[#00F0FF]">OS</span>
                        </span>
                        <span className="text-[7px] tracking-[0.4em] text-[#00F0FF]/60 font-black uppercase">Autonomous Logic</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    <Link href="/solutions/clinics" className="hover:text-emerald-400 transition-all">Klinikler</Link>
                    <Link href="/solutions/agencies" className="hover:text-emerald-400 transition-all">Partner/Ajans</Link>
                    <Link href="/technology" className="hover:text-blue-400 transition-all">Teknoloji</Link>
                    <Link href="/vision" className="hover:text-white transition-all">Vizyon</Link>
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">
                        Giriş Yap
                    </Link>
                    <Link href="/signup">
                        <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-95">
                            Ücretsiz Başla
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white relative z-[1001] hover:bg-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
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
                            className="absolute top-full left-4 right-4 mt-4 bg-black/90 backdrop-blur-4xl border border-white/10 rounded-[2.5rem] p-10 lg:hidden z-[999] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 blur-3xl rounded-full" />
                            <nav className="flex flex-col gap-10 relative z-10">
                                <Link href="/solutions/clinics" className="text-2xl font-bold tracking-tight text-white font-space hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Klinikler</Link>
                                <Link href="/solutions/agencies" className="text-2xl font-bold tracking-tight text-white font-space hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Acenteler</Link>
                                <Link href="/technology" className="text-2xl font-bold tracking-tight text-white font-space hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Teknoloji</Link>
                                <Link href="/vision" className="text-2xl font-bold tracking-tight text-white font-space hover:text-[#00F0FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Vizyon</Link>
                                <div className="h-px bg-white/10 w-full" />
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-center shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all">
                                    Ücretsiz Başla
                                </Link>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
