"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Cpu, Fingerprint, Radio, Zap, Workflow, Server, Database, LucideIcon } from "lucide-react";

export default function TechnologyPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "Teknolojik Çekirdek",
            subtitle: "Nex-Scan™ & Neural Alpha",
            desc: "Aura OS, standart bir AI değil; 120,000'den fazla başarılı sağlık operasyonu verisiyle eğitilmiş, otonom bir bilişsel katmandır. Dünyada cerrahi niyet analizi ile finansal kapanışı saniyeler içinde birleştiren tek motordur.",
            techStack: [
                { title: "Nex-Scan™ AI", desc: "Hastanın gönderdiği medikal fotoğrafları (Diş, Saç, Estetik) 0.1mm hassasiyetle dijital olarak analiz eder.", icon: Cpu },
                { title: "Neural Messaging", desc: "WhatsApp, Instagram ve Telegram üzerinden gelen mesajları kültürel tonlama ve ikna dillerine göre otonom yönetir.", icon: Radio },
                { title: "Closing Protocol", desc: "En kritik anda, insan müdahalesi olmadan depozito tahsilatını Stripe altyapısıyla gerçekleştirir.", icon: Zap }
            ]
        }
    };

    const t = CONTENT['tr'];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-60 pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32 space-y-10">
                        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none">{t.title}</h1>
                        <p className="text-3xl font-black text-indigo-400 italic">"Geleceğin Satış Altyapısı"</p>
                        <p className="text-2xl text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">{t.desc}</p>
                    </div>

                    <div className="grid lg:grid-cols-1 gap-12">
                        {t.techStack.map((tech, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-16 p-16 rounded-[5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                <div className="w-32 h-32 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <tech.icon size={64} />
                                </div>
                                <div className="flex-1 space-y-6">
                                    <h3 className="text-4xl font-black uppercase text-white tracking-tight">{tech.title}</h3>
                                    <p className="text-2xl text-slate-400 font-medium leading-relaxed">{tech.desc}</p>
                                </div>
                                <div className="hidden lg:block text-[150px] font-black text-white/[0.02] select-none leading-none">0{i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
