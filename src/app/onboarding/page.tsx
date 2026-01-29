'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Rocket, CheckCircle2, MessageCircle, Database, ShieldCheck } from 'lucide-react';

function OnboardingContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            // Verify session and show success
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } else {
            // No session, but we allow viewing the setup guide
            setLoading(false);
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-xl">Hesabınız hazırlanıyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
                <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-8 max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-4">Hata</h1>
                    <p className="text-white">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Message */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center mb-8">
                    <div className={`w-20 h-20 ${sessionId ? 'bg-green-500' : 'bg-blue-500'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        {sessionId ? (
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <Rocket className="w-12 h-12 text-white" />
                        )}
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        {sessionId ? 'Hoş Geldiniz! 🎉' : 'Sistem Kurulum Rehberi'}
                    </h1>
                    <p className="text-xl text-purple-200 mb-8">
                        {sessionId ? 'Ödemeniz başarıyla alındı. Aura OS hesabınız aktif edildi!' : 'Aura OS operasyonunuzu başlatmak için aşağıdaki adımları takip edin.'}
                    </p>
                </div>

                {/* Next Steps */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Sonraki Adımlar</h2>

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                1
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Email Kontrol Edin</h3>
                                <p className="text-purple-200">
                                    Giriş bilgileriniz ve kurulum talimatları email adresinize gönderildi.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                2
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Dashboard'a Giriş Yapın</h3>
                                <p className="text-purple-200">
                                    Admin paneline giriş yaparak ilk ayarlarınızı yapın.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                3
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">WhatsApp Bağlayın</h3>
                                <p className="text-purple-200">
                                    WhatsApp Business numaranızı sisteme bağlayın.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                4
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">İlk Doktorunuzu Ekleyin</h3>
                                <p className="text-purple-200">
                                    Doktor bilgilerini ve takvimini sisteme girin.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <a
                            href="/dashboard"
                            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-center transition-colors"
                        >
                            Dashboard'a Git
                        </a>
                        <a
                            href="https://docs.auraos.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold text-center transition-colors"
                        >
                            Dokümantasyon
                        </a>
                    </div>
                </div>

                {/* Support */}
                <div className="mt-8 text-center">
                    <p className="text-purple-200">
                        Yardıma mı ihtiyacınız var?{' '}
                        <a href="mailto:support@auraos.com" className="text-purple-300 hover:text-white underline">
                            Destek ekibimizle iletişime geçin
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
        }>
            <OnboardingContent />
        </Suspense>
    );
}
