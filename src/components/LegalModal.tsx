"use client";

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'kvkk' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
    const { t } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const title = type === 'kvkk' ? t('legal.kvkk_title') || "KVKK & GİZLİLİK" : t('legal.terms_title') || "KULLANIM KOŞULLARI";

    // Dummy official text
    const content = type === 'kvkk' ? (
        <>
            <p><strong>1. Veri Sorumlusunun Kimliği</strong></p>
            <p>Aura OS olarak kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu sıfatıyla Aura OS, kişisel verilerinizi aşağıda açıklanan amaçlar ve sınırlar dahlinde işleyecektir.</p>

            <p className="mt-4"><strong>2. Kişisel Verilerin İşlenme Amacı</strong></p>
            <p>Toplanan kişisel verileriniz, Platformumuzun otonom operasyonlarının kusursuz çalışması, hizmetlerimizin sunulması, kullanıcı deneyiminin kişiselleştirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir. Otonom ajanlarımız verilerinizi sadece size daha iyi hizmet vermek için optimize eder.</p>

            <p className="mt-4"><strong>3. Kişisel Verilerin Aktarılması</strong></p>
            <p>Kişisel verileriniz, kanuni zorunluluklar ve JWE-RS256 şifreleme standartları haricinde kesinlikle üçüncü taraflarla paylaşılmaz. Verileriniz, yasal mevzuata uygun olarak yurt içi ve yurt dışı güvenli sunucularımızda saklanmaktadır.</p>

            <p className="mt-4"><strong>4. Kişisel Veri Sahibinin Hakları</strong></p>
            <p>KVKK&apos;nın 11. maddesi uyarınca, verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, eksik veya yanlış işlenen verilerin düzeltilmesini isteme haklarına sahipsiniz.</p>
        </>
    ) : (
        <>
            <p><strong>1. Taraflar ve Kapsam</strong></p>
            <p>Bu kullanım koşulları (&quot;Sözleşme&quot;), Aura OS platformunu (&quot;Platform&quot;) kullanan tüm kullanıcılar (&quot;Kullanıcı&quot;) ile Aura OS arasında akdedilmiştir. Platforma giriş yaparak bu sözleşmeyi kabul etmiş sayılırsınız.</p>

            <p className="mt-4"><strong>2. Hizmetlerin Kullanımı</strong></p>
            <p>Kullanıcı, Platformu sadece yasal amaçlar için ve işbu sözleşme hükümlerine uygun olarak kullanmayı kabul eder. Otonom satış ajanları ve yapay zeka çekirdeğinin tersine mühendislikle (reverse engineering) çözümlenmeye çalışılması kesinlikle yasaktır.</p>

            <p className="mt-4"><strong>3. Fikri Mülkiyet Hakları</strong></p>
            <p>Platformda bulunan tüm yazılım, algoritma, arayüz, tasarım ve metinlerin mülkiyet hakları Aura OS&apos;a aittir. İzinsiz kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.</p>

            <p className="mt-4"><strong>4. Sorumluluk Reddi</strong></p>
            <p>Aura OS, platformun otonom kararları sonucunda oluşabilecek dolaylı zararlardan veya iletişim aksaklıklarından sorumlu tutulamaz. Sistem, %99.9 uptime garantisi ile çalışmakla birlikte, mücbir sebepler saklıdır.</p>
        </>
    );

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-[10px] animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all group"
                    >
                        <span className="text-xl font-black group-hover:rotate-90 transition-transform">✕</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide text-sm text-gray-400 leading-relaxed space-y-4 font-mono">
                    {content}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end bg-black/50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {t('legal.accept') || "KABUL EDİYORUM"}
                    </button>
                </div>
            </div>
        </div>
    );
}
