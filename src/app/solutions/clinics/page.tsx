"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Clock, Camera, Zap, Shield, ChevronRight, Cpu, Radio, Award } from "lucide-react";

export default function ClinicsGodModePage() {
    const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

    const CONTENT = {
        tr: {
            tag: "CLINICAL SUPREMACY • V11.0",
            title: "Operasyonu\nKusursuzlaştırın.",
            subtitle: "Ultra-Premium Klinik Otonomisi: Medikal turizmdeki kontrol kaybını %100 otonom bir gelir akışına dönüştürün. Hata payı sıfır.",
            sections: [
                { title: "Nex-Scan™ Vision", desc: "Hastanın gönderdiği verileri 12ms içinde analiz eden yapay zeka katmanı. Tıbbi değerlendirme artık bir yük değil, bir avantaj.", icon: <Camera size={24} /> },
                { title: "24/7 Global Otonomi", desc: "Dünyanın her yerinden gelen talepleri anında yakalayan, sıcak tutan ve satışı kapatan yapay zeka protokolü.", icon: <Clock size={24} /> },
                { title: "Eksiksiz Kontrol", desc: "Finansal köprüler ve hasta takip süreçlerinde %100 şeffaflık ve sıfır hata vizyonu.", icon: <Award size={24} /> }
            ]
        },
        en: {
            tag: "CLINICAL SUPREMACY • V11.0",
            title: "Perfect Your\nOperation.",
            subtitle: "Ultra-Premium Clinic Autonomy: Transform operational loss in medical tourism into a 100% autonomous revenue flow. Zero margin for error.",
            sections: [
                { title: "Nex-Scan™ Vision", desc: "AI layer analyzing patient data within 12ms. Medical assessment is no longer a burden, but an advantage.", icon: <Camera size={24} /> },
                { title: "24/7 Global Autonomy", desc: "AI protocol that instantly captures, keeps warm, and closes sales from leads worldwide.", icon: <Clock size={24} /> },
                { title: "Absolute Control", desc: "100% transparency and zero-error vision in financial bridges and patient tracking processes.", icon: <Award size={24} /> }
            ]
        },
        ar: {
            tag: "CLINICAL SUPREMACY • V11.0",
            title: "اجعل عملياتك\nمثالية.",
            subtitle: "استقلالية عيادات النخبة: حول الخسارة التشغيلية في السياحة العلاجية إلى تدفق إيرادات مستقل بنسبة 100٪. صفر هامش للخطأ.",
            sections: [
                { title: "Nex-Scan™ Vision", desc: "طبقة ذكاء اصطnaعي تحلل بيانات المريض في غضون 12 مللي ثانية. التقييم الطبي لم يعد عبئا، بل ميزة.", icon: <Camera size={24} /> },
                { title: "24/7 استقلالية عالمية", desc: "بروتوكول ذكاء اصطناعي يلتقط العملاء من جميع أنحاء العالم فورًا ويغلق المبيعات.", icon: <Clock size={24} /> },
                { title: "تحكم مطلق", desc: "شفافية بنسبة 100٪ ورؤية خالية من الأخطاء في الجسور المالية وعمليات تتبع المرضى.", icon: <Award size={24} /> }
            ]
        }
    };

    const t = CONTENT[lang];

    return (
        <AuraLayout lang={lang} setLang={setLang}>
            <section className="pt-40 md:pt-60 pb-40 px-6 relative overflow-hidden">
                {/* Background density fills */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-[1600px] mx-auto">
                    {/* Hero Section */}
                    <div className="mb-40 space-y-12 max-w-5xl">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/5">
                            <Zap size={14} /> {t.tag}
                        </motion.div>
                        <h1 className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">
                            {t.title}
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-slate-400 italic border-l-2 border-teal-500/20 pl-10 max-w-4xl">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Content Sections: Mixed Flow */}
                    <div className="grid lg:grid-cols-12 gap-20 mb-60 items-center">
                        <div className="lg:col-span-12 xl:col-span-7 relative group">
                            <motion.div initial={{ rotateY: 15 }} whileInView={{ rotateY: -10 }} transition={{ duration: 1.5 }} className="relative z-10 rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl">
                                <img src="/images/patient_ui.png" alt="" className="w-full h-auto grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-2000" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/90 via-transparent to-transparent" />
                            </motion.div>
                        </div>
                        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 border border-white/10 shadow-xl">{t.sections[0].icon}</div>
                            <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">{t.sections[0].title}</h2>
                            <p className="text-2xl text-slate-400 font-medium leading-relaxed">{t.sections[0].desc}</p>
                            <button className="glass-btn px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 flex items-center gap-4 group">
                                KÜRESEL MİMARİ <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {[t.sections[1], t.sections[2]].map((section, idx) => (
                            <div key={idx} className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-teal-400/20 transition-all group min-h-[400px] flex flex-col justify-between overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="space-y-10 relative z-10">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-teal-400 border border-white/5">{section.icon}</div>
                                    <h3 className="text-4xl font-bold uppercase text-white tracking-tighter italic">{section.title}</h3>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed">{section.desc}</p>
                                </div>
                                <div className="text-[120px] font-black text-white/[0.02] absolute -bottom-10 -right-10 leading-none select-none">0{idx + 2}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Universal Signature */}
            <section className="py-20 px-6 bg-[#030303] text-center border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[1.2em] text-white/10 mb-4">God-Mode Infrastructure</p>
                <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white uppercase italic tracking-tighter hover:text-teal-400 transition-colors">WWW.NEXTORIADIGITAL.COM</a>
            </section>
        </AuraLayout>
    );
}
