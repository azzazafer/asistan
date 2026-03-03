"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Integrations from "@/components/Integrations";
import SovereignFunnel from "@/components/SovereignFunnel";
import NeuralCoreTerminal from "@/components/NeuralCoreTerminal";
import Madde7Section from "@/components/Madde7Section";
import LabsSection from "@/components/LabsSection";
import LiveLogicTerminal from "@/components/LiveLogicTerminal";
import CommandInput from "@/components/CommandInput";
import Footer from "@/components/Footer";
import SandboxModal from "@/components/SandboxModal";
import AuraAssistant from "@/components/AuraAssistant";
import CoreModulesModal from "@/components/CoreModulesModal";
import LegalModal from "@/components/LegalModal";
import { useUser } from "@/context/UserContext";


export default function Page() {
  const { isDemoOpen, setDemoOpen, isCoreModulesOpen, setCoreModulesOpen, isLegalModalOpen, setLegalModalOpen, legalType } = useUser();

  return (
    <main className="min-h-screen">

      <Navbar />
      <HeroSection />

      {/* 5. Sovereign Funnel — 6 Acı Katmanı */}
      <SovereignFunnel />

      {/* 2A2 INTEGRATIONS - TRUVA ATI */}
      <Integrations />

      {/* Neural Core — Teknik Gösteriş & İkna */}
      <NeuralCoreTerminal />

      {/* Madde 7 — Matematiksel İkna */}
      <Madde7Section />

      {/* Aura Labs — Ar-Ge & Otonom Çekirdekler */}
      <LabsSection />

      {/* Live Logic Demo — Sovereign Agent Simülasyonu */}
      <section className="py-20 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">AUTONOMOUS DEMO (LIVE)</h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">Sovereign Node WhatsApp Entegrasyonu 1-to-1 Simülasyonu. İstediğiniz kullanıcı komutunu (Intent) test edin.</p>
        </div>
        <LiveLogicTerminal />
      </section>

      {/* Zero Click Command Bar (Contact Alternatifi) */}
      <section id="contact" className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">KLASİK İLETİŞİM FORMLARI ÖLDÜ</h2>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">Form doldurmayın, sistemle doğrudan konuşarak teknik kapasiteyi keşfedin.</p>
        </div>
        <CommandInput />
      </section>

      <Footer />

      {/* Aura Otonom Asistan — NEW EMIR 4.2 CONTROL */}
      <AuraAssistant />

      {/* Global Sandbox Modal — Triggered by Cards and Demo Button */}
      <SandboxModal
        isOpen={isDemoOpen}
        onClose={() => setDemoOpen(false)}
      />

      <CoreModulesModal
        isOpen={isCoreModulesOpen}
        onClose={() => setCoreModulesOpen(false)}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalType}
      />
    </main>
  );
}
