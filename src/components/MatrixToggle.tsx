"use client";

import { useState, useRef, useEffect } from "react";

// 57 remaining competency tags (3 featured = Nex-Scan, Ciro Kurtarma, İstihbarat already shown)
const MATRIX_TAGS = [
    { label: "Akıllı Randevu", cat: "b", color: "#3b82f6" },
    { label: "No-Show -%71", cat: "a", color: "#00ff88" },
    { label: "Otonom Hatırlatıcı", cat: "a", color: "#00ff88" },
    { label: "WhatsApp Otomasyon", cat: "b", color: "#25d366" },
    { label: "Online Rezervasyon", cat: "b", color: "#3b82f6" },
    { label: "Çapraz Satış Motoru", cat: "c", color: "#ffd700" },
    { label: "VIP Hasta Protokolü", cat: "c", color: "#ffd700" },
    { label: "Hasta Segmentasyonu", cat: "c", color: "#ffd700" },
    { label: "Takip SMS/WhatsApp", cat: "a", color: "#00ff88" },
    { label: "Hasta Risk Skoru", cat: "d", color: "#00ffff" },
    { label: "KVKK A++ Motoru", cat: "e", color: "#8b00ff" },
    { label: "JWE-RS256 Şifreleme", cat: "e", color: "#8b00ff" },
    { label: "Çift Faktörlü Kimlik", cat: "e", color: "#8b00ff" },
    { label: "DDoS Koruma", cat: "e", color: "#8b00ff" },
    { label: "GDPR Uyumluluk", cat: "e", color: "#8b00ff" },
    { label: "Otonom Fatura", cat: "f", color: "#ff9900" },
    { label: "SGK Entegrasyonu", cat: "f", color: "#ff9900" },
    { label: "Esnek Taksit", cat: "f", color: "#ff9900" },
    { label: "Sigorta Entegrasyonu", cat: "f", color: "#ff9900" },
    { label: "Net Kâr Raporu", cat: "f", color: "#ff9900" },
    { label: "Dönemsel Büyüme", cat: "f", color: "#ff9900" },
    { label: "Stok Takibi", cat: "g", color: "#aaaaaa" },
    { label: "Ekipman Bakımı", cat: "g", color: "#aaaaaa" },
    { label: "Enerji Optimizasyonu", cat: "g", color: "#aaaaaa" },
    { label: "Süreç Otomasyonu", cat: "g", color: "#aaaaaa" },
    { label: "Vardiya Planlaması", cat: "g", color: "#aaaaaa" },
    { label: "Alpha Command Center", cat: "h", color: "#3b82f6" },
    { label: "Gerçek Zamanlı Panel", cat: "h", color: "#3b82f6" },
    { label: "Mobil Yönetim", cat: "h", color: "#3b82f6" },
    { label: "Çok Şube Yönetimi", cat: "h", color: "#3b82f6" },
    { label: "API Entegrasyonu", cat: "h", color: "#3b82f6" },
    { label: "Dijital Anamnez", cat: "i", color: "#00ffff" },
    { label: "e-Reçete", cat: "i", color: "#00ffff" },
    { label: "AI Tedavi Önerisi", cat: "i", color: "#00ffff" },
    { label: "İlaç Uyarı Sistemi", cat: "i", color: "#00ffff" },
    { label: "Radyoloji Entegrasyonu", cat: "i", color: "#00ffff" },
    { label: "JCI Akreditasyon", cat: "i", color: "#00ffff" },
    { label: "Google Yorum Bot", cat: "j", color: "#ffd700" },
    { label: "SEO & Görünürlük", cat: "j", color: "#ffd700" },
    { label: "Pazarlama Otomasyonu", cat: "j", color: "#ffd700" },
    { label: "E-posta Kampanya", cat: "j", color: "#ffd700" },
    { label: "Rekabet Analizi", cat: "j", color: "#ffd700" },
    { label: "Çok Dilli CRM (4 Dil)", cat: "k", color: "#ff00ff" },
    { label: "Online Konsültasyon", cat: "k", color: "#ff00ff" },
    { label: "Çok Dilli Web Sitesi", cat: "k", color: "#ff00ff" },
    { label: "Turizm Paket Yönetimi", cat: "k", color: "#ff00ff" },
    { label: "Medikal Tur Koordinasyon", cat: "k", color: "#ff00ff" },
    { label: "Hekim Performansı", cat: "l", color: "#aaaaaa" },
    { label: "Personel Eğitim", cat: "l", color: "#aaaaaa" },
    { label: "Operasyon Verimliliği", cat: "l", color: "#aaaaaa" },
    { label: "σ_noise ROI Motoru", cat: "m", color: "#ffd700" },
    { label: "Tahminsel Analitik", cat: "m", color: "#ffd700" },
    { label: "Aylık Büyüme Koçu", cat: "m", color: "#ffd700" },
    { label: "Hasta Akış Analizi", cat: "m", color: "#ffd700" },
    { label: "Sovereign Sertifikasyon", cat: "n", color: "#3b82f6" },
    { label: "Hostinger CDN", cat: "n", color: "#3b82f6" },
    { label: "99.97% Uptime", cat: "n", color: "#3b82f6" },
];

export default function MatrixToggle() {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(open ? contentRef.current.scrollHeight : 0);
        }
    }, [open]);

    return (
        <div
            id="matrix-toggle"
            style={{
                maxWidth: 1100,
                margin: "0 auto",
                padding: "0 24px 80px",
                position: "relative",
                zIndex: 1,
            }}
        >
            {/* ── Toggle Button ── */}
            <button
                id="matrix-toggle-btn"
                onClick={() => setOpen(o => !o)}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 28px",
                    borderRadius: open ? "16px 16px 0 0" : 16,
                    border: "1px solid rgba(59,130,246,0.25)",
                    background: open
                        ? "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,0,255,0.08))"
                        : "rgba(13,13,31,0.8)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: open ? "0 0 40px rgba(59,130,246,0.1)" : "none",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                        width: 8, height: 8, borderRadius: "50%", display: "inline-block",
                        background: open ? "#00ff88" : "#3b82f6",
                        boxShadow: `0 0 8px ${open ? "#00ff88" : "#3b82f6"}`,
                        transition: "background 0.3s ease, box-shadow 0.3s ease",
                    }} />
                    <span style={{
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(0.85rem, 2vw, 1rem)",
                        color: "#fff",
                        letterSpacing: "-0.01em",
                    }}>
                        Aura OS v6.0: 60 Otonom Yetkinliğin Tamamını Keşfet
                    </span>
                </div>
                <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem", color: "rgba(255,255,255,0.5)",
                    flexShrink: 0,
                }}>
                    <span style={{ display: open ? "inline" : "none", color: "#00ff88", fontSize: "0.65rem", letterSpacing: "0.1em" }}>57 YETKİNLİK</span>
                    <span style={{
                        display: "inline-block",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                        fontSize: "1rem",
                    }}>
                        🔽
                    </span>
                </div>
            </button>

            {/* ── Accordion Content ── */}
            <div
                ref={contentRef}
                style={{
                    height: height,
                    overflow: "hidden",
                    transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
                    background: "rgba(8,8,20,0.9)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: open ? "1px solid rgba(59,130,246,0.15)" : "none",
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                }}
            >
                <div style={{ padding: "28px 28px 32px" }}>
                    {/* Category legend */}
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem", color: "rgba(255,255,255,0.25)",
                        letterSpacing: "0.15em", marginBottom: 20, textTransform: "uppercase",
                    }}>
                        57 Sovereign Yetkinlik — hover için tıkla
                    </div>

                    {/* Tags grid */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px 8px",
                    }}>
                        {MATRIX_TAGS.map((tag, i) => (
                            <MatrixTag
                                key={tag.label}
                                tag={tag}
                                delay={open ? Math.min(i * 18, 500) : 0}
                                isOpen={open}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
                        <a
                            href="#contact"
                            id="matrix-demo-cta"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "12px 28px",
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #3b82f6, #8b00ff)",
                                color: "#fff",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                textDecoration: "none",
                                letterSpacing: "0.06em",
                                boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                            }}
                        >
                            🚀 60 Yetkinliğin Tamamı İçin Demo İste →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Individual tag with staggered fade-in ────────────────────────────────────
function MatrixTag({
    tag,
    delay,
    isOpen,
}: {
    tag: { label: string; color: string };
    delay: number;
    isOpen: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 12px",
                borderRadius: 100,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 500,
                cursor: "default",
                transition: "all 0.2s ease",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(6px)",
                transitionDelay: isOpen ? `${delay}ms` : "0ms",
                background: hovered ? `${tag.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered ? tag.color + "50" : "rgba(255,255,255,0.08)"}`,
                color: hovered ? tag.color : "rgba(255,255,255,0.55)",
                boxShadow: hovered ? `0 0 10px ${tag.color}20` : "none",
                whiteSpace: "nowrap",
            }}
        >
            <span style={{
                width: 5, height: 5, borderRadius: "50%", display: "inline-block",
                background: tag.color, opacity: hovered ? 1 : 0.4,
                flexShrink: 0,
            }} />
            {tag.label}
        </span>
    );
}
