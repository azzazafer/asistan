"use client";

import { createBrowserClient } from '@supabase/ssr'
import React, { useState, useEffect, useRef, Fragment } from "react";
import { SmartCalendar } from '@/components/calendar/SmartCalendar';
import { PatientJourney } from '@/components/clinical/PatientJourney';
import { DigitalDocs } from '@/components/clinical/DigitalDocs';
import {
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  Search,
  Bell,
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  MoreVertical,
  Layers,
  Zap,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Activity,
  MessageCircle,
  Globe,
  X,
  Sparkles,
  Database,
  Cpu,
  Settings,
  ShieldAlert,
  Instagram,
  Send,
  Paperclip,
  Scan,
  FileDown,
  Languages,
  BrainCircuit,
  Shield
} from "lucide-react";
import { ZenControls } from '@/components/dashboard/ZenControls';
import { HBYSStatusIndicator } from '@/components/dashboard/HBYSStatusIndicator';
import { LoyaltyShieldStatus } from '@/components/dashboard/LoyaltyShieldStatus';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateMedicalReport } from "@/lib/pdf";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalLeads, syncWithServer } from "@/lib/persistence";
import { addLead } from "@/lib/leads";
import { getRankColor, getRankLabel } from "@/lib/gamification";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { DASHBOARD_TRANSLATIONS, DashboardLang } from "@/lib/dashboard-translations";
import { getNeuralForecast } from "@/lib/analytics";
import { getRankColor as getScoreColor } from "@/lib/scoring";

export default function Dashboard() {
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  ));

  const [lang, setLang] = useState<DashboardLang>('en');
  const t = DASHBOARD_TRANSLATIONS[lang];
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Manual language switcher update
  const changeLang = (newLang: DashboardLang) => {
    setLang(newLang);
    localStorage.setItem("aura_lang", newLang);
  };

  const handleExitImpersonation = () => {
    localStorage.removeItem('aura_impersonate_id');
    window.location.reload();
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<any[]>([]);

  const filteredLeads = leads.filter(l =>
    !searchQuery ||
    l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone?.includes(searchQuery)
  );
  const [stats, setStats] = useState<{
    totalLeads: number;
    activeChats: number;
    appointments: number;
    conversionRate: string;
    marketingROI: string;
    roas: string;
  }>({
    totalLeads: 0,
    activeChats: 0,
    appointments: 0,
    conversionRate: "0%",
    marketingROI: "x8.4",
    roas: "%840"
  });
  const [closerStatus, setCloserStatus] = useState<{ lastRun: string | null; active: boolean }>({
    lastRun: null,
    active: true
  });
  const [neuralLogs, setNeuralLogs] = useState<string[]>([
    "Neural Core initialized.",
    "Spatial context sync active."
  ]);
  const [forecast, setForecast] = useState<any>(null);
  const [currentTenant, setCurrentTenant] = useState("Aura Global Clinic");
  const [tenantId, setTenantId] = useState<string>("default_clinic");
  const [biometricStatus, setBiometricStatus] = useState<any>(null);
  const [blockchainStatus, setBlockchainStatus] = useState<string>("Synced");
  const [isZenMode, setIsZenMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const TRACKS = [
    { name: "Rain", src: "/zen-mode.mp3" },
    { name: "Ocean", src: "/zen-ocean.mp3" },
    { name: "Forest", src: "/zen-forest.mp3" }
  ];




  const handleDownloadPDF = (lead: any) => {
    try {
      const doc = generateMedicalReport({
        lead,
        clinicName: 'Aura International',
        doctorName: 'Dr. Neural AI',
        diagnosis: 'Androgenetic Alopecia (Predicted)',
        protocol: 'FUE Sapphire Transplant (4200 Grafts)',
        priceEstimate: '€2,450',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        lang: lang as any // Pass current dashboard language
      });
      doc.save(`Aura_Report_${lead.name.replace(/\s+/g, '_')}.pdf`);
      toast.success("Medical Report Generated");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate PDF");
    }
  };

  const fetchLeads = async (id: string) => {
    try {



      const response = await fetch(`/api/leads?tenantId=${id}`);
      const data = await response.json();
      if (data.leads) {
        setLeads(data.leads);

        // Trigger rewards for confirmed appointments
        const confirmedLeads = data.leads.filter((l: any) => l.status === 'Randevu Onaylandı');
        if (confirmedLeads.length > stats.appointments) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#000000', '#8b5cf6', '#ffffff']
          });
          toast.success("New Conversion Confirmed!");
        }

        const avgValue = 2500; // Simulated average treatment value in EUR
        const simulatedSpend = 1000; // Simulated monthly ad spend
        const totalRevenue = confirmedLeads.length * avgValue;
        const roi = simulatedSpend > 0 ? (totalRevenue / simulatedSpend) : 0;

        setStats({
          totalLeads: data.leads.length,
          activeChats: leads.filter(l => l.last_message).length || Math.floor(data.leads.length * 0.2),
          appointments: confirmedLeads.length,
          conversionRate: data.leads.length > 0 ? `${Math.round((confirmedLeads.length / data.leads.length) * 100)}%` : "0%",
          marketingROI: `x${roi.toFixed(1)}`,
          roas: `%${Math.round(roi * 100)}`
        });
      }
    } catch (e: any) {
      console.error("Dashboard fetchLeads error:", e.message);
      toast.error("Failed to sync neural stream.");
    }
  };

  const router = useRouter(); // Import useRouter from next/navigation

  const leadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);

    // Real Logs Fetcher (Hoisted)
    const loadRealLogs = async (tid: string) => {
      if (!supabase) return;
      const { data: realLogs } = await supabase
        .from('audit_logs')
        .select('description')
        .eq('tenant_id', tid)
        .order('created_at', { ascending: false })
        .limit(10);

      if (realLogs && realLogs.length > 0) {
        setNeuralLogs(realLogs.map((l: any) => l.description));
      } else {
        setNeuralLogs(["System online. Waiting for activity..."]);
      }
    };

    // Auth Check
    const checkSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // IMPERSONATION LOGIC (SaaS Phase 13)
      const impersonatedId = localStorage.getItem('aura_impersonate_id');
      if (impersonatedId) setIsImpersonating(true);

      const startTenantId = session.user.user_metadata?.tenant_id || "default_clinic";

      const tid = impersonatedId || startTenantId;
      const hname = impersonatedId ? `(Impersonating) ${tid.substring(0, 6)}...` : (session.user.user_metadata?.hospital_name || "Aura Global Clinic");

      setCurrentTenant(hname);
      setTenantId(tid);
      fetchLeads(tid);
      loadRealLogs(tid);

      // Realtime Subscription
      if (channelRef.current) supabase.removeChannel(channelRef.current);

      channelRef.current = supabase
        .channel('leads-realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'leads',
            filter: `tenant_id=eq.${tid}`
          },
          (_payload: any) => {
            console.log('[Realtime] Data sync triggered');
            fetchLeads(tid);
            toast("Neural Stream Updated", { icon: "⚡" });
          }
        )
        .subscribe();

      // Polling (Backup)
      if (leadIntervalRef.current) clearInterval(leadIntervalRef.current);
      leadIntervalRef.current = setInterval(() => fetchLeads(tid), 30000); // Poll every 30s as backup
    };

    checkSession();

    // Language Sync
    const savedLang = localStorage.getItem("aura_lang") as DashboardLang;
    if (savedLang && ['tr', 'en', 'ar'].includes(savedLang)) {
      setLang(savedLang);
    }

    // Online Status Tracking
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Connection Restored. Syncing data...");
      syncWithServer(addLead);
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Entering Offline Mode. Data will be saved locally.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    // Neural Forecasting
    setForecast(getNeuralForecast(30));

    // Set audio volume
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }



    // Poll logs occasionally
    const logInterval = setInterval(() => {
      // Re-fetch logs if needed or rely on realtime
    }, 10000);

    return () => {
      if (leadIntervalRef.current) clearInterval(leadIntervalRef.current);
      if (channelRef.current) supabase.removeChannel(channelRef.current);
      clearInterval(logInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleZenMode = () => {
    if (!isZenMode) {
      setIsZenMode(true);
      // Wait for ref update or use effect, but direct play works if src is steady.
      // We will ensure src is set.
      setTimeout(() => {
        audioRef.current?.play().catch(e => console.error("Zen Mode Play Error:", e));
      }, 50);
      toast.success(`Zen Mode: ${TRACKS[currentTrackIndex].name} Atmosphere Engaged`);
    } else {
      setIsZenMode(false);
      audioRef.current?.pause();
      toast.dismiss();
    }
  };

  const cycleTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);

    // If active, play new track immediately
    if (isZenMode && audioRef.current) {
      audioRef.current.src = TRACKS[nextIndex].src;
      audioRef.current.play();
      toast(`Atmosphere Switched: ${TRACKS[nextIndex].name}`, { icon: '🌊' });
    }
  };

  const runAutoCloser = async () => {
    const tId = toast.loading('Running Neural Sales Engine...');
    try {
      const res = await fetch('/api/cron/closer', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success(`Analysis Complete: ${data.count} Stale Leads Found. Nudges Prepared.`, { id: tId });
      } else {
        toast.error('Engine Stalled.', { id: tId });
      }
    } catch (e) {
      toast.error('Connection Failed', { id: tId });
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className={`min-h-screen mesh-bg flex flex-col lg:flex-row flex-nowrap w-full max-w-[100vw] overflow-x-hidden selection:bg-black selection:text-white ${lang === 'ar' ? 'rtl' : ''}`}>
      {/* Native Audio Element */}
      <audio ref={audioRef} loop />
      <ZenControls
        isOpen={isZenMode}
        onClose={() => setIsZenMode(false)}
        audioRef={audioRef}
        isPlaying={!audioRef.current?.paused}
        onTogglePlay={() => {
          if (audioRef.current?.paused) audioRef.current.play();
          else audioRef.current?.pause();
        }}
      />
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-6 bg-white border-b border-black/10 sticky top-0 z-[100] shadow-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3"
        >
          <Activity className="text-black" size={24} />
          <h1 className="text-xl font-black tracking-tighter">Aura <span className="text-neutral-400">OS</span></h1>
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 flex items-center justify-center bg-neutral-100 text-black rounded-full shadow-sm border border-black/5 hover:bg-black hover:text-white transition-all active:scale-95"
        >
          {isMobileMenuOpen ? <X size={20} /> : <div className="space-y-1"><div className="w-5 h-0.5 bg-current rounded-full"></div><div className="w-3 h-0.5 bg-current rounded-full mx-auto"></div><div className="w-5 h-0.5 bg-current rounded-full"></div></div>}
        </button>
      </div>

      {/* 2026 Spatial Sidebar - Floating Glass */}
      <aside className={`${isMobileMenuOpen ? 'fixed inset-0 flex bg-black/60 backdrop-blur-md' : 'hidden'} lg:flex lg:static lg:bg-transparent lg:inset-auto lg:backdrop-blur-none aura-sidebar-desktop p-4 md:p-8 flex-col gap-12 z-[1000] overflow-y-auto no-scrollbar lg:h-screen lg:w-auto`}>
        <div className="glass-canvas rounded-[3rem] w-full h-fit min-h-full p-8 flex flex-col gap-12 border-white/40 shadow-2xl card-sharp bg-white flex-1 lg:flex-none">
          {/* Mobile Close Button (Visible only on mobile) */}
          <div className="lg:hidden flex justify-end">
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-2xl shadow-xl">
              <Activity size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-black">Aura <span className="text-neutral-400">OS</span></h1>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-2 p-1 bg-black/5 rounded-2xl">
            {(['tr', 'en', 'ar'] as DashboardLang[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${lang === l ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-black'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} icon={<Layers size={18} />} label={t.operational} />
            <NavItem active={activeTab === 'inbox'} onClick={() => { router.push('/dashboard/inbox'); setIsMobileMenuOpen(false); }} icon={<MessageCircle size={18} />} label={lang === 'tr' ? 'Gelen Kutusu' : 'Unified Inbox'} />
            <NavItem active={activeTab === 'leads'} onClick={() => { setActiveTab('leads'); setIsMobileMenuOpen(false); }} icon={<Users size={18} />} label={t.subjects} />
            <NavItem active={activeTab === 'calendar'} onClick={() => { setActiveTab('calendar'); setIsMobileMenuOpen(false); }} icon={<Calendar size={18} />} label={t.timeline} />
            <NavItem active={activeTab === 'logs'} onClick={() => { setActiveTab('logs'); setIsMobileMenuOpen(false); }} icon={<Zap size={18} />} label={t.logs} />
            <NavItem active={activeTab === 'help'} onClick={() => { router.push('/help'); setIsMobileMenuOpen(false); }} icon={<ShieldAlert size={18} />} label={lang === 'tr' ? 'Yardım / S.S.S' : 'Help Center'} />

            <NavItem active={activeTab === 'settings'} onClick={() => { router.push('/dashboard/settings'); setIsMobileMenuOpen(false); }} icon={<Settings size={18} />} label={lang === 'tr' ? 'Ayarlar' : 'Settings'} />

            <Link href="/super-admin" className="w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all mt-4 border border-emerald-100">
              <Shield size={18} />
              <span>{lang === 'tr' ? 'Sistem Kontrol' : 'Super Admin'}</span>
            </Link>

            <Link href="/portal" className="w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest text-indigo-500 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all mt-2 border border-indigo-100">
              <Sparkles size={18} />
              <span>{lang === 'tr' ? 'Hasta Portalı' : 'Patient Portal'}</span>
            </Link>
          </nav>

          <div className="space-y-6 mt-auto">
            <button
              onClick={() => setIsZenMode(true)}
              className={`w-full spatial-card p-6 flex items-center justify-between transition-all group ${isZenMode ? 'bg-black text-white' : 'bg-black/5 text-black hover:bg-black/10'}`}
            >
              <div className="flex items-center gap-3">
                <Volume2 size={16} />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zen Controls</span>
                  <span className="text-[8px] opacity-60 font-bold uppercase tracking-widest">Adjust Atmosphere</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Settings size={14} />
              </div>
            </button>

            <div className="spatial-card p-6 bg-black/5 border-black/5 group cursor-default overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                    {isOnline ? 'System Online' : 'Offline Mode'}
                  </span>
                </div>
                {isOnline ? <Wifi size={14} className="text-neutral-300" /> : <WifiOff size={14} className="text-red-400" />}
              </div>
              <p className="text-[10px] font-bold text-black relative z-10 leading-tight">
                {isOnline ? 'Neural Intelligence Sync Active.' : 'Buffering data to local persistence.'}
              </p>
            </div>

            <Link href="/" className="flex items-center gap-2 p-2 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 hover:text-black transition-colors">
              <ArrowLeft size={14} /> {t.exit}
            </Link>

            <div className="mt-4 pt-4 border-t border-black/5 flex flex-col gap-1">
              <a href="https://www.zafercelik.me" target="_blank" className="text-[8px] font-black text-neutral-300 uppercase tracking-widest hover:text-black transition-colors">
                System Logic: Zafer Celik
              </a>
              <a href="https://www.nextoriadigital.com" target="_blank" className="text-[8px] font-black text-neutral-300 uppercase tracking-widest hover:text-indigo-500 transition-colors">
                Nextoria Digital
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="aura-main-content overflow-auto p-4 md:p-8 lg:p-10 no-scrollbar relative">
        <div className="max-w-[1400px] mx-auto w-full">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20 bg-black text-white p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400 block px-4 py-2 bg-white/10 rounded-full w-fit">
                  {t.commandCenter}
                </span>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
                  <ShieldCheck size={12} className="text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">{currentTenant}</span>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-400">EDGE BIO-SYNC</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <Database size={10} className="text-blue-400" />
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">L2 Ledger: {blockchainStatus}</span>
                  </div>
                  <HBYSStatusIndicator tenantId={tenantId} />
                </div>
                {activeTab !== 'overview' && (
                  <button
                    onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft size={12} /> Return to Core
                  </button>
                )}
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight"
              >
                {t.intelligence}<span className="text-white/20">.</span>
              </motion.h2>
            </div>

            <div className="flex flex-wrap items-center gap-8 group relative z-10">
              <div className="relative group/search bg-white/10 p-2 rounded-full border border-white/10 hover:border-white/20 transition-all">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.querySubjects}
                  className="pl-12 pr-6 py-4 bg-transparent text-sm font-bold text-white w-40 md:w-60 focus:w-72 md:focus:w-96 focus:outline-none transition-all tracking-tight placeholder:text-white/20"
                />
              </div>
              <button className="relative w-14 h-14 rounded-full glass-canvas flex items-center justify-center border-white/40 shadow-xl group hover:scale-110 active:scale-95 transition-all">
                <Bell size={22} className="text-neutral-400 group-hover:text-black transition-colors" />
                <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-black rounded-full shadow-lg border-2 border-white" />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="ov" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                  <StatItem label="WhatsApp Stream" value={leads.filter(l => l.channel === 'WhatsApp').length} trend="Active" />
                  <StatItem label="Global ROAS" value={stats.roas} trend="High ROI" />
                  <StatItem label="Marketing ROI" value={stats.marketingROI} trend="Excellent" />
                  <StatItem label="Conversion Flux" value={stats.conversionRate} trend="Optimal" />
                </div>

                {/* Auto-Pilot Control Center */}
                <div className="mb-12 glass-canvas p-6 rounded-3xl border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${closerStatus.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                    <div>
                      <p className="text-[10px] font-black uppercase text-neutral-400">Sales Auto-Pilot (Closer Engine)</p>
                      <p className="text-sm font-bold">{closerStatus.active ? 'Sistem Aktif & Reaksiyon Bekliyor' : 'Pasif'}</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      const tid = toast.loading("Manual Closer Trigger Initiated...");
                      try {
                        const res = await fetch('/api/cron/closer', { method: 'GET' });
                        if (res.ok) toast.success("Closer Cycle Complete.", { id: tid });
                        else toast.error("Bridge Error", { id: tid });
                      } catch (e) {
                        toast.error("Network Fail", { id: tid });
                      }
                    }}
                    className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                  >
                    Run Closer Cycle
                  </button>
                </div>

                {forecast && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20"
                  >
                    <div className="lg:col-span-8 glass-canvas p-12 rounded-[4rem] border-black/10 shadow-2xl bg-gradient-to-br from-indigo-50/50 to-white relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-12 opacity-5 scale-100 rotate-12 group-hover:rotate-0 transition-all duration-1000">
                        <BrainCircuit size={150} className="text-neutral-300" strokeWidth={1} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center animate-pulse">
                            <BrainCircuit size={24} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black tracking-tighter text-black">Neural Forecast <span className="text-indigo-500">30D</span></h3>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Predictive Growth Engine v4.0</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                          <div className="space-y-2">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Projected Leads</p>
                            <p className="text-4xl font-black tracking-tighter">+{forecast.predictedLeads}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Est. Revenue</p>
                            <p className="text-4xl font-black tracking-tighter text-indigo-600">€{forecast.predictedRevenue.toLocaleString()}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Confidence Score</p>
                            <div className="flex items-center gap-3">
                              <p className="text-4xl font-black tracking-tighter">%{forecast.confidenceInterval * 100}</p>
                              <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${forecast.confidenceInterval * 100}%` }}
                                  className="h-full bg-black"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 p-12 rounded-[4rem] border border-white/10 shadow-2xl bg-black text-white">
                      <h4 className="text-xl font-black tracking-tighter mb-8 text-white">Neural Insights</h4>
                      <div className="space-y-6">
                        {forecast.growthDrivers.map((driver: string, i: number) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-150 transition-all" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-200 group-hover:text-white">{driver}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-10 py-5 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-widest hover:scale-95 transition-all">
                        Execute Optimization
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Phase 6: Autonomous Ops Panel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20"
                >
                  <div className="glass-canvas p-8 rounded-[3rem] border-black/10 bg-white/40 flex items-center justify-between group hover:bg-black hover:text-white transition-all duration-500">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-neutral-500">Digital Twin Engine</p>
                      <h4 className="text-xl font-black tracking-tighter">AI 3D Simulation</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center">
                      <Cpu size={20} className="animate-spin-slow" />
                    </div>
                  </div>

                  <div className="glass-canvas p-8 rounded-[3rem] border-black/10 bg-white/40 flex items-center justify-between group hover:bg-emerald-500 hover:text-white transition-all duration-500">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-emerald-100">Legal Safeguard</p>
                      <h4 className="text-xl font-black tracking-tighter">Audit Active</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                  </div>

                  <div className="glass-canvas p-8 rounded-[3rem] border-black/10 bg-white/40 flex items-center justify-between group hover:bg-indigo-600 hover:text-white transition-all duration-500">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-indigo-100">Insurance API</p>
                      <h4 className="text-xl font-black tracking-tighter">Direct Sync</h4>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center">
                      <Activity size={20} />
                    </div>
                  </div>
                  {/* Neural Sales Autopilot (Phase 9) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-20">
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <LoyaltyShieldStatus active={true} />
                        <div className="glass-canvas p-8 rounded-[3rem] border-black/10 bg-white/40 flex items-center justify-between group hover:bg-rose-600 hover:text-white transition-all duration-500 cursor-pointer" onClick={runAutoCloser}>
                          <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-rose-100">Sale Auto-Pilot</p>
                            <h4 className="text-xl font-black tracking-tighter">Run Closer</h4>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-black/5 group-hover:bg-white/10 flex items-center justify-center">
                            <Zap size={20} className="group-hover:animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>

                {/* Neural Scoring Matrix Legend (Match 2026 Model) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-20 glass-canvas p-10 rounded-[3.5rem] border-black/10 bg-gradient-to-r from-neutral-50 to-white shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex-center text-white shadow-lg">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black tracking-tighter">Neural Scoring Matrix <span className="text-neutral-300">v4.0</span></h4>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Real-time Intent Conversion Logic</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ScoringLegendItem
                      rank="PLATINUM"
                      range="85-100"
                      desc={lang === 'tr' ? "Kaçırılmaması gereken VIP hasta." : "Must-not-miss VIP subject."}
                      color="#E5E4E2"
                    />
                    <ScoringLegendItem
                      rank="HOT"
                      range="65-84"
                      desc={lang === 'tr' ? "Satış kapanmaya çok yakın." : "Extremely close to conversion."}
                      color="#FF4D4D"
                    />
                    <ScoringLegendItem
                      rank="WARM"
                      range="40-64"
                      desc={lang === 'tr' ? "İlgi gösterilmesi gereken aday." : "Nurture required - high intent."}
                      color="#FFA500"
                    />
                    <ScoringLegendItem
                      rank="COLD"
                      range="0-39"
                      desc={lang === 'tr' ? "Henüz keşif aşamasında." : "Initial discovery phase."}
                      color="#A0A0A0"
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-24">
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-end mb-10">
                      <h3 className="text-3xl font-black tracking-tighter text-black">{t.eventLog}<span className="text-neutral-300">_</span></h3>
                      <button onClick={() => setActiveTab('leads')} className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-black transition-all">Expand Stream</button>
                    </div>
                    <div className="glass-canvas rounded-[3rem] p-4 border-white/40 shadow-2xl">
                      <LeadsTable leads={filteredLeads.slice(0, 5)} onDownloadPDF={handleDownloadPDF} />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="flex justify-between items-end mb-10">
                      <h3 className="text-3xl font-black tracking-tighter text-black">{t.neuralFeed}</h3>
                    </div>
                    <div className="glass-canvas rounded-[3rem] p-8 border-white/40 shadow-2xl h-[450px] overflow-hidden relative">
                      <div className="space-y-6">
                        <AnimatePresence>
                          {neuralLogs.map((log, i) => (
                            <motion.div
                              key={`log-${log}-${i}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-start gap-4"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5 animate-pulse" />
                              <p className="text-xs font-bold text-neutral-500 tracking-tight leading-relaxed">
                                {log}
                              </p>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {neuralLogs.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-neutral-300 gap-4">
                          <Activity className="animate-pulse" size={32} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Calibrating...</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <motion.div key="ld" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-16">
                  <h3 className="text-4xl font-black tracking-tighter text-black">Subject Database.</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Total Analysis Coverage 100%</p>
                    <button onClick={() => {
                      const demo = {
                        id: 'demo_123',
                        name: 'Michael Reaves',
                        phone: '+905551234567',
                        treatment: 'Hair Transplant',
                        status: 'Qualified',
                        source: 'Instagram_Ads',
                        channel: 'WhatsApp',
                        score: 88,
                        score_rank: 'PLATINUM',
                        date: new Date().toLocaleDateString(),
                        history: []
                      };
                      setLeads([demo, ...leads]);
                      toast.success("Demo Lead Inserted", { icon: "🧪" });
                    }} className="px-3 py-1 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                      + Insert Demo Data
                    </button>
                  </div>
                </div>
                <div className="glass-canvas rounded-[3rem] p-4 border-white/40 shadow-2xl">
                  <LeadsTable
                    leads={filteredLeads}
                    lang={lang}
                    onDownloadPDF={handleDownloadPDF}
                    onLeadUpdate={(updatedLead) => {
                      const newLeads = leads.map(l => (l.id === updatedLead.id || l.phone === updatedLead.phone) ? updatedLead : l);
                      setLeads(newLeads);
                    }}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div key="cal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="h-[800px]">
                  <div className="flex justify-between items-end mb-10">
                    <div>
                      <h3 className="text-4xl font-black tracking-tighter text-black">Timeline Archive.</h3>
                      <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mt-2">Sequential Neural Events</p>
                    </div>
                    <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <Activity size={14} className="animate-pulse" /> Live Sync Active
                    </div>
                  </div>
                  <SmartCalendar tenantId={tenantId} />
                </div>
              </motion.div>
            )}

            {activeTab === 'logs' && (
              <motion.div key="lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-16">
                  <h3 className="text-4xl font-black tracking-tighter text-black">Neural Debug Stream.</h3>
                  <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mt-2">Real-time Artificial Processing</p>
                </div>
                <div className="glass-canvas rounded-[3rem] p-12 border-white/40 shadow-2xl font-mono text-sm space-y-4 bg-black/[0.02]">
                  {neuralLogs.map((log, i) => (
                    <div key={`debug-${i}`} className="flex gap-4">
                      <span className="text-neutral-300">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-black font-bold">{log}</span>
                    </div>
                  ))}
                  <div className="animate-pulse flex gap-4">
                    <span className="text-neutral-300">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-neutral-400 font-bold italic">Awaiting next neural pulse...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-bold text-sm transition-all relative overflow-hidden group ${active ? 'text-black bg-black/5 border border-black/10' : 'text-neutral-500 hover:text-black hover:bg-black/[0.02]'}`}
    >
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10 uppercase tracking-widest text-[10px] font-black">{label}</span>
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-black rounded-full" />}
    </button>
  );
}

function StatItem({ label, value, trend }: any) {
  return (
    <div className="glass-canvas p-6 lg:p-8 flex flex-col gap-4 lg:gap-6 group hover:scale-[1.02] transition-all duration-700 cursor-default border-black/10 shadow-2xl card-sharp bg-white min-h-[160px] justify-between">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[8px] lg:text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] group-hover:text-black transition-colors truncate">{label}</p>
        <div className="px-2 py-0.5 rounded-full bg-black text-[7px] text-white transition-all font-black uppercase tracking-widest shrink-0">
          {trend}
        </div>
      </div>
      <p className="text-3xl lg:text-5xl font-black tracking-tighter text-black transition-all truncate">{value}</p>
    </div>
  );
}










function LeadsTable({ leads, onDownloadPDF, onLeadUpdate, lang }: { leads: any[], onDownloadPDF: (lead: any) => void, onLeadUpdate?: (lead: any) => void, lang?: string }) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Vision AI State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadTargetLead, setUploadTargetLead] = useState<any>(null);

  const handleScanClick = (lead: any) => {
    setUploadTargetLead(lead);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetLead) return;

    setIsScanning(true);
    toast("Visual Cortex Analysis Initiated...", { icon: "👁️" });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result as string;

        const response = await fetch('/api/chat/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64Image,
            userId: uploadTargetLead.phone,
            source: uploadTargetLead.channel ? uploadTargetLead.channel.toLowerCase() : 'web',
            language: lang || 'tr' // Pass explicit language
          })
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Analysis Complete", { icon: "✅" });

          // OPTIMISTIC UI UPDATE
          if (onLeadUpdate && data.message) {
            const newHistory = [...(uploadTargetLead.history || [])];

            // Add "User sent image" marker (Optional)
            newHistory.push({
              role: 'user',
              content: '[IMAGE UPLOADED]',
              timestamp: new Date().toISOString()
            });

            // Add AI Response
            newHistory.push({
              role: 'assistant',
              content: data.message,
              timestamp: new Date().toISOString()
            });

            const updatedLead = { ...uploadTargetLead, history: newHistory };
            onLeadUpdate(updatedLead);
          }
        } else {
          toast.error("Vision Analysis Failed");
        }
        setIsScanning(false);
        setUploadTargetLead(null);
      };
    } catch (error) {
      console.error(error);
      toast.error("Upload Error");
      setIsScanning(false);
    }
  };

  const handleSendReply = async (lead: any) => {
    if (!replyText.trim()) return;
    setIsSending(true);

    try {
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: lead.phone,
          message: replyText,
          channel: lead.channel || 'WhatsApp'
        })
      });

      if (!response.ok) throw new Error('Failed to send');

      toast.success("Message sent successfully!");
      setReplyText("");
      // Ideally, trigger a refresh here or optimistically update
      // For now, we rely on the next poll cycle to fetch history
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  if (leads.length === 0) return <div className="py-32 text-center text-neutral-600 font-black uppercase tracking-[0.5em] text-[10px]">Awaiting Signal Input...</div>;


  return (
    <div className="overflow-x-auto pb-6 no-scrollbar w-full">
      {/* Hidden Vision Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*"
      />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Entity</th>
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Score</th>
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Purpose</th>
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Channel</th>
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/10">Status</th>
            <th className="p-2 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:table-cell">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l, i) => (
            <Fragment key={l.id || i}>
              <tr
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData('lead', JSON.stringify(l));
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onClick={() => setSelectedLeadId(selectedLeadId === (l.id || String(i)) ? null : (l.id || String(i)))}
                className={`group hover:bg-black/[0.02] cursor-pointer transition-all ${selectedLeadId === (l.id || String(i)) ? 'bg-black/[0.03]' : ''} active:cursor-grabbing hover:shadow-lg hover:z-10 relative`}
              >
                <td className="p-2">
                  <div>
                    <p className="font-black text-sm text-black tracking-tighter">{l.name}</p>
                    <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest mt-1">{l.phone}</p>
                  </div>
                </td>
                <td className="p-3 border-l border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden flex-1 max-w-[80px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${l.score || 0}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full"
                        style={{
                          backgroundColor: getScoreColor(l.score_rank || 'COLD'),
                          boxShadow: `0 0 10px ${getScoreColor(l.score_rank || 'COLD')}40`
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black tracking-tighter" style={{ color: getScoreColor(l.score_rank || 'COLD') }}>
                        {l.score_rank || 'COLD'}
                      </span>
                      <span className="text-[7px] font-bold text-neutral-400">%{l.score || 0}</span>
                    </div>
                  </div>
                </td>
                <td className="p-2 border-l border-white/5">
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                    {l.treatment}
                  </span>
                </td>
                <td className="p-2 border-l border-white/5">
                  <div className="flex items-center gap-2">
                    {l.channel === 'WhatsApp' ? (
                      <MessageCircle size={12} className="text-green-500" />
                    ) : l.channel === 'Instagram' ? (
                      <Instagram size={12} className="text-pink-500" />
                    ) : l.channel === 'Telegram' ? (
                      <Send size={12} className="text-sky-500" />
                    ) : (
                      <Globe size={12} className="text-blue-500" />
                    )}
                    <span className="text-[8px] font-black uppercase tracking-wider text-neutral-400 hidden lg:inline">
                      {l.channel || 'Web'}
                    </span>
                  </div>
                </td>
                <td className="p-2 border-l border-white/5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        const statuses = ['Beklemede', 'Kalifiye', 'Randevu Onaylandı', 'Operasyon Planlandı', 'Tamamlandı', 'Arşivlendi'];
                        const currentIndex = statuses.indexOf(l.status);
                        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

                        const tId = toast.loading(`${l.name} status shifting...`);
                        try {
                          const res = await fetch('/api/leads/update-status', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ leadId: l.id, status: nextStatus })
                          });
                          if (res.ok) {
                            toast.success(`Moved to ${nextStatus}`, { id: tId });
                            if (onLeadUpdate) onLeadUpdate({ ...l, status: nextStatus });
                          } else {
                            toast.error('Sync Fail', { id: tId });
                          }
                        } catch (err) {
                          toast.error('Network Error', { id: tId });
                        }
                      }}
                      className="flex items-center gap-2 hover:bg-black/5 px-2 py-1 rounded transition-all active:scale-95"
                    >
                      <div className={`w-2 h-2 rounded-full ${l.status === 'Beklemede' ? 'bg-neutral-400' : l.status === 'Randevu Onaylandı' ? 'bg-indigo-500 animate-pulse' : 'bg-purple-500'}`} />
                      <span className="text-[8px] font-black uppercase tracking-wider text-neutral-500 group-hover:text-black transition-colors truncate">{l.status}</span>
                    </button>
                  </div>
                </td>
                <td className="p-2 text-[9px] font-black text-neutral-500 uppercase tabular-nums border-l border-white/5 group-hover:text-black transition-all whitespace-nowrap hidden sm:table-cell">{l.date}</td>
              </tr>
              {selectedLeadId === (l.id || String(i)) && (
                <tr>
                  <td colSpan={6} className="p-8 bg-black/[0.01] border-b border-black/5">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col lg:flex-row gap-10 mb-8">
                        <div className="flex-1">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-4">Patient Lifetime Journey</h4>
                          <PatientJourney lead={l} />
                          <DigitalDocs lead={l} />
                        </div>

                        {/* Neural Briefing (Ahmet Bey Interface) */}
                        <div className="lg:w-80 glass-canvas p-6 rounded-3xl bg-indigo-600 text-white shadow-xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-all">
                            <BrainCircuit size={80} />
                          </div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">Neural Briefing (Ahmet Bey)</h4>
                          <div className="space-y-4">
                            <p className="text-[11px] font-bold leading-relaxed italic">
                              {l.summary || "Generating surgical strike brief..."}
                            </p>
                            {!l.summary && (
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  const tid = toast.loading("Analyzing chat for Ahmet Bey...");
                                  const res = await fetch('/api/chat/summary', {
                                    method: 'POST',
                                    body: JSON.stringify({ userId: l.phone })
                                  });
                                  const data = await res.json();
                                  if (data.success && onLeadUpdate) {
                                    onLeadUpdate({ ...l, summary: data.summary });
                                    toast.success("Briefing Ready", { id: tid });
                                  } else {
                                    toast.error("Bridge Error", { id: tid });
                                  }
                                }}
                                className="w-full py-2 bg-white text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                              >
                                Generate Briefing
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Neural Transcript Archive</h4>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase rounded-full">Source: {l.channel}</span>
                          <button onClick={(e) => { e.stopPropagation(); onDownloadPDF(l); }} className="px-3 py-1 bg-black/5 hover:bg-black hover:text-white transition-all text-neutral-600 text-[8px] font-black uppercase rounded-full flex items-center gap-2">
                            <FileDown size={10} />
                            Export PDF
                          </button>
                        </div>
                      </div>

                      <div className="max-h-[300px] overflow-y-auto pr-4 space-y-4 no-scrollbar">
                        {l.history && l.history.length > 0 ? l.history.map((msg: any, idx: number) => (
                          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl text-[11px] leading-relaxed font-bold ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white border border-black/5 text-black rounded-tl-none shadow-sm'}`}>
                              {msg.content}
                            </div>
                            <span className="text-[8px] font-black text-neutral-300 uppercase mt-1 px-2">{msg.role} • {new Date(msg.timestamp).toLocaleTimeString()}</span>
                          </div>
                        )) : (
                          <div className="py-12 text-center">
                            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">No chat history available for this lead.</p>
                          </div>
                        )}
                      </div>

                      {/* Manual Reply Section */}
                      <div className="pt-6 border-t border-black/5 flex gap-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply via ${l.channel}...`}
                          className="flex-1 p-4 rounded-2xl bg-white border border-black/10 text-sm font-bold focus:outline-none focus:border-black/20 transition-all resize-none h-20"
                        />
                        <div className="flex gap-2">
                          <button className="p-3 rounded-xl bg-black/5 hover:bg-black hover:text-white transition-all text-neutral-500">
                            <Paperclip size={18} />
                          </button>
                          <button
                            onClick={() => handleScanClick(l)}
                            disabled={isScanning}
                            className="p-3 rounded-xl bg-black/5 hover:bg-indigo-600 hover:text-white transition-all text-neutral-500 group/scan relative overflow-hidden"
                          >
                            <Scan size={18} className={isScanning ? "animate-spin" : ""} />
                            {/* Scanning Animation Effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/scan:translate-y-[-100%] transition-transform duration-700" />
                          </button>
                          <button
                            onClick={() => handleSendReply(l)}
                            disabled={isSending || !replyText.trim()}
                            className="px-6 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                          >
                            {isSending ? 'Sending...' : (
                              <><span>Send</span> <Send size={14} /></>
                            )}
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScoringLegendItem({ rank, range, desc, color }: any) {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-[2rem] bg-white border border-black/5 hover:border-black/10 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-widest" style={{ color }}>{rank}</span>
        <span className="text-[9px] font-bold text-neutral-300">{range}</span>
      </div>
      <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
        <div className="h-full w-full opacity-60" style={{ backgroundColor: color }} />
      </div>
      <p className="text-[10px] font-bold leading-snug text-neutral-500">{desc}</p>
    </div>
  );
}


