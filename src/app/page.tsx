"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Shield, Zap, Globe, Menu, X, CheckCircle2, TrendingUp, Sparkles,
  ArrowUpRight, Cpu, BarChart3, Award, Compass, Database, Workflow, Activity, ChevronRight
} from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";

type ContentType = {
  [key in 'tr' | 'en' | 'ar']: {
    hero: { tag: string; title: string; subtitle: string; cta: string };
    funnel: { title: string; desc: string; steps: { title: string; desc: string }[] };
    reality: { title: string; desc: string; old: { title: string; items: string[] }; new: { title: string; items: string[] } };
  }
};

const CONTENT: ContentType = {
  tr: {
    hero: {
      tag: "GOD-MODE ALPHA • V11.0",
      title: "Teknolojiyle Değil,\nSonuçla Hükmedin.",
      subtitle: "Dünyanın İlk Otonom Gelir Motoru ve Fintech Köprüsü. Aura OS, karmaşık medikal süreçleri %100 otonom bir kârlılık merkezine dönüştürür. Eski nesil sistemlerin vadettiğini biz saniyeler içinde gerçekleştiriyoruz.",
      cta: "Operasyonel Analizi Başlat"
    },
    funnel: {
      title: "Ultra-Premium Operasyon",
      desc: "Klinikler ve acenteler için tasarlanmış, içine çeken bir otonom yapı. Sıfır hata, maksimum hız ve mutlak şeffaflık.",
      steps: [
        { title: "Nex-Scan™ Teşhis", desc: "Hastanın niyetini ve medikal profilini 12ms içinde analiz eden yapay zeka katmanı." },
        { title: "Neural Closing", desc: "Global leadleri sıcak tutan ve satışı otonom kapatan nöro-satış protokolü." },
        { title: "Fintech Nexus", desc: "Tüm finansal akışı ve komisyon hakedişlerini anlık yöneten şeffaf köprü." }
      ]
    },
    reality: {
      title: "Pazar Dominansı",
      desc: "Konvansiyonel sistemler 'Süreç' yönetir. Aura OS 'Sonuç' üretir. Biz sadece veri tutmuyoruz; ciro üretiyoruz.",
      old: { title: "Konvansiyonel Yapılar", items: ["Zayıf Yanıt Hızı", "Pasif Veri Depolama", "Manuel Takip Kayıpları", "Durağan Ciro Hacmi"] },
      new: { title: "Aura Standartları", items: ["12ms Senkronizasyon", "Otonom Satış Kapanışı", "Askeri Düzey Güvenlik", "Eksponansiyel Capital ROI"] }
    }
  },
  en: {
    hero: {
      tag: "GOD-MODE ALPHA • V11.0",
      title: "Dominate with Results,\nNot Just Tools.",
      subtitle: "The World's First Autonomous Revenue Engine and Fintech Bridge. Aura OS transforms complex processes into a 100% autonomous profitability center. We deliver what legacy frameworks only promise.",
      cta: "Start Operational Analysis"
    },
    funnel: {
      title: "Ultra-Premium Operation",
      desc: "An immersive autonomous structure designed for elite clinics and agencies. Zero error, maximum speed, and absolute transparency.",
      steps: [
        { title: "Nex-Scan™ Diagnostics", desc: "AI layer analyzing patient intent and medical profile within 12ms." },
        { title: "Neural Closing", desc: "Neuro-sales protocol that keeps global leads hot and closes sales autonomously." },
        { title: "Fintech Nexus", desc: "Transparent bridge managing all financial flows and commission payouts instantly." }
      ]
    },
    reality: {
      title: "Market Dominance",
      desc: "Conventional systems manage 'Process'. Aura OS generates 'Results'. Unlike others, we don't just store data; we generate revenue.",
      old: { title: "Conventional Frameworks", items: ["Weak Response Speed", "Passive Data Storage", "Manual Tracking Losses", "Stagnant Revenue Volume"] },
      new: { title: "Aura Standards", items: ["12ms Synchronization", "Autonomous Sales Closing", "Military-Grade Security", "Exponential Capital ROI"] }
    }
  },
  ar: {
    hero: {
      tag: "GOD-MODE ALPHA • V11.0",
      title: "توقف عن استخدام الأدوات،\nابدأ في جني النتائج.",
      subtitle: "أول محرك إيرادات وجسر مالي مستقل في العالم. أورا أوس يحول العمليات المعقدة إلى مركز ربحية مستقل بنسبة 100٪. نحن نحقق ما تعد به الأطر التقليدية في ثوانٍ.",
      cta: "بدأ التحليل العملياتي"
    },
    funnel: {
      title: "عمليات النخبة",
      desc: "بنية مستقلة غامرة مصممة للعيادات والوكالات المتميزة. صفر أخطاء، أقصى سرعة، وشفافية مطلقة.",
      steps: [
        { title: "Nex-Scan™ تشخيص", desc: "طبقة ذكاء اصطناعي تحلل نية المريض والملف الطبي في غضون 12 مللي ثانية." },
        { title: "Neural Closing", desc: "بروتوكول مبيعات عصبية يحافظ على دفء العملاء العالميين ويغلق المبيعات ذاتيًا." },
        { title: "Fintech Nexus", desc: "جسر شفاف يدير جميع التدفقات المالية ومدfوعات العمولات على الفور." }
      ]
    },
    reality: {
      title: "سيادة السوق",
      desc: "الأنظمة التقليدية تدير 'العمليات'. أورا أوس يولد 'النتائج'. على عكس الآخرين، نحن لا نخزن البيانات فحسب، بل نولد الإيرادات.",
      old: { title: "الأطر التقليدية", items: ["سرعة استجابة ضعيفة", "تخزين بيانات سلبي", "خسائر التتبع اليدوي", "حجم إيرادات راكد"] },
      new: { title: "معايير أورا", items: ["مزامنة 12ms", "إغلاق مبيعات ذاتي", "أمن بمستوى عسكري", "عائد استثمار رأسمالي مضاعف"] }
    }
  }
};

const GodModeCore = () => (
  <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center pointer-events-none">
    {/* Concentric Glows */}
    <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#00F0FF]/10 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-indigo-500/5 blur-[100px] rounded-full" />

    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} className="relative z-10 w-56 h-56 md:w-96 md:h-96 border border-white/5 rounded-full flex items-center justify-center p-4">
      {/* Orbiting Rings */}
      <div className="absolute inset-0 border border-[#00F0FF]/10 rounded-full animate-[spin_30s_linear_infinite]" />
      <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
      <div className="absolute inset-16 border border-[#00F0FF]/5 rounded-full animate-[spin_40s_linear_infinite]" />

      <div className="relative w-full h-full rounded-full bg-gradient-to-b from-white/5 to-transparent backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl">
        <Brain size={120} className="text-white drop-shadow-[0_0_50px_rgba(0,240,255,0.6)]" />
      </div>
    </motion.div>
  </div>
);

export default function GodModePage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const t = CONTENT[lang];

  return (
    <AuraLayout lang={lang} setLang={setLang}>
      {/* --- HERO: ULTIMATE DOMINANCE --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-[#050505] text-[#E0E0E0]">
        {/* Immersive Neural Background */}
        <div className="absolute inset-0 opacity-40 grayscale-[0.8] brightness-[0.4] pointer-events-none transition-all duration-1000 group-hover:grayscale-0">
          <img src="/images/aura_prestige_nexus_void_fill_1769365496003.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="max-w-[1700px] mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 text-[#00F0FF] rounded-lg text-[10px] font-black uppercase tracking-[0.6em] border border-white/10 backdrop-blur-3xl">
              <Sparkles size={14} /> {t.hero.tag}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-[10rem] font-bold tracking-[-0.08em] leading-[0.82] text-white uppercase italic drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
              {t.hero.title}
            </motion.h1>

            <div className="max-w-xl space-y-16">
              <p className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed border-l-4 border-[#00F0FF]/40 pl-10">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                <button className="glass-btn px-16 py-8 rounded-full text-[11px] font-black uppercase tracking-[0.5em] text-[#00F0FF] overflow-hidden relative group shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                  <span className="relative z-10 flex items-center gap-6">{t.hero.cta} <ArrowUpRight size={20} /></span>
                  <div className="absolute inset-0 bg-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="px-16 py-8 rounded-full text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-white transition-all border border-white/5 bg-white/5 backdrop-blur-3xl">
                  Alpha Mimari
                </button>
              </div>
            </div>
          </div>

          <GodModeCore />
        </div>
      </section>

      {/* --- FUNNEL: ULTIMATE PREMIUM FLOW --- */}
      <section className="py-80 px-6 relative overflow-hidden bg-[#030303]">
        {/* Visual Depth layers */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#00F0FF_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent shadow-[0_0_20px_#00F0FF]" />

        <div className="max-w-[1700px] mx-auto">
          <div className="text-left mb-40 space-y-10 max-w-5xl">
            <h2 className="text-6xl md:text-[11rem] font-bold tracking-[-0.1em] text-white leading-none uppercase italic">{t.funnel.title}</h2>
            <p className="text-3xl text-slate-500 font-medium leading-relaxed max-w-3xl italic">"{t.funnel.desc}"</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            {t.funnel.steps.map((step, i) => (
              <div key={i} className="p-20 rounded-[5rem] bg-white/[0.01] border border-white/5 hover:border-[#00F0FF]/40 hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden shadow-3xl">
                <div className="absolute -bottom-20 -right-20 text-[180px] font-black text-white/[0.02] select-none leading-none italic">{i + 1}</div>
                <div className="space-y-12 relative z-10">
                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-[#00F0FF] border border-white/10 shadow-3xl group-hover:bg-[#00F0FF] group-hover:text-black transition-all duration-700">
                    {i === 0 && <Cpu size={36} />}
                    {i === 1 && <Workflow size={36} />}
                    {i === 2 && <Database size={36} />}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl font-bold uppercase text-white italic tracking-tighter leading-none">{step.title}</h3>
                    <p className="text-2xl text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE: 3D DASHBOARD MATRIX --- */}
      <section className="py-40 px-6 bg-[#050505] overflow-hidden">
        <div className="max-w-[1700px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-12 xl:col-span-5 space-y-16 order-2 xl:order-1">
              <div className="text-[#00F0FF] font-black uppercase tracking-[1em] text-[10px] opacity-80">Global Revenue Nexus</div>
              <h2 className="text-6xl md:text-[9rem] font-bold tracking-[-0.1em] text-white leading-[0.8] uppercase italic">GELİR AKIŞI<br />OTONOMİSİ.</h2>
              <p className="text-2xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-2xl">Aura OS, operasyonel karmaşayı %100 otonom bir finansal hakediş zekasına dönüştürür. Hata payı teknik olarak imkansızdır.</p>
              <div className="space-y-10 pt-10">
                {[
                  { label: "Sıfır Hata Protokolü", icon: <CheckCircle2 size={24} /> },
                  { label: "Global Capital ROI", icon: <TrendingUp size={24} /> },
                  { label: "Askeri Düzey Maskeleme", icon: <Shield size={24} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.5em] text-teal-400/60 hover:text-[#00F0FF] transition-all cursor-default">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] shadow-2xl">{item.icon}</div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7 relative order-1 xl:order-2">
              <motion.div initial={{ rotateY: 30, rotateX: 15 }} whileInView={{ rotateY: -20, rotateX: 10 }} transition={{ duration: 3, ease: "easeOut" }} className="relative z-10 rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] group bg-black">
                <div className="absolute inset-0 bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <img src="/images/aura_revenue_stream_dashboard_9_0_1769350040691.png" alt="Revenue Matrix" className="w-full h-auto object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[3000ms]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-transparent pointer-events-none" />
              </motion.div>
              {/* Visual fills to avoid "black holes" */}
              <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#00F0FF]/[0.02] blur-[150px] rounded-full" />
              <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-indigo-500/[0.02] blur-[120px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- REALITY CHECK: MERCILESS DIVIDE --- */}
      <section className="py-80 px-6 bg-[#030303] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-[1700px] mx-auto">
          <div className="text-left mb-40 space-y-10">
            <h2 className="text-7xl md:text-[12rem] font-bold tracking-[-0.1em] text-white leading-none uppercase italic">{t.reality.title}</h2>
            <p className="text-3xl text-slate-500 max-w-3xl font-medium leading-relaxed">Rakipler 'Veri Girişi' yaptırır. Aura OS 'Ciro Çıkışı' sağlar. Karar sizin.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-24">
            <div className="p-24 rounded-[5rem] bg-white/[0.01] border border-white/5 space-y-16 filter grayscale opacity-20 hover:opacity-50 transition-all duration-700 group cursor-not-allowed">
              <h3 className="text-5xl font-black uppercase text-slate-700 group-hover:text-red-900 transition-colors">{t.reality.old.title}</h3>
              <div className="space-y-10">
                {t.reality.old.items.map(it => (
                  <div key={it} className="flex items-center gap-10 text-3xl font-bold text-slate-800">
                    <X size={32} className="text-red-900/40" /> {it}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-24 rounded-[5rem] bg-white/[0.01] border border-[#00F0FF]/30 space-y-16 shadow-[0_0_150px_-30px_rgba(0,240,255,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00F0FF]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 px-12 py-5 bg-[#00F0FF] text-black text-[11px] font-black tracking-[0.5em] uppercase shadow-2xl">GOD-MODE ACTIVE</div>
              <h3 className="text-5xl font-black uppercase text-white tracking-widest leading-none drop-shadow-2xl">{t.reality.new.title}</h3>
              <div className="space-y-10 relative z-10">
                {t.reality.new.items.map(it => (
                  <div key={it} className="flex items-center gap-10 text-3xl font-bold text-[#00F0FF] drop-shadow-lg">
                    <CheckCircle2 size={32} className="text-[#00F0FF]" /> {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRESTIGE FOOTNOTE: THE SIGNATURE --- */}
      <section className="py-40 px-6 bg-[#050505] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img src="/images/aura_prestige_nexus_void_fill_1769365496003.png" alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <p className="text-[12px] font-black uppercase tracking-[1.5em] text-white/20">The Excellence Factor</p>
          <a href="https://www.nextoriadigital.com" target="_blank" rel="noopener noreferrer" className="text-4xl md:text-7xl font-bold text-white uppercase italic tracking-tighter hover:text-[#00F0FF] transition-all duration-700 drop-shadow-2xl active:scale-95">WWW.NEXTORIADIGITAL.COM</a>
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.8em]">Sıfır Hata • Mutlak Vizyon • Alpha Otonomi</p>
        </div>
      </section>
    </AuraLayout>
  );
}
