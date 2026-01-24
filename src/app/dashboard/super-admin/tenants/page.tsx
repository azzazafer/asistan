'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n-context';

export default function TenantsPage() {
    const { t } = useI18n();
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{t.placeholders.tenantsTitle}</h2>
            <p className="text-slate-400">{t.placeholders.tenantsDesc}</p>
        </div>
    );
}
