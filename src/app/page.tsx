"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Activity,
  ChevronRight,
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
  Strikethrough,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useChat } from 'ai/react';

// --- TRANSLATIONS ---
const CONTENT = {
  tr: {
    hero: {
      tag: "SAĞLIK TURİZMİNDE GELECEK",
      title: "Kliniklerin Dijital Sinir Sistemi",
      subtitle: "Bir chatbot değil; hasta temasından tıbbi analize, tekliflendirmeden ödemeye kadar tüm süreci yöneten akıllı bir operasyon altyapısı.",
      ctaPrimary: "Demo Talep Edin",
      ctaSecondary: "Aura Vision™'ı Keşfet"
    },
    funnel: {
      title: "Kaostan Düzene Geçiş",
      subtitle: "Dağınık kanalları tek bir zeka ile yönetin, verimliliği %40 artırın.",
      step1: {
        title: "1. Toplama & Anlama",
        desc: "WhatsApp, Instagram ve Telegram'dan gelen her mesajı anında yakalar, hastanın niyetini ve aciliyetini analiz eder."
      },
      step2: {
        title: "2. Vortex Vision™ Analizi",
        desc: "Hastanın gönderdiği fotoğrafları cerrahi hassasiyetle analiz ederek tıbbi güven inşa eder. (MeduAI'da bulunmayan özel teknoloji)."
      },
      step3: {
        title: "3. Neural Pay™ Kapanış",
        desc: "Satışın en sıcak olduğu anda ödeme linkini oluşturur ve depozitoyu in-chat olarak tahsil eder."
      }
    },
    features: {
      title: "Neden Aura OS?",
      items: [
        { title: "7/24 Otonom Satış", desc: "Siz uyurken Aura leadsleri sıcak tutar ve randevuya dönüştürür." },
        { title: "Kültürel Aynalama", desc: "Avrupa, Orta Doğu ve Global pazarlar için tonlamasını otomatik ayarlar." },
        { title: "Loyalty Shield", desc: "Hastanın dışarı sızmasını engeller, Aura garantisini vurgular." }
      ]
    }
  },
  en: {
    hero: {
      tag: "FUTURE OF HEALTH TOURISM",
      title: "The Digital Nervous System for Clinics",
      subtitle: "Not just a chatbot; it's an intelligent operation infrastructure managing everything from patient contact to medical analysis and in-chat payments.",
      ctaPrimary: "Request Demo",
      ctaSecondary: "Explore Aura Vision™"
    },
    funnel: {
      title: "From Chaos to Order",
      subtitle: "Manage scattered channels with a single intelligence, boost efficiency by 40%.",
      step1: {
        title: "1. Collect & Understand",
        desc: "Captures every message from WA, IG, and Telegram instantly, analyzing patient intent and urgency."
      },
      step2: {
        title: "2. Vortex Vision™ Analysis",
        desc: "Analyzes patient photos with surgical precision to build medical trust. (Exclusive technology not in MeduAI)."
      },
      step3: {
        title: "3. Neural Pay™ Closing",
        desc: "Generates payment links and collects deposits in-chat at the peak of the sales cycle."
      }
    },
    features: {
      title: "Why Aura OS?",
      items: [
        { title: "24/7 Autonomous Sales", desc: "Aura keeps leads hot and converts them into appointments while you sleep." },
        { title: "Cultural Mirroring", desc: "Automatically adjusts tone for Europe, Middle East, and Global markets." },
        { title: "Loyalty Shield", desc: "Prevents lead leakage by emphasizing Aura-exclusive surgical guarantees." }
      ]
    }
  },
  ar: {
    hero: {
      tag: "مستقبل السياحة العلاجية",
      title: "الجهاز العصبي الرقمي للعيادات",
      subtitle: "ليس مجرد روبوت محادثة؛ إنها بنية تحتية ذكية للعمليات تدير كل شيء من اتصال المريض إلى التحليل الطبي والمدفوعات داخل الدردشة.",
      ctaPrimary: "اطلب عرضاً توضيحياً",
      ctaSecondary: "اكتشف Aura Vision™"
    },
    funnel: {
      title: "من الفوضى إلى النظام",
      subtitle: "أدر قنواتك المتفرقة بذكاء واحد، ارفع الكفاءة بنسبة 40%.",
      step1: {
        title: "1. الجمع والفهم",
        desc: "يلتقط كل رسالة من WhatsApp و Instagram و Telegram على الفور، ويحلل نية المريض ومدى الإلحاح."
      },
      step2: {
        title: "2. تحليل Vortex Vision™",
        desc: "يحلل صور المريض بدقة جراحية لبناء الثقة الطبية. (تقنية حصرية غير موجودة في MeduAI)."
      },
      step3: {
        title: "3. إغلاق Neural Pay™",
        desc: "يولد روابط الدفع ويحصل الودائع داخل الدردشة في ذروة دورة المبيعات."
      }
    },
    features: {
      title: "لماذا Aura OS؟",
      items: [
        { title: "مبيعات ذاتية 24/7", desc: "تبقي أورا العملاء مهتمين وتحولهم إلى مواعيد أثناء نومك." },
        { title: "المحاكاة الثقافية", desc: "يعدل النبرة تلقائياً لأسواق أوروبا والشرق الأوسط والأسواق العالمية." },
        { title: "درع الولاء", desc: "يمنع تسرب العملاء من خلال التأكيد على ضمانات أورا الجراحية الحصرية." }
      ]
    }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* --- NEURAL MESH BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-50 rounded-full blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#4F46E2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Brain size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Aura <span className="text-indigo-600">OS</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-2">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-indigo-100"
          >
            <Sparkles size={14} /> {t.hero.tag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8 max-w-4xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="px-12 py-6 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl hover:scale-105 hover:bg-indigo-700 transition-all">
              {t.hero.ctaPrimary}
            </button>
            <button className="px-12 py-6 bg-white border border-slate-200 text-slate-900 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Play size={16} fill="currentColor" /> {t.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* Dash Görüntüsü / Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 w-full max-w-6xl relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="bg-white/50 backdrop-blur-2xl border border-white p-4 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
              <div className="bg-slate-50/80 rounded-[2rem] overflow-hidden border border-slate-200/50 aspect-video flex flex-col">
                <div className="h-10 border-b border-slate-200/50 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 flex justify-center">
                    <div className="bg-slate-200/50 h-5 w-40 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-3">
                        <Users size={20} />
                      </div>
                      <div className="h-4 w-20 bg-slate-100 rounded mb-2" />
                      <div className="h-6 w-12 bg-indigo-100 rounded" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-3">
                        <PieChart size={20} />
                      </div>
                      <div className="h-4 w-20 bg-slate-100 rounded mb-2" />
                      <div className="h-6 w-12 bg-emerald-100 rounded" />
                    </div>
                  </div>
                  <div className="col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-6 w-40 bg-slate-100 rounded-full" />
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100" />
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/3 bg-slate-100 rounded" />
                            <div className="h-3 w-2/3 bg-slate-50 rounded" />
                          </div>
                          <div className="w-20 h-8 rounded-full bg-indigo-50 text-[10px] font-black text-indigo-600 flex items-center justify-center uppercase">CLOSING</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FUNNEL SECTION (Medu Killer) --- */}
      <section className="py-32 px-6 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{t.funnel.title}</h2>
            <p className="text-slate-500 font-bold max-w-xl mx-auto uppercase tracking-widest text-xs">{t.funnel.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: t.funnel.step1, icon: <Layers />, color: 'bg-indigo-600' },
              { step: t.funnel.step2, icon: <BrainCircuit />, color: 'bg-indigo-600', highlight: true },
              { step: t.funnel.step3, icon: <Lock />, color: 'bg-indigo-600' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.02)] border ${item.highlight ? 'border-indigo-600' : 'border-slate-100'} relative overflow-hidden`}
              >
                {item.highlight && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">Aura Exclusive</div>
                  </div>
                )}
                <div className={`w-16 h-16 ${item.color} text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl shadow-indigo-200`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AURA VISION DISPLAY --- */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px]" />
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-white/10 backdrop-blur-sm">
                <Sparkles size={14} className="text-indigo-400" /> VORTEX VISION™
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                Surgical-Grade AI Diagnostics.
              </h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
                Analyze patient photos with deep-learning neural networks. From graft estimation to dental symmetry, Aura OS creates professional medical reports instantly to build unwavering trust before the first call.
              </p>
              <div className="space-y-4">
                {[
                  "98% Accuracy in Hair Density Analysis",
                  "Instant Dental Symmetry Mapping",
                  "Automated CRM Lead Enrichment",
                  "Hyper-Personalized Treatment Paths"
                ].map(feat => (
                  <div key={feat} className="flex items-center gap-4 text-white font-bold text-sm tracking-tight">
                    <CheckCircle2 size={18} className="text-indigo-400" /> {feat}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-4 border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-slate-800 rounded-[2.5rem] overflow-hidden aspect-[4/5] relative">
                  {/* Mock Analysis UI */}
                  <div className="absolute inset-0 flex flex-col p-8">
                    <div className="flex justify-between mb-auto">
                      <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                        <Activity size={12} /> SCANNING
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-indigo-400 flex items-center justify-center text-white font-black text-xs">95%</div>
                    </div>
                    <div className="space-y-4 text-white">
                      <div className="h-6 w-40 bg-white/20 rounded-full animate-pulse" />
                      <div className="h-10 w-full bg-indigo-500/30 rounded-2xl border border-indigo-400/50 flex items-center px-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Diagnosis: Class III Vertex</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Brain size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">Aura <span className="text-indigo-600">OS</span></span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Next-Gen Revenue Infrastructure</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["Product", "Marketplace", "Security", "Pricing"].map(item => (
              <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">{item}</Link>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <Globe size={18} />
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 text-center">
          <p className="text-slate-300 text-[8px] font-black uppercase tracking-[0.5em]">© 2026 Aura OS Galactic Operations Hub</p>
        </div>
      </footer>
    </div>
  );
}
