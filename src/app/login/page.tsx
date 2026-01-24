"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Activity, Sparkles, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    ));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Auto-redirect if already logged in
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Force hard navigation to ensure middleware sees the cookie
                window.location.href = "/dashboard";
            }
        };
        checkSession();
    }, [supabase]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (error) throw error;

            if (data.session) {
                toast.success("Identity Verified. Access Granted.");
                localStorage.setItem("aura_session", "active");
                localStorage.setItem("aura_tenant_id", data.session.user.user_metadata?.tenant_id || "default_clinic");

                // Force hard reload to send cookies to server
                window.location.href = "/dashboard";
            }
        } catch (error: any) {
            toast.error("Access Denied: " + error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8 selection:bg-black selection:text-white">
            {/* Background Spatial Effects */}
            <div className="fixed inset-0 -z-10 bg-[#fafafa]">
                <div className="absolute inset-0 opacity-20 filter blur-[150px]">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 via-transparent to-purple-100" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <div className="glass-canvas p-12 rounded-[3.5rem] border-white/60 shadow-2xl relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                    <div className="mb-12 flex flex-col items-center">
                        <div className="w-16 h-16 bg-black text-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-black uppercase">Aura OS</h2>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.5em] mt-2">Security Clearance Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group text-left">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 mb-2 block">System Identifier</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@auraos.com"
                                    className="w-full pl-14 pr-8 py-5 bg-black/5 rounded-[1.5rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold placeholder:text-neutral-200 outline-none"
                                />
                            </div>
                        </div>

                        <div className="relative group text-left">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 mb-2 block">Neural Key</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-8 py-5 bg-black/5 rounded-[1.5rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold placeholder:text-neutral-200 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full bg-black text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 relative group overflow-hidden mt-8"
                        >
                            <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Engage System'}</span>
                            {!isLoading && <ArrowRight size={16} className="relative z-10" />}
                            <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>

                    <div className="mt-16 flex items-center justify-center gap-8 text-neutral-300">
                        <div className="flex items-center gap-2">
                            <Activity size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Biometric Ready</span>
                        </div>
                        <div className="w-1 h-1 bg-neutral-200 rounded-full" />
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} />
                            <span className="text-[8px] font-black uppercase tracking-widest">Spatial Sync</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
