"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Brain, Shield, Zap, Globe, Lock, Menu, X, Play, CheckCircle2, TrendingUp, Target, Sparkles,
  ArrowUpRight, DollarSign, Cpu, Fingerprint, BarChart3, Award, Compass, Eye, Server, Radio,
  HeartPulse, Stethoscope, ChevronDown, Activity, Layers, Database, Workflow
} from "lucide-react";
import Link from "next/link";

// --- ALPHA CONFIG 8.0: OMEGA STANDARDS ---
const OMEGA_CONFIG = {
  colors: { bg: "#000000", accent: "#4f46e5", success: "#10b981", text: "#f8fafc" },
  lang: ['tr', 'en', 'ar'] as const
};

const CONTENT = {
  tr: {
    hero: {
      tag: "OMEGA ZENITH • V8.0 ALPHA",
      title: "Sağlık Turizminin\nOtonom Sinir Sistemi",
      subtitle: "Chatbotlar sadece konuşur. Aura OS; teşhis koyar, niyet puanlar ve satışı kapatır. Klinikler ve acenteler için 5x daha güçlü, tamamen otonom bir gelecek.",
      cta: "Alpha Erişimi Al",
      stats: [
        { label: "Otonom Kapanış", val: "%94" },
        { label: "Yanıtlama Hızı", val: "0.4sn" },
        { label: "Gelir Artışı", val: "4.2x" }
      ]
    },
    neural: {
      title: "Aura Nasıl Düşünür?",
      steps: [
        { title: "Capture", desc: "WhatsApp/Web üzerinden mesajı anında yakalar.", icon: <Radio /> },
        { title: "Nex-Scan™", desc: "Fotoğrafları tıbbi hassasiyetle analiz eder.", icon: <Eye /> },
        { title: "Auction", desc: "En uygun kliniğe leadi otonom aktarır.", icon: <Server /> },
        { title: "Closing", desc: "In-chat ödeme ile depozitoyu tahsil eder.", icon: <DollarSign /> }
      ]
    },
    fomo: {
      title: "Görünmez Kayıp Analizi",
      desc: "Aura OS olmadığı her saniye, kliniğiniz milyon dolarlık potansiyeli rakiplerine hediye ediyor.",
      items: [
        { title: "Night Leak", val: "-%82", label: "Gece gelen leadlerin kaybı" },
        { title: "Human Error", val: "-%40", label: "Yanlış teşhis ve niyet analizi" }
      ]
    }
  }
};

// --- ELITE COMPONENTS ---

const Navigation = ({ lang, setLang }: { lang: 'tr' | 'en' | 'ar', setLang: (l: 'tr' | 'en' | 'ar') => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[999] px-6 py-6 transition-all duration-500">
      <div className={`max-w-[1600px] mx-auto flex items-center justify-between rounded-[2.5rem] px-8 h-20 md:h-24 transition-all duration-700 border ${isScrolled ? 'bg-black/90 backdrop-blur-3xl border-white/10 shadow-2xl scale-[0.98]' : 'bg-transparent border-transparent'}`}>
        <Link href="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <Brain size={28} className="text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter uppercase italic leading-none text-white">AURA <span className="text-indigo-500">OS</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {['Klinikler', 'Acenteler', 'Teknoloji', 'Vizyon'].map((item, i) => (
            <Link key={i} href={`#${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-white transition-all">{item}</Link>
          ))}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {OMEGA_CONFIG.lang.map(l => (
              <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <button className="bg-white text-black px-10 py-4.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95">SİSTEME HÜKMET</button>
        </div>

        <button className="lg:hidden p-3 bg-white/5 rounded-full text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-32 left-6 right-6 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 flex flex-col items-center gap-10 lg:hidden shadow-3xl text-white">
            {['Klinikler', 'Acenteler', 'Teknoloji', 'Vizyon'].map((item, i) => (
              <Link key={i} href="#" className="text-2xl font-black uppercase tracking-widest">{item}</Link>
            ))}
            <button className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-widest">GİRİŞ YAP</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function OmegaZenithPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <div className={`min-h-screen bg-[#000000] text-slate-50 selection:bg-indigo-500/40 overflow-x-hidden ${isRTL ? 'text-right font-arabic' : 'text-left font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation lang={lang} setLang={setLang} />

      {/* --- HERO 8.0: OMEGA ZENITH --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 lg:pt-0">
        {/* Background Containment */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-black" />
          <img src="/images/global_nexus.png" alt="" className="w-full h-full object-cover opacity-30 mix-blend-screen scale-110 blur-[2px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full mb-20 lg:mb-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-8 py-3 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.5em] mb-12 border border-indigo-500/20 backdrop-blur-3xl">
            <Sparkles size={14} className="animate-pulse" /> {t.hero.tag}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1 }} className="text-6xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-14 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic">
            {t.hero.title}
          </motion.h1>

          <div className="max-w-4xl mx-auto space-y-16">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed italic px-4 border-l-2 border-indigo-600/50 pl-10 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-8 justify-center">
              <button className="px-16 py-8 bg-indigo-600 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest shadow-[0_40px_80px_-20px_rgba(79,70,229,0.7)] hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-4">
                {t.hero.cta} <ArrowUpRight size={20} />
              </button>
              <button className="px-16 py-8 bg-white/5 border border-white/10 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-6 backdrop-blur-3xl group">
                <div className="w-12 h-12 bg-indigo-500/30 rounded-full flex items-center justify-center group-hover:scale-125 transition-all shadow-2xl">
                  <Play size={18} fill="currentColor" />
                </div>
                VORTEX VISION™
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              {t.hero.stats.map(s => (
                <div key={s.label} className="space-y-2">
                  <div className="text-4xl md:text-6xl font-black text-indigo-400 tracking-tighter">{s.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE NEURAL MAP: HOW AURA THINKS --- */}
      <section id="teknoloji" className="py-40 px-6 bg-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-40">
            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase leading-none mb-10 text-white">{t.neural.title}</h2>
            <p className="text-indigo-500 font-black uppercase tracking-[1em] text-[12px] -mt-5">Otonom Karar Mekanizması</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-600/50 to-transparent -translate-y-1/2" />

            {t.neural.steps.map((step, i) => (
              <motion.div key={i} whileHover={{ y: -20 }} className="relative z-10 p-12 rounded-[5rem] bg-indigo-950/10 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-900/10 transition-all duration-700 group text-center lg:text-left">
                <div className="w-24 h-24 bg-indigo-600/20 rounded-3xl flex items-center justify-center text-indigo-400 mx-auto lg:mx-0 mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-3xl">
                  {step.icon}
                </div>
                <div className="text-indigo-500 font-black mb-4">0{i + 1}</div>
                <h3 className="text-3xl font-black mb-6 uppercase text-white tracking-tight">{step.title}</h3>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Neural Mesh Asset */}
          <div className="mt-40 relative rounded-[5rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none" />
            <img src="/images/global_nexus.png" alt="Neural Mesh" className="w-full h-[600px] object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3000ms]" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-20">
              <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter shadow-2xl">THE DIGITAL NERVOUS SYSTEM</h3>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-semibold italic">"Aura, karmaşık ilişkileri ve medikal veriyi saniyeler içinde işleyerek insani hatayı %100 oranında siler."</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOMO: THE LOSS ENGINE --- */}
      <section className="py-40 px-6 bg-[#020202] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
          <div className="lg:w-1/2 space-y-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase">{t.fomo.title}</h2>
            <p className="text-2xl md:text-3xl text-red-500 font-black uppercase tracking-[0.3em] animate-pulse italic">Kök Neden Analizi</p>
            <p className="text-2xl text-slate-400 leading-relaxed font-medium italic border-l-4 border-red-600 pl-10">
              {t.fomo.desc}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {t.fomo.items.map(it => (
                <div key={it.title} className="p-10 rounded-3xl bg-red-600/5 border border-red-600/20 space-y-4">
                  <div className="text-6xl font-black text-red-600 tracking-tighter">{it.val}</div>
                  <div className="text-sm font-black uppercase tracking-widest text-slate-300">{it.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative bg-black/60 p-12 rounded-[5rem] border border-white/10 shadow-3xl">
            <img src="/images/aura_financial_dominance_graph_1769345271308.png" alt="Loss Graph" className="w-full h-auto rounded-[4rem]" />
          </div>
        </div>
      </section>

      {/* --- NEXTORIA MULTI-PAGE SECTORS --- */}
      <section id="klinikler" className="py-40 px-6 text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-20">
          {/* CLINIC MODULE */}
          <div className="relative p-16 lg:p-24 rounded-[6rem] bg-indigo-950/10 border border-white/10 group overflow-hidden">
            <div className="relative z-10 space-y-12">
              <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-3xl"><HeartPulse size={40} /></div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">KLİNİK<br />OTONOMİSİ.</h2>
              <p className="text-2xl text-slate-400 font-medium leading-relaxed italic">Gece leadlerini %80 geri kazanın. Nex-Scan™ AI ile teşhiste hata katsayısını sıfırlayın.</p>
              <Link href="/solutions/clinics" className="inline-flex items-center gap-6 px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all group/btn">
                DERİNLEMESİNE İNCELE <ArrowUpRight className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            <img src="/images/patient_ui.png" alt="" className="mt-20 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-all duration-[3000ms] shadow-3xl" />
          </div>

          {/* AGENCY MODULE */}
          <div id="acenteler" className="relative p-16 lg:p-24 rounded-[6rem] bg-emerald-950/10 border border-white/10 group overflow-hidden mt-20 lg:mt-40">
            <div className="relative z-10 space-y-12">
              <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-3xl"><Layers size={40} /></div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-emerald-400">ACENTE<br />HUB.</h2>
              <p className="text-2xl text-slate-400 font-medium leading-relaxed italic">Sınırsız klinik hesabı yönetimi. Auction Engine ile lead verimini ölçeklendirin.</p>
              <Link href="/solutions/agencies" className="inline-flex items-center gap-6 px-12 py-6 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all group/btn">
                OMNICHANNEL YÖNETİM <ArrowUpRight className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
            <img src="/images/agency_command.png" alt="" className="mt-20 rounded-[3rem] opacity-50 group-hover:opacity-100 transition-all duration-[3000ms] shadow-3xl" />
          </div>
        </div>
      </section>

      {/* --- THE OMEGA CTAS --- */}
      <section className="py-80 px-6 text-center bg-gradient-to-t from-indigo-900/10 to-transparent">
        <div className="max-w-6xl mx-auto space-y-20">
          <h2 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.7] text-white italic drop-shadow-3xl">THE SYSTEM<br />IS LIVE.</h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="px-32 py-10 bg-white text-black text-sm font-black uppercase tracking-[0.8em] rounded-full hover:bg-indigo-600 hover:text-white hover:scale-110 shadow-3xl transition-all duration-700">GİRİŞİ ELE AL</button>
          </div>
          <div className="text-slate-700 font-black uppercase tracking-[1em] text-[11px] pt-10">NEXTORIA ALPHA • SECURE 2026</div>
        </div>
      </section>

      {/* --- OMEGA FOOTER --- */}
      <footer className="py-40 px-8 border-t border-white/5 bg-black text-white relative">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-4 gap-24">
          <div className="lg:col-span-1 space-y-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-3xl"><Brain size={36} /></div>
              <span className="text-4xl font-black tracking-tighter uppercase italic leading-none">AURA <span className="text-indigo-500">OS</span></span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 leading-loose">
              Omega Zenith Implementation v8.0<br />Digital Nervous System Alpha<br />Managed by Nextoria Digital
            </p>
            <div className="flex gap-4">
              {[Shield, Cpu, Globe, Server].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer"><Icon size={20} /></div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-8">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Sektörler</div>
              {['Klinikler', 'Acenteler', 'Hastaneler', 'Medikal'].map(i => <Link key={i} href="#" className="block text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white">{i}</Link>)}
            </div>
            <div className="space-y-8">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Teknoloji</div>
              {['Nex-Scan AI', 'Neural Closing', 'Auction Engine', 'Security Vault'].map(i => <Link key={i} href="#" className="block text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white">{i}</Link>)}
            </div>
            <div className="space-y-8">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">Kurumsal</div>
              {['Vizyon 2026', 'Gizlilik', 'Şartlar', 'Alpha'].map(i => <Link key={i} href="#" className="block text-[11px] font-black uppercase tracking-widest text-slate-800 hover:text-white">{i}</Link>)}
            </div>
          </div>

          <div className="lg:col-span-1 text-center lg:text-right space-y-8">
            <div className="text-sm font-black uppercase tracking-[0.6em] text-white">NEXTORIA DIGITAL ALPHA</div>
            <p className="text-[10px] font-black text-slate-800 tracking-[0.4em]">© 2026 AURA OS GALACTIC. TÜM HAKLARI SAKLIDIR.</p>
            <div className="flex justify-center lg:justify-end gap-6 opacity-20">
              <Award size={40} />
              <Workflow size={40} />
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;900&display=swap');
        body { background: #000000; color: #f8fafc; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-arabic { font-family: system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #222; }
        h1, h2, h3 { letter-spacing: -0.05em !important; }
      `}</style>
    </div>
  );
}
