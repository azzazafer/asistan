import React, { useState, useEffect } from 'react';
import { X, Volume2, CloudRain, Coffee, Waves, Wind, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ZenControlsProps {
    isOpen: boolean;
    onClose: () => void;
    audioRef: any; // Relaxed type to bypass RefObject mismatch
    isPlaying: boolean;
    onTogglePlay: () => void;
}

const TRACKS = [
    { name: "Deep Ocean", icon: <Waves size={20} />, src: "https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg" },
    { name: "Rainy Clinic", icon: <CloudRain size={20} />, src: "https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg" },
    { name: "Cafe Ambience", icon: <Coffee size={20} />, src: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg" }
];

export function ZenControls({ isOpen, onClose, audioRef, isPlaying, onTogglePlay }: ZenControlsProps) {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [breathingStep, setBreathingStep] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

    // Audio Control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (audioRef.current.src !== TRACKS[currentTrack].src) {
                const wasPlaying = !audioRef.current.paused;
                audioRef.current.src = TRACKS[currentTrack].src;
                if (wasPlaying || isPlaying) audioRef.current.play();
            }
        }
    }, [currentTrack, volume, isPlaying]);

    // Breathing Logic (4-7-8 Technique)
    useEffect(() => {
        if (!isOpen) return;

        const inhale = setTimeout(() => setBreathingStep('Hold'), 4000); // Inhale 4s
        const hold = setTimeout(() => setBreathingStep('Exhale'), 11000); // Hold 7s (4+7)
        const exhale = setTimeout(() => setBreathingStep('Inhale'), 19000); // Exhale 8s (11+8)

        // Loop every 19s
        const loop = setInterval(() => {
            setBreathingStep('Inhale');
            setTimeout(() => setBreathingStep('Hold'), 4000);
            setTimeout(() => setBreathingStep('Exhale'), 11000);
        }, 19000);

        return () => {
            clearTimeout(inhale);
            clearTimeout(hold);
            clearTimeout(exhale);
            clearInterval(loop);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-4-0rem p-12 relative overflow-hidden text-white shadow-2xl"
                >
                    <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                        <X size={32} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        {/* Visualizer */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: breathingStep === 'Inhale' ? 1.5 : (breathingStep === 'Hold' ? 1.5 : 1),
                                    opacity: breathingStep === 'Inhale' ? 0.8 : (breathingStep === 'Hold' ? 0.8 : 0.3)
                                }}
                                transition={{ duration: breathingStep === 'Inhale' ? 4 : (breathingStep === 'Exhale' ? 8 : 0) }}
                                className="absolute inset-0 bg-indigo-500 rounded-full blur-[80px]"
                            />
                            <div className="relative z-10 text-center">
                                <Wind size={48} className="mx-auto mb-4 opacity-80" />
                                <h3 className="text-2xl font-black tracking-tighter">{breathingStep}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">4-7-8 Technique</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex-1 w-full space-y-10">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter mb-2">Zen <span className="text-indigo-400">Atmosphere</span></h2>
                                <p className="text-sm font-medium opacity-60">Select your focus environment.</p>
                            </div>

                            <div className="space-y-4">
                                {TRACKS.map((track, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentTrack(idx)}
                                        className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${currentTrack === idx ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/20'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {track.icon}
                                            <span className="font-bold tracking-tight">{track.name}</span>
                                        </div>
                                        {currentTrack === idx && isPlaying && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                                <button onClick={onTogglePlay} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all">
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                                </button>
                                <Volume2 size={20} className="text-white/50" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="flex-1 accent-white h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
