"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Activity, Clock, MapPin, Sparkles } from 'lucide-react';

export interface TimelineNode {
    id: string | number;
    title: string;
    date: string;
    status: 'completed' | 'current' | 'pending' | 'ai';
    desc: string;
    location?: string;
    actions?: React.ReactNode;
}

interface TimelineProps {
    nodes: TimelineNode[];
    lang?: string;
}

export function TreatmentTimeline({ nodes, lang = 'en' }: TimelineProps) {
    return (
        <div className="space-y-12">
            {nodes.map((node, i) => (
                <div key={node.id} className="flex gap-8 relative group">
                    {/* Progress Line */}
                    {i !== nodes.length - 1 && (
                        <div className="absolute left-[13px] top-10 bottom-[-50px] w-px bg-neutral-100 group-last:hidden" />
                    )}

                    {/* Status Indicator */}
                    <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center z-10 shrink-0 transition-all duration-500 shadow-sm
                        ${node.status === 'completed'
                                ? 'bg-black text-white'
                                : node.status === 'current'
                                    ? 'bg-indigo-500 text-white shadow-indigo-200 shadow-xl animate-pulse'
                                    : node.status === 'ai'
                                        ? 'bg-purple-500 text-white shadow-purple-200 shadow-lg'
                                        : 'bg-neutral-50 text-neutral-300 border border-neutral-100'
                            }`}
                    >
                        {node.status === 'completed' ? (
                            <CheckCircle2 size={12} />
                        ) : node.status === 'current' ? (
                            <Activity size={12} />
                        ) : node.status === 'ai' ? (
                            <Sparkles size={12} className="animate-spin" />
                        ) : (
                            <Clock size={12} />
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2 flex-1 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">
                                {node.date}
                            </span>
                            {(node.status === 'current' || node.status === 'ai') && (
                                <motion.span
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit ${node.status === 'ai' ? 'text-purple-500 bg-purple-50' : 'text-indigo-500 bg-indigo-50'
                                        }`}
                                >
                                    {node.status === 'ai'
                                        ? (lang === 'tr' ? 'AI Tahmini' : 'AI Predicted')
                                        : (lang === 'tr' ? 'Şimdi' : 'Active Now')}
                                </motion.span>
                            )}
                        </div>

                        <h4 className={`text-sm font-black tracking-tight transition-colors ${node.status === 'pending' ? 'text-neutral-300' : 'text-black'}`}>
                            {node.title}
                        </h4>

                        <p className="text-[10px] font-medium text-neutral-400 leading-relaxed uppercase tracking-tighter max-w-sm">
                            {node.desc}
                        </p>

                        {node.location && (
                            <div className="flex items-center gap-1.5 mt-2 text-neutral-400 group-hover:text-black transition-colors">
                                <MapPin size={10} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">
                                    {node.location}
                                </span>
                            </div>
                        )}

                        {node.actions && (
                            <div className="mt-4">
                                {node.actions}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
