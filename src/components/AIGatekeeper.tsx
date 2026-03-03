"use client";

import React, { useState } from 'react';

export default function AIGatekeeper() {
    const [step, setStep] = useState(0); // 0: Fab, 1: Q1, 2: Q2, 3: Result
    const [volume, setVolume] = useState<string | null>(null);
    const [, setSatisfaction] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const isHighVolume = volume === '50+' || volume === '100+';

    const reset = () => {
        setStep(0);
        setVolume(null);
        setSatisfaction(null);
        setIsTyping(false);
    };

    const handleNext = (val: string, nextStep: number) => {
        setIsTyping(true);
        setTimeout(() => {
            if (nextStep === 2) setVolume(val);
            if (nextStep === 3) setSatisfaction(val);
            setStep(nextStep);
            setIsTyping(false);
        }, 800);
    };

    if (step === 0) {
        return (
            <button
                onClick={() => setStep(1)}
                className="fixed bottom-6 right-6 z-[100] group flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-white/10 p-2 pr-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-blue-500/50 transition-all active:scale-95 animate-in slide-in-from-right-10 duration-1000"
            >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                    🤖
                </div>
                <div className="text-left">
                    <div className="text-[10px] font-mono font-black text-blue-500 tracking-widest uppercase mb-0.5">Aura Otonom Asistan</div>
                    <div className="text-xs font-bold text-white tracking-tight">Sızıntı Analizini Başlat</div>
                </div>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-[#0b0b0b] rounded-[40px] border border-white/10 p-10 shadow-[0_0_80px_rgba(0,0,0,1)] relative overflow-hidden">

                {/* Close */}
                <button onClick={reset} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-all text-xl">✕</button>

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-3xl mb-8 mx-auto animate-pulse">
                        🤖
                    </div>

                    {isTyping ? (
                        <div className="text-center py-10 animate-pulse">
                            <div className="text-[10px] font-mono font-black text-blue-500 tracking-[0.5em] uppercase">AI Veriyi İşliyor...</div>
                        </div>
                    ) : (
                        <>
                            {step === 1 && (
                                <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Otonom Teşhis</h3>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">Analizi mühürlemek için: Aylık ortalama hasta hacminiz (veya lead trafiğiniz) nedir?</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['0-20', '20-50', '50-100', '100+'].map((v) => (
                                            <button
                                                key={v}
                                                onClick={() => handleNext(v, 2)}
                                                className="py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                                            >
                                                {v} {v === '100+' ? 'Hasta/Lead' : ''}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="text-center animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Sistem Durumu</h3>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">Mevcut takip sisteminizden memnuniyet oranınız nedir?</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Çok Memnunum (Sızıntı Yok)', 'Orta (Verimlilik Düşük)', 'Hiç Memnun Değilim (Kaos Var)'].map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => handleNext(r, 3)}
                                                className="py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-left px-6"
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center animate-in zoom-in-95 duration-500">
                                    <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black font-mono tracking-widest uppercase animate-pulse">
                                        Analiz Mühürlendi
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Karar Mekanizması</h3>
                                    <p className="text-gray-400 text-sm mb-10 leading-relaxed min-h-[60px]">
                                        {isHighVolume
                                            ? "Tespit Edilen Sızıntı Kritik. Aylık kaybınız ₺50.000 üzerindedir. Kurucumuz ile VIP strateji görüşmesi için onaylandınız."
                                            : "Mevcut hacminiz için Aura OS Lite protokolü önerilir. Teknik detayları ve ROI planını hemen inceleyin."}
                                    </p>

                                    {isHighVolume ? (
                                        <a
                                            href="https://wa.me/905510596718"
                                            target="_blank"
                                            className="block w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-liquidFlow text-white font-black text-sm tracking-widest shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
                                        >
                                            KURUCU ONAYLI VIP GÖRÜŞME ⚡
                                        </a>
                                    ) : (
                                        <div className="space-y-4">
                                            <button className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(59,130,246,0.2)]">
                                                SIZINTI RAPORU PDF (İNDİR) ↓
                                            </button>
                                            <p className="text-[10px] text-gray-600 font-mono italic">PDF Simülasyonu Hazırlanıyor...</p>
                                        </div>
                                    )}

                                    <button onClick={reset} className="mt-8 text-[10px] font-mono text-gray-600 uppercase tracking-widest hover:text-gray-400 transition-colors">Yeniden Başlat</button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 blur-[80px] pointer-events-none" />
            </div>
        </div>
    );
}
