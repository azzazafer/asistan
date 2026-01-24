'use client';

import React from 'react';
import { Shield, Users, Activity, Settings, Database, Globe } from 'lucide-react';
import Link from 'next/link';
import { I18nProvider, useI18n } from '@/lib/i18n-context';

export default function SuperAdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <I18nProvider>
            <SuperAdminLayoutContent>{children}</SuperAdminLayoutContent>
        </I18nProvider>
    );
}

function SuperAdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { t, language, setLanguage, dir } = useI18n();

    return (
        <div className={`flex h-screen bg-slate-900 text-white ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* God Mode Sidebar */}
            <aside className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col ${dir === 'rtl' ? 'border-l border-r-0' : ''}`}>
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold bg-gradient-god-mode bg-clip-text text-transparent flex items-center gap-2">
                        <Shield className="w-6 h-6 text-purple-400" />
                        {t.sidebar.title}
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">{t.sidebar.subtitle}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/dashboard/super-admin" icon={<Activity />} label={t.sidebar.overview} active />
                    <NavItem href="/dashboard/super-admin/tenants" icon={<Database />} label={t.sidebar.tenants} />
                    <NavItem href="/dashboard/super-admin/agents" icon={<Users />} label={t.sidebar.agents} />
                    <NavItem href="/dashboard/super-admin/settings" icon={<Settings />} label={t.sidebar.settings} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-purple-900/20 text-purple-300 text-xs p-3 rounded border border-purple-500/20">
                        <p className="font-semibold">{t.sidebar.statusTitle}</p>
                        <p className="mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {t.sidebar.statusValue}
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-900">
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-10">
                    <h2 className="text-lg font-medium text-white">{t.header.title}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-800 rounded-full px-2 py-1">
                            <button
                                onClick={() => setLanguage('tr')}
                                className={`text-xs px-2 py-1 rounded transition-colors ${language === 'tr' ? 'bg-purple-600/50 text-white' : 'text-slate-400 hover:text-white'}`}
                            >TR</button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`text-xs px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-purple-600/50 text-white' : 'text-slate-400 hover:text-white'}`}
                            >EN</button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`text-xs px-2 py-1 rounded transition-colors ${language === 'ar' ? 'bg-purple-600/50 text-white' : 'text-slate-400 hover:text-white'}`}
                            >AR</button>
                        </div>
                        <span className="text-xs text-slate-400">{t.header.version}</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-amber-600 border border-slate-700"></div>
                    </div>
                </header>
                <div className="p-6 text-white">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                ? 'bg-purple-600/10 text-purple-300 border border-purple-600/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}>
            {React.cloneElement(icon as any, { size: 18 })}
            <span>{label}</span>
        </Link>
    );
}
