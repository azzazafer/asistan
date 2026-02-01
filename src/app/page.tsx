'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Activity, TrendingUp, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [lang, setLang] = useState('tr');

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">

      {/* 1. NAVBAR (FIXED TOP - GLASS - WHITE TEXT) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 h-20 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-emerald-500 rounded-lg animate-pulse" />
          <span className="text-xl font-bold tracking-tighter text-white">AURA OS</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#agency" className="hover:text-white transition-colors">Ajans Modu</a>
          <a href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white uppercase border border-white/10 px-3 py-1.5 rounded-full transition-all"
          >
            <Globe className="w-3 h-3" />
            {lang}
          </button>
          <Link href="https://wa.me/905322850606" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all">
            Giriş Yap
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (PUSHED DOWN) */}
      <main className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: TEXT CONTENT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistem Aktif & Öğreniyor
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Kliniğiniz Uyurken
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Para Kazansın.
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Dünyanın ilk Nöro-Satış Motoru. Sekreteriniz 18:00&apos;de çıkar, Aura OS 7/24 röntgen okur, hastayı ikna eder ve satışı kapatır.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/905322850606"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                WhatsApp&apos;ta Dene
              </Link>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-medium transition-all">
                Ciro Kaybını Hesapla
              </button>
            </div>
          </div>

          {/* RIGHT: CSS-BASED DASHBOARD MOCKUP (THE DESK BOARD) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-black border border-white/10 rounded-2xl p-6 shadow-2xl transform hover:rotate-0 transition-all duration-500 ease-out" style={{ transform: 'rotateY(12deg)' }}>

              {/* Mockup Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">dashboard.auraos.ai</div>
              </div>

              {/* Mockup Content Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Widget 1: Revenue */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400 mb-1">Günlük Ciro</div>
                  <div className="text-2xl font-bold text-white">₺45.250</div>
                  <div className="flex items-end gap-1 h-8 mt-2">
                    <div className="w-2 bg-emerald-500/30 h-4 rounded-t"></div>
                    <div className="w-2 bg-emerald-500/50 h-6 rounded-t"></div>
                    <div className="w-2 bg-emerald-500 h-full rounded-t"></div>
                  </div>
                </div>

                {/* Widget 2: Active Chat */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400 mb-2">Canlı Görüşme</div>
                  <div className="space-y-2">
                    <div className="bg-white/10 p-2 rounded-lg rounded-tl-none text-[10px] text-gray-300 w-3/4">
                      İmplant fiyatı nedir?
                    </div>
                    <div className="bg-emerald-500/20 text-emerald-300 p-2 rounded-lg rounded-tr-none text-[10px] w-full ml-auto text-right border border-emerald-500/30">
                      Röntgeninizi analiz ettim...
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Status */}
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-900/20 p-2 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>3 Randevu Otonom Kapatıldı (Son 1 Saat)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BENTO GRID FEATURES (VISUALS) */}
        <div className="mt-32 grid md:grid-cols-3 gap-6">
          {/* Card 1: Vision */}
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
            <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-all">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Röntgeni Görüyorum</h3>
            <p className="text-gray-400 text-sm mb-4">GPT-4o Vision ile diş çürüklerini ve kemik kaybını saniyeler içinde analiz ederim.</p>
            {/* CSS Visual: Scanner */}
            <div className="relative h-24 bg-black rounded-lg border border-white/10 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-12 border-2 border-white/20 rounded"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Card 2: Neuro-Sales */}
          <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/30 transition-all group md:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-2">İkna Ediyorum (Nöro-Satış)</h3>
                <p className="text-gray-400 text-sm">Sadece cevap vermem. Kaybetme korkusu (FOMO) ve sosyal kanıt kullanarak satışı kapatırım.</p>
              </div>
              <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            {/* CSS Visual: Chat Flow */}
            <div className="mt-6 flex gap-4 overflow-hidden opacity-70">
              <div className="bg-white/5 px-4 py-2 rounded-full text-xs text-gray-400">Fiyat ne?</div>
              <div className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-xs">Tedaviye geç kalırsanız maliyet artabilir...</div>
              <div className="bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-full text-xs">Randevu Oluşturuldu ✅</div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. TICKER (FIXED BOTTOM - NO OVERLAP) */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/90 border-t border-white/10 backdrop-blur-md h-12 flex items-center overflow-hidden">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap px-4">
          <span className="flex items-center gap-2 text-emerald-400 text-sm font-mono">
            <TrendingUp className="w-4 h-4" /> Dr. Yılmaz (İst) ₺45.000 Satış Kapattı
          </span>
          <span className="flex items-center gap-2 text-blue-400 text-sm font-mono">
            <Activity className="w-4 h-4" /> DentalPark (Ank) 5 Randevu Onayladı
          </span>
          <span className="flex items-center gap-2 text-purple-400 text-sm font-mono">
            <Zap className="w-4 h-4" /> Bursa Elite Dental: Sistem Aktif
          </span>
          {/* Duplicate for smooth loop */}
          <span className="flex items-center gap-2 text-emerald-400 text-sm font-mono">
            <TrendingUp className="w-4 h-4" /> Dr. Yılmaz (İst) ₺45.000 Satış Kapattı
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
