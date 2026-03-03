"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
    id: number;
    sender: 'patient' | 'ai';
    text?: string;
    image?: string;
    time: string;
    isAnalysis?: boolean;
}

const CHAT_FLOW: Omit<Message, 'id' | 'time'>[] = [
    { sender: 'patient', text: 'Guten Tag, was kostet ein Implantat in Ihrer Klinik?' },
    { sender: 'ai', text: 'Guten Tag Hans! 😊 Erfahrene Experten verwenden bei uns nur premium Material (Straumann/Nobel). Möchten Sie, dass ich Ihnen einen individuellen Behandlungsplan erstelle?' },
    { sender: 'patient', text: 'Ja, das klingt gut. Ich lade mein Röntgenbild hoch.' },
    { sender: 'patient', image: '/nex-scan.png' }, // Simulated upload
    { sender: 'ai', text: 'Görsel Analiz Edildi: %78 ihtimalle endodontik sızıntı tespit edildi. Dr. Mehmet verilerinizi incelemek üzere sıraya aldı.', isAnalysis: true },
    { sender: 'patient', text: 'Das ist beeindruckend! Wann kann ich kommen?' },
    { sender: 'ai', text: 'Wir haben nächste Woche Mittwoch um 10:00 Uhr einen Termin frei. Paket wird gesendet... 🚀 Status: Patient überzeugt (Otonom AI).' }
];

export default function AITerminal() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentIndex < CHAT_FLOW.length) {
            const msg = CHAT_FLOW[currentIndex];
            const delay = msg.sender === 'ai' ? 2500 : 1500;

            const timeout = setTimeout(() => {
                if (msg.sender === 'ai') setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, {
                        ...msg,
                        id: Date.now(),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }]);
                    setCurrentIndex(prev => prev + 1);
                }, msg.sender === 'ai' ? 2000 : 800);
            }, delay);

            return () => clearTimeout(timeout);
        } else {
            const reset = setTimeout(() => {
                setMessages([]);
                setCurrentIndex(0);
            }, 10000);
            return () => clearTimeout(reset);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="w-full max-w-md mx-auto bg-[#0b141a] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px] font-sans">
            <div className="bg-[#202c33] p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <span className="text-xl">🤖</span>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white tracking-tight">Aura AI Agent v6.0</div>
                        <div className="text-[10px] text-green-400 font-mono animate-pulse uppercase tracking-widest">● Otonom Karşılama Aktif</div>
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
                {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === 'patient' ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-bottom-2'}`}>
                        <div className={`max-w-[85%] p-3 rounded-[16px] text-[13px] leading-relaxed shadow-sm relative ${m.sender === 'patient' ? 'bg-[#202c33] text-white rounded-tl-none' :
                                m.isAnalysis ? 'bg-blue-900/40 border border-blue-500/30 text-blue-200 rounded-tr-none' : 'bg-[#005c4b] text-white rounded-tr-none'
                            }`}>
                            {m.image && (
                                <div className="mb-2 relative w-full aspect-video rounded-lg overflow-hidden border border-white/20">
                                    <Image src={m.image} alt="Upload" fill className="object-cover" />
                                </div>
                            )}
                            {m.text && <p>{m.text}</p>}
                            <div className="text-[9px] text-white/50 text-right mt-1 font-mono uppercase opacity-50">{m.time}</div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-end">
                        <div className="bg-[#005c4b] p-3 rounded-[16px] rounded-tr-none flex gap-1">
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-[#202c33] p-3 flex gap-2 border-t border-white/5">
                <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-[11px] text-gray-500 italic flex items-center">
                    AI otonom olarak tıbbi verileri işleyip yanıtlıyor...
                </div>
            </div>
        </div>
    );
}
