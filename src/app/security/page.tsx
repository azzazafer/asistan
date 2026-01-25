"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, CheckCircle2, Server, EyeOff, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityPrestigePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "SECURITY ALPHA • V10.0",
            title: "Finansal Güvenlik\nKatmanı.",
            subtitle: "Veri sızıntısına sıfır tolerans. Aura OS, veriyi kendi bünyesinde tutmaz; sadece askeri düzeydeki şifreli tünellerden geçirir.",
            grid: [
                { title: "AES-256 Standardı", desc: "Tüm finansal ve medikal trafik uçtan uca askeri düzeyde şifrelenir." },
                { title: "Zero-Knowledge", desc: "Veriniz sadece size aittir. Aura sinir ağları veriyi asla saklamaz." }
            ]
        },
        en: {
            tag: "SECURITY ALPHA • V10.0",
            title: "Financial Security\nLayer.",
            subtitle: "Zero-tolerance for data leaks. Aura OS doesn't store data; it only passes it through military-grade encrypted tunnels.",
            grid: [
                { title: "AES-256 Standard", desc: "All financial and medical traffic is encrypted end-to-end at military level." },
                { title: "Zero-Knowledge", desc: "Your data belongs only to you. Aura neural networks never store it." }
            ]
        },
        ar: {
            tag: "SECURITY ALPHA • V10.0",
            title: "طبقة\nالأمان المالي.",
            subtitle: "عدم التسامح مطلقاً مع تسريب البيانات. أورا أوس لا يخزن البيانات؛ بل يمررها فقط عبر أنفاق مشفرة على مستوى عسكري.",
            grid: [
                { title: "معيار AES-256", desc: "يتم تشفير جميع حركات البيانات المالية والطبية من طرف إلى طرف." },
                { title: "الوعي الصفري", desc: "بياناتك ملك لك وحدك. شبكات أورا العصبية لا تخزنها أبداً." }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505] overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-40 space-y-12 text-left">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-4 px-8 py-3 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-[0.5em] border border-red-500/20">
                            <Shield size={16} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">{t.title}</h1>
                        <p className="text-2xl text-slate-500 max-w-3xl font-medium leading-relaxed">{t.subtitle}</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-20 mb-40 items-center">
                        <div className="lg:col-span-7 relative group">
                            <motion.div initial={{ rotateX: 20 }} whileInView={{ rotateX: -5 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img src="/images/aura_security_tunnel_9_0_1769350112559.png" alt="" className="w-full h-auto object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent" />
                            </motion.div>
                        </div>
                        <div className="lg:col-span-5 space-y-12">
                            {t.grid.map((it, i) => (
                                <div key={i} className="p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-6 hover:border-red-500/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500"><CheckCircle2 size={24} /></div>
                                        <h3 className="text-3xl font-bold uppercase text-white tracking-tighter italic">{it.title}</h3>
                                    </div>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">{it.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
