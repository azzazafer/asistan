"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, X, LayoutDashboard, Microscope, ShieldCheck, Zap, RefreshCw, Star, Dna, FileText, ChevronRight, FileBarChart, CreditCard, Lock,
  Activity, Calendar, CheckCircle2, Clock, User, Sparkles, BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { TreatmentTimeline, TimelineNode } from '@/components/portal/timeline';
import { PaymentModal } from '@/components/portal/payment-modal';
import { getPatientData, PatientData } from '@/lib/portal';

// i18n Dictionary
const translations = {
  tr: {
    exit: "Çıkış Yap",
    status: "Neural Durum",
    encrypted: "Şifreli & Canlı",
    welcome: "Tekrar Hoş Geldin,",
    neuralSpace: "Aura Neural Alan",
    subjectId: "Konu ID",
    subjectSince: "Aralık 2025'ten beri",
    rank: "Rütbe",
    credits: "Neural Kredi",
    progress: "Mevcut İlerleme",
    matrix: "Matris Tamamlanması",
    estDays: "Tahmini 3 Gün",
    teamActive: "Ekip Aktif",
    neuralSync: "Neural Senkronizasyon",
    vault: "Dijital Tıbbi Kasa",
    vaultDesc: "Analiz Raporları, Reçeteler ve Taramalar sıkıca şifrelenmiştir.",
    warranty: "Aura Global Garanti",
    warrantyDesc: "10 yıllık Neural Entegrasyon garantiniz doğrulandı.",
    timeline: "Zaman Çizelgesi Akışı",
    nextSync: "Sıradaki Senkronizasyon",
    milestoneDesc: "VIP Medikal Süit 09 • Seviye 4",
    syncBtn: "Takvimle Senkronize Et",
    specialist: "Aura Uzmanı",
    procedure: "Prosedür Tipi",
    privacy: "Neural Gizlilik",
    loginTitle: "Neural Erişim",
    loginSub: "Küresel Sağlık Alanı Entegrasyonu",
    idPlaceholder: "Konu ID girin...",
    pinPlaceholder: "PIN girin...",
    authBtn: "Erişimi Yetkilendir",
    authError: "Erişim reddedildi. Lütfen ID ve PIN'i kontrol edin.",
    labResults: "Neural Laboratuvar Sonuçları",
    labDesc: "Kan değerleri, DNA metilasyonu ve biyometrik veriler.",
    viewReports: "Raporları İncele",
    reportDate: "Rapor Tarihi",
    reportStatus: "Durum",
    normality: "Normallik Oranı",
    aiInsight: "Neural Yapay Zeka Analizi",
    vitalSignals: "Hayati Sinyaller",
    bloodWork: "Kan Tahlili",
    neuralScan: "Nöral Tarama",
    geneticMarkers: "Genetik İşaretleyiciler",
    changePin: "Neural PIN Değiştir",
    newPin: "Yeni PIN",
    updateBtn: "PIN Güncelle",
    backToDash: "Komuta Merkezine Dön"
  },
  en: {
    exit: "Exit Space",
    status: "Neural Status",
    encrypted: "Encrypted & Live",
    welcome: "Welcome Back,",
    neuralSpace: "Aura Neural Space",
    subjectId: "Subject ID",
    subjectSince: "Subject since Dec 2025",
    rank: "Rank",
    credits: "Neural Credits",
    progress: "Current Progress",
    matrix: "Matrix Completion",
    estDays: "Estimated 3 Days",
    teamActive: "Team Active",
    neuralSync: "Neural Sync",
    vault: "Digital Medical Vault",
    vaultDesc: "Analysis Reports, Prescriptions, and Scans strictly encrypted.",
    warranty: "Aura Global Warranty",
    warrantyDesc: "Your 10-year Neural Integration guarantee is verified.",
    timeline: "Timeline Flow",
    nextSync: "Next Sync Point",
    milestoneDesc: "VIP Medical Suite 09 • Level 4",
    syncBtn: "Sync With Calendar",
    specialist: "Aura Specialist",
    procedure: "Procedure Type",
    privacy: "Neural Privacy",
    loginTitle: "Neural Access",
    loginSub: "Global Health Space Integration",
    idPlaceholder: "Enter Subject ID...",
    pinPlaceholder: "Enter PIN...",
    authBtn: "Authorize Access",
    authError: "Identification mismatch. Verify credentials.",
    labResults: "Neural Lab Results",
    labDesc: "Blood metrics, DNA methylation and biometric data.",
    viewReports: "View Reports",
    reportDate: "Report Date",
    reportStatus: "Status",
    normality: "Normality Rate",
    aiInsight: "AI Neural Insight",
    vitalSignals: "Vital Signals",
    bloodWork: "Blood Analysis",
    neuralScan: "Neural Scan",
    geneticMarkers: "Genetic Markers",
    changePin: "Change Neural PIN",
    newPin: "New Neural PIN",
    updateBtn: "Update PIN",
    backToDash: "Back to Control Center"
  },
  ar: {
    exit: "خروج",
    status: "الحالة العصبية",
    encrypted: "مشفر وحي",
    welcome: "مرحباً بعودتك،",
    neuralSpace: "فضاء أورا العصبي",
    subjectId: "معرف الشخص",
    subjectSince: "عضو منذ ديسمبر 2025",
    rank: "الرتبة",
    credits: "رصيد عصبي",
    progress: "التقدم الحالي",
    matrix: "اكتمال المصفوفة",
    estDays: "المتوقع 3 أيام",
    teamActive: "الفريق نشط",
    neuralSync: "المزامنة العصبية",
    vault: "القبو الطبي الرقمي",
    vaultDesc: "تقارير التحليل والوصفات والمسوحات مشفرة تماماً.",
    warranty: "ضمان أورا العالمي",
    warrantyDesc: "تم التحقق من ضمان التكامل العصبي لمدة 10 سنوات.",
    timeline: "تدفق الجدول الزمني",
    nextSync: "نقطة المزامنة التالية",
    milestoneDesc: "جناح VIP الطبي 09 • الطابق 4",
    syncBtn: "مزامنة مع التقويم",
    specialist: "أخصائي أورا",
    procedure: "نوع الإجراء",
    privacy: "الخصوصية العصبية",
    loginTitle: "الوصول العصبي",
    loginSub: "تكامل فضاء الصحة العالمي",
    idPlaceholder: "أدخل معرف الشخص...",
    pinPlaceholder: "أدخل الرقم السري...",
    authBtn: "تفويض الوصول",
    authError: "فشل في الهوية. تحقق من البيانات.",
    labResults: "نتائج المختبر العصبي",
    labDesc: "قياسات الدم، ميثة الحمض النووي والبيانات الحيوية.",
    viewReports: "عرض التقارير",
    reportDate: "تاريخ التقرير",
    reportStatus: "الحالة",
    normality: "معدل طبيعي",
    aiInsight: "تحليل الذكاء الاصطناعي",
    vitalSignals: "الإشارات الحيوية",
    bloodWork: "تحليل الدم",
    neuralScan: "المسح العصبي",
    geneticMarkers: "المؤشرات الجينية",
    changePin: "تغيير الرقم السري العصبى",
    newPin: "الرقم السري الجديد",
    updateBtn: "تحديث الرقم السري",
    backToDash: "العودة لمركز القيادة"
  }
};

export default function PatientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [otp, setOtp] = useState('');
  const [authStep, setAuthStep] = useState<'id' | 'otp'>('id'); // Flow step
  const [maskedPhone, setMaskedPhone] = useState('');
  const [error, setError] = useState(false);
  const [lang, setLang] = useState('en');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<{ amount: number; currency: string; clientSecret: string }>({
    amount: 1500,
    currency: 'eur',
    clientSecret: ''
  });
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Dynamic Data Logic
  const labs = patientData?.lead?.custom_fields?.labs || [];
  const prescriptions = patientData?.documents.filter(d => d.type?.toLowerCase().includes('prescription')) || [];
  const reports = patientData?.documents.filter(d => !d.type?.toLowerCase().includes('prescription')) || [];

  const handleJoinCall = async (id: string) => {
    toast.loading(lang === 'tr' ? 'Oda oluşturuluyor...' : 'Creating room...');
    const res = await fetch('/api/telemedicine/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: patientData?.lead?.id })
    });
    const data = await res.json();
    if (data.url) {
      window.open(data.url, '_blank');
      toast.dismiss();
    } else {
      toast.error('Görüşme başlatılamadı.');
    }
  };

  const handleInitiatePayment = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1500,
          currency: 'eur',
          patientId: patientData?.lead?.id,
          patientName: patientData?.lead?.name,
          patientPhoneNumber: patientData?.lead?.phone,
          culture: patientData?.lead?.culture
        })
      });

      const { clientSecret, error } = await res.json();
      if (error) throw new Error(error);

      setPaymentConfig(prev => ({ ...prev, clientSecret }));
      setShowPaymentModal(true);
    } catch (err: any) {
      toast.error(lang === 'tr' ? 'Ödeme başlatılamadı: ' + err.message : 'Payment failed: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Real-time Sync Simulation & Auth Detection
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 1000);
    }, 15000);

    // Detect Staff Mode
    const session = localStorage.getItem("aura_session");
    if (session) setIsStaff(true);

    // Load Lang
    const savedLang = localStorage.getItem("aura_lang");
    if (savedLang) setLang(savedLang);

  }, []);

  const refreshData = async () => {
    if (!accessCode) return;
    try {
      const res = await fetch(`/api/portal/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode, otp: 'SESSION_REFRESH' }) // Special mode or just re-verify if session exists
      });
      // Actually, since we have sessionToken in localStorage, a better /get-data API is needed.
      // For now, let's just re-run the verify logic if we have the accessCode.
    } catch (e) {
      console.error("Refresh failed", e);
    }
  };

  // Handlers
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/portal/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode, language: lang })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMaskedPhone(data.maskedPhone);
      setAuthStep('otp');
      toast.success(lang === 'tr' ? "Doğrulama kodu gönderildi!" : "Verification code sent!");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/portal/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode,
          otp
        })
      });

      // Improvement: The send-otp could return the phone if we trust the client, 
      // but better to fetch it again or store it in a secure session.
      // For now, let's assume verify-otp can find it by accessCode if we update it.

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPatientData(data.data);
      setIsAuthenticated(true);
      localStorage.setItem("patient_session", data.sessionToken);
      toast.success(lang === 'tr' ? "Erişim sağlandı." : "Access granted.");

    } catch (err: any) {
      toast.error(err.message || "Verification failed");
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePin = async () => {
    if (newPin.length !== 4) {
      toast.error("PIN must be exactly 4 digits.");
      return;
    }

    const toastId = toast.loading("Updating Neural Security Layer...");

    try {
      const response = await fetch('/api/portal/update-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode, newPin })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Update failed');

      toast.success("Neural PIN Updated. Identity verified.", { id: toastId });
      setShowPinModal(false);
      setNewPin('');
    } catch (e) {
      toast.error("Failed to update PIN.", { id: toastId });
      console.error(e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8 selection:bg-indigo-500 overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] -ml-64 -mb-64" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-3xl rounded-4-0rem p-12 md:p-16 border border-white/10 shadow-2xl relative z-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="absolute top-8 right-8 flex gap-2">
            {['tr', 'en', 'ar'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded ${lang === l ? 'bg-white text-black' : 'text-white/40'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <ShieldCheck size={32} className="text-black" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter text-center">{t.loginTitle}</h2>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2 text-center">
              {t.loginSub}
            </p>
          </div>

          <form onSubmit={authStep === 'id' ? handleSendOTP : handleVerifyOTP} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-4">{t.subjectId}</label>
              <input
                type="text"
                value={accessCode}
                readOnly={authStep === 'otp'}
                onChange={e => setAccessCode(e.target.value)}
                placeholder={t.idPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-indigo-500 transition-all font-sans disabled:opacity-50"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
              />
            </div>

            {authStep === 'otp' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                <label className="text-[8px] font-black text-white/40 uppercase tracking-widest ml-4">
                  {lang === 'tr' ? 'Doğrulama Kodu' : 'Verification Code'} ({maskedPhone})
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="******"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-center tracking-[1em] focus:outline-none focus:border-indigo-500 transition-all"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  autoFocus
                />
              </motion.div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-white bg-red-500/20 border border-red-500/30 p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                >
                  {t.authError}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading
                ? (lang === 'tr' ? 'İşleniyor...' : 'Processing...')
                : (authStep === 'id' ? (lang === 'tr' ? 'Kod Gönder' : 'Send Code') : t.authBtn)
              }
            </button>

            {authStep === 'otp' && (
              <button
                type="button"
                onClick={() => setAuthStep('id')}
                className="w-full text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors mt-2"
              >
                {lang === 'tr' ? 'Geri Dön' : 'Go Back'}
              </button>
            )}
          </form>

          <Link href="/" className="flex items-center justify-center gap-2 mt-10 text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">
            <ArrowLeft size={12} /> {t.exit.split(' ')[0]}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white font-sans overflow-x-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* PIN Change Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-xl flex items-center justify-center p-8">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-12 rounded-4-0rem w-full max-w-sm border border-neutral-100 shadow-2xl relative">
              <button onClick={() => setShowPinModal(false)} className="absolute top-8 right-8 text-neutral-300 hover:text-black transition-colors"><X size={24} /></button>
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-black shadow-xl">
                  <Lock size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter">{t.changePin}</h3>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={e => setNewPin(e.target.value)}
                  placeholder="****"
                  className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-center text-2xl font-black tracking-[1em] focus:outline-none focus:border-black transition-all"
                />
                <button onClick={updatePin} className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                  {t.updateBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Laboratory Modal */}
      <AnimatePresence>
        {showLab && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex flex-col p-8 md:p-20 overflow-y-auto">
            <div className="w-full max-w-6xl mx-auto">
              <header className="flex justify-between items-center mb-20">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full mb-4 block w-fit">
                    <Microscope size={12} className="inline mr-2" /> {t.vitalSignals}
                  </span>
                  <h2 className="text-6xl font-black tracking-tighter">{t.labResults}</h2>
                </div>
                <button onClick={() => setShowLab(false)} className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <X size={32} />
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {labs.map((lab: any, i: number) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="aura-card p-12 space-y-8">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{lab.category}</span>
                      <span className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase ${lab.status === 'Normal' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                        {lab.status}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-neutral-50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${lab.score}%` }} transition={{ duration: 1.5 }} className="h-full bg-black" />
                    </div>
                    <div className="pt-2 border-t border-neutral-100 mt-2">
                      {lab.items && lab.items.map((item: any, j: number) => (
                        <div key={j} className="flex justify-between items-center text-[10px] text-neutral-400 py-1">
                          <span>{item.name}</span>
                          <span className="font-bold text-black">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 p-12 bg-black rounded-4-0rem text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center shrink-0">
                  <BrainCircuit size={48} className="text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">{t.aiInsight}</span>
                  <p className="text-2xl font-bold leading-relaxed tracking-tight">
                    {patientData?.lead?.summary || (lang === 'tr'
                      ? "Neural Analiz bekleniyor. Lütfen yaklaşan randevunuzu bekleyin."
                      : "Awaiting Neural Analysis. Please await your upcoming appointment.")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 bg-neutral-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[150px] -ml-48 -mb-48" />
      </div>

      <nav className="aura-container py-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {isStaff ? (
            <Link href="/dashboard" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl active:scale-95 transition-all shadow-xl group">
              <LayoutDashboard size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{t.backToDash}</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-3 active:scale-95 transition-all">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-xl">
                <ArrowLeft size={18} />
              </div>
              <span className="text-sm font-black uppercase tracking-widest text-neutral-400">{t.exit}</span>
            </Link>
          )}
          <div className="flex gap-4">
            {['tr', 'en', 'ar'].map(l => (
              <button key={l} onClick={() => setLang(l)} className={`text-[9px] font-black uppercase tracking-widest transition-colors ${lang === l ? 'text-black' : 'text-neutral-300 hover:text-black'}`}>{l}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">{t.status}</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-indigo-500 animate-ping' : 'bg-green-500'}`} />
              <span className={`text-xs font-bold ${isSyncing ? 'text-indigo-500' : 'text-green-500'}`}>
                {isSyncing ? 'Neural Syncing...' : t.encrypted}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center border border-black-5">
            <RefreshCw size={20} className={`text-neutral-400 ${isSyncing ? 'animate-spin' : ''}`} />
          </div>
        </div>
      </nav>

      <main className="aura-container pb-32">
        <header className="mb-24 mt-8 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 w-fit px-4 py-1.5 rounded-full">
              <Zap size={10} fill="currentColor" /> {t.neuralSpace}
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-black leading-tight m-0">
              {t.welcome}<br />
              <span className="text-neutral-300">{(patientData?.lead?.name || 'Unknown Subject').split(' ')[0]}.</span>
            </h1>
            <p className="text-neutral-400 font-bold max-w-md uppercase tracking-tight text-[10px] pl-2">
              {t.subjectId}: {patientData?.lead?.phone || 'N/A'} • {t.subjectSince}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-black text-white p-12 rounded-4-0rem shadow-2xl flex flex-col gap-6 w-full md:w-96 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="flex justify-between items-start z-10">
              <Star fill="#EAB308" className="text-indigo-500" size={32} />
              <button onClick={() => setShowPinModal(true)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                <Lock size={16} />
              </button>
            </div>
            <div className="z-10">
              <h3 className="text-4xl font-black tracking-tighter">{patientData?.lead?.score_rank || 'N/A'}</h3>
              <p className="text-[10px] font-bold opacity-60 uppercase mt-2 tracking-widest">{patientData?.lead?.score || 0} {t.credits}</p>

              <button
                onClick={handleInitiatePayment}
                className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all group/btn"
              >
                <CreditCard size={14} />
                <span>VIP Aktive Et</span>
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </header>

        <div className="aura-grid-12">
          <section className="aura-span-8 flex flex-col gap-10">
            <div className="aura-card aura-p-base">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="space-y-10 flex-1">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4 block">{t.progress}</span>
                    <h2 className="text-5xl font-black tracking-tighter text-black leading-tight">
                      {t.matrix}<br />
                      <span className="text-neutral-300">{t.estDays}.</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-neutral-200" />)}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{t.teamActive}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center relative flex-1">
                  <svg className="w-72 h-72 transform -rotate-90">
                    <circle cx="144" cy="144" r="120" stroke="#f1f5f9" strokeWidth="24" fill="transparent" />
                    <circle cx="144" cy="144" r="120" stroke="#000" strokeWidth="24" fill="transparent" strokeDasharray={753} strokeDashoffset={753 * (1 - (patientData?.lead?.score || 0) / 100)} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-7xl font-black text-black">{patientData?.lead?.score ? Math.min(100, patientData.lead.score) : 0}%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-2">{t.neuralSync}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div onClick={() => setShowLab(true)} className="aura-card p-12 cursor-pointer group hover:bg-black transition-all">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <Microscope size={24} className="text-neutral-400 group-hover:text-white" />
                </div>
                <h4 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-white">{t.labResults}</h4>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-tight leading-loose group-hover:text-white/60">
                  {t.labDesc}
                </p>
              </div>
              <div className="aura-card p-12 cursor-pointer group hover:bg-black transition-all">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center mb-10 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <ShieldCheck size={24} className="text-neutral-400 group-hover:text-white" />
                </div>
                <h4 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-white">{t.warranty}</h4>
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-tight leading-loose group-hover:text-white/60">
                  {t.warrantyDesc}
                </p>
              </div>
            </div>
          </section>

          <aside className="aura-span-4 flex flex-col gap-10">
            <div className="aura-card p-12 space-y-12">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">{t.timeline}</span>
                <Dna size={18} className="text-neutral-200" />
              </div>

              <div className="space-y-12">
                <TreatmentTimeline
                  lang={lang}
                  nodes={[
                    ...(patientData?.appointments.map(app => ({
                      id: app.id,
                      title: app.title,
                      date: new Date(app.start_time).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' }),
                      status: (new Date(app.start_time) < new Date() ? 'completed' : 'pending') as 'completed' | 'pending',
                      desc: app.description || (lang === 'tr' ? 'Randevu Detayı' : 'Appointment Detail'),
                      location: app.location_id,
                      actions: new Date(app.start_time) >= new Date() ? (
                        <button
                          onClick={() => handleJoinCall(app.id)}
                          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2"
                        >
                          <Zap size={12} fill="currentColor" /> {lang === 'tr' ? 'Görüşmeye Katıl' : 'Join Consultation'}
                        </button>
                      ) : undefined
                    })) || []),
                    // AI PREDICTED NODE
                    {
                      id: 'ai-next-step',
                      title: lang === 'tr' ? 'AI Tahmini: İyileşme Analizi' : 'AI Prediction: Recovery Analysis',
                      date: 'Next Week',
                      status: 'ai' as const,
                      desc: lang === 'tr' ? 'Aura, operasyon sonrası 10. günde ilk kontrolünüzü öneriyor.' : 'Aura suggests your first post-op check on day 10.',
                    }
                  ]}
                />
              </div>
            </div>

            {/* Prescription Hub - New Section */}
            <div className="bg-emerald-600 rounded-4-0rem p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 blur-xl" />
              <div className="relative z-10 space-y-12">
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'tr' ? 'Reçetelerim' : 'Prescription Hub'}</span>
                  <FileBarChart size={22} />
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                  {prescriptions.length > 0 ? (
                    prescriptions.map((doc, idx) => (
                      <div key={idx} className="p-4 bg-white/10 rounded-2xl flex items-center justify-between group/doc hover:bg-white/20 transition-all cursor-pointer">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">{doc.name}</p>
                          <p className="text-[8px] opacity-50 uppercase mt-1">{new Date(doc.created_at).toLocaleDateString()}</p>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover/doc:opacity-100 transition-all" />
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-2xl opacity-50">
                      <p className="text-[10px] font-black uppercase tracking-widest">{lang === 'tr' ? 'Reçete kaydı bulunamadı' : 'No prescriptions found'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-4-0rem p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 blur-xl" />
              <div className="relative z-10 space-y-12">
                <div className="flex items-center justify-between opacity-50">
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.vault}</span>
                  <FileText size={22} />
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                  {reports.length > 0 ? (
                    reports.map((doc, idx) => (
                      <div key={idx} className="p-4 bg-white/10 rounded-2xl flex items-center justify-between group/doc hover:bg-white/20 transition-all cursor-pointer">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">{doc.name}</p>
                          <p className="text-[8px] opacity-50 uppercase mt-1">{doc.type} • {new Date(doc.created_at).toLocaleDateString()}</p>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover/doc:opacity-100 transition-all" />
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-2xl opacity-50">
                      <p className="text-[10px] font-black uppercase tracking-widest">{t.vaultDesc.slice(0, 30)}...</p>
                    </div>
                  )}
                </div>
                <button className="w-full py-6 bg-white text-black rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all font-sans">
                  {lang === 'tr' ? 'Kasayı Aç' : 'Unlock Vault'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full bg-neutral-50/50 py-24 border-t border-neutral-100">
        <div className="aura-container flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-12">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-1">{t.specialist}</span>
              <span className="text-sm font-bold text-black">{patientData?.lead?.specialist || 'Pending Assignment'}</span>
            </div>
            <div className="h-10 w-px bg-neutral-200" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest mb-1">{t.procedure}</span>
              <span className="text-sm font-bold text-black">{patientData?.lead?.treatment || 'General Consultation'}</span>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Link href="/privacy" className="text-[10px] font-black text-neutral-300 uppercase tracking-widest hover:text-black transition-colors">{t.privacy}</Link>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Aura OS Core v2.026.1</span>
              <a href="https://www.nextoriadigital.com" target="_blank" className="text-[8px] font-bold text-neutral-300 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                Engineered by Nextoria Digital
              </a>
            </div>
          </div>
        </div>
      </footer>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={paymentConfig.amount}
        currency={paymentConfig.currency}
        clientSecret={paymentConfig.clientSecret}
        onSuccess={() => {
          // Refresh patient data after successful payment
          refreshData();
        }}
      />
    </div>
  );
}
