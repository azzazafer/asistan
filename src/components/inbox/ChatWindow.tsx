import React, { useState, useRef, useEffect } from 'react';
import { Lead } from '@/lib/types';
import { Send, Paperclip, MoreVertical, Bot, User, BrainCircuit, Activity, Mic } from 'lucide-react';
import { NeuralPulse } from '@/components/chat/audio-visualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWindowProps {
    lead: Lead | null;
    onSendMessage: (text: string) => void;
    onToggleAI: (paused: boolean) => void;
    isSending: boolean;
    isAiPaused: boolean;
}

export function ChatWindow({ lead, onSendMessage, onToggleAI, isSending, isAiPaused }: ChatWindowProps) {
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [lead?.history]);

    if (!lead) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 text-neutral-300">
                <Activity size={48} className="mb-4 text-neutral-200" />
                <p className="text-xs font-black uppercase tracking-[0.2em]">Select a subject from the neural stream</p>
            </div>
        );
    }

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;
        onSendMessage(inputText);
        setInputText("");
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#f0f2f5] relative overflow-hidden">
            {/* Chat Header */}
            <div className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm relative">
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-black text-black tracking-tight">{lead.name}</h3>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                            {lead.phone} • <span className={isAiPaused ? "text-orange-500" : "text-emerald-500"}>
                                {isAiPaused ? "HUMAN CONTROL" : "AI AUTOPILOT"}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onToggleAI(!isAiPaused)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isAiPaused ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}
                    >
                        {isAiPaused ? <User size={12} /> : <Bot size={12} />}
                        {isAiPaused ? 'Resume AI' : 'Pause AI'}
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundBlendMode: 'multiply' }}>
                {lead.history?.map((msg: any, idx: number) => {
                    const isUser = msg.role === 'user';
                    const isVoice = typeof msg.content === 'string' && msg.content.includes('[Voice Message]');

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${!isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] rounded-2xl p-4 text-sm font-medium shadow-sm relative ${!isUser ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
                                {!isUser && (
                                    <div className="absolute -top-3 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10" title="AI Generated">
                                        <BrainCircuit size={12} className="text-white" />
                                    </div>
                                )}

                                {isVoice ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 opacity-50">
                                            <Mic size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Voice Note Captured</span>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                            <NeuralPulse />
                                        </div>
                                        <p className="text-[10px] opacity-70 italic">"{msg.content.replace('[Voice Message]: ', '')}"</p>
                                    </div>
                                ) : (
                                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                )}

                                <div className={`text-[9px] font-black uppercase tracking-wider mt-2 flex items-center justify-end gap-1 ${!isUser ? 'text-neutral-400' : 'text-neutral-300'}`}>
                                    <span>{new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                {isSending && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end italic text-[10px] text-neutral-400 font-bold uppercase tracking-widest animate-pulse">
                        Aura is thinking...
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-black/5 shrink-0">
                {isAiPaused && (
                    <div className="mb-2 px-4 py-1 bg-orange-50 text-orange-600 text-[9px] font-black uppercase tracking-widest rounded-full w-fit flex items-center gap-2">
                        <Activity size={10} className="animate-pulse" />
                        AI Paused. You are in control.
                    </div>
                )}
                <form onSubmit={handleSend} className="flex items-end gap-2 bg-neutral-50 p-2 rounded-2xl border border-neutral-200 focus-within:border-black/20 focus-within:bg-white transition-all shadow-sm">
                    <button type="button" className="p-3 text-neutral-400 hover:text-black transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 max-h-32 text-sm font-medium placeholder:text-neutral-400"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isSending || !inputText.trim()}
                        className="p-3 bg-black text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p className="text-[8px] font-black text-neutral-300 uppercase tracking-[0.2em]">Secured by Aura Quantum Encryption</p>
                </div>
            </div>
        </div>
    );
}
