"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Hospital, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        hospitalName: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Şifreler uyuşmuyor.");
            return;
        }

        setIsLoading(true);

        try {
            // Save temporary registration data to session storage
            // This will be picked up after payment to complete provisioning
            sessionStorage.setItem("aura_pending_registration", JSON.stringify({
                hospitalName: formData.hospitalName,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            }));

            toast.success("Bilgiler kaydedildi. Şimdi paket seçimine yönlendiriliyorsunuz.");

            // Use window.location for hard redirect to ensure session storage is persisted and page loads fresh
            setTimeout(() => {
                window.location.href = "/pricing";
            }, 800);
        } catch (error: any) {
            toast.error("Bir hata oluştu: " + error.message);
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
                className="w-full max-w-xl"
            >
                <div className="glass-canvas p-10 md:p-12 rounded-[3.5rem] border-white/60 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                    <div className="mb-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl">
                            <Hospital size={32} />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-black uppercase">Aura OS</h2>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.5em] mt-2">Hospital Registration Stream</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Hospital Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 block">Hospital Name</label>
                                <div className="relative">
                                    <Hospital size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Global Health Clinic"
                                        className="w-full pl-14 pr-8 py-4 bg-black/5 rounded-[1.2rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold outline-none"
                                        value={formData.hospitalName}
                                        onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 block">Admin Name</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-14 pr-8 py-4 bg-black/5 rounded-[1.2rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold outline-none"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 block">System Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                <input
                                    required
                                    type="email"
                                    placeholder="admin@hospitallink.com"
                                    className="w-full pl-14 pr-8 py-4 bg-black/5 rounded-[1.2rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 block">Aura Key</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-8 py-4 bg-black/5 rounded-[1.2rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold outline-none"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-4 block">Confirm Key</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300" />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-14 pr-8 py-4 bg-black/5 rounded-[1.2rem] border border-transparent focus:border-black focus:bg-white transition-all font-bold outline-none"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full bg-black text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 relative group overflow-hidden mt-8"
                        >
                            <span className="relative z-10">{isLoading ? 'Initializing...' : 'Confirm Registration & Select Plan'}</span>
                            {!isLoading && <ArrowRight size={16} className="relative z-10" />}
                        </button>

                        <p className="text-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            Already have an account? <Link href="/login" className="text-black hover:underline">Log in</Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
