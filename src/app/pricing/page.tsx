'use client';

import { useState } from 'react';
import AuraLayout from "@/components/AuraLayout";
import { Check, X, Calculator, ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// MOCK PACKAGES
const PACKAGES = {
    starter: {
        name: 'Starter',
        price: '4900',
        currency: '₺',
        commission: '10',
        features: ['Hasta Takip', 'Temel Raporlama', 'WhatsApp Desteği']
    },
    professional: {
        name: 'Professional',
        price: '18000',
        currency: '₺',
        commission: '12',
        features: ['<b>Tüm Starter Özellikleri</b>', 'Yapay Zeka Asistanı', 'Gelişmiş Raporlama', 'Öncelikli Destek']
    },
    enterprise: {
        name: 'Enterprise',
        commission: 'Özel',
        features: ['<b>Tüm Professional Özellikleri</b>', 'Özel Entegrasyon', 'Sınırsız Kullanıcı', '7/24 Destek', 'Özel SLA']
    }
};

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    // ROI Calculator State
    const [missedCalls, setMissedCalls] = useState(30);
    const [avgTreatmentValue, setAvgTreatmentValue] = useState(5000);
    // MOCK PAYMENT DATA
    const handleCheckout = async (packageType: string) => {
        setLoading(packageType);

        try {
            // MOCK PAYMENT DATA
            const paymentPayload = {
                packageType: packageType,
                tenantId: 'TEST-TENANT-001', // Should come from logged in user/onboarding
                amount: packageType === 'starter' ? 4900 : 18000,
                paidPrice: packageType === 'starter' ? 4900 : 18000,
                buyerName: 'Ahmet',
                buyerSurname: 'Yılmaz',
                buyerEmail: 'test@clinic.com',
                buyerGsm: '+905555555555',
                buyerAddress: 'Test Adresi Istanbul',
                buyerIp: '127.0.0.1',
                cardHolderName: 'Ahmet Yilmaz',
                cardNumber: '4111111111111111', // Test Card
                expireMonth: '12',
                expireYear: '2030',
                cvc: '123'
            };

            const response = await fetch('/api/payments/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentPayload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ödeme Hatası');
            }

            // SUCCESS
            if (data.success) {
                alert('Ödeme Başarılı! (Iyzico Test)\n\nDetay: ' + JSON.stringify(data.data?.status || 'Success'));
                // Redirect to dashboard or success page
                window.location.href = '/dashboard';
            } else {
                alert('Ödeme Başarısız: ' + JSON.stringify(data));
            }

        } catch (error: any) {
            alert(error.message || 'Bir hata oluştu');
        } finally {
            setLoading(null);
        }
    };

    const handleContactSales = () => {
        window.location.href = 'mailto:sales@auraos.com?subject=Enterprise Package Inquiry';
    };

    // ROI Calculation
    const recoveryRate = 0.60; // %60 Aura Kurtarma Oranı
    const monthlyGain = Math.floor(missedCalls * recoveryRate * avgTreatmentValue);
    const proCost = 18000; // 499 Euro ≈ 18,000 TL
    const roi = Math.floor(((monthlyGain - proCost) / proCost) * 100);

    return (
        <AuraLayout>
            {/* Visual Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-20 select-none">
                <div className="absolute inset-0 bg-[#030303]/90" />
            </div>

            <section className="pt-40 pb-16 px-6 relative z-10">
                <div className="max-w-[1400px] mx-auto space-y-24">

                    {/* Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#00F0FF]">
                            ADAPTIVE LICENSING • v13.0
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-tight">
                            Maliyet Değil,<br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Yatırım.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Aura OS bir gider kalemi değildir. İlk günden itibaren kendi parasını çıkaran ve kâr getiren bir ciro motorudur.
                        </p>
                    </div>

                    {/* ROI Calculator */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8">
                                    <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        <Calculator className="text-cyan-400" size={32} />
                                        Ne Kadar Kaybediyorsunuz?
                                    </h3>

                                    {/* Slider 1 */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Aylık Kaçırılan Çağrı/Hasta</span>
                                            <span className="text-white font-mono font-bold text-lg">{missedCalls}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="5"
                                            max="200"
                                            value={missedCalls}
                                            onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                        />
                                    </div>

                                    {/* Slider 2 */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Ortalama Tedavi Değeri (TL)</span>
                                            <span className="text-white font-mono font-bold text-lg">₺{avgTreatmentValue.toLocaleString('tr-TR')}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="50000"
                                            step="500"
                                            value={avgTreatmentValue}
                                            onChange={(e) => setAvgTreatmentValue(parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                        />
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 text-center relative">
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">Aura OS ile Potansiyel Kazanç</div>
                                    <div className="text-5xl md:text-6xl font-extrabold text-green-400 font-mono mb-3">
                                        ₺{monthlyGain.toLocaleString('tr-TR')}
                                    </div>
                                    <div className="text-sm text-gray-400 mb-6">Her Ay Ekstra Ciro</div>

                                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                        <div className="text-left">
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">YATIRIM GERİ DÖNÜŞÜ</div>
                                            <div className="text-3xl font-bold text-cyan-400">%{roi > 0 ? roi : 0}</div>
                                        </div>
                                        <button
                                            onClick={() => handleCheckout('professional')}
                                            className="bg-white text-black px-6 py-3 rounded-lg text-sm font-bold hover:scale-105 transition-transform"
                                        >
                                            Hemen Başla
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <PricingCard
                            type="starter"
                            title={PACKAGES.starter.name}
                            price={PACKAGES.starter.price}
                            currency={PACKAGES.starter.currency}
                            commission={PACKAGES.starter.commission}
                            features={PACKAGES.starter.features}
                            loading={loading === 'starter'}
                            onClick={() => handleCheckout('starter')}
                        />

                        <PricingCard
                            type="professional"
                            title={PACKAGES.professional.name}
                            price={PACKAGES.professional.price}
                            currency={PACKAGES.professional.currency}
                            commission={PACKAGES.professional.commission}
                            features={PACKAGES.professional.features}
                            loading={loading === 'professional'}
                            onClick={() => handleCheckout('professional')}
                            recommended
                        />

                        <PricingCard
                            type="enterprise"
                            title={PACKAGES.enterprise.name}
                            price="Özel"
                            currency=""
                            commission={PACKAGES.enterprise.commission}
                            features={PACKAGES.enterprise.features}
                            onClick={handleContactSales}
                        />
                    </div>

                    {/* Comparison Table */}
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-tight">Detaylı Karşılaştırma</h2>
                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/5">
                                            <th className="p-4 text-xs uppercase tracking-wider text-gray-400">Özellik</th>
                                            <th className="p-4 text-center text-xs uppercase tracking-wider text-gray-400 w-1/5">Başlangıç</th>
                                            <th className="p-4 text-center text-xs uppercase tracking-wider text-cyan-400 font-bold bg-cyan-900/10 w-1/5">Pro</th>
                                            <th className="p-4 text-center text-xs uppercase tracking-wider text-gray-400 w-1/5">Enterprise</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-300 divide-y divide-white/5">
                                        <ComparisonRow feature="7/24 AI Chat" starter={true} pro={true} enterprise={true} />
                                        <ComparisonRow feature="Nex-Scan™ Röntgen" starter="50/Ay" pro="LİMİTSİZ" enterprise="LİMİTSİZ" />
                                        <ComparisonRow feature="Ciro Kurtarma Motoru" starter={false} pro={true} enterprise={true} />
                                        <ComparisonRow feature="V4 Satış Psikolojisi" starter={false} pro={true} enterprise={true} />
                                        <ComparisonRow feature="WhatsApp Business API" starter={true} pro={true} enterprise={true} />
                                        <ComparisonRow feature="Özel Entegrasyon" starter={false} pro={false} enterprise={true} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-tight">Sıkça Sorulan Sorular</h2>
                        <div className="space-y-4">
                            <FAQItem
                                question="Komisyon ne zaman kesilir?"
                                answer="Komisyon, SADECE Aura OS üzerinden randevu alıp kliniğe gelip ödeme yapan (veya kapora yatıran) hastalardan kesilir. Eğer Aura satış yapamazsa, komisyon ödemezsiniz. Biz kazandırmazsak, kazanmayız."
                            />
                            <FAQItem
                                question="Kurulum ücreti var mı?"
                                answer="Hayır. Alpha sürümü boyunca (şu an) kurulum ücretini almıyoruz. Sadece aylık lisans bedeli ile başlarsınız."
                            />
                            <FAQItem
                                question="İstediğim zaman iptal edebilir miyim?"
                                answer="Evet. Taahhüt yok. Memnun kalmazsanız bir sonraki ay yenilemeyi durdurabilirsiniz."
                            />
                            <FAQItem
                                question="V4 Satış Psikolojisi nedir?"
                                answer="Hastanın duygusal durumunu analiz eden (Sentiment Guard) ve fiyat itirazlarında yönetici onayı simülasyonu yapan (Manager Approval) gelişmiş AI satış sistemidir. Sadece Professional ve Enterprise paketlerinde bulunur."
                            />
                            <FAQItem
                                question="Otonom Ciro Kurtarma™ nasıl çalışır?"
                                answer="Geçmişte 'pahalı' deyip gitmiş hastaları AI otomatik olarak analiz eder, yeniden ikna eder ve kliniğe geri döndürür. Professional ve Enterprise paketlerinde mevcuttur."
                            />
                        </div>
                    </div>

                </div>
            </section>
        </AuraLayout>
    );
}

// Pricing Card Component
function PricingCard({
    type,
    title,
    price,
    currency,
    commission,
    features,
    loading,
    onClick,
    recommended
}: any) {
    const isPro = recommended;
    const isEnterprise = type === 'enterprise';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`
                p-8 md:p-10 rounded-3xl border relative overflow-hidden group
                ${isPro ? 'border-cyan-500/50 bg-[#0a0a0a] shadow-[0_0_30px_rgba(34,211,238,0.15)] md:-translate-y-4' : 'border-white/10 bg-white/[0.02] opacity-80 hover:opacity-100'}
                space-y-8 transition-all
            `}
        >
            {isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    EN POPÜLER
                </div>
            )}

            <div className="space-y-4">
                <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight ${isPro ? 'text-white' : 'text-gray-300'}`}>
                    {title}
                </h3>
                <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl md:text-5xl font-black tracking-tighter ${isPro ? 'text-white' : 'text-white'}`}>
                            {typeof price === 'number' ? `${currency}${price}` : price}
                        </span>
                        {typeof price === 'number' && <span className="text-gray-500 text-sm font-bold uppercase">/ay</span>}
                    </div>
                    {/* Commission Badge */}
                    <div className={`text-xs font-mono inline-block px-3 py-1.5 rounded-lg border ${isPro
                        ? 'bg-green-900/20 border-green-500/20 text-green-400'
                        : isEnterprise
                            ? 'bg-purple-900/20 border-purple-500/20 text-purple-400'
                            : 'bg-cyan-900/20 border-cyan-500/20 text-cyan-400'
                        }`}>
                        + %{commission} Başarı Komisyonu
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed min-h-[3rem]">
                {isEnterprise
                    ? 'Hastane grupları ve zincir klinikler için özel altyapı.'
                    : isPro
                        ? 'Büyüyen klinikler için tam teşekküllü satış makinesi.'
                        : 'Küçük klinikler ve tek hekimler için temel otomasyon.'
                }
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isPro ? 'text-green-400' : 'text-cyan-400'
                            }`}>
                            {isPro ? <Check size={16} className="font-bold" /> : <Check size={14} />}
                        </div>
                        <span
                            className="group-hover/item:text-white transition-colors"
                            dangerouslySetInnerHTML={{ __html: f }}
                        />
                    </li>
                ))}
            </ul>

            <button
                onClick={onClick}
                disabled={loading}
                className={`
                    w-full py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider
                    transition-all flex items-center justify-center gap-3
                    ${isPro
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/50'
                        : 'bg-white/5 text-white border border-white/20 hover:border-white hover:bg-white/10'
                    }
                `}
            >
                {loading ? 'İŞLENİYOR...' : (isEnterprise ? 'İLETİŞİME GEÇ' : 'ALPHA LİSANS AL')}
                <ArrowRight size={16} />
            </button>
        </motion.div>
    );
}

// Comparison Row Component
function ComparisonRow({ feature, starter, pro, enterprise }: any) {
    const renderCell = (value: any, isPro = false) => {
        if (typeof value === 'boolean') {
            return value ? (
                <Check size={20} className="text-green-400 mx-auto" />
            ) : (
                <X size={20} className="text-red-400/30 mx-auto" />
            );
        }
        if (typeof value === 'string') {
            return <span className={`font-bold ${isPro ? 'text-white' : 'text-gray-400'}`}>{value}</span>;
        }
        return value;
    };

    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="p-4 font-medium">{feature}</td>
            <td className="p-4 text-center">{renderCell(starter)}</td>
            <td className="p-4 text-center bg-cyan-900/5">{renderCell(pro, true)}</td>
            <td className="p-4 text-center">{renderCell(enterprise)}</td>
        </tr>
    );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/[0.02] transition-colors"
            >
                <span className="font-bold text-white">{question}</span>
                <ChevronDown
                    size={20}
                    className={`text-cyan-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {answer}
                </div>
            )}
        </div>
    );
}
