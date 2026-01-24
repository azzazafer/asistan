"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
    isAnalyzing: boolean;
    color?: string;
}

export function AudioVisualizer({ isAnalyzing, color = "#4f46e5" }: AudioVisualizerProps) {
    const bars = Array.from({ length: 20 });

    return (
        <div className="flex items-center gap-[3px] h-8 px-4">
            {bars.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 4 }}
                    animate={isAnalyzing ? {
                        height: [4, Math.random() * 24 + 4, 4],
                    } : { height: 4 }}
                    transition={isAnalyzing ? {
                        duration: 0.5 + Math.random(),
                        repeat: Infinity,
                        ease: "easeInOut",
                    } : { duration: 0.2 }}
                    style={{
                        backgroundColor: color,
                        width: '3px',
                        borderRadius: '10px',
                        opacity: isAnalyzing ? 1 - (i * 0.02) : 0.3
                    }}
                />
            ))}
        </div>
    );
}

/**
 * AURA "NEURAL PULSE" COMPONENT
 * =============================
 * Used in chat/system logs when processing voice notes.
 */
export function NeuralPulse() {
    return (
        <div className="flex items-center gap-4 bg-black/5 p-4 rounded-2xl border border-black/5">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shrink-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M17 5v14M7 5v14M2 10v4M22 10v4" />
                    </svg>
                </motion.div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Neural Voice Analysis</span>
                    <span className="text-[10px] font-bold text-indigo-600 animate-pulse">Processing...</span>
                </div>
                <AudioVisualizer isAnalyzing={true} />
            </div>
        </div>
    );
}
