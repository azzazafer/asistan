"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Shield, Zap, Globe, Menu, X, CheckCircle2, TrendingUp, Sparkles,
  ArrowUpRight, Cpu, BarChart3, Award, Compass, Database, Workflow, Activity, ChevronRight
} from "lucide-react";
import AuraLayout from "@/components/AuraLayout";

const CONTENT = {
  tr: {
    hero: {
      tag: "PRESTIGE ALPHA • V10.0",
      title: "Operasyonel Kontrolü\nEle Alın.",
      subtitle: "Dünyanın İlk Otonom Gelir Motoru ve Fintech Köprüsü. Aura OS, karmaşık sağlık turizmi süreçlerini %100 otonom bir kârlılık merkezine dönüştürür.",
      cta: "Performans Analizini Başlat"
    },
    reality: {
      title: "Pazar Liderliği",
      desc: "MeduAI ve diğer CRM sistemleri 'Süreç' yönetir. Aura OS 'Sonuç' üretir.",
      old: { title: "Konvansiyonel Sistemler", items: ["Düşük Yanıt Hızı", "Pasif Veri Tutma", "Manuel Hasta Takibi", "Öngörülemeyen Ciro"] },
      new: { title: "Aura Dominansı", items: ["12ms Senkronizasyon", "Otonom Satış Kapanışı", "Nex-Scan™ Teşhis AI", "Maksimum Capital ROI"] }
    },
    calc: {
      title: "Gelir Kaçağını Durdurun",
      desc: "Kliniğinizin veya acentenizin otonom sistem eksikliği nedeniyle kaybettiği yıllık ciro potansiyelini saniyeler içinde simüle edin.",
      placeholder: "Yıllık Lead Hacmi",
      btn: "Simülasyonu Çalıştır"
    }
  },
  en: {
    hero: {
      tag: "PRESTIGE ALPHA • V10.0",
      title: "Take Operational\nControl.",
      subtitle: "The World's First Autonomous Revenue Engine and Fintech Bridge. Aura OS transforms complex health tourism processes into a 100% autonomous profitability center.",
      cta: "Start Performance Analysis"
    },
    reality: {
      title: "Market Leadership",
      desc: "MeduAI and legacy CRMs manage 'Process'. Aura OS generates 'Results'.",
      old: { title: "Conventional Systems", items: ["Low Response Speed", "Passive Data Storage", "Manual Lead Tracking", "Unpredictable Revenue"] },
      new: { title: "Aura Dominance", items: ["12ms Synchronization", "Autonomous Sales Closing", "Nex-Scan™ Diagnostic AI", "Max Capital ROI"] }
    },
    calc: {
      title: "Stop Revenue Leakage",
      desc: "Simulate the annual revenue potential your clinic or agency loses due to lack of autonomous systems in seconds.",
      placeholder: "Annual Lead Volume",
      btn: "Run Simulation"
    }
  },
  ar: {
    hero: {
      tag: "PRESTIGE ALPHA • V10.0",
      title: "تولي التحكم\nالعملياتي.",
      subtitle: "أول محرك إيرادات وجسر مالي مستقل في العالم. أورا أوس يحول عمليات السياحة العلاجية المعقدة إلى مركز ربحية مستقل بنسبة 100٪.",
      cta: "بدأ تحليل الأداء"
    },
    reality: {
      title: "ريادة السوق",
      desc: "أنظمة MeduAI و CRM القديمة تدير 'العمليات'. أورا أوس يولد 'النتائج'.",
      old: { title: "الأنظمة التقليدية", items: ["سرعة استجابة منخفضة", "تخزين بيانات سلبي", "تتبع يدوي للعملاء", "إيرادات غير متوقعة"] },
      new: { title: "سيادة أورا", items: ["مزامنة 12ms", "إغلاق مبيعات ذاتي", "تشخيص Nex-Scan™ AI", "أقصى عائد على الاستثمار"] }
    },
    calc: {
      title: "أوقف تسرب الإيرادات",
      desc: "قم بمحاكاة الإيرادات السنوية المحتملة التي تفقدها عيادتك أو وكالتك بسبب نقص الأنظمة المستقلة في ثوانٍ.",
      placeholder: "حجم العملاء السنوي",
      btn: "شغل المحاكاة"
    }
  }
};

const PrestigeCore = () => (
  <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center pointer-events-none">
    <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-teal-500/5 blur-[120px] rounded-full animate-pulse" />
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} className="relative z-10 w-48 h-48 md:w-80 md:h-80 border border-white/5 rounded-full flex items-center justify-center p-4">
      <div className="absolute inset-0 border border-teal-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-4 border border-teal-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      <Brain size={100} className="text-teal-400/80 drop-shadow-[0_0_40px_rgba(0,240,255,0.4)]" />
    </motion.div>
  </div>
);

export default function PrestigePage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  return (
    <AuraLayout lang={lang} setLang={setLang}>
      {/* --- HERO: PRESTIGE AUTHORITY --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-[#050505]">
        {/* Dimmed Network Background */}
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img src="/images/global_nexus.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-teal-400 rounded-lg text-[9px] font-black uppercase tracking-[0.6em] border border-white/5">
              <Sparkles size={12} /> {t.hero.tag}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-[8rem] font-bold tracking-[-0.08em] leading-[0.85] text-white uppercase italic">
              {t.hero.title}
            </motion.h1>

            <div className="max-w-xl space-y-12">
              <p className="text-xl md:text-2xl text-[#B0B0B0] font-medium leading-relaxed border-l border-teal-500/40 pl-8">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="glass-btn px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 overflow-hidden relative group">
                  <span className="relative z-10 flex items-center gap-4">{t.hero.cta} <ArrowUpRight size={16} /></span>
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all">
                  Teknik Dokümantasyon
                </button>
              </div>
            </div>
          </div>

          <PrestigeCore />
        </div>
      </section>

      {/* --- DASHBOARD: THE 3D PRESTIGE --- */}
      <section className="py-40 px-6 bg-[#030303] overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
              <div className="text-teal-500 font-black uppercase tracking-[0.8em] text-[10px]">Financial Karargah</div>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] uppercase italic">GERÇEK ZAMANLI<br />GELİR AKIŞI.</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">Aura OS, tüm medikal operasyonları ve finansal hakedişleri 12ms hızında bir dijital vizyona dönüştürür. Karmaşa biter, kontrol başlar.</p>
              <div className="space-y-6 pt-8">
                {[
                  { label: "Otonom Takip", icon: <CheckCircle2 size={18} /> },
                  { label: "Finansal Güvenlik", icon: <Shield size={18} /> },
                  { label: "Global Ölçekleme", icon: <Globe size={18} /> }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/60">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">{item.icon}</div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Perspective Visual */}
            <div className="lg:col-span-7 relative order-1 lg:order-2">
              <motion.div initial={{ rotateY: 20, rotateX: 10 }} whileInView={{ rotateY: -15, rotateX: 5 }} transition={{ duration: 2 }} className="relative z-10 rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,240,255,0.15)] group">
                <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/aura_revenue_stream_dashboard_9_0_1769350040691.png" alt="Revenue Matrix" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
              </motion.div>
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* --- LEAD AUCTION: ASYMETRICAL GRID --- */}
      <section className="py-60 px-6 bg-[#050505] relative">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-teal-500/20 transition-all group overflow-hidden relative">
            <div className="relative z-10 space-y-10">
              <div className="w-20 h-20 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 font-bold">12ms</div>
              <h3 className="text-5xl md:text-7xl font-bold uppercase text-white tracking-tighter leading-none italic">NEX-SCAN™<br />CLOSING ENGINE</h3>
              <p className="text-xl text-[#B0B0B0] font-medium leading-relaxed max-w-xl">Hastanın niyetini, medikal verilerini ve ödeme gücünü saniyeler içinde analiz eden otonom bir nöro-satış motoru.</p>
              <Link href="/technology" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 hover:gap-6 transition-all">TEKNİK MİMARİ <ChevronRight size={14} /></Link>
            </div>
            <img src="/images/global_nexus.png" alt="" className="absolute -bottom-20 -right-20 w-1/2 opacity-5 group-hover:opacity-20 transition-all duration-1000 rotate-12" />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="p-12 rounded-[4rem] bg-teal-500 text-black shadow-3xl h-full flex flex-col justify-between">
              <Zap size={48} />
              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase leading-tight">YURTDIŞI SATIŞ OTONOMİSİ</h3>
                <p className="text-lg font-bold opacity-80">Gece gelen leadleri sıcak tutun ve operasyonel hıza hükmedin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRESTIGE CALCULATOR: INTEGRATED WIDGET --- */}
      <section className="py-40 px-6 bg-[#030303]">
        <div className="max-w-[1200px] mx-auto p-20 md:p-32 rounded-[6rem] bg-white/[0.01] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-teal-400 italic uppercase leading-[0.9]">{t.calc.title}</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">{t.calc.desc}</p>
            </div>
            <div className="space-y-8 p-12 bg-black/40 rounded-[3rem] border border-white/5 backdrop-blur-xl">
              <input type="text" placeholder={t.calc.placeholder} className="w-full px-10 py-8 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 font-bold uppercase tracking-widest text-xs" />
              <button className="w-full py-8 bg-teal-500 text-black rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-3xl hover:bg-teal-400 active:scale-95 transition-all">
                {t.calc.btn}
              </button>
              <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest text-center mt-4">Safe Room • AES-256 Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- REALITY CHECK: THE PRESTIGE PIVOT --- */}
      <section className="py-40 px-6 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-left mb-32 space-y-6">
            <h2 className="text-6xl md:text-[10rem] font-bold tracking-tighter text-white leading-none uppercase italic">{t.reality.title}</h2>
            <p className="text-2xl text-slate-600 max-w-2xl font-medium">{t.reality.desc}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/5 space-y-12 filter grayscale opacity-40 hover:opacity-100 transition-all hover:border-red-900/40 group">
              <h3 className="text-4xl font-black uppercase text-slate-700 group-hover:text-red-900 transition-colors">{t.reality.old.title}</h3>
              <div className="space-y-8">
                {t.reality.old.items.map(it => (
                  <div key={it} className="flex items-center gap-8 text-xl font-bold text-slate-800">
                    <X size={24} className="text-red-900/40" /> {it}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-16 rounded-[4rem] bg-teal-950/5 border border-teal-500/20 space-y-12 shadow-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 px-8 py-3 bg-teal-500 text-black text-[10px] font-black tracking-widest uppercase">Operational Supremacy</div>
              <h3 className="text-4xl font-black uppercase text-white">{t.reality.new.title}</h3>
              <div className="space-y-8 relative z-10">
                {t.reality.new.items.map(it => (
                  <div key={it} className="flex items-center gap-8 text-xl font-bold text-teal-400/80">
                    <CheckCircle2 size={24} className="text-teal-400" /> {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuraLayout>
  );
}
