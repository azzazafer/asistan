"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Stethoscope, ArrowRight, Check, Star, Zap, Shield,
    Globe, Calendar, MessageSquare, Phone, Mail,
    ChevronDown, Sparkles, Users, TrendingUp, Clock
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LandingPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [demoForm, setDemoForm] = useState({ name: '', email: '', clinic: '', phone: '' });
    const [showDemo, setShowDemo] = useState(false);
    const [language, setLanguage] = useState<'tr' | 'en'>('tr');

    const t = {
        tr: {
            hero: "Sağlık Turizminde AI Devrimi",
            heroSub: "Kliniklerin gece gündüz satış yapmasını sağlayan, her kültüre uyum sağlayan yapay zeka asistan.",
            cta: "Ücretsiz Demo Al",
            pricing: "Fiyatlandırma",
            features: "Özellikler",
            contact: "İletişim",
            starter: "Başlangıç",
            pro: "Profesyonel",
            enterprise: "Kurumsal",
            month: "/ay",
            popular: "En Popüler",
            starterDesc: "Küçük klinikler için ideal başlangıç",
            proDesc: "Orta ölçekli klinikler için tam çözüm",
            enterpriseDesc: "Zincir klinikler için özel çözümler",
            requestDemo: "Demo Talep Et",
            name: "Ad Soyad",
            email: "E-posta",
            clinic: "Klinik Adı",
            phone: "Telefon",
            send: "Gönder",
            features1: "7/24 AI Asistan",
            features2: "Kültürel Zeka (4 Bölge)",
            features3: "WhatsApp Entegrasyonu",
            features4: "Görsel Analiz (Saç/Diş)",
            features5: "Randevu Otomasyonu",
            features6: "Çoklu Dil Desteği",
            roiTitle: "ROI Hesaplayıcı",
            roiDesc: "Ayda 5 ekstra hasta kazanın = 12.500$ ek ciro",
            trustedBy: "Güvenilen Markalar",
            testimonial: "AuraOS sayesinde gece saatlerinde gelen hastaları kaybetmiyoruz artık.",
            testimonialAuthor: "Dr. Ahmet Y., İstanbul",
            whyTitle: "Neden AuraOS?",
            why1: "Rakiplerden Farkı",
            why1Desc: "Çeviri değil, kültürel adaptasyon. Alman'la Alman, Arap'la Arap gibi konuşur.",
            why2: "Hiç Uyumaz",
            why2Desc: "Gece 3'te gelen hastaya 15 saniyede yanıt. Satış ekibiniz uyurken bile.",
            why3: "Para Basma Makinesi",
            why3Desc: "Ayda 1 ekstra hasta = Yazılım maliyetinin 8 katı geri dönüş.",
            footerCta: "Hemen Başlayın",
            success: "Demo talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.",
            culturalMatrix: "Kültürel Zeka Matrisi"
        },
        en: {
            hero: "AI Revolution in Health Tourism",
            heroSub: "AI assistant that enables clinics to sell 24/7, adapting to every culture.",
            cta: "Get Free Demo",
            pricing: "Pricing",
            features: "Features",
            contact: "Contact",
            starter: "Starter",
            pro: "Professional",
            enterprise: "Enterprise",
            month: "/mo",
            popular: "Most Popular",
            starterDesc: "Ideal start for small clinics",
            proDesc: "Complete solution for mid-size clinics",
            enterpriseDesc: "Custom solutions for clinic chains",
            requestDemo: "Request Demo",
            name: "Full Name",
            email: "Email",
            clinic: "Clinic Name",
            phone: "Phone",
            send: "Submit",
            features1: "24/7 AI Assistant",
            features2: "Cultural Intelligence (4 Regions)",
            features3: "WhatsApp Integration",
            features4: "Visual Analysis (Hair/Dental)",
            features5: "Appointment Automation",
            features6: "Multi-language Support",
            roiTitle: "ROI Calculator",
            roiDesc: "Gain 5 extra patients/month = $12,500 extra revenue",
            trustedBy: "Trusted By",
            testimonial: "With AuraOS, we no longer lose patients who contact us at night.",
            testimonialAuthor: "Dr. Ahmed Y., Istanbul",
            whyTitle: "Why AuraOS?",
            why1: "Different from Competitors",
            why1Desc: "Not translation, cultural adaptation. Speaks German to Germans, Arab to Arabs.",
            why2: "Never Sleeps",
            why2Desc: "Responds to 3 AM patients in 15 seconds. Even while your sales team sleeps.",
            why3: "Money Printing Machine",
            why3Desc: "1 extra patient/month = 8x ROI on software cost.",
            footerCta: "Start Now",
            success: "Demo request received! We'll contact you shortly.",
            culturalMatrix: "Cultural Intelligence Matrix"
        }
    };

    const content = t[language];

    const plans = [
        {
            id: 'starter',
            name: content.starter,
            price: '$299',
            desc: content.starterDesc,
            features: ['1,000 mesaj/ay', '2 dil', 'Temel chat', 'E-posta desteği'],
            popular: false
        },
        {
            id: 'pro',
            name: content.pro,
            price: '$599',
            desc: content.proDesc,
            features: ['5,000 mesaj/ay', '4 bölge Cultural Matrix', 'WhatsApp entegrasyonu', 'Görsel analiz', 'Öncelikli destek'],
            popular: true
        },
        {
            id: 'enterprise',
            name: content.enterprise,
            price: 'Özel',
            desc: content.enterpriseDesc,
            features: ['Sınırsız mesaj', 'API erişimi', 'White-label', 'Özel SLA', 'Dedike hesap yöneticisi'],
            popular: false
        }
    ];

    const handleDemoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        toast.success(content.success);
        setShowDemo(false);
        setDemoForm({ name: '', email: '', clinic: '', phone: '' });
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                            <Stethoscope size={20} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">AuraOS</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-bold text-neutral-500 hover:text-black transition">{content.features}</a>
                        <a href="#pricing" className="text-sm font-bold text-neutral-500 hover:text-black transition">{content.pricing}</a>
                        <a href="#contact" className="text-sm font-bold text-neutral-500 hover:text-black transition">{content.contact}</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                            className="px-3 py-2 rounded-lg border border-neutral-200 text-sm font-bold hover:bg-neutral-50 transition"
                        >
                            {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
                        </button>
                        <button
                            onClick={() => setShowDemo(true)}
                            className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition shadow-lg"
                        >
                            {content.cta}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
                            <Sparkles size={16} /> 2026 {content.culturalMatrix}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]"
                    >
                        {content.hero}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-500 max-w-2xl mx-auto mb-10"
                    >
                        {content.heroSub}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => setShowDemo(true)}
                            className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition shadow-xl flex items-center justify-center gap-2"
                        >
                            {content.cta} <ArrowRight size={20} />
                        </button>
                        <Link
                            href="/chat"
                            className="border-2 border-neutral-200 px-8 py-4 rounded-full text-lg font-bold hover:border-black transition flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={20} /> Live Demo
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-black text-white py-12 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-black mb-2">$48B+</div>
                        <div className="text-neutral-400 text-sm font-bold">Global Market</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">15s</div>
                        <div className="text-neutral-400 text-sm font-bold">Response Time</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">4</div>
                        <div className="text-neutral-400 text-sm font-bold">Culture Regions</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">10+</div>
                        <div className="text-neutral-400 text-sm font-bold">Languages</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-16">{content.whyTitle}</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border border-purple-100"
                        >
                            <div className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-6">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">{content.why1}</h3>
                            <p className="text-neutral-500">{content.why1Desc}</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100"
                        >
                            <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">{content.why2}</h3>
                            <p className="text-neutral-500">{content.why2Desc}</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border border-green-100"
                        >
                            <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-6">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">{content.why3}</h3>
                            <p className="text-neutral-500">{content.why3Desc}</p>
                        </motion.div>
                    </div>

                    {/* Feature List */}
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <MessageSquare size={20} />, text: content.features1 },
                            { icon: <Globe size={20} />, text: content.features2 },
                            { icon: <Phone size={20} />, text: content.features3 },
                            { icon: <Sparkles size={20} />, text: content.features4 },
                            { icon: <Calendar size={20} />, text: content.features5 },
                            { icon: <Users size={20} />, text: content.features6 },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl">
                                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                                    {f.icon}
                                </div>
                                <span className="font-bold">{f.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-neutral-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-center mb-4">{content.pricing}</h2>
                    <p className="text-center text-neutral-500 mb-16 max-w-xl mx-auto">{content.roiDesc}</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                whileHover={{ y: -10 }}
                                className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${plan.popular
                                        ? 'border-black shadow-2xl scale-105'
                                        : 'border-neutral-100 hover:border-neutral-300'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                                        {content.popular}
                                    </div>
                                )}

                                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                <p className="text-neutral-500 text-sm mb-6">{plan.desc}</p>

                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-black">{plan.price}</span>
                                    {plan.price !== 'Özel' && <span className="text-neutral-400">{content.month}</span>}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check size={18} className="text-green-500" />
                                            <span className="text-sm">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => setShowDemo(true)}
                                    className={`w-full py-4 rounded-2xl font-bold transition ${plan.popular
                                            ? 'bg-black text-white hover:bg-neutral-800'
                                            : 'bg-neutral-100 hover:bg-neutral-200'
                                        }`}
                                >
                                    {content.requestDemo}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-bold mb-6 italic">
                        "{content.testimonial}"
                    </blockquote>
                    <cite className="text-neutral-500 font-bold not-italic">{content.testimonialAuthor}</cite>
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="py-20 px-6 bg-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black mb-6">{content.footerCta}</h2>
                    <p className="text-neutral-400 mb-10 text-lg">{content.roiDesc}</p>
                    <button
                        onClick={() => setShowDemo(true)}
                        className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition shadow-xl"
                    >
                        {content.cta}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
                            <Stethoscope size={16} />
                        </div>
                        <span className="font-black">AuraOS by Nextoria Digital</span>
                    </div>
                    <div className="flex gap-6 text-sm text-neutral-500">
                        <Link href="/privacy" className="hover:text-black transition">Privacy</Link>
                        <a href="mailto:info@nextoriadigital.com" className="hover:text-black transition flex items-center gap-2">
                            <Mail size={14} /> info@nextoriadigital.com
                        </a>
                    </div>
                    <div className="text-sm text-neutral-400">© 2026 Nextoria Digital</div>
                </div>
            </footer>

            {/* Demo Modal */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowDemo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-black mb-6">{content.requestDemo}</h3>

                            <form onSubmit={handleDemoSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder={content.name}
                                    value={demoForm.name}
                                    onChange={e => setDemoForm({ ...demoForm, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition"
                                />
                                <input
                                    type="email"
                                    placeholder={content.email}
                                    value={demoForm.email}
                                    onChange={e => setDemoForm({ ...demoForm, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition"
                                />
                                <input
                                    type="text"
                                    placeholder={content.clinic}
                                    value={demoForm.clinic}
                                    onChange={e => setDemoForm({ ...demoForm, clinic: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition"
                                />
                                <input
                                    type="tel"
                                    placeholder={content.phone}
                                    value={demoForm.phone}
                                    onChange={e => setDemoForm({ ...demoForm, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition"
                                >
                                    {content.send}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
