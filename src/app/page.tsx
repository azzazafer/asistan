"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Plus,
  Bot,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  Stethoscope,
  Loader2,
  Mic,
  MessageSquare,
  LayoutDashboard,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  ArrowLeft,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { saveLeadLocally, syncWithServer } from '@/lib/persistence';
import { addLead } from '@/lib/leads';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: any; // New: Holds the structured vision result
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingState, setThinkingState] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Language Dictionary for Greeting
  const gTranslate = {
    tr: 'Merhaba. Ben Aura. Bugün sağlık yolculuğunuzda size nasıl yardımcı olabilirim?',
    en: 'Hello. I am Aura. How can I assist you in your health journey today?',
    ar: 'مرحباً. أنا أورا. كيف يمكنني مساعدتك في رحلتك الصحية اليوم؟'
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("aura_lang") || 'en';
    const greeting = gTranslate[savedLang as keyof typeof gTranslate] || gTranslate.en;

    setMessages([{
      id: 'init-1',
      role: 'assistant',
      content: greeting,
      timestamp: new Date()
    }]);
  }, []);

  const thinkingMessages = [
    "Analyzing symptoms...",
    "Syncing with Neural Records...",
    "Validating medical safety...",
    "Optimizing treatment matches...",
    "Structuring intelligence response..."
  ];

  const visionThinkingMessages = [
    "Processing visual data...",
    "Mapping Norwood scale...",
    "Calculating graft density...",
    "Simulating post-op outcome...",
    "Generating clinical report..."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Neural link restored.");
      syncWithServer(addLead);
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Neural link severed. Local persistence active.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [messages, thinkingState]);

  const handleSend = async (overrideContent?: string) => {
    const contentToSend = overrideContent || input;
    if ((!contentToSend.trim() && !selectedImage) || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: contentToSend || (selectedImage ? 'Image Analysis Request' : ''), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!overrideContent) setInput('');
    setIsLoading(true);

    // Determine thinking mode (Text vs Vision)
    const currentThinkingPool = selectedImage ? visionThinkingMessages : thinkingMessages;
    let thinkingIdx = 0;
    setThinkingState(currentThinkingPool[0]);

    const thinkingInterval = setInterval(() => {
      thinkingIdx = (thinkingIdx + 1) % currentThinkingPool.length;
      setThinkingState(currentThinkingPool[thinkingIdx]);
    }, 1500);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'aura-user-1',
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          image: selectedImage,
          language: localStorage.getItem("aura_lang") || 'en'
        })
      });

      clearInterval(thinkingInterval);
      setThinkingState(null);

      const data = await response.json();
      setSelectedImage(null); // Clear image immediately after response logic starts

      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }

      if (data.message?.content) {
        const content = data.message.content;
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: content,
          timestamp: new Date(),
          analysis: data.analysis // Capture the structured analysis
        }]);

        // Smart Language Detection
        let detected = 'en';
        if (/[ığüşöçİĞÜŞÖÇ]/.test(content)) detected = 'tr';
        else if (/[\u0600-\u06FF]/.test(content)) detected = 'ar';
        localStorage.setItem("aura_lang", detected);

        // Aura Sound (TTS) Entegrasyonu
        playAudio(content);
      }
    } catch (error) {
      clearInterval(thinkingInterval);
      setThinkingState(null);
      toast.error('Connection issue.');
    } finally {
      setIsLoading(false);
    }
  };

  /* VOICE RECORDING & PLAYBACK STATE */
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async (text: string) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'nova' }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      } else {
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.play();
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const handleVoice = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });

        // Send to API
        const toastId = toast.loading("Processing voice...");
        try {
          const formData = new FormData();
          formData.append('file', audioBlob);

          const res = await fetch('/api/voice', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          toast.dismiss(toastId);

          if (data.text) {
            toast.success("Holographic Voice Decoded", { icon: '🎙️' });
            handleSend(data.text);
          } else {
            toast.error("Voice unintelligible.");
          }
        } catch (err) {
          toast.dismiss(toastId);
          toast.error("Voice uplink failed.");
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast("Listening...", { icon: '🔴' });

    } catch (err) {
      console.error(err);
      toast.error("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleAnalysis = () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Max 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast.success("Holographic capture complete. Ready to analyze.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white overflow-x-hidden">
      {/* 2026 Spatial Background - Interactive Mesh */}
      <div className="fixed inset-0 -z-10 bg-[#fafafa]">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply filter blur-[120px] animate-pulse">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full" />
        </div>
      </div>

      {/* KVKK / GDPR Consent Modal */}
      <AnimatePresence>
        {showConsentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] w-full max-w-lg border border-neutral-100 shadow-2xl relative"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-black shadow-xl">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter">Medical Privacy & Consent</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  To perform medical analysis on your images, Aura requires your explicit consent.
                  Your data is encrypted and processed according to KVKK/GDPR standards.
                </p>
                <div className="w-full flex flex-col gap-4 mt-4">
                  <button
                    onClick={() => { setHasConsent(true); setShowConsentModal(false); }}
                    className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    I Consent & Accept Terms
                  </button>
                  <button
                    onClick={() => setShowConsentModal(false)}
                    className="w-full text-neutral-400 py-2 text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors"
                  >
                    Not Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section & Navigation */}
      <section className="relative min-h-screen flex flex-col items-center">
        <nav className="w-full max-w-7xl px-8 md:px-12 py-10 flex flex-wrap items-center justify-between z-50 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-2xl shadow-2xl group-hover:scale-110 transition-all">
              <Stethoscope size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter uppercase leading-none">Aura <span className="text-indigo-600">OS</span></span>
              <span className="text-[10px] font-black text-neutral-400 tracking-[0.3em] uppercase">Revenue Engine</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-6 md:gap-10"
          >
            <Link href="/dashboard" className="text-xs font-black text-neutral-400 hover:text-black transition-all uppercase tracking-[0.2em] flex items-center gap-2 py-2">
              <LayoutDashboard size={14} /> Control Center
            </Link>

            <Link href="/portal" className="group relative flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-all shadow-2xl">
              <User size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Patient Space</span>
            </Link>
          </motion.div>
        </nav>

        <div className="flex-1 w-full max-w-5xl px-8 flex flex-col items-center justify-center relative pb-20">
          <AnimatePresence>
            {!messages.some(m => m.role === 'user') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="flex flex-col items-center mb-16"
              >
                <div className="w-24 h-24 bg-black rounded-full mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.3)] animate-pulse">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center mb-6 leading-[0.85]">
                  Revenue<br /><span className="text-indigo-600">Automated.</span>
                </h1>
                <p className="text-neutral-500 font-bold text-center max-w-lg uppercase tracking-[0.3em] text-[10px] mb-12">
                  The World's First Autonomous Sales Force for Global Health Tourism.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => {
                    const el = document.getElementById('funnel-logic');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} className="px-10 py-5 bg-white border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-neutral-50 transition-all">
                    How it works
                  </button>
                  <button onClick={() => {
                    const el = document.getElementById('chat-input-area');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} className="px-10 py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                    Try Aura Vision
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`w-full transition-all duration-1000 ${messages.some(m => m.role === 'user') ? 'min-h-[60vh]' : 'h-0 opacity-0 overflow-hidden'}`}>
            <div ref={scrollRef} className="h-full px-6 py-12 space-y-12">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] p-6 rounded-3xl text-xl font-bold ${m.role === 'user' ? 'bg-black text-white shadow-xl' : 'bg-white border border-neutral-100 shadow-sm text-neutral-500'}`}>
                    {m.content}
                  </div>
                  {m.analysis && (
                    <div className="mt-4 p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 w-full max-w-md shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles size={20} className="text-indigo-600" />
                        <span className="font-black text-[10px] uppercase tracking-widest">Aura Vision Analysis</span>
                      </div>
                      <p className="text-2xl font-black mb-2">{m.analysis.diagnosis}</p>
                      <p className="text-sm font-bold text-indigo-600/70 mb-4">{m.analysis.suggestedTreatment}</p>
                      <div className="bg-white p-4 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-neutral-400">Graft Estimate</span>
                        <span className="text-xl font-black text-black">{m.analysis.estimatedGrafts}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {thinkingState && <div className="text-indigo-600 font-black animate-pulse uppercase tracking-widest text-xs italic">{thinkingState}</div>}
            </div>
          </div>

          <div id="chat-input-area" className="w-full mt-auto pt-16">
            <div className="spatial-card bg-white/40 backdrop-blur-3xl rounded-[3rem] p-4 flex flex-col shadow-2xl border border-white/20">
              <div className="flex items-center gap-4 w-full">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Ask Aura anything..." className="flex-1 bg-transparent px-2 py-4 text-xl font-bold focus:outline-none" />
                <button onClick={() => handleSend()} className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-10 mt-8">
              <button onClick={handleVoice} className="text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-black flex items-center gap-2">
                <Mic size={14} /> Voice Command
              </button>
              <button onClick={handleAnalysis} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700 flex items-center gap-2">
                <Sparkles size={14} /> Aura Vision™
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FUNNEL LOGIC */}
      <section id="funnel-logic" className="py-40 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.5em]">The Conversion Engine</span>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85]">
                Closer,<br /><span className="text-neutral-700">Not Assistant.</span>
              </h2>
              <p className="text-neutral-400 text-xl font-medium leading-relaxed">
                Rakipler sadece sekreterlik yapar. Aura OS ise hastayı analiz eder, tıbbi otorite kurar ve **Stripe entegresi** ile satışı saniyeler içinde kapatır.
              </p>
              <div className="space-y-12">
                {[
                  { title: "Vortex Vision™ Diagnostic", desc: "Hastanın gönderdiği fotoğrafları cerrahi hassasiyetle analiz ederek 'Bilimsel Güven' yaratır." },
                  { title: "Neural Pay™ Bridge", desc: "Satışın en sıcak olduğu anda chat içinde depozitoyu tahsil ederek 'Closing' yapar." },
                  { title: "Channel Persistence", desc: "Insta, WhatsApp ve Telegram arasında sarsılmaz bir hafıza ile lead takibi yapar." }
                ].map((s, i) => (
                  <div key={i} className="group">
                    <h4 className="font-black text-3xl mb-4 group-hover:text-indigo-500 transition-colors uppercase tracking-tight">{s.title}</h4>
                    <p className="text-neutral-500 text-lg">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-neutral-900 rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex items-center justify-center p-8">
                {/* Visual Mockup Simulation */}
                <div className="w-full space-y-8">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Aura Vision Active</p>
                    <div className="h-40 bg-neutral-800 rounded-xl mb-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 h-1 bg-indigo-500/20 rounded-full overflow-hidden">
                        <div className="w-[70%] h-full bg-indigo-500" />
                      </div>
                    </div>
                    <p className="text-white font-bold italic">"Analiz tamamlandı: Norwood Scale 4. Tahmini 4200 greft ihtiyacı tespit edildi."</p>
                  </div>
                  <div className="p-6 bg-emerald-500/20 rounded-2xl text-emerald-400 text-center font-black uppercase text-xs tracking-[0.2em] animate-pulse">
                    Aura Neural Pay: €500 Deposit Received
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE COMMAND CENTER REVEAL */}
      <section className="py-40 bg-white text-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-32">
            <span className="text-neutral-300 text-xs font-black uppercase tracking-[0.5em] mb-8 block">Global Command Center</span>
            <h2 className="text-7xl md:text-8xl font-black tracking-tighter mb-12">Total Command.</h2>
            <p className="text-neutral-400 text-xl font-medium max-w-2xl mx-auto">
              Hastaneler için geliştirilen yeni nesil Dashboard ile gelir akışını, lead kalitesini ve AI performansını
              dünyanın her yerinden, saniyeler içinde izleyin.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-[4rem] border border-neutral-100 shadow-2xl relative group">
            <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-video rounded-[3.5rem] overflow-hidden bg-neutral-900 flex items-center justify-center border border-black/5">
              {/* PLACEHOLDER FOR DASHBOARD MOCKUP */}
              <div className="text-center space-y-4">
                <LayoutDashboard size={64} className="text-indigo-600 mx-auto animate-pulse" />
                <p className="font-black text-[10px] uppercase tracking-[0.5em] text-neutral-500">Live Dashboard Preview: getauraos.com/admin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ROI TABLE */}
      <section className="py-40 bg-neutral-50 text-black border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-white rounded-[4rem] p-16 md:p-24 shadow-2xl text-center">
            <h3 className="text-5xl font-black tracking-tighter mb-8 leading-tight">Geleceği Bugün Kurun.</h3>
            <p className="text-neutral-400 text-lg mb-16">Aura OS bir masraf değil, kendisini 24 saatte amorti eden bir yatırımdır.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-left">
              <div>
                <p className="text-3xl font-black text-black mb-1">+40%</p>
                <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest whitespace-nowrap">Conversion Boost</p>
              </div>
              <div>
                <p className="text-3xl font-black text-black mb-1">24/7</p>
                <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest whitespace-nowrap">Active Sales</p>
              </div>
              <div>
                <p className="text-3xl font-black text-black mb-1">Zero</p>
                <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest whitespace-nowrap">Human Latency</p>
              </div>
              <div>
                <p className="text-3xl font-black text-black mb-1">Global</p>
                <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest whitespace-nowrap">Multi-Cloud</p>
              </div>
            </div>
            <Link href="/dashboard" className="w-full inline-block py-8 bg-black text-white text-center rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition-all">
              Cironu Artırmaya Başla
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-neutral-100 text-center">
        <div className="flex justify-center gap-10 mb-8 opacity-20 filter grayscale">
          <Stethoscope size={24} />
          <Bot size={24} />
          <ShieldCheck size={24} />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-300">Aura Intel v.2026 • Powered by Galactic Scaling • Based in Istanbul</p>
      </footer>
    </main>
  );
}



