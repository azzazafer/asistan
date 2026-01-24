"use client";

import { useState, useEffect } from "react";
import {
    Calendar as CalendarIcon,
    Plus,
    ChevronLeft,
    ChevronRight,
    Clock,
    User,
    MapPin,
    MoreVertical,
    Search,
    Filter,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/db";
import Link from "next/link";

export default function CalendarPage() {
    const [view, setView] = useState<'month' | 'week' | 'day'>('week');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('appointments')
                .select(`
                    *,
                    leads (name, treatment),
                    locations (name)
                `)
                .order('start_time', { ascending: true });

            if (!error && data) {
                setAppointments(data);
            }
            setLoading(false);
        };

        fetchAppointments();
    }, []);

    // Mock data if DB is empty
    const displayAppointments = appointments.length > 0 ? appointments : [
        {
            id: '1',
            title: 'Hair Transplant Surgery - Ward 4',
            start_time: new Date().toISOString(),
            end_time: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
            type: 'surgery',
            status: 'scheduled',
            leads: { name: 'John Smith' },
            locations: { name: 'Aura Central Istanbul' }
        },
        {
            id: '2',
            title: 'Dental Consultation',
            start_time: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
            end_time: new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(),
            type: 'consultation',
            status: 'scheduled',
            leads: { name: 'Elena Martinez' },
            locations: { name: 'Aura Antalya Clinic' }
        }
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 font-outfit flex items-center gap-3">
                        <CalendarIcon className="text-purple-600" size={32} />
                        Smart Calendar
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Neural Scheduling & Resource Allocation.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                        {['month', 'week', 'day'].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === v ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Plus size={18} />
                        New Entry
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filter */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Search size={16} /> Search & Filter
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Search appointments..."
                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-sm"
                            />
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-400">STATUS</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Scheduled', 'Completed', 'Canceled'].map(s => (
                                        <button key={s} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-600">{s}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-purple-600/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity size={24} />
                            <h3 className="font-bold">Neural Insights</h3>
                        </div>
                        <p className="text-sm text-purple-100 leading-relaxed">
                            Aura AI predicts 85% occupancy for next Tuesday. Consider opening another dental slot.
                        </p>
                    </div>
                </div>

                {/* Calendar Feed */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between font-bold text-gray-400 text-xs px-2">
                        <span>TIME & LOCATION</span>
                        <span>RESIDENT / TREATMENT</span>
                        <span>RANK</span>
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {displayAppointments.map((apt, idx) => (
                                <motion.div
                                    key={apt.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-purple-600/30 hover:shadow-xl hover:shadow-purple-600/5 transition-all cursor-pointer overflow-hidden"
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${apt.type === 'surgery' ? 'bg-red-500' : 'bg-emerald-500'}`} />

                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-black text-gray-900 leading-tight">
                                                {new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                {new Date(apt.start_time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>

                                        <div className="h-10 w-px bg-gray-100" />

                                        <div>
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2 group-hover:text-purple-600 transition-colors">
                                                {apt.title}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                                                    <MapPin size={10} /> {apt.locations?.name || 'Aura Central'}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${apt.type === 'surgery' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    {apt.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <User size={14} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">{apt.leads?.name || 'Unknown Subject'}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{apt.leads?.treatment || 'General'}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
