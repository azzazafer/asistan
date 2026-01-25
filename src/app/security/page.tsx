"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, EyeOff, Server, HardDrive, FileCheck, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "SURGICAL-GRADE GÜVENLİK",
            subtitle: "Veri Sızıntısına Sıfır Tolerans Prototip",
            desc: "Aura OS, her hastanın medikal verisini ve finansal işlemini 'Surgical-Grade' şifreleme ile korur. HIPAA, KVKK ve GDPR standartlarının ötesinde, Nextoria Alpha mimarisi ile uçtan uca otonom güvenlik sunar.",
            items: [
                { title: "AES-256 Encryption", desc: "Tüm veri trafiği uçtan uca askeri düzeyde şifrelenir." },
                { title: "Sovereign AI", desc: "Verileriniz AI modellerini eğitmek için asla kullanılmaz veya satılmaz." },
                { title: "Instant Leak Detection", desc: "Ozon™ katmanı sayesinde anlık sızıntı denemelerini tespit eder ve bloklar." },
                { title: "HIPAA & KVKK+", desc: "Küresel sağlık verisi regülasyonlarına %100 uyum ve denetlenebilir yapı." }
            ]
        },
        en: {
            title: "SURGICAL-GRADE SECURITY",
            subtitle: "Zero-Tolerance Data Leak Protocol",
            desc: "Aura OS protects every patient's medical data and financial transaction with 'Surgical-Grade' encryption. Beyond HIPAA, KVKK, and GDPR, it offers end-to-end autonomous security via Nextoria Alpha architecture.",
            items: [
                { title: "AES-256 Encryption", desc: "All data traffic is encrypted at a military-grade level end-to-end." },
                { title: "Sovereign AI", desc: "Your data is never used to train AI models or sold." },
                { title: "Instant Leak Detection", desc: "Detects and blocks instant leak attempts via the Ozone™ layer." },
                { title: "HIPAA & KVKK+", desc: "100% compliance with global healthcare data regulations." }
            ]
        },
        ar: {
            title: "أمن من الدرجة الجراحية",
            subtitle: "بروتوكول تسريب البيانات مع عدم التسامح مطلقاً",
            desc: "أورا أوس يحمي البيانات الطبية والمعاملات المالية لكل مريض بتشفير 'جراحي'. بعيداً عن معايير HIPAA و KVKK و GDPR، فإنه يوفر أمناً ذاتياً شاملاً.",
            items: [
                { title: "AES-256 التشفير", desc: "يتم تشفير جميع حركة البيانات على مستوى عسكري من طرف إلى طرف." },
                { title: "Sovereign AI", desc: "لا يتم استخدام بياناتك أبداً لتدريب نماذج الذكاء الاصطناعي أو بيعها." },
                { title: "كشف التسريب الفوري", desc: "يكشف ويمنع محاولات التسريب الفوري عبر طبقة Ozone™." },
                { title: "HIPAA & KVKK+", desc: "امتثال بنسبة 100% للوائح بيانات الرعاية الصحية العالمية." }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6">
                <div className="max-w-[1400px] mx-auto">
                    {/* Top Info */}
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-60">
                        <div className="space-y-12">
                            <div className="inline-flex items-center gap-4 px-8 py-3 bg-red-500/10 text-red-500 rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-red-500/20 animate-pulse">
                                <Shield size={16} /> ULTRA SECURE 2026
                            </div>
                            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase italic">
                                {t.title}
                            </motion.h1>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium max-w-2xl">{t.desc}</p>
                            <div className="p-12 rounded-[4rem] bg-indigo-950/10 border border-indigo-500/20 flex items-center gap-8 group">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-3xl group-hover:rotate-12 transition-transform"><Lock /></div>
                                <div className="text-xl font-black uppercase tracking-widest text-indigo-400">ENCRYPTED AT THE CORE</div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-600/10 blur-[200px] rounded-full" />
                            <img src="/images/security_vault.png" alt="Security Vault" className="relative z-10 rounded-[6rem] border border-white/10 shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    </div>

                    {/* Security Features */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        {t.items.map((it, i) => (
                            <div key={i} className="p-16 rounded-[4rem] bg-[#020202] border border-white/5 hover:border-red-500/30 hover:bg-red-950/5 transition-all duration-700 flex gap-10 group">
                                <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl"><CheckCircle2 /></div>
                                <div className="space-y-4 flex-1">
                                    <h3 className="text-3xl font-black uppercase text-white tracking-tight">{it.title}</h3>
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
