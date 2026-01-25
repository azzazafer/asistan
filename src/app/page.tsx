"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  DollarSign
} from "lucide-react";
import Link from "next/link";

// --- ELITE CONTENT MATRIX (TR, EN, AR) ---
const ELITE_CONTENT = {
  tr: {
    meta: {
      title: "Aura OS | Sağlık Turizminde Dijital Sinir Sistemi",
      desc: "Chatbotları unutun. Aura OS, leadsleri %42 daha fazla operasyona dönüştüren otonom bir satış motorudur."
    },
    nav: { features: "Çözümler", tech: "Teknoloji", caseStudies: "Başarılar", getStarted: "Sisteme Katıl" },
    hero: {
      tag: "SAĞLIK TURİZMİ 4.0",
      title: "Klinikleri Otonom Satış Makinelerine Dönüştürün",
      subtitle: "Sadece yanıt vermeyin, kazanın. Aura OS; WhatsApp, Instagram ve Telegram leadslerinizi cerrahi analiz ve in-chat ödeme ile nakit akışına dönüştüren tek otonom büyüme katmanıdır.",
      primary: "Demoyu Başlat",
      secondary: "Vortex Vision™'ı Keşfet"
    },
    problems: {
      title: "Piyasadaki En Büyük Sorununuz Nedir?",
      items: [
        { id: "01", title: "Lead Sızıntısı", desc: "Mesajlara 5 dakika içinde dönülmemesi leadlerin %80'ini kaybetmenize sebep olur. Aura 0.4 saniyede yanıt verir." },
        { id: "02", title: "Güven Boşluğu", desc: "Hastalar tıbbi kanıt ister. Aura, fotoğrafları anında analiz ederek cerrahi bir rapor sunar ve güveni kilitler." },
        { id: "03", title: "Kapanış Sorunu", desc: "Randevu almak yetmez, depozito gerekir. Aura, konuşma anında ödemeyi saniyeler içinde tahsil eder." }
      ]
    },
    solutions: {
      tag: "ÇÖZÜMÜMÜZ",
      title: "Sadece Teknoloji Değil, Bir Satış Stratejisi.",
      items: [
        { title: "Capture & Qualify", desc: "Tüm kanallardan gelen leadsleri anında yakalar, niyet analizi yapar ve filtreler.", icon: <Target className="text-emerald-400" /> },
        { title: "Vortex Vision™", desc: "Hastanın durumunu medikal bir raporla analiz eder, kliniğinizin farkını bilimsel olarak kanıtlar.", icon: <Activity className="text-indigo-400" /> },
        { title: "Neural Pay™", desc: "Stripe altyapısıyla en sıcak anda depozitoyu tahsil eder. Satışın soğumasına izin vermez.", icon: <DollarSign className="text-violet-400" /> }
      ]
    },
    footer: { rights: "© 2026 Aura OS Galactic Operations. Tüm Hakları Saklıdır." }
  },
  en: {
    meta: {
      title: "Aura OS | The Digital Nervous System for Clinics",
      desc: "Forget chatbots. Aura OS is an autonomous sales engine converting leads into 42% more operations."
    },
    nav: { features: "Solutions", tech: "Technology", caseStudies: "Success", getStarted: "Join the Future" },
    hero: {
      tag: "HEALTH TOURISM 4.0",
      title: "Transform Clinics into Autonomous Sales Machines",
      subtitle: "Don't just respond, win. Aura OS is the only autonomous growth layer that converts your WA, IG, and Telegram leads into cash flow with surgical analysis and in-chat payments.",
      primary: "Start Demo",
      secondary: "Explore Vortex Vision™"
    },
    problems: {
      title: "What is Your Biggest Market Challenge?",
      items: [
        { id: "01", title: "Lead Leakage", desc: "Failing to respond within 5 minutes loses 80% of leads. Aura responds in 0.4 seconds." },
        { id: "02", title: "The Trust Gap", desc: "Patients demand evidence. Aura analyzes photos instantly with a surgical report, locking in trust." },
        { id: "03", title: "Closing Friction", desc: "Booking isn't enough; deposits are. Aura collects payments in-chat in seconds." }
      ]
    },
    solutions: {
      tag: "OUR SOLUTION",
      title: "Not Just Tech, a Sales Strategy.",
      items: [
        { title: "Capture & Qualify", desc: "Captures leads from all channels, analyzes intent, and filters them instantly.", icon: <Target className="text-emerald-400" /> },
        { title: "Vortex Vision™", desc: "Analyzes patient cases with medical reports, scientifically proving your clinic's superiority.", icon: <Activity className="text-indigo-400" /> },
        { title: "Neural Pay™", desc: "Collects deposits at the peak of the conversation via Stripe. Never let a sale get cold.", icon: <DollarSign className="text-violet-400" /> }
      ]
    },
    footer: { rights: "© 2026 Aura OS Galactic Operations. All Rights Reserved." }
  },
  ar: {
    meta: {
      title: "Aura OS | الجهاز العصبي الرقمي للعيادات",
      desc: "انسَ روبوتات الدردشة. Aura OS هو محرك مبيعات ذاتي يحول العملاء المحتملين إلى عمليات أكثر بنسبة 42%."
    },
    nav: { features: "الحلول", tech: "التكنولوجيا", caseStudies: "النجاحات", getStarted: "انضم إلينا" },
    hero: {
      tag: "السياحة العلاجية 4.0",
      title: "حول عيادتك إلى آلة مبيعات ذاتية",
      subtitle: "لا تكتفِ بالرد، بل اربح. Aura OS هي طبقة النمو الذاتي الوحيدة التي تحول رسائل WA و IG و Telegram إلى تدفق نقدي من خلال التحليل الجراحي والمدفوعات داخل الدردشة.",
      primary: "ابدأ العرض",
      secondary: "اكتشف Vortex Vision™"
    },
    problems: {
      title: "ما هو أكبر تحدٍ يواجهك في السوق؟",
      items: [
        { id: "01", title: "تسرب العملاء", desc: "الفشل في الرد خلال 5 دقائق يفقدك 80% من العملاء. أورا ترد في 0.4 ثانية." },
        { id: "02", title: "فجوة الثقة", desc: "يطلب المرضى أدلة طبية. تحلل أورا الصور وتصدر تقارير جراحية تقفل الثقة فوراً." },
        { id: "03", title: "مشكلة الإغلاق", desc: "الحجز لا يكفي، بل الوديعة. تقوم أورا بتحصيل المدفوعات داخل الدردشة في ثوانٍ." }
      ]
    },
    solutions: {
      tag: "حلنا",
      title: "ليست مجرد تقنية، بل استراتيجية مبيعات.",
      items: [
        { title: "الالتقاط والتأهيل", desc: "يحلل العملاء من كافة القنوات، ويصنف النوايا ويفلترهم فوراً.", icon: <Target className="text-emerald-400" /> },
        { title: "Vortex Vision™", desc: "تحليل حالات المرضى بتقارير طبية، ما يثبت تميز عيادتك علمياً.", icon: <Activity className="text-indigo-400" /> },
        { title: "Neural Pay™", desc: "تحصيل الودائع في ذروة المحادثة عبر Stripe. لا تترك البيعة تبرد.", icon: <DollarSign className="text-violet-400" /> }
      ]
    },
    footer: { rights: "© 2026 Aura OS Galactic Operations. جميع الحقوق محفوظة." }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = ELITE_CONTENT[lang];
  const isRTL = lang === 'ar';

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <div className={`min-h-screen bg-[#020202] text-white selection:bg-indigo-500/40 ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* --- SEO HIDDEN --- */}
      <h1 className="sr-only">{t.meta.title}</h1>
      <p className="sr-only">{t.meta.desc}</p>

      {/* --- ELITE NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full px-10 h-20 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
              <Brain size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">
              Aura <span className="text-indigo-500">OS</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {Object.values(t.nav).slice(0, 3).map((item, i) => (
              <Link key={i} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">{item}</Link>
            ))}

            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${lang === l ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button className="bg-white text-black px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
              {t.nav.getStarted}
            </button>
          </div>

          <button className="lg:hidden p-3 bg-white/5 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* --- ELITE HERO SECTION --- */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 text-center overflow-hidden">
        {/* Background Elite Visual */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div style={{ opacity: backgroundOpacity }} className="absolute inset-x-0 top-0 h-full">
            <img
              src="/images/hero_elite.png"
              alt="Aura OS Digital Nervous System"
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80" />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-12 border border-indigo-500/20 backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse" /> {t.hero.tag}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85] mb-12 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="group px-14 py-7 bg-indigo-600 text-white rounded-[2.5rem] text-xs font-black uppercase tracking-widest shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)] hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95">
              {t.hero.primary} <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-14 py-7 bg-white/5 border border-white/10 text-white rounded-[2.5rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-4 backdrop-blur-xl group">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                <Play size={16} fill="currentColor" />
              </div>
              {t.hero.secondary}
            </button>
          </motion.div>
        </div>
      </header>

      {/* --- THE PROBLEM SECTIONS (Narrative Flow) --- */}
      <section className="py-40 px-6 relative bg-gradient-to-b from-transparent to-indigo-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              {t.problems.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            {t.problems.items.map((item, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="text-[120px] font-black text-white/[0.03] absolute -top-10 -left-6 leading-none pointer-events-none group-hover:text-indigo-500/10 transition-colors">
                  {item.id}
                </div>
                <h3 className="text-3xl font-black mb-8 relative z-10 tracking-tight group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8 relative z-10">{item.desc}</p>
                <div className="h-px w-20 bg-indigo-500/30 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE SOLUTION: VORTEX VISION DEEP DIVE --- */}
      <section className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-12">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-indigo-500/20">
                {t.solutions.tag}
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
                {t.solutions.title}
              </h2>
              <div className="space-y-10">
                {t.solutions.items.map((sol, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 rounded-3xl bg-[#0A0A0A] flex items-center justify-center flex-shrink-0 border border-white/5 shadow-inner">
                      <div className="group-hover:scale-110 transition-transform duration-500">{sol.icon}</div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{sol.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed max-w-sm">{sol.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[150px] animate-pulse rounded-full" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-black/60 backdrop-blur-3xl p-6 rounded-[5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              >
                <img
                  src="/images/vortex_vision.png"
                  alt="Vortex Vision AI Diagnostic"
                  className="w-full h-auto rounded-[4rem] group"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-[5rem]" />

                {/* Premium Overlay Mockup elements */}
                <div className="absolute top-12 left-12 bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <Activity size={14} className="animate-pulse" /> S-GRADE SCANNING...
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELITE STATS / PROOF --- */}
      <section className="py-40 px-6 bg-[#030303] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-24 items-center">
          {[
            { label: "SLA Response", value: "0.4s", desc: "Instant AI Feedback" },
            { label: "Efficiency", value: "+420%", desc: "Lead Pipeline Growth" },
            { label: "Recovery", value: "3.5X", desc: "Lost Deposits Recovered" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="text-8xl md:text-9xl font-black italic tracking-tighter mb-4 bg-gradient-to-br from-white to-white/10 bg-clip-text text-transparent group-hover:text-white transition-all duration-700">
                {stat.value}
              </div>
              <div className="text-[12px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-2">{stat.label}</div>
              <p className="text-slate-500 font-medium italic">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL ACTION --- */}
      <section className="py-52 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[180px] rounded-full translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12">
            Ready to Ignite Your Clinic?
          </h2>
          <button className="px-20 py-8 bg-white text-black rounded-[3rem] text-sm font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_40px_80px_rgba(255,255,255,0.15)] active:scale-95">
            Claim Your Alpha Access
          </button>
        </div>
      </section>

      {/* --- ELITE FOOTER --- */}
      <footer className="py-32 px-6 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain size={28} />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">Aura <span className="text-indigo-500">OS</span></span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Autonomous Growth Infrastructure v4.0.01</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {Object.values(t.nav).map((item, i) => (
              <Link key={i} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all">{item}</Link>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Globe size={24} />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 text-center">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.6em]">{t.footer.rights}</p>
        </div>
      </footer>

      {/* Global CSS for perfection */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&display=swap');
        
        body {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .font-arabic {
          font-family: system-ui, -apple-system, sans-serif;
        }

        ::-webkit-scrollbar {
          width: 6px;
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

        @media (max-width: 640px) {
          h1 { font-size: 3.5rem !important; }
        }
      `}</style>
    </div>
  );
}
