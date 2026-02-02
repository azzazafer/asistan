'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Globe, Shield, Activity, MessageSquare, BarChart3, CheckCircle2, ArrowRight, Lock, LayoutDashboard, Users, HeartPulse, TrendingUp, AlertTriangle, ChevronRight, PlayCircle, Camera, Brain, CreditCard, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const content = {
  tr: {
    nav: { features: "Özellikler", panels: "Paneller", why: "Neden Aura?", login: "Giriş" },
    hero: {
      badge: "Yapay Zeka Motoru v0.9 (Beta)",
      title: "Kliniğinizin Dijital Beyni.",
      subtitle: "Sekreteriniz 18:00'de çıkar, Aura OS 7/24 nöbet tutar. Röntgen okur, randevu satar.",
      cta_primary: "WhatsApp'ta Dene",
      cta_secondary: "Kayıp Ciro Hesabı"
    },
    trust: {
      caption: "Dünyanın en gelişmiş altyapısı ile çalışır"
    },
    howitworks: {
      title: "Nasıl Çalışır?",
      subtitle: "3 basit adımda yapay zeka ile randevu satışı",
      step1_title: "Hasta Fotoğraf Atar",
      step1_desc: "WhatsApp üzerinden röntgen veya ağız fotoğrafı",
      step2_title: "Aura Analiz Eder & Fiyatlar",
      step3_desc: "Kapora alınır, randevu sisteme yazılır"
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      q1: "Mevcut hasta programımla (HBYS) çakışır mı?",
      a1: "Hayır, Aura bağımsız çalışır veya isterse entegre olur. Mevcut sisteminizi bozmaz.",
      q2: "Yapay zeka hata yaparsa?",
      a2: "Aura sadece 'Öneri' sunar, son onay her zaman sizindir. Beta döneminde ek koruma altındasınız.",
      q3: "Kapora ödemesi güvenli mi?",
      a3: "Stripe altyapısı kullanır. Askeri düzeyde şifrelidir, biz para tutmayız."
    },
    mobileCta: "WhatsApp'ta Canlı Dene",
    pain: {
      title: "Gerçekle Yüzleşin",
      stat: "Her Gün %30 Ciro Kaybı",
      desc: "Telefonu açamayan sekreter, cevaplanmayan DM'ler... Rakipleriniz yapay zeka ile hastaları toplarken siz izlemeyin."
    },
    tabs: { clinic: "Klinik Paneli", agency: "Ajans Modu", patient: "Hasta Deneyimi" },
    features: {
      vision_title: "Röntgen Vizyonu",
      vision_desc: "GPT-4o Vision ile diş çürüklerini 9 saniyede tespit eder.",
      sales_title: "Nöro-Satış İknası",
      sales_desc: "Sadece cevap vermez. FOMO (Kaybetme Korkusu) kullanarak satışı kapatır.",
      security_title: "KVKK & Güvenlik",
      security_desc: "Verileriniz askeri düzeyde şifrelenir. Asla paylaşılmaz."
    },
    footer: { text: "2026 Aura OS. Tüm hakları saklıdır." }
  },
  en: {
    nav: { features: "Features", panels: "Dashboards", why: "Why Aura?", login: "Login" },
    hero: {
      badge: "AI Engine v0.9 (Beta)",
      title: "Digital Brain of Your Clinic.",
      subtitle: "Your secretary leaves at 6 PM. Aura OS stays 24/7. Reads X-Rays, sells appointments.",
      cta_primary: "Try on WhatsApp",
      cta_secondary: "Calc Lost Revenue"
    },
    trust: {
      caption: "Powered by the world's most advanced infrastructure"
    },
    howitworks: {
      title: "How It Works?",
      subtitle: "3 simple steps to AI-powered appointment sales",
      step1_title: "Patient Sends Photo",
      step1_desc: "X-ray or oral photo via WhatsApp",
      step2_title: "Aura Analyzes & Prices",
      step2_desc: "AI detects issues, quotes treatment price",
      step3_title: "Deposit & Booking",
      step3_desc: "Deposit collected, appointment scheduled"
    },
    faq: {
      title: "Frequently Asked Questions",
      q1: "Does it conflict with my existing system (HIS)?",
      a1: "No, Aura works independently or integrates if needed. Won't disrupt your current setup.",
      q2: "What if AI makes a mistake?",
      a2: "Aura only suggests. Final approval is always yours. Extra protection during Beta.",
      q3: "Is deposit payment secure?",
      a3: "Uses Stripe infrastructure. Military-grade encryption, we don't hold funds."
    },
    mobileCta: "Try Live on WhatsApp",
    pain: {
      title: "Face the Reality",
      stat: "30% Revenue Loss Daily",
      desc: "Missed calls, unanswered DMs... Don't watch while competitors steal patients with AI."
    },
    tabs: { clinic: "Clinic View", agency: "Agency Mode", patient: "Patient Exp" },
    features: {
      vision_title: "X-Ray Vision",
      vision_desc: "Detects cavities in 9 seconds using GPT-4o Vision.",
      sales_title: "Neuro-Sales Persuasion",
      sales_desc: "Doesn't just reply. Closes sales using FOMO psychology.",
      security_title: "GDPR & Security",
      security_desc: "Military-grade encryption. Data never shared."
    },
    footer: { text: "2026 Aura OS. All rights reserved." }
  },
  ar: {
    nav: { features: "المميزات", panels: "لوحات التحكم", why: "لماذا أورا؟", login: "دخول" },
    hero: {
      badge: "محرك الذكاء الاصطناعي v0.9 (بيتا)",
      title: "العقل الرقمي لعيادتك.",
      subtitle: "سكرتيرتك تغادر في 6 مساءً. أورا يعمل 24/7. يقرأ الأشعة ويبيع المواعيد.",
      cta_primary: "جرب عبر واتساب",
      cta_secondary: "حساب الخسائر"
    },
    trust: {
      caption: "مدعوم بأحدث البنية التحتية في العالم"
    },
    howitworks: {
      title: "كيف يعمل؟",
      subtitle: "3 خطوات بسيطة لبيع المواعيد بالذكاء الاصطناعي",
      step1_title: "المريض يرسل صورة",
      step1_desc: "أشعة أو صورة فم عبر واتساب",
      step2_title: "أورا يحلل ويسعّر",
      step2_desc: "الذكاء يكتشف المشاكل ويعرض السعر",
      step3_title: "عربون وحجز",
      step3_desc: "يتم تحصيل العربون وجدولة الموعد"
    },
    faq: {
      title: "الأسئلة الشائعة",
      q1: "هل يتعارض مع نظام المرضى الحالي؟",
      a1: "لا، أورا يعمل بشكل مستقل أو يتكامل عند الحاجة. لن يعطل نظامك.",
      q2: "ماذا لو أخطأ الذكاء الاصطناعي؟",
      a2: "أورا يقترح فقط. الموافقة النهائية دائماً لك. حماية إضافية في فترة البيتا.",
      q3: "هل دفع العربون آمن؟",
      a3: "يستخدم Stripe. تشفير عسكري، نحن لا نحتفظ بالأموال."
    },
    mobileCta: "جرب مباشرة على واتساب",
    pain: {
      title: "واجه الحقيقة",
      stat: "خسارة 30٪ من الدخل يومياً",
      desc: "المكالمات الفائتة، الرسائل غير المجابة... لا تشاهد المنافسين يسرقون المرضى بالذكاء الاصطناعي."
    },
    tabs: { clinic: "لوحة العيادة", agency: "وضع الوكالة", patient: "تجربة المريض" },
    features: {
      vision_title: "رؤية الأشعة السينية",
      vision_desc: "يكتشف التسوس في 9 ثوانٍ باستخدام GPT-4o.",
      sales_title: "إقناع المبيعات العصبي",
      sales_desc: "لا يرد فقط. يغلق المبيعات باستخدام علم النفس.",
      security_title: "الأمان والخصوصية",
      security_desc: "تشفير عسكري. لا يتم مشاركة البيانات أبداً."
    },
    footer: { text: "2026 Aura OS. جميع الحقوق محفوظة." }
  }
};

export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [activeTab, setActiveTab] = useState<'clinic' | 'agency' | 'patient'>('clinic');
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = content[lang];
  const isRTL = lang === 'ar';
  const whatsappNumber = "905510596718";

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden ${isRTL ? 'font-arabic' : ''}`}>

      {/* AURORA BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px]" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" style={{ animation: 'pulse-slow 3s ease-in-out infinite', animationDelay: '1s' }}></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="absolute inset-0 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center border border-white/10">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none">AURA OS</span>
              <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">Autonomous</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.features}</a>
            <a href="#panels" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.panels}</a>
            <a href="#pain" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.why}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${lang === l ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'text-gray-500 hover:text-white'}`}>
                  {l}
                </button>
              ))}
            </div>
            <Link href={`https://wa.me/${whatsappNumber}`} className="group relative overflow-hidden bg-white text-black px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                {t.nav.login} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <main className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : (isRTL ? 'translate-x-20 opacity-0' : '-translate-x-20 opacity-0')}`}>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-medium backdrop-blur-sm" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              {t.hero.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              <span className="block">{t.hero.title.split(' ')[0]}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 3s ease infinite' }}>
                {t.hero.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed border-l-2 border-white/10 pl-6">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={`https://wa.me/${whatsappNumber}`} className="group relative flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95" style={{ boxShadow: '0 0 40px rgba(6,182,212,0.3)' }}>
                <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {t.hero.cta_primary}
              </Link>
              <button className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-medium transition-all backdrop-blur-sm">
                <BarChart3 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                {t.hero.cta_secondary}
              </button>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-[80px]" style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}></div>

            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-1 shadow-2xl ring-1 ring-white/5 transform hover:scale-[1.02] transition-transform duration-500">

              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40 rounded-t-[20px]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                </div>
                <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/5 text-[10px] text-gray-500 font-mono">
                  <Lock className="w-2.5 h-2.5" /> app.auraos.ai
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors group">
                    <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">₺45,250</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <div className="text-xs text-gray-500 mb-1">Conversion</div>
                    <div className="text-2xl font-bold text-green-400">%87.4</div>
                  </div>
                </div>

                <div className="bg-black/40 rounded-2xl border border-white/5 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Live Analysis: Patient #8921
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-2 bg-gray-800 rounded w-1/3 animate-pulse"></div>
                      <div className="bg-gray-800/50 p-2 rounded-lg rounded-tl-none text-[10px] text-gray-400">
                        Scanning x-ray image...
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-cyan-600 flex-shrink-0 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-cyan-900/20 border border-cyan-500/20 p-2 rounded-lg rounded-tr-none text-[10px] text-cyan-200">
                      Detected: Deep caries on tooth #36. Suggesting root canal.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* TRUSTED TECH STACK */}
      <section className="py-16 border-y border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">{t.trust.caption}</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="text-white/70 hover:text-white transition-colors font-bold text-2xl">OpenAI</div>
              <div className="text-white/70 hover:text-white transition-colors font-bold text-2xl">Stripe</div>
              <div className="text-white/70 hover:text-white transition-colors font-bold text-2xl">Next.js</div>
              <div className="text-white/70 hover:text-white transition-colors font-bold text-2xl">Vercel</div>
              <div className="text-white/70 hover:text-white transition-colors font-bold text-2xl">Google Cloud</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section id="pain" className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2 rounded-full mb-8 border border-red-500/20" style={{ boxShadow: '0 0 30px rgba(239,68,68,0.2)' }}>
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t.pain.title}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t.pain.stat}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            {t.pain.desc}
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" className="py-32 relative bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.howitworks.title}</h2>
            <p className="text-gray-400 text-lg">{t.howitworks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2 z-0"></div>

            <div className="relative z-10 text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-500/50 mb-6 group-hover:scale-110 group-hover:border-cyan-500 transition-all">
                <Camera className="w-10 h-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howitworks.step1_title}</h3>
              <p className="text-gray-400 text-sm">{t.howitworks.step1_desc}</p>
            </div>

            <div className="relative z-10 text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border-2 border-purple-500/50 mb-6 group-hover:scale-110 group-hover:border-purple-500 transition-all">
                <Brain className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howitworks.step2_title}</h3>
              <p className="text-gray-400 text-sm">{t.howitworks.step2_desc || "AI değerlendirir, tedavi fiyatını bildirir"}</p>
            </div>

            <div className="relative z-10 text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/50 mb-6 group-hover:scale-110 group-hover:border-green-500 transition-all">
                <CreditCard className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howitworks.step3_title || "Kapora & Randevu"}</h3>
              <p className="text-gray-400 text-sm">{t.howitworks.step3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARDS */}
      <section id="panels" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {[
              { id: 'clinic' as const, label: t.tabs.clinic, icon: LayoutDashboard },
              { id: 'agency' as const, label: t.tabs.agency, icon: Users },
              { id: 'patient' as const, label: t.tabs.patient, icon: HeartPulse },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group relative flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden ${activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white bg-white/5 border border-white/10'}`}>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-white transition-all duration-300"></div>
                )}
                <tab.icon className={`w-4 h-4 relative z-10 ${activeTab === tab.id ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="relative bg-[#0A0A0A] rounded-[40px] border border-white/10 p-2 md:p-12 min-h-[600px] shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-cyan-500/50 transition-all duration-700"></div>

            {activeTab === 'clinic' && (
              <div className="h-full">
                <div className="grid md:grid-cols-4 gap-8 h-full">
                  <div className="hidden md:flex flex-col col-span-1 bg-white/5 rounded-3xl p-6 border border-white/5 h-full">
                    <div className="h-8 bg-cyan-500/20 rounded-xl w-full mb-6 animate-pulse"></div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => <div key={i} className="h-10 bg-white/5 rounded-xl w-full hover:bg-white/10 transition-colors cursor-pointer"></div>)}
                    </div>
                    <div className="mt-auto h-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-white/5"></div>
                  </div>
                  <div className="col-span-3 space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">Dr. Yılmaz</h3>
                        <p className="text-gray-500 text-sm">Real-time Revenue Monitoring</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-500 text-xs font-bold uppercase tracking-wider">System Active</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all cursor-default">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">Daily Revenue</div>
                        <div className="text-4xl font-bold text-white tracking-tight">₺45,250</div>
                        <div className="text-green-400 text-sm mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +22% vs yesterday</div>
                      </div>
                      <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-cyan-500/20 transition-all">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">AI Appointments</div>
                        <div className="text-4xl font-bold text-cyan-400 tracking-tight">12</div>
                        <div className="text-cyan-400/60 text-sm mt-2">Fully autonomous</div>
                      </div>
                      <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-purple-500/20 transition-all">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">Pending X-Rays</div>
                        <div className="text-4xl font-bold text-purple-400 tracking-tight">3</div>
                        <div className="text-purple-400/60 text-sm mt-2">Processing now...</div>
                      </div>
                    </div>
                    <div className="bg-[#111] border border-white/5 p-8 rounded-3xl h-64 flex items-end gap-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/5 to-transparent"></div>
                      {[30, 45, 35, 70, 55, 85, 65, 90, 75, 95].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-t-lg hover:bg-cyan-500 transition-all duration-300 hover:scale-y-105 cursor-crosshair"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agency' && (
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-white">Partner Agency Portal</h3>
                  <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold">Add New Clinic</button>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left bg-[#111]">
                    <thead className="text-gray-500 text-xs uppercase bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 font-medium">Client Name</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">AI Usage</th>
                        <th className="px-6 py-4 font-medium text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300 divide-y divide-white/5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                          <td className="px-6 py-5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-400 font-bold group-hover:bg-cyan-500 group-hover:text-black transition-colors">DC</div>
                            <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">Dental Clinic #{i}</span>
                          </td>
                          <td className="px-6 py-5"><span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] px-2 py-1 rounded-full uppercase tracking-wide">Active</span></td>
                          <td className="px-6 py-5">
                            <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                              <div style={{ width: `${Math.random() * 100}%` }} className="h-full bg-cyan-500"></div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right font-mono text-white">₺{(Math.random() * 50000).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'patient' && (
              <div className="flex justify-center items-center h-full min-h-[500px]">
                <div className="w-[340px] bg-black border border-white/20 rounded-[40px] p-4 overflow-hidden shadow-2xl relative ring-8 ring-gray-900">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>

                  <div className="bg-[#075E54] -mx-4 -mt-4 p-4 pt-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><Zap className="w-5 h-5 text-[#075E54]" /></div>
                    <div className="text-white">
                      <div className="font-bold text-sm">Aura Assistant</div>
                      <div className="text-[10px] opacity-80">Business Account</div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4 text-sm h-[350px] overflow-y-auto pr-2">
                    <div className="flex justify-center text-[10px] text-gray-500 bg-[#e0e0e0]/10 py-1 rounded-lg mb-4">TODAY</div>

                    <div className="bg-[#1f2c34] p-3 rounded-2xl rounded-tl-none text-gray-200 max-w-[85%] border border-white/5">
                      Merhaba! Röntgen sonucunuz incelendi. 🦷
                      <div className="text-[9px] text-gray-500 text-right mt-1">14:02</div>
                    </div>

                    <div className="bg-[#1f2c34] p-2 rounded-2xl rounded-tl-none text-gray-200 max-w-[85%] border border-white/5">
                      <div className="bg-black/50 h-32 rounded-lg flex items-center justify-center border border-white/10 mb-2">
                        <div className="text-xs text-gray-500 flex flex-col items-center">
                          <Activity className="w-6 h-6 mb-1 opacity-50" />
                          X-Ray Analysis
                        </div>
                      </div>
                      <div className="text-xs">Sol alt dişte derin çürük tespit edildi.</div>
                      <div className="text-[9px] text-gray-500 text-right mt-1">14:02</div>
                    </div>

                    <div className="bg-[#005c4b] p-3 rounded-2xl rounded-tr-none text-white ml-auto max-w-[80%] shadow-md">
                      Ne kadar tutar?
                      <div className="text-[9px] text-green-200 text-right mt-1 flex justify-end gap-1">14:03 <CheckCircle2 className="w-3 h-3" /></div>
                    </div>

                    <div className="bg-[#1f2c34] p-3 rounded-2xl rounded-tl-none text-gray-200 max-w-[85%] border border-white/5">
                      Normalde ₺5000, ancak bu hafta başlarsanız ₺3500.
                      <br /><br />
                      Cumartesi 14:00 uygun mu?
                      <div className="text-[9px] text-gray-500 text-right mt-1">14:03</div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 h-10 bg-[#1f2c34] rounded-full flex items-center px-4 justify-between border border-white/10">
                    <span className="text-gray-500 text-xs">Message...</span>
                    <div className="w-6 h-6 rounded-full bg-[#005c4b] flex items-center justify-center"><ArrowRight className="w-3 h-3 text-white" /></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="group bg-[#0A0A0A] p-8 rounded-[32px] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="w-14 h-14 bg-cyan-900/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
              <Activity className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.features.vision_title}</h3>
            <p className="text-gray-400 leading-relaxed">{t.features.vision_desc}</p>
          </div>
          <div className="group bg-[#0A0A0A] p-8 rounded-[32px] border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-900/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <MessageSquare className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.features.sales_title}</h3>
            <p className="text-gray-400 leading-relaxed">{t.features.sales_desc}</p>
          </div>
          <div className="group bg-[#0A0A0A] p-8 rounded-[32px] border border-white/10 hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-900/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <Shield className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t.features.security_title}</h3>
            <p className="text-gray-400 leading-relaxed">{t.features.security_desc}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">{t.faq.title}</h2>

          <div className="space-y-4">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-6 py-5 flex items-center justify-between text-left group">
                  <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/80 border-t border-white/5 backdrop-blur-md h-10 flex items-center overflow-hidden pointer-events-none hidden md:flex">
        <div className="flex gap-12 whitespace-nowrap px-4 opacity-80" style={{ animation: 'marquee 40s linear infinite' }}>
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <TrendingUp className="w-3 h-3" /> Dr. Yılmaz (Istanbul) +₺45,000 Today
          </span>
          <span className="flex items-center gap-2 text-blue-400 text-xs font-mono">
            <Activity className="w-3 h-3" /> DentalPark (Ankara) 5 New Leads
          </span>
          <span className="flex items-center gap-2 text-gray-400 text-xs font-mono">
            <Lock className="w-3 h-3" /> System Secure (Beta v0.9)
          </span>
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <TrendingUp className="w-3 h-3" /> SmileClinic (Izmir) +₺12,500 Today
          </span>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
        <Link href={`https://wa.me/${whatsappNumber}`} className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 font-bold shadow-lg shadow-green-900/50 active:scale-95 transition-transform">
          <MessageSquare className="w-5 h-5" />
          {t.mobileCta}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap');
        .font-arabic { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
