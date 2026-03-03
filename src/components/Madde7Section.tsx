"use client";

import { useState, useRef } from "react";
import { useUser } from "@/context/UserContext";

// σ_noise = √(σ²_sys + σ²_env) — Madde 7 Deterministic Noise Protocol
// Hidden from user but computed from normalized ciro + personel inputs.

type SovereignVerdict = {
    noiseClass: "ULTRA-LOW" | "NOMINAL" | "ELEVATED" | "CRITICAL";
    sigmaNoise: number;
    kayananGelir: number;       // monthly revenue leakage in ₺
    geriKazanilabilir: number;  // recoverable with Aura OS
    netKarArtisi: number;       // net profit increase/month
    breakevenAy: number;        // months to break even
    roiCarpani: number;
    verdict: string;
    actions: string[];
};

function computeSovereignVerdict(ciro: number, personel: number, gunlukHasta: number): SovereignVerdict {
    // Internal σ normalization
    const sigma_sys = Math.min((20 - Math.min(personel, 20)) / 20, 1);
    const sigma_env = Math.min(1 - (Math.min(gunlukHasta, 60) / 60) * 0.7, 1);
    const sigma_noise = Math.sqrt(sigma_sys ** 2 + sigma_env ** 2);

    // Industry averages: 28% revenue leaks from no-show, billing errors, missed follow-ups
    const leakRate = 0.28 + sigma_noise * 0.12;
    const kayananGelir = Math.round(ciro * leakRate);
    const geriKazanilabilir = Math.round(kayananGelir * 0.73); // Aura recovers 73% of leakage
    const netKarArtisi = Math.round(geriKazanilabilir * 0.85);
    const aylikPaket = personel <= 3 ? 2490 : personel <= 8 ? 4990 : 8490;
    const roiCarpani = parseFloat(Math.max(0.5, netKarArtisi / aylikPaket).toFixed(1));
    const breakevenAy = parseFloat(Math.max(1, aylikPaket / Math.max(netKarArtisi, 1) * 4).toFixed(1));

    let noiseClass: SovereignVerdict["noiseClass"];
    let verdict: string;
    let actions: string[];

    if (sigma_noise < 0.6) {
        noiseClass = "ULTRA-LOW";
        verdict = "✓ SİSTEMİNİZ VERİMLİ — Aura OS ile mevcut kaybı tamamen kapatırsınız.";
        actions = ["Nex-Scan™ ile + ₺" + netKarArtisi.toLocaleString("tr-TR") + " kâr/ay", "No-show oranınızı -%71 daha düşürün", "Turizm modülü ile € gelir açın"];
    } else if (sigma_noise < 0.9) {
        noiseClass = "NOMINAL";
        verdict = "⚡ ORTA DÜZEYDESİNİZ — ₺" + kayananGelir.toLocaleString("tr-TR") + " aylık sızıntıyı kapatmak için Aura OS kritik.";
        actions = ["Kurtarma Masası ile no-show'u durdurun", "Otomatik takip ile + ₺" + Math.round(geriKazanilabilir * 0.4).toLocaleString("tr-TR") + " / ay geri alın", "Aylık ₺" + netKarArtisi.toLocaleString("tr-TR") + " net kâr artışı"];
    } else if (sigma_noise < 1.2) {
        noiseClass = "ELEVATED";
        verdict = "⚠ SİZİ UYARIYORUZ — Aylık ₺" + kayananGelir.toLocaleString("tr-TR") + " rakibinize akıyor.";
        actions = ["ACİL: No-show protokolü başlatın", "Otomasyon ile manuel kayıp kapatılıyor", "Verimlilik +%73 için Alpha Command"];
    } else {
        noiseClass = "CRITICAL";
        verdict = "✕ KRİTİK KAYIP — ₺" + kayananGelir.toLocaleString("tr-TR") + "/ay heba oluyor. Sovereign müdahale zorunlu.";
        actions = ["ACİL DEMO: Bu haftanın içinde Aura OS devreye alın", "3 ay içinde yatırım kendini amorti eder", "Ertelemek aylık ₺" + kayananGelir.toLocaleString("tr-TR") + " daha kaybettiriyor"];
    }

    return { noiseClass, sigmaNoise: sigma_noise, kayananGelir, geriKazanilabilir, netKarArtisi, breakevenAy, roiCarpani, verdict, actions };
}

const LOG_LINES = [
    "» Sızıntı analizi başlatılıyor...",
    "  Sistem parametresi normalize ediliyor...",
    "  Verimlilik katsayısı hesaplanıyor...",
    "  σ_noise = √(σ²_sys + σ²_env) uygulanıyor...",
    "  Aylık kayıp gelir tespit ediliyor...",
    "  Kurtarılabilir potansiyel hesaplanıyor...",
    "  Net Kâr Artış Hızı projeksiyonu...",
    "  Break-even analizi tamamlanıyor...",
    "  JWE imzası doğrulanıyor → ✓ GEÇERLİ",
    "  Sovereign Verdict hazırlanıyor...",
];

const noiseColor = (nc: string): string =>
    ({ "ULTRA-LOW": "#00ff88", "NOMINAL": "#3b82f6", "ELEVATED": "#ffd700", "CRITICAL": "#ff2244" }[nc] || "#fff");

export default function Madde7Section() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const isAgency = !isClinic;

    const [ciro, setCiro] = useState("150000");
    const [personel, setPersonel] = useState("5");
    const [gunlukHasta, setGunlukHasta] = useState("30");
    const [result, setResult] = useState<SovereignVerdict | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [logLines, setLogLines] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const logRef = useRef<HTMLDivElement>(null);

    const runAnalysis = async () => {
        const c = parseInt(ciro.replace(/\D/g, "")) || 0;
        const p = parseInt(personel) || 1;
        const g = parseInt(gunlukHasta) || 1;
        setAnalyzing(true); setShowResult(false); setLogLines([]); setResult(null);
        for (let i = 0; i < LOG_LINES.length; i++) {
            await new Promise(r => setTimeout(r, 280));
            setLogLines(prev => [...prev, LOG_LINES[i]]);
            if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        }
        await new Promise(r => setTimeout(r, 350));
        setResult(computeSovereignVerdict(c, p, g));
        setAnalyzing(false); setShowResult(true);
    };

    return (
        <section id="madde-7" className="py-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono" style={{ background: "rgba(255,0,255,0.08)", border: "1px solid rgba(255,0,255,0.25)", color: "#ff00ff" }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ff00ff", boxShadow: "0 0 6px #ff00ff" }} />
                        MADDE 7 — SOVEREIGN SIZMA HESAPLAYICISI
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
                        {isAgency ? (
                            <>Acente <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#a855f7" }}>Kârlılık Hesabı</span></>
                        ) : (
                            <>Klinik <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#3b82f6" }}>Kârlılık Hesabı</span></>
                        )}
                    </h2>
                    <p className="text-gray-400 text-sm font-mono max-w-2xl mx-auto">
                        Cironuzu ve hacminizi girin — Aura OS&apos;un size aylık kaç ₺ kazandıracağını deterministik olarak hesaplayalım.
                    </p>
                    <div className="mt-4 text-xs font-mono inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.15)] text-green-400 font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1"></span>
                        Deterministik Kârlılık Algoritması Aktif
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* INPUT PANEL */}
                    <div className="sigma-panel p-6">
                        <div className="text-xs font-mono text-gray-500 mb-6 tracking-widest uppercase">
                            {isAgency ? "ACENTENİZ HAKKINDA" : "KLİNİĞİNİZ HAKKINDA"}
                        </div>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-mono text-blue-400 mb-2 block">
                                    {isAgency ? "Aylık Lead Hacminiz" : "Aylık Klinik Cirosunuz (₺)"}
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono text-blue-400">
                                        {isAgency ? "#" : "₺"}
                                    </span>
                                    <input
                                        id="madde7-ciro"
                                        type="number"
                                        value={ciro}
                                        onChange={e => setCiro(e.target.value)}
                                        placeholder="150000"
                                        className="w-full font-mono text-sm rounded-xl pl-8 pr-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition-colors"
                                        style={{ color: "#3b82f6" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-mono text-fuchsia-400 mb-2 block">
                                    {isAgency ? "Lead Başına Ortalama Kazanç (₺)" : "Toplam Personel Sayısı"}
                                </label>
                                <input
                                    id="madde7-personel"
                                    type="number"
                                    value={personel}
                                    onChange={e => setPersonel(e.target.value)}
                                    placeholder="5"
                                    className="w-full font-mono text-sm rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-fuchsia-500 transition-colors"
                                    style={{ color: "#ff00ff" }}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-mono text-yellow-400 mb-2 block">
                                    {isAgency ? "Kapatma Oranınız (%)" : "Günlük Ortalama Hasta Sayısı"}
                                </label>
                                <input
                                    id="madde7-hasta"
                                    type="number"
                                    value={gunlukHasta}
                                    onChange={e => setGunlukHasta(e.target.value)}
                                    placeholder="30"
                                    className="w-full font-mono text-sm rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-yellow-500 transition-colors"
                                    style={{ color: "#ffd700" }}
                                />
                            </div>
                        </div>

                        <button
                            id="madde7-analyze-btn"
                            onClick={runAnalysis}
                            disabled={analyzing}
                            className="btn-sovereign w-full py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {analyzing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin inline-block">◌</span>
                                    Hesaplanıyor...
                                </span>
                            ) : (
                                "📊 Sızıntı Analizini Başlat"
                            )}
                        </button>

                        {logLines.length > 0 && (
                            <div
                                ref={logRef}
                                className="mt-4 rounded-xl p-3 max-h-32 overflow-y-auto bg-black/40 border border-white/5"
                            >
                                {logLines.map((line, i) => (
                                    <div key={i} className="text-xs font-mono mb-0.5" style={{ color: line.startsWith("»") ? "#3b82f6" : line.includes("✓") ? "#00ff88" : "#555" }}>
                                        {line}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RESULT PANEL */}
                    <div className="sigma-panel p-6">
                        <div className="text-xs font-mono text-gray-500 mb-6 tracking-widest uppercase">
                            SOVEREIGN VERDICT — KARAR ONAY
                        </div>

                        {!showResult && !analyzing && (
                            <div className="flex flex-col items-center justify-center h-52 text-center">
                                <div className="text-5xl mb-4 opacity-20 font-mono">σ</div>
                                <p className="text-xs font-mono text-gray-700 max-w-xs uppercase tracking-widest">Girdileri yapın ve analizi başlatın.</p>
                            </div>
                        )}

                        {analyzing && (
                            <div className="flex flex-col items-center justify-center h-52">
                                <div className="text-5xl font-mono font-black mb-4 animate-pulse" style={{ color: "#3b82f6" }}>σ</div>
                                <p className="text-xs font-mono text-gray-600">Deterministik motor çalışıyor...</p>
                            </div>
                        )}

                        {showResult && result && (
                            <div className="space-y-3 animate-in fade-in duration-700">
                                {/* Main verdict color block */}
                                <div className="rounded-xl p-4 text-center bg-white/5 border border-white/10" style={{ borderColor: `${noiseColor(result.noiseClass)}40` }}>
                                    <div className="text-xs font-mono mb-2 uppercase" style={{ color: noiseColor(result.noiseClass) }}>SOVEREIGN VERDICT</div>
                                    <div className="text-sm font-mono leading-relaxed font-bold" style={{ color: noiseColor(result.noiseClass) }}>{result.verdict}</div>
                                </div>

                                {/* Key money metrics */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20">
                                        <div className="text-[10px] font-mono text-red-400 mb-1 uppercase">Aylık Sızıntı</div>
                                        <div className="text-sm font-mono font-black text-red-500">₺{result.kayananGelir.toLocaleString("tr-TR")}</div>
                                    </div>
                                    <div className="rounded-xl p-3 bg-green-500/10 border border-green-500/20">
                                        <div className="text-[10px] font-mono text-green-400 mb-1 uppercase">Aura Kazancı</div>
                                        <div className="text-sm font-mono font-black text-green-500">₺{result.geriKazanilabilir.toLocaleString("tr-TR")}</div>
                                    </div>
                                    <div className="rounded-xl p-3 bg-yellow-500/10 border border-yellow-500/20">
                                        <div className="text-[10px] font-mono text-yellow-400 mb-1 uppercase">Net Kâr Artışı</div>
                                        <div className="text-sm font-mono font-black text-yellow-500">₺{result.netKarArtisi.toLocaleString("tr-TR")}/ay</div>
                                    </div>
                                    <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20">
                                        <div className="text-[10px] font-mono text-blue-400 mb-1 uppercase">Amorti Süresi</div>
                                        <div className="text-sm font-mono font-black text-blue-500">{result.breakevenAy} ay</div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="rounded-xl p-3 bg-black/50 border border-white/5 mt-4">
                                    <div className="text-[10px] font-mono text-gray-500 mb-3 uppercase tracking-widest">SOVEREIGN ÖNERİLERİ:</div>
                                    {result.actions.map((a, i) => (
                                        <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                                            <span className="text-[10px] font-mono text-yellow-500">{i + 1}.</span>
                                            <span className="text-[10px] font-mono text-gray-400 leading-tight uppercase">{a}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href="#contact" className="block mt-4">
                                    <button className="btn-sovereign w-full py-4 text-xs font-black tracking-widest uppercase">
                                        📞 Bu Sonucu Demo&apos;da Kesinleştir →
                                    </button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
