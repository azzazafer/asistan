'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { getAgentByCode, getAgentCommissions } from '@/lib/agents';

export default function AgentCommissionsPage() {
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState<any[]>([]);

    const referralCode = "ZAFER2026";

    useEffect(() => {
        async function loadCommissions() {
            try {
                const agentData = await getAgentByCode(referralCode);
                if (agentData) {
                    const commissionsData = await getAgentCommissions(agentData.id);
                    setCommissions(commissionsData);
                }
            } catch (error) {
                console.error("Error loading commissions:", error);
            } finally {
                setLoading(false);
            }
        }
        loadCommissions();
    }, []);

    const totalEarnings = commissions
        .filter(c => c.status === 'paid')
        .reduce((sum, c) => sum + Number(c.amount_commission), 0);

    const pendingCommissions = commissions
        .filter(c => c.status === 'pending')
        .reduce((sum, c) => sum + Number(c.amount_commission), 0);

    if (loading) {
        return <div className="p-8 flex items-center justify-center min-h-screen font-bold tracking-tighter">Komisyonlar yükleniyor...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter italic">Komisyonlarım</h1>
                    <p className="text-slate-500 mt-1">Tamamlanan satışlardan kazandığınız hak edişler.</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <CheckCircle2 size={120} />
                    </div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Toplam Ödenen</p>
                    <h2 className="text-5xl font-bold tracking-tighter italic">${totalEarnings.toFixed(2)}</h2>
                </div>
                <div className="glass-canvas p-8 rounded-3xl border-white/80 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-600">
                        <Clock size={120} />
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Süreçteki Komisyon</p>
                    <h2 className="text-5xl font-bold tracking-tighter italic text-amber-600">${pendingCommissions.toFixed(2)}</h2>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-black/5 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <CreditCard size={18} className="text-indigo-600" />
                        İşlem Geçmişi
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-black/5">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">İşlem Detayı</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tutar</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tarih</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {commissions.length > 0 ? commissions.map((comm, idx) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={comm.id}
                                    className="hover:bg-slate-50/30 transition-colors"
                                >
                                    <td className="p-6">
                                        <div>
                                            <p className="font-bold text-sm tracking-tight capitalize">Satış Komisyonu</p>
                                            <p className="text-[10px] text-slate-400 font-mono">{comm.id.split('-')[0]}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="font-bold text-indigo-600 italic tracking-tighter">${Number(comm.amount_commission).toFixed(2)}</p>
                                    </td>
                                    <td className="p-6 text-xs text-slate-400">
                                        {new Date(comm.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className={`inline-flex items-center gap-2 ${comm.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            } px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                                            {comm.status === 'paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                            {comm.status === 'paid' ? 'Ödendi' : 'Beklemede'}
                                        </div>
                                    </td>
                                </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-slate-400 italic text-sm">
                                        Henüz bir komisyon kaydı bulunmuyor. Satışlar tamamlandığında burada görünecektir.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
