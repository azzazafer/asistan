'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PACKAGES } from '@/lib/stripe';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [signupData, setSignupData] = useState<any>(null);
    const [formData, setFormData] = useState({
        hospitalName: '',
        email: '',
    });

    useEffect(() => {
        const pending = sessionStorage.getItem("aura_pending_registration");
        if (pending) {
            const data = JSON.parse(pending);
            setSignupData(data);
            setFormData({
                hospitalName: data.hospitalName,
                email: data.email
            });
        }
    }, []);

    const handleCheckout = async (packageType: string) => {
        if (!formData.hospitalName || !formData.email) {
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
                    email: formData.email,
                    fullName: signupData?.fullName || '',
                    // We don't send password to stripe, we handle it via session tokens or separate verification
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
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Aura OS Fiyatlandırma
                    </h1>
                    <p className="text-xl text-purple-200">
                        Sağlık turizmi işinizi büyütmek için doğru paketi seçin
                    </p>
                </div>

                {/* Contact Form or Signup Info */}
                {!signupData ? (
                    <div className="max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
                        <h3 className="text-white text-lg font-semibold mb-4">İletişim Bilgileri</h3>
                        <input
                            type="text"
                            placeholder="Hastane Adı"
                            className="w-full px-4 py-3 rounded-lg mb-3 bg-white/20 text-white placeholder-purple-200 border border-white/30"
                            value={formData.hospitalName}
                            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-200 border border-white/30"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                ) : (
                    <div className="max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                        <p className="text-purple-200 text-sm mb-1 uppercase tracking-widest font-bold">Kayıt Bilgileri</p>
                        <h3 className="text-white text-xl font-bold">{signupData.hospitalName}</h3>
                        <p className="text-purple-300">{signupData.email}</p>
                        <button
                            onClick={() => {
                                sessionStorage.removeItem("aura_pending_registration");
                                setSignupData(null);
                            }}
                            className="mt-4 text-[10px] text-white/40 hover:text-white uppercase tracking-widest"
                        >
                            Bilgileri Değiştir
                        </button>
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Starter */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-purple-400 transition-all">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                            <div className="text-5xl font-bold text-purple-300 mb-2">
                                ${PACKAGES.starter.price}
                            </div>
                            <p className="text-purple-200">/ay</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {PACKAGES.starter.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-white">
                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleCheckout('starter')}
                            disabled={loading !== null}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading === 'starter' ? 'Yükleniyor...' : 'Başla'}
                        </button>
                    </div>

                    {/* Professional */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 border-2 border-yellow-400 relative transform scale-105 shadow-2xl">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold">
                            ÖNERİLEN
                        </div>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                            <div className="text-5xl font-bold text-white mb-2">
                                ${PACKAGES.professional.price}
                            </div>
                            <p className="text-purple-100">/ay</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {PACKAGES.professional.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-white">
                                    <svg className="w-5 h-5 text-yellow-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleCheckout('professional')}
                            disabled={loading !== null}
                            className="w-full py-3 bg-white text-purple-600 hover:bg-purple-50 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading === 'professional' ? 'Yükleniyor...' : 'Başla'}
                        </button>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-indigo-400 transition-all">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                            <div className="text-5xl font-bold text-indigo-300 mb-2">
                                Custom
                            </div>
                            <p className="text-indigo-200">İletişime geçin</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {PACKAGES.enterprise.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-white">
                                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={handleContactSales}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
                        >
                            Satış Ekibiyle İletişime Geç
                        </button>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">
                        Sık Sorulan Sorular
                    </h2>
                    <div className="space-y-4">
                        <details className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <summary className="text-white font-semibold cursor-pointer">
                                14 günlük ücretsiz deneme var mı?
                            </summary>
                            <p className="text-purple-200 mt-3">
                                Evet! Tüm paketlerde 14 günlük ücretsiz deneme sunuyoruz. Kredi kartı gerekmez.
                            </p>
                        </details>

                        <details className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <summary className="text-white font-semibold cursor-pointer">
                                İstediğim zaman iptal edebilir miyim?
                            </summary>
                            <p className="text-purple-200 mt-3">
                                Evet, istediğiniz zaman iptal edebilirsiniz. Dönem sonuna kadar erişiminiz devam eder.
                            </p>
                        </details>

                        <details className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <summary className="text-white font-semibold cursor-pointer">
                                Paket yükseltme/düşürme yapabilir miyim?
                            </summary>
                            <p className="text-purple-200 mt-3">
                                Evet, istediğiniz zaman paket değişikliği yapabilirsiniz. Fark ücret orantılı olarak hesaplanır.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
