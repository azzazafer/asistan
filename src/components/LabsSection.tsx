"use client";

import React from 'react';

const LABS_CORES = [
    {
        title: "Görsel Teşhis Motoru v2.1",
        desc: "X-Ray ve Panoramik görüntülerde sızıntı tespiti yapan computer vision çekirdeği.",
        status: "STABLE",
        icon: "🔬"
    },
    {
        title: "Deterministik Randevu Hafızası",
        desc: "Unutulan hastaları ve boş koltukları milisaniyeler içinde eşleştiren otonom eşleşme hafızası.",
        status: "CORE",
        icon: "🧠"
    },
    {
        title: "Kültürel Bukalemun Chat v6.0",
        desc: "12 dilde tıbbi ikna ve yerel kültürel kodlarla satış kapatan otonom agent.",
        status: "EVOLVING",
        icon: "🌍"
    },
    {
        title: "JWE-RS256 Güvenlik Mührü",
        desc: "Hasta verilerini RSA-2048 ile mühürleyen ve KVKK uyumluluğunu otonom denetleyen protokol.",
        status: "ARMED",
        icon: "🔐"
    }
];

export default function LabsSection() {
    return (
        <section className="py-32 px-6 bg-[#020202] relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono tracking-[0.3em] text-blue-500 uppercase mb-6">
                            Aura Labs — Autonomous Core R&D
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                            Geliştirilen <span className="text-blue-500">Otonom Çekirdekler</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm font-medium italic">
                            &quot;Mış gibi&quot; yapmayan teknolojilerin doğum yeri.
                        </p>
                    </div>
                </div>

                {/* Labs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {LABS_CORES.map((core, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 group"
                        >
                            <div className="text-3xl mb-8 group-hover:scale-110 transition-transform">{core.icon}</div>
                            <h3 className="text-white font-bold text-lg mb-4 tracking-tight uppercase group-hover:text-blue-500 transition-colors">{core.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed mb-8">
                                {core.desc}
                            </p>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-[9px] font-mono font-black text-gray-700 uppercase tracking-widest">Protocol Status</span>
                                <span className="text-[9px] font-mono font-black text-blue-500 uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">{core.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
