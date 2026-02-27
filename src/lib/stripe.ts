import { createClient } from '@supabase/supabase-js';

// [STABLE MOCK] To resolve build errors during Iyzico migration
export type PackageType = 'startup' | 'sme' | 'enterprise';

export const PACKAGES: Record<PackageType, { name: string; priceId: string; amount: number; limits: { leads: number; locations: number } }> = {
    startup: {
        name: 'Startup',
        priceId: 'price_1SnyTJFSetZwfH2trbyDPpsI',
        amount: 99,
        limits: { leads: 100, locations: 1 }
    },
    sme: {
        name: 'SME',
        priceId: 'price_1SnyTJFSetZwfH2trbyDPpsJ',
        amount: 299,
        limits: { leads: 1000, locations: 5 }
    },
    enterprise: {
        name: 'Enterprise',
        priceId: 'contact_sales',
        amount: 0,
        limits: { leads: -1, locations: -1 } // Unlimited
    },
};

// Mock stripe object to satisfy imports in subscriptions.ts
export const stripe = {
    subscriptions: {
        retrieve: async (id: string) => ({ items: { data: [{ id: 'item_123' }] } }),
        update: async (id: string, data: any) => ({ id, ...data }),
    }
};
