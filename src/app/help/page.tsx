'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Book, Shield, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
    const [lang, setLang] = useState<'tr' | 'en'>('tr');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = {
        tr: [
            {
                q: "Her hasta/klinik için ayrı şifre nasıl oluşturulur?",
                a: "Aura OS şu an 'Süper Yönetici' modunda çalışmaktadır. Her klinik için ayrı kullanıcı (doktor/sekreter) oluşturma özelliği 'SaaS Derinlik Paketi' ile eklenecektir. Şimdilik 'New Clinic' butonu sadece veri alanını (Tenant) açar. Kullanıcı daveti için yönetici ile iletişime geçiniz."
            },
            {
                q: "Sisteme giriş yapamıyorum, ne yapmalıyım?",
                a: "Eğer şifrenizi unuttuysanız ve 'Admin' iseniz, veritabanından sıfırlama talep edebilirsiniz. Eğer 'Gözcü Modu' (Login As) kullanıyorsanız şifreye gerek yoktur, sadece yetkinizin (RLS Policy) açık olduğundan emin olun."
            },
            {
                q: "Verilerim güvende mi?",
                a: "Evet. Aura OS verileri şifreleyerek saklar. 'Tenant Isolation' teknolojisi sayesinde bir kliniğin verisini başka bir klinik asla göremez."
            },
            {
                q: "Yapay Zeka (Sales Closer) nasıl çalışır?",
                a: "Sistem, gelen mesajları otomatik okur ve 'Satış Kapatma' stratejilerine göre en iyi cevabı önerir. 'Auto-Pilot' modundaysa cevabı kendi kendine gönderir."
            }
        ],
        en: [
            {
                q: "How to create separate passwords for clinics?",
                a: "Aura OS is currently in 'Super Admin' mode. The feature to invite individual users (doctors/staff) per clinic is part of the 'SaaS Depth Update'. Currently, 'New Clinic' provisions the data space. Contact admin to invite users."
            },
            {
                q: "I cannot login, what should I do?",
                a: "If you are the Admin, reset via DB. If using 'Login As', no password is needed, just ensure RLS Policies are active."
            },
            {
                q: "Is my data safe?",
                a: "Yes. Tenant Isolation ensures data is strictly separated between clinics."
            },
            {
                q: "How does the AI Closer work?",
                a: "It analyzes incoming chats and suggests the best closing strategy. In Auto-Pilot mode, it sends replies autonomously."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
            <div className="max-w-3xl mx-auto py-12 px-6">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                        <Book className="text-indigo-600" />
                        Aura Knowledge Base
                    </h1>
                    <p className="text-neutral-500 font-medium">System Documentation & FAQ</p>

                    <div className="flex justify-center gap-2 mt-6">
                        <button onClick={() => setLang('tr')} className={`px-4 py-1 rounded-full text-xs font-bold ${lang === 'tr' ? 'bg-black text-white' : 'bg-white border'}`}>TÜRKÇE</button>
                        <button onClick={() => setLang('en')} className={`px-4 py-1 rounded-full text-xs font-bold ${lang === 'en' ? 'bg-black text-white' : 'bg-white border'}`}>ENGLISH</button>
                    </div>
                </header>

                <div className="space-y-4">
                    {faqs[lang].map((item, i) => (
                        <div key={i} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg">
                                {item.q}
                                {openIndex === i ? <ChevronUp className="text-neutral-400" /> : <ChevronDown className="text-neutral-400" />}
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/dashboard" className="text-indigo-600 font-bold hover:underline">
                        &larr; Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
