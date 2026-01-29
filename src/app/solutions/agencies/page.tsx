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
                            Komuta <br />
                            <span className="text-[#00F0FF]">Merkezi.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] leading-relaxed max-w-xl">
                            Aura OS, medikal turizm acenteleri için sınırsız ölçeklenebilirlik sunar. Onlarca kliniği, yüzlerce partneri ve binlerce hastayı tek bir otonom ağdan yönetin.
                        </p>
                    </div>
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] group aspect-square lg:aspect-video">
                        <img
                            src="/images/aura_agency_global_network.png"
                            alt="Aura OS Agency Command Center"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[4000ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                        {/* Dynamic UI Elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
                        </div>
                    </div>
                </header>

                {/* Network Capabilities */}
                <div className="grid md:grid-cols-3 gap-8">
                    <CapabilityCard
                        icon={<Network className="text-[#00F0FF]" />}
                        title="Multi-Tenant Nexus"
                        text="Aynı anda 50+ farklı klinik CRM'ine bağlanın. Verileri tekilleştirin, operasyonel karmaşayı %90 azaltın."
                        delay={0.1}
                    />
                    <CapabilityCard
                        icon={<PieChart className="text-[#00F0FF]" />}
                        title="Otonom Hakediş"
                        text="Manuel komisyon hesaplarına son. Her operasyon kapandığında hakedişiniz saniyeler içinde tanımlanır."
                        delay={0.2}
                    />
                    <CapabilityCard
                        icon={<Globe className="text-[#00F0FF]" />}
                        title="Global Lead Borsası"
                        text="Sadece kendi leadlerinizi değil, havuzdaki uygun fırsatları da otonom eşleşme ile yakalayın."
                        delay={0.3}
                    />
                </div>

                {/* Dashboard Matrix Visual Section */}
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01] group aspect-square">
                        <img
                            src="/images/agency_command.png"
                            alt="Agency Command Dashboard"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[5000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        <div className="absolute top-10 right-10 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                            <div className="text-[8px] font-black text-white uppercase tracking-widest">Global Master Command</div>
                        </div>
                    </div>

                    <div className="p-12 md:p-20 bg-white/[0.01] border border-white/5 rounded-[4rem] overflow-hidden flex flex-col justify-center space-y-16 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00F0FF05_0%,transparent_70%)]" />
                        <div className="space-y-4 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black uppercase italic font-space text-white tracking-tighter">Partner Ekosistemi.</h2>
                            <p className="text-lg text-[#B0B0B0]">Aura OS kullanan acenteler, kliniklerle olan güven ilişkisini veri şeffaflığı ve otonom raporlama ile en üst seviyeye taşır.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-12 relative z-10">
                            <StatItem label="Aktif Klinik" value="150+" delay={0.4} />
                            <StatItem label="Aylık Randevu" value="12K+" delay={0.5} />
                            <StatItem label="Otonom Tahsilat" value="$5M+" delay={0.6} />
                            <StatItem label="Ort. Dönüşüm" value="%18" delay={0.7} />
                        </div>
                    </div>
                </div>

                {/* Global Nexus Visual */}
                <div className="relative h-[400px] rounded-[4rem] overflow-hidden border border-white/5 bg-white/[0.01]">
                    <img src="/images/global_nexus.png" alt="Global Network" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h3 className="text-2xl font-bold text-white uppercase italic font-space tracking-[0.2em] mb-4">Sınır Tanımayan Ölçekleme</h3>
                        <p className="text-[#B0B0B0] text-sm max-w-xl">Aura OS ile operasyonunuzu aynı anda 15+ farklı dilde ve 4 kıtada otonom olarak genişletin.</p>
                    </div>
                </div>

            </div>
        </AuraLayout>
    );
}

function CapabilityCard({ icon, title, text, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            viewport={{ once: true }}
            className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6 hover:border-[#00F0FF]/30 transition-all duration-500 relative z-10"
        >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-white/10 group-hover:bg-[#00F0FF]/10 transition-all duration-500">
                {icon}
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-white uppercase italic font-space">{title}</h3>
                <p className="text-[#B0B0B0] text-sm leading-relaxed">{text}</p>
            </div>
        </motion.div>
    );
}

function StatItem({ label, value, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            viewport={{ once: true }}
            className="space-y-2"
        >
            <div className="text-3xl font-bold text-white font-space italic">{value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">{label}</div>
        </motion.div>
    );
}
