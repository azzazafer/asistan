"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Shield, Zap, Globe, Sparkles,
  ArrowUpRight, Cpu, TrendingUp, X, CheckCircle2,
  Database, Workflow, Activity, CreditCard, AlertTriangle
} from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

// --- NEURAL SALES CONTENT DNA ---
const CONTENT = {
  tr: {
    hero: {
      tag: "NEXTORIA ALPHA ARCHITECTURE",
      title: "Yönetmeyi Bırakın.\nKapatmaya Başlayın.",
      subtitle: "Aura OS, dünyadaki ilk Nöro-Satış motorudur. Randevu vermiyoruz, HBYS ile 12ms hızında konuşup satışı Stripe üzerinden otonom kapatıyoruz.",
      cta: "Alpha Sürümüne Geçiş Yap"
    },
    features: {
      title: "Otonom Satışın\nÜç Sac Ayağı",
      subtitle: "Eski CRM'lerinizi çöpe atın. Aura, sadece veri tutmaz; veriyi paraya çevirir.",
      items: [
        { icon: <Zap size={32} />, title: "Scarcity Engine™", desc: "Stoklar 2'nin altına düştüğünde, AI otomatik olarak 'Kıtlık Psikolojisi' uygular ve dönüşümü %300 artırır." },
        { icon: <Brain size={32} />, title: "Nex-Scan™ Triaj", desc: "Hasta fotoğrafını milisaniyeler içinde analiz eder. Doktor görmeden önce Lead Score'u çıkarır." },
        { icon: <CreditCard size={32} />, title: "Stripe Bridge", desc: "Telefon kapanmadan tahsilat yapılır. 'Sözde randevu' devri biter, 'Ödenmiş Randevu' devri başlar." }
      ]
    },
    comparison: {
      old: { title: "ESKİ DÜNYA (MEDUAI vb.)", items: ["Sadece Randevu Yönetir", "İnsan Hızında Yanıt (Saatler)", "Leadlerin %40'ı Çöp Olur", "Ödeme Klinikte Alınır"] },
      aura: { title: "AURA DÜNYASI", items: ["Satışı ve Parayı Yönetir", "12ms Refleks Hızı", "Sadece Kalifiye Hasta Gelir", "Telefonda Tahsilat (No-Show %0)"] }
    },
    metrics: [
      { id: "count1", label: "OTONOM KAPANIŞ", suffix: "" },
      { id: "count2", label: "TOPLAM CİRO (€)", suffix: "" },
      { id: "count3", label: "HBYS SENKRONİZASYON", value: "12ms" }
    ]
  },
  en: {
    hero: {
      tag: "NEXTORIA ALPHA ARCHITECTURE",
      title: "Stop Managing.\nStart Closing.",
      subtitle: "Aura OS is the world's first Neuro-Sales engine. We don't book appointments; we talk to HMS at 12ms and close the sale autonomously via Stripe.",
      cta: "Upgrade to Alpha Version"
    },
    features: {
      title: "Three Pillars of\nAutonomous Sales",
      subtitle: "Trash your old CRMs. Aura doesn't just store data; it converts data into capital.",
      items: [
        { icon: <Zap size={32} />, title: "Scarcity Engine™", desc: "When stock drops below 2, AI automatically applies 'Scarcity Psychology' increasing conversion by 300%." },
        { icon: <Brain size={32} />, title: "Nex-Scan™ Triage", desc: "Analyzes patient photos in milliseconds. Generates Lead Score before a doctor even sees it." },
        { icon: <CreditCard size={32} />, title: "Stripe Bridge", desc: "Collection is done before the call ends. The era of 'fake appointments' ends; 'Paid Appointments' begin." }
      ]
    },
    comparison: {
      old: { title: "LEGACY WORLD (MEDUAI etc.)", items: ["Manages Appointments Only", "Human Speed Response (Hours)", "40% of Leads Are Wasted", "Payment Taken at Clinic"] },
      aura: { title: "AURA WORLD", items: ["Manages Sales and Capital", "12ms Reflex Speed", "Only Qualified Patients Arrive", "In-Call Collection (No-Show %0)"] }
    },
    metrics: [
      { id: "count1", label: "AUTONOMOUS CLOSINGS", suffix: "" },
      { id: "count2", label: "TOTAL REVENUE (€)", suffix: "" },
      { id: "count3", label: "HMS SYNCHRONIZATION", value: "12ms" }
    ]
  },
  ar: {
    hero: {
      tag: "بنية نكستوريا ألفا",
      title: "توقف عن الإدارة.\nابدأ بالإغلاق.",
      subtitle: "Aura OS هو أول محرك مبيعات عصبي في العالم. نحن لا نحجز المواعيد؛ نتحدث إلى HMS بسرعة 12 مللي ثانية ونغلق البيع تلقائيًا عبر Stripe.",
      cta: "الترقية إلى إصدار ألفا"
    },
    features: {
      title: "الركائز الثلاث\nللمبيعات المستقلة",
      subtitle: "تخلص من أنظمة CRM القديمة. أورا لا يخزن البيانات فحسب؛ بل يحول البيانات إلى رأس مال.",
      items: [
        { icon: <Zap size={32} />, title: "Scarcity Engine™", desc: "عندما ينخفض المخزون عن 2، يطبق الذكاء الاصطناعي تلقائيًا 'علم نفس الندرة' مما يزيد التحويل بنسبة 300٪." },
        { icon: <Brain size={32} />, title: "Nex-Scan™ Triaj", desc: "يحلل صور المرضى في أجزاء من الثانية. يولد درجة العميل المحتمل قبل أن يراها الطبيب." },
        { icon: <CreditCard size={32} />, title: "Stripe Bridge", desc: "يتم التحصيل قبل انتهاء المكالمة. ينتهي عصر 'المواعيد الوهمية'؛ وتبدأ 'المواعيد المدفوعة'." }
      ]
    },
    comparison: {
      old: { title: "العالم القديم", items: ["يدير المواعيد فقط", "استجابة بسرعة البشر (ساعات)", "40٪ من العملاء يضيعون", "يتم الدفع في العيادة"] },
      aura: { title: "عالم أورا", items: ["يدير المبيعات ورأس المال", "سرعة رد فعل 12ms", "يصل المرضى المؤهلون فقط", "التحصيل أثناء المكالمة (No-Show %0)"] }
    },
    metrics: [
      { id: "count1", label: "إغلاق مستقل", suffix: "" },
      { id: "count2", label: "إجمالي الإيرادات (€)", suffix: "" },
      { id: "count3", label: "مزامنة HMS", value: "12ms" }
    ]
  }
};

// --- REVENUE FLUX DASHBOARD (3D) ---
const RevenueDashboard = () => (
  <motion.div
    initial={{ rotateX: 15, y: 50, opacity: 0 }}
    animate={{ rotateX: 15, y: 0, opacity: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="relative w-full max-w-[800px] h-[450px] bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl p-10 flex flex-col items-center justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] perspective-[1000px]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.05] to-transparent rounded-[2.5rem]" />

    <div className="relative z-10 text-center space-y-4">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-6xl md:text-8xl font-black text-white tracking-tighter"
      >
        € 142,500
      </motion.div>
      <div className="text-[#00F0FF] text-[10px] font-black tracking-[0.8em] uppercase">GÜNCEL CİRO AKIŞI</div>
    </div>

    {/* Live Audio Visualizer Bars */}
    <div className="absolute bottom-10 left-10 right-10 h-32 flex items-end gap-1 px-10">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`] }}
          transition={{ duration: 0.5 + Math.random() * 1, repeat: Infinity }}
          className={`flex-1 bg-[#00F0FF] opacity-30 ${i === 20 ? 'shadow-[0_0_30px_#00F0FF] opacity-100' : ''}`}
        />
      ))}
    </div>
  </motion.div>
);

export default function AbsoluteAlphaPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [counts, setCounts] = useState({ closings: 124, revenue: 142500 });
  const t = CONTENT[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        closings: prev.closings + 1,
        revenue: prev.revenue + 450
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuraLayout lang={lang} setLang={setLang}>
      {/* --- HERO: THE CLOSER --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-40 pb-20 overflow-hidden">
        <div className="max-w-[1700px] mx-auto text-center space-y-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#00F0FF] text-[11px] font-black tracking-[0.8em] uppercase"
          >
            {t.hero.tag}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-[10rem] font-bold text-white uppercase italic leading-[0.85] tracking-[-0.08em]"
          >
            {t.hero.title.split('\n')[0]}<br />
            <span className="bg-gradient-to-r from-[#00F0FF] to-white bg-clip-text text-transparent italic">
              {t.hero.title.split('\n')[1]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 font-medium leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex justify-center gap-8 pt-8">
            <button className="px-12 py-6 bg-[#00F0FF] text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-md hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,240,255,0.4)]">
              {t.hero.cta}
            </button>
          </motion.div>

          <div className="pt-20 flex justify-center">
            <RevenueDashboard />
          </div>
        </div>
      </section>

      {/* --- FEATURES: THE PILLARS --- */}
      <section className="py-60 px-6 relative bg-[#030303]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-40 space-y-8">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
              {t.features.title.split('\n')[0]}<br />
              <span className="text-slate-700">{t.features.title.split('\n')[1]}</span>
            </h2>
            <p className="text-2xl text-slate-500 font-medium">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {t.features.items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 group hover:border-[#00F0FF]/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#00F0FF] mb-10 group-hover:bg-[#00F0FF] group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic mb-6">{item.title}</h3>
                <p className="text-xl text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE MATRIX: THE 13 PILLARS --- */}
      <section className="py-60 px-6 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-32 space-y-6">
            <span className="text-[#00F0FF] text-[10px] font-black tracking-[0.8em] uppercase">Functional Superiority</span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
              Absolute Alpha<br /><span className="text-slate-700">Feature Matrix</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Nex-Scan™ Neural Vision", "Closing Protocol 11.0", "Stripe Bridge v2", "Scarcity Engine™",
              "HBYS 12ms Sync", "Fintech Nexus API", "Lead Scoring Alpha", "GDPR Zero-Knowledge",
              "Aura Voice AI", "Multi-Currency Bridge", "Auto-Escrow System", "Nex-Report™ Insights",
              "24/7 Ops-Bot"
            ].map((feat, i) => (
              <div key={i} className="p-10 bg-white/[0.01] border border-white/5 rounded-3xl hover:bg-white/[0.03] hover:border-[#00F0FF]/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-[#00F0FF] rounded-full group-hover:shadow-[0_0_10px_#00F0FF]" />
                  <span className="text-[11px] font-black text-white uppercase tracking-widest">{feat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPARISON: THE DIVIDE --- */}
      <section className="py-60 px-6 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-px bg-white/5 rounded-[4rem] overflow-hidden border border-white/5">
            {/* Legacy World */}
            <div className="p-20 bg-black/60 backdrop-blur-3xl space-y-12 opacity-40 hover:opacity-100 transition-opacity group">
              <span className="text-[10px] font-black tracking-[0.5em] text-slate-600 uppercase">
                {t.comparison.old.title}
              </span>
              <div className="space-y-8">
                {t.comparison.old.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-6 text-2xl font-bold text-slate-700">
                    <X size={28} className="text-red-900/40" /> {it}
                  </div>
                ))}
              </div>
            </div>

            {/* Aura World */}
            <div className="p-20 bg-gradient-to-br from-[#00F0FF]/[0.05] to-transparent space-y-12 relative overflow-hidden group">
              <div className="absolute top-10 right-10 text-[10px] font-black text-[#00F0FF] tracking-widest animate-pulse">AURA ACTIVE</div>
              <span className="text-[10px] font-black tracking-[0.5em] text-[#00F0FF] uppercase">
                {t.comparison.aura.title}
              </span>
              <div className="space-y-8">
                {t.comparison.aura.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-6 text-2xl font-bold text-white italic drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    <CheckCircle2 size={28} className="text-[#00F0FF]" /> {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- METRICS: LIVE PERFORMANCE --- */}
      <section className="py-40 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-around items-center gap-20 text-center">
          {t.metrics.map((m, i) => (
            <div key={i} className="space-y-4 group">
              <div className="text-6xl md:text-8xl font-black text-white tracking-tighter shadow-white group-hover:text-[#00F0FF] transition-colors">
                {m.id === "count1" ? counts.closings : m.id === "count2" ? counts.revenue.toLocaleString() : m.value}
              </div>
              <div className="text-[10px] font-black text-slate-600 tracking-[0.8em] uppercase whitespace-nowrap">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AuraLayout>
  );
}
