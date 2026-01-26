"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NeuralCore({ className = "" }: { className?: string }) {
    return (
        <div className={`relative w-[300px] h-[300px] flex items-center justify-center ${className}`}>
            {/* Outer Glow Pulses */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 4,
                        delay: i * 1.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[#00F0FF]/20 rounded-full blur-[80px]"
                />
            ))}

            {/* Rotating Brain SVG Container */}
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
                <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full text-[#00F0FF] drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    {/* Neural Paths (Simplified Brain Outline) */}
                    <motion.path
                        d="M100,30 C60,30 30,60 30,100 C30,140 60,170 100,170 C140,170 170,140 170,100 C170,60 140,30 100,30 Z"
                        strokeDasharray="400"
                        initial={{ strokeDashoffset: 400 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    {/* Core Synapse Nodes */}
                    {[...Array(12)].map((_, i) => (
                        <motion.circle
                            key={i}
                            cx={Math.cos((i * Math.PI) / 6) * 50 + 100}
                            cy={Math.sin((i * Math.PI) / 6) * 50 + 100}
                            r="2"
                            fill="#00F0FF"
                            animate={{
                                opacity: [0.2, 1, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                    {/* Center Energy Pulse */}
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="15"
                        fill="url(#pulseGradient)"
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <defs>
                        <radialGradient id="pulseGradient">
                            <stop offset="0%" stopColor="#00F0FF" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Radiating Light Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    animate={{
                        x: [0, Math.cos((i * Math.PI) / 4) * 200],
                        y: [0, Math.sin((i * Math.PI) / 4) * 200],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                    className="absolute w-1 h-1 bg-[#00F0FF] rounded-full shadow-[0_0_10px_#00F0FF]"
                />
            ))}
        </div>
    );
}
