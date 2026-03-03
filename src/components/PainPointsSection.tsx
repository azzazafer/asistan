"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

const DOCTOR_PAINS = [
    {
        icon: "📅",
        title: "No-Show Salgını",
        stat: "Her 10 randevudan 3'ü boş geçiyor",
        desc: "Türkiye ortalaması. Klinik başına aylık ₺12.000–₺18.000 boşa giden süre.",
        fix: "Aura OS: AI hatırlatıcı + otomatik bekleme listesi → no-show -%71",
        color: "#ff2244",
    },
    {
        icon: "📋",
        title: "Kağıt Boğulması",
        stat: "Günde 2.3 saat saf kağıt işi",
        desc: "Anamnez, reçete, fatura, sgk formu... Hekimin günde 2 hastası bunlara gidiyor.",
        fix: "Aura OS: Tek tıkla dijital anamnez, e-imza, otomatik fatura",
        color: "#ff8800",
    },
    {
        icon: "💸",
        title: "Kaçan Takip Gelirleri",
        stat: "%67 hasta ikinci muayeneye gelmiyor",
        desc: "Kanal ve implant hastasını bir daha göremiyorsunuz. Takip SMS'i yok.",
        fix: "Aura OS: Otomatik takip protokolü → geri dönüş oranı +%43",
        color: "#ffd700",
    },
    {
        icon: "🧾",
        title: "Fiyat Karmaşası",
        stat: "%53 hasta fiyat sorarak gidip gelmiyor",
        desc: "Telefonda fiyat veriyorsunuz, hasta araştırıyor, geri dönmüyor.",
        fix: "Aura OS: Akıllı fiyat teklifi + anında WhatsApp onay akışı",
        color: "#3b82f6",
    },
    {
        icon: "👥",
        title: "Personel Verimsizliği",
        stat: "Resepsiyonist gününün %40'ını telefonda geçiriyor",
        desc: "Randevu alma, hatırlatma, sonuç bildirme — hepsi elle.",
        fix: "Aura OS: Online randevu + otomatik bildirim → %73 zaman tasarrufu",
        color: "#ff00ff",
    },
    {
        icon: "🌍",
        title: "Sağlık Turizmi Kaçıyor",
        stat: "TR'ye yılda 1.2M+ diş turisti — siz kaçını alıyorsunuz?",
        desc: "Alman, Hollandalı, İngiliz hastalar Google'da arıyor. Çok dilli sistem yok.",
        fix: "Aura OS: TR/EN/AR/DE 4 dil + turizm paket modülü + transfer koordinasyonu",
        color: "#00ff88",
    },
];

const PATIENT_PAINS = [
    { icon: "💰", title: "Avrupa Fiyatları Çok Yüksek", stat: "İmplant: Almanya €3.200 — Türkiye €800", desc: "Aynı kalite, fiyatın sadece %25'i. Fark uçak + otelLE bile kapanıyor.", fix: "Aura OS kliniğiyle paket fiyatı al, karşılaştır, karar ver.", color: "#00ff88" },
    { icon: "🔍", title: "Hangi Kliniğe Güveneyim?", stat: "%78 hastan güven sorununu birinci engel görüyor", desc: "Instagram'da harika görünen klinikler var ama gerçek akreditasyon bilgisi yok.", fix: "JCI & ISO sertifikalı, 4.9★ doğrulanmış hasta yorumlu klinikler.", color: "#3b82f6" },
    { icon: "✈️", title: "Lojistik Baş Ağrısı", stat: "Uçuş + otel + klinik + transfer koordinasyonu", desc: "Her şeyi ayrı ayrı organize etmek zorunda kalmak caydırıcı.", fix: "Aura OS: Tek paket — transfer, 5★ otel, klinik, sigorta hepsi dahil.", color: "#ffd700" },
    { icon: "🗣", title: "Dil Engeli", stat: "%64 Avrupalı hasta dil bariyerini birinci sorun seçiyor", desc: "Türkçe bilmeden klinikle nasıl iletişim kuracaklar?", fix: "TR/EN/DE/AR 7/24 çok dilli koordinatörler ve dijital anamnez.", color: "#ff00ff" },
];

export default function PainPointsSection() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const [expanded, setExpanded] = useState<string | null>(null);
    const pains = isClinic ? DOCTOR_PAINS : PATIENT_PAINS;

    return (
        <section id="pain-points" className="py-20 px-6 relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,34,68,0.04) 0%, transparent 60%)" }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono" style={{ background: "rgba(255,34,68,0.08)", border: "1px solid rgba(255,34,68,0.25)", color: "#ff2244" }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ff2244", boxShadow: "0 0 6px #ff2244" }} />
                        {isClinic ? "KLİNİĞİNİZDE BU SORUNLAR VAR MI?" : "ACENTENİZDE BU SORUNLAR VAR MI?"}
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
                        {isClinic ? (
                            <>Para nereden <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#3b82f6" }}>kaçıyor?</span></>
                        ) : (
                            <>Lead neden <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#a855f7" }}>yanıyor?</span></>
                        )}
                    </h2>
                    <p className="text-gray-400 text-sm font-mono max-w-xl mx-auto">
                        {isClinic
                            ? "Türkiye'deki ortalama diş kliniğinin yaşadığı kayıplar. Bunlardan kaçı sizin kliniğinizde oluyor?"
                            : "Sağlık turizmi acentelerinin en büyük sızıntı noktaları. Leadleriniz nerede buharlaşıyor?"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pains.map((p) => (
                        <div
                            key={p.title}
                            className="vault-card cursor-pointer transition-all duration-300"
                            style={{ border: expanded === p.title ? `1px solid ${p.color}40` : "1px solid rgba(26,26,58,1)", boxShadow: expanded === p.title ? `0 0 20px ${p.color}10` : "none" }}
                            onClick={() => setExpanded(expanded === p.title ? null : p.title)}
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-2xl">{p.icon}</span>
                                    <span className="text-xs font-mono" style={{ color: p.color }}>
                                        {expanded === p.title ? "▲ KAPAT" : "▼ ÇÖZÜM"}
                                    </span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">{p.title}</h3>
                                <div className="text-xs font-mono font-bold mb-2 px-2 py-1 rounded-md inline-block" style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                                    {p.stat}
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>

                                {expanded === p.title && (
                                    <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(0,255,136,0.15)" }}>
                                        <div className="text-xs font-mono rounded-lg p-3" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
                                            ✓ {p.fix}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <p className="text-sm text-gray-500 mb-4 font-mono">
                        {isClinic
                            ? "Bu 6 sorunun hepsini Aura OS çözüyor. İlk ayda farkı görürsünüz."
                            : "Aura OS acente modülüyle bu sızıntıları mühürleyerek kârlılığınızı artırın."}
                    </p>
                    <a href="#demo" id="pain-cta">
                        <button className="btn-sovereign py-3 px-8 text-sm">
                            {isClinic ? "📊 ROI Hesapla →" : "📡 Otonom Funnel Deneyin →"}
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
