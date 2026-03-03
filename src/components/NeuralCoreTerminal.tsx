"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/UserContext";

const PATIENT_TERMINAL_LINES = [
    { delay: 0, color: "#a855f7", text: "» AURA OS V3.0 — AGENCY CENTER ACTIVE" },
    { delay: 400, color: "#00ff88", text: "✓ Lead tracking engine initialized [OK]" },
    { delay: 800, color: "#00ffff", text: "  Lead conversion analytics loading..." },
    { delay: 1200, color: "#00ff88", text: "✓ Commission protection protocol [OK]" },
    { delay: 1600, color: "#ffd700", text: "  JWE encrypted agency data stream..." },
    { delay: 2000, color: "#00ff88", text: "✓ HIPAA & KVKK compliance sealed [OK]" },
    { delay: 2400, color: "#ff00ff", text: "  Global intake terminal sync..." },
    { delay: 2800, color: "#00ff88", text: "✓ Persuasion Hub ready [OK]" },
    { delay: 3200, color: "#00ffff", text: "  Real-time ROI projecting..." },
    { delay: 3600, color: "#00ff88", text: "✓ Alpha Command (Agency) active [OK]" },
    { delay: 4000, color: "#a855f7", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
    { delay: 4400, color: "#ff00ff", text: "» AURA CORE™ v5.0 — LEAD SOVEREIGNTY SEALED" },
    { delay: 4800, color: "#00ff88", text: "  Latency: 12ms | JWE: SEALED | Nodes: 847 LIVE" },
];

const DOCTOR_TERMINAL_LINES = [
    { delay: 0, color: "#3b82f6", text: "» AURA OS V3.0 — CLINIC SYSTEM ACTIVE" },
    { delay: 400, color: "#00ff88", text: "✓ Operation motor initialized [OK]" },
    { delay: 800, color: "#00ffff", text: "  60 competency modules loading..." },
    { delay: 1200, color: "#00ff88", text: "✓ Alpha Command Center (Clinic) active [OK]" },
    { delay: 1600, color: "#ffd700", text: "  Madde 7 σ_noise formula calibrated..." },
    { delay: 2000, color: "#00ff88", text: "✓ σ = √(σ²_sys + σ²_env) — Baseline [OK]" },
    { delay: 2400, color: "#00ffff", text: "  Patient flow optimization analyze..." },
    { delay: 2800, color: "#00ff88", text: "✓ %89 efficiency boost confirmed [OK]" },
    { delay: 3200, color: "#ff00ff", text: "  Nex-Scan™ X-Ray module soldered [OK]" },
    { delay: 3600, color: "#00ff88", text: "✓ System leakage muzzled [OK]" },
    { delay: 4000, color: "#3b82f6", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
    { delay: 4400, color: "#ffd700", text: "» AURA CORE™ v5.0 — CLINIC SOVEREIGNTY" },
    { delay: 4800, color: "#00ff88", text: "  JWE-RS256: SEALED | Hostinger: ONLINE | Nodes: 847 ACTIVE" },
];

export default function NeuralCoreTerminal() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [loopCount, setLoopCount] = useState(0);
    const [loginTime, setLoginTime] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const LINES = isClinic ? DOCTOR_TERMINAL_LINES : PATIENT_TERMINAL_LINES;

    const startTerminal = (lines: typeof PATIENT_TERMINAL_LINES) => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setIsRunning(true);
        setVisibleLines([]);

        lines.forEach((line, i) => {
            const t = setTimeout(() => {
                setVisibleLines((prev) => [...prev, i]);
                if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                if (i === lines.length - 1) {
                    setTimeout(() => {
                        setIsRunning(false);
                        setLoopCount((c) => c + 1);
                    }, 2000);
                }
            }, line.delay);
            timeoutsRef.current.push(t);
        });
    };

    useEffect(() => {
        setLoginTime(new Date().toLocaleString("tr-TR"));
        const current = timeoutsRef.current;
        startTerminal(LINES);
        return () => current.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userRole]);

    // Auto-loop
    useEffect(() => {
        if (!isRunning && loopCount > 0) {
            const t = setTimeout(() => startTerminal(LINES), 4000);
            return () => clearTimeout(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, loopCount]);

    const accentColor = isClinic ? "#3b82f6" : "#a855f7";
    const label = isClinic ? "KLİNİK SİSTEMİ" : "ACENTE SİSTEMİ";

    return (
        <section id="neural-core" className="py-24 px-6 relative">
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
                style={{
                    width: 600,
                    height: 600,
                    background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
                    filter: "blur(40px)",
                    transition: "background 0.5s ease",
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-mono"
                        style={{
                            background: `${accentColor}10`,
                            border: `1px solid ${accentColor}30`,
                            color: accentColor,
                        }}
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88", animation: "pulseGlow 1.5s infinite" }}
                        />
                        NEURAL CORE INTERFACE — {label}
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                        AURA CORE™ —{" "}
                        <span
                            className="liquid-text"
                            style={{ backgroundSize: "300% 300%", color: accentColor }}
                        >
                            v5.0 Active
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
                        {isClinic
                            ? "Klinik operasyon zekası. σ_noise motoruyla optimize edilmiş hekim iş akışı ve hasta yönetimi."
                            : "Acente odaklı akıllı yönlendirme sistemi. JWE korumalı verilerle kişiselleştirilmiş pazarlama yolculuğu."}
                    </p>
                </div>

                {/* Terminal */}
                <div
                    className="terminal-window relative"
                    style={{ boxShadow: `0 0 40px ${accentColor}20, 0 0 80px ${accentColor}08` }}
                >
                    <div className="terminal-header">
                        <div className="terminal-dot" style={{ background: "#ff5f56" }} />
                        <div className="terminal-dot" style={{ background: "#ffbd2e" }} />
                        <div className="terminal-dot" style={{ background: "#27c93f" }} />
                        <div className="flex-1 text-center">
                            <span className="text-xs font-mono text-gray-500">
                                aura-core@getauraos.com ~ {isClinic ? "hekim-mod-v5.0" : "acente-mod-v5.0"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                            <span className="text-xs font-mono" style={{ color: "#00ff88" }}>LIVE</span>
                        </div>
                    </div>

                    <div ref={scrollRef} className="terminal-scroll" id="terminal-output">
                        <div className="text-xs font-mono mb-4" style={{ color: "#444" }}>
                            Last login: {loginTime || "..."} on getauraos.com
                        </div>
                        {visibleLines.map((lineIdx) => {
                            const line = LINES[lineIdx];
                            return (
                                <div
                                    key={`${userRole}-${loopCount}-${lineIdx}`}
                                    className="text-xs font-mono mb-1 leading-relaxed"
                                    style={{ color: line.color }}
                                >
                                    {line.text}
                                </div>
                            );
                        })}
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs font-mono" style={{ color: accentColor }}>
                                aura@getauraos:~$
                            </span>
                            <span
                                className="inline-block w-2 h-4 ml-1"
                                style={{ background: accentColor, animation: "terminalBlink 1s step-end infinite" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[
                        { label: "Uptime", value: "99.97%", color: "#00ff88" },
                        { label: "API Latency", value: "12ms", color: accentColor },
                        { label: "Active Nodes", value: "847", color: "#ff00ff" },
                        { label: isClinic ? "Encrypted" : "Güvenlik", value: "JWE-RS256", color: "#ffd700" },
                    ].map((stat) => (
                        <div key={stat.label} className="sigma-panel p-4 text-center">
                            <div className="text-xl font-mono font-bold mb-1" style={{ color: stat.color }}>
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
