import Stripe from 'stripe';

// Stripe initialization is now safe even if env vars are missing during build/pre-rendering
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key', {
    apiVersion: '2025-12-15.clover' as any,
});

export const PACKAGES = {
    starter: {
        name: 'Starter',
        price: 299,
        priceId: process.env.STRIPE_PRICE_STARTER || '',
        features: [
            '100 lead/ay',
            'WhatsApp + Web Chat',
            'Temel raporlama',
            'Email destek'
        ],
        limits: {
            leads: 100,
            locations: 1
        }
    },
    professional: {
        name: 'Professional',
        price: 799,
        priceId: process.env.STRIPE_PRICE_PRO || '',
        features: [
            '500 lead/ay',
            'WhatsApp + Instagram + Telegram',
            'Gelişmiş analytics + Lead scoring',
            'Doktor takvim entegrasyonu',
            'Öncelikli destek'
        ],
        limits: {
            leads: 500,
            locations: 3
        }
    },
    enterprise: {
        name: 'Enterprise',
        price: 0, // Custom pricing
        priceId: '', // Contact sales
        features: [
            'Sınırsız lead',
            'Sınırsız lokasyon',
            'Tüm kanallar + Voice AI',
            'Özel entegrasyonlar',
            'Dedicated account manager',
            'SLA garantisi (99.9% uptime)'
        ],
        limits: {
            leads: -1, // unlimited
            locations: -1
        }
    }
} as const;

export type PackageType = keyof typeof PACKAGES;
