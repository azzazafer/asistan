"use client";

import React, { useState, useEffect } from 'react';

export default function CommandInput() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [kbText, setKbText] = useState("");

    useEffect(() => {
        // Preload knowledge-base.txt to bring search latency to 0ms
        fetch('/knowledge-base.txt')
            .then(res => res.text())
            .then(text => setKbText(text))
            .catch(err => console.error("KB preload failed", err));
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        setIsProcessing(true);
        setResponse(null);

        // Fetch knowledge base (A2A Manifesto Knowledge Map) (Preloaded)
        try {
            if (!kbText) throw new Error("KB_NOT_LOADED");
            const text = kbText;

            let matched = "Anlaşılamadı. Lütfen teknik bir sorgu girin (Örnek: whatsapp, lead, sistem).";
            const lowerInput = input.toLowerCase();
            const keywords = lowerInput.split(/[\s,]+/);

            // Niyet Odaklı Özel Eşleşmeler
            if (lowerInput.includes("neredesin") || lowerInput.includes("nerde")) {
                matched = "LOKASYON: Hostinger Hangarında. Local Node via Apache mod_rewrite.";
            } else if (lowerInput.includes("güvenlik") || lowerInput.includes("security")) {
                matched = "GÜVENLİK: JWE-RS256 Payload Encryption aktif. Zero-knowledge data persistence mapping.";
            } else if (lowerInput.includes("fiyat") || lowerInput.includes("maliyet") || lowerInput.includes("öğren")) {
                matched = "Fiyatlandırma sistemi: Starter, Pro ve Sovereign. Kesin fiyatlandırma için Lead Qualify node'undan geçmeniz gerekiyor.";
            } else {
                // Semantic Scoring Algorithm (Otonom Analiz)
                const lines = text.split('\n');
                let bestScore = 0;
                let bestMatch = matched;

                for (const line of lines) {
                    if (line.trim().length < 10) continue;
                    const lowerLine = line.toLowerCase();
                    let currentScore = 0;

                    for (const kw of keywords) {
                        if (kw.length > 2 && lowerLine.includes(kw)) {
                            currentScore += kw.length; // Kelime uzunluğuna oranla ağırlık
                        }
                    }

                    if (currentScore > bestScore) {
                        bestScore = currentScore;
                        bestMatch = "SEMANTİK_BLOK_BULUNDU: " + line.trim();
                    }
                }

                if (bestScore > 0) {
                    matched = bestMatch;
                }
            }

            // Aksiyonu Log Terminaline Fırlat
            window.dispatchEvent(new CustomEvent('aura_log', { detail: `KMD_CMD: Executed [${input}] -> Score Matching Active` }));

            // Zero-Pretense: Anlık Akış (Gecikme İptal Edildi)
            setResponse(matched);
            setIsProcessing(false);

        } catch {
            setResponse("Knowledge-base hazır değil. Lütfen bir saniye sonra tekrar deneyin.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-12 font-mono relative z-20">
            <div className="text-[10px] text-gray-500 font-bold mb-2 tracking-[0.2em] uppercase">ZERO-CLICK COMMAND BAR</div>
            <form onSubmit={handleCommand} className="relative flex items-center">
                <span className="absolute left-4 text-green-500 font-black tracking-tighter shadow-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">{'>'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Sisteme komut ver... (Örn: 'Bana WhatsApp botu lazım' veya 'Sistem altyapısı nedir?')"
                    className="w-full bg-[#050505] border border-white/20 text-white rounded-xl py-4 pl-10 pr-24 focus:outline-none focus:border-green-500 transition-colors shadow-[0_0_15px_rgba(0,255,136,0.1)] focus:shadow-[0_0_20px_rgba(0,255,136,0.2)] text-xs font-bold"
                />
                <button type="submit" disabled={!input} className="absolute right-4 text-[10px] font-black tracking-widest text-gray-500 hover:text-green-400 transition-colors disabled:opacity-50">
                    ÇALIŞTIR
                </button>
            </form>

            {response && (
                <div className="mt-4 p-5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 leading-relaxed shadow-xl animate-in fade-in slide-in-from-top-2 backdrop-blur-md">
                    <div className="text-green-500 font-black mb-2 tracking-widest text-[9px] uppercase">AURA_OS_RESPONSE:</div>
                    <div className="font-mono">{response}</div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                        <a href="https://wa.me/905510596718" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-white bg-green-600 px-3 py-1.5 rounded hover:bg-green-500 transition-colors">YÖNETİCİYE BAĞLAN ⚡</a>
                    </div>
                </div>
            )}
        </div>
    );
}
