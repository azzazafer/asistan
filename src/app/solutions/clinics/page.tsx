"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Clock, HeartPulse, Camera, Zap, Shield, ArrowUpRight, CheckCircle2, Database, ChevronRight } from "lucide-react";

export default function ClinicsPrestigePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "CLINICAL LEADERSHIP • V10.0",
            title: "Ciro Akışını\nOtonomlaştırın.",
            subtitle: "Klinik Otonomisi: Reklam bütçenizi değiştirmeden operasyonel kârlılığınızı %40 artırın.",
            sections: [
                { title: "Nex-Scan™ Triaş", desc: "Hastanın gönderdiği medikal verileri Aura'nın eğitilmiş görme yeteneği ile analiz edin. Yüksek niyetli hastayı saniyeler içinde ayırt edin.", icon: <Camera size={24} /> },
                { title: "Global Gece Hattı", desc: "Siz uyurken gelen Avrupa ve Orta Doğu leadlerini otonom olarak yönetin ve satışı o an kapatın.", icon: <Clock size={24} /> },
                { title: "Gelir Kaçağı Analizi", icon: <Zap size={24} /> }
            ],
            scarcity: { title: "SEÇKİN ÜYELİK PROGRAMI.", desc: "Aura OS, bölge bazlı sınırlı sayıda kliniğe lisans sağlar. Pazar liderliğini garantileyin." }
        },
        en: {
            tag: "CLINICAL LEADERSHIP • V10.0",
            title: "Automate Your\nRevenue Flow.",
            subtitle: "Clinic Autonomy: Increase your operational profitability by 40% without changing your ad budget.",
            sections: [
                { title: "Nex-Scan™ Triage", desc: "Analyze patient medical data with Aura's trained vision. Identify high-intent patients in seconds.", icon: <Camera size={24} /> },
                { title: "Global Night-Shift", desc: "Autonomously manage European and Middle Eastern leads while you sleep and close sales instantly.", icon: <Clock size={24} /> },
                { title: "Revenue Leak Analysis", icon: <Zap size={24} /> }
            ],
            scarcity: { title: "ELITE MEMBERSHIP PROGRAM.", desc: "Aura OS provides licenses to a limited number of clinics per region. Secure your market leadership." }
        },
        ar: {
            tag: "CLINICAL LEADERSHIP • V10.0",
            title: "أتمتة تدفق\nالإيرادات.",
            subtitle: "استقلالية العiyada: زيادة ربحيتك التشغيلية بنسبة 40٪ دون تغيير ميزانية الإعلان.",
            sections: [
                { title: "Nex-Scan™ ترياج", desc: "تحليل البيانات الطبية للمرضى برؤية أورا المدربة. تعرف على المرضى ذوي النوايا العالية في ثوانٍ.", icon: <Camera size={24} /> },
                { title: "الوردية الليلية العالمية", desc: "إدارة العملاء الأوروبيين والشرق أوسطيين بشكل مستقل أثناء نومك وإغلاق المبيعات فوراً.", icon: <Clock size={24} /> },
                { title: "تحليل تسرب الإيرادات", icon: <Zap size={24} /> }
            ],
            scarcity: { title: "برنامج العضوية النخبوية.", desc: "يوفر أورا أوس تراخيص لعدد محدود من العيادات لكل منطقة. اضمن ريادتك في السوق." }
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 bg-[#050505] overflow-hidden">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header: Left Aligned Authority */}
                    <div className="mb-40 space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Zap size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">
                            {t.title}
                        </h1>
                        <p className="text-2xl md:text-4xl font-bold text-teal-500/80 italic border-l border-teal-500/20 pl-10 max-w-3xl">
                            "{t.subtitle}"
                        </p>
                    </div>

                    {/* Asymetrical Layout Section 1 */}
                    <div className="grid lg:grid-cols-12 gap-20 mb-60 items-center">
                        <div className="lg:col-span-7 relative group">
                            <motion.div initial={{ rotateY: 10 }} whileInView={{ rotateY: -15, scale: 1.05 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                                <img src="/images/patient_ui.png" alt="" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[2000ms]" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/60 to-transparent" />
                            </motion.div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full" />
                        </div>
                        <div className="lg:col-span-5 space-y-12">
                            <div className="w-16 h-16 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400">{t.sections[0].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.sections[0].title}</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">{t.sections[0].desc}</p>
                            <button className="glass-btn px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 flex items-center gap-4">
                                MİMARİ DETAYLAR <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Asymetrical Layout Section 2 */}
                    <div className="grid lg:grid-cols-12 gap-20 mb-60 items-center">
                        <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
                            <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-teal-400">{t.sections[1].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.sections[1].title}</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">{t.sections[1].desc}</p>
                        </div>
                        <div className="lg:col-span-7 relative order-1 lg:order-2">
                            <motion.div initial={{ rotateY: -10 }} whileInView={{ rotateY: 15 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-white/5 p-8">
                                <div className="aspect-video bg-black/40 rounded-[2rem] border border-white/5 flex items-center justify-center">
                                    <Radio size={80} className="text-teal-500/20 animate-pulse" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scarcity Prestige Widget */}
                    <div className="p-20 md:p-40 rounded-[6rem] bg-indigo-600 space-y-12 text-center text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(79,70,229,0.5)]">
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Shield className="mx-auto" size={80} />
                        <h2 className="text-5xl md:text-9xl font-bold uppercase tracking-[-0.08em] leading-none italic">{t.scarcity.title}</h2>
                        <p className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto opacity-80">{t.scarcity.desc}</p>
                        <div className="pt-12">
                            <button className="px-16 py-8 bg-white text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl hover:scale-105 transition-transform">
                                LİSANS SORGULA
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}
