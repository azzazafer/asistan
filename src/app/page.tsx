'use client';

import React, { useState } from 'react';
import {
  Zap, Globe, Shield, Activity, MessageSquare,
  BarChart3, CheckCircle2, ArrowRight, Lock,
  LayoutDashboard, Users, HeartPulse, TrendingUp, AlertTriangle, Play
} from 'lucide-react';
import Link from 'next/link';

// --- 1. CONTENT DICTIONARY (THE BRAIN) ---
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
    pain: {
      title: "Gerçekle Yüzleşin:",
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
    pain: {
      title: "Face the Reality:",
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
    pain: {
      title: "واجه الحقيقة:",
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

  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden ${isRTL ? 'font-arabic' : ''}`}
    >

      {/* --- 1. NAVBAR (Sticky & Glass) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center animate-pulse">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">AURA OS</span>
              <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Autonomous Logic</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-cyan-400 transition-colors">{t.nav.features}</a>
            <a href="#panels" className="hover:text-cyan-400 transition-colors">{t.nav.panels}</a>
            <a href="#pain" className="hover:text-cyan-400 transition-colors">{t.nav.why}</a>
          </div>

          {/* Lang & Action */}
          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
              {(['tr', 'en', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-white'
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link href="https://wa.me/905322850606" className="hidden sm:flex bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full text-sm font-bold transition-all items-center gap-2">
              {t.nav.login}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION (The Hook) --- */}
      <main className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              {t.hero.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {t.hero.title}
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="https://wa.me/905322850606"
                className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105"
              >
                <MessageSquare className="w-5 h-5" />
                {t.hero.cta_primary}
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-medium transition-all">
                {t.hero.cta_secondary}
              </button>
            </div>
          </div>

          {/* CSS HERO VISUAL (ABSTRACT BRAIN) */}
          <div className="relative h-[400px] w-full flex items-center justify-center">
            <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="relative w-full max-w-md bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="text-[10px] text-gray-500 font-mono ml-auto">AI_CORE_ACTIVE</div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-2 bg-gray-800 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-800/50 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-3 text-xs text-gray-400">
                      ...scanning dental x-ray image...
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-cyan-600 flex-shrink-0 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                  <div className="space-y-2 w-full flex flex-col items-end">
                    <div className="h-2 bg-cyan-900/50 rounded w-1/4"></div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-3 text-xs text-cyan-200">
                      ⚠️ Detection: Cavity on tooth #36.<br />
                      💡 Suggestion: Root canal therapy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* --- 3. PAIN POINT (The Funnel Hook) --- */}
      <section id="pain" className="py-20 bg-gradient-to-b from-black to-neutral-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 text-red-400 bg-red-900/20 px-4 py-2 rounded-full mb-6 border border-red-500/20">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">{t.pain.title}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.pain.stat}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {t.pain.desc}
          </p>
        </div>
      </section>

      {/* --- 4. INTERACTIVE DASHBOARDS (The Proof) --- */}
      <section id="panels" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'clinic' as const, label: t.tabs.clinic, icon: LayoutDashboard },
              { id: 'agency' as const, label: t.tabs.agency, icon: Users },
              { id: 'patient' as const, label: t.tabs.patient, icon: HeartPulse },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all border ${activeTab === tab.id
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-black text-gray-400 border-white/10 hover:border-white/30'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Mockups (CSS Only) */}
          <div className="bg-[#0A0A0A] rounded-3xl border border-white/10 p-2 md:p-8 min-h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-50"></div>

            {activeTab === 'clinic' && (
              <div className="animate-in fade-in duration-500 h-full">
                <div className="grid md:grid-cols-4 gap-6 h-full">
                  {/* Sidebar */}
                  <div className="hidden md:block col-span-1 bg-white/5 rounded-2xl p-4 space-y-2">
                    <div className="h-8 bg-cyan-500/20 rounded-lg w-full mb-6"></div>
                    <div className="h-8 bg-white/5 rounded-lg w-full"></div>
                    <div className="h-8 bg-white/5 rounded-lg w-full"></div>
                  </div>
                  {/* Content */}
                  <div className="col-span-3 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-white">Dashboard</h3>
                      <div className="text-emerald-400 bg-emerald-900/20 px-3 py-1 rounded-full text-xs">Online</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black border border-white/10 p-6 rounded-2xl">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Revenue</div>
                        <div className="text-3xl font-bold text-white">₺45,250</div>
                      </div>
                      <div className="bg-black border border-white/10 p-6 rounded-2xl">
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">Appointments</div>
                        <div className="text-3xl font-bold text-cyan-400">12</div>
                      </div>
                    </div>
                    <div className="bg-black border border-white/10 p-6 rounded-2xl h-48 flex items-end gap-2 px-10 pb-0">
                      {[20, 40, 30, 70, 50, 90, 60, 80].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-t-lg hover:bg-cyan-500 transition-colors"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agency' && (
              <div className="animate-in fade-in duration-500 p-4">
                <h3 className="text-2xl font-bold text-white mb-6">Partner Admin</h3>
                <table className="w-full text-left">
                  <thead className="text-gray-500 text-xs uppercase border-b border-white/10">
                    <tr>
                      <th className="pb-4">Client Name</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {[1, 2, 3, 4].map((i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-4 pl-2 font-medium">Dental Clinic #{i}</td>
                        <td className="py-4"><span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Active</span></td>
                        <td className="py-4 text-right font-mono">₺{(Math.random() * 50000).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'patient' && (
              <div className="animate-in fade-in duration-500 flex justify-center items-center h-full">
                <div className="w-[300px] bg-black border border-white/20 rounded-[30px] p-4 overflow-hidden shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-full h-12 bg-gray-900 border-b border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">
                    Aura Assistant
                  </div>
                  <div className="mt-12 space-y-4 text-sm">
                    <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-gray-200">
                      Röntgen analizi tamamlandı. 🦷
                    </div>
                    <div className="bg-cyan-600 p-3 rounded-2xl rounded-tr-none text-white ml-auto w-fit">
                      Ne kadar tutar?
                    </div>
                    <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-gray-200">
                      Normalde ₺5000, ancak bu hafta başlarsanız ₺3500.
                    </div>
                    <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-gray-200">
                      Cumartesi 14:00 uygun mu?
                    </div>
                    <button className="w-full bg-cyan-500 text-black font-bold py-2 rounded-xl mt-4">
                      Evet, Onayla
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* --- 5. BENTO FEATURES --- */}
      <section id="features" className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 bg-cyan-900/20 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.features.vision_title}</h3>
            <p className="text-gray-400">{t.features.vision_desc}</p>
          </div>
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-purple-900/20 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.features.sales_title}</h3>
            <p className="text-gray-400">{t.features.sales_desc}</p>
          </div>
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.features.security_title}</h3>
            <p className="text-gray-400">{t.features.security_desc}</p>
          </div>
        </div>
      </section>

      {/* --- 6. TICKER (Bottom) --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/90 border-t border-white/10 backdrop-blur-md h-10 flex items-center overflow-hidden pointer-events-none">
        <div className="flex gap-12 animate-[marquee_40s_linear_infinite] whitespace-nowrap px-4 opacity-70">
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <TrendingUp className="w-3 h-3" /> Dr. Yılmaz (Istanbul) +₺45,000 Today
          </span>
          <span className="flex items-center gap-2 text-blue-400 text-xs font-mono">
            <Activity className="w-3 h-3" /> DentalPark (Ankara) 5 New Leads
          </span>
          <span className="flex items-center gap-2 text-gray-400 text-xs font-mono">
            <Lock className="w-3 h-3" /> System Secure (Beta v0.9)
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
