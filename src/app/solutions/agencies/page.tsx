"use client";

import React from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Globe, Layers, BarChart3, TrendingUp, Zap, ChevronRight, Cpu, Shield, Network, Share2, Briefcase } from "lucide-react";

export default function AgenciesGodModePage() {
    return (
        <AuraLayout>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-emerald-500/[0.02] blur-[200px] rounded-full pointer-events-none" />

                <div className="max-w-[1400px] mx-auto space-y-40">
                    {/* --- HERO: THE NETWORK --- */}
                    <div className="space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-emerald-500/20">
                            <Globe size={14} /> AGENCY DOMINANCE • V112
                        </motion.div>
                        <h1 className="text-6xl md:text-[9rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic font-space">
                            Karargahınızı<br />
                            <span className="text-emerald-400">Yükseltin.</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-slate-500 italic border-l-2 border-emerald-500/20 pl-10 max-w-4xl leading-relaxed">
                            Aura OS, medikal turizm acenteleri için sınırsız ölçeklenebilirlik sunar. Onlarca kliniği, yüzlerce partneri ve binlerce hastayı tek bir otonom ağdan yönetin.
                        </p>
                    </div>

                    {/* --- FEATURES GRID --- */}
                    <div className="grid lg:grid-cols-2 gap-10">
                        <FeatureCard
                            icon={<Network className="text-emerald-400" />}
                            title="Multi-Tenant Nexus"
                            text="Aynı anda 50+ farklı klinik CRM'ine bağlanın. Verileri tekilleştirin, operasyonel karmaşayı %90 azaltın."
                        />
                        <FeatureCard
                            icon={<Share2 className="text-emerald-400" />}
                            title="Hakediş Otomasyonu"
                            text="Manuel komisyon hesaplarına son. Her operasyon kapandığında, acente hakedişiniz saniyeler içinde şeffafça tanımlanır."
                        />
                    </div>

                    {/* --- COMMISSION PULSE VISUAL --- */}
                    <div className="p-16 md:p-32 rounded-[6rem] bg-white/[0.01] border border-white/10 flex flex-col xl:flex-row items-center gap-32 group relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex-1 space-y-12 relative z-10">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/5 shadow-inner"><BarChart3 size={24} /></div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic leading-tight font-space">Gelirlerinizi<br />Anlık İzleyin.</h2>
                            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">Hangi partner kliniğinizde hangi operasyon gerçekleşti? Aura, global ciro akışını acente dashboardunuza 12ms hızında yansıtır.</p>
                            <button className="px-12 py-5 border border-emerald-400/30 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-emerald-400 hover:text-black transition-all">
                                NETWORK DURUMUNU GÖR
                            </button>
                        </div>

                        <div className="w-full lg:w-[450px] p-20 bg-[#050505] rounded-[4rem] border border-white/5 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent" />
                            <div className="text-[10px] font-black tracking-[1em] text-emerald-400 uppercase mb-10 opacity-60">ACENTE CİRO AKIŞI</div>
                            <div className="text-7xl font-bold text-white tracking-tighter italic scale-110">$42,910</div>
                            <div className="mt-16 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 2 }} className="h-full bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
                            </div>
                            <div className="mt-8 text-[8px] font-black tracking-widest text-slate-700 uppercase italic">ALPHA NODE CONNECTED</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL FOOTNOTE --- */}
            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <div className="flex justify-center gap-12 mb-8 opacity-20">
                    <Briefcase size={32} />
                    <Network size={32} />
                    <TrendingUp size={32} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-700 mb-4">God-Mode Agency Infrastructure</p>
                <div className="text-white text-xs font-bold font-space uppercase italic tracking-widest">Nextoria Alpha Technology Nexus</div>
            </section>
        </AuraLayout>
    );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-emerald-400/20 transition-all group flex flex-col justify-between min-h-[460px] relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity"><Globe size={150} /></div>
            <div className="space-y-10 relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">{icon}</div>
                <h3 className="text-4xl font-bold uppercase italic text-white tracking-tighter font-space leading-tight">{title}</h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">{text}</p>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-[10px] font-black uppercase text-slate-600 tracking-widest group-hover:text-white transition-colors cursor-pointer">
                EKOSİSTEMİ KEŞFET <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
        </div>
    );
}
