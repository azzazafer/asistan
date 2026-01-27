"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_DATA = [
    { city: "Londra", name: "Ahmet B.", amount: "€14,250", type: "Kapora Ödedi" },
    { city: "Berlin", name: "Merve K.", amount: "€3,400", type: "Satış Onaylandı" },
    { city: "New York", name: "John D.", amount: "€18,900", type: "Operasyon Rezerve Edildi" },
    { city: "Dubai", name: "Hassan A.", amount: "€25,000", type: "Protokol Başlatıldı" },
    { city: "Paris", name: "Claire R.", amount: "€6,800", type: "Lead Score: %98" },
    { city: "İstanbul", name: "Can Y.", amount: "€12,000", type: "Stripe Köprüsü Kuruldu" }
];

export default function LiveTicker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % MOCK_DATA.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const item = MOCK_DATA[index];

    return (
        <div className="w-full bg-[#0A0A0A]/40 border-y border-white/5 py-4 overflow-x-auto no-scrollbar backdrop-blur-sm relative">
            <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-4 md:gap-10 min-w-max">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]/60 hover:text-[#00F0FF] transition-colors cursor-default">
                        Canlı Global Ciro Akışı
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#E0E0E0] italic"
                    >
                        <span className="text-slate-600 tracking-tighter">—</span>
                        <span className="text-white">{item.city}</span>
                        <span className="text-slate-600">için</span>
                        <span className="text-[#00F0FF]">{item.name}</span>
                        <span className="bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-0.5 rounded border border-[#00F0FF]/20">
                            {item.amount}
                        </span>
                        <span className="text-slate-500">{item.type}</span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
