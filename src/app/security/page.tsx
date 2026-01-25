"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Shield, Lock, EyeOff, Server, HardDrive, FileCheck, CheckCircle2 } from "lucide-react";

export default function SecurityPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "Surgical-Grade Güvenlik",
            subtitle: "Veri Sızıntısına Sıfır Tolerans",
            desc: "Sağlık turizminde veri, en değerli varlıktır. Aura OS, her hastanın medikal verisini ve finansal işlemini 'Surgical-Grade' şifreleme ile korur. HIPAA, KVKK ve GDPR standartlarının ötesinde, Nextoria Alpha mimarisi ile uçtan uca otonom güvenlik sunar.",
            items: [
                "Uçtan Uca AES-256 Şifreleme",
                "Modellere Veri Satışı YOK (Sovereign AI)",
                "Anlık Sızıntı Tespit & Blokaj",
                "HIPAA & KVKK Tam Uyum"
            ]
        }
    };

    const t = CONTENT['tr'];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-60 pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <div className="space-y-12">
                            <div className="inline-flex items-center gap-4 px-6 py-2 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-[0.5em] border border-red-500/20">
                                <Shield size={16} /> ULTRA SECURE 2026
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                                {t.title}
                            </h1>
                            <p className="text-2xl text-slate-400 leading-relaxed font-medium">{t.desc}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {t.items.map(item => (
                                    <div key={item} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-emerald-400">
                                        <CheckCircle2 size={18} /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img src="/images/security_vault.png" alt="Security Vault" className="rounded-[4rem] border border-white/10 shadow-3xl" />
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
