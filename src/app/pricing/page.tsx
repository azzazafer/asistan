'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PACKAGES } from '@/lib/stripe';
import AuraLayout from "@/components/AuraLayout";
import { Check, Shield, Zap, Globe, Cpu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [signupData, setSignupData] = useState<any>(null);
    const [formData, setFormData] = useState({
        hospitalName: '',
        userEmail: '',
    });

    useEffect(() => {
        const pending = sessionStorage.getItem("aura_pending_registration");
        if (pending) {
            const data = JSON.parse(pending);
            setSignupData(data);
            setFormData({
                hospitalName: data.hospitalName,
                userEmail: data.email
            });
        }
    }, []);

    const handleCheckout = async (packageType: string) => {
        if (!formData.hospitalName || !formData.userEmail) {
            alert('Lütfen hastane adı ve email girin');
            return;
        }

        setLoading(packageType);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packageType,
                    hospitalName: formData.hospitalName,
                    email: formData.userEmail,
                    fullName: signupData?.fullName || '',
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error: any) {
            alert(error.message || 'Bir hata oluştu');
            setLoading(null);
        }
    };

    const handleContactSales = () => {
        window.location.href = 'mailto:sales@auraos.com?subject=Enterprise Package Inquiry';
    };

    return (
        <AuraLayout>
            <section className="pt-40 pb-40 px-6 relative overflow-hidden">
                {/* Visual Backdrop */}
                <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
                    <img src="/images/hero_elite.png" alt="" className="w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 bg-[#050505]/80" />
                </div>

                <div className="max-w-[1400px] mx-auto space-y-24 relative z-10">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            ADAPTIVE LICENSING • v13.0
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-bold uppercase italic tracking-tighter text-white font-space leading-[0.85]">
                            Kazanmaya <br />
                            <span className="text-[#00F0FF]">Yatırım Yapın.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed">
                            Aura OS bir maliyet değil, operasyonunuzun otonom kar motorudur. %15+ dönüşüm garantili altyapıya bugün geçin.
                        </p>
                    </div>

                    {/* Registration Context */}
                    {!signupData ? (
                        <div className="max-w-2xl mx-auto bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] backdrop-blur-3xl space-y-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white uppercase italic font-space">Hızlı Başlangıç Verileri</h3>
                                <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">Lisans tanımlaması için lütfen klinik bilgilerinizi doğrulayın.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Hastane / Klinik Adı"
                                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-[#00F0FF] outline-none transition-colors"
                                    value={formData.hospitalName}
                                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Operasyonel Email"
                                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-[#00F0FF] outline-none transition-colors"
                                    value={formData.userEmail}
                                    onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto bg-[#00F0FF]/5 border border-[#00F0FF]/20 p-8 rounded-[2rem] text-center shadow-[0_0_50px_rgba(0,240,255,0.05)]">
                            <div className="text-[10px] font-black text-[#00F0FF] uppercase tracking-widest mb-2">Hazır Lisans Sahibi</div>
                            <h3 className="text-2xl font-bold text-white italic font-space tracking-tight">{signupData.hospitalName}</h3>
                            <p className="text-sm text-slate-500 mt-1">{signupData.email}</p>
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem("aura_pending_registration");
                                    setSignupData(null);
                                }}
                                className="mt-6 text-[9px] font-black text-slate-600 hover:text-white uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-white pb-1"
                            >
                                Başka Bir Lisans Kullan
                            </button>
                        </div>
                    )}

                    {/* Pricing Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-10">
                        <PriceCard
                            type="starter"
                            title="Starter"
                            price={PACKAGES.starter.price}
                            features={PACKAGES.starter.features}
                            loading={loading === 'starter'}
                            onClick={() => handleCheckout('starter')}
                        />
                        <PriceCard
                            type="professional"
                            title="Professional"
                            price={PACKAGES.professional.price}
                            features={PACKAGES.professional.features}
                            loading={loading === 'professional'}
                            onClick={() => handleCheckout('professional')}
                            recommended
                        />
                        <PriceCard
                            type="enterprise"
                            title="Enterprise"
                            price="Custom"
                            features={PACKAGES.enterprise.features}
                            onClick={handleContactSales}
                        />
                    </div>
                </div>
            </section>
        </AuraLayout>
    );
}

function PriceCard({ type, title, price, features, loading, onClick, recommended }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-12 rounded-[3.5rem] border ${recommended ? 'border-[#00F0FF]/30 bg-[#00F0FF]/5 shadow-[0_0_60px_rgba(0,240,255,0.05)]' : 'border-white/5 bg-white/[0.01]'} space-y-10 relative overflow-hidden group`}
        >
            {recommended && (
                <div className="absolute top-8 right-8 bg-[#00F0FF] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-xl">
                    POPÜLER ALPHA
                </div>
            )}

            <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white uppercase italic font-space tracking-tight">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-space tracking-tighter">
                        {typeof price === 'number' ? `$${price}` : price}
                    </span>
                    {typeof price === 'number' && <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">/AY</span>}
                </div>
            </div>

            <div className="space-y-4 pt-4">
                {features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${recommended ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'bg-white/5 text-slate-500'}`}>
                            <Check size={12} />
                        </div>
                        <span className="text-sm font-medium text-slate-400 group-hover/item:text-white transition-colors">{f}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={onClick}
                disabled={loading}
                className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${recommended
                        ? 'bg-[#00F0FF] text-black hover:bg-white'
                        : 'bg-white/5 text-white border border-white/10 hover:border-white'
                    }`}
            >
                {loading ? 'Processing...' : (type === 'enterprise' ? 'İletişime Geç' : 'ALPHA LİSANS AL')}
                <ArrowRight size={14} />
            </button>
        </motion.div>
    );
}
