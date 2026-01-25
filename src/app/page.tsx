"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AuraLayout from "@/components/AuraLayout";
import { Sparkles, ArrowUpRight, Play, Brain, Shield, Zap, TrendingUp, CheckCircle2, ChevronRight, MessageSquare, Globe, HeartPulse, Stethoscope, Camera, DollarSign, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function MasterLandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const CONTENT = {
    tr: {
      hero: {
        tag: "NEXTORIA ALPHA • V7.0",
        title: "Sağlık Turizminin\nOtonom İşletim Sistemi",
        subtitle: "Chatbotlar ölür, Aura yaşatır. Dünyanın ilk 'Cerrahi Hassasiyetli' otonom motoruyla lead sızıntılarını sonlandırın ve %420 gelir artışını Nextoria kalitesiyle canlandırın.",
        cta: "Alpha Erişimi Al",
        secondary: "Vortex Vision™ İzle"
      },
      why: {
        title: "Neden Aura OS?",
        subtitle: "Rakiplerin Tozunu Yutan Teknoloji",
        desc: "Aura OS, sadece bir 'mesajlaşma aracı' değildir. Nex-Scan™ AI ile fotoğraf analizi yapabilen, niyet puanlayan ve finansal kapanışı (in-chat payment) saniyeler içinde tamamlayan dünyanın tek otonom büyüme katmanıdır."
      }
    }
  };

  const t = CONTENT['tr'];

  return (
    <AuraLayout lang={lang} setLang={setLang}>
      {/* --- HERO: THE GATEWAY --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 overflow-hidden border-b border-white/5">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <img src="/images/global_nexus.png" alt="Aura Alpha Build" className="w-full h-full object-cover opacity-60 mix-blend-screen scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/90" />
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-6 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-12 border border-indigo-500/20 backdrop-blur-3xl">
            <Sparkles size={14} className="animate-pulse" /> {t.hero.tag}
          </motion.div>
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.82] mb-14 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent whitespace-pre-line">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-16 font-medium leading-relaxed italic">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-16 py-8 bg-indigo-600 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest shadow-[0_40px_80px_-20px_rgba(79,70,229,0.7)] hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-3">
              {t.hero.cta} <ArrowUpRight size={20} />
            </button>
            <button className="px-16 py-8 bg-white/5 border border-white/10 text-white rounded-[3rem] text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-5 backdrop-blur-3xl group">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                <Play size={18} fill="currentColor" />
              </div>
              {t.hero.secondary}
            </button>
          </div>
        </div>
      </section>

      {/* --- SOLUTION TRACKS: THE OPERATING SYSTEM EXPERIENCE --- */}
      <section className="py-40 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* CLINIC TRACK */}
            <Link href="/solutions/clinics" className="group block relative p-12 lg:p-20 rounded-[4rem] bg-indigo-900/10 border border-white/10 hover:border-indigo-500/40 transition-all duration-700 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/10 blur-[100px] group-hover:bg-indigo-600/30 transition-all" />
              <div className="relative z-10 space-y-10">
                <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.5em]">{lang === 'tr' ? 'KLİNİKLER İÇİN' : 'FOR CLINICS'}</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Cerrahi<br />Hassasiyet.</h2>
                <p className="text-2xl text-slate-400 font-medium italic">Gece leadlerini %80 geri kazanın ve personelinizi robotik işlerden kurtarın.</p>
                <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[11px]">
                  KEŞFET <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <img src="/images/patient_ui.png" alt="Patient UI" className="mt-16 rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity translate-y-10 group-hover:translate-y-0 duration-1000 shadow-3xl" />
            </Link>

            {/* AGENCY TRACK */}
            <Link href="/solutions/agencies" className="group block relative p-12 lg:p-20 rounded-[4rem] bg-emerald-900/10 border border-white/10 hover:border-emerald-500/40 transition-all duration-700 overflow-hidden mt-20 lg:mt-40">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-600/10 blur-[100px] group-hover:bg-emerald-600/30 transition-all" />
              <div className="relative z-10 space-y-10">
                <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.5em]">{lang === 'tr' ? 'ACENTELER İÇİN' : 'FOR AGENCIES'}</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">Multi-Tenant<br />Gücü.</h2>
                <p className="text-2xl text-slate-400 font-medium italic">Sınırsız kliniği tek merkezden yönetin, Auction Engine ile lead verimini 5x artırın.</p>
                <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[11px]">
                  KEŞFET <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <img src="/images/agency_command.png" alt="Agency Hub" className="mt-16 rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity translate-y-10 group-hover:translate-y-0 duration-1000 shadow-3xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- WHY AURA: THE CORE TRUTH --- */}
      <section className="py-40 px-6 border-y border-white/5 relative bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 space-y-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">{t.why.title}</h2>
            <p className="text-2xl md:text-3xl text-indigo-400 font-black uppercase tracking-[0.3em]">{t.why.subtitle}</p>
            <p className="text-2xl text-slate-300 font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-10">
              {t.why.desc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { title: "Nex-Scan™ AI", icon: <Camera />, link: "/technology" },
                { title: "Surgical-Security", icon: <Shield />, link: "/security" },
                { title: "Neural Closing™", icon: <Zap />, link: "/technology" },
                { title: "2026 Vision", icon: <Globe />, link: "/vision" }
              ].map((item, i) => (
                <Link href={item.link} key={i} className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">{item.icon}</div>
                  <span className="text-sm font-black uppercase tracking-widest text-white">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-indigo-600/20 blur-[150px] animate-pulse rounded-full" />
            <img src="/images/hero_v5.png" alt="Aura Core" className="relative z-10 w-full rounded-[4rem] border border-white/10 shadow-3xl" />
          </div>
        </div>
      </section>

      {/* --- FINAL CONVERSION --- */}
      <section className="py-60 px-6 text-center">
        <div className="max-w-6xl mx-auto space-y-16">
          <h2 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] text-white">HAKİMİYET<br />BAŞLASIN.</h2>
          <p className="text-2xl text-slate-500 font-black tracking-[0.4em]">ALPHA ACCESS ONLY • NEXTORIA EXCLUSIVE</p>
          <button className="px-24 py-10 bg-white text-black text-sm font-black uppercase tracking-[0.6em] rounded-full hover:bg-indigo-600 hover:text-white hover:scale-110 shadow-3xl transition-all duration-700">ERİŞİM TALEP ET</button>
        </div>
      </section>
    </AuraLayout>
  );
}
