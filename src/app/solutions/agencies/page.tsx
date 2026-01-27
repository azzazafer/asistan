"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, TrendingUp, Shield, BarChart3, Briefcase, Network, PieChart } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function AgenciesPage() {
    return (
        <AuraLayout>
            <div className="pt-32 pb-40 px-6 max-w-[1400px] mx-auto space-y-40">
                {/* Header Section */}
                <header className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            SOLUTIONS • FOR AGENCIES
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                            Komuta <span className="text-[#00F0FF]">Merkezi.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-xl">
                            Aura OS, medikal turizm acenteleri için sınırsız ölçeklenebilirlik sunar. Onlarca kliniği, yüzlerce partneri ve binlerce hastayı tek bir otonom ağdan yönetin.
                        </p>
                    </div>
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] group">
                        <img
                            src="/images/aura_agency_nexus.png"
                            alt="Aura OS Agency Command Center"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    </div>
                </header>

                {/* Network Capabilities */}
                <div className="grid md:grid-cols-3 gap-8">
                    <CapabilityCard
                        icon={<Network className="text-[#00F0FF]" />}
                        title="Multi-Tenant Nexus"
                        text="Aynı anda 50+ farklı klinik CRM'ine bağlanın. Verileri tekilleştirin, operasyonel karmaşayı %90 azaltın."
                    />
                    <CapabilityCard
                        icon={<PieChart className="text-[#00F0FF]" />}
                        title="Otonom Hakediş"
                        text="Manuel komisyon hesaplarına son. Her operasyon kapandığında hakedişiniz saniyeler içinde tanımlanır."
                    />
                    <CapabilityCard
                        icon={<Globe className="text-[#00F0FF]" />}
                        title="Global Lead Borsası"
                        text="Sadece kendi leadlerinizi değil, havuzdaki uygun fırsatları da otonom eşleşme ile yakalayın."
                    />
                </div>

                {/* Dashboard Matrix Visual Section */}
                <div className="py-20 bg-white/[0.01] border border-white/5 rounded-[4rem] overflow-hidden flex flex-col items-center text-center space-y-12">
                    <div className="max-w-2xl space-y-4">
                        <h2 className="text-4xl font-bold uppercase italic font-space text-white">Partner Ekosistemi</h2>
                        <p className="text-[#B0B0B0]">Aura OS kullanan acenteler, kliniklerle olan güven ilişkisini veri şeffaflığı ve otonom raporlama ile en üst seviyeye taşır.</p>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="grid md:grid-cols-4 gap-20">
                        <StatItem label="Aktif Klinik" value="150+" />
                        <StatItem label="Aylık Randevu" value="12K+" />
                        <StatItem label="Otonom Tahsilat" value="$5M+" />
                        <StatItem label="Ort. Dönüşüm" value="%18" />
                    </div>
                </div>
            </div>
        </AuraLayout>
    );
}

function CapabilityCard({ icon, title, text }: any) {
    return (
        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6 hover:border-[#00F0FF]/30 transition-all duration-500">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-white/10">
                {icon}
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-white uppercase italic font-space">{title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{text}</p>
            </div>
        </div>
    );
}

function StatItem({ label, value }: any) {
    return (
        <div className="space-y-2">
            <div className="text-3xl font-bold text-white font-space italic">{value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">{label}</div>
        </div>
    );
}
