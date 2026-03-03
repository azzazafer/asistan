"use client";

import React, { useState } from "react";

export default function LiveLogicTerminal() {
    const [leadData, setLeadData] = useState({ name: "", query: "" });
    const [logs, setLogs] = useState<string[]>([]);

    React.useEffect(() => {
        const handleSysLog = (e: Event) => {
            const customEvent = e as CustomEvent;
            setLogs(prev => [...prev, customEvent.detail]);
        };
        window.addEventListener('aura_log', handleSysLog);
        return () => window.removeEventListener('aura_log', handleSysLog);
    }, []);

    const runAnalysis = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadData.query) return;

        setLogs([]);

        try {
            const res = await fetch("/api/qualify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: leadData.query })
            });
            const data = await res.json();
            if (data.logs) {
                setLogs(data.logs);
            } else {
                setLogs(["[ERROR] Backend erişim hatası."]);
            }
        } catch {
            setLogs(["[FATAL] Otonom Engine bağlantısı kurulamadı."]);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl font-mono relative mt-12 z-20">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <div className="text-[10px] text-gray-500 tracking-widest font-bold">LIVE LOGIC TERMINAL (AURA_CORE_SOVEREIGN_NODE)</div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
            </div>

            <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Input Panel */}
                <form onSubmit={runAnalysis} className="space-y-4">
                    <div className="text-[11px] text-gray-400 font-bold mb-2 uppercase tracking-widest">Simüle Edilen Lead Girişi</div>
                    <input
                        type="text"
                        placeholder="Hasta/Müşteri Adı"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none"
                    />
                    <textarea
                        placeholder="Müşteri Mesajı (Örn: Fiyat alabilir miyim acil?)"
                        value={leadData.query}
                        onChange={(e) => setLeadData({ ...leadData, query: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 outline-none h-24 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={!leadData.query}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50"
                    >
                        LEAD İŞLE ⚡
                    </button>
                </form>

                {/* Output Terminal */}
                <div className="bg-[#050505] border border-white/10 rounded-lg p-4 h-[220px] overflow-y-auto text-[10px] space-y-2 shadow-inner font-mono tracking-wider">
                    {logs.length === 0 && <div className="text-gray-600">Sistem hazır... Bekleniyor...</div>}
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-bottom-2">
                            {log.startsWith("INIT") || log.startsWith("DECISION") || log.startsWith("ACTION") || log.startsWith("STATUS") || log.startsWith("SYS_EVENT") ? (
                                <span className={log.includes("HIGH") || log.includes("SYS_EVENT") ? "text-red-400 font-bold" : "text-blue-400 font-bold"}>{log}</span>
                            ) : (
                                <span className="text-green-500">{log}</span>
                            )}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}
