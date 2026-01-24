'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Link as LinkIcon, LogOut, Zap } from 'lucide-react';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isLinkActive = (href: string) => {
        if (href === '/agent') return pathname === '/agent';
        return pathname.startsWith(href);
    };

    const linkClass = (href: string) =>
        `text-sm font-bold transition-colors pb-1 border-b-2 ${isLinkActive(href)
            ? 'text-black border-black'
            : 'text-slate-400 border-transparent hover:text-black'
        }`;

    return (
        <div className="min-h-screen bg-[#fafafc] flex flex-col">
            {/* Top Navigation */}
            <header className="h-20 border-b border-black/5 bg-white/80 backdrop-blur-xl sticky top-0 z-[100] px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                        <Zap size={20} className="text-white fill-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tighter leading-none">Aura Agent</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Partnership Hub</p>
                    </div>
                </div>

                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/agent" className={linkClass('/agent')}>Genel Bakış</Link>
                    <Link href="/agent/leads" className={linkClass('/agent/leads')}>Yönlendirmeler</Link>
                    <Link href="/agent/commissions" className={linkClass('/agent/commissions')}>Komisyonlar</Link>
                    <Link href="/portal" className="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors">Hasta Portalı'na Git</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold">Zafer Agency</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase">Pro Partner</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-auto">
                {children}
            </main>

            {/* Bottom Mobile Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-black/5 px-6 flex items-center justify-around z-[100]">
                <Link href="/agent" className="text-black"><LayoutDashboard size={20} /></Link>
                <Link href="/agent/leads" className="text-slate-400"><Users size={20} /></Link>
                <Link href="/agent/commissions" className="text-slate-400"><CreditCard size={20} /></Link>
            </nav>
        </div>
    );
}
