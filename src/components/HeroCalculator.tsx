"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── σ_noise Algoritması ────────────────────────────────────────────────────────
function calcLeak(ciro: number, personel: number) {
    const leak = Math.round(ciro * 0.15 + personel * 2500);
    const recovery = Math.round(leak * 0.89);
    return { leak, recovery };
}

const fmt = (n: number) => "₺" + n.toLocaleString("tr-TR");

// ── Sayaç animasyonu ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900) {
    const [val, setVal] = useState(0);
    const raf = useRef<number>(0);
    useEffect(() => {
        cancelAnimationFrame(raf.current);
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * target));
            if (t < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration]);
    return val;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroCalculator() {
    const [ciro, setCiro] = useState(200000);
    const [personel, setPersonel] = useState(5);
    const [ctaVisible, setCtaVisible] = useState(false);

    const { leak, recovery } = calcLeak(ciro, personel);
    const animLeak = useCountUp(leak);
    const animRecovery = useCountUp(recovery);

    // CTA: 1.2s sonra belir
    const ctaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerCta = useCallback(() => {
        setCtaVisible(false);
        if (ctaTimer.current) clearTimeout(ctaTimer.current);
        ctaTimer.current = setTimeout(() => setCtaVisible(true), 1200);
    }, []);
    useEffect(() => { triggerCta(); }, [ciro, personel, triggerCta]);
    useEffect(() => {
        return () => {
            if (ctaTimer.current) clearTimeout(ctaTimer.current);
        };
    }, []);


    const whatsappHref = `https://wa.me/905001234567?text=Merhaba%2C%20Aura%20OS%20demo%20almak%20istiyorum.%20Ayl%C4%B1k%20cirom%3A%20%E2%82%BA${ciro}%20%7C%20Personel%3A%20${personel}`;

    // Slider track fill percentage
    const ciroPct = ((ciro - 30000) / (1000000 - 30000)) * 100;
    const persPct = ((personel - 1) / (50 - 1)) * 100;

    return (
        <section
            id="hero-calculator"
            style={{
                minHeight: "100vh",
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "96px 24px 48px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ── Background glows ── */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{
                    position: "absolute", top: "-20%", left: "-10%",
                    width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }} />
                <div style={{
                    position: "absolute", bottom: "-20%", right: "-10%",
                    width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,0,255,0.12) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }} />
            </div>

            <div style={{ maxWidth: 900, width: "100%", position: "relative", zIndex: 1 }}>

                {/* ── H1 Kanca ── */}
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(255,34,68,0.08)", border: "1px solid rgba(255,34,68,0.3)",
                        borderRadius: 100, padding: "6px 16px", marginBottom: 24,
                    }}>
                        <span style={{
                            width: 8, height: 8, borderRadius: "50%", display: "inline-block",
                            background: "#ff2244", boxShadow: "0 0 8px #ff2244",
                            animation: "pulseGlow 1.5s ease-in-out infinite",
                        }} />
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.7rem", color: "#ff2244", letterSpacing: "0.12em",
                        }}>
                            CANLI SIZINTI TESPİTİ — AURA OS V3.0
                        </span>
                    </div>

                    <h1 style={{
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                        lineHeight: 1.15,
                        color: "#ffffff",
                        marginBottom: 20,
                        letterSpacing: "-0.02em",
                    }}>
                        Siz Uyurken Kliniğiniz Her Ay{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #ff2244, #ff8800)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            ₺42.750
                        </span>{" "}
                        Kaybediyor.{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #3b82f6, #ff00ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            Aura OS Bu Sızıntıyı 9 Saniyede Keser.
                        </span>
                    </h1>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                        color: "rgba(255,255,255,0.45)",
                        maxWidth: 560,
                        margin: "0 auto",
                        lineHeight: 1.7,
                    }}>
                        Personel hatası, açılmayan telefonlar ve görülmeyen çürükler...<br />
                        Aura otonom zekasıyla sızıntıyı mühürler.
                    </p>
                </div>

                {/* ── Glassmorphism Calculator Card ── */}
                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 24,
                    padding: "clamp(24px, 4vw, 40px)",
                    boxShadow: "0 0 80px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 32,
                        alignItems: "start",
                    }}>

                        {/* ── INPUTS ── */}
                        <div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.65rem", color: "rgba(59,130,246,0.8)",
                                letterSpacing: "0.15em", marginBottom: 24,
                            }}>
                                GİRDİ PARAMETRELERİ
                            </div>

                            {/* Ciro Slider */}
                            <div style={{ marginBottom: 28 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                                        Aylık Klinik Cironuz
                                    </label>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#3b82f6" }}>
                                        {fmt(ciro)}
                                    </span>
                                </div>
                                <input
                                    id="hero-calc-ciro"
                                    type="range"
                                    min={30000}
                                    max={1000000}
                                    step={5000}
                                    value={ciro}
                                    onChange={e => setCiro(Number(e.target.value))}
                                    style={{
                                        width: "100%",
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        height: 4,
                                        borderRadius: 2,
                                        background: `linear-gradient(to right, #3b82f6 ${ciroPct}%, rgba(59,130,246,0.15) ${ciroPct}%)`,
                                        cursor: "pointer",
                                        outline: "none",
                                        border: "none",
                                    }}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                                    <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#444" }}>₺30K</span>
                                    <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#444" }}>₺1M</span>
                                </div>
                            </div>

                            {/* Personel Slider */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                                        Personel Sayısı
                                    </label>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#ff00ff" }}>
                                        {personel} kişi
                                    </span>
                                </div>
                                <input
                                    id="hero-calc-personel"
                                    type="range"
                                    min={1}
                                    max={50}
                                    step={1}
                                    value={personel}
                                    onChange={e => setPersonel(Number(e.target.value))}
                                    style={{
                                        width: "100%",
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        height: 4,
                                        borderRadius: 2,
                                        background: `linear-gradient(to right, #ff00ff ${persPct}%, rgba(255,0,255,0.15) ${persPct}%)`,
                                        cursor: "pointer",
                                        outline: "none",
                                        border: "none",
                                    }}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                                    <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#444" }}>1</span>
                                    <span style={{ fontSize: "0.6rem", fontFamily: "monospace", color: "#444" }}>50</span>
                                </div>
                            </div>

                            {/* Formül notu */}
                            <div style={{
                                marginTop: 20, background: "rgba(0,0,0,0.4)",
                                border: "1px solid rgba(59,130,246,0.1)", borderRadius: 8, padding: "8px 12px",
                            }}>
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#333", letterSpacing: "0.1em" }}>
                                    σ_noise = √(σ²_sys + σ²_env) | Madde 7 Protokolü
                                </span>
                            </div>
                        </div>

                        {/* ── OUTPUTS ── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.65rem", color: "rgba(255,0,255,0.8)",
                                letterSpacing: "0.15em", marginBottom: 8,
                            }}>
                                SOVEREIGN ÇIKTI
                            </div>

                            {/* Kayıp kutusu (kırmızı) */}
                            <div style={{
                                background: "rgba(255,34,68,0.06)",
                                border: "1px solid rgba(255,34,68,0.25)",
                                borderRadius: 16, padding: "20px 24px", position: "relative", overflow: "hidden",
                            }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #ff2244, transparent)" }} />
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,34,68,0.7)", letterSpacing: "0.12em", marginBottom: 8 }}>
                                    AYLIK KAYIP
                                </div>
                                <div style={{
                                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                                    color: "#ff2244",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                }}>
                                    -{fmt(animLeak)}
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,34,68,0.5)", marginTop: 6 }}>
                                    no-show + takipsiz hasta + hatalı fatura
                                </div>
                            </div>

                            {/* Kurtarma kutusu (yeşil) */}
                            <div style={{
                                background: "rgba(0,255,136,0.06)",
                                border: "1px solid rgba(0,255,136,0.25)",
                                borderRadius: 16, padding: "20px 24px", position: "relative", overflow: "hidden",
                            }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }} />
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(0,255,136,0.7)", letterSpacing: "0.12em", marginBottom: 8 }}>
                                    AURA KURTARMA POTANSİYELİ
                                </div>
                                <div style={{
                                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                                    fontWeight: 900,
                                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                                    color: "#00ff88",
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1,
                                }}>
                                    +{fmt(animRecovery)}
                                </div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(0,255,136,0.5)", marginTop: 6 }}>
                                    ilk ay · kredi kartı gerektirmez
                                </div>
                            </div>

                            {/* ROI bar */}
                            <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(59,130,246,0.1)", borderRadius: 12, padding: "12px 16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#555" }}>Kurtarma Oranı</span>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", fontWeight: 700, color: "#ffd700" }}>%89</span>
                                </div>
                                <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: "89%", background: "linear-gradient(90deg, #3b82f6, #00ff88)", borderRadius: 2 }} />
                                </div>
                            </div>

                            {/* ── CTA: Sağdan sola liquid animasyonlu buton ── */}
                            <div style={{
                                overflow: "hidden",
                                borderRadius: 12,
                                transition: "opacity 0.5s ease, transform 0.5s ease, max-height 0.4s ease",
                                opacity: ctaVisible ? 1 : 0,
                                transform: ctaVisible ? "translateX(0)" : "translateX(40px)",
                                maxHeight: ctaVisible ? 80 : 0,
                            }}>
                                <a
                                    id="hero-calc-cta"
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 10,
                                        padding: "14px 20px",
                                        borderRadius: 12,
                                        background: "linear-gradient(270deg, #25d366, #128c7e, #25d366)",
                                        backgroundSize: "200% 100%",
                                        animation: ctaVisible ? "liquidSlide 2s ease-in-out infinite" : "none",
                                        color: "#fff",
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontWeight: 700,
                                        fontSize: "0.8rem",
                                        textDecoration: "none",
                                        letterSpacing: "0.05em",
                                        boxShadow: "0 0 30px rgba(37,211,102,0.3)",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Bu Sızıntıyı Durdur ⚡ Canlı Demo (WhatsApp)
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Alt güven çizgisi ── */}
                    <div style={{
                        marginTop: 28, paddingTop: 20,
                        borderTop: "1px solid rgba(59,130,246,0.08)",
                        display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
                    }}>
                        {[
                            { icon: "🔒", text: "KVKK Uyumlu" },
                            { icon: "📞", text: "24 saat içinde arama" },
                            { icon: "🎯", text: "14 gün ücretsiz" },
                            { icon: "⚡", text: "9 saniyede tanı" },
                            { icon: "🛡️", text: "JWE-RS256 Şifreli" },
                        ].map(t => (
                            <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                                <span>{t.icon}</span>
                                <span>{t.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Inline CSS: liquidSlide + slider thumbs ── */}
            <style>{`
        @keyframes liquidSlide {
          0%   { background-position: 100% 0%; }
          50%  { background-position: 0%   0%; }
          100% { background-position: 100% 0%; }
        }
        #hero-calc-ciro::-webkit-slider-thumb,
        #hero-calc-personel::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          cursor: pointer;
        }
        #hero-calc-ciro::-webkit-slider-thumb {
          background: radial-gradient(circle, #3b82f6, #8b00ff);
          box-shadow: 0 0 10px rgba(59,130,246,0.6);
        }
        #hero-calc-personel::-webkit-slider-thumb {
          background: radial-gradient(circle, #ff00ff, #8b00ff);
          box-shadow: 0 0 10px rgba(255,0,255,0.6);
        }
        #hero-calc-ciro::-moz-range-thumb,
        #hero-calc-personel::-moz-range-thumb {
          border: none; width: 16px; height: 16px;
          border-radius: 50%; cursor: pointer;
          background: radial-gradient(circle, #3b82f6, #8b00ff);
        }
      `}</style>
        </section>
    );
}
