'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Calendar, ExternalLink } from 'lucide-react';
import { getAgentByCode, getAgentLeads } from '@/lib/agents';

export default function AgentLeadsPage() {
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const referralCode = "ZAFER2026";

    useEffect(() => {
        async function loadLeads() {
            try {
                const agentData = await getAgentByCode(referralCode);
                if (agentData) {
                    const leadsData = await getAgentLeads(agentData.id);
                    setLeads(leadsData);
                }
            } catch (error) {
                console.error("Error loading leads:", error);
            } finally {
                setLoading(false);
            }
        }
        loadLeads();
    }, []);

    const filteredLeads = leads.filter(lead =>
    (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm))
    );

    if (loading) {
        return <div className="p-8 flex items-center justify-center min-h-screen font-bold tracking-tighter">Veriler yükleniyor...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter italic">Yönlendirmeleriniz</h1>
                    <p className="text-slate-500 mt-1">Sizin aracılığınızla sisteme dahil olan hastaların güncel listesi.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Hasta adı veya telefon..."
                            className="bg-white border border-black/5 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-black/5 outline-none w-64 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-black/5">
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Hasta Bilgisi</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tedavi</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Kanal</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Tarih</th>
                                <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {filteredLeads.length > 0 ? filteredLeads.map((lead, idx) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={lead.id}
                                    className="hover:bg-slate-50/30 transition-colors group"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                {lead.name?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight">{lead.name || 'İsimsiz Hasta'}</p>
                                                <p className="text-xs text-slate-400">{lead.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-xs font-bold tracking-tight bg-slate-100 px-3 py-1 rounded-full">{lead.treatment}</span>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs font-medium text-slate-500">{lead.channel || 'WhatsApp'}</p>
                                    </td>
                                    <td className="p-6 text-xs text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(lead.date).toLocaleDateString('tr-TR')}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            {lead.status}
                                        </div>
                                    </td>
                                </motion.tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-slate-400 italic text-sm">
                                        Henüz eşleşen bir yönlendirme bulunamadı.
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
