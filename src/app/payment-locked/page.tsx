import React from 'react';
import { Lock, ShieldAlert, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PaymentLockedPage() {
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-neutral-800 rounded-3xl border border-white/5 p-8 text-center shadow-2xl space-y-6">

                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border border-rose-500/20 animate-pulse">
                    <Lock size={40} className="text-rose-500" />
                </div>

                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight mb-2">Account Suspended</h1>
                    <p className="text-neutral-400 text-sm">
                        Access to <strong>Aura OS</strong> has been temporarily restricted due to a payment issue or subscription expiry.
                    </p>
                </div>

                <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-left space-y-3">
                    <div className="flex items-center gap-3">
                        <ShieldAlert size={18} className="text-amber-500" />
                        <span className="text-xs font-bold text-neutral-300">System Locked by Super Admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-indigo-500" />
                        <span className="text-xs font-bold text-neutral-300">Payment Method Required</span>
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                    <a href="https://billing.stripe.com/p/login/test" target="_blank" className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                        Update Payment Method
                    </a>
                    <Link href="/" className="text-neutral-500 text-xs font-bold hover:text-white transition-colors">
                        Return to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}
