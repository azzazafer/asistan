"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-8 right-8 z-[5000] hidden md:flex items-center gap-3 bg-black/40 backdrop-blur-3xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl group cursor-pointer overflow-hidden"
            onClick={() => window.open('https://www.nextoriadigital.com', '_blank')}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-slate-500 tracking-[0.4em] uppercase">POWERED BY</span>
                <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">NEXTORIA <span className="text-[#00F0FF]">DIGITAL</span></span>
            </div>

            <div className="w-8 h-8 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-[#00F0FF]/40 transition-colors">
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
            </div>
        </motion.div>
    );
}
