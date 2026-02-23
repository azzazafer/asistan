import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Shield,
    Bot,
    MessageCircle,
    CheckCircle2,
    Clock,
    User,
    FileText
} from "lucide-react";
import { PatientJourney } from '@/components/clinical/PatientJourney';
import { DigitalDocs } from '@/components/clinical/DigitalDocs';

interface LeadDetailPanelProps {
    lead: any | null;
    isOpen: boolean;
    onClose: () => void;
}

const MOCK_CHAT_HISTORY = [
    { sender: 'user', message: 'Merhaba, Zirkonyum diş kaplama fiyatlarınız hakkında bilgi alabilir miyim?', time: '14:30' },
    { sender: 'ai', message: 'Merhaba Efendim, Aura Dental Clinic\'e hoş geldiniz. Ben Aura, size yardımcı olmaktan memnuniyet duyarım. Zirkonyum tedavimiz için estetik beklentileriniz bizim için çok önemli. Daha önce bu konuda bir muayene oldunuz mu?', time: '14:30' },
    { sender: 'user', message: 'Hayır olmadım, sadece fiyat merak ediyorum.', time: '14:32' },
    { sender: 'ai', message: 'Anlıyorum. Size en doğru planlamayı sunabilmemiz için dilerseniz uzman hekimlerimizle ücretsiz bir ön görüşme planlayabiliriz. Bu sayede net bir fiyatlandırma yapabiliriz. Ne dersiniz?', time: '14:33' },
    { sender: 'ai', message: 'Elbette! Sizin için hemen bir online konsültasyon organize ediyorum. Yarın saat 15:00 sizin için uygun mudur?', time: '14:35' },
];

export const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({ lead, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'vision'>('overview');
    const [isAiActive, setIsAiActive] = useState(true);
    const [chatHistory, setChatHistory] = useState(MOCK_CHAT_HISTORY);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset state when lead changes
    useEffect(() => {
        if (isOpen) {
            setIsAiActive(true);
            setActiveTab('overview');
        }
    }, [isOpen, lead]);

    if (!mounted || !lead) return null;

    console.log("PANEL RENDER (Portal):", { isOpen, leadName: lead.name });

    const panelContent = (
        <>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        style={{ zIndex: 2147483646 }}
                    />

                    {/* Slide-over Panel */}
                    <div
                        className="fixed inset-y-0 right-0 w-full md:w-[650px] bg-gray-50 shadow-2xl flex flex-col border-l border-gray-200 border-4 border-red-500"
                        style={{ zIndex: 2147483647 }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white relative z-10 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-black text-gray-700 shadow-inner">
                                    {lead.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                        {lead.name}
                                        <span className="text-[10px] px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-black uppercase tracking-widest border border-gray-200">{lead.status}</span>
                                    </h2>
                                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
                                        <User size={14} /> {lead.phone} • {lead.treatment}
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-[3px] transition-all ${activeTab === 'overview' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Genel Bakış
                            </button>
                            <button
                                onClick={() => setActiveTab('calendar')}
                                className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-[3px] transition-all ${activeTab === 'calendar' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Takvim
                            </button>
                            <button
                                onClick={() => setActiveTab('vision')}
                                className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-[3px] transition-all ${activeTab === 'vision' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Vision AI
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-8 space-y-8">
                            {/* ... Risk Level Calculation reuse ... */}
                            {(() => {
                                const riskLevel = lead.score > 80 ? 'low' : lead.score > 50 ? 'medium' : 'high';
                                const riskColor = riskLevel === 'low' ? 'bg-emerald-500' : riskLevel === 'medium' ? 'bg-amber-500' : 'bg-red-500';
                                const riskLabel = riskLevel === 'low' ? 'GÜVENLİ (Yeşil)' : riskLevel === 'medium' ? 'DİKKAT (Sarı)' : 'RİSKLİ (Kırmızı)';

                                return (
                                    <>
                                        {activeTab === 'overview' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                                {/* Risk & Info Cards */}
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                                        <div className="flex items-center gap-2 mb-3 text-gray-500">
                                                            <Shield size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Risk Durumu</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-3 h-3 rounded-full ${riskColor} animate-pulse shadow-sm`} />
                                                            <span className="text-sm font-bold text-gray-700">{riskLabel}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                                        <div className="flex items-center gap-2 mb-3 text-gray-500">
                                                            <Bot size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">Neural Score</span>
                                                        </div>
                                                        <div className="flex items-end gap-2">
                                                            <span className="text-4xl font-black text-indigo-600 leading-none">{lead.score || 85}</span>
                                                            <span className="text-xs text-gray-400 font-bold mb-1">/ 100</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Patient Journey & Docs */}
                                                <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-6">
                                                        <CheckCircle2 size={16} className="text-gray-400" />
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Patient Lifetime Journey</h4>
                                                    </div>

                                                    <div className="overflow-x-auto pb-4">
                                                        <PatientJourney lead={lead} />
                                                    </div>

                                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <FileText size={16} className="text-gray-400" />
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Hızlı İşlemler</h4>
                                                        </div>
                                                        <DigitalDocs lead={lead} />
                                                    </div>
                                                </div>

                                                {/* Chat Section */}
                                                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                                        <div className="flex items-center gap-2">
                                                            <MessageCircle size={16} className="text-gray-500" />
                                                            <span className="text-xs font-bold text-gray-700">WhatsApp / Neural Bridge</span>
                                                        </div>
                                                        <button onClick={() => setIsAiActive(!isAiActive)} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors border ${isAiActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                            {isAiActive ? 'AI AUTO-PILOT ON' : 'MANUAL MODE'}
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/30">
                                                        {chatHistory.map((msg, i) => (
                                                            <div key={i} className={`flex ${msg.sender === 'ai' ? 'justify-end' : 'justify-start'}`}>
                                                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm relative group ${msg.sender === 'ai' ? 'bg-black text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm'}`}>
                                                                    {msg.sender === 'ai' && (
                                                                        <div className="mb-1 flex items-center gap-1 opacity-50 text-[9px] uppercase tracking-widest font-bold">
                                                                            <Bot size={10} /> Aura AI
                                                                        </div>
                                                                    )}
                                                                    <p className="leading-relaxed">{msg.message}</p>
                                                                    <span className={`text-[9px] absolute -bottom-5 ${msg.sender === 'ai' ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 font-bold`}>{msg.time}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Input Area */}
                                                    <div className="p-4 border-t border-gray-100 bg-white flex items-center gap-3">
                                                        <input
                                                            disabled={isAiActive}
                                                            type="text"
                                                            placeholder={isAiActive ? "Aura AI aktif. Manuel müdahale için modu kapatın." : "Mesajınızı yazın..."}
                                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black/20 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        />
                                                        <button
                                                            disabled={isAiActive}
                                                            className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shadow-lg"
                                                        >
                                                            <CheckCircle2 size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeTab === 'calendar' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6 py-20 bg-white rounded-[3rem] border border-gray-200 shadow-sm border-dashed">
                                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                                    <Clock size={32} className="text-gray-300" />
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <h4 className="text-lg font-black uppercase tracking-widest text-gray-900">Takvim Çizelgesi</h4>
                                                    <p className="text-sm text-gray-500 max-w-xs mx-auto">Bu hasta için randevu ve operasyon planlamasını buradan yönetebilirsiniz.</p>
                                                </div>
                                                <button className="px-8 py-3 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                                    + Randevu Oluştur
                                                </button>
                                            </motion.div>
                                        )}

                                        {activeTab === 'vision' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6 py-20 bg-white rounded-[3rem] border border-gray-200 shadow-sm border-dashed">
                                                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center shadow-inner">
                                                    <Bot size={32} className="text-indigo-500" />
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <h4 className="text-lg font-black uppercase tracking-widest text-gray-900">Aura Vision AI</h4>
                                                    <p className="text-sm text-gray-500 max-w-xs mx-auto">Röntgen, fotoğraf veya PDF raporlarını analiz için buraya sürükleyin.</p>
                                                </div>
                                                <button className="px-8 py-3 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                                    Analiz Başlat
                                                </button>
                                            </motion.div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </>
            )}
        </>
    );

    return createPortal(panelContent, document.body);
};
