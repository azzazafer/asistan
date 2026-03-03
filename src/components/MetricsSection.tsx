"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
    {
        id: "bildirim",
        label: "Bildirim Hızı",
        value: "₺14.250+",
        sub: "/ ay ortalama",
        color: "#00ff88",
        icon: "⚡",
        bar: 89,
    },
    {
        id: "verimlilik",
        label: "Operasyonel Verimlilik",
        value: "%89",
        sub: "YoY artış",
        color: "#3b82f6",
        icon: "📈",
        bar: 89,
    },
    {
        id: "hasta",
        label: "Hasta Memnuniyeti",
        value: "%97.3",
        sub: "NPS Score",
        color: "#ff00ff",
        icon: "❤️",
        bar: 97,
    },
    {
        id: "uptime",
        label: "Sistem Uptime",
        value: "99.97%",
        sub: "365/24/7",
        color: "#ffd700",
        icon: "📡",
        bar: 100,
    },
    {
        id: "latency",
        label: "API Latency",
        value: "< 12ms",
        sub: "P99",
        color: "#00ffff",
        icon: "🚀",
        bar: 95,
    },
    {
        id: "security",
        label: "Security Score",
        value: "A++",
        sub: "JWE-RS256",
        color: "#8b00ff",
        icon: "🔐",
        bar: 100,
    },
];

export default function MetricsSection() {
    const [animated, setAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="metrics" ref={sectionRef} className="py-24 px-6 relative">
            {/* BG */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 100%, rgba(139,0,255,0.06) 0%, transparent 60%)",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="sovereign-seal inline-flex mb-6">
                        <span className="seal-dot" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
                        SOVEREIGN METRİKLER
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                        Sayılarla{" "}
                        <span className="liquid-text" style={{ backgroundSize: "300% 300%" }}>
                            İmparatorluk
                        </span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
                        Her metrik; Neural Core v5.0 ile gerçek zamanlı doğrulanmış,
                        JWE imzalı ve Nextoria Sovereign protokolüyle mühürlenmiştir.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {METRICS.map((m) => (
                        <div key={m.id} id={`metric-${m.id}`} className="vault-card p-6 group">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-2xl mb-2">{m.icon}</div>
                                    <div className="text-xs font-mono text-gray-500 tracking-wide">
                                        {m.label}
                                    </div>
                                </div>
                                <div
                                    className="text-2xl font-mono font-black"
                                    style={{ color: m.color }}
                                >
                                    {m.value}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden mb-3">
                                <div
                                    className="h-full rounded-full transition-all duration-1500"
                                    style={{
                                        width: animated ? `${m.bar}%` : "0%",
                                        background: `linear-gradient(90deg, ${m.color}80, ${m.color})`,
                                        transitionDuration: "1.5s",
                                        boxShadow: `0 0 8px ${m.color}60`,
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 font-mono">{m.sub}</span>
                                <span className="text-xs font-mono" style={{ color: m.color }}>
                                    {m.bar}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sovereign stamp */}
                <div className="mt-16 text-center">
                    <div
                        className="inline-block p-8 rounded-2xl"
                        style={{
                            background: "rgba(13,13,31,0.8)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <div className="text-xs font-mono text-gray-600 mb-2 tracking-widest">
                            SİBER İMPARATORLUK MÜHÜRÜ
                        </div>
                        <div
                            className="text-2xl font-display font-black mb-2"
                            style={{
                                background: "linear-gradient(135deg, #ffd700, #ff00ff, #3b82f6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundSize: "300%",
                                animation: "liquidFlow 5s ease-in-out infinite",
                            }}
                        >
                            AURA OS V3.0 — SOVEREIGN CERTIFIED
                        </div>
                        <div className="flex justify-center gap-6 text-xs font-mono text-gray-600 flex-wrap">
                            <span>✓ Nextoria Neural Core v5.0</span>
                            <span>✓ JWE-RS256 Encrypted</span>
                            <span>✓ Hostinger public_html</span>
                            <span>✓ Madde 7 Protocol</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
