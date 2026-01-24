"use client";

import React, { useEffect, useState } from 'react';
import { Database, ShieldCheck, Activity, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export interface HBYSStatus {
    type: 'fonet' | 'tiga' | 'native';
    status: 'connected' | 'syncing' | 'error';
    lastSync: string;
}

export const HBYSStatusIndicator = ({ tenantId }: { tenantId: string }) => {
    const [config, setConfig] = useState<HBYSStatus>({
        type: 'native',
        status: 'syncing',
        lastSync: new Date().toLocaleTimeString()
    });

    useEffect(() => {
        // Simulation: In production this would fetch from /api/hospital/config
        const timer = setTimeout(() => {
            setConfig({
                type: 'fonet', // Simulated default for demo
                status: 'connected',
                lastSync: new Date().toLocaleTimeString()
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [tenantId]);

    const getIcon = () => {
        switch (config.status) {
            case 'connected': return <ShieldCheck className="text-emerald-400" size={14} />;
            case 'syncing': return <Activity className="text-amber-400 animate-pulse" size={14} />;
            case 'error': return <Wifi className="text-rose-400" size={14} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Database size={16} className="text-indigo-400" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest leading-none mb-1">HBYS MATRIX</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-black text-white capitalize">{config.type}</span>
                        {getIcon()}
                    </div>
                </div>
            </div>

            <div className="h-8 w-px bg-white/10 mx-2" />

            <div className="hidden md:block">
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">LATENCY</p>
                <p className="text-[11px] font-black text-emerald-400">12ms</p>
            </div>

            <div className="hidden lg:block ml-4">
                <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">SECURE TUNNEL</p>
                <p className="text-[11px] font-black text-white opacity-40 uppercase">AES-256</p>
            </div>
        </motion.div>
    );
};
