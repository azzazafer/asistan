"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';

interface CoreModulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MODULES = [
    {
        id: "01",
        title: "NÖRAL SATIŞ AĞI",
        subtitle: "Neural Sales Network",
        redactedText: "Deep Learning Dönüşüm Algoritması",
        statusLabel: "Kayıptan Kaçınma Algoritması:",
        statusValue: "AKTİF",
        color: "text-blue-500",
        bgLight: "bg-blue-500/10",
        borderColor: "border-blue-500/30"
    },
    {
        id: "02",
        title: "MEDİKAL ZEKA MOTORU",
        subtitle: "Medical Intelligence Engine",
        redactedText: "Dinamik İtiraz Kırma Protokolleri",
        statusLabel: "Protokol Eşleştirme Hızı:",
        statusValue: "< 0.2ms",
        color: "text-purple-500",
        bgLight: "bg-purple-500/10",
        borderColor: "border-purple-500/30"
    },
    {
        id: "03",
        title: "OMNICHANNEL İLETİŞİM",
        subtitle: "Omnichannel Comm",
        redactedText: "Görünmez Veri Senkronizasyonu",
        statusLabel: "Meta & WA Entegrasyonu:",
        statusValue: "TAMAMLANDI",
        color: "text-emerald-500",
        bgLight: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30"
    },
    {
        id: "04",
        title: "ASKERİ GRADE GÜVENLİK",
        subtitle: "Military Grade Security",
        redactedText: "Tersine Mühendislik Savunması",
        statusLabel: "AES-256 Şifreleme:",
        statusValue: "DEVREDE",
        color: "text-red-500",
        bgLight: "bg-red-500/10",
        borderColor: "border-red-500/30"
    },
    {
        id: "05",
        title: "OTONOM CRM YÖNETİMİ",
        subtitle: "Autonomous CRM",
        redactedText: "Davranışsal Ağırlık Skorlaması",
        statusLabel: "Sıfır İnsan Müdahalesi:",
        statusValue: "ONAYLANDI",
        color: "text-amber-500",
        bgLight: "bg-amber-500/10",
        borderColor: "border-amber-500/30"
    },
    {
        id: "06",
        title: "BİYOMETRİK PROFİLLEME",
        subtitle: "Biometric Profiling",
        redactedText: "Mikro-İfade ve Duygu Gözetimi",
        statusLabel: "Duygu Durum Tespiti:",
        statusValue: "DEVREDE",
        color: "text-cyan-500",
        bgLight: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30"
    },
    {
        id: "07",
        title: "REKABETÇİ İSTİHBARAT",
        subtitle: "Competitive Intelligence",
        redactedText: "Agresif Pazar Payı Hırsızı",
        statusLabel: "Gerçek Zamanlı Analiz:",
        statusValue: "AKTİF",
        color: "text-rose-500",
        bgLight: "bg-rose-500/10",
        borderColor: "border-rose-500/30"
    },
    {
        id: "08",
        title: "PREDİKTİF ANALİTİK",
        subtitle: "Predictive Analytics",
        redactedText: "Kuantum Kâr Projeksiyonları",
        statusLabel: "90-Günlük Tahminleme:",
        statusValue: "LIVE",
        color: "text-indigo-500",
        bgLight: "bg-indigo-500/10",
        borderColor: "border-indigo-500/30"
    }
];

export default function CoreModulesModal({ isOpen, onClose }: CoreModulesModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-[20px] animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-7xl h-full max-h-[90vh] bg-[#050505] rounded-[32px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">

                {/* Close Button X */}
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-6 right-4 md:right-6 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-90 group shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                    <span className="text-2xl font-black transition-transform duration-300 group-hover:rotate-90">✕</span>
                </button>

                {/* Content Area */}
                <div className="relative flex-1 overflow-y-auto w-full p-6 md:p-12 scrollbar-hide">

                    {/* Yarı saydam büyük filigran (Watermark) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] z-0 opacity-[0.03] pointer-events-none flex items-center justify-center mix-blend-screen fixed">
                        <Image
                            src="/logo.png"
                            alt="Aura OS Watermark"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Arka plan siber grid ve gradient */}
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] min-h-full pointer-events-none"></div>

                    <div className="relative z-10 w-full mx-auto">
                        <div className="text-center mb-16 space-y-4 pt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                Top Secret • Classified Document
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                                Siber Çekirdek
                            </h2>
                            <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                                Aura OS 8 Ana Modülü. <br className="md:hidden" />
                                <span className="text-gray-600 line-through">Mimari Detaylar</span> <span className="bg-black text-black px-1 mx-1 select-none pointer-events-none border border-gray-800">GIZLILIK</span> Protokolü gereği karartılmıştır. Sadece vadedilen sonuçları görüntüleme yetkiniz var.
                            </p>
                        </div>

                        {/* Mobil Uyumlu Listeleme (Dikey Kaydırma) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {MODULES.map((module, idx) => (
                                <div
                                    key={module.id}
                                    className={`group relative p-6 bg-black/60 border ${module.borderColor} rounded-2xl backdrop-blur-md overflow-hidden flex flex-col justify-between h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] hover:bg-black/80`}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Köşe Etiketi */}
                                    <div className="absolute top-0 right-0 px-2 py-1 bg-white/5 border-l border-b border-white/10 text-[8px] font-mono text-gray-500 rounded-bl-lg">
                                        MOD-{module.id}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-white tracking-wide uppercase">
                                                {module.title}
                                            </h3>
                                            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                                                {module.subtitle}
                                            </div>
                                        </div>

                                        {/* Redacted Info */}
                                        <div className="text-xs font-mono">
                                            <span className="text-gray-600 mr-2">Core Tech:</span>
                                            {/* REDACTED CSS EFFECT */}
                                            <span className="bg-[#111] text-transparent select-none cursor-not-allowed pointer-events-none px-2 py-0.5 rounded shadow-[inset_0_0_10px_rgba(0,0,0,1)] bg-[repeating-linear-gradient(45deg,rgba(0,0,0,1)_0px,rgba(0,0,0,1)_4px,rgba(20,20,20,1)_4px,rgba(20,20,20,1)_8px)] border border-gray-900 relative z-10 w-full inline-block mt-1">
                                                {module.redactedText}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Bottom */}
                                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/5">
                                        <span className="text-[10px] text-gray-500 font-mono uppercase">
                                            {module.statusLabel}
                                        </span>
                                        <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded w-fit border border-white/5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${module.bgLight} ${module.color} animate-pulse shadow-[0_0_10px_currentColor]`}></span>
                                            <span className={`text-[11px] font-black ${module.color} uppercase tracking-widest`}>
                                                {module.statusValue}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Arka Plan Aydınlatması */}
                                    <div className={`absolute inset-0 ${module.bgLight} opacity-0 group-hover:opacity-10 transition-opacity z-0 pointer-events-none`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
