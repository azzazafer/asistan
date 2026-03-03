"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import SandboxModal from './SandboxModal';

const MATRIX_CHIPS = [
    "Akıllı Randevu", "No-Show -%71", "Otonom Hatırlatıcı", "WhatsApp Otomasyon",
    "Online Rezervasyon", "Çapraz Satış Motoru", "VIP Hasta Protokolü", "Hasta Segmentasyonu",
    "Takip SMS/WhatsApp", "Hasta Risk Skoru", "KVKK A++ Motoru", "JWE-RS256 Şifreleme",
    "Çift Faktörlü Kimlik", "DDoS Koruma", "GDPR Uyumluluk", "Otonom Fatura",
    "SGK Entegrasyonu", "Esnek Taksit", "Sigorta Entegrasyonu", "Net Kâr Raporu",
    "Dönemsel Büyüme", "Stok Takibi", "Ekipman Bakımı", "Enerji Optimizasyonu",
    "Süreç Otomasyonu", "Vardiya Planlaması", "Alpha Command Center", "Gerçek Zamanlı Panel",
    "Mobil Yönetim", "Çok Şube Yönetimi", "API Entegrasyonu", "Dijital Anamnez",
    "e-Reçete", "AI Tedavi Önerisi", "İlaç Uyarı Sistemi", "Radyoloji Entegrasyonu",
    "JCI Akreditasyon", "Google Yorum Bot", "SEO & Görünürlük", "Pazarlama Otomasyonu",
    "E-posta Kampanya", "Rekabet Analizi", "Çok Dilli CRM", "Online Konsültasyon",
    "Turizm Paket Yönetimi", "Medikal Tur Koordinasyon", "Hekim Performansı", "Personel Eğitim",
    "Operasyon Verimliliği", "σ_noise ROI Motoru", "Tahminsel Analitik", "Aylık Büyüme Koçu",
    "Hasta Akış Analizi", "Sovereign Sertifikasyon", "99.97% Uptime"
];

const CONTENT = {
    clinic: [
        { title: 'Nex-Scan™ Teşhis', desc: 'Gözden kaçan sızıntıları bulur, teşhis cirosunu %30 artırır.', metric: '+%30' },
        { title: 'Otonom Ciro Kurtarma', desc: 'İptal olan koltuğu saniyeler içinde doldurur, no-showları bitirir.', metric: '₺32K/Ay' },
        { title: 'Global İstihbarat', desc: 'Sağlık turizmi hastasını kendi dilinde ikna eder, %840 ROAS sağlar.', metric: '%840' },
    ],
    agency: [
        { title: 'Alpha Command Center', desc: 'Gönderdiğiniz her lead’in anlık takibi ve şeffaf durum raporu.', metric: 'LIVE' },
        { title: 'Çok Dilli İkna Motoru', desc: 'Klinik uyurken hastayı WhatsApp’ta kapatır, satış kaybını önler.', metric: '24/7' },
        { title: 'Komisyon Zırhı', desc: 'Satışa dönen her hastanın otonom hakediş raporu ve onaylı takip.', metric: 'SECURE' },
    ]
};

export default function SovereignMatrix() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const roleContent = isClinic ? CONTENT.clinic : CONTENT.agency;

    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [isSandboxOpen, setIsSandboxOpen] = useState(false);
    const vaultRef = useRef<HTMLDivElement>(null);
    const [vaultHeight, setVaultHeight] = useState(0);

    useEffect(() => {
        if (vaultRef.current) {
            setVaultHeight(isVaultOpen ? vaultRef.current.scrollHeight : 0);
        }
    }, [isVaultOpen]);

    return (
        <section id="sovereign-matrix" className="py-24 px-6 bg-black relative overflow-hidden theme-transition">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 group cursor-default">
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ color: 'var(--accent-primary)' }} />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">MAHŞERİN 3 ATLISI — SOVEREIGN MODULE</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                        Broşürün Bittiği Yer, <span style={{ color: 'var(--accent-primary)' }}>Aura&apos;nın Başladığı Yer</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base font-medium">
                        Klinik veya Acente moduna göre otonom optimize edilen en güçlü 3 yetkinlik.
                    </p>
                </div>

                {/* 1. Dinamik Vitrin (The 3 Main Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {roleContent.map((card, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" style={{ color: 'var(--accent-primary)' }} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500">
                                        {idx === 0 ? '🔬' : idx === 1 ? '💰' : '🌍'}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black font-mono leading-none" style={{ color: 'var(--accent-primary)' }}>{card.metric}</div>
                                        <div className="text-[9px] font-mono text-gray-500 tracking-wider mt-1 uppercase">VERİM SKORU</div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{card.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {card.desc}
                                </p>

                                {/* Buton (Hover-only) */}
                                <div className="h-10">
                                    <button
                                        onClick={() => setIsSandboxOpen(true)}
                                        className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                                    >
                                        PANELİ İNCELE →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. The Vault (Gizli Kasa Toggle) */}
                <div className="flex flex-col items-center">
                    <button
                        onClick={() => setIsVaultOpen(!isVaultOpen)}
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                        AURA OS V6.0: TÜM MATRİSİ KEŞFET
                        <span className={`transition-transform duration-500 ${isVaultOpen ? 'rotate-180' : ''}`}>🔽</span>
                    </button>

                    <div
                        style={{ height: vaultHeight }}
                        className="w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)]"
                    >
                        <div ref={vaultRef} className="py-12 flex flex-wrap justify-center gap-3">
                            {MATRIX_CHIPS.map((chip, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-default"
                                >
                                    {chip}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Sandbox Modal */}
            <SandboxModal isOpen={isSandboxOpen} onClose={() => setIsSandboxOpen(false)} />

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none opacity-20" />
        </section>
    );
}
