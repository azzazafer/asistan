"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain, Zap, Shield, Activity, Globe, Lock, ChevronRight, Menu, X, Play,
  CheckCircle2, TrendingUp, Target, Users, MessageSquare, Sparkles,
  ArrowUpRight, DollarSign, Cpu, Fingerprint, Orbit, BarChart3, Award, Compass,
  Eye, Server, Database, Layers, Radio, Workflow, HeartPulse, Stethoscope
} from "lucide-react";
import Link from "next/link";

// --- ELITE CONTENT MATRIX 6.0: THE NEXTORIA ALPHA ---
const ALPHA_CONTENT = {
  tr: {
    meta: {
      title: "Aura OS 6.0 | Nextoria | Dünyanın İlk Cerrahi Hassasiyetli Satış Motoru",
      desc: "Klinikler ve acenteler için tasarlanmış, 2026 vizyonuna sahip, AI ve SEO tam uyumlu tek otonom büyüme altyapısı."
    },
    nav: { cli: "Klinikler", age: "Acenteler", tech: "Teknoloji", vision: "Vizyon 2026", getStarted: "Sisteme Hükmet" },
    hero: {
      tag: "NEXTORIA ALPHA • VERSION 6.0",
      title: "Sağlık Turizminin\nOtonom Beyni",
      subtitle: "Chatbotlardan 5 kat akıllı. Aura OS, leads sızıntılarını cerrahi analiz ve in-chat ödeme ile nakit akışına dönüştüren tek 'Bilişsel Satış Katmanı'dır.",
      cta: "Alpha Erişimi Al",
      video: "Vortex Vision™ İzle"
    },
    who: {
      title: "Aura OS Kimdir?",
      subtitle: "A'dan Z'ye Tam Otonom Büyüme",
      desc: "Aura OS, sadece bir yazılım değil; sağlık turizmi acenteleri ve klinikleri için özel olarak eğitilmiş dijital bir sinir sistemidir. Mesajı yakalar, fotoğrafı tıbbi olarak analiz eder, niyet puanlaması yapar ve depozitoyu saniyeler içinde tahsil eder."
    },
    uniques: {
      title: "Rakiplerin Yapamadığı Nedir?",
      items: [
        { title: "Cerrahi Görüntü Analizi", desc: "Hastanın gönderdiği bir fotoğrafı (diş, saç, estetik) Nex-Scan™ AI ile analiz eder ve anında cerrahi olasılık raporu sunar.", icon: <Eye /> },
        { title: "Kapanış Otonomisi", desc: "İnsan müdahalesi olmadan Stripe üzerinden in-chat depozito tahsilatı yapar. Satışın soğumasına izin vermez.", icon: <DollarSign /> },
        { title: "Sosyal Mühendislik Mirroring", desc: "Hastanın kültürel yapısına, lisanına ve psikolojik profiline göre o an özel ikna stratejisi geliştirir.", icon: <Fingerprint /> }
      ]
    },
    fomo: {
      title: "Stratejik Kayıp Analizi",
      subtitle: "Aura OS Olmadan Neler Kaybediyorsunuz?",
      clinic: { title: "Klinik Kayıpları", pros: ["%80 Daha Hızlı Yanıt", "Personel Maliyetinde %60 Tasarruf", "Hatasız Tıbbi Ön Tanı"], loss: "Siz uyurken gelen 10 leadden 9'u yanıtlanmadığı için rakiplere kayıyor. Bu, milyonlarca dolarlık fırsat maliyeti demek." },
      agency: { title: "Acente Kayıpları", pros: ["Hassas Lead Puanlaması", "Düşük CAC (Müşteri Edinme)", "Pre-Paid Satış Akışı"], loss: "Düşük kaliteli leadleri filtreleyemediğiniz her saniye operasyon ekibiniz yoruluyor ve kârlılığınız eriyor." }
    },
    security: {
      title: "Veri Sızıntısı & Hassasiyet",
      desc: "Nextoria Alpha mimarisi, HIPAA ve KVKK ötesinde, her veriyi 'Surgical-Grade' şifreleme ile korur. Verileriniz asla modellere satılmaz, sızdırılmaz.",
      badge: "ULTRA SECURE 2026"
    },
    vision: {
      title: "2026 Gelecek Tasarımı",
      mission: "Aura OS olarak misyonumuz; sağlık teknolojilerini 'araç' olmaktan çıkarıp, kurumların otonom 'yönetim bilinci' haline getirmektir.",
      vision: "Dünyadaki her 3 sağlık turizmi operasyonundan birinin Aura OS sinir ağları üzerinden yönetildiği bir ekosistem inşa ediyoruz."
    },
    footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations. Tüm Hakları Saklıdır." }
  },
  en: {
    meta: {
      title: "Aura OS 6.0 | Nextoria | World's First Surgical-Precision Sales Engine",
      desc: "Full AI/SEO synchronized autonomous growth infrastructure for clinics and agencies. Vision 2026."
    },
    nav: { cli: "Clinics", age: "Agencies", tech: "Technology", vision: "Vision 2026", getStarted: "Dominate Now" },
    hero: {
      tag: "NEXTORIA ALPHA • VERSION 6.0",
      title: "The Autonomous Brain\nof Health Tourism",
      subtitle: "5x Smarter than chatbots. Aura OS is the only 'Cognitive Sales Layer' that converts lead leakage into cash flow via surgical analysis and in-chat payments.",
      cta: "Get Alpha Access",
      video: "Watch Vortex Vision™"
    },
    who: {
      title: "Who is Aura OS?",
      subtitle: "A-Z Fully Autonomous Growth",
      desc: "Aura OS is not just software; it's a digital nervous system trained specifically for agencies and clinics. It captures, analyzes medically, scores intent, and collects deposits in seconds."
    },
    uniques: {
      title: "What Competitors Can't Do",
      items: [
        { title: "Surgical Image Analysis", desc: "Analyzes photos (dental, hair, aesthetics) with Nex-Scan™ AI for instant surgical reports.", icon: <Eye /> },
        { title: "Autonomous Closing", desc: "Collects in-chat deposits via Stripe without human intervention. Never lets a sale get cold.", icon: <DollarSign /> },
        { title: "Cultural Mirroring", desc: "Develops bespoke persuasion strategies based on patient's cultural and psychological profile instantly.", icon: <Fingerprint /> }
      ]
    },
    fomo: {
      title: "Strategic Loss Analysis",
      subtitle: "What Are You Losing Without Aura OS?",
      clinic: { title: "Clinic Loss", pros: ["80% Faster Response", "60% Human Labor Savings", "Error-Free Pre-Diagnosis"], loss: "9 out of 10 night leads go to competitors because they aren't answered. This means millions in yearly opportunity cost." },
      agency: { title: "Agency Loss", pros: ["Precise Lead Scoring", "Lower CAC", "Pre-Paid Sales Flow"], loss: "Every second you fail to filter low-quality leads, your operations team fatigues and your ROI dissolves." }
    },
    security: {
      title: "Data Privacy & Sensitivity",
      desc: "Nextoria Alpha architecture protects data with 'Surgical-Grade' encryption beyond HIPAA/GDPR. Your data is never sold or leaked.",
      badge: "ULTRA SECURE 2026"
    },
    vision: {
      title: "Vision 2026",
      mission: "To transform healthcare tech from a 'tool' to an autonomous 'management consciousness' for institutions.",
      vision: "Building an ecosystem where 1 out of every 3 global health operations is powered by Aura OS neural networks."
    },
    footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations. All Rights Reserved." }
  },
  ar: {
    meta: {
      title: "Aura OS 6.0 | Nextoria | أول محرك مبيعات بدقة جراحية في العالم",
      desc: "بنية تحتية للنمو الذاتي للمراكز والوكالات، متوافقة تماماً مع AI و SEO. رؤية 2026."
    },
    nav: { cli: "العيادات", age: "الوكالات", vision: "الرؤية", getStarted: "أحكم سيطرتك" },
    hero: {
      tag: "NEXTORIA ALPHA • VERSION 6.0",
      title: "العقل الذاتي\nللسياحة العلاجية",
      subtitle: "أذكى بـ 5 مرات من الروبوتات. Aura OS هي 'طبقة المبيعات الإدراكية' الوحيدة التي تحول تسرب العملاء إلى تدفق نقدي.",
      cta: "احصل على Alpha",
      video: "شاهد Vortex Vision™"
    },
    who: {
      title: "من هي Aura OS؟",
      subtitle: "نمو ذاتي كامل من الألف إلى الياء",
      desc: "أورا أوس ليست مجرد برنامج؛ إنها جهاز عصبي رقمي مدرب للوكالات والعيادات. تلتقط، تحلل طبياً، تقيم النوايا، وتحصل الودائع في ثوانٍ."
    },
    uniques: {
      title: "ما لا يستطيع المنافسون فعله",
      items: [
        { title: "تحليل الصور الجراحي", desc: "يحلل الصور (أسنان، شعر، تجميل) باستخدام Nex-Scan™ AI لتقارير جراحية فورية.", icon: <Eye /> },
        { title: "الإغلاق الذاتي", desc: "تحصيل الودائع عبر Stripe داخل الدردشة دون تدخل بشري. لا يترك البيعة تبرد.", icon: <DollarSign /> },
        { title: "المحاكاة الثقافية", desc: "تطوير استراتيجيات إقناع مخصصة بناءً على الملف الثقافي والنفسي للمريض فوراً.", icon: <Fingerprint /> }
      ]
    },
    fomo: {
      title: "تحليل الخسائر الاستراتيجية",
      subtitle: "ماذا تفقد بدون Aura OS؟",
      clinic: { title: "خسائر العيادات", pros: ["استجابة أسرع بنسبة 80%", "توفير 60% في العمالة", "تشخيص طبي بلا أخطاء"], loss: "9 من كل 10 عملاء ليليين يذهبون للمنافسين. هذا يعني ملايين الدولارات من الفرص الضائعة سنوياً." },
      agency: { title: "خسائر الوكالات", pros: ["تقييم دقيق للعملاء", "تكلفة استحواذ أقل", "تدفق مبيعات مسبق الدفع"], loss: "كل ثانية تفشل فيها في تصفية العملاء ذوي الجودة المنخفضة، يرهق فريقك وتتلاشى أرباحك." }
    },
    security: {
      title: "خصوصية البيانات وحساسيتها",
      desc: "تحمي بنية Nextoria Alpha البيانات بتشفير 'Surgical-Grade' يتجاوز المعايير الدولية. بياناتك لا تُباع أبداً.",
      badge: "ULTRA SECURE 2026"
    },
    vision: {
      title: "رؤية 2026",
      mission: "تحويل تكنولوجيا الرعاية الصحية من 'أداة' إلى 'وعي إداري' ذاتي للمؤسسات.",
      vision: "بناء نظام بيئي تدار فيه واحدة من كل 3 عمليات صحية عالمية عبر شبكات أورا أوس العصبية."
    },
    footer: { signature: "NEXTORIA DIGITAL ALPHA", rights: "© 2026 Aura OS Galactic Operations. جميع الحقوق محفوظة." }
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = ALPHA_CONTENT[lang];
  const isRTL = lang === 'ar';

  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Aura OS 6.0",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication"
  }), []);

  return (
    <div className={`min-h-screen bg-[#010101] text-slate-100 selection:bg-indigo-500/40 ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- ALPHA NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[200] px-6 py-6 lg:py-10 pointer-events-none">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] px-8 md:px-12 h-20 md:h-24 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-[360deg] transition-all duration-1000">
              <Brain size={28} className="text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic py-2 leading-none text-white">
              Aura <span className="text-indigo-500">OS</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10 xl:gap-14 text-white">
            {Object.values(t.nav).slice(0, 4).map((item, i) => (
              <Link key={i} href="#" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white hover:scale-110 transition-all">{item}</Link>
            ))}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all duration-500 ${lang === l ? 'bg-indigo-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white'}`}>{l}</button>
              ))}
            </div>
            <button className="bg-white text-black px-10 py-4.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95">
              {t.nav.getStarted}
            </button>
          </div>

          <button className="lg:hidden p-3 bg-white/5 rounded-full pointer-events-auto text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[150] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 lg:hidden px-10 text-white">
            {Object.values(t.nav).map((item, i) => (
              <Link key={i} href="#" className="text-3xl font-black uppercase tracking-widest">{item}</Link>
            ))}
            <X size={40} className="mt-10 opacity-50" onClick={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO 6.0: MASTERPIECE --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 overflow-hidden">
        <motion.div style={{ opacity: bgOpacity, filter: `blur(${heroBlur}px)` }} className="absolute inset-0 z-0">
          <img src="/images/global_nexus.png" alt="Aura OS Global Nexus" className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/90" />
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full mb-20 lg:mb-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-6 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-12 border border-indigo-500/20 backdrop-blur-xl">
            <Sparkles size={14} className="animate-pulse" /> {t.hero.tag}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1 }} className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.82] mb-14 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent whitespace-pre-line drop-shadow-2xl">
            {t.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 font-medium leading-relaxed italic px-4">
            {t.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-6 justify-center px-4">
            <button className="px-16 py-8 bg-indigo-600 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest shadow-[0_40px_80px_-20px_rgba(79,70,229,0.7)] hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95 group">
              {t.hero.cta} <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-16 py-8 bg-white/5 border border-white/10 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-5 backdrop-blur-3xl group">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                <Play size={18} fill="currentColor" />
              </div>
              {t.hero.video}
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- WHO IS AURA --- */}
      <section className="py-40 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-indigo-950/20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 space-y-12">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] border border-indigo-500/20">
              <Compass size={14} /> {t.who.subtitle}
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 text-white">{t.who.title}</h2>
            <p className="text-2xl md:text-3xl text-slate-400 font-medium leading-[1.3] italic border-l-4 border-indigo-600 pl-10 pr-6">
              {t.who.desc}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-10">
              <div className="space-y-4">
                <div className="text-5xl font-black text-indigo-400 tracking-tighter">0.4s</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Yanıt Hızı</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black text-emerald-400 tracking-tighter">%100</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Otonom Tahsilat</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-indigo-600/30 blur-[200px] animate-pulse rounded-full opacity-50" />
            <motion.div whileHover={{ scale: 1.02 }} className="relative bg-black/60 p-6 rounded-[5rem] border border-white/5 shadow-2xl backdrop-blur-3xl">
              <img src="/images/aura_dashboard_v5.png" alt="Aura OS Brain" className="w-full h-auto rounded-[4rem]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- UNIQUE ADVANTAGES --- */}
      <section className="py-40 px-6 border-y border-white/5 bg-[#010101]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black mb-32 tracking-tighter uppercase text-white text-center">{t.uniques.title}</h2>
          <div className="grid lg:grid-cols-3 gap-12">
            {t.uniques.items.map((item, i) => (
              <div key={i} className="group p-14 rounded-[4.5rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all duration-700 relative overflow-hidden">
                <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-12 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black mb-8 uppercase tracking-tight text-white">{item.title}</h3>
                <p className="text-slate-400 text-xl leading-relaxed font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DASHBOARDS REALISM --- */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-none mb-10 opacity-10 text-white">DASHBOARDS</h2>
            <p className="text-indigo-500 font-black uppercase tracking-[0.5em] text-[12px] -mt-20">Gerçekçi İşletim Katmanları</p>
          </div>

          <div className="space-y-40">
            <div className="flex flex-col lg:flex-row items-center gap-24 group">
              <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-emerald-500/20 text-white">
                  <Layers size={14} /> Agency Hub
                </div>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">{t.fomo.agency.title}</h3>
                <ul className="space-y-6">
                  {t.fomo.agency.pros.map(p => (
                    <li key={p} className="flex items-center gap-5 text-lg font-black uppercase tracking-widest text-emerald-400/80">
                      <CheckCircle2 size={18} /> {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xl text-slate-400 font-medium italic border-l-2 border-emerald-500/30 pl-8">{t.fomo.agency.loss}</p>
              </div>
              <div className="lg:order-2 lg:w-1/2 rounded-[4rem] overflow-hidden">
                <img src="/images/agency_command.png" alt="Agency Command" className="w-full h-auto border border-white/10 rounded-[4rem]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-24 group">
              <div className="lg:w-1/2 rounded-[4rem] overflow-hidden">
                <img src="/images/patient_ui.png" alt="Patient Experience" className="w-full h-auto border border-white/10 rounded-[4rem]" />
              </div>
              <div className="lg:w-1/2 space-y-10 pl-6 text-white">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-indigo-500/20">
                  <Stethoscope size={14} /> Clinic UI
                </div>
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">{t.fomo.clinic.title}</h3>
                <ul className="space-y-6">
                  {t.fomo.clinic.pros.map(p => (
                    <li key={p} className="flex items-center gap-5 text-lg font-black uppercase tracking-widest text-indigo-400/80">
                      <CheckCircle2 size={18} /> {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xl text-slate-400 font-medium italic border-l-2 border-indigo-500/30 pl-8">{t.fomo.clinic.loss}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER ALPHA --- */}
      <footer className="py-40 px-8 border-t border-white/5 bg-black/90 backdrop-blur-3xl relative text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-20">
          <div className="flex flex-col items-center md:items-start space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center"><Brain size={32} /></div>
              <span className="text-3xl font-black tracking-tighter uppercase italic py-2 text-white">Aura <span className="text-indigo-400">OS</span></span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30">{t.footer.signature}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 font-black uppercase tracking-widest text-[11px]">
            {Object.values(t.nav).map((item, i) => (
              <Link key={i} href="#" className="text-slate-400 hover:text-white transition-all">{item}</Link>
            ))}
          </div>
          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-slate-600 tracking-[0.4em]">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&display=swap');
        body { font-family: 'Outfit', sans-serif; background: #010101; color: #f1f1f1; margin:0; padding:0; overflow-x:hidden; }
        .font-arabic { font-family: system-ui, sans-serif; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; padding: 0; margin: 0; }
        button { border: none; outline: none; cursor: pointer; }
      `}</style>
    </div>
  );
}
