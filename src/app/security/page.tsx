"use client";

import React from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, CheckCircle2, Server, EyeOff, Zap, ChevronRight, Activity, ShieldCheck, Database, HardDrive, Cpu } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedNumber from "@/components/AnimatedNumber";

export default function SecurityGodModePage() {
    return (
        <AuraLayout>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Background Visual Texture */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/10 to-transparent" />

                <div className="max-w-[1400px] mx-auto space-y-40">
                    {/* --- HERO: THE SHIELD --- */}
                    <div className="space-y-12 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 px-8 py-3 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-[0.5em] border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]"
                        >
                            <Shield size={16} className="animate-pulse" /> SECURITY ALPHA • V12.0
                        </motion.div>
                        <h1 className="text-6xl md:text-[11rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic font-space">
                            Finansal Güvenlik<br />
                            <span className="text-red-500 transition-colors duration-1000">Kalkanı.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-[#B0B0B0] max-w-4xl leading-relaxed italic border-l-2 border-red-500/20 pl-10">
                            "Veri sızıntısına sıfır tolerans. Aura OS, veriyi kendi bünyesinde tutmaz; sadece askeri düzeydeki şifreli tünellerden geçirir. Güvenliğimiz, pazarın en üst limitindedir."
                        </p>
                    </div>

                    {/* --- SECURITY MATRIX --- */}
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-12 xl:col-span-7 relative group rounded-[4rem] overflow-hidden border border-white/5 bg-black/40 p-12 md:p-2 shadow-[0_50px_100px_-20px_rgba(239,68,68,0.1)] aspect-video">
                            <img
                                src="/images/aura_security_nexus_vault.png"
                                alt="Aura Security Vault"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[5000ms] grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                            {/* Additional Security Layer Visual */}
                            <img
                                src="/images/security_vault.png"
                                alt="Security Core"
                                className="absolute bottom-10 right-10 w-48 h-48 object-contain opacity-40 mix-blend-screen animate-pulse pointer-events-none"
                            />

                            <div className="relative z-20 flex flex-col items-center justify-center h-full gap-10">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Lock size={80} className="text-red-500" />
                                </motion.div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-[8rem] font-black text-white tracking-tighter font-space">
                                        AES-256
                                    </div>
                                    <div className="text-red-500 text-[10px] font-black tracking-[1em] mt-6">ACTIVE SHIELD TUNNEL</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                            <SecurityItem
                                title="Zero-Knowledge"
                                text="Veriniz sadece size aittir. Aura sinir ağları veriyi asla saklamaz veya işlemez; sadece iletir."
                            />
                            <SecurityItem
                                title="GDPR & HIPAA"
                                text="Küresel sağlık ve veri koruma standartlarına %100 uyum. Veri trafiği her an denetlenebilir."
                            />
                            <SecurityItem
                                title="Fail-Safe Bridge"
                                text="Olası bir teknik aksaklıkta, finansal köprüler otonom olarak 'Safe-Mode'a geçer ve işlemler korunur."
                            />
                        </div>
                    </div>

                    {/* --- STATUS PULSE --- */}
                    <div className="p-10 md:p-20 rounded-[4rem] bg-white/[0.01] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-red-500/5 rounded-full flex items-center justify-center text-red-500 animate-pulse border border-red-500/20"><Activity size={32} /></div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">AURA ENCRYPTION NODE</div>
                                <div className="text-2xl font-bold text-white italic font-space">Askeri Düzey Tünel Aktif</div>
                            </div>
                        </div>
                        <div className="px-12 py-5 bg-black rounded-2xl border border-white/5 flex items-center gap-8">
                            <div className="text-center">
                                <div className="text-xs font-black text-slate-600 uppercase tracking-widest">Sızıntı</div>
                                <div className="text-xl font-bold text-white">0.00%</div>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center">
                                <div className="text-xs font-black text-slate-600 uppercase tracking-widest">Gecikme</div>
                                <div className="text-xl font-bold text-white">0.4ms</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <div className="text-[10px] font-black uppercase tracking-[1em] text-slate-800 mb-8">SECURE INFRASTRUCTURE • ALPHA 2026</div>
                <div className="flex justify-center gap-12 opacity-10">
                    <Database size={24} />
                    <HardDrive size={24} />
                    <Cpu size={24} />
                </div>
            </footer>
        </AuraLayout>
    );
}

function SecurityItem({ title, text }: { title: string, text: string }) {
    return (
        <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-red-500/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-red-500/20 to-transparent" />
            <div className="space-y-4 relative z-10">
                <h3 className="text-3xl font-bold uppercase italic text-white tracking-tighter font-space">{title}</h3>
                <p className="text-lg text-[#B0B0B0] font-medium leading-relaxed">{text}</p>
            </div>
        </div>
    );
}
