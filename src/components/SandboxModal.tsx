"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import AITerminal from './AITerminal';

interface SandboxModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LOG_ENTRIES = [
    "14:05 - Almanya IP'li hasta WhatsApp'a düştü",
    "14:05 - Aura AI: Dil tespiti yapıldı (Almanca)",
    "14:06 - Nex-Scan v2.1: Röntgen analizi tamamlandı",
    "14:06 - AI: %78 ihtimalle sızıntı tespit edildi",
    "14:07 - Hasta: Randevu onayı verildi",
    "14:07 - Aura OS: CRM kaydı mühürlendi",
];

export default function SandboxModal({ isOpen, onClose }: SandboxModalProps) {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';

    const [simulationStep, setSimulationStep] = useState(0);
    const [leakageValue, setLeakageValue] = useState(0);
    const [activeLogs, setActiveLogs] = useState<string[]>([]);
    const logEndRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setSimulationStep(0);
        setLeakageValue(0);
        setActiveLogs([]);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setSimulationStep(0);
            setLeakageValue(0);
            setActiveLogs([]);

            const timer = setInterval(() => {
                setSimulationStep(prev => prev + 1);
            }, 2000);

            const countUp = setInterval(() => {
                setLeakageValue(prev => {
                    if (prev >= 12500) {
                        clearInterval(countUp);
                        return 12500;
                    }
                    return prev + 125;
                });
            }, 20);

            let logIdx = 0;
            const logTimer = setInterval(() => {
                if (logIdx < LOG_ENTRIES.length) {
                    setActiveLogs(prev => [...prev, LOG_ENTRIES[logIdx]]);
                    logIdx++;
                } else {
                    clearInterval(logTimer);
                }
            }, 3000);

            return () => {
                clearInterval(timer);
                clearInterval(countUp);
                clearInterval(logTimer);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeLogs]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-10 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-[20px] animate-in fade-in duration-500"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-7xl h-full max-h-[90vh] bg-[#050505] rounded-[32px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">

                {/* REFINED X BUTTON POSITION */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-red-600/20 border border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-90 group shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                    <span className="text-2xl font-black transition-transform duration-300 group-hover:rotate-90">✕</span>
                </button>

                {/* Left Side: Experience */}
                <div className="flex-[1.5] p-8 md:p-12 border-r border-white/5 relative overflow-hidden flex flex-col">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                            {isClinic ? '🔬' : '📡'}
                        </div>
                        <div>
                            <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                                {isClinic ? 'Nex-Scan™ Teşhis Mührü' : 'Alpha Command Control'}
                            </h4>
                            <p className="text-[10px] font-mono tracking-[0.4em] text-blue-500 uppercase mt-1">Sovereign Intel Core v6.2 | STEP {simulationStep}</p>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[300px] rounded-[32px] bg-black border border-white/5 relative overflow-hidden group">
                        <Image
                            src={isClinic ? '/nex-scan.png' : '/alpha-command.png'}
                            alt="Simulation"
                            fill
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-10 right-10 w-72 p-8 rounded-[32px] bg-black/80 border border-white/10 backdrop-blur-xl">
                            <div className="text-[10px] font-mono font-black text-blue-500 tracking-[0.2em] mb-4 uppercase">Sızıntı Tespiti</div>
                            <div className="text-5xl font-black font-mono tracking-tighter text-white mb-2">₺{leakageValue.toLocaleString()}</div>
                            <div className="h-px bg-white/5 my-4" />
                            <p className="text-[11px] text-gray-500 italic leading-relaxed">Otonom tarama sızıntıyı mühürledi.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Chat Terminal */}
                <div className="flex-1 bg-black/50 p-8 md:p-12 flex flex-col border-t lg:border-t-0 lg:border-l border-white/5 relative">
                    <div className="mb-10 text-center lg:text-left">
                        <h5 className="text-white text-xl font-bold mb-2">Otonom İkna Terminali</h5>
                        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">Otonom AI vs İnsan Faktörü</p>
                    </div>

                    <div className="flex-1 mb-10 overflow-hidden rounded-2xl">
                        <AITerminal />
                    </div>

                    <button
                        onClick={handleClose}
                        className="btn-sovereign w-full py-5 text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:shadow-blue-500/40 relative z-10"
                    >
                        SIMÜLASYONU KAPAT ⚡
                    </button>
                </div>
            </div>
        </div>
    );
}
