"use client";

import React, { useState } from "react";
import AuraLayout from "@/components/AuraLayout";
import { Orbit, Compass, Target, Globe, ArrowUpRight } from "lucide-react";

export default function VisionPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            title: "Vizyon 2026",
            subtitle: "Sağlık Turizminin Geleceği",
            mission: "Aura OS'un misyonu; sağlık teknolojilerini sadece birer 'araç' olmaktan çıkarıp, kurumların otonom 'yönetim bilinci' haline getirmektir.",
            vision: "2026 ve sonrasında, globaldeki her 3 başarılı sağlık operasyonundan birinin sinir merkezinde Aura OS teknolojisinin olması."
        }
    };

    const t = CONTENT['tr'];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-60 pb-40 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-40 space-y-12">
                        <h1 className="text-6xl md:text-[12rem] font-black tracking-tighter text-white leading-none uppercase">{t.title}</h1>
                        <div className="flex justify-center flex-col md:flex-row gap-10">
                            <div className="p-16 rounded-[5rem] bg-indigo-600/5 border border-indigo-500/10 flex-1 space-y-10">
                                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto"><Compass /></div>
                                <p className="text-3xl font-black italic text-white">"{t.mission}"</p>
                            </div>
                            <div className="p-16 rounded-[5rem] bg-emerald-600/5 border border-emerald-500/10 flex-1 space-y-10">
                                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto"><Target /></div>
                                <p className="text-3xl font-black italic text-emerald-400">"{t.vision}"</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#010101] to-transparent z-10" />
                        <img src="/images/global_nexus.png" alt="Global Vision 2026" className="w-full h-auto rounded-[5rem] border border-white/5 opacity-80" />
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
