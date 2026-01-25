"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain, Shield, Zap, Globe, Lock, Menu, X, Play, CheckCircle2, TrendingUp, Target, Sparkles,
  ArrowUpRight, DollarSign, Cpu, Fingerprint, BarChart3, Award, Compass, Eye, Server, Radio,
  HeartPulse, Stethoscope, ChevronDown, Activity, Layers, Database, Workflow
} from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";

// --- CYBERTRUCK CONFIG 9.0: APPLE-SPACEX STANDARDS ---
const CYBER_CONFIG = {
  colors: {
    void: "#050505",
    teal: "#00F0FF",
    orange: "#FF4500",
    platinum: "#E0E0E0",
    white: "#FFFFFF"
  },
  lang: ['tr', 'en', 'ar'] as const
};

const CONTENT = {
  tr: {
    hero: {
      tag: "CYBERTRUCK ALPHA • V9.0",
      title: "Klinik Yönetmeyi Bırakın.\nSatışı Kapatmaya Başlayın.",
      subtitle: "Dünyanın İlk Nöro-Satış Motoru ve Finansal Köprüsü. Randevu vermiyoruz, ciro üretiyoruz. Eski dünya CRM'lerini tarihe gömün.",
      cta: "Kayıp Cironuzu Hesaplayın"
    },
    reality: {
      title: "Gerçeklik Kontrolü",
      desc: "Rakiplerimiz (MeduAI, DocPlanner, CRM'ler) süreç satıyor. Biz 'Sonuç' satıyoruz.",
      old: { title: "Eski Dünya", items: ["Düşük Hız", "Sadece Randevu", "Manuel Lead Takibi", "Kayıp Ciro"] },
      new: { title: "Aura Dünyası", items: ["12ms Senkronizasyon", "Otonom Kapanış", "Nex-Scan™ Teşhis", "Maksimum ROI"] }
    }
  },
  en: {
    hero: {
      tag: "CYBERTRUCK ALPHA • V9.0",
      title: "Stop Managing Clinics.\nStart Closing Sales.",
      subtitle: "The World's First Neuro-Sales Engine and Financial Bridge. We don't book appointments, we generate revenue. Bury legacy CRMs in history.",
      cta: "Calculate Your Missed Revenue"
    },
    reality: {
      title: "Reality Check",
      desc: "Competitors (MeduAI, DocPlanner, CRMs) sell process. We sell 'Results'.",
      old: { title: "Old World", items: ["Low Speed", "Just Booking", "Manual Lead Tracking", "Lost Revenue"] },
      new: { title: "Aura World", items: ["12ms Sync", "Autonomous Closing", "Nex-Scan™ Diagnostics", "Max ROI"] }
    }
  },
  ar: {
    hero: {
      tag: "CYBERTRUCK ALPHA • V9.0",
      title: "توقف عن إدارة العيادات.\nابدأ في إغلاق المبيعات.",
      subtitle: "أول محرك مبيعات عصبي وجسر مالي في العالم. نحن لا نحجز مواعيد، نحن نولد إيرادات. ادفن أنظمة CRM القديمة في التاريخ.",
      cta: "احسب أرباحك المفقودة"
    },
    reality: {
      title: "فحص الواقع",
      desc: "المنافسون يبيعون العمليات. نحن نبيع 'النتائج'.",
      old: { title: "العالم القديم", items: ["سرعة منخفضة", "مجرد حجز", "تتبع يدوي", "خسارة الأرباح"] },
      new: { title: "عالم أورا", items: ["مزامنة 12ms", "إغلاق ذاتي", "تشخيص Nex-Scan™", "أقصى عائد"] }
    }
  }
};

// --- CYBER COMPONENTS ---

const NeuralCore = () => (
  <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center pointer-events-none">
    {/* Pulse Orbs */}
    <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" />
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative z-10 w-64 h-64 md:w-96 md:h-96 border-2 border-indigo-500/20 rounded-full flex items-center justify-center p-8">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-full h-full border-2 border-indigo-500/40 rounded-full flex items-center justify-center p-12">
        <Brain size={120} className="text-indigo-400 drop-shadow-[0_0_30px_rgba(79,70,229,1)]" />
      </motion.div>
      {/* Orbit Dots */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-3 h-3 bg-indigo-400 rounded-full blur-[2px]" style={{ transform: `rotate(${i * 45}deg) translateY(-180px)` }} />
      ))}
    </motion.div>
  </div>
);

export default function CybertruckPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  return (
    <AuraLayout lang={lang} setLang={setLang}>
      {/* --- HERO: THE CYBERTRUCK --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-40 pb-20 overflow-hidden bg-[#050505]">
        <div className="max-w-7xl mx-auto text-center relative z-10 w-full space-y-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-3 px-8 py-3 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.5em] border border-indigo-500/20">
            <Sparkles size={14} className="animate-pulse" /> {t.hero.tag}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.82] text-white uppercase italic drop-shadow-3xl">
            {t.hero.title}
          </motion.h1>

          <NeuralCore />

          <div className="max-w-4xl mx-auto space-y-12">
            <p className="text-2xl md:text-4xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-10 max-w-3xl mx-auto text-left">
              {t.hero.subtitle}
            </p>
            <button className="px-16 py-8 bg-indigo-600 text-white rounded-[4rem] text-sm font-black uppercase tracking-widest shadow-[0_45px_100px_-25px_rgba(79,70,229,0.8)] hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-4 group mx-auto">
              {t.hero.cta} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* --- REALITY CHECK: COMPETITIVE DESTRUCTION --- */}
      <section className="py-40 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none uppercase">{t.reality.title}</h2>
            <p className="text-2xl text-slate-500 max-w-2xl mx-auto font-medium">{t.reality.desc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* OLD WORLD */}
            <div className="p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 space-y-10 filter grayscale opacity-50">
              <h3 className="text-4xl font-black uppercase text-slate-600 border-b border-white/10 pb-6">{t.reality.old.title}</h3>
              <div className="space-y-6">
                {t.reality.old.items.map(it => (
                  <div key={it} className="flex items-center gap-6 text-xl font-black text-slate-700">
                    <X size={24} className="text-red-900" /> {it}
                  </div>
                ))}
              </div>
            </div>

            {/* AURA WORLD */}
            <div className="p-16 rounded-[4rem] bg-indigo-950/10 border border-indigo-500/30 space-y-10 shadow-3xl transform lg:scale-110 relative z-10 transition-transform hover:scale-[1.12]">
              <div className="absolute -top-10 -right-10 bg-indigo-600 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-widest animate-bounce">STRATEGIC DOMINANCE</div>
              <h3 className="text-4xl font-black uppercase text-white border-b border-white/10 pb-6">{t.reality.new.title}</h3>
              <div className="space-y-6">
                {t.reality.new.items.map(it => (
                  <div key={it} className="flex items-center gap-6 text-xl font-black text-indigo-400">
                    <CheckCircle2 size={24} className="text-indigo-400" /> {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD MATRIX: GLASSMORPHISM UI --- */}
      <section className="py-40 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-none uppercase italic drop-shadow-3xl">THE MATRIX UI</h2>
            <p className="text-indigo-500 font-black uppercase tracking-[1em] text-[12px]">Gerçek Zamanlı Gelir Akışı</p>
          </div>
          <div className="relative rounded-[6rem] overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-indigo-600/5 z-0" />
            <img src="/images/aura_revenue_stream_dashboard_9_0_1769350040691.png" alt="Revenue Matrix" className="w-full h-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3000ms]" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-20 text-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-5xl font-black text-white mb-8 block uppercase tracking-tighter">OMNICHANNEL COMMAND</h3>
              <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full shadow-3xl">CANLI SİMÜLASYON İZLE</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCARCITY FUNNEL: THE LOSS CALC --- */}
      <section className="py-60 px-6 bg-indigo-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 blur-[200px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase italic border-b-4 border-white/20 pb-10">CIRO KAYBINI GÖR.</h2>
          <p className="text-3xl font-black uppercase tracking-[0.3em]">Hemen Şimdi Ücretsiz Bir Aura-Kök Neden Analizi Yaptırın.</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center scale-125 pt-20">
            <input type="text" placeholder="KLİNİK ADI/URL" className="px-10 py-8 bg-black/20 border-2 border-white/30 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-white font-black uppercase tracking-widest text-sm min-w-[300px]" />
            <button className="px-16 py-8 bg-white text-indigo-600 rounded-full text-sm font-black uppercase tracking-widest shadow-3xl hover:bg-black hover:text-white transition-all">ANALİZE BAŞLA</button>
          </div>
        </div>
      </section>
    </AuraLayout>
  );
}
