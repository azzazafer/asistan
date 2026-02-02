'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Activity, TrendingUp, MessageSquare, BarChart3, Lock, ScanEye } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [lang, setLang] = useState('tr');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* 1. NAVBAR (FIXED TOP - GLASS - WHITE TEXT) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-md animate-pulse" />
          <span className="text-lg font-bold tracking-tighter text-white">AURA OS</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır</a>
          <a href="#pricing" className="hover:text-white transition-colors">Fiyatlandırma</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white uppercase border border-white/10 px-2 py-1 rounded-md transition-all"
          >
            <Globe className="w-3 h-3" />
            {lang}
          </button>
          <Link href="https://wa.me/905322850606" className="bg-white hover:bg-gray-100 text-black px-4 py-1.5 rounded-full text-sm font-bold transition-all">
            Giriş
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION (PUSHED DOWN & DASHBOARD MOCKUP) */}
      <main className="pt-36 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">

          {/* LEFT: TEXT CONTENT (Cols 2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Zap className="w-3 h-3" />
              Nöro-Satış Motoru v2.1 Aktif
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Kliniğiniz Uyurken <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Para Kazansın.
              </span>
            </h1>

            <p className="text-base text-gray-400 max-w-md leading-relaxed">
              Sekreteriniz 18:00&apos;de çıkar. Aura OS 7/24 röntgen okur, hastayı ikna eder ve randevuyu satar. Otonom.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="https://wa.me/905322850606"
                className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold text-base transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp&apos;ta Dene
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Kredi kartı gerekmez. 30 saniyede başla.
            </p>
          </div>

          {/* RIGHT: CSS-BASED DASHBOARD MOCKUP (Cols 3/5) - THE VISUAL PROOF */}
          <div className="lg:col-span-3 relative group perspective-1000">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>

            {/* The Card Itself */}
            <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform rotate-y-6 rotate-x-2 group-hover:rotate-0 transition-all duration-700 ease-out h-[400px]">

              {/* Mockup Header (Fake Browser bar) */}
              <div className="flex items-center px-4 py-2 border-b border-white/5 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="mx-auto text-[10px] text-gray-600 font-mono">app.auraos.ai/dashboard</div>
              </div>

              {/* Mockup Body - Grid layout */}
              <div className="p-4 grid grid-cols-3 gap-4 h-[calc(100%-35px)]">

                {/* Sidebar (Fake) */}
                <div className="col-span-1 bg-white/5 rounded-lg p-2 flex flex-col gap-2">
                  <div className="h-6 bg-white/10 rounded w-full"></div>
                  <div className="h-6 bg-white/5 rounded w-3/4"></div>
                  <div className="h-6 bg-white/5 rounded w-5/6"></div>
                  <div className="mt-auto h-6 bg-cyan-500/20 rounded w-full"></div>
                </div>

                {/* Main Content Area */}
                <div className="col-span-2 flex flex-col gap-4">
                  {/* Top Stats widget */}
                  <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/5 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2"><TrendingUp className="w-4 h-4 text-cyan-500" /></div>
                    <div className="text-xs text-gray-400">Bugünkü Ciro (Canlı)</div>
                    <div className="text-3xl font-bold text-white mt-1">₺45.250</div>
                    <div className="flex items-end gap-1 h-8 mt-4">
                      {/* CSS Bar Chart */}
                      <div className="w-2 bg-cyan-900/50 h-4 rounded-sm"></div>
                      <div className="w-2 bg-cyan-800/50 h-6 rounded-sm"></div>
                      <div className="w-2 bg-cyan-700/50 h-5 rounded-sm"></div>
                      <div className="w-2 bg-cyan-600/50 h-8 rounded-sm"></div>
                      <div className="w-2 bg-cyan-500 h-full rounded-sm animate-pulse"></div>
                    </div>
                  </div>

                  {/* Recent Activity Widget */}
                  <div className="bg-black border border-white/5 rounded-xl p-3 flex-1">
                    <div className="text-xs text-gray-400 mb-3">Son Aktiviteler</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span className="text-gray-300">Ahmet Y. - Randevu Onaylandı (Otonom)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <ScanEye className="w-3 h-3 text-blue-500" />
                        <span className="text-gray-300">Ayşe K. - Röntgen Analiz Edildi</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <MessageSquare className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-500">Mehmet T. - Fiyat Soruldu...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BENTO GRID FEATURES (VISUALS) */}
        <div id="features" className="mt-32">
          <h2 className="text-2xl font-bold text-center mb-12">Göster, Anlatma.</h2>
          <div className="grid md:grid-cols-4 gap-4 auto-rows-[180px]">

            {/* Card 1: Vision (Tall) */}
            <div className="md:row-span-2 rounded-3xl bg-neutral-900/50 border border-white/5 p-6 flex flex-col relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
              <ScanEye className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Röntgen Vizyonu</h3>
              <p className="text-gray-400 text-sm flex-1">Diş çürüklerini saniyeler içinde tespit eder.</p>
              {/* CSS Visual: Scanner */}
              <div className="h-32 bg-black/50 rounded-lg border border-white/10 relative overflow-hidden mt-4">
                <div className="absolute inset-4 border-2 border-dashed border-cyan-500/30 rounded flex items-center justify-center text-cyan-900">DENTAL SCAN</div>
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
            </div>

            {/* Card 2: Neuro-Sales (Wide) */}
            <div className="md:col-span-2 rounded-3xl bg-neutral-900/50 border border-white/5 p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Nöro-Satış İknası</h3>
              <p className="text-gray-400 text-sm mb-6">Kaybetme korkusu (FOMO) kullanarak satışı kapatır.</p>
              {/* CSS Visual: Chat bubbles */}
              <div className="flex flex-col gap-2 opacity-80">
                <div className="self-start bg-white/10 px-3 py-1.5 rounded-2xl rounded-tl-sm text-xs text-gray-300">Fiyat pahalı geldi.</div>
                <div className="self-end bg-blue-600/20 border border-blue-500/30 px-3 py-1.5 rounded-2xl rounded-tr-sm text-xs text-blue-300">Anlıyorum. Ancak gecikirse tedavi maliyeti %40 artabilir.</div>
                <div className="self-start bg-emerald-600/10 border border-emerald-500/30 px-3 py-1.5 rounded-2xl rounded-tl-sm text-xs text-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Tamam, randevu verin.</div>
              </div>
            </div>

            {/* Card 3: Security */}
            <div className="rounded-3xl bg-neutral-900/50 border border-white/5 p-6 group hover:border-gray-500/30 transition-all">
              <Shield className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">KVKK Uyumlu</h3>
              <p className="text-gray-400 text-sm">AES-256 şifreleme ve tam uyumluluk.</p>
            </div>

            {/* Card 4: Stats */}
            <div className="rounded-3xl bg-neutral-900/50 border border-white/5 p-6 group hover:border-green-500/30 transition-all">
              <BarChart3 className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Canlı Rapor</h3>
              <p className="text-gray-400 text-sm">Cironuzu anlık takip edin.</p>
            </div>
          </div>
        </div>

      </main>

      {/* 4. TICKER (FIXED BOTTOM - NO OVERLAP) */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#0A0A0A] border-t border-white/5 h-10 flex items-center overflow-hidden pointer-events-none">
        <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap px-4 opacity-70">
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono uppercase">
            <TrendingUp className="w-3 h-3" /> Dr. Yılmaz (İst) ₺45K Satış Kapattı
          </span>
          <span className="flex items-center gap-1.5 text-blue-400 text-xs font-mono uppercase">
            <Activity className="w-3 h-3" /> DentalPark (Ank) 5 Randevu
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 text-xs font-mono uppercase">
            <Lock className="w-3 h-3" /> Sistem Güvenli & Aktif
          </span>
          {/* Duplicate for loop */}
          <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono uppercase">
            <TrendingUp className="w-3 h-3" /> Dr. Yılmaz (İst) ₺45K Satış Kapattı
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0.5; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.5; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}
