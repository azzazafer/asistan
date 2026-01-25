"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingUp, Users } from "lucide-react";

const SCARCITY_MESSAGES = [
    { icon: <AlertTriangle className="text-orange-500" />, title: "Canlı Stok Uyarısı", desc: "Dr. Yılmaz / Saç Ekimi: Son 2 Slot Kaldı" },
    { icon: <TrendingUp className="text-[#00F0FF]" />, title: "Kur Artışı Yaklaşıyor", desc: "Fintech Nexus: Sabit Kur Garanti Süresi Doluyor" },
    { icon: <Users className="text-purple-500" />, title: "Operasyonel Yoğunluk", desc: "VIP Acente Masası: 4 Yeni Rezervasyon Onaylandı" }
];

export default function ScarcityToast() {
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Initial delay
        const initialTimer = setTimeout(() => setShow(true), 3000);

        // Cycle messages
        const cycleInterval = setInterval(() => {
            setShow(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % SCARCITY_MESSAGES.length);
                setShow(true);
            }, 500);
        }, 8000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(cycleInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="fixed bottom-10 right-10 z-[2000] max-w-sm"
                >
                    <div className="bg-black/90 backdrop-blur-3xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                            {SCARCITY_MESSAGES[index].icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <strong className="block text-white text-sm font-black uppercase tracking-widest leading-none mb-1">
                                {SCARCITY_MESSAGES[index].title}
                            </strong>
                            <p className="text-slate-400 text-xs font-medium truncate">
                                {SCARCITY_MESSAGES[index].desc}
                            </p>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 7.5, ease: "linear" }}
                        className="absolute bottom-0 left-5 right-5 h-0.5 bg-[#00F0FF]/40 rounded-full"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
