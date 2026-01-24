'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, Briefcase, PlusCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewLeadPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulating DB save
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
                >
                    <CheckCircle size={40} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold tracking-tighter mb-2">Lead Kaydedildi!</h2>
                <p className="text-slate-500 mb-8">Aura (Emel AI) bu hasta ile kısa süre içinde iletişime geçecek.</p>
                <div className="flex gap-4">
                    <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-black text-white rounded-full font-bold">Yeni Ekle</button>
                    <Link href="/agent" className="px-8 py-3 bg-slate-100 rounded-full font-bold">Panele Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-2xl mx-auto pb-24 lg:pb-8">
            <Link href="/agent" className="inline-flex items-center gap-2 text-slate-400 hover:text-black mb-8 group transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1" />
                <span className="text-xs font-bold uppercase tracking-widest">Geri Dön</span>
            </Link>

            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">Yeni Hasta Yönlendir</h1>
                <p className="text-slate-500">Hastanın bilgilerini girin, gerisini Aura'ya bırakın.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-canvas p-10 rounded-3xl border-white/80 space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Hasta Adı Soyadı</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><User size={18} /></span>
                            <input
                                required
                                type="text"
                                placeholder="Örn: John Doe"
                                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-black/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">WhatsApp Numarası</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={18} /></span>
                            <input
                                required
                                type="tel"
                                placeholder="+90 5XX XXX XX XX"
                                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-black/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Tedavi Türü</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Briefcase size={18} /></span>
                            <select className="w-full pl-12 pr-4 py-4 bg-white/50 border border-black/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer">
                                <option>Diş Protezi</option>
                                <option>Saç Ekimi</option>
                                <option>Rinoplasti</option>
                                <option>Obezite Cerrahisi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="glass-canvas p-10 rounded-3xl border-white/80">
                    <button
                        disabled={submitting}
                        type="submit"
                        className="w-full py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {submitting ? (
                            <span className="animate-pulse">Kaydediliyor...</span>
                        ) : (
                            <>
                                <PlusCircle size={20} />
                                Lead'i Kaydet ve Aura'yı Başlat
                            </>
                        )}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                        * Bu lead otomatik olarak sizin acente kodunuzla eşleştirilecektir.
                    </p>
                </div>
            </form>
        </div>
    );
}
