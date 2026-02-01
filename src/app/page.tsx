"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Camera, MessageSquare, TrendingUp, Shield, Building2, Users, Zap, Eye, Activity, BarChart3, ChevronRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";

// Content Dictionary for Multi-Language
const content = {
  tr: {
    ticker: ["⚡ Dr. Yılmaz (İstanbul) ₺45.000 Satış Kapattı", "🔥 DentalPark (Ankara) Randevu Onayladı", "💰 Smile Clinic (İzmir) Kapora Tahsil Etti"],
    badge: "Otonom Satış Motoru",
    h1Line1: "Klinikler ve Ajanslar İçin",
    h1Line2: "Otonom Zeka",
    subheadline: "Sekreteriniz uyurken, Aura OS hasta ikna eder, röntgen okur ve",
    revenue: "₺45.000 satış kapatır",
    ctaPrimary: "WhatsApp'ta Canlı Dene",
    ctaSecondary: "Ciro Kaybını Hesapla",
    visionTitle: "Röntgeni Görüyorum",
    visionDesc: "GPT-4o Vision ile diş çürüklerini 3 saniyede tespit eder.",
    funnelTitle: "Satış Hunisi",
    funnelDesc: "Lead'den randevuya otomatik geçiş. Hiç kayıp yok.",
    agencyTitle: "Ajans Modu",
    agencyDesc: "Müşterilerinizi tek panelden yönetin.",
    securityTitle: "KVKK Uyumlu",
    securityDesc: "AES-256 şifreleme ve tam compliance."
  },
  en: {
    ticker: ["⚡ Dr. Yılmaz (Istanbul) $12K Sale", "🔥 DentalPark Appointment Confirmed", "💰 Smile Clinic Deposit Collected"],
    badge: "Autonomous Sales Engine",
    h1Line1: "Autonomous AI for",
    h1Line2: "Clinics & Agencies",
    subheadline: "While your staff sleeps, Aura OS persuades patients, reads X-rays and",
    revenue: "closes $12K sales",
    ctaPrimary: "Try Live on WhatsApp",
    ctaSecondary: "Calculate Revenue Loss",
    visionTitle: "I See X-Rays",
    visionDesc: "GPT-4o Vision detects cavities in 3 seconds.",
    funnelTitle: "Sales Funnel",
    funnelDesc: "Auto conversion from lead to appointment. Zero loss.",
    agencyTitle: "Agency Mode",
    agencyDesc: "Manage clients from one panel.",
    securityTitle: "GDPR Compliant",
    securityDesc: "AES-256 encryption and full compliance."
  },
  ar: {
    ticker: ["⚡ د. يلماز ₺45K بيع", "🔥 DentalPark موعد مؤكد", "💰 Smile Clinic إيداع"],
    badge: "محرك المبيعات الذاتي",
    h1Line1: "الذكاء الاصطناعي المستقل",
    h1Line2: "للعيادات والوكالات",
    subheadline: "بينما فريقك نائم، Aura OS يقنع المرضى، يقرأ الأشعة و",
    revenue: "يغلق مبيعات ₺45K",
    ctaPrimary: "جرب على واتساب",
    ctaSecondary: "احسب خسارة الإيرادات",
    visionTitle: "أرى الأشعة",
    visionDesc: "GPT-4o يكتشف التسوس في 3 ثوانٍ.",
    funnelTitle: "مسار المبيعات",
    funnelDesc: "تحويل تلقائي من العميل المحتمل إلى الموعد.",
    agencyTitle: "وضع الوكالة",
    agencyDesc: "إدارة العملاء من لوحة واحدة.",
    securityTitle: "متوافق مع KVKK",
    securityDesc: "تشفير AES-256 والامتثال الكامل."
  }
};

export default function PremiumLandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

  useEffect(() => {
    const savedLang = (localStorage.getItem('aura_lang') as 'tr' | 'en' | 'ar') || 'tr';
    setLang(savedLang);
    document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const t = content[lang];

  return (
    <AuraLayout>
      {/* Hero Section - $1M SaaS Premium */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-full">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{t.badge}</span>
            </div>

            {/* Hero Headline - WHITE TEXT (NO PURPLE) */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="text-white">{t.h1Line1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400">
                {t.h1Line2}
              </span>
            </h1>

            {/* Subheadline - GRAY-100 (HIGH CONTRAST) */}
            <p className="text-xl text-gray-100 leading-relaxed max-w-xl">
              {t.subheadline} <span className="text-emerald-400 font-bold">{t.revenue}</span>. 7/24.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.open('https://wa.me/905322850606?text=Merhaba%2C%20Aura%20OS', '_blank')}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                {t.ctaPrimary}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link href="/calculate-loss">
                <button className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm">
                  {t.ctaSecondary}
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-cyan-400" />
                <span className="text-sm text-gray-300">Kredi Kartı Gerekmez</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-sm text-gray-300">30 Saniyede Başla</span>
              </div>
            </div>
          </motion.div>

          {/* Right: TILTED 3D CSS DASHBOARD MOCKUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
            style={{ perspective: '1500px' }}
          >
            <div
              className="relative"
              style={{ transform: 'rotateY(-12deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}
            >
              {/* Dashboard Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-slate-800/50 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">CANLI</span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Revenue Widget */}
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-emerald-400">GÜNLÜK CİRO</span>
                      <TrendingUp size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">₺127,450</div>
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <span>+34% bu hafta</span>
                      <span>📈</span>
                    </div>
                  </div>

                  {/* Mini Chart - CSS BARS */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-xs font-bold text-gray-300 mb-3">Son 7 Gün</div>
                    <div className="flex items-end gap-2 h-24">
                      {[40, 65, 45, 80, 70, 95, 88].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-md transition-all duration-700 hover:from-emerald-500 hover:to-emerald-400"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-[8px] text-gray-500">{['P', 'S', 'Ç', 'P', 'C', 'C', 'P'][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Bubble */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={14} className="text-cyan-400" />
                      <span className="text-xs font-bold text-gray-300">Son Konuşma</span>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                      <p className="text-sm text-gray-200">"Randevu Onaylandı 👍"</p>
                      <span className="text-[10px] text-cyan-400 mt-1 block">2 dakika önce</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar (Vertical Strip) */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-950/80 border-r border-white/10 flex flex-col items-center gap-6 py-6">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 size={20} className="text-cyan-400" />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Users size={20} className="text-gray-400" />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Camera size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-wider">Keşfet</span>
          <ArrowDown size={20} className="text-cyan-400" />
        </motion.div>
      </section>

      {/* Bento Grid - Premium Visuals */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-slate-950/30 to-transparent">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Göster, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Anlatma</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Gerçek UI. Aura OS'un nasıl çalıştığını görün.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1: Vision AI with Scanning Line */}
            <BentoCard
              title={t.visionTitle}
              description={t.visionDesc}
              icon={<Eye className="text-cyan-400" />}
              gradient="from-cyan-500/10 to-cyan-600/5"
              border="border-cyan-500/20"
              className="lg:col-span-2"
              visual={
                <div className="relative w-full h-56 bg-slate-900/50 rounded-xl border border-cyan-500/20 overflow-hidden">
                  {/* X-Ray Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />

                  {/* RED SCANNING LINE (Moving Up/Down) */}
                  <motion.div
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                  />

                  {/* Detected Area Box */}
                  <div className="absolute top-1/3 left-1/4 w-20 h-20 border-2 border-red-500 rounded-lg animate-pulse">
                    <div className="absolute -top-6 left-0 px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded">
                      SCANNING...
                    </div>
                  </div>

                  {/* Additional Boxes */}
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-emerald-400/40 rounded-lg" />

                  {/* Status Label */}
                  <div className="absolute bottom-4 left-4 px-3 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-lg backdrop-blur-sm flex items-center gap-2">
                    <Activity size={12} className="text-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-cyan-300">AI Analiz Ediyorul...</span>
                  </div>
                </div>
              }
            />

            {/* Box 2: Sales Funnel with CSS Flow Chart */}
            <BentoCard
              title={t.funnelTitle}
              description={t.funnelDesc}
              icon={<TrendingUp className="text-emerald-400" />}
              gradient="from-emerald-500/10 to-emerald-600/5"
              border="border-emerald-500/20"
              visual={
                <div className="relative w-full h-56 flex items-center justify-center">
                  {/* CSS Flow Chart: Circle -> Arrow -> Square */}
                  <div className="flex items-center gap-6">
                    {/* Circle (Lead) */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                        <Users size={24} className="text-white" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">LEAD</span>
                    </div>

                    {/* Arrow */}
                    <ChevronRight size={32} className="text-emerald-400" />

                    {/* Circle (Konuşma) */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <MessageSquare size={24} className="text-white" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">KONUŞMA</span>
                    </div>

                    {/* Arrow */}
                    <ChevronRight size={32} className="text-emerald-400" />

                    {/* Square (Randevu) */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                        <CheckCircle2 size={24} className="text-white" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">RANDEVU</span>
                    </div>
                  </div>

                  {/* Conversion Rate */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                    <span className="text-sm font-bold text-emerald-400">%87 Dönüşüm</span>
                  </div>
                </div>
              }
            />

            {/* Box 3: Agency Mode */}
            <BentoCard
              title={t.agencyTitle}
              description={t.agencyDesc}
              icon={<Building2 className="text-purple-400" />}
              gradient="from-purple-500/10 to-purple-600/5"
              border="border-purple-500/20"
              visual={
                <div className="space-y-2">
                  {[{ name: 'DentalPark', leads: 18, color: 'cyan' }, { name: 'Smile Clinic', leads: 23, color: 'emerald' }].map((clinic, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br from-${clinic.color}-500 to-${clinic.color}-600 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                          {clinic.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{clinic.name}</div>
                          <div className="text-xs text-gray-400">{clinic.leads} leads</div>
                        </div>
                      </div>
                      <TrendingUp size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              }
            />

            {/* Box 4: Security */}
            <BentoCard
              title={t.securityTitle}
              description={t.securityDesc}
              icon={<Shield className="text-amber-400" />}
              gradient="from-amber-500/10 to-amber-600/5"
              border="border-amber-500/20"
              className="md:col-span-2 lg:col-span-1"
              visual={
                <div className="flex items-center justify-center h-40">
                  <div className="relative">
                    <Shield size={64} className="text-amber-400" />
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-200">
            Kredi kartı gerekmez. 30 saniyede WhatsApp'tan başlayın.
          </p>
          <button
            onClick={() => window.open('https://wa.me/905322850606?text=Demo', '_blank')}
            className="group px-12 py-6 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-2xl text-lg font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_60px_rgba(6,182,212,0.4)] mx-auto"
          >
            Ücretsiz Başla
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* BOTTOM TICKER BAR */}
      <BottomTicker events={t.ticker} />
    </AuraLayout>
  );
}

// BOTTOM TICKER (Moved from Top)
function BottomTicker({ events }: { events: string[] }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10">
      <div className="overflow-hidden py-3">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: `${offset}%` }}
          transition={{ duration: 0, ease: "linear" }}
        >
          {[...events, ...events, ...events].map((event, i) => (
            <span key={i} className="text-sm font-medium text-gray-100 flex items-center gap-2">
              {event}
              <span className="text-gray-700">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Bento Card Component
interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  border: string;
  visual: React.ReactNode;
  className?: string;
}

function BentoCard({ title, description, icon, gradient, border, visual, className = "" }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative p-6 bg-gradient-to-br ${gradient} border ${border} rounded-3xl backdrop-blur-xl overflow-hidden group ${className}`}
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>

        <div className="mt-6">
          {visual}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
