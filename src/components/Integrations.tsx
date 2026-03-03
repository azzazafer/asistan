"use client";

import React from 'react';

const INTEGRATIONS = [
    { name: 'BulutKlinik', logo: '☁️', color: '#10b981' },
    { name: 'Logo Zirve', logo: '📐', color: '#ef4444' },
    { name: 'HBYS SİSTEM', logo: '🏥', color: '#3b82f6' },
    { name: 'e-Nabız', logo: '❤️', color: '#f43f5e' }
];

export default function Integrations() {
    return (
        <section className="py-32 px-6 bg-[#030303] relative overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto relative z-10 text-center">

                {/* Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase mb-8">
                        Trojan Horse Protocol — Bridge Active
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 uppercase leading-tight">
                        Mevcut Sisteminizi <span className="text-gray-600">Çöpe Atmayın.</span> <br />
                        Üstüne <span className="text-blue-500">Zeka</span> İnşa Edin.
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-sm md:text-lg font-medium leading-relaxed">
                        Aura OS, mevcut hantal CRM ve HBYS sistemlerinize otonom bir katman (layer) olarak eklenir.
                        Verileriniz akmaya devam ederken, Aura o veriyi işler ve ciroya dönüştürür.
                    </p>
                </div>

                {/* Integration Pipe Visualization */}
                <div className="relative h-[400px] flex items-center justify-center gap-12 lg:gap-24 overflow-visible">

                    {/* Central Aura Core */}
                    <div className="relative z-20 w-32 h-32 md:w-48 md:h-48 rounded-[48px] bg-black border-2 border-blue-500/30 flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.2)] animate-pulse">
                        <div className="absolute inset-2 md:inset-4 rounded-[32px] bg-gradient-to-br from-blue-600 to-purple-600 opacity-20" />
                        <div className="text-4xl md:text-6xl group-hover:scale-110 transition-transform">🤖</div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-black font-mono text-blue-500 tracking-[0.5em] uppercase whitespace-nowrap">Aura OS Core</div>
                    </div>

                    {/* Left Side Systems */}
                    <div className="flex flex-col gap-12 relative z-20">
                        {INTEGRATIONS.slice(0, 2).map((sys) => (
                            <div key={sys.name} className="relative group">
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl md:text-4xl shadow-2xl backdrop-blur-xl group-hover:border-white/20 transition-all">
                                    {sys.logo}
                                </div>
                                {/* Data Pipe Line Left */}
                                <div className="absolute left-full top-1/2 w-12 md:w-24 h-0.5 bg-white/5 overflow-hidden -translate-y-1/2">
                                    <div className="h-full w-4 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-dataFlow" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Systems */}
                    <div className="flex flex-col gap-12 relative z-20">
                        {INTEGRATIONS.slice(2).map((sys) => (
                            <div key={sys.name} className="relative group">
                                {/* Data Pipe Line Right */}
                                <div className="absolute right-full top-1/2 w-12 md:w-24 h-0.5 bg-white/5 overflow-hidden -translate-y-1/2">
                                    <div className="h-full w-4 bg-fuchsia-500 shadow-[0_0_10px_#ff0aff] animate-dataFlowReverse" />
                                </div>
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-3xl md:text-4xl shadow-2xl backdrop-blur-xl group-hover:border-white/20 transition-all">
                                    {sys.logo}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Background Glows */}
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none opacity-20" />
                </div>

                {/* Integration Footer */}
                <div className="mt-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-[10px] font-mono text-blue-400 mb-2 uppercase tracking-widest">Protocol</div>
                            <div className="text-white font-black text-sm uppercase">Webhook / API</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-[10px] font-mono text-blue-400 mb-2 uppercase tracking-widest">Security</div>
                            <div className="text-white font-black text-sm uppercase">AES-256 Gömülü</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-[10px] font-mono text-blue-400 mb-2 uppercase tracking-widest">Latency</div>
                            <div className="text-white font-black text-sm uppercase">&lt; 100ms Otonom</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-[10px] font-mono text-blue-400 mb-2 uppercase tracking-widest">Status</div>
                            <div className="text-green-500 font-black text-sm uppercase tracking-widest animate-pulse">Bridge Online</div>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
        @keyframes dataFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
        @keyframes dataFlowReverse {
          0% { transform: translateX(600%); }
          100% { transform: translateX(-100%); }
        }
        .animate-dataFlow {
          animation: dataFlow 2s linear infinite;
        }
        .animate-dataFlowReverse {
          animation: dataFlowReverse 2s linear infinite;
        }
      `}</style>
        </section>
    );
}
