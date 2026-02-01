"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Camera, MessageSquare, TrendingUp, Shield, Building2, Users, Zap, Eye, Activity, BarChart3 } from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";

// Content Dictionary for Multi-Language
const content = {
  tr: {
    ticker: ["⚡ Dr. Yılmaz (İstanbul) ₺45.000 Satış Kapattı", "🔥 DentalPark (Ankara) Randevu Onayladı", "💰 Smile Clinic (İzmir) Kapora Tahsil Etti"],
    badge: "Otonom Satış Motoru",
    h1Line1: "Klinikler ve Ajanslar",
    h1Line2: "İçin Otonom Zeka",
    subheadline: "uyurken, Aura OS hasta ikna eder, röntgen okur ve",
    ctaPrimary: "WhatsApp'ta Canlı Dene",
    ctaSecondary: "Ciro Kaybını Hesapla",
    visionTitle: "Röntgeni Görüyorum",
    visionDesc: "GPT-4o Vision ile diş çürüklerini, kırıkları ve tedavi ihtiyaçlarını 3 saniyede tespit eder.",
    agencyTitle: "Ajans Modu",
    agencyDesc: "Müşterilerinizi tek panelden yönetin. Her klinik için ayrı branding ve raporlama.",
    whatsappTitle: "WhatsApp Entegre",
    whatsappDesc: "Hasta mesajlarına 12ms'de cevap verir. İnsan gibi, ama yorulmadan.",
    securityTitle: "KVKK Uyumlu",
    securityDesc: "AES-256 şifreleme, audit logs, ve tam Türkiye compliance."
  },
  en: {
    ticker: ["⚡ Dr. Yılmaz (Istanbul) $12,000 Sale Closed", "🔥 DentalPark (Ankara) Appointment Confirmed", "💰 Smile Clinic (Izmir) Deposit Collected"],
    badge: "Autonomous Sales Engine",
    h1Line1: "Autonomous AI for",
    h1Line2: "Clinics & Agencies",
    subheadline: "while your staff sleeps, Aura OS persuades patients, reads X-rays and",
    ctaPrimary: "Try Live on WhatsApp",
    ctaSecondary: "Calculate Revenue Loss",
    visionTitle: "I See X-Rays",
    visionDesc: "GPT-4o Vision detects cavities, fractures, and treatment needs in 3 seconds.",
    agencyTitle: "Agency Mode",
    agencyDesc: "Manage clients from one panel. Separate branding and reporting per clinic.",
    whatsappTitle: "WhatsApp Integrated",
    whatsappDesc: "Responds to patients in 12ms. Human-like, but tireless.",
    securityTitle: "GDPR Compliant",
    securityDesc: "AES-256 encryption, audit logs, and full EU compliance."
  },
  ar: {
    ticker: ["⚡ د. يلماز (إسطنبول) ₺45,000 بيع مغلق", "🔥 DentalPark (أنقرة) موعد مؤكد", "💰 Smile Clinic (إزمير) إيداع محصل"],
    badge: "محرك المبيعات الذاتي",
    h1Line1: "الذكاء الاصطناعي المستقل",
    h1Line2: "للعيادات والوكالات",
    subheadline: "بينما يكون فريقك نائمًا، يقنع Aura OS المرضى، يقرأ الأشعة السينية و",
    ctaPrimary: "جرب مباشرة على واتساب",
    ctaSecondary: "احسب خسارة الإيرادات",
    visionTitle: "أرى الأشعة السينية",
    visionDesc: "GPT-4o Vision يكتشف التسوس والكسور واحتياجات العلاج في 3 ثوانٍ.",
    agencyTitle: "وضع الوكالة",
    agencyDesc: "إدارة العملاء من لوحة واحدة. العلامة التجارية والتقارير منفصلة لكل عيادة.",
    whatsappTitle: "متكامل مع واتساب",
    whatsappDesc: "يستجيب للمرضى في 12 مللي ثانية. يشبه الإنسان، لكن لا يتعب.",
    securityTitle: "متوافق مع KVKK",
    securityDesc: "تشفير AES-256، سجلات المراجعة، والامتثال الكامل لتركيا."
  }
};

export default function VisualAuthorityLandingPage() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');

  useEffect(() => {
    // Load saved language
    const savedLang = (localStorage.getItem('aura_lang') as 'tr' | 'en' | 'ar') || 'tr';
    setLang(savedLang);

    // Apply RTL for Arabic
    document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

    // Listen for language changes from navbar
    const handleLanguageChange = (e: CustomEvent) => {
      setLang(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const t = content[lang];

  return (
    <AuraLayout>
      {/* FOMO Ticker - Dedicated TOP BAR */}
      <FOMOTicker events={t.ticker} />

      {/* Hero Section - Tightened Spacing */}
      <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Zap size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{t.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">{t.h1Line1}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {t.h1Line2}
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Sekreteriniz <span className="text-white font-semibold">{t.subheadline}</span> <span className="text-emerald-400 font-semibold">₺45.000 satış kapatır</span>. 7/24.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open('https://wa.me/905322850606?text=Merhaba%2C%20Aura%20OS%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum', '_blank');
                  }
                }}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                {t.ctaPrimary}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link href="/calculate-loss">
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                  {t.ctaSecondary}
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-sm text-slate-400">Kredi Kartı Gerekmez</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <span className="text-sm text-slate-400">30 Saniyede Başla</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Tilted 3D Dashboard Mockup - kept as is, it's good */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative perspective-1000">
              <div className="transform rotate-y-6 rotate-x-3 hover:rotate-0 transition-all duration-700">
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">CANLI PANEL</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Son 24 Saat</span>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-emerald-400 font-bold">GÜNLÜK GELİR</span>
                      <TrendingUp size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">₺127,450</div>
                    <div className="text-[10px] text-emerald-400 mt-1">+34% bu hafta 📈</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Camera size={14} className="text-blue-400" />
                      <span className="text-xs font-bold text-slate-300">Röntgen Analizi</span>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
                      <p className="text-[11px] text-slate-300">"Sol alt 36 numaralı dişte çürük tespit edildi."</p>
                    </div>
                  </div>

                  <div className="h-20 bg-gradient-to-t from-emerald-500/5 to-transparent rounded-xl flex items-end gap-1 p-2">
                    {[40, 65, 45, 80, 70, 95, 75, 88].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid - Tightened Spacing + Enhanced Visuals */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-slate-950/50">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Göster, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Anlatma</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              İkonlar değil, gerçek UI. Aura OS'un nasıl çalıştığını görün.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1: Vision AI with X-Ray Scanner Animation */}
            <BentoCard
              title={t.visionTitle}
              description={t.visionDesc}
              icon={<Eye className="text-blue-400" />}
              gradient="from-blue-500/10 to-blue-600/5"
              border="border-blue-500/20"
              className="lg:col-span-2"
              visual={
                <div className="relative w-full h-48 bg-slate-900/50 rounded-xl border border-blue-500/20 overflow-hidden">
                  {/* X-Ray Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />

                  {/* Scanning Line Animation */}
                  <motion.div
                    animate={{ y: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                  />

                  {/* Simulated Teeth with Bounding Boxes */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-2 border-blue-400 rounded-lg animate-pulse">
                    <div className="absolute -top-6 left-0 px-2 py-1 bg-blue-500/90 text-white text-[8px] font-bold rounded">
                      DECAY
                    </div>
                  </div>
                  <div className="absolute top-8 right-16 w-12 h-12 border-2 border-emerald-400/40 rounded-lg" />
                  <div className="absolute top-20 left-24 w-14 h-14 border-2 border-emerald-400/40 rounded-lg" />

                  {/* Labels */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-lg backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-blue-300">Diş #36: Çürük</span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                    <CheckCircle2 size={10} className="text-emerald-300" />
                    <span className="text-[10px] font-bold text-emerald-300">94.2%</span>
                  </div>
                </div>
              }
            />

            {/* Box 2: Agency Mode with Mini Admin Panel */}
            <BentoCard
              title={t.agencyTitle}
              description={t.agencyDesc}
              icon={<Building2 className="text-emerald-400" />}
              gradient="from-emerald-500/10 to-emerald-600/5"
              border="border-emerald-500/20"
              className="md:row-span-2"
              visual={
                <div className="space-y-3">
                  {/* Mini Bar Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400">CLINIC PERFORMANCE</span>
                      <BarChart3 size={12} className="text-emerald-400" />
                    </div>
                    <div className="flex items-end gap-2 h-16">
                      {[60, 85, 70, 95].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-sm transition-all duration-700 hover:scale-105"
                            style={{ height: `${height}%` }}
                          />
                          <span className="text-[8px] text-slate-500">C{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client List */}
                  {[{ name: 'DentalPark', leads: 18 }, { name: 'Smile Clinic', leads: 23 }].map((clinic, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                          {clinic.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{clinic.name}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Users size={10} />
                            {clinic.leads} leads
                          </div>
                        </div>
                      </div>
                      <TrendingUp size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              }
            />

            {/* Box 3: WhatsApp - kept as is */}
            <BentoCard
              title={t.whatsappTitle}
              description={t.whatsappDesc}
              icon={<MessageSquare className="text-green-400" />}
              gradient="from-green-500/10 to-green-600/5"
              border="border-green-500/20"
              visual={
                <div className="relative w-full h-48">
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] border-4 border-slate-700 shadow-2xl p-3">
                    <div className="flex items-center justify-between px-6 py-2">
                      <span className="text-[8px] text-white">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white/30 rounded-sm" />
                      </div>
                    </div>
                    <div className="bg-[#0a1014] rounded-2xl p-2 space-y-2 h-[calc(100%-30px)] overflow-hidden">
                      <div className="bg-[#1f3933] rounded-lg p-2 max-w-[80%]">
                        <p className="text-[9px] text-white">Diş çekimi fiyatı?</p>
                      </div>
                      <div className="bg-[#005c4b] rounded-lg p-2 max-w-[80%] ml-auto">
                        <p className="text-[9px] text-white">₺800. Pazar'a slot açtım 👍</p>
                      </div>
                    </div>
                  </div>
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
              visual={
                <div className="flex items-center justify-center h-32">
                  <div className="relative">
                    <Shield size={48} className="text-amber-400" />
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Comparison Table - Tightened */}
      <ComparisonTable />

      {/* CTA Section - Tightened */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl text-slate-400">
            Kredi kartı gerekmez. 30 saniyede WhatsApp'tan başlayın.
          </p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open('https://wa.me/905322850606?text=Merhaba%2C%20Aura%20OS%20demo%20talebi', '_blank');
              }
            }}
            className="group px-12 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl text-lg font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)] mx-auto"
          >
            Ücretsiz Başla
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>
    </AuraLayout>
  );
}

// FOMO Ticker - Dedicated TOP BAR (Subtle Premium Styling)
function FOMOTicker({ events }: { events: string[] }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-emerald-500/10">
      <div className="overflow-hidden py-2">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: `${offset}%` }}
          transition={{ duration: 0, ease: "linear" }}
        >
          {[...events, ...events, ...events].map((event, i) => (
            <span key={i} className="text-xs font-medium text-emerald-400/90 flex items-center gap-2">
              {event}
              <span className="text-slate-700">•</span>
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
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

        <div className="mt-6">
          {visual}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

// Comparison Table Component - Tightened
function ComparisonTable() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-slate-950/50 to-transparent">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Gerçekle <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Yüzleşin</span>
          </h2>
          <p className="text-slate-400">
            Neden Aura OS diğerlerinden farklı?
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-slate-400 font-medium">Özellik</th>
                <th className="text-center py-4 px-6 text-slate-400 font-medium">Sekreter</th>
                <th className="text-center py-4 px-6 text-slate-400 font-medium">Chatbot</th>
                <th className="text-center py-4 px-6 text-emerald-400 font-bold">AURA OS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Maliyet", sekreter: "₺15.000/ay", chatbot: "₺2.000/ay", aura: "%10 komisyon" },
                { feature: "Çalışma Saati", sekreter: "09:00-18:00", chatbot: "7/24", aura: "7/24" },
                { feature: "Satış Kapatır", sekreter: false, chatbot: false, aura: true },
                { feature: "Röntgen Okur", sekreter: false, chatbot: false, aura: true },
                { feature: "Ödeme Alır", sekreter: false, chatbot: false, aura: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                  <td className="py-4 px-6 text-center text-slate-400">
                    {typeof row.sekreter === 'boolean' ? (
                      row.sekreter ? <CheckCircle2 className="inline text-emerald-400" size={20} /> : <span className="text-red-400">✗</span>
                    ) : row.sekreter}
                  </td>
                  <td className="py-4 px-6 text-center text-slate-400">
                    {typeof row.chatbot === 'boolean' ? (
                      row.chatbot ? <CheckCircle2 className="inline text-emerald-400" size={20} /> : <span className="text-red-400">✗</span>
                    ) : row.chatbot}
                  </td>
                  <td className="py-4 px-6 text-center font-bold">
                    {typeof row.aura === 'boolean' ? (
                      row.aura ? <CheckCircle2 className="inline text-emerald-400" size={24} /> : <span className="text-red-400">✗</span>
                    ) : <span className="text-emerald-400">{row.aura}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
