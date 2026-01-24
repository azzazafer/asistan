'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Copy, Smartphone, Info, Shield, Building2 } from 'lucide-react';
import { getAgentStats, getAgentRecentMessages, getAvailableAuctions, claimAuction } from '@/lib/agents';
import { createBrowserClient } from '@supabase/ssr';
import toast from 'react-hot-toast';

export default function AgentDashboard() {
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [auctions, setAuctions] = useState<any[]>([]);
    const [lang, setLang] = useState('tr');

    useEffect(() => {
        const savedLang = localStorage.getItem("aura_lang") || 'tr';
        setLang(savedLang);
    }, []);
    const [loading, setLoading] = useState(true);
    const [agent, setAgent] = useState<any>(null);
    const [statsData, setStatsData] = useState<{
        totalLeads: number;
        activeLeads: number;
        pendingCommissions: number;
        totalEarnings: number;
    }>({
        totalLeads: 0,
        activeLeads: 0,
        pendingCommissions: 0,
        totalEarnings: 0
    });

    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    ));

    useEffect(() => {
        async function loadData() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) return;

                const { data: agentData } = await supabase
                    .from('agents')
                    .select('*')
                    .eq('email', session.user.email)
                    .single();

                if (agentData) {
                    setAgent(agentData);
                    const [stats, messages, availableAuctions] = await Promise.all([
                        getAgentStats(agentData.id),
                        getAgentRecentMessages(agentData.id),
                        getAvailableAuctions()
                    ]);
                    setStatsData(stats);
                    setRecentMessages(messages);
                    setAuctions(availableAuctions);
                }
            } catch (error) {
                console.error("Error loading agent data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleClaim = async (auctionId: string) => {
        if (!agent) return;
        const success = await claimAuction(auctionId, agent.id);
        if (success) {
            toast.success(lang === 'tr' ? 'Lead başarıyla sahiplenildi!' : 'Lead claimed successfully!');
            // Refresh data
            const [stats, availableAuctions] = await Promise.all([
                getAgentStats(agent.id),
                getAvailableAuctions()
            ]);
            setStatsData(stats);
            setAuctions(availableAuctions);
        } else {
            toast.error(lang === 'tr' ? 'Hata: Lead zaten sahiplenilmiş olabilir.' : 'Error: Lead might be already claimed.');
        }
    };

    const referralCode = agent?.referral_code || "ZAFER2026";
    const waLink = `https://wa.me/90532XXXXXXX?text=Merhaba%2C%20${referralCode}%20koduyla%20bilgi%20almak%20istiyorum`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(waLink);
        toast.success(lang === 'tr' ? 'Referans linki kopyalandı!' : 'Referral link copied!');
    };

    const stats = [
        { label: lang === 'tr' ? 'Toplam Yönlendirme' : 'Total Referrals', value: statsData.totalLeads.toString(), icon: Users, color: 'indigo' },
        { label: lang === 'tr' ? 'Aktif Leadler' : 'Active Leads', value: statsData.activeLeads.toString(), icon: Smartphone, color: 'blue' },
        { label: lang === 'tr' ? 'Bekleyen Komisyon' : 'Pending Commission', value: `$${statsData.pendingCommissions}`, icon: TrendingUp, color: 'amber' },
        { label: lang === 'tr' ? 'Toplam Kazanç' : 'Total Earnings', value: `$${statsData.totalEarnings}`, icon: DollarSign, color: 'emerald' },
    ];

    if (loading) {
        return <div className="p-8 flex items-center justify-center min-h-screen">Yükleniyor...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24 lg:pb-8">
            {/* Welcoming Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter">İş Ortaklığı Paneli</h1>
                    <p className="text-slate-500 mt-1">Hoş geldin {agent?.name || 'Değerli Ortağımız'}! İşte bugünlük performansın.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={() => window.location.href = '/super-admin'}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2"
                    >
                        <Shield size={14} />
                        Sistem Kontrol
                    </button>
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-black/20 hover:bg-neutral-800 transition-all flex items-center gap-2"
                    >
                        <Building2 size={14} />
                        Hastane Paneli
                    </button>
                    <button
                        onClick={() => window.location.href = '/portal'}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                        <Users size={14} />
                        Hasta Portalı
                    </button>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Sistem Aktif (Neural v2)
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="glass-canvas p-6 rounded-2xl border-white/60 shadow-sm"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4`}>
                            <stat.icon size={20} className={`text-${stat.color}-600`} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold tracking-tighter italic">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Referral Booster Card */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-canvas p-10 rounded-3xl border-white/80 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50 rounded-full blur-[80px] -z-10 opacity-30 translate-x-1/2 -translate-y-1/2" />

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="max-w-md">
                                <h2 className="text-2xl font-bold mb-3 italic">Satışları Başlatın 🚀</h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                    Size özel referral linkinizi kullanarak hastalarınıza iletin. Aura (Emel AI), bu kodla gelen her hastayı sizin adınıza tanıyacak ve satışı kapatacaktır.
                                </p>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-black/5 flex items-center justify-between gap-4 group">
                                        <code className="text-xs font-bold text-indigo-600 truncate">{waLink}</code>
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-2 rounded-lg bg-white border border-black/5 shadow-sm hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-black"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Info size={12} />
                                        Bu link doğrudan WhatsApp hattımıza ve sizin kodunuza bağlanır.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col items-center p-6 bg-white border border-black/5 rounded-2xl shadow-xl">
                                <div className="p-4 bg-white rounded-lg mb-4 border border-slate-100">
                                    {/* Dynamic QR Code via Google Chart API (No extra deps needed) */}
                                    <img
                                        src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(waLink)}`}
                                        alt="Referral QR Code"
                                        className="w-24 h-24"
                                    />
                                </div>
                                <span className="text-xs font-bold tracking-tighter">QR Kod Hazır</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Conversations (Live Feed) */}
                    <div className="bg-white rounded-3xl p-8 border border-black/5">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                            <Smartphone size={18} className="text-indigo-600" />
                            {lang === 'tr' ? 'Canlı Takip (AI Interaction)' : 'Live AI Interaction'}
                        </h3>
                        <div className="space-y-4">
                            {recentMessages.length > 0 ? (
                                recentMessages.map((msg, idx) => (
                                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-black/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-bold uppercase text-indigo-600">
                                                {msg.role === 'user' ? 'Gelen Mesaj' : 'AI Cevabı'}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {new Date(msg.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-700 line-clamp-2">{msg.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 italic">
                                    {lang === 'tr' ? 'Şu an aktif bir görüşme bulunmuyor.' : 'No active conversations at the moment.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-black text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
                        <h3 className="text-lg font-bold mb-6">Mevcut Bakiyeniz</h3>
                        <h2 className="text-5xl font-bold tracking-tighter mb-2">${statsData.totalEarnings.toFixed(2)}</h2>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Son 30 Günlük Kazanç</p>
                        <button className="w-full py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                            <DollarSign size={18} />
                            Ödeme Talep Et
                        </button>
                    </div>

                    <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Lead Borsası 🔥
                        </h3>
                        <p className="text-indigo-200 text-xs mb-6">Havuzdaki yeni hastaları hızla sahiplenin.</p>

                        <div className="space-y-3">
                            {auctions.length > 0 ? (
                                auctions.map((auc, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-sm">{auc.leads?.treatment}</p>
                                                <p className="text-[10px] text-indigo-300">{auc.leads?.culture} | ${auc.min_price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleClaim(auc.id)}
                                                className="px-3 py-1 bg-white text-indigo-900 rounded-lg text-[10px] font-bold hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Sahiplen
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-4 text-xs text-indigo-300 italic">Şu an aktif açık artırma yok.</p>
                            )}
                        </div>
                    </div>

                    <div className="glass-canvas p-8 rounded-3xl border-white/80">
                        <h3 className="font-bold mb-4 italic">Biliyor muydunuz?</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            Akşam 20:00 - 22:00 saatleri arasında gönderilen leadlerin satış kapatma oranı %40 daha fazla. Emel AI bu saatlerde daha ikna edici!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
