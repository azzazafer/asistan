"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";

export default function ContactSection() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [clinic, setClinic] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = () => {
        if (!name || !phone) return;
        const text = `Merhaba Zafer Bey, Demo talebim var.
İsim: ${name}
Telefon: ${phone}
${isClinic ? 'Klinik' : 'Acente'}: ${clinic || 'Belirtilmedi'}
Destek bekliyorum.`;

        const url = `https://wa.me/905510596718?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setSent(true);
    };

    return (
        <section id="contact" className="py-20 px-6 relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT: Value + pricing hint */}
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-mono" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                            BAŞLAMAK KOLAY
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                            {isClinic ? (
                                <>Klinik İçin <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#3b82f6" }}>Demo Alın</span></>
                            ) : (
                                <>Acente İçin <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#a855f7" }}>Demo Alın</span></>
                            )}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            {isClinic
                                ? "Kliniğinize özel ROI analizi ve canlı Aura OS demosu. 15 dakika. Kredi kartı yok."
                                : "Acentenize özel lead takip sistemi ve komisyon koruma demosu. 15 dakika."}
                        </p>

                        {/* Pricing cards */}
                        <div className="space-y-3">
                            {[
                                {
                                    plan: isClinic ? "Starter Clinic" : "Starter Agency",
                                    price: isClinic ? "₺2.490" : "₺3.990",
                                    period: "/ ay",
                                    desc: isClinic ? "1 hekim, randevu + fatura" : "Sınırsız lead takibi + WhatsApp entegre",
                                    color: "#3b82f6"
                                },
                                {
                                    plan: isClinic ? "Pro Clinic" : "Elite Agency",
                                    price: isClinic ? "₺4.990" : "₺8.490",
                                    period: "/ ay",
                                    desc: isClinic ? "5 hekim + Nex-Scan™ + Triage" : "AI İKNA Hub + Global CRM entegrasyonu",
                                    color: "#a855f7",
                                    badge: "EN POPÜLER"
                                },
                                {
                                    plan: "Sovereign / Enterprise",
                                    price: "Fiyat al",
                                    period: "",
                                    desc: "Zincir yapılar için özel Neural Core mimarisi",
                                    color: "#ffd700"
                                },
                            ].map(p => (
                                <div key={p.plan}
                                    className="flex items-center justify-between rounded-xl p-4"
                                    style={{ background: `${p.color}08`, border: `1px solid ${p.color}25` }}
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono font-bold text-white">{p.plan}</span>
                                            {p.badge && <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: p.color, color: "#000" }}>{p.badge}</span>}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono font-black text-sm" style={{ color: p.color }}>{p.price}</span>
                                        <span className="text-xs text-gray-600">{p.period}</span>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs font-mono text-gray-600">* 14 gün ücretsiz deneme · İptal kolayı · KVKK uyumlu</p>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="sigma-panel p-6">
                        {!sent ? (
                            <>
                                <div className="text-sm font-mono font-bold text-white mb-5">
                                    🚀 Ücretsiz Demo Talebi
                                </div>
                                <div className="space-y-3 mb-4">
                                    <div>
                                        <label className="text-xs font-mono text-gray-500 mb-1.5 block">Adınız Soyadınız *</label>
                                        <input id="contact-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ahmet Yılmaz"
                                            className="w-full font-mono text-sm rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-mono text-gray-500 mb-1.5 block">Telefon / WhatsApp *</label>
                                        <input id="contact-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="05xx xxx xx xx"
                                            className="w-full font-mono text-sm rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-mono text-gray-500 mb-1.5 block">{isClinic ? "Klinik Adı" : "Acente Adı"}</label>
                                        <input id="contact-clinic" type="text" value={clinic} onChange={e => setClinic(e.target.value)} placeholder={isClinic ? "Klinik Adı" : "Acente Adı"}
                                            className="w-full font-mono text-sm rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                </div>
                                <button id="contact-submit" onClick={handleSubmit} disabled={!name || !phone}
                                    className="btn-sovereign w-full py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                                    📞 Demo Randevusu Al
                                </button>
                                <div className="flex items-center justify-center gap-4 mt-4 text-xs font-mono text-gray-600">
                                    <span>🔒 KVKK Uyumlu</span>
                                    <span>·</span>
                                    <span>📞 24 saat içinde arama</span>
                                    <span>·</span>
                                    <span>💬 WhatsApp destek</span>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">✅</div>
                                <div className="text-lg font-bold text-white mb-2">Talebiniz Alındı!</div>
                                <div className="text-sm text-gray-400 mb-4">
                                    <strong className="text-white">{name}</strong>, en geç 24 saat içinde <strong className="text-green-400">{phone}</strong> numaranızı arayacağız.
                                </div>
                                <div className="text-xs font-mono text-gray-600">Acil ise: <a href="https://wa.me/905001234567" className="text-green-400">WhatsApp&apos;tan yazın →</a></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
