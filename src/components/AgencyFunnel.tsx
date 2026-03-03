"use client";

import { useState } from "react";

export default function AgencyFunnel() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="agency-funnel" className="py-24 px-6 relative overflow-hidden bg-[#050505]">
            {/* Background Liquid Gradient */}
            <div
                className="absolute inset-x-0 top-0 h-px transition-opacity duration-1000"
                style={{
                    background: "linear-gradient(90deg, transparent, #3b82f6, #ff00ff, transparent)",
                    opacity: isExpanded ? 1 : 0.3
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[10px] font-mono tracking-widest bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-500 shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#ff00ff] animate-pulse" />
                        ACENTE KARARGAHI — AGENCY HQ
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        Kliniklerin Beceriksizliği Yüzünden <br />
                        <span className="liquid-text">Yanan Lead&apos;lerinize</span> Son.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-mono leading-relaxed">
                        Reklam bütçenizi kliniğin insafına bırakmayın. Aura OS, gönderdiğiniz hastayı otonom takip eder,
                        kliniğin kapatamadığı satışı otonom zekasıyla bağlar. Sizin lead&apos;iniz, sizin egemenliğiniz.
                    </p>
                </div>

                {/* Funnel Trigger Card */}
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`relative cursor-pointer transition-all duration-700 p-1 rounded-[32px] overflow-hidden group ${isExpanded ? "scale-100" : "hover:scale-[1.02] shadow-2xl"}`}
                >
                    {/* Liquid Border Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-fuchsia-600 to-blue-600 bg-[length:200%_auto] animate-liquidFlow opacity-40" />

                    <div className="relative bg-black rounded-[31px] p-8 md:p-12 border border-white/5">
                        {!isExpanded ? (
                            <div className="flex flex-col items-center py-12 text-center">
                                <div className="text-4xl mb-6">🏜️</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Acente Hunisini Simüle Et</h3>
                                <p className="text-gray-500 text-sm max-w-md mb-8">
                                    Aura&apos;nın otonom takip zekasının lead&apos;lerinizi nasıl paraya dönüştürdüğünü saniyeler içinde izleyin.
                                </p>
                                <div className="px-8 py-3 rounded-full bg-blue-600/10 border border-blue-600/30 text-blue-400 font-bold text-sm hover:bg-blue-600/20 transition-all uppercase tracking-widest">
                                    Huniyi Aç ve İzle ▶
                                </div>
                            </div>
                        ) : (
                            <div className="animate-funnelAppear">
                                {/* Visual Funnel UI */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-between mb-16 relative">

                                    {/* Step 1: Lead Girişi */}
                                    <div className="sigma-panel p-6 text-center relative z-10 border-blue-500/30 bg-blue-500/5">
                                        <div className="text-3xl mb-4">📢</div>
                                        <div className="text-xs font-mono text-blue-400 mb-1">AD BÜTÇESİ</div>
                                        <div className="text-xl font-bold text-white tracking-widest">LEAD GİRİŞİ</div>
                                        <div className="mt-4 text-[10px] text-gray-500">Facebook/Google/TikTok</div>
                                    </div>

                                    {/* Liquid Connection 1 */}
                                    <div className="hidden md:flex justify-center flex-1">
                                        <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-fuchsia-500 animate-pulse" />
                                    </div>
                                    <div className="md:hidden flex justify-center -my-4">
                                        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-fuchsia-500 animate-pulse" />
                                    </div>

                                    {/* Step 2: Aura Otonom Takip */}
                                    <div className="sigma-panel p-8 text-center relative z-10 border-fuchsia-500 shadow-[0_0_30px_rgba(255,0,255,0.1)] bg-fuchsia-500/10">
                                        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-40 h-40 bg-fuchsia-600/10 blur-[60px] pointer-events-none" />
                                        <div className="text-4xl mb-4 animate-bounce">🤖</div>
                                        <div className="text-xs font-mono text-fuchsia-400 mb-1">SOVEREIGN AI</div>
                                        <div className="text-2xl font-black text-white tracking-widest">AURA TAKİP</div>
                                        <div className="mt-4 text-[11px] text-gray-300 font-mono">
                                            7/24 Kendi Dilinde Yanıt <br />
                                            Nex-Scan Teşhis <br />
                                            Kapanmayan Satışı Bağlar
                                        </div>
                                    </div>

                                    {/* Liquid Connection 2 */}
                                    <div className="hidden md:flex justify-center flex-1">
                                        <div className="w-16 h-px bg-gradient-to-r from-fuchsia-500 to-green-500 animate-pulse" />
                                    </div>
                                    <div className="md:hidden flex justify-center -my-4">
                                        <div className="w-px h-12 bg-gradient-to-b from-fuchsia-500 to-green-500 animate-pulse" />
                                    </div>

                                    {/* Step 3: Garantili Komisyon */}
                                    <div className="sigma-panel p-6 text-center relative z-10 border-green-500/30 bg-green-500/5">
                                        <div className="text-3xl mb-4">💰</div>
                                        <div className="text-xs font-mono text-green-400 mb-1">EGEMENLİK</div>
                                        <div className="text-xl font-bold text-white tracking-widest">KOMİSYON</div>
                                        <div className="mt-4 text-[10px] text-gray-500">Mühürlenmiş Satışlar</div>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button className="btn-sovereign px-12 py-4 text-sm group">
                                        Acente Sızıntı Raporunuzu Alın <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                                    </button>
                                    <p className="mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em]">
                                        Sizin lead&apos;iniz, sizin bütçeniz, Aura&apos;nın garantisi
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes funnelAppear {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-funnelAppear {
          animation: funnelAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
        </section>
    );
}
