"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Check, Brain } from "lucide-react";

export default function NexScanDemo() {
    const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
        setTimeout(() => {
            setStep('upload');
            setProgress(0);
        }, 500);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-6 px-8 py-3 bg-white/5 border border-[#00F0FF]/30 text-[#00F0FF] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00F0FF] hover:text-black transition-all"
            >
                Launch Nex-Scan™ Demo
            </button>

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
                            className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                        >
                            <button onClick={reset} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                                <X size={24} />
                            </button>

                            <div className="p-12 space-y-10">
                                {step === 'upload' && (
                                    <div className="text-center space-y-8">
                                        <div className="w-20 h-20 bg-[#00F0FF]/10 rounded-3xl flex items-center justify-center text-[#00F0FF] mx-auto">
                                            <Camera size={32} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-white uppercase italic">Nex-Scan™ Neural Triage</h3>
                                            <p className="text-slate-500 font-medium">Upload a patient photo to test Aura's 12ms neural diagnosis engine.</p>
                                        </div>
                                        <div
                                            onClick={startScan}
                                            className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 hover:border-[#00F0FF]/40 cursor-pointer transition-all group"
                                        >
                                            <Upload className="mx-auto text-slate-700 group-hover:text-[#00F0FF] transition-colors mb-4" size={40} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Drop Medical Photo or Click</span>
                                        </div>
                                    </div>
                                )}

                                {step === 'scanning' && (
                                    <div className="text-center space-y-12 py-10">
                                        <div className="relative w-32 h-32 mx-auto">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-4 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center text-[#00F0FF]">
                                                <Brain size={40} className="animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-2xl font-black text-white italic uppercase">Scanning Pixels... {progress}%</div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    className="h-full bg-[#00F0FF] shadow-[0_0_20px_#00F0FF]"
                                                />
                                            </div>
                                            <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Nex-Scan Alpha Engine Active</div>
                                        </div>
                                    </div>
                                )}
                                {step === 'result' && (
                                    <div className="space-y-6">
                                        {/* Header Area */}
                                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                                    <Check size={24} strokeWidth={3} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-white uppercase italic">Analysis Complete</h3>
                                                    <p className="text-[#00F0FF] text-[9px] font-black tracking-widest uppercase">Lead Score: 98/100</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Latency</div>
                                                <div className="text-sm font-black text-[#00F0FF]">11.4ms</div>
                                            </div>
                                        </div>

                                        {/* Clinical Intelligence Layer (Medu style) */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 space-y-2">
                                                <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Preliminary Diagnosis</div>
                                                <div className="text-xs font-bold text-white uppercase tracking-tight">Norwood Type IV</div>
                                            </div>
                                            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 space-y-2">
                                                <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Surgical Requirement</div>
                                                <div className="text-xs font-bold text-white uppercase tracking-tight">3,500 - 4,000 FUE</div>
                                            </div>
                                        </div>

                                        {/* Pulse Visualization - Made subtle and non-blocking */}
                                        <div className="relative h-24 bg-black/40 rounded-2xl border border-white/5 overflow-hidden group">
                                            <div className="absolute inset-x-0 bottom-0 h-full opacity-20 pointer-events-none">
                                                <svg className="w-full h-full" viewBox="0 0 400 100">
                                                    <motion.path
                                                        d="M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                                                        fill="transparent"
                                                        stroke="#00F0FF"
                                                        strokeWidth="1.5"
                                                        animate={{
                                                            d: [
                                                                "M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50",
                                                                "M0 50 Q 50 80, 100 50 T 200 50 T 300 50 T 400 50",
                                                                "M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                                                            ]
                                                        }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    />
                                                </svg>
                                            </div>

                                            <div className="relative z-10 h-full flex items-center justify-around px-2">
                                                <div className="text-center">
                                                    <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Viability</div>
                                                    <div className="text-sm font-black text-white italic">94.2%</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Density</div>
                                                    <div className="text-sm font-black text-white italic">82/cm²</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Confidence</div>
                                                    <div className="text-sm font-black text-white italic">0.99</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendation */}
                                        <div className="p-6 bg-[#00F0FF]/[0.02] border border-[#00F0FF]/10 rounded-2xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-[8px] font-black text-[#00F0FF] tracking-[0.2em] uppercase">Autonomous Strategy</h4>
                                                <span className="px-1.5 py-0.5 bg-[#00F0FF]/20 text-[#00F0FF] text-[6px] font-black rounded uppercase border border-[#00F0FF]/20">Auto-Closer Active</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                                "Patient is highly motivated. Strategic nudge sent to WhatsApp regarding 48h limit."
                                            </p>
                                        </div>

                                        <button onClick={reset} className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#00F0FF] transition-all shadow-lg active:scale-[0.98]">
                                            Close Session
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
