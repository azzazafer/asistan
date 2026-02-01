"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Cpu, Globe, Rocket, Shield, Zap, ChevronRight, Activity, Radio, Lock, Camera, Workflow, DollarSign } from "lucide-react";
import Link from "next/link";
import AuraLayout from "@/components/AuraLayout";
import AnimatedNumber from "@/components/AnimatedNumber";
import NexScanDemo from "@/components/NexScanDemo";
import LiveTicker from "@/components/LiveTicker";
import ProblemTable from "@/components/ProblemTable";

export default function DeepSpaceHomePage() {
  const { scrollYProgress } = useScroll();
  const dashboardRotate = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <AuraLayout>
      {/* --- SECTION A: HERO (THE HOOK) --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center min-h-[90vh] justify-center">
        {/* Visual Backdrop: Neural Connection & Hero V5 */}
        <div className="absolute inset-x-0 top-0 h-full opacity-40 pointer-events-none z-0">
          <Image
            src="/images/aura_hero_bg.png"
            alt=""
            fill
            className="object-cover mix-blend-screen opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="max-w-[1400px] mx-auto text-center relative z-10 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-[#00F0FF]"
          >
            <Radio size={14} className="animate-pulse" /> NEXTORIA ALPHA OPERASYONU v13.0
          </motion.div>

          {/* New Hero Image Feature for Mobile/Desktop Depth */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] opacity-10 pointer-events-none select-none blur-sm">
            <Image src="/images/hero_v5.png" alt="" fill priority className="object-contain" />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fluid-hero font-bold tracking-[-0.08em] font-space text-white leading-tight uppercase italic"
          >
            Yönetmeyi Bırakın.<br />
            <span className="text-[#00F0FF]">Kapatmaya Başlayın.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed"
          >
            Dünyanın ilk Nöro-Satış Motoru. Randevu vermiyoruz, HBYS ile <span className="text-white">12ms hızında</span> konuşup satışı Stripe üzerinden otonom kapatıyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6"
          >
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('openNexScan'));
                }
              }}
              className="px-12 py-5 bg-transparent border border-[#00F0FF] text-[#00F0FF] rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#00F0FF] hover:text-black transition-all shadow-[0_0_40px_rgba(0,240,255,0.2)] active:scale-95 duration-500">
              Alpha Sürümüne Geç
            </button>
            <Link href="/calculate-loss" className="text-[12px] font-black uppercase tracking-[0.3em] text-[#B0B0B0] hover:text-white transition-colors flex items-center gap-3 group">
              Ciro Kaybını Hesapla <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Data Ticker */}
      <LiveTicker />

      {/* --- SECTION B: THE PROBLEM (REALITY CHECK) --- */}
      <section className="py-40 px-6 relative">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold uppercase italic tracking-tighter text-white font-space">Gerçekle Yüzleşin.</h2>
            <p className="text-[#B0B0B0] max-w-2xl mx-auto text-lg leading-relaxed">Eski nesil CRM'ler yavaş ve pasiftir. Aura OS, otonom bir avcı gibi her fırsatı paraya dönüştürür.</p>
          </div>

          <ProblemTable />
        </div>
      </section>

      {/* --- SECTION C: CORE TECHNOLOGY (THE GRID) --- */}
      <section id="nexscan" className="py-40 px-6 bg-[#030303] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-10">
          <Link href="/technology" className="flex">
            <TechCard
              id="scarcity"
              icon={<Activity className="text-[#8A2BE2]" />}
              title="Scarcity Engine™"
              text="Stoklar 2'nin altına düştüğünde, AI otomatik olarak 'Kıtlık Psikolojisi' uygular ve dönüşümü %300 artırır."
              color="#8A2BE2"
              visual={<div className="w-20 h-20 bg-[#8A2BE2]/10 rounded-full flex items-center justify-center animate-pulse border border-[#8A2BE2]/20"><DollarSign size={32} className="text-[#8A2BE2]" /></div>}
            />
          </Link>

          <TechCard
            id="nexscan-tech"
            icon={<Camera className="text-[#00F0FF]" />}
            title="Nex-Scan™ Triaj"
            text="Hasta fotoğrafını (Saç/Diş) milisaniyeler içinde analiz eder. Doktor görmeden önce Lead Score çıkarır."
            color="#00F0FF"
            visual={<div className="relative w-24 h-24 border border-[#00F0FF]/20 rounded-xl overflow-hidden group">
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-0.5 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]"
              />
              <div className="absolute inset-0 flex items-center justify-center"><Activity size={32} className="text-[#00F0FF]/40" /></div>
            </div>}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('openNexScan'));
              }
            }}
          />

          <Link href="/technology" className="flex">
            <TechCard
              id="stripe"
              icon={<Lock className="text-white" />}
              title="Stripe Bridge"
              text="Telefon kapanmadan kapora tahsilatı yapılır. 'Sözde randevu' biter, 'Ödenmiş Randevu' başlar."
              color="#FFFFFF"
              visual={<div className="flex flex-col items-center gap-3">
                <div className="text-3xl font-bold font-space text-white">$2,500</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[#00F0FF]">KAPORA TAHSİL EDİLDİ</div>
              </div>}
            />
          </Link>
        </div>
      </section>

      {/* --- SECTION D: THE DASHBOARD (THE MATRIX) --- */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center space-y-20">
          <div className="space-y-6">
            <div className="text-[#00F0FF] text-[10px] font-black tracking-[0.5em] uppercase">ALPHA INFRASTRUCTURE v13.0</div>
            <h2 className="text-4xl md:text-7xl font-bold uppercase italic tracking-tighter text-white font-space">Tekil Komuta Merkezi.</h2>
          </div>

          <motion.div
            style={{ rotateX: dashboardRotate, scale: dashboardScale, perspective: 1000 }}
            className="relative w-full aspect-video max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_100px_200px_rgba(0,0,0,0.8)]"
          >
            <Image
              src="/images/aura_dashboard_matrix_mockup.png"
              alt="Aura OS Dashboard"
              fill
              className="brightness-75 hover:brightness-100 transition-all duration-700 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 text-left space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-ping shadow-[0_0_10px_#22c55e]" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Canlı Global İzleme Aktif</span>
              </div>
              <div className="text-[#B0B0B0] text-xs font-medium max-w-xs leading-relaxed">Nextoria Alpha veri merkezlerine doğrudan bağlı, 12ms senkronizasyon hızı.</div>
            </div>
          </motion.div>
        </div>
      </section>
    </AuraLayout>
  );
}

function TechCard({ id, icon, title, text, color, visual, onClick }: { id: string, icon: React.ReactNode, title: string, text: string, color: string, visual: React.ReactNode, onClick?: () => void }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-[#00F0FF]/30 transition-all duration-700 group flex flex-col justify-between min-h-[500px] relative overflow-hidden cursor-pointer`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

      <div className="space-y-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-[#00F0FF]/10 transition-all duration-500">{icon}</div>
        <h3 className="text-3xl font-bold uppercase italic tracking-tight font-space text-white">{title}</h3>
        <p className="text-lg text-[#B0B0B0] leading-relaxed font-medium">{text}</p>
      </div>

      <div className="relative z-10 flex justify-center py-10 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        {visual}
      </div>

      <div className="relative z-10 pt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
        Detayları Gör <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
