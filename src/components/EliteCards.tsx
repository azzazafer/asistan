"use client";

import { useState } from "react";
import Image from "next/image";

type Card = {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    metric: string;
    metricLabel: string;
    accentColor: string;
    glowColor: string;
    previewLabel: string;
    previewHref: string;
    image: string;
};

const ELITE_CARDS: Card[] = [
    {
        id: "nexscan",
        icon: "🔬",
        title: "Nex-Scan™ Teşhis",
        subtitle: "Gözden kaçan sızıntıları bulur, teşhis cirosunu %30 artırır.",
        metric: "+%30",
        metricLabel: "Teşhis Ciro Artışı",
        accentColor: "#00ffff",
        glowColor: "rgba(0,255,255,0.15)",
        previewLabel: "Canlı Tarama Paneline Geç",
        previewHref: "#madde-7",
        image: "/nexscan-triage.png",
    },
    {
        id: "ciro",
        icon: "💰",
        title: "Otonom Ciro Kurtarma",
        subtitle: "Açılmayan telefonları ve kaçan hastaları otonom satışa çevirir.",
        metric: "₺32K",
        metricLabel: "Aylık Kurtarılan Gelir",
        accentColor: "#00ff88",
        glowColor: "rgba(0,255,136,0.15)",
        previewLabel: "Kurtarma Masasına Geç",
        previewHref: "#madde-7",
        image: "/kurtarma-masasi.png",
    },
    {
        id: "istihbarat",
        icon: "🌍",
        title: "Global İstihbarat",
        subtitle: "Avrupa'daki hastayı kendi dilinde ikna eder, %840 ROAS sağlar.",
        metric: "%840",
        metricLabel: "Reklam Getiri Çarpanı",
        accentColor: "#ff00ff",
        glowColor: "rgba(255,0,255,0.15)",
        previewLabel: "İstihbarat Merkezine Geç",
        previewHref: "#vault",
        image: "/istihbarat-merkezi.png",
    },
];

export default function EliteCards() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section
            id="elite-cards"
            style={{
                padding: "80px 24px 40px",
                background: "#000",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background decorations */}
            <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "40vh", background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)", filter: "blur(100px)", pointerEvents: "none" }} />

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2 }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)",
                    borderRadius: 100, padding: "6px 16px", marginBottom: 16,
                }}>
                    <span style={{
                        width: 7, height: 7, borderRadius: "50%", display: "inline-block",
                        background: "#3b82f6", boxShadow: "0 0 6px #3b82f6",
                        animation: "pulseGlow 1.5s ease-in-out infinite",
                    }} />
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.68rem", color: "#3b82f6", letterSpacing: "0.14em",
                    }}>
                        MAHŞERİN 3 ATLISI — SOVEREIGN MODULE
                    </span>
                </div>
                <h2 style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "#fff", letterSpacing: "-0.02em", marginBottom: 12,
                }}>
                    Broşürün Bittiği Yer,{" "}
                    <span style={{
                        background: "linear-gradient(135deg, #3b82f6, #ff00ff)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        Aura&apos;nın Başladığı Yer
                    </span>
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.4)", maxWidth: 520, margin: "0 auto",
                }}>
                    Karta tıkla → Gerçek zamanlı panel önizlemesi
                </p>
            </div>

            {/* 3 Elite Cards */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24,
                maxWidth: 1200,
                margin: "0 auto",
                position: "relative",
                zIndex: 2,
            }}>
                {ELITE_CARDS.map(card => {
                    const isHovered = hoveredId === card.id;
                    return (
                        <div
                            key={card.id}
                            id={`elite-card-${card.id}`}
                            onMouseEnter={() => setHoveredId(card.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => {
                                const target = document.querySelector(card.previewHref);
                                if (target) target.scrollIntoView({ behavior: 'smooth' });
                                else window.location.href = card.previewHref;
                            }}
                            style={{
                                position: "relative",
                                borderRadius: 24,
                                padding: "32px 28px",
                                cursor: "pointer",
                                overflow: "hidden",
                                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                                transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
                                boxShadow: isHovered
                                    ? `0 20px 80px -20px ${card.glowColor}, 0 10px 40px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)`
                                    : "0 4px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.03)",
                                background: isHovered
                                    ? `rgba(15,15,35,0.95)`
                                    : "rgba(10,10,20,0.8)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: `1px solid ${isHovered ? card.accentColor + "50" : "rgba(255,255,255,0.08)"}`,
                            }}
                        >
                            {/* Liquid background accent */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 100%)`,
                                opacity: isHovered ? 0.4 : 0,
                                transition: "opacity 0.6s ease",
                                pointerEvents: "none",
                            }} />

                            <div style={{ position: "relative", zIndex: 1 }}>
                                {/* Icon + metric */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                                    <div style={{
                                        fontSize: "2.5rem",
                                        filter: isHovered ? `drop-shadow(0 0 12px ${card.accentColor})` : "none",
                                        transition: "filter 0.3s ease",
                                    }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontWeight: 900, fontSize: "1.8rem",
                                            color: card.accentColor,
                                            filter: `drop-shadow(0 0 10px ${card.accentColor}30)`,
                                            lineHeight: 1,
                                        }}>
                                            {card.metric}
                                        </div>
                                        <div style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: "0.6rem", color: "rgba(255,255,255,0.4)",
                                            letterSpacing: "0.08em", marginTop: 4,
                                        }}>
                                            {card.metricLabel}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 style={{
                                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                                    fontWeight: 800, fontSize: "1.25rem",
                                    color: "#fff", marginBottom: 12, letterSpacing: "-0.01em",
                                }}>
                                    {card.title}
                                </h3>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.85rem", color: "rgba(255,255,255,0.5)",
                                    lineHeight: 1.6, marginBottom: 24,
                                }}>
                                    {card.subtitle}
                                </p>

                                {/* Dashboard Image Preview — Hidden until hover */}
                                <div style={{
                                    position: "relative",
                                    width: "100%",
                                    height: hoveredId === card.id ? 140 : 0,
                                    overflow: "hidden",
                                    borderRadius: 12,
                                    marginBottom: hoveredId === card.id ? 20 : 0,
                                    opacity: hoveredId === card.id ? 1 : 0,
                                    transform: hoveredId === card.id ? "translateY(0)" : "translateY(10px)",
                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    border: `1px solid ${card.accentColor}30`,
                                    boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                                }}>
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        unoptimized
                                        style={{ objectFit: "cover", opacity: 0.8 }}
                                    />
                                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)` }} />
                                    <div style={{
                                        position: "absolute", bottom: 8, left: 10,
                                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                                        color: card.accentColor, textTransform: "uppercase", letterSpacing: "0.1em"
                                    }}>
                                        Live Dashboard Preview
                                    </div>
                                </div>

                                {/* Interactive Button */}
                                <div style={{
                                    overflow: "hidden",
                                    maxHeight: isHovered ? 60 : 0,
                                    opacity: isHovered ? 1 : 0,
                                    transition: "all 0.4s ease",
                                }}>
                                    <a
                                        href={card.previewHref}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                            padding: "12px 16px",
                                            borderRadius: 12,
                                            background: `linear-gradient(135deg, ${card.accentColor}20, ${card.accentColor}05)`,
                                            border: `1px solid ${card.accentColor}40`,
                                            color: "#fff",
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontWeight: 700,
                                            fontSize: "0.75rem",
                                            textDecoration: "none",
                                            letterSpacing: "0.05em",
                                            marginBottom: 16,
                                        }}
                                        onClick={(e) => {
                                            // smooth scroll to section
                                            const target = document.querySelector(card.previewHref);
                                            if (target) {
                                                e.preventDefault();
                                                target.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        <span>▶</span>
                                        {card.previewLabel}
                                    </a>
                                </div>

                                {/* Status Indicator */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "0.6rem",
                                    color: isHovered ? card.accentColor : "rgba(255,255,255,0.25)",
                                    transition: "color 0.3s ease",
                                }}>
                                    <div style={{
                                        width: 6, height: 6, borderRadius: "50%",
                                        background: isHovered ? card.accentColor : "rgba(255,255,255,0.1)",
                                        boxShadow: isHovered ? `0 0 8px ${card.accentColor}` : "none",
                                    }} />
                                    <span>{isHovered ? "MODULE ACTIVE" : "SYSTEM READY"}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
        </section>
    );
}
