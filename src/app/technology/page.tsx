"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Camera, Lock, Zap, Cpu, Globe, ArrowRight } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function TechnologyPage() {
    return (
        <AuraLayout>
            <div className="pt-32 pb-40 px-6 max-w-[1400px] mx-auto space-y-40">
                {/* Header */}
                <header className="max-w-4xl space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                        CORE TECH DEPLOYMENT
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                        Hiper <span className="text-[#00F0FF]">Otonom</span> Mimarisi.
                    </h1>
                    <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-2xl text-justify">
                        Aura OS, sadece bir yazılım değil; sağlık turizmi operasyonlarını milisaniyelik hassasiyetle yöneten bir Nöro-Satış ekosistemidir.
                    </p>
                </header>

                {/* Tech Sections */}
                <div className="space-y-40">
                    <TechSection
                        title="Scarcity Engine™"
                        subtitle="Kıtlık Algısı ve Psikolojik Tetikleyici"
                        description="AI, havuzdaki aktif lead sayısını ve klinikteki boş slotları eş zamanlı analiz eder. Kritik eşiğin altına düşüldüğünde mesajlaşma tonunu 'Aciliyet' moduna geçirerek dönüşümü %300 artırır."
                        icon={<Activity className="text-[#FF4500]" />}
                        color="#FF4500"
                        image="/images/aura_financial_dominance_graph.png"
                    />

                    <TechSection
                        title="Nex-Scan™ Triaj"
                        subtitle="Görüntü İşleme ve Otomatik Puanlama"
                        description="Hastanın gönderdiği fotoğrafı (Saç ekimi, Diş, Plastik Cerrahi) derin öğrenme modelleriyle analiz eder. Greft sayısını veya operasyon karmaşıklığını 12ms içinde belirleyerek doğru Lead Skorunu atar."
                        icon={<Camera className="text-[#00F0FF]" />}
                        color="#00F0FF"
                        image="/images/aura_neural_network_abstract.png"
                        reverse
                    />

                    <TechSection
                        title="Stripe Bridge"
                        subtitle="Otonom Tahsilat ve Slot Rezervasyonu"
                        description="AI satış temsilcisi, hasta ikna olduğu anda Stripe üzerinden güvenli ödeme linki oluşturur. Ödeme yapıldığı anda HBYS sisteminde (Fonet/Tiga) ilgili slotu dondurur ve operasyonu kesinleştirir."
                        icon={<Lock className="text-white" />}
                        color="#FFFFFF"
                        image="/images/aura_secure_tech_alpha.png"
                    />
                </div>

                {/* Integration Grid */}
                <div className="py-20 border-y border-white/5 space-y-16">
                    <h2 className="text-3xl font-bold uppercase italic font-space text-white text-center">Global Entegrasyon Katmanı</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <IntegCard title="HBYS Entegrasyonu" text="Fonet, Tiga ve özel API'lar ile tam senkronizasyon." />
                        <IntegCard title="Omnichannel Gateway" text="WhatsApp, IG, Telegram tek panelde otonom yönetim." />
                        <IntegCard title="Real-time Scoring" text="Milisaniyelik gecikme ile veriye dayalı puanlama." />
                        <IntegCard title="Secure Banking" text="Stripe ve yerel ödeme geçitleri ile tam uyum." />
                    </div>
                </div>
            </div>
        </AuraLayout>
    );
}

function TechSection({ title, subtitle, description, icon, color, image, reverse }: any) {
    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20`}>
            <div className="flex-1 space-y-8">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 30px ${color}20` }}>
                    {React.cloneElement(icon, { size: 32 })}
                </div>
                <div className="space-y-4">
                    <h2 className="text-5xl font-bold text-white uppercase italic font-space tracking-tighter">{title}</h2>
                    <h3 className="text-[#00F0FF] text-[10px] font-black uppercase tracking-[0.4em]">{subtitle}</h3>
                </div>
                <p className="text-[#B0B0B0] text-lg leading-relaxed">{description}</p>
            </div>
            <div className="flex-1 w-full aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.01] relative group">
                <img src={image} alt={title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>
        </div>
    );
}

function IntegCard({ title, text }: any) {
    return (
        <div className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-[#00F0FF]/20 transition-colors">
            <h4 className="text-white font-bold uppercase italic text-sm mb-3">{title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">{text}</p>
        </div>
    );
}
