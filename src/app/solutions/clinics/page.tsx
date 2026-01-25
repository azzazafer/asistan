"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Clock, HeartPulse, Camera, Zap, Shield, ArrowUpRight, CheckCircle2, Database } from "lucide-react";

export default function ClinicsPage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "CLINIC DOMINANCE • 9.0",
            title: "Boş Koltuk Maliyetini Sıfırlayın.",
            subtitle: "Klinik Otonomisi: Reklam bütçenizi değiştirmeden cironuzu %40 artırın.",
            bento: [
                { title: "Nex-Scan™ Cerrahi Triaş", desc: "Hastanın gönderdiği medikal fotoğrafları (Diş, Saç, Estetik) Aura'nın eğitilmiş görme yeteneği ile analiz edin.", icon: <Camera /> },
                { title: "Autonomic Night-Shift", desc: "Siz uyurken gelen Avrupa ve Orta Doğu kaynaklı leadleri otonom olarak sıcak tutun ve satışı kapatın.", icon: <Clock /> },
                { title: "Revenue Leak Detection", desc: "Klinik içindeki gizli ciro kayıplarını saniyeler içinde tespit edin.", icon: <Zap /> }
            ]
        },
        en: {
            tag: "CLINIC DOMINANCE • 9.0",
            title: "Zero Empty Chair Cost.",
            subtitle: "Clinic Autonomy: Increase your revenue by 40% without changing your ad budget.",
            bento: [
                { title: "Nex-Scan™ Surgical Triage", desc: "Analyze medical photos (Dental, Hair, Aesthetic) with Aura's trained vision intelligence.", icon: <Camera /> },
                { title: "Autonomic Night-Shift", desc: "Keep European and Middle Eastern leads warm and close sales while you sleep.", icon: <Clock /> },
                { title: "Revenue Leak Detection", desc: "Identify hidden revenue losses within the clinic in seconds.", icon: <Zap /> }
            ]
        },
        ar: {
            tag: "CLINIC DOMINANCE • 9.0",
            title: "صفر تكلفة المقاعد الفارغة.",
            subtitle: "استقلالية العيادة: زيادة أرباحك بنسبة 40٪ دون تغيير ميزانية الإعلان.",
            bento: [
                { title: "Nex-Scan™ الترياج الجراحي", desc: "تحليل الصور الطبية (للأسنان، الشعر، التجميل) بذكاء أورا المدرب.", icon: <Camera /> },
                { title: "Autonomic Night-Shift", desc: "حافظ على حيوية العملاء الأوروبيين والشرق أوسطيين وأغلق المبيعات أثناء نومك.", icon: <Clock /> },
                { title: "Kشف تسرب الإيرادات", desc: "تحديد خسائر الإيرادات المخفية داخل العيادة في ثوانٍ.", icon: <Zap /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505]">
                <div className="max-w-[1400px] mx-auto">
                    {/* Hero */}
                    <div className="mb-40 space-y-12 max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-teal-500/10 text-teal-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-teal-500/20">
                            <Zap size={14} /> {t.tag}
                        </div>
                        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-[8rem] font-black tracking-tighter text-white uppercase italic leading-[0.85] drop-shadow-3xl">
                            {t.title}
                        </motion.h1>
                        <p className="text-3xl font-black text-teal-500 italic">"{t.subtitle}"</p>
                    </div>

                    {/* Bento Grid: Apple/SaaS Style */}
                    <div className="grid lg:grid-cols-12 gap-8 mb-40">
                        <div className="lg:col-span-8 p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:border-teal-500/40 transition-all group overflow-hidden relative">
                            <div className="relative z-10 space-y-8">
                                <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
                                    {t.bento[0].icon}
                                </div>
                                <h3 className="text-5xl font-black uppercase text-white tracking-tight">{t.bento[0].title}</h3>
                                <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-xl">{t.bento[0].desc}</p>
                            </div>
                            <img src="/images/patient_ui.png" alt="" className="absolute -bottom-20 -right-20 w-1/2 opacity-20 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000 rotate-12" />
                        </div>

                        <div className="lg:col-span-4 p-12 rounded-[4rem] bg-teal-500 text-black space-y-8 shadow-[0_0_60px_rgba(0,240,255,0.3)]">
                            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center">
                                {t.bento[2].icon}
                            </div>
                            <h3 className="text-4xl font-black uppercase leading-tight">{t.bento[2].title}</h3>
                            <p className="text-xl font-bold opacity-80">{t.bento[2].desc}</p>
                        </div>

                        <div className="lg:col-span-4 p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all space-y-8">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400">
                                {t.bento[1].icon}
                            </div>
                            <h3 className="text-3xl font-black uppercase text-white">{t.bento[1].title}</h3>
                            <p className="text-xl text-slate-500 font-medium">{t.bento[1].desc}</p>
                        </div>

                        <div className="lg:col-span-8 p-16 rounded-[4rem] bg-indigo-600 text-white flex flex-col justify-between group overflow-hidden relative border border-white/10">
                            <div className="relative z-10 space-y-6">
                                <h3 className="text-5xl font-black uppercase tracking-tighter italic leading-[0.8]">NEXTORIA<br />ALPHA INTEGRATION</h3>
                                <p className="text-xl font-bold opacity-80 max-w-md">Tüm HBYS ve CRM sistemleriyle 12ms senkronizasyon hızı.</p>
                            </div>
                            <div className="mt-12 flex gap-4 relative z-10">
                                <button className="px-10 py-5 bg-white text-black font-black uppercase rounded-full hover:scale-105 transition-transform">HEMEN BAĞLAN</button>
                            </div>
                            <Database size={200} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Scarcity Banner */}
                    <div className="p-20 rounded-[5rem] bg-red-600 text-white text-center space-y-8 shadow-[0_45px_100px_rgba(255,69,0,0.4)]">
                        <Shield className="mx-auto" size={80} />
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">SADECE SEÇKİN KLİNİKLER İÇİN.</h2>
                        <p className="text-2xl font-bold max-w-4xl mx-auto opacity-90">Aura OS, her şehirde sadece sınırlı sayıda kliniğe lisans verir. Rakiplerinizden önce yerinizi alın veya onların yükselişini izleyin.</p>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
