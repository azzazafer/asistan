'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n-context';

export default function SettingsPage() {
    const { t } = useI18n();
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{t.placeholders.settingsTitle}</h2>
            <p className="text-slate-400">{t.placeholders.settingsDesc}</p>
        </div>
    );
}
