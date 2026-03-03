"use client";

import React from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SovereignFunnel() {
    const { userRole, setDemoOpen } = useUser();
    const { t } = useLanguage();
    const isClinic = userRole === 'clinic';

    // Add images and icons manually since they are not translatable text
    const icons = {
        clinic: ['💬', '🔬', '⏳', '🌙', '🔄', '💎'],
        agency: ['📡', '🌍', '🔐', '📊', '⚡', '⚙️']
    };

    const images = {
        clinic: ['/ai-terminal.png', '/nex-scan.png', '/alpha-command.png', '/ai-terminal.png', '/alpha-command.png', '/nex-scan.png'],
        agency: ['/alpha-command.png', '/ai-terminal.png', '/nex-scan.png', '/alpha-command.png', '/ai-terminal.png', '/nex-scan.png']
    };

    const translatedCards = isClinic ? t('funnel.cards_clinic') : t('funnel.cards_agency');

    const cards = (translatedCards || []).map((card: { title: string; subtitle: string; solution: string; metric: string }, idx: number) => ({
        ...card,
        icon: isClinic ? icons.clinic[idx] : icons.agency[idx],
        image: isClinic ? images.clinic[idx] : images.agency[idx]
    }));

    return (
        <section id="sovereign-funnel" className="py-24 md:py-32 px-4 md:px-6 bg-[#020202] relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-4 md:mb-6 uppercase">
                        {isClinic ? t('funnel.title_clinic') : t('funnel.title_agency')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {cards.map((card: { title: string; subtitle: string; solution: string; metric: string; icon: string; image: string }, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => setDemoOpen(true)}
                            className="group relative rounded-[40px] bg-white/[0.02] border border-white/5 overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-700 cursor-pointer z-10"
                        >
                            <div className="relative h-64 w-full overflow-hidden pointer-events-none">
                                <Image src={card.image} alt={card.title} fill className="object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent z-10" />
                                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-xl z-20">{card.icon}</div>
                                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black font-mono text-blue-500 tracking-widest uppercase z-20">{card.metric}</div>
                            </div>

                            <div className="p-8 pt-6 relative z-20">
                                <div className="text-[9px] font-mono font-black tracking-[0.2em] text-blue-500 uppercase mb-3">Protocol: {card.solution}</div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase leading-tight min-h-[56px]">{card.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed min-h-[40px] mb-8 font-medium">{card.subtitle}</p>
                                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.3em] text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 uppercase">
                                    {t('funnel.cta')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
