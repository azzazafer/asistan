"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Brain,
  Zap,
  Shield,
  Activity,
  Globe,
  Lock,
  ChevronRight,
  Menu,
  X,
  Play,
  CheckCircle2,
  TrendingUp,
  Target,
  Users,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  DollarSign,
  Cpu,
  Fingerprint,
  Orbit,
  BarChart3,
  Award,
  Compass
} from "lucide-react";
import Link from "next/link";

// --- ELITE CONTENT MATRIX 5.0 ---
const CONTENT = {
  tr: {
    meta: { title: "Aura OS 5.0 | Nextoria Elite | Sağlık Turizmi Otonom Motoru", desc: "Klinik ve acenteler için 2026 standarlarında, %420 ROI odaklı, dünyanın ilk cerrahi hassasiyetli otonom satış altyapısı." },
    nav: { cli: "Klinikler", age: "Acenteler", vision: "Vizyon", getStarted: "Vazgeçilmez Ol" },
    hero: {
      tag: "NEXTORIA ELITE • V5.0",
      title: "Sağlık Turizminin\nDijital Sinir Sistemi",
      subtitle: "Chatbotlar ölür, Aura yaşatır. Dünyanın ilk 'Cerrahi Hassasiyetli' otonom motoruyla lead sızıntılarını sonlandırın ve %420 gelir artışını Nextoria kalitesiyle canlandırın.",
      cta: "Sisteme Dahil Ol",
      secondary: "Dashboard'u Deneyimle"
    },
    unique: {
      title: "Neden Aura OS Vazgeçilmez?",
      subtitle: "Dünyada eşi benzeri olmayan 'Unfair Advantage' teknolojilerimiz.",
      items: [
        { title: "Cerrahi Niyet Analizi", desc: "Sadece metni değil, hastanın gönderdiği görselin medikal ciddiyetini %99 hassasiyetle anlar.", icon: <Fingerprint /> },
        { title: "Neural Closing™", desc: "Konuşmanın en sıcak anında, manuel müdahale olmadan Stripe üzerinden depozitoyu saniyeler içinde tahsil eder.", icon: <Lock /> },
        { title: "Kültürel Aynalama", desc: "Hastanın uyruğuna göre ses tonunu, lingo ve ikna stratejisini o an üretir. Global başarının sırrı.", icon: <Globe /> }
      ]
    },
    fomo: {
      title: "Aura OS Olmadan Neler Kaçırıyorsunuz?",
      subtitle: "Her saniye bir sızıntı, her mesaj bir kayıp.",
      clinics: { title: "Klinikler İçin", desc: "Gece gelen Arapça lead'i sabah 9'a kadar beklettiğinizde o operasyon %90 ihtimalle başka bir kliniğe gitti. Aura 0.4 saniyede o satışı kapatır." },
      agencies: { title: "Acenteler İçin", desc: "Lead toplamak artık yeterli değil. Kalite puanı düşük lead'ler ekibinizi yorar. Aura sadece 'High-Intent' leadsleri size teslim eder." }
    },
    vision: {
      title: "2026 Vizyonumuz",
      mission: "Misyon: Sağlık turizmini bir 'mesaj trafiği' olmaktan çıkarıp, tamamen otonom ve bilimsel bir satış ekosistemine dönüştürmek.",
      vision: "Vizyon: 2026 ve sonrasında, globaldeki her 3 başarılı sağlık operasyonundan 1'inin sinir merkezinde Aura OS teknolojisinin olması."
    },
    footer: { signature: "CRAFTED BY NEXTORIA DIGITAL", rights: "© 2026 Aura Galactic Labs. Alpha Elite." }
  },
  en: {
    meta: { title: "Aura OS 5.0 | Nextoria Elite | Health Tourism Autonomous Engine", desc: "World-first surgical-precision autonomous sales infrastructure, 420% ROI focus for 2026 standards." },
    nav: { cli: "Clinics", age: "Agencies", vision: "Vision", getStarted: "Be Indispensable" },
    hero: {
      tag: "NEXTORIA ELITE • V5.0",
      title: "The Digital Nervous\nSystem of Health Tourism",
      subtitle: "Chatbots die, Aura thrives. End lead leakage and revitalize a 420% revenue increase with Nextoria quality via the world's first 'Surgical Precision' autonomous engine.",
      cta: "Join the System",
      secondary: "Experience Dashboard"
    },
    unique: {
      title: "Why is Aura OS Indispensable?",
      subtitle: "Our 'Unfair Advantage' technologies, unmatched anywhere else on the planet.",
      items: [
        { title: "Surgical Intent Analysis", desc: "Analyzes not just text, but the medical severity of patient photos with 99% precision.", icon: <Fingerprint /> },
        { title: "Neural Closing™", desc: "Collects deposits through Stripe at the peak of conversation warmth in seconds, without manual intervention.", icon: <Lock /> },
        { title: "Cultural Mirroring", desc: "Generates tone, lingo, and persuasion strategy instantly based on patient nationality. The secret to global success.", icon: <Globe /> }
      ]
    },
    fomo: {
      title: "What Are You Missing Without Aura OS?",
      subtitle: "Every second is a leak, every message a lost opportunity.",
      clinics: { title: "For Clinics", desc: "By keeping an Arabic lead waiting until 9 AM, that operation has a 90% chance of going elsewhere. Aura closes that sale in 0.4 seconds." },
      agencies: { title: "For Agencies", desc: "Collecting leads isn't enough. Low-quality leads fatigue your team. Aura delivers only high-intent leads." }
    },
    vision: {
      title: "Our 2026 Vision",
      mission: "Mission: To transform health tourism from a 'message-traffic' chaos into an autonomous, scientific sales ecosystem.",
      vision: "Vision: By 2026 and beyond, to be the nervous center of 1 out of every 3 successful health operations globally."
    },
    footer: { signature: "CRAFTED BY NEXTORIA DIGITAL", rights: "© 2026 Aura Galactic Labs. Alpha Elite." }
  },
  ar: {
    meta: { title: "Aura OS 5.0 | Nextoria Elite | محرك السياحة العلاجية الذاتي", desc: "أول بنية تحتية للمبيعات الذاتية بدقة جراحية في العالم، تركز على عائد استثمار بنسبة 420% لمعايير 2026." },
    nav: { cli: "العيادات", age: "الوكالات", vision: "الرؤية", getStarted: "كن لا غنى عنه" },
    hero: {
      tag: "NEXTORIA ELITE • V5.0",
      title: "الجهاز العصبي الرقمي\nللسياحة العلاجية",
      subtitle: "روبوتات الدردشة تموت، وأورا تزدهر. أنهِ تسرب العملاء المحتملين وأحيِ زيادة في الإيرادات بنسبة 420% مع أول محرك ذاتي بـ 'دقة جراحية' في العالم.",
      cta: "انضم إلى النظام",
      secondary: "تجربة لوحة التحكم"
    },
    unique: {
      title: "لماذا Aura OS لا غنى عنها؟",
      subtitle: "تقنيات 'الميزة غير العادلة' الخاصة بنا، والتي لا مثيل لها في أي مكان آخر على الكوكب.",
      items: [
        { title: "تحليل النوايا الجراحي", desc: "لا يحلل النص فقط، بل يحلل الخطورة الطبية لصور المريض بدقة 99%.", icon: <Fingerprint /> },
        { title: "Neural Closing™", desc: "يحصل الودائع عبر Stripe في ذروة دفء المحادثة خلال ثوانٍ، دون تدخل يدوي.", icon: <Lock /> },
        { title: "المحاكاة الثقافية", desc: "يولد نبرة الصوت والمصطلحات واستراتيجية الإقناع فوراً بناءً على جنسية المريض. سر النجاح العالمي.", icon: <Globe /> }
      ]
    },
    fomo: {
      title: "ماذا تفقد بدون Aura OS؟",
      subtitle: "كل ثانية هي تسريب، كل رسالة هي فرصة ضائعة.",
      clinics: { title: "للعيادات", desc: "عند ترك عميل محتمل يتحدث العربية ينتظر حتى الساعة 9 صباحاً، فهناك احتمال بنسبة 90% أن تذهب تلك العملية إلى مكان آخر. أورا تغلق ذلك البيع في 0.4 ثانية.", icon: <Users /> },
      agencies: { title: "للوكالات", desc: "جمع العملاء المحتملين لم يعد كافياً. العملاء ذوو الجودة المنخفضة يرهقون فريقك. أورا تقدم فقط العملاء ذوي النوايا العالية.", icon: <TrendingUp /> }
    },
    vision: {
      title: "رؤيتنا لعام 2026",
      mission: "المهمة: تحويل السياحة العلاجية من فوضى 'حركة الرسائل' إلى نظام بيعي علمي وذاتي بالكامل.",
      vision: "الرؤية: بحلول عام 2026 وما بعده، أن نكون المركز العصبي لواحدة من كل 3 عمليات صحية ناجحة عالمياً."
    },
    footer: { signature: "بواسطة NEXTORIA DIGITAL", rights: "© 2026 Aura Galactic Labs. Alpha Elite." }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <div className={`min-h-screen bg-[#020202] text-white selection:bg-indigo-500/40 ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* --- ELITE NAV (Fixed Anchor) --- */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 md:py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full px-6 md:px-10 h-16 md:h-20 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group">
              <Brain size={24} className="group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
              Aura <span className="text-indigo-500">OS</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {Object.values(t.nav).slice(0, 3).map((item, i) => (
              <Link key={i} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">{item}</Link>
            ))}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all duration-300 ${lang === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>{l}</button>
              ))}
            </div>
            <button className="bg-white text-black px-6 xl:px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all shadow-xl active:scale-95">
              {t.nav.getStarted}
            </button>
          </div>

          <button className="lg:hidden p-2.5 bg-white/5 rounded-full pointer-events-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center gap-10">
            {Object.values(t.nav).map((item, i) => (
              <Link key={i} href="#" className="text-2xl font-black uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>{item}</Link>
            ))}
            <X size={40} className="mt-10" onClick={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO 5.0 (Section-First) --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <motion.div style={{ opacity: backgroundOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <img src="/images/hero_v5.png" alt="Aura OS Brain" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80" />
        </motion.div>

        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 border border-indigo-500/20 backdrop-blur-md">
            <Sparkles size={12} /> {t.hero.tag}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="text-4xl md:text-7xl lg:text-[8.5rem] font-black tracking-tighter leading-[0.85] mb-10 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent whitespace-pre-line">
            {t.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 italic font-medium leading-relaxed">
            {t.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 group">
              {t.hero.cta} <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 backdrop-blur-xl group">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={16} fill="currentColor" />
              </div>
              {t.hero.secondary}
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- WORLD-FIRST CAPABILITIES --- */}
      <section className="py-24 md:py-40 px-6 relative bg-gradient-to-b from-transparent to-indigo-950/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">{t.unique.title}</h2>
            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[11px]">{t.unique.subtitle}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {t.unique.items.map((item, i) => (
              <div key={i} className="group p-10 md:p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-700 relative overflow-hidden">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE COST OF ABSENCE (FOMO) --- */}
      <section className="py-40 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-right mb-32 max-w-4xl ml-auto">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-l from-white to-white/40 bg-clip-text text-transparent">
              {t.fomo.title}
            </h2>
            <p className="text-red-500 font-extrabold uppercase tracking-[0.4em] text-[12px] animate-pulse">{t.fomo.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20 hover:from-indigo-800/50 transition-all group">
              <div className="text-[120px] font-black text-white/[0.02] absolute top-10 right-10 leading-none">01</div>
              <h3 className="text-4xl font-black mb-10 uppercase italic group-hover:text-indigo-400 transition-colors">{t.fomo.clinics.title}</h3>
              <p className="text-slate-300 text-xl font-medium leading-relaxed">{t.fomo.clinics.desc}</p>
              <div className="mt-12 w-full h-px bg-white/10 group-hover:bg-indigo-500/40 transition-all" />
            </div>
            <div className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/10 hover:from-emerald-800/30 transition-all group">
              <div className="text-[120px] font-black text-white/[0.02] absolute top-10 right-10 leading-none">02</div>
              <h3 className="text-4xl font-black mb-10 uppercase italic group-hover:text-emerald-400 transition-colors">{t.fomo.agencies.title}</h3>
              <p className="text-slate-300 text-xl font-medium leading-relaxed">{t.fomo.agencies.desc}</p>
              <div className="mt-12 w-full h-px bg-white/10 group-hover:bg-emerald-500/40 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* --- DASHBOARD REALISM --- */}
      <section className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto rounded-[5rem] bg-white/[0.02] p-12 lg:p-32 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] -z-10" />
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-white/10">
                <Orbit size={14} className="animate-spin-slow" /> Aura Dashboard V5.0
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">2026<br />Hassasiyeti.</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-lg italic">
                Karmaşayı bitirin. Her lead'in sinir haritasını, operasyon olasılığını ve finansal niyetini tek bir ekranda, Nextoria hassasiyetiyle görün.
              </p>
              <ul className="space-y-6">
                {["%99.4 Tıbbi Doğruluk", "Uçtan Uca Şifreli Otonomi", "Global Market Mirroring"].map(item => (
                  <li key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-400">
                    <div className="w-6 h-6 rounded-full border border-indigo-500/30 flex items-center justify-center">
                      <CheckCircle2 size={12} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative bg-black p-4 rounded-[4rem] border border-white/10 shadow-2xl">
                <img src="/images/aura_dashboard_v5.png" alt="Aura Elite Dashboard" className="w-full h-auto rounded-[3rem]" />
                <div className="absolute top-10 left-10 bg-white text-black px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl">
                  <Cpu size={14} className="animate-pulse" /> SYNCED LIVE
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION 2026 --- */}
      <section className="py-40 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1">
            <h2 className="text-6xl font-black tracking-tighter leading-none mb-10">{t.vision.title}</h2>
            <Link href="#" className="inline-flex items-center gap-4 text-indigo-500 font-black uppercase tracking-widest group">
              Whitepaper'ı İncele <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          <div className="lg:col-span-2 space-y-20">
            <div className="relative p-12 bg-white/[0.01] rounded-[4rem] border border-white/5">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl mb-8 flex items-center justify-center shadow-lg"><Compass /></div>
              <p className="text-4xl md:text-5xl font-black tracking-tight leading-tight italic">"{t.vision.mission}"</p>
            </div>
            <div className="relative p-12 bg-white/[0.01] rounded-[4rem] border border-white/5">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl mb-8 flex items-center justify-center shadow-lg"><Target /></div>
              <p className="text-4xl md:text-5xl font-black tracking-tight leading-tight">"{t.vision.vision}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEXTORIA FOOTER (The Signature) --- */}
      <footer className="py-32 px-6 border-t border-white/5 bg-black/80 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20 relative z-10">
          <div className="flex flex-col items-center md:items-start space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl"><Brain size={32} /></div>
              <span className="text-3xl font-black tracking-tighter uppercase italic py-2">Aura <span className="text-indigo-400">OS</span></span>
            </div>
            <div className="text-[12px] font-black uppercase tracking-[0.5em] text-white/40">Nextoria Digital • 2026 Elite Hub</div>
            <div className="flex gap-4">
              {[Globe, Shield, MessageSquare].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all hover:bg-white/5 cursor-pointer">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {Object.values(t.nav).map((item, i) => (
              <Link key={i} href="#" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all">{item}</Link>
            ))}
          </div>

          <div className="text-center md:text-right space-y-4">
            <div className="text-[12px] font-black uppercase tracking-[0.6em] text-indigo-500 mb-2">{t.footer.signature}</div>
            <p className="text-[10px] font-black text-slate-600 tracking-[0.4em]">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&family=Inter:wght@400;700;900&display=swap');
        
        body {
          font-family: 'Outfit', 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .font-arabic {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #020202;
        }
        ::-webkit-scrollbar-thumb {
          background: #111;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }

        @media (max-width: 768px) {
          h1 { font-size: 4rem !important; }
        }
      `}</style>
    </div>
  );
}
