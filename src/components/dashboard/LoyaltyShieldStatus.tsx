"use client";

import React from 'react';
import { ShieldAlert, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoyaltyShieldStatus = ({ active }: { active: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-[2.5rem] border ${active ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-white/50 text-neutral-400 border-neutral-200'} shadow-2xl relative overflow-hidden group`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-all">
                <ShieldCheck size={100} />
            </div>

            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-300'}`}>
                    {active ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                </div>
                <div>
                    <h4 className="text-xl font-black tracking-tighter">Aura Loyalty Shield</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Anti-Leakage Protection</p>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase">Guarantee Status</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black ${active ? 'bg-emerald-400 text-emerald-950' : 'bg-neutral-200 text-neutral-500'}`}>
                        {active ? 'ACTIVE UNTIL BOOKING' : 'PENDING'}
                    </span>
                </div>

                <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: active ? '100%' : '20%' }}
                        className={`h-full ${active ? 'bg-white' : 'bg-neutral-300'}`}
                    />
                </div>

                <p className="text-[11px] leading-tight opacity-80 font-bold">
                    {active
                        ? 'Pacient is currently protected by $1,000 Surgical Insurance. Loyalty tokens accumulating.'
                        : 'Introduce the Aura Shield to prevent clinical leakage.'}
                </p>
            </div>

            {active && (
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                    <HeartPulse size={12} className="text-rose-400" />
                    <span className="text-[9px] font-black uppercase">Direct Bypass Risk: LOW</span>
                </div>
            )}
        </motion.div>
    );
};
