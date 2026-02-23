'use client';

import { useState } from 'react';
import { ShieldCheck, Building2, User, CreditCard, ArrowRight, Wallet, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tenantId: `CLINIC-${Math.floor(Math.random() * 10000)}`, // Auto-gen for demo
        contactName: '',
        contactSurname: '',
        email: '',
        gsmNumber: '',
        address: '',
        iban: '',
        identityNumber: '',
        legalCompanyTitle: '',
        subMerchantType: 'PRIVATE_COMPANY'
    });

    const [result, setResult] = useState<any>(null);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/onboarding/submerchant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Onboarding Failed');

            setResult(data);
            setStep(3); // Success Screen
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-[#0A0A0A] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">

                {/* Visual Side */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-900/20 to-black relative">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                    <div>
                        <div className="flex items-center gap-3 text-indigo-400 mb-6">
                            <ShieldCheck size={32} />
                            <span className="font-bold tracking-widest text-xs uppercase">Aura Security</span>
                        </div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Klinik Kimlik <br />Doğrulaması
                        </h1>
                        <p className="text-gray-400">
                            Ödemelerinizi güvenle alabilmek için yasal alt üye (sub-merchant) kaydınızı tamamlayın.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-green-400"><CheckCircle size={16} /></div>
                            <span>BDDK Lisanslı Altyapı</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-green-400"><CheckCircle size={16} /></div>
                            <span>Otomatik Hakediş Dağıtımı</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-green-400"><CheckCircle size={16} /></div>
                            <span>KVKK Uyumluluğu</span>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-10">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold">Kişisel Bilgiler</h2>
                                <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">ADIM 1/2</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Ad</label>
                                    <input name="contactName" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="Ahmet" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Soyad</label>
                                    <input name="contactSurname" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="Yılmaz" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                <input name="email" type="email" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="dr@klinik.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Telefon (+90...)</label>
                                <input name="gsmNumber" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="+90555..." />
                            </div>

                            <button onClick={() => setStep(2)} className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                Devam Et <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-bold">Finansal Bilgiler</h2>
                                <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full">ADIM 2/2</span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Yasal Firma Adı</label>
                                <input name="legalCompanyTitle" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="Dr. Ahmet Yılmaz Muayenehanesi" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">TCKN (Şahıs)</label>
                                    <input name="identityNumber" maxLength={11} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="11 haneli" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Firma Tipi</label>
                                    <select name="subMerchantType" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all text-gray-400">
                                        <option value="PRIVATE_COMPANY">Şahıs Şirketi</option>
                                        <option value="LIMITED_COMPANY">Limited Şirket</option>
                                        <option value="INCORPORATED_COMPANY">Anonim Şirket</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">IBAN (TR...)</label>
                                <input name="iban" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all" placeholder="TR..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Adres</label>
                                <textarea name="address" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all h-20" placeholder="Tam şirket adresi..." />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-colors">
                                    Geri
                                </button>
                                <button type="submit" disabled={loading} className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
                                    {loading ? 'İşleniyor...' : 'Hesabı Onayla'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6 animate-in zoom-in duration-300 py-10">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/50">
                                <CheckCircle size={40} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-bold">Kayıt Başarılı!</h2>
                            <p className="text-gray-400 max-w-xs mx-auto">
                                Alt üye hesabınız (Sub-merchant) oluşturuldu ve Iyzico sistemine tanımlandı.
                            </p>

                            <div className="bg-white/5 p-4 rounded-xl text-left text-xs font-mono text-gray-300 overflow-hidden">
                                <div className="mb-2 text-gray-500 uppercase font-bold">SYSTEM RESPONSE</div>
                                <pre>{JSON.stringify(result, null, 2)}</pre>
                            </div>

                            <button onClick={() => window.location.href = '/pricing'} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                <Wallet size={18} />
                                Şimdi Lisans Satın Al
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
