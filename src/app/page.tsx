'use client';

import React, { useState, useEffect } from 'react';
import {
  Zap, Globe, Shield, Activity, MessageSquare,
  BarChart3, CheckCircle2, ArrowRight, Lock,
  LayoutDashboard, Users, HeartPulse, TrendingUp, AlertTriangle,
  ChevronRight, Server, Database, Handshake, XCircle, CheckCircle, Coins
} from 'lucide-react';
import Link from 'next/link';

// --- CONTENT DICTIONARY (GLOBAL BRAIN - TR/EN/AR) ---
const content = {
  tr: {
    meta: { desc: "Aura OS: Diş klinikleri için dünyanın ilk Nöro-Satış ve Otonom Ciro Kurtarma motoru. Beta v0.9 yayında." },
    nav: { features: "Aura Core™", panels: "Komuta Merkezi", comparison: "Kıyaslama", partners: "Partnerler", login: "Giriş" },
    hero: {
      badge: "Yapay Zeka Motoru v0.9 (Beta) - Neural Net Active",
      title: "Kliniğinizin Dijital Beyni.",
      subtitle: "Sekreteriniz uyurken, Aura'nın nöral ağları 7/24 çalışır. Röntgen okur, eski hastaları geri kazanır ve otonom satış yapar.",
      cta_primary: "WhatsApp'ta Dene",
      cta_secondary: "Kayıp Ciro Analizi"
    },
    pain: {
      title: "Gerçekle Yüzleşin",
      stat: "Her Gün %30 Ciro Çöpe Gidiyor.",
      desc: "Telefonu açamayan sekreterler, 'pahalı' deyip giden hastalar... Rakipleriniz yapay zeka ile bu kaçakları toplarken siz izlemeyin."
    },
    comparison: {
      title: "Eski Dünya vs. Aura Ekosistemi",
      col1: "Eski Nesil (Sekreter/Basit Bot)",
      col2: "Aura OS (Nöro-Otonom)",
      rows: [
        { label: "Maliyet Modeli", old: "Sabit Maaş / Yüksek Lisans", new: "% Komisyon (Sadece Kazanınca)" },
        { label: "Çalışma Kapasitesi", old: "Günde 8 Saat / Tekil İşlem", new: "7/24 / Sınırsız Paralel İşlem" },
        { label: "Teşhis Yeteneği", old: "Yok (Doktor Bekler)", new: "9 Sn'de Nex-Scan™ Triaj" },
        { label: "Satış Kapama", old: "Pasif (Randevu Verir)", new: "Aktif (Kapora Tahsil Eder)" },
        { label: "Geçmiş Data İşleme", old: "İmkansız (Manuel)", new: "Otonom Ciro Kurtarma™" }
      ]
    },
    tabs: { clinic: "Alpha Command Center", agency: "Ajans/Partner Modu", patient: "Hasta Deneyimi Sim." },
    features: {
      title: "Aura Core™ Teknolojisi",
      f1_title: "Otonom Ciro Kurtarma™",
      f1_desc: "Sadece yeni hastaya değil, geçmişte 'pahalı' deyip gitmiş binlerce hastanın datasına dalar, ikna eder ve kliniğe geri sokar.",
      f2_title: "Dinamik Fiyatlama Motoru (Uber Modeli)",
      f2_desc: "Kliniğin boş saatlerinde otomatik indirim teklif eder, yoğun saatlerde karlılığı maksimize eder. Yield Management yapar.",
      f3_title: "Scarcity Engine™ (Nöro-Satış)",
      f3_desc: "Kıtlık psikolojisi (FOMO) ve sosyal kanıt kullanarak hastayı 'şimdi' almaya ikna eder. Dönüşümü %300 artırır."
    },
    partners: {
      title: "Ajanslar & Partnerler İçin",
      desc: "Kendi dijital sağlık ajansınızı Aura altyapısı üzerine kurun. Teknolojiyi biz sağlayalım, siz müşteri ilişkilerini yönetin ve komisyonunuzu katlayın.",
      cta: "Partner Programına Başvur"
    },
    footer: { text: "2026 Aura OS. NEXTORIA GLOBAL INFRASTRUCTURE v13.0. Secure Enclave Active." },
    ticker: [
      { type: 'bad', text: "🔴 Dr. Kaya (İzmir) az önce 15.000₺ kaçırdı (Sekreter yoktu)." },
      { type: 'good', text: "🟢 Dr. Yılmaz (İst) Aura ile 45.000₺ kapora tahsil etti." },
      { type: 'bad', text: "🔴 DentalPark (Ank) son 3 saatte 12 çağrı cevapsız kaldı." },
      { type: 'good', text: "🟢 Bursa Elite Dental: Otonom Ciro Kurtarma aktif, eski hastalardan dönüş başladı." },
      { type: 'info', text: "🛡️ Sistem Güvenliği: Askeri Düzey Şifreleme Aktif (Beta v0.9)" }
    ]
  },
  en: {
    meta: { desc: "Aura OS: The world's first Neuro-Sales and Autonomous Revenue Recovery engine for dental clinics. Beta v0.9 live." },
    nav: { features: "Aura Core™", panels: "Command Center", comparison: "Comparison", partners: "Partners", login: "Login" },
    hero: {
      badge: "AI Engine v0.9 (Beta) - Neural Net Active",
      title: "Digital Brain of Your Clinic.",
      subtitle: "While your secretary sleeps, Aura's neural networks work 24/7. Reads X-Rays, recovers old leads, and closes sales autonomously.",
      cta_primary: "Try on WhatsApp",
      cta_secondary: "Lost Revenue Analysis"
    },
    pain: {
      title: "Face the Reality",
      stat: "30% Revenue Wasted Daily.",
      desc: "Missed calls, leads who say 'too expensive'... Don't watch while competitors capture these leaks with AI."
    },
    comparison: {
      title: "Old World vs. Aura Ecosystem",
      col1: "Legacy (Secretary/Basic Bot)",
      col2: "Aura OS (Neuro-Autonomous)",
      rows: [
        { label: "Cost Model", old: "Fixed Salary / High License", new: "% Commission (Win-Only)" },
        { label: "Capacity", old: "8 Hours / Single Task", new: "24/7 / Unlimited Parallel" },
        { label: "Diagnostics", old: "None (Waits for Doctor)", new: "9 Sec Nex-Scan™ Triage" },
        { label: "Closing", old: "Passive (Booking Only)", new: "Active (Payment Collection)" },
        { label: "Past Data Mining", old: "Impossible (Manual)", new: "Autonomous Revenue Recovery™" }
      ]
    },
    tabs: { clinic: "Alpha Command Center", agency: "Agency/Partner Mode", patient: "Patient Exp Sim." },
    features: {
      title: "Aura Core™ Technology",
      f1_title: "Autonomous Revenue Recovery™",
      f1_desc: "Dives into thousands of past leads who said 'too expensive', re-engages them, and brings them back to the clinic.",
      f2_title: "Dynamic Pricing Engine (Uber Model)",
      f2_desc: "Offers automatic discounts during empty hours and maximizes profitability during peak hours. True Yield Management.",
      f3_title: "Scarcity Engine™ (Neuro-Sales)",
      f3_desc: "Uses scarcity psychology (FOMO) and social proof to persuade patients to buy 'now'. Boosts conversion by 300%."
    },
    partners: {
      title: "For Agencies & Partners",
      desc: "Build your digital health agency on Aura infrastructure. We provide the tech, you manage relationships and multiply commissions.",
      cta: "Apply to Partner Program"
    },
    footer: { text: "2026 Aura OS. NEXTORIA GLOBAL INFRASTRUCTURE v13.0. Secure Enclave Active." },
    ticker: [
      { type: 'bad', text: "🔴 Dr. Kaya (Izmir) just missed ₺15,000 (No secretary)." },
      { type: 'good', text: "🟢 Dr. Yilmaz (Ist) collected ₺45,000 deposit via Aura." },
      { type: 'bad', text: "🔴 DentalPark (Ank) 12 missed calls in last 3 hours." },
      { type: 'good', text: "🟢 Bursa Elite Dental: Revenue Recovery active, old patients returning." },
      { type: 'info', text: "🛡️ System Security: Military Grade Encryption Active (Beta v0.9)" }
    ]
  },
  ar: {
    meta: { desc: "أورا OS: أول محرك للمبيعات العصبية واسترداد الإيرادات المستقل لعيادات الأسنان في العالم. بيتا v0.9 مباشر." },
    nav: { features: "أورا كور™", panels: "مركز القيادة", comparison: "مقارنة", partners: "شركاء", login: "دخول" },
    hero: {
      badge: "محرك الذكاء الاصطناعي v0.9 (بيتا) - الشبكة العصبية نشطة",
      title: "العقل الرقمي لعيادتك.",
      subtitle: "بينما تنام سكرتيرتك، تعمل شبكات أورا العصبية على مدار 24/7. تقرأ الأشعة، وتستعيد العملاء القدامى، وتغلق المبيعات بشكل مستقل.",
      cta_primary: "جرب عبر واتساب",
      cta_secondary: "تحليل الإيرادات المفقودة"
    },
    pain: {
      title: "واجه الحقيقة",
      stat: "30٪ من الإيرادات تهدر يومياً.",
      desc: "المكالمات الفائتة، العملاء الذين يقولون 'غالي جداً'... لا تشاهد المنافسين يلتقطون هذه التسريبات بالذكاء الاصطناعي."
    },
    comparison: {
      title: "العالم القديم مقابل نظام أورا البيئي",
      col1: "القديم (سكرتير/روبوت بسيط)",
      col2: "أورا OS (عصبي-مستقل)",
      rows: [
        { label: "نموذج التكلفة", old: "راتب ثابت / ترخيص مرتفع", new: "٪ عمولة (عند الفوز فقط)" },
        { label: "السعة", old: "8 ساعات / مهمة واحدة", new: "24/7 / متوازي غير محدود" },
        { label: "التشخيص", old: "لا يوجد (ينتظر الطبيب)", new: "9 ثوانٍ Nex-Scan™ فرز" },
        { label: "الإغلاق", old: "سلبي (حجز فقط)", new: "نشط (تحصيل المدفوعات)" },
        { label: "تعدين البيانات السابقة", old: "مستحيل (يدوي)", new: "استرداد الإيرادات المستقل™" }
      ]
    },
    tabs: { clinic: "مركز قيادة ألفا", agency: "وضع الوكالة/الشريك", patient: "محاكاة تجربة المريض" },
    features: {
      title: "تكنولوجيا أورا كور™",
      f1_title: "استرداد الإيرادات المستقل™",
      f1_desc: "يغوص في آلاف العملاء المحتملين السابقين الذين قالوا 'غالي جداً'، ويعيد إشراكهم، ويعيدهم إلى العيادة.",
      f2_title: "محرك التسعير الديناميكي (نموذج أوبر)",
      f2_desc: "يقدم خصومات تلقائية خلال الساعات الفارغة ويزيد الربحية خلال ساعات الذروة. إدارة العائد الحقيقية.",
      f3_title: "محرك الندرة™ (المبيعات العصبية)",
      f3_desc: "يستخدم علم نفس الندرة (FOMO) والدليل الاجتماعي لإقناع المرضى بالشراء 'الآن'. يعزز التحويل بنسبة 300٪."
    },
    partners: {
      title: "للوكالات والشركاء",
      desc: "ابنِ وكالتك الصحية الرقمية على بنية أورا التحتية. نحن نوفر التكنولوجيا، وأنت تدير العلاقات وتضاعف العمولات.",
      cta: "قدم لبرنامج الشركاء"
    },
    footer: { text: "2026 Aura OS. البنية التحتية العالمية لنيكتوريا v13.0. المنطقة الآمنة نشطة." },
    ticker: [
      { type: 'bad', text: "🔴 د. كايا (إزمير) فقد للتو 15,000₺ (بدون سكرتير)." },
      { type: 'good', text: "🟢 د. يلماز (إسطنبول) حصل 45,000₺ عربون عبر أورا." },
      { type: 'bad', text: "🔴 دينتال بارك (أنقرة) 12 مكالمة فائتة في آخر 3 ساعات." },
      { type: 'good', text: "🟢 بورصة إيليت دينتال: استرداد الإيرادات نشط، عودة المرضى القدامى." },
      { type: 'info', text: "🛡️ أمن النظام: تشفير عسكري نشط (بيتا v0.9)" }
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en' | 'ar'>('tr');
  const [activeTab, setActiveTab] = useState<'clinic' | 'agency' | 'patient'>('clinic');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden ${isRTL ? 'font-arabic' : ''}`}>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="absolute inset-0 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center border border-white/10">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">AURA OS</span>
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase mt-0.5">Autonomous Logic</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.features}</a>
            <a href="#panels" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.panels}</a>
            <a href="#comparison" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.comparison}</a>
            <a href="#partners" className="hover:text-cyan-400 transition-colors duration-300">{t.nav.partners}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
              {['tr', 'en', 'ar'].map((l) => (
                <button key={l} onClick={() => setLang(l as any)} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${lang === l ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'text-gray-500 hover:text-white'}`}>
                  {l}
                </button>
              ))}
            </div>
            <Link href="https://wa.me/905510596718" className="group relative overflow-hidden bg-white text-black px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                {t.nav.login} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </nav>

      <header className="pt-40 pb-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : (isRTL ? 'translate-x-20' : '-translate-x-20') + ' opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium backdrop-blur-md animate-pulse-slow shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              <span className="block">{t.hero.title.split(' ')[0]}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
                {t.hero.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed border-l-2 border-cyan-500/30 pl-6 font-light">
              {t.hero.subtitle}
            </p>
            <div className="pt-4">
              <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-mono">Powered By Nextoria Global Infrastructure:</p>
              <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-sm font-bold items-center">
                <span className="flex items-center gap-2"><Server className="w-4 h-4 text-cyan-500" /> OpenAI</span>
                <span className="flex items-center gap-2"><Database className="w-4 h-4 text-blue-500" /> Google Cloud</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-purple-500" /> Stripe</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="https://wa.me/905510596718" className="group relative flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] active:scale-95">
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
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[40px] blur-[60px] animate-pulse-slow"></div>
            <div className="relative bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-2 shadow-2xl ring-1 ring-white/5 transform hover:scale-[1.02] transition-transform duration-500 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 mix-blend-overlay pointer-events-none"></div>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-black/60 rounded-t-[32px] relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                </div>
                <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/5 text-[10px] text-cyan-400 font-mono">
                  <Lock className="w-2.5 h-2.5" /> AURA_CORE_V3.0
                </div>
              </div>
              <div className="p-6 space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors group relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest font-mono">Canlı Ciro</div>
                    <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono tracking-tight">₺45,250</div>
                    <div className="text-xs text-cyan-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +%34</div>
                  </div>
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-green-500/30 transition-colors relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest font-mono">Dönüşüm</div>
                    <div className="text-3xl font-bold text-green-400 font-mono tracking-tight">%87.4</div>
                    <div className="text-xs text-green-500/70 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Optimize</div>
                  </div>
                </div>
                <div className="bg-black/40 rounded-3xl border border-white/5 p-5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                  <div className="flex items-center gap-2 text-[10px] text-cyan-400 mb-3 font-mono">
                    <Activity className="w-3 h-3 animate-pulse" />
                    NEX-SCAN™ AKTİF
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-gray-800/80 border border-white/10"></div>
                    <div className="space-y-3 w-full">
                      <div className="h-2 bg-gray-800/50 rounded-full w-1/3 animate-pulse"></div>
                      <div className="bg-cyan-950/30 p-3 rounded-xl border-l-2 border-cyan-500 text-xs text-cyan-200 font-mono">
                        ⚠️ TESPİT: Diş #36 derin çürük.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="pain" className="py-28 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/5 to-black"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-red-400 bg-red-950/30 px-4 py-2 rounded-full mb-8 border border-red-500/20">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{t.pain.title}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {t.pain.stat}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            {t.pain.desc}
          </p>
        </div>
      </section>

      <section id="comparison" className="py-28 bg-black relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.comparison.title}</h2>
          <div className="bg-[#0A0A0A] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 bg-white/[0.02] border-b border-white/10 p-6 text-xs font-bold uppercase tracking-widest text-gray-500 font-mono">
              <div>Kriter</div>
              <div className="text-center opacity-50 flex items-center justify-center gap-2"><XCircle className="w-4 h-4 text-red-500/50" /> {t.comparison.col1}</div>
              <div className="text-center text-cyan-400 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-500" /> {t.comparison.col2}</div>
            </div>
            {t.comparison.rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center ${i % 2 === 0 ? 'bg-black' : 'bg-[#0C0C0C]'}`}>
                <div className="font-medium text-gray-300">{row.label}</div>
                <div className="text-center text-gray-500 font-mono">{row.old}</div>
                <div className="text-center text-white font-bold font-mono">{row.new}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="panels" className="py-32 relative bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { id: 'clinic', label: t.tabs.clinic, icon: LayoutDashboard },
              { id: 'agency', label: t.tabs.agency, icon: Users },
              { id: 'patient', label: t.tabs.patient, icon: HeartPulse },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`group relative flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all duration-500 overflow-hidden border ${activeTab === tab.id ? 'text-black border-cyan-500' : 'text-gray-400 hover:text-white bg-black/50 border-white/10'}`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`}></div>
                <tab.icon className={`w-5 h-5 relative z-10 ${activeTab === tab.id ? 'text-black' : 'text-gray-500'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-xl rounded-[40px] border border-white/10 p-4 md:p-12 min-h-[600px]">
            {activeTab === 'clinic' && (
              <div className="h-full">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Alpha Command Center</h3>
                    <p className="text-gray-500 text-sm font-mono">LIVE DATA STREAM</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-950/30 border border-green-500/20 text-green-400 text-xs font-bold">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    ONLINE
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#111] border border-white/5 p-8 rounded-[32px] hover:border-cyan-500/30 transition-all">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-mono">Toplam Ciro</div>
                    <div className="text-5xl font-bold text-white font-mono">₺127,450</div>
                    <div className="text-cyan-400 text-sm mt-4 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> +%34</div>
                  </div>
                  <div className="bg-[#111] border border-white/5 p-8 rounded-[32px] hover:border-green-500/30 transition-all">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-mono">Otonom Satış</div>
                    <div className="text-5xl font-bold text-green-400 font-mono">18</div>
                    <div className="text-green-500/70 text-sm mt-4"><CheckCircle2 className="w-4 h-4 inline" /> Otonom</div>
                  </div>
                  <div className="bg-[#111] border border-white/5 p-8 rounded-[32px] hover:border-purple-500/30 transition-all">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-4 font-mono">Ciro Kurtarma™</div>
                    <div className="text-5xl font-bold text-purple-400 font-mono">₺32K</div>
                    <div className="text-purple-500/70 text-sm mt-4"><Database className="w-4 h-4 inline" /> Eski Data</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'agency' && (
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-bold text-white">Partner Portal</h3>
                  <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold">Add Clinic</button>
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/10">
                  <table className="w-full text-left bg-[#111]">
                    <thead className="text-gray-500 text-xs uppercase bg-white/5 border-b border-white/10 font-mono">
                      <tr>
                        <th className="px-8 py-5">Client</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Performance</th>
                        <th className="px-8 py-5 text-right">Commission</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300 divide-y divide-white/5">
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="px-8 py-6"><span className="font-bold text-white">Clinic #{i}</span></td>
                          <td className="px-8 py-6"><span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full">Active</span></td>
                          <td className="px-8 py-6"><div className="h-2 w-32 bg-gray-800 rounded-full"><div className="h-full bg-cyan-500 w-3/4"></div></div></td>
                          <td className="px-8 py-6 text-right font-mono text-white">₺{(Math.random() * 50000).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'patient' && (
              <div className="flex justify-center items-center h-full min-h-[600px]">
                <div className="w-[360px] bg-black border border-white/20 rounded-[44px] p-5">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#111] rounded-b-2xl z-20"></div>
                  <div className="bg-[#075E54] -mx-5 -mt-5 p-5 pt-12 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center"><Zap className="w-6 h-6 text-[#075E54]" /></div>
                    <div className="text-white">
                      <div className="font-bold">Aura Asistan</div>
                      <div className="text-xs opacity-80">Online</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4 h-[400px] overflow-y-auto">
                    <div className="bg-[#1f2c34] p-4 rounded-2xl rounded-tl-none text-gray-100 max-w-[85%]">
                      Merhaba! Röntgen incelendi. 🦷
                      <div className="text-xs text-gray-400 mt-1">14:02</div>
                    </div>
                    <div className="bg-[#005c4b] p-4 rounded-2xl rounded-tr-none text-white ml-auto max-w-[80%]">
                      Ne kadar tutar?
                      <div className="text-xs text-green-200 mt-1">14:03</div>
                    </div>
                    <div className="bg-[#1f2c34] p-4 rounded-2xl rounded-tl-none text-gray-100 max-w-[85%]">
                      Normalde ₺5.000, bu hafta ₺3.500.
                      <div className="text-xs text-gray-400 mt-1">14:03</div>
                    </div>
                  </div>
                  <div className="h-12 bg-[#1f2c34] rounded-full flex items-center px-5 mt-4">
                    <span className="text-gray-500 text-sm">Mesaj...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-20">{t.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <article className="bg-[#0A0A0A] p-10 rounded-[40px] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-900/20 rounded-2xl flex items-center justify-center mb-8">
                <Database className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.features.f1_title}</h3>
              <p className="text-gray-400 leading-relaxed">{t.features.f1_desc}</p>
            </article>
            <article className="bg-[#0A0A0A] p-10 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8">
                <Coins className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.features.f2_title}</h3>
              <p className="text-gray-400 leading-relaxed">{t.features.f2_desc}</p>
            </article>
            <article className="bg-[#0A0A0A] p-10 rounded-[40px] border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-900/20 rounded-2xl flex items-center justify-center mb-8">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.features.f3_title}</h3>
              <p className="text-gray-400 leading-relaxed">{t.features.f3_desc}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="partners" className="py-32 bg-gradient-to-b from-black to-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0A0A0A] rounded-[40px] border border-white/10 p-16 flex items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-bold text-white">{t.partners.title}</h2>
              <p className="text-lg text-gray-400">{t.partners.desc}</p>
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-3">
                {t.partners.cta} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-black border-t border-white/10 text-center pb-24">
        <div className="text-xs font-mono text-gray-600 tracking-widest">
          {t.footer.text}
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#050505]/90 border-t border-white/10 backdrop-blur-xl h-12 flex items-center overflow-hidden pointer-events-none">
        <div className="flex gap-12 animate-marquee whitespace-nowrap px-4">
          {t.ticker.map((item, i) => (
            <span key={i} className={`flex items-center gap-2 text-xs font-bold font-mono ${item.type === 'bad' ? 'text-red-400' : item.type === 'good' ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {item.text}
            </span>
          ))}
          {t.ticker.map((item, i) => (
            <span key={i + 'dup'} className={`flex items-center gap-2 text-xs font-bold font-mono ${item.type === 'bad' ? 'text-red-400' : item.type === 'good' ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap');
        .font-arabic { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
      `}</style>
    </div>
  );
}
