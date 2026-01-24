"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, ShieldCheck, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface CheckoutFormProps {
    clientSecret: string;
    amount: number;
    currency: string;
    onSuccess: () => void;
    onClose: () => void;
}

function CheckoutForm({ clientSecret, amount, currency, onSuccess, onClose }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setIsLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            toast.error(error.message || "Ödeme başarısız.");
            setIsLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            toast.success("Ödeme Başarılı! VIP Durumunuz Aktif Edildi.");
            onSuccess();
            setTimeout(onClose, 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Kart Bilgileri</span>
                    <div className="flex gap-2">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <Lock size={14} className="text-neutral-300" />
                    </div>
                </div>

                <div className="py-3 px-2 bg-white rounded-lg border border-neutral-200">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#000',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#fa755a' },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className="w-full py-4 bg-black text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden group disabled:opacity-50"
                >
                    <div className="flex items-center justify-center gap-2 relative z-10">
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Zap size={14} fill="white" />
                                <span>{amount} {currency.toUpperCase()} ÖDE</span>
                            </>
                        )}
                    </div>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 text-neutral-400 font-bold text-[10px] uppercase tracking-widest hover:text-black transition-colors"
                >
                    Vazgeç
                </button>
            </div>

            <p className="text-[9px] text-center text-neutral-400 font-medium leading-relaxed uppercase tracking-tighter">
                Ödemeleriniz 256-bit SSL ile şifrelenir. <br /> Aura OS kart verilerinizi asla saklamaz.
            </p>
        </form>
    );
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    currency: string;
    clientSecret: string;
    onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, amount, currency, clientSecret, onSuccess }: PaymentModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-neutral-100 p-8 relative z-10 overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />

                        <div className="relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-neutral-200">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Güvenli Ödeme</h3>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Aura VIP Aktivasyonu</p>
                                </div>
                            </div>

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm
                                    clientSecret={clientSecret}
                                    amount={amount}
                                    currency={currency}
                                    onSuccess={onSuccess}
                                    onClose={onClose}
                                />
                            </Elements>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
