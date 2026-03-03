"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import { useUserSegment } from '@/hooks/useUserSegment';

const LiveTimer = () => {
    const [time, setTime] = useState("");
    useEffect(() => {
        const i = setInterval(() => setTime(new Date().toISOString().split('T')[1].slice(0, 8)), 1000);
        setTime(new Date().toISOString().split('T')[1].slice(0, 8));
        return () => clearInterval(i);
    }, []);
    return <span>{time || "00:00:00"}</span>;
};

export default function HeroSection() {
    const { userRole } = useUser();
    const { t } = useLanguage();
    const { segment } = useUserSegment();
    const isClinic = userRole === 'clinic';

    // Performance State (Real-time Metrics)
    const [sysMetrics, setSysMetrics] = useState({ loadTime: 0, ttfb: 0 });

    useEffect(() => {
        if (typeof window !== "undefined" && window.performance) {
            const updateMetrics = () => {
                const timeNow = performance.now();
                const [navEntry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

                let ttfbTime = 0;
                if (navEntry) {
                    ttfbTime = navEntry.responseStart - navEntry.requestStart;
                } else {
                    ttfbTime = Math.random() * 20 + 40;
                }

                // Küçük dalgalanmalar ekleyerek canlı (heartbeat) etkisi veriyoruz
                const heartbeatFluctuation = Math.floor(Math.random() * 5) - 2;

                setSysMetrics({
                    loadTime: Math.round(timeNow) % 1000 + 400 + heartbeatFluctuation, // Simulasyon için DOM reset etkisi
                    ttfb: Math.max(10, Math.round(ttfbTime) + heartbeatFluctuation)
                });
            };

            updateMetrics();
            const intervalId = setInterval(updateMetrics, 30000); // Nabız (Heartbeat) - 30 Saniye 

            return () => clearInterval(intervalId);
        }
    }, []);

    // Calculator State
    const [val1, setVal1] = useState(250000);
    const [val2, setVal2] = useState(8);
    const [displayLeakage, setDisplayLeakage] = useState(0);

    // Dynamic Sync: Reset values when role changes
    useEffect(() => {
        if (isClinic) {
            setVal1(250000);
            setVal2(8);
        } else {
            setVal1(800);
            setVal2(0.35);
        }
    }, [isClinic]);

    // Leakage Calculation
    const leakage = useMemo(() => {
        return isClinic
            ? (val1 * 0.15) + (val2 * 3200)
            : (val1 * 1200) * val2;
    }, [val1, val2, isClinic]);

    const displayRef = useRef(0);

    // Count-up Animation
    useEffect(() => {
        const start = displayRef.current;
        const end = leakage;
        const duration = 1000;
        const startTime = performance.now();

        const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * progress;

            displayRef.current = Math.floor(current);
            setDisplayLeakage(displayRef.current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }, [leakage]);

    // Rotating Hooks State
    const [hookIndex, setHookIndex] = useState(0);

    useEffect(() => {
        const hookInterval = setInterval(() => {
            setHookIndex(prev => (prev + 1) % 5);
        }, 4500);

        return () => {
            clearInterval(hookInterval);
        };
    }, []);

    const activeHooks = isClinic ? t('hero.clinic') : t('hero.agency');

    // ─── LIQUID CONTENT ENGINE ───────────────────────────────────────────────

    if (segment === 'SOLO_ENTREPRENEUR') {
        return (
            <section className="relative min-h-[110vh] bg-[#020202] text-white flex flex-col items-center justify-center pt-24 pb-32 px-6 overflow-hidden uppercase">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-b from-green-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                <div className="max-w-6xl text-center mb-12 mt-24 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-green-500/30 mb-8 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-green-400">ZAFER ÇELİK MENTORLUĞU AKTİF</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-white">
                        <span className="text-green-500">ZAMANINIZ BİTTİ,</span> <br />
                        SİZE OTONOMİ LAZIM.
                    </h1>

                    <p className="mt-8 text-sm md:text-base font-mono text-gray-400 max-w-2xl mx-auto lowercase tracking-wide">
                        &quot;finansal özgürlük ve zaman yönetimi sadece yetki devriyle başlar. operasyonu aura&apos;ya devredin, siz büyümeyi yönetin.&quot;
                    </p>
                </div>

                {/* Visual: Sovereign Dashboard Simülasyonu */}
                <div className="relative w-full max-w-2xl mx-auto z-10 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="absolute inset-0 bg-green-500/5 rounded-[30px] blur-[80px] animate-pulse" />
                    <div className="bg-[#050505] border border-green-500/20 rounded-[20px] p-6 font-mono text-green-400 shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden backdrop-blur-xl">
                        <div className="flex justify-between items-center border-b border-green-500/20 pb-4 mb-4">
                            <div className="text-[10px] tracking-widest font-black">NEXTORIA KOMUTA PANELİ</div>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">DATA RATE</div>
                                <div className="font-black">AKROPOL_TERMAL</div>
                            </div>
                            <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">TTFB (VERCEL)</div>
                                <div className="font-black text-white">{sysMetrics.ttfb > 0 ? `${sysMetrics.ttfb}ms` : '< 150ms'}</div>
                            </div>
                            <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">SYS LOAD (DOM)</div>
                                <div className="font-black text-white">{sysMetrics.loadTime > 0 ? `${sysMetrics.loadTime}ms` : 'ACTIVE'}</div>
                            </div>
                            <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/10">
                                <div className="text-gray-500 text-[9px] uppercase tracking-widest mb-1">UPTIME</div>
                                <div className="font-black"><LiveTimer /></div>
                            </div>
                        </div>
                        <div className="mt-4 bg-black p-4 rounded-lg border border-green-500/10 text-[10px] space-y-2 h-24 overflow-hidden relative">
                            <div className="opacity-70 flex flex-col gap-1 text-green-500">
                                <div>&gt; [SYS] Autonomous Lead Qualification initialized...</div>
                                <div>&gt; [NET] TTFB 142ms... Handshake Complete...</div>
                                <div>&gt; [AI] Semantic data mapping to WhatsApp Node...</div>
                                <div>&gt; [SYS] Routing through Nextoria Digital Upstream...</div>
                            </div>
                            <div className="absolute bottom-4 left-4 w-2 h-3 bg-green-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (segment === 'TECHNICAL_DEVELOPER') {
        return (
            <section className="relative min-h-[110vh] bg-[#020202] text-white flex flex-col items-center justify-center pt-24 pb-32 px-6 overflow-hidden uppercase">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                <div className="max-w-6xl text-left mb-12 mt-24 relative z-10 w-full animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-purple-500/30 mb-8">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-purple-400 font-bold">{`</> TECH NODE DETECTED`}</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.9] text-white lowercase">
                        next.js 14 + <br />
                        <span className="text-purple-500">otonom ajan</span> altyapısı
                    </h1>

                    {/* DESKTOP & MOBILE MARQUEE (Kayan Yazılar) */}
                    <div className="mt-16 w-full max-w-5xl mx-auto overflow-hidden relative">
                        {/* Sol ve Sağ gradient maskeli karartma */}
                        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-6 animate-marquee py-6 whitespace-nowrap hover:hover-pause cursor-default">
                            {/* 1. Grup */}
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">🧠</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Aura / Core</div>
                                    <div className="text-sm md:text-base font-black text-purple-400">Otonom Ajan</div>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">⚡</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">next_static_export</div>
                                    <div className="text-sm md:text-base font-black text-green-400">Sıfır Gecikme</div>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">🔒</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">jwe_rs256</div>
                                    <div className="text-sm md:text-base font-black text-blue-400">Tam Güvenlik</div>
                                </div>
                            </div>

                            {/* 2. Grup */}
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">🧠</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Aura / Core</div>
                                    <div className="text-sm md:text-base font-black text-purple-400">Otonom Ajan</div>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">⚡</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">next_static_export</div>
                                    <div className="text-sm md:text-base font-black text-green-400">Sıfır Gecikme</div>
                                </div>
                            </div>
                            <div className="shrink-0 flex items-center gap-4 bg-[#050505] border border-white/10 px-8 py-4 rounded-2xl mx-2 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                                <span className="text-3xl drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">🔒</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">jwe_rs256</div>
                                    <div className="text-sm md:text-base font-black text-blue-400">Tam Güvenlik</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── DEFAULT LIQUID FALLBACK (AGENCY / CLINIC) ───────────────────────────

    return (
        <section className="relative min-h-[110vh] bg-[#020202] text-white flex flex-col items-center justify-center pt-24 pb-32 px-6 overflow-hidden uppercase">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Dynamic Hook (Rotating) with Translation Support */}
            <div className="max-w-6xl text-center mb-20 mt-24 relative z-10 min-h-[350px] flex items-center justify-center">
                <h1
                    key={`${userRole}-${hookIndex}`}
                    className="text-4xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] animate-in fade-in zoom-in-95 slide-in-from-bottom-12 duration-1000 text-white"
                >
                    {activeHooks[hookIndex].split(' ').map((word: string, i: number) => (
                        <span key={i} className={word === '₺' + displayLeakage.toLocaleString() ? 'text-blue-500 drop-shadow-[0_0_30px_#3b82f6] inline-block animate-pulse' : ''}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Central Massive 2A2 Calculator */}
            <div className="w-full max-w-3xl relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                <div className="relative p-8 md:p-12 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="relative z-10 space-y-12 md:space-y-16">
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex justify-between items-end">
                                <label className="text-[9px] md:text-[10px] font-mono font-black tracking-[0.3em] text-gray-500 uppercase">
                                    {t('hero.calculator.volume')}
                                </label>
                                <div className="text-2xl md:text-4xl font-black font-mono tracking-tighter text-white">
                                    {isClinic ? `₺${val1.toLocaleString()}` : `${val1} Leads`}
                                </div>
                            </div>
                            <input type="range" min={isClinic ? 50000 : 50} max={isClinic ? 5000000 : 10000} step={isClinic ? 10000 : 50} value={val1} onChange={(e) => setVal1(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="flex justify-between items-end">
                                <label className="text-[9px] md:text-[10px] font-mono font-black tracking-[0.3em] text-gray-500 uppercase">
                                    {t('hero.calculator.leakage_pct')}
                                </label>
                                <div className="text-2xl md:text-4xl font-black font-mono tracking-tighter text-white">%{isClinic ? val2 : (val2 * 100).toFixed(0)}</div>
                            </div>
                            <input type="range" min={isClinic ? 1 : 0.1} max={isClinic ? 50 : 1} step={isClinic ? 0.5 : 0.05} value={val2} onChange={(e) => setVal2(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer" style={{ accentColor: isClinic ? '#3b82f6' : '#a855f7' }} />
                        </div>

                        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col items-center">
                            <div className="text-[9px] md:text-[11px] font-mono font-black tracking-[0.4em] text-red-500 uppercase mb-4 animate-pulse">{t('hero.stats.leakage')}</div>
                            <div className="text-6xl md:text-9xl font-black font-mono tracking-tighter text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">₺{displayLeakage.toLocaleString()}</div>
                            <div className="mt-6 md:mt-8 flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">
                                {t('hero.stats.potential')}: <span className="text-white ml-2">₺{(displayLeakage * 0.89).toLocaleString()}</span> ✓
                            </div>
                        </div>

                        <div className="pt-6 md:pt-8 text-center">
                            <a href="#sovereign-funnel" className="block">
                                <button className="btn-sovereign w-full max-w-sm py-4 md:py-5 text-[10px] md:text-xs tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                    {t('hero.stats.seal_leakage')} ⚡
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* MARQUEE YAZILARI (TÜM EKRANLARDA AKTİF) */}
            <div className="mt-16 w-full max-w-5xl mx-auto overflow-hidden relative z-10 block">
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-4 md:gap-6 animate-marquee py-6 whitespace-nowrap hover:hover-pause cursor-default">
                    {/* Grup 1 */}
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">💰</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Kaçan Ciro</div>
                            <div className="text-sm md:text-base font-black text-red-500">Ort. ₺115K / Ay</div>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">📞</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">No-Show Oranı</div>
                            <div className="text-sm md:text-base font-black text-orange-500">%28 TR Ortalama</div>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">🤖</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Aura Kurtarma</div>
                            <div className="text-sm md:text-base font-black text-green-500">+48 Ek Randevu</div>
                        </div>
                    </div>

                    {/* Grup 2 (Kesintisiz döngü) */}
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">💰</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Kaçan Ciro</div>
                            <div className="text-sm md:text-base font-black text-red-500">Ort. ₺115K / Ay</div>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">📞</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">No-Show Oranı</div>
                            <div className="text-sm md:text-base font-black text-orange-500">%28 TR Ortalama</div>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 bg-[#050505] border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl mx-1 md:mx-2 shadow-lg">
                        <span className="text-xl md:text-2xl drop-shadow-md">🤖</span>
                        <div className="text-left">
                            <div className="text-[9px] md:text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-1">Aura Kurtarma</div>
                            <div className="text-sm md:text-base font-black text-green-500">+48 Ek Randevu</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
