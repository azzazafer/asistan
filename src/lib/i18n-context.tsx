'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations['en'];
    dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('tr');

    useEffect(() => {
        // Persist preference
        const saved = localStorage.getItem('aura_lang') as Language;
        if (saved) setLanguage(saved);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('aura_lang', lang);
    };

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <I18nContext.Provider value={{
            language,
            setLanguage: handleSetLanguage,
            t: translations[language],
            dir
        }}>
            <div dir={dir} className={dir === 'rtl' ? 'rtl' : ''}>
                {children}
            </div>
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
