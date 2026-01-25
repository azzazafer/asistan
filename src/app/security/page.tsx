"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, EyeOff, Server, HardDrive, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "SECURITY PURGE • 9.0 ALPHA",
            title: "Fort Knox Standartları.",
            subtitle: "Veri sızıntısına sıfır tolerans. Aura veriyi tutmaz, sadece şifreli tünelden geçirir.",
            grid: [
                { title: "AES-256 Encryption", desc: "Tüm veri trafiği uçtan uca askeri düzeyde şifrelenir." },
                { title: "Zero-Knowledge Architecture", desc: "Veriniz sadece size aittir. Aura sunucularında asla saklanmaz." },
                { title: "Leak-Proof AI", desc: "Verileriniz AI modellerini eğitmek için asla kullanılmaz veya satılmaz." },
                { title: "GDPR & HIPAA+", desc: "Küresel sağlık verisi regülasyonlarına %100 otonom uyum." }
            ]
        },
        en: {
            tag: "SECURITY PURGE • 9.0 ALPHA",
            title: "Fort Knox Standards.",
            subtitle: "Zero-tolerance for data leaks. Aura doesn't hold data; it passes it through encrypted tunnels.",
            grid: [
                { title: "AES-256 Encryption", desc: "All data traffic is encrypted at military-grade level end-to-end." },
                { title: "Zero-Knowledge Architecture", desc: "Your data belongs only to you. It is never stored on Aura servers." },
                { title: "Leak-Proof AI", desc: "Your data is never used to train AI models or sold." },
                { title: "GDPR & HIPAA+", desc: "100% autonomous compliance with global healthcare data regulations." }
            ]
        },
        ar: {
            tag: "SECURITY PURGE • 9.0 ALPHA",
            title: "معايير فورت نوكس.",
            subtitle: "عدم التسامح مطلقاً مع تسريب البيانات. أورا لا يحتفظ بالبيانات؛ بل يمررها عبر أنفاق مشفرة.",
            grid: [
                { title: "AES-256 تشفير", desc: "يتم تشفير جميع حركة البيانات على مستوى عسكري من طرف إلى طرف." },
                { title: "Zero-Knowledge Architecture", desc: "بياناتك ملك لك وحدك. لا يتم تخزينها أبداً على خوادم أورا." },
                { title: "Leak-Proof AI", desc: "لا يتم استخدام بياناتك أبداً لتدريب نماذج الذكاء الاصطناعي أو بيعها." },
                { title: "GDPR & HIPAA+", desc: "امتثال ذاتي بنسبة 100٪ للوائح بيانات الرعاية الصحية العالمية." }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    {/* Hero Info */}
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-60">
                        <div className="space-y-12">
                            <div className="inline-flex items-center gap-4 px-8 py-3 bg-red-500/10 text-red-500 rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-red-500/20 animate-pulse">
                                <Shield size={16} /> {t.tag}
                            </div>
                            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none uppercase italic">
                                {t.title}
                            </motion.h1>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">{t.subtitle}</p>
                            <div className="p-12 rounded-[4rem] bg-indigo-950/10 border border-indigo-500/20 flex items-center gap-8 group">
                                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-3xl group-hover:rotate-12 transition-transform"><Lock size={40} /></div>
                                <div className="text-2xl font-black uppercase tracking-widest text-indigo-400">ENCRYPTED AT THE CORE</div>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-[6rem] border border-white/10 shadow-3xl">
                            <img src="/images/aura_security_tunnel_9_0_1769350112559.png" alt="Security Tunnel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                        </div>
                    </div>

                    {/* Security Features Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {t.grid.map((it, i) => (
                            <div key={i} className="p-16 rounded-[4rem] bg-[#020202] border border-white/5 hover:border-red-500/30 hover:bg-red-950/5 transition-all duration-700 flex gap-10 group">
                                <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl"><CheckCircle2 /></div>
                                <div className="space-y-4 flex-1">
                                    <h3 className="text-4xl font-black uppercase text-white tracking-tight">{it.title}</h3>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">{it.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
