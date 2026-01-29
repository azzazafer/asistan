"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Book, Shield, MessageCircle, Send, Brain, Sparkles } from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [chatInput, setChatInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: 'Merhaba! Ben Aura Support AI. Sistem kurulumu, entegrasyonlar veya operasyonel süreçler hakkında her şeyi sorabilirsiniz.' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const faqs = [
        {
            q: "Her klinik için ayrı yetkilendirme nasıl yapılır?",
            a: "Aura OS 'Multi-Tenant Nexus' mimarisi ile çalışır. Her klinik (Tenant) kendi veri tüneline sahiptir. SaaS paketimiz ile sınırsız alt kullanıcı tanımlayabilir ve RLS (Row Level Security) üzerinden doktor/sekreter yetkilerini yönetebilirsiniz.",
            category: "Genel"
        },
        {
            q: "Sisteme giriş sorunlarını nasıl çözerim?",
            a: "Öncelikle 'SSO' veya 'Direct Login' metodunuzu kontrol edin. Eğer veritabanı bağlantı hatası alıyorsanız, Edge Function servislerimizin durumunu 'Status' sayfasından görebilirsiniz.",
            category: "Teknik"
        },
        {
            q: "AI Nöral Triaj (Nex-Scan) hata payı nedir?",
            a: "Nex-Scan™ V12.0 motoru, 500.000+ vaka verisiyle eğitilmiştir. Teşhis doğruluğu %98.4'tür. Ancak sistem her zaman bir 'Alpha Hekim' onayı talep edecek şekilde konfigüre edilmiştir.",
            category: "Ürün"
        },
        {
            q: "Stripe Bridge ile tahsilat ne kadar sürer?",
            a: "Ödeme onaylandığı anda Aura OS 'Instant-Sync' teknolojisi ile HBYS sisteminizdeki hasta bakiyesini kapatır. Para transferi Stripe sözleşmenize göre T+2 veya T+7 olarak yansır.",
            category: "Finans"
        }
    ];

    const filteredFaqs = faqs.filter(f =>
        f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { role: 'user', content: chatInput };
        setChatHistory(prev => [...prev, userMsg]);
        setChatInput("");
        setIsTyping(true);

        setTimeout(() => {
            const aiMsg = {
                role: 'assistant',
                content: `Anlıyorum. '${userMsg.content}' konusundaki talebiniz nöral ağımıza iletildi. Teknik dökümantasyonumuza göre bu işlem 'Multi-Sync' protokolü ile otonom olarak gerçekleştirilebilir.`
            };
            setChatHistory(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isTyping]);

    return (
        <AuraLayout>
            <div className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-20">

                {/* FAQ Column */}
                <div className="lg:col-span-7 space-y-16">
                    <header className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            KNOWLEDGE BASE • ALPHA SUPPORT
                        </div>
                        <h1 className="text-6xl md:text-[7rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.9]">
                            Aura <br /> <span className="text-[#00F0FF]">Dökümantasyon.</span>
                        </h1>
                        <p className="text-xl text-[#B0B0B0] max-w-xl leading-relaxed">
                            Sistem kullanımı, nöral ağ konfigürasyonu ve finansal entegrasyonlar hakkında merak ettiğiniz her şey burada.
                        </p>
                    </header>

                    {/* Search Area */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#00F0FF] transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Sıkça sorulan sorularda ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-lg placeholder-slate-600 outline-none focus:border-[#00F0FF]/40 focus:bg-white/[0.03] transition-all shadow-2xl"
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? filteredFaqs.map((item, i) => (
                            <div key={i} className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#00F0FF]/20 transition-all group">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full text-left px-10 py-8 flex items-center justify-between font-bold text-xl text-white font-space italic uppercase tracking-tight">
                                    <span className="flex items-center gap-4">
                                        <span className="text-[10px] text-slate-600 group-hover:text-[#00F0FF] transition-colors">{item.category}</span>
                                        {item.q}
                                    </span>
                                    {openIndex === i ? <ChevronUp className="text-[#00F0FF]" /> : <ChevronDown className="text-slate-600 group-hover:text-white" />}
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-10 pb-10 text-[#B0B0B0] leading-relaxed border-t border-white/5 pt-8 text-lg"
                                        >
                                            <div className="max-w-2xl">{item.a}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )) : (
                            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] space-y-4">
                                <Search size={40} className="mx-auto text-slate-700" />
                                <p className="text-slate-500 font-medium">Aradığınız kriterlere uygun sonuç bulunamadı.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Chat Interaction Column */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-32 p-10 bg-white/[0.02] border border-white/10 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] h-[800px] flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                            <Sparkles size={200} className="text-[#00F0FF]" />
                        </div>

                        <div className="mb-10 flex items-center gap-5 border-b border-white/5 pb-8">
                            <div className="w-14 h-14 bg-[#00F0FF]/10 rounded-2xl flex items-center justify-center text-[#00F0FF] border border-[#00F0FF]/20 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                                <Brain size={28} className="animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-white font-black text-sm uppercase tracking-[0.3em]">Aura AI Support</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Neural Sync Active 12ms</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto space-y-8 pr-2 no-scrollbar mb-8">
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] p-6 rounded-3xl text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-[#00F0FF] text-black rounded-tr-none shadow-xl' : 'bg-white/5 text-white rounded-tl-none border border-white/5 backdrop-blur-xl shadow-2xl'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="p-5 bg-white/5 rounded-3xl rounded-tl-none border border-white/5 flex gap-1.5 shadow-2xl">
                                        <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="space-y-4">
                            <form onSubmit={handleChatSubmit} className="relative">
                                <input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Nöral ağa bir soru sorun..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-md outline-none focus:border-[#00F0FF]/40 focus:bg-white/10 transition-all pr-16 shadow-2xl"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00F0FF] p-3 hover:bg-[#00F0FF] hover:text-black rounded-xl transition-all">
                                    <Send size={24} />
                                </button>
                            </form>
                            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] text-center">SURGICAL PRECISION SUPPORT ENGINE v13.0</p>
                        </div>
                    </div>
                </div>

            </div>
        </AuraLayout>
    );
}

