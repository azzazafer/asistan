"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Check, Brain, Activity } from "lucide-react";
import Link from "next/link";

interface NexScanDemoProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NexScanDemo({ isOpen, onClose }: NexScanDemoProps) {
    const [step, setStep] = useState<'upload' | 'scanning' | 'result'>('upload');
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        setStep('scanning');
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStep('result');
            }
        }, 30);
    };

    const reset = () => {
        onClose();
        setTimeout(() => {
            setStep('upload');
            setProgress(0);
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={reset}
                        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto scrollbar-hide"
                    >
                        <button onClick={reset} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-[10]">
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 space-y-8">
                            {step === 'upload' && (
                                <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-2xl flex items-center justify-center text-[#00F0FF] mx-auto">
                                        <Camera size={28} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-white uppercase italic font-space">Nex-Scan™ Nöral Triaj</h3>
                                        <p className="text-[#B0B0B0] text-sm font-medium">Aura'nın 12ms nöral teşhis motorunu test etmek için bir hasta fotoğrafı yükleyin.</p>
                                    </div>
                                    <div
                                        onClick={startScan}
                                        className="relative border-2 border-dashed border-white/10 rounded-[1.5rem] p-16 hover:border-[#00F0FF]/40 cursor-pointer transition-all group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 text-center">
                                            <Upload className="mx-auto text-slate-700 group-hover:text-[#00F0FF] transition-colors mb-4" size={40} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 font-space block">FOTOĞRAF BIRAKIN VEYA TIKLAYIN</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'scanning' && (
                                <div className="text-center space-y-10 py-6">
                                    <div className="relative w-24 h-24 mx-auto">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-4 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-[#00F0FF]">
                                            <Brain size={32} className="animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-xl font-black text-white italic uppercase tracking-tight font-space text-[12px] tracking-[0.4em]">PİXELLER TARANIYOR... {progress}%</div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                className="h-full bg-[#00F0FF] shadow-[0_0_20px_#00F0FF]"
                                            />
                                        </div>
                                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">Nex-Scan Alpha Engine Aktif</div>
                                    </div>
                                </div>
                            )}

                            {step === 'result' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                                <Check size={20} strokeWidth={3} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white uppercase italic leading-none font-space tracking-tight">ANALİZ TAMAMLANDI</h3>
                                                <p className="text-[#00F0FF] text-[8px] font-black tracking-widest uppercase mt-1">Lead Score: 98/100</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Gecikme</div>
                                            <div className="text-xs font-black text-[#00F0FF]">11.4ms</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 space-y-1">
                                            <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest">TEŞHİS</div>
                                            <div className="text-[10px] font-bold text-white uppercase tracking-tight font-space">Norwood Tip IV</div>
                                        </div>
                                        <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 space-y-1">
                                            <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest">GREFT TAHMİNİ</div>
                                            <div className="text-[10px] font-bold text-white uppercase tracking-tight font-space">3,500 - 4,000 FUE</div>
                                        </div>
                                    </div>

                                    <div className="relative h-20 bg-black/40 rounded-xl border border-white/5 overflow-hidden group">
                                        <div className="absolute inset-x-0 bottom-0 h-full opacity-10 pointer-events-none">
                                            <svg className="w-full h-full" viewBox="0 0 400 100">
                                                <motion.path
                                                    d="M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                                                    fill="transparent"
                                                    stroke="#00F0FF"
                                                    strokeWidth="1"
                                                    animate={{
                                                        d: [
                                                            "M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50",
                                                            "M0 50 Q 50 80, 100 50 T 200 50 T 300 50 T 400 50",
                                                            "M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                                                        ]
                                                    }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                            </svg>
                                        </div>

                                        <div className="relative z-10 h-full flex items-center justify-around px-2">
                                            <div className="text-center">
                                                <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest">UYGUNLUK</div>
                                                <div className="text-xs font-black text-white italic">94.2%</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest">YOĞUNLUK</div>
                                                <div className="text-xs font-black text-white italic">82/cm²</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[6px] font-black text-slate-600 uppercase tracking-widest">GÜVEN</div>
                                                <div className="text-xs font-black text-white italic">0.99</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[#00F0FF]/[0.01] border border-[#00F0FF]/10 rounded-xl space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[7px] font-black text-[#00F0FF] tracking-widest uppercase font-space">Otonom Strateji</h4>
                                            <span className="px-1.5 py-0.5 bg-[#00F0FF]/10 text-[#00F0FF] text-[5px] font-black rounded uppercase border border-[#00F0FF]/10">Reflex v12.0</span>
                                        </div>
                                        <p className="text-[10px] text-[#B0B0B0] leading-relaxed font-medium italic">
                                            "Hasta motive edildi. WhatsApp üzerinden stratejik tetikleme gönderildi."
                                        </p>
                                    </div>

                                    <Link href="/signup" onClick={onClose} className="block w-full">
                                        <button className="w-full py-5 bg-white text-black rounded-xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#00F0FF] transition-all shadow-xl active:scale-[0.98]">
                                            OTURUMU SONLANDIR VE KURULUMA BAŞLA
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
