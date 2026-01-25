"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Activity,
  Globe,
  BrainCircuit,
  MessageSquare,
  Instagram,
  Send,
  User,
  LayoutDashboard,
  Brain,
  Layers,
  PieChart,
  Lock,
  ArrowRight,
  Play,
  Stethoscope,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Users,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  Cpu,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { useChat } from 'ai/react';

// --- PREMIUM TRANSLATIONS ---
const CONTENT = {
  tr: {
    nav: { dashboard: "Dashboard", getStarted: "Hemen Başla" },
    hero: {
      tag: "SAĞLIK TURİZMİNDE 2026 STANDARDI",
      title: "Kliniklerin Dijital Sinir Sistemi",
      subtitle: "Chatbotlardan kurtulun. Aura OS; hasta temasından tıbbi analize, tekliflendirmeden in-chat ödemeye kadar tüm operasyonu yöneten otonom bir büyüme katmanıdır.",
      ctaPrimary: "Canlı Demoyu Gör",
      ctaSecondary: "Aura Vision™'ı İzle"
    },
    funnel: {
      title: "Kaostan Nakit Akışına",
      subtitle: "Dağınık mesaj kanallarını tek bir yapay zeka ile profesyonel bir satış makinesine dönüştürün.",
      step1: { title: "Omnichannel Yakalama", desc: "WhatsApp, IG ve Telegram mesajlarını anında analiz eder, niyet puanlaması yapar." },
      step2: { title: "Vortex Vision™ Analizi", desc: "Hastanın gönderdiği görselleri cerrahi hassasiyetle analiz ederek tıbbi güven inşa eder." },
      step3: { title: "Neural Pay™ Kapanış", desc: "Satışın zirvesinde ödeme linkini oluşturur ve depozitoyu saniyeler içinde tahsil eder." }
    },
    features: {
      title: "Neden Aura OS?",
      items: [
        { title: "7/24 Otonom Satış", desc: "Siz uyurken Aura leadsleri sıcak tutar ve randevuya dönüştürür." },
        { title: "Kültürel Aynalama", desc: "Global pazarlar için tonlamasını ve ikna dilini otomatik ayarlar." },
        { title: "Loyalty Shield", desc: "Hastanın dışarı sızmasını engeller, kliniğinizin değerini vurgular." }
      ]
    },
    stats: { conversion: "Kayıp Leadleri Yakala", revenue: "Gelir Artışı", speed: "Yanıt Hızı" }
  },
  en: {
    nav: { dashboard: "Dashboard", getStarted: "Get Started" },
    hero: {
      tag: "THE 2026 HEALTH TOURISM STANDARD",
      title: "The Digital Nervous System for Clinics",
      subtitle: "Move beyond chatbots. Aura OS is an autonomous growth layer managing everything from patient contact to medical analysis and in-chat payments.",
      ctaPrimary: "Watch Live Demo",
      ctaSecondary: "Explore Aura Vision™"
    },
    funnel: {
      title: "From Chaos to Cash Flow",
      subtitle: "Convert scattered messaging channels into a professional sales machine with a single AI.",
      step1: { title: "Omnichannel Capture", desc: "Instantly analyzes WA, IG, and Telegram messages with intent scoring." },
      step2: { title: "Vortex Vision™ Analysis", desc: "Analyzes patient photos with surgical precision to build medical trust." },
      step3: { title: "Neural Pay™ Closing", desc: "Generates payment links at the peak of the sales cycle and collects deposits instantly." }
    },
    features: {
      title: "Why Aura OS?",
      items: [
        { title: "24/7 Autonomous Sales", desc: "Aura keeps leads hot and converts them into appointments while you sleep." },
        { title: "Cultural Mirroring", desc: "Automatically adjusts tone and persuasion for global markets." },
        { title: "Loyalty Shield", desc: "Prevents lead leakage by emphasizing your clinic's unique value." }
      ]
    },
    stats: { conversion: "Recover Lost Leads", revenue: "Revenue Growth", speed: "Response Speed" }
  },
  ar: {
    nav: { dashboard: "لوحة التحكم", getStarted: "ابدأ الآن" },
    hero: {
      tag: "معيار السياحة العلاجية 2026",
      title: "الجهاز العصبي الرقمي للعيادات",
      subtitle: "تجاوز روبوتات الدردشة. Aura OS هي طبقة نمو ذاتية تدير كل شيء من اتصال المريض إلى التحليل الطبي والمدفوعات داخل الدردشة.",
      ctaPrimary: "شاهد العرض المباشر",
      ctaSecondary: "اكتشف Aura Vision™"
    },
    funnel: {
      title: "من الفوضى إلى التدفق النقدي",
      subtitle: "حول قنوات المراسلة المشتتة إلى آلة مبيعات احترافية باستخدام ذكاء اصطناعي واحد.",
      step1: { title: "الالتقاط متعدد القنوات", desc: "يحلل رسائل WA و IG و Telegram فوراً مع تسجيل النوايا." },
      step2: { title: "تحليل Vortex Vision™", desc: "يحلل صور المرضى بدقة جراحية لبناء الثقة الطبية." },
      step3: { title: "إغلاق Neural Pay™", desc: "ينشئ روابط الدفع في ذروة دورة المبيعات ويحصل الودائع فوراً." }
    },
    features: {
      title: "لماذا Aura OS؟",
      items: [
        { title: "مبيعات ذاتية 24/7", desc: "أورا تبقي العملاء مهتمين وتحولهم إلى مواعيد أثناء نومك." },
        { title: "المحاكاة الثقافية", desc: "يعدل النبرة والإقناع تلقائياً للأسواق العالمية." },
        { title: "درع الولاء", desc: "يمنع تسرب العملاء من خلال التأكيد على القيمة الفريدة لعيادتك." }
      ]
    },
    stats: { conversion: "استعادة المفقودين", revenue: "نمو الإيرادات", speed: "سرعة الرد" }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 ${isRTL ? 'text-right font-arabic' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* --- REFINED AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-600/5 rounded-full blur-[180px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-violet-600/10 rounded-full blur-[150px]" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #333 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* --- SPACIAL NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl px-8 h-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Brain size={28} className="relative z-10" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic py-1">
              Aura <span className="text-indigo-400">OS</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-2 bg-white/[0.05] p-1.5 rounded-2xl border border-white/[0.05]">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${lang === l ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link href="/dashboard" className="text-[11px] font-black text-slate-400 hover:text-indigo-400 transition-all uppercase tracking-widest flex items-center gap-2 group">
              <LayoutDashboard size={16} className="group-hover:rotate-12 transition-transform" /> {t.nav.dashboard}
            </Link>
            <button className="bg-white text-black px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95">
              {t.nav.getStarted}
            </button>
          </div>

          <button className="lg:hidden p-3 bg-white/5 rounded-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- IMMERSIVE HERO --- */}
      <section className="relative pt-52 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-12 border border-indigo-500/20 backdrop-blur-md shadow-[0_0_40px_rgba(99,102,241,0.15)]"
          >
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
            {t.hero.tag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-10 max-w-5xl bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mb-16 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <button className="px-14 py-7 bg-indigo-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-[0_25px_60px_-15px_rgba(79,70,229,0.5)] hover:scale-105 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95">
              {t.hero.ctaPrimary} <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <button className="px-14 py-7 bg-white/5 border border-white/10 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 backdrop-blur-sm group">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                <Play size={18} fill="currentColor" />
              </div>
              {t.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* --- HIGH-END DASH MOCKUP --- */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 w-full max-w-7xl relative"
          >
            <div className="absolute inset-0 bg-indigo-600/30 blur-[150px] rounded-full opacity-50" />
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 p-5 rounded-[3.5rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Inner Border Glow */}
              <div className="absolute inset-0 border border-white/5 rounded-[3.5rem] pointer-events-none" />

              <div className="bg-[#050505] rounded-[2.5rem] overflow-hidden aspect-[21/9] border border-white/5 flex shadow-inner">
                {/* Mock Sidebar */}
                <div className="w-24 border-r border-white/5 p-6 flex flex-col items-center gap-8 bg-black/40">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-xl" />
                  <div className="space-y-6">
                    {[Monitor, Activity, MessageSquare, Users, TrendingUp].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
                        <Icon size={20} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mock Content */}
                <div className="flex-1 p-10 flex flex-col">
                  <div className="flex justify-between items-center mb-12">
                    <div className="space-y-2">
                      <div className="h-4 w-48 bg-white/10 rounded-full" />
                      <div className="h-10 w-64 bg-white/5 rounded-2xl" />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10" />
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-8 flex-1">
                    <div className="col-span-8 space-y-8">
                      <div className="h-64 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute top-8 left-8 space-y-2">
                          <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest text-left">Revenue Forecast</div>
                          <div className="text-3xl font-black text-left">$142,500.00</div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 h-32 opacity-20">
                          <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d">
                            <path d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10" fill="none" stroke="currentColor" strokeWidth="4" className="text-indigo-500" />
                          </svg>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="h-40 bg-white/5 rounded-[2rem] border border-white/5 p-6 flex flex-col justify-between">
                          <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                            <CheckCircle2 size={20} />
                          </div>
                          <div className="text-right text-2xl font-black">98.2%</div>
                        </div>
                        <div className="h-40 bg-white/5 rounded-[2rem] border border-white/5 p-6 flex flex-col justify-between">
                          <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center">
                            <Clock size={20} />
                          </div>
                          <div className="text-right text-2xl font-black">0.4s</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4 bg-white/[0.03] rounded-[2.5rem] border border-white/5 p-8">
                      <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-8 text-left">Live Cognitive Flow</div>
                      <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-4 items-center animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                              <Activity size={16} />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                              <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- NEURAL FUNNEL: 1-2-3 --- */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">{t.funnel.title}</h2>
              <p className="text-slate-400 text-lg font-medium">{t.funnel.subtitle}</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-12 mb-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: t.funnel.step1, icon: <Layers size={32} />, color: 'from-blue-600 to-indigo-600' },
              { step: t.funnel.step2, icon: <BrainCircuit size={32} />, color: 'from-indigo-600 to-violet-600', highlight: true },
              { step: t.funnel.step3, icon: <Lock size={32} />, color: 'from-violet-600 to-fuchsia-600' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className={`group p-10 rounded-[3rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-3xl relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)]`}
              >
                {item.highlight && (
                  <div className="absolute top-10 right-10 bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-500/30">
                    Proprietary Tech
                  </div>
                )}

                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{item.step.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">{item.step.desc}</p>

                {/* Visual Connector for funnel */}
                {i < 2 && (
                  <div className="hidden md:block absolute -right-10 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={40} className={`text-white/10 ${isRTL ? 'rotate-180 -translate-x-full' : ''}`} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VORTEX VISION DEEP DIVE --- */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto rounded-[5rem] bg-gradient-to-b from-white/[0.03] to-transparent p-12 md:p-32 border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-indigo-600/5 blur-[120px] -z-10" />

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-500/20">
                <Cpu size={14} /> Intelligence Core
              </div>
              <h2 className="text-5xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter">
                Vortex Vision™:<br />Digital Surgeon.
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">
                Analyze patient cases with aerospace precision. Automated dental mapping, graft estimation, and surgical planning—all before the patient even says 'hello'.
              </p>
              <div className="space-y-6">
                {[
                  "99.4% AI Diagnostic Accuracy",
                  "Automated Patient Scoring Matrix",
                  "Real-time CRM Auto-Enrichment"
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-5 font-black text-sm uppercase tracking-widest text-white/80">
                    <CheckCircle2 size={24} className="text-indigo-500" /> {feat}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] group-hover:blur-[130px] transition-all duration-700" />
              <div className="relative bg-black/80 rounded-[4rem] p-6 border border-white/10 shadow-2xl overflow-hidden aspect-[4/5]">
                <div className="h-full w-full bg-slate-900/60 rounded-[3rem] relative overflow-hidden">
                  {/* Scanning Line Animation */}
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-1 bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.8)] z-20"
                  />

                  <div className="absolute inset-0 flex flex-col p-10 justify-between">
                    <div className="flex justify-between items-start">
                      <div className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                        <Activity size={14} className="animate-pulse" /> Scanning Patient Data...
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 flex items-center justify-center font-black text-lg">95%</div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-8 w-3/4 bg-white/10 rounded-xl" />
                      <div className="p-6 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/30 flex flex-col gap-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Analysis Result:</div>
                        <div className="text-xl font-bold tracking-tight">NW7 Pattern - High Viability</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVENUE STATS --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { label: t.stats.conversion, value: "+42%", desc: "Conversion Boost" },
            { label: t.stats.revenue, value: "3.5X", desc: "ROAS Optimization" },
            { label: t.stats.speed, value: "< 1s", desc: "AI Decisioning" }
          ].map((stat, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              <div className="text-6xl font-black mb-4 tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">{stat.label}</div>
              <div className="text-slate-500 font-medium">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- GLOBAL FOOTER --- */}
      <footer className="py-32 px-6 border-t border-white/5 relative bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain size={28} />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">Aura <span className="text-indigo-400">OS</span></span>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Autonomous Revenue Infrastructure v3.0</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {["Vision", "Infrastructure", "Security", "Pricing"].map(item => (
              <Link key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">{item}</Link>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all hover:bg-white/5 cursor-pointer">
              <Globe size={20} />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 text-center border-t border-white/5 pt-12">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">© 2026 Aura OS Galactic Operations Hub - All Systems Nominal.</p>
        </div>
      </footer>

      {/* Custom Styles for RTL & Arabic font fallback */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        .font-arabic {
          font-family: 'Inter', system-ui, -apple-system, sans-serif; /* Replace with premium Arabic font if available */
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
