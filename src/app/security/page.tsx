"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, CheckCircle2, Server, EyeOff, Zap, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityGodModePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "SECURITY ALPHA • V11.0",
            title: "Finansal Güvenlik\nKalkanı.",
            subtitle: "Veri sızıntısına sıfır tolerans. Aura OS, veriyi kendi bünyesinde tutmaz; sadece askeri düzeydeki şifreli tünellerden geçirir. Güvenliğimiz, pazarın en üst limitindedir.",
            grid: [
                { title: "AES-256 Askeri Standart", desc: "Tüm finansal ve medikal trafik uçtan uca, kırılması imkansız askeri düzey algoritmalarla şifrelenir." },
                { title: "Zero-Knowledge Protokolü", desc: "Veriniz sadece size aittir. Aura sinir ağları veriyi asla saklamaz veya işlemez." }
            ]
        },
        en: {
            tag: "SECURITY ALPHA • V11.0",
            title: "Financial Security\nShield.",
            subtitle: "Zero-tolerance for data leaks. Aura OS does not store data; it only passes it through military-grade encrypted tunnels. Our security is at the absolute market limit.",
            grid: [
                { title: "AES-256 Military Standard", desc: "All financial and medical traffic is encrypted end-to-end with unbreakable military-level algorithms." },
                { title: "Zero-Knowledge Protocol", desc: "Your data belongs only to you. Aura neural networks never store or process the data permanently." }
            ]
        },
        ar: {
            tag: "SECURITY ALPHA • V11.0",
            title: "درع\nالأمان المالي.",
            subtitle: "عدم التسامح مطلقاً مع تسريب البيانات. أورا أوس لا يخزن البيانات؛ بل يمررها فقط عبر أنفاق مشفرة بمستوى عسكري. أمننا هو الحد المطلق للسوق.",
            grid: [
                { title: "معيار AES-256 العسكري", desc: "يتم تشفير جميع حركات البيانات المالية والطبية من طرف إلى طرف بخوارزميات عسكرية مستحيلة الكسر." },
                { title: "بروتوكول المعرفة الصفرية", desc: "بياناتك ملك لك وحدك. شبكات أورا العصبية لا تخزن أو تعالج البيانات بشكل دائم أبداً." }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/[0.01] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-4 px-8 py-3 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-[0.5em] border border-red-500/20">
                            <Shield size={16} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                        <p className="text-2xl text-slate-500 max-w-4xl font-medium leading-relaxed italic">"{t.subtitle}"</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-20 mb-40 items-center">
                        <div className="lg:col-span-12 xl:col-span-7 relative group">
                            <motion.div initial={{ rotateX: 10 }} whileInView={{ rotateX: -5 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(239,68,68,0.15)] grayscale group-hover:grayscale-0 transition-all duration-2000">
                                <img src="/images/aura_security_tunnel_9_0_1769350112559.png" alt="" className="w-full h-auto object-cover opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent" />
                            </motion.div>
                        </div>
                        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                            {t.grid.map((it, i) => (
                                <div key={i} className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-8 hover:border-red-500/30 hover:bg-white/[0.02] transition-all relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-white/10 shadow-2xl group-hover:bg-red-500 group-hover:text-black transition-all"><CheckCircle2 size={24} /></div>
                                        <h3 className="text-4xl font-bold uppercase text-white tracking-tighter italic">{it.title}</h3>
                                    </div>
                                    <p className="text-2xl text-slate-500 font-medium leading-relaxed">{it.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Security Pulse */}
                    <div className="p-12 md:p-20 rounded-[4rem] bg-black/40 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 group">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-red-500 group-hover:animate-pulse"><Activity size={32} /></div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-600 mb-2">Network Status</div>
                                <div className="text-3xl font-bold text-white uppercase italic tracking-tighter">Encrypted Alpha Tunnel Active</div>
                            </div>
                        </div>
                        <div className="px-10 py-5 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.5em] rounded-full">FORT KNOX CERTIFIED</div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-white/10 mb-4">Aura Security Operations</p>
                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white uppercase italic tracking-tighter hover:text-red-500 transition-colors">WWW.NEXTORIADIGITAL.COM</a>
            </section>
        </AuraLayout>
    );
}
