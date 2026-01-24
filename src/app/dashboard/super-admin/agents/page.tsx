'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n-context';

export default function AgentsPage() {
    const { t } = useI18n();
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">{t.placeholders.agentsTitle}</h2>
            <p className="text-slate-400">{t.placeholders.agentsDesc}</p>
        </div>
    );
}
