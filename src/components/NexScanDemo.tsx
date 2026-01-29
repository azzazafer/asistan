"use client";

import React, { useState, useRef } from "react";
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
    const [analysis, setAnalysis] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const patterns = [
        { diag: "Norwood Tip IV", greft: "3,500 - 4,000 FUE", advice: "Başarı oranı %94. Safir uç önerilir.", score: 98 },
        { diag: "Gingival Resesyon", greft: "Zirkonyum Tam Rest.", advice: "DSD protokolü ile 24 saatte gülüş tasarımı.", score: 96 },
        { diag: "Maksiller Deviasyon", greft: "İmplant + Kuron", advice: "Sinus lifting gerekebilir. Alpha hekim onayı şart.", score: 92 }
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            startScan();
        }
    };

    const startScan = () => {
        setStep('scanning');
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setAnalysis(patterns[Math.floor(Math.random() * patterns.length)]);
                setStep('result');
            }
        }, 30);
    };

    const reset = () => {
        onClose();
        setTimeout(() => {
            setStep('upload');
            setProgress(0);
            setPreviewUrl(null);
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
                        <button onClick={reset} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-[20]">
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 space-y-8">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

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
                                        onClick={() => fileInputRef.current?.click()}
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
                                    <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border border-[#00F0FF]/20 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                                        {previewUrl && (
                                            <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Brain size={32} className="text-[#00F0FF] animate-pulse" />
                                        </div>
                                        <motion.div
                                            animate={{ y: ["-100%", "100%"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-0 left-0 w-full h-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-white italic uppercase tracking-tight font-space text-[12px] tracking-[0.4em]">PİXELLER TARANIYOR... {progress}%</div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                className="h-full bg-[#00F0FF] shadow-[0_0_20px_#00F0FF]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'result' && (
                                <div className="space-y-6">
                                    {/* Analysis Result Header */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-white/5 pb-6">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#00F0FF]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)] flex-shrink-0">
                                            {previewUrl && (
                                                <img src={previewUrl} alt="Analysis Target" className="w-full h-full object-cover" />
                                            )}
                                            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                                <Check size={20} className="text-emerald-500" strokeWidth={4} />
                                            </div>
                                        </div>
                                        <div className="text-center sm:text-left space-y-2">
                                            <h3 className="text-2xl font-black text-white uppercase italic font-space tracking-tight leading-none">ANALİZ TAMAMLANDI</h3>
                                            <div className="flex items-center justify-center sm:justify-start gap-3">
                                                <span className="px-2 py-1 bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] font-black rounded uppercase tracking-widest border border-[#00F0FF]/20">
                                                    Lead Score: {analysis?.score}/100
                                                </span>
                                                <span className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Latency: 11.4ms</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Diagnosis Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1">
                                            <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest">TEŞHİS</div>
                                            <div className="text-md font-bold text-white uppercase tracking-tight font-space">{analysis?.diag}</div>
                                        </div>
                                        <div className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl space-y-1">
                                            <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest">ÖNERİ</div>
                                            <div className="text-md font-bold text-white uppercase tracking-tight font-space">{analysis?.greft}</div>
                                        </div>
                                    </div>

                                    {/* Technical Waveform */}
                                    <div className="relative p-6 bg-black/60 rounded-2xl border border-white/5 overflow-hidden min-h-[80px] flex flex-col justify-center">
                                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                                            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                                <motion.path
                                                    d="M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50"
                                                    fill="transparent"
                                                    stroke="#00F0FF"
                                                    strokeWidth="2"
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
                                        <div className="relative z-10 flex items-center justify-around">
                                            <StatMini label="UYGUNLUK" value="94.2%" />
                                            <StatMini label="YOĞUNLUK" value="82/cm²" />
                                            <StatMini label="GÜVEN" value="0.99" />
                                        </div>
                                    </div>

                                    {/* AI Strategy Box */}
                                    <div className="p-6 bg-[#00F0FF]/[0.03] border border-[#00F0FF]/20 rounded-2xl space-y-3 relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Brain size={40} className="text-[#00F0FF]" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
                                            <h4 className="text-[9px] font-black text-[#00F0FF] tracking-widest uppercase font-space">Otonom Strateji Reflex v12.0</h4>
                                        </div>
                                        <p className="text-sm text-[#B0B0B0] leading-relaxed font-medium italic">
                                            "{analysis?.advice}"
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <Link href="/signup" onClick={onClose} className="block w-full pt-2">
                                        <button className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[12px] tracking-[0.4em] hover:bg-[#00F0FF] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95 group overflow-hidden relative">
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#00F0FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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

function StatMini({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-center">
            <div className="text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">{label}</div>
            <div className="text-sm font-black text-white italic font-space">{value}</div>
        </div>
    );
}
