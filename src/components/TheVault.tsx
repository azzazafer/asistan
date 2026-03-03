"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

const VAULT_CASES = [
    {
        id: "aura-2026-dental",
        tag: "FLAGSHIP",
        tagColor: "#ffd700",
        title: "Aura OS 2026",
        subtitle: "Otonom Klinik İşletim Sistemi — İstanbul Diş Kliniği",
        description:
            "İstanbul'un en seçkin diş kliniğine kurulan Aura OS V3.0. ₺14.250+ bildirim hızı, %89 operasyonel verimlilik ve sıfır hatayla çalışan otonom klinik yönetimi.",
        patientDesc: "İstanbul'da premium diş tedavisi + 5★ konaklama + transfer. Avrupa fiyatının %40'ına.",
        metrics: [
            { label: "Bildirim Hızı", value: "₺14.250+", color: "#00ff88", icon: "⚡" },
            { label: "Verimlilik", value: "%89", color: "#3b82f6", icon: "📈" },
            { label: "Hasta Memnuniyeti", value: "%97.3", color: "#ff00ff", icon: "❤️" },
            { label: "ROI (6 Ay)", value: "x4.7", color: "#ffd700", icon: "💰" },
        ],
        tech: ["Nex-Scan™ Triage", "Neural Core v5.0", "JWE Encrypted", "Hostinger CDN"],
        year: "2026",
        seal: "NEXTORIA CERTIFIED",
        flag: "🏆",
    },
    {
        id: "tourism-hub",
        tag: "CASE STUDY",
        tagColor: "#00ff88",
        title: "Diş Turizmi Hub",
        subtitle: "Avrupa → Türkiye Sağlık Turizmi Platformu",
        description:
            "12 ülkeden hasta kabul eden çok dilli Aura OS platformu. €2.400 ortalama paket, %62 tekrar hasta oranı ve 4.9★ Google değerlendirmesiyle sektörün zirvesi.",
        patientDesc: "12 ülkeden hizmet. Uçuş + otel + tedavi + transfer hepsi dahil € paketler.",
        metrics: [
            { label: "Ortalama Paket", value: "€2.400", color: "#00ff88", icon: "✈️" },
            { label: "Kaynak Ülke", value: "12 ülke", color: "#00ffff", icon: "🌍" },
            { label: "Değerlendirme", value: "4.9★", color: "#ffd700", icon: "⭐" },
            { label: "Tekrar Hasta", value: "%62", color: "#ff00ff", icon: "🔄" },
        ],
        tech: ["Çok Dilli CRM", "Sağlık Turizmi API", "GDPR Uyumlu", "24/7 Koordinasyon"],
        year: "2025",
        seal: "TOURISM CERTIFIED",
        flag: "🌍",
    },
    {
        id: "sigma-roi",
        tag: "ANALYTICS",
        tagColor: "#ff00ff",
        title: "σ_noise ROI Analizi",
        subtitle: "Deterministik Madde 7 Başarı Vakası",
        description:
            "σ_noise formülüyle klinik kararlarının deterministik temeli kuruldu. Sistemik ve çevresel varyans kaynakları izole edilerek %89 verimlilik artışı matematiksel olarak kanıtlandı.",
        patientDesc: "Bilim temelli klinik kararlarla doğru teşhis ve tedavi planı. Şans değil, sistem.",
        metrics: [
            { label: "σ_noise Değeri", value: "0.003", color: "#00ffff", icon: "📐" },
            { label: "Deterministic", value: "%99.7", color: "#00ff88", icon: "🎯" },
            { label: "Hız", value: "< 5ms", color: "#3b82f6", icon: "⚡" },
            { label: "Maliyet Azalma", value: "-%23", color: "#ffd700", icon: "📊" },
        ],
        tech: ["Madde 7 Protocol", "σ_sys + σ_env", "Real-time DSP", "Neural Inference"],
        year: "2025",
        seal: "SOVEREIGN SEALED",
        flag: "🔬",
    },
    {
        id: "kvkk-deployment",
        tag: "SECURITY",
        tagColor: "#8b00ff",
        title: "JWE Sovereign Deploy",
        subtitle: "Hostinger public_html — Sıfır Hata Yayın",
        description:
            "40 yıllık mühendislik birikimini JWE-RS256 mühürlü, KVKK ve GDPR tam uyumlu Hostinger statik deploy olarak hayata geçiren teknik opera. 99.97% uptime.",
        patientDesc: "Verileriniz RSA-OAEP ile şifreli. KVKK ve GDPR tam uyumlu. 0 ihlal, 3 yıl.",
        metrics: [
            { label: "Uptime", value: "99.97%", color: "#00ff88", icon: "📡" },
            { label: "Şifreleme", value: "JWE-RS256", color: "#8b00ff", icon: "🔐" },
            { label: "KVKK", value: "Tam Uyumlu", color: "#00ff88", icon: "⚖️" },
            { label: "Deploy Süresi", value: "< 30s", color: "#3b82f6", icon: "🚀" },
        ],
        tech: ["Hostinger CDN", "JWE Tokens", "SSL/TLS 1.3", "Zero-Downtime"],
        year: "2025",
        seal: "HOSTINGER CERTIFIED",
        flag: "🔐",
    },
];

export default function TheVault() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const [activeCase, setActiveCase] = useState<string | null>(null);

    return (
        <section id="vault" className="py-24 px-6 relative bg-black">
            {/* Background decorations */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
            />
            <div
                className="absolute left-0 bottom-0 pointer-events-none"
                style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(255,0,255,0.03) 0%, transparent 70%)", filter: "blur(60px)" }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-mono"
                        style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.25)", color: "#ffd700" }}
                    >
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ffd700", boxShadow: "0 0 6px #ffd700", animation: "pulseGlow 1.5s infinite" }} />
                        THE VAULT — DENTAL CASE HUB
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                        {isClinic ? (
                            <>Kanıtlanmış <span className="liquid-text" style={{ color: "#3b82f6" }}>Vakalar</span></>
                        ) : (
                            <>Acente <span className="liquid-text" style={{ color: "#a855f7" }}>Başarıları</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm font-mono leading-relaxed">
                        {isClinic
                            ? "Deterministik metriklerle imzalanmış, operasyonel verimlilik raporları."
                            : "Acenteler için otonom kâr artışı ve lead takip başarı hikayeleri."}
                    </p>
                </div>

                {/* Vault grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {VAULT_CASES.map(c => (
                        <div
                            key={c.id}
                            id={`vault-card-${c.id}`}
                            className="vault-card group relative"
                            onClick={() => setActiveCase(activeCase === c.id ? null : c.id)}
                        >
                            <div className="p-6">
                                {/* Flag + year */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{c.flag}</span>
                                        <span
                                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                                            style={{ color: c.tagColor, borderColor: `${c.tagColor}40`, background: `${c.tagColor}10` }}
                                        >
                                            {c.tag}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-700">{c.year}</span>
                                </div>

                                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{c.title}</h3>
                                <p className="text-[11px] text-gray-500 font-mono mb-4 leading-relaxed h-8 overflow-hidden">{c.subtitle}</p>

                                <p className="text-xs text-gray-400 leading-relaxed mb-6 font-sans">
                                    {isClinic ? c.description : c.patientDesc}
                                </p>

                                {/* Metrics grid */}
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    {c.metrics.map(m => (
                                        <div
                                            key={m.label}
                                            className="rounded-xl p-2.5 transition-all group-hover:bg-black/40"
                                            style={{ background: `${m.color}05`, border: `1px solid ${m.color}15` }}
                                        >
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="text-xs">{m.icon}</span>
                                                <span className="text-xs font-mono font-black" style={{ color: m.color }}>{m.value}</span>
                                            </div>
                                            <div className="text-[9px] text-gray-600 font-mono uppercase tracking-tighter">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {c.tech.map(t => (
                                        <span
                                            key={t}
                                            className="text-[9px] font-mono px-2 py-0.5 rounded-md text-blue-500/70 border border-blue-500/10 bg-blue-500/5 group-hover:border-blue-500/30 transition-all"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.tagColor, boxShadow: `0 0 6px ${c.tagColor}` }} />
                                        <span className="text-[9px] font-mono text-gray-500">{c.seal}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-700 font-mono group-hover:text-blue-500 transition-colors">
                                        {activeCase === c.id ? "[ KAPAT ]" : "[ DETAY ]"}
                                    </div>
                                </div>

                                {/* Expanded detail */}
                                {activeCase === c.id && (
                                    <div className="mt-4 pt-4 border-t border-blue-500/20 animate-fadeIn">
                                        <div className="text-[10px] font-mono p-3 rounded-xl bg-black/60 border border-blue-500/10">
                                            <div className="mb-1 text-blue-500 uppercase tracking-widest font-black">Sovereign Analiz</div>
                                            <div className="text-gray-600 leading-relaxed mb-2">Tüm metrikler Neural Core v5.0 tarafından asenkron olarak doğrulandı.</div>
                                            <div className="text-green-500 flex items-center gap-1">
                                                <span>✓</span> JWE İmza Doğrulandı
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-[10px] font-mono text-gray-700 tracking-[0.2em] uppercase opacity-50">
                        847 AKTİF KLİNİK | JWE MÜHÜRLÜ VERİ | KVKK & GDPR UYUMLU
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </section>
    );
}
