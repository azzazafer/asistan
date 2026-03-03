"use client";

const TESTIMONIALS = [
    {
        name: "Dr. Mehmet Karakoç",
        clinic: "Karakoç Diş Kliniği — Kadıköy, İstanbul",
        avatar: "👨‍⚕️",
        stars: 5,
        text: "İlk ayda 38 ek randevu doldurdu. No-show oranım %28'den %8'e düştü. Rakamlar konuşuyor.",
        metric: "+₺31.200 / ilk ay",
        metricColor: "#00ff88",
        useCase: "doctor",
    },
    {
        name: "Dr. Fatma Şahin",
        clinic: "Antalya International Dental — Sağlık Turizmi",
        avatar: "👩‍⚕️",
        stars: 5,
        text: "Alman ve Hollandalı hastalarım artık Aura OS üzerinden randevu alıyor. Çok dilli sistem gerçekten işe yarıyor.",
        metric: "34 ülkeden hasta",
        metricColor: "#3b82f6",
        useCase: "doctor",
    },
    {
        name: "Mehmet A.",
        clinic: "Frankfurt, Almanya — Diş Turizmi Hastası",
        avatar: "🇩🇪",
        stars: 5,
        text: "İmplant için Almanya'da €3.400 teklif almıştım. İstanbul'da €890'a aynı kalitede yaptım. Transfer ve otel de dahildi.",
        metric: "%74 tasarruf",
        metricColor: "#ffd700",
        useCase: "patient",
    },
    {
        name: "Dr. Okan Demir",
        clinic: "Demir Ağız & Diş — Ankara",
        avatar: "👨‍⚕️",
        stars: 5,
        text: "Kağıt anamnez ve manuel fatura için günde 2 saat harcıyordum. Şimdi 20 dakika. Hekime döndüm.",
        metric: "Günde +1.8 saat kurtarıldı",
        metricColor: "#ff00ff",
        useCase: "doctor",
    },
    {
        name: "Sarah M.",
        clinic: "London, UK — Diş Turizmi Hastası",
        avatar: "🇬🇧",
        stars: 5,
        text: "The coordination was seamless. Hotel, airport pick-up, clinic — everything was handled. My veneers look amazing.",
        metric: "£3.100 tasarruf",
        metricColor: "#00ff88",
        useCase: "patient",
    },
    {
        name: "Dr. Zeynep Yıldırım",
        clinic: "Yıldırım Klinik — İzmir",
        avatar: "👩‍⚕️",
        stars: 5,
        text: "KVKK uyumluluk denetimimiz vardı. Aura OS sayesinde A++ sertifika aldık. Hukuki risk sıfıra indi.",
        metric: "KVKK: A++ Sertifika",
        metricColor: "#8b00ff",
        useCase: "doctor",
    },
];

import { useUser } from "@/context/UserContext";

export default function SocialProof() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';

    return (
        <section id="testimonials" className="py-20 px-6 relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,255,136,0.04) 0%, transparent 60%)" }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono" style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.25)", color: "#ffd700" }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ffd700", boxShadow: "0 0 6px #ffd700" }} />
                        GERÇEK KULLANICILAR — GERÇEK SONUÇLAR
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
                        Onlar <span className="liquid-text" style={{ backgroundSize: "300% 300%" }}>denedi.</span>
                    </h2>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <div className="flex">
                            {"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-xl">{s}</span>)}
                        </div>
                        <span className="text-sm font-mono text-gray-400">4.9 ortalama · <span className="text-white font-bold">847</span> aktif klinik · <span className="text-white font-bold">6.400+</span> hasta</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {TESTIMONIALS.slice(0, 3).map((t) => (
                        <div key={t.name} className="vault-card p-5 flex flex-col">
                            {/* Stars */}
                            <div className="flex mb-3">
                                {"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-sm">{s}</span>)}
                            </div>

                            {/* Quote */}
                            <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">&ldquo;{t.text}&rdquo;</p>

                            {/* Metric pill */}
                            <div className="rounded-lg px-3 py-2 mb-4 inline-flex items-center gap-2" style={{ background: `${t.metricColor}10`, border: `1px solid ${t.metricColor}25` }}>
                                <span className="text-xs font-mono font-black" style={{ color: t.metricColor }}>{t.metric}</span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                                <div className="text-2xl">{t.avatar}</div>
                                <div>
                                    <div className="text-xs font-mono font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-gray-600">{t.clinic}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust logos strip */}
                <div className="mt-10 pt-8 border-t flex flex-wrap items-center justify-center gap-6" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                    {["JCI Akreditasyonu", "ISO 9001:2015", "KVKK Uyumlu", "GDPR Certified", "TDB Onaylı"].map(b => (
                        <div key={b} className="flex items-center gap-2 text-xs font-mono text-gray-600 px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(59,130,246,0.12)" }}>
                            <span className="text-green-400">✓</span> {b}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <a href="#demo" id="social-proof-cta">
                        <button className="btn-sovereign py-3 px-10 text-sm">
                            {isClinic ? "📞 15 Dakikalık Demo Deneyin →" : "📡 Başarı Hikayelerini İncele →"}
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
