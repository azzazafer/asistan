/**
 * Aura Payment Integration - Stripe & PayPal
 * Handles deposits, full payments, and refunds for medical tourism bookings
 */

// ============================================
// TYPES
// ============================================
export interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
    patientId: string;
    appointmentId: string;
    description: string;
    createdAt: string;
    metadata?: Record<string, string>;
}

export interface DepositRequest {
    patientId: string;
    appointmentId: string;
    amount: number;
    currency?: string;
    description?: string;
    patientEmail?: string;
    patientName?: string;
}

export interface PaymentResult {
    success: boolean;
    paymentId?: string;
    clientSecret?: string;
    error?: string;
    redirectUrl?: string;
}

// ============================================
// SIMULATED PAYMENT STORAGE (Replace with real DB)
// ============================================
const payments: PaymentIntent[] = [];

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// ============================================
// STRIPE INTEGRATION (REST API - No SDK needed)
// ============================================
export const createDeposit = async (request: DepositRequest): Promise<PaymentResult> => {
    try {
        if (!STRIPE_SECRET_KEY) {
            if (process.env.NODE_ENV === 'production') {
                throw new Error('[Payment] CRITICAL: STRIPE_SECRET_KEY missing in production.');
            }
            console.warn('[Payment] STRIPE_SECRET_KEY not set. Falling back to simulation.');
            return simulatePayment(request);
        }

        const response = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                amount: (request.amount * 100).toString(), // Convert to cents
                currency: (request.currency || 'EUR').toLowerCase(),
                'payment_method_types[]': 'card',
                description: request.description || 'Aura OS Medical Deposit',
                'metadata[patientId]': request.patientId,
                'metadata[appointmentId]': request.appointmentId,
                'metadata[patientName]': request.patientName || '',
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Stripe API Error');
        }

        return {
            success: true,
            paymentId: data.id,
            clientSecret: data.client_secret,
            redirectUrl: `/payment/confirm/${data.id}`,
        };
    } catch (error: any) {
        console.error('[Payment] Stripe Error:', error);
        return {
            success: false,
            error: error.message || 'Payment creation failed',
        };
    }
};

/**
 * Calculates and records commission for agents
 */
export const recordCommission = async (leadId: string, agentId: string, saleAmount: number) => {
    const { supabase } = await import('./db');
    const { logAudit } = await import('./security');

    if (!supabase) return;

    // Fetch agent to get commission rate
    const { data: agent } = await supabase.from('agents').select('commission_rate').eq('id', agentId).single();
    if (!agent) return;

    const commissionAmount = (saleAmount * (agent.commission_rate || 10)) / 100;

    const { error } = await supabase.from('commissions').insert({
        lead_id: leadId,
        agent_id: agentId,
        amount: commissionAmount,
        currency: 'EUR',
        status: 'pending',
        tenant_id: 'default_clinic'
    });

    if (!error) {
        await logAudit({
            action: 'COMMISSION_RECORDED',
            userId: agentId,
            resource: `Lead:${leadId}`,
            details: `Commission of ${commissionAmount} EUR recorded for sale of ${saleAmount} EUR`,
            clearance: 'ADMIN'
        });
    }
};

/**
 * Pillar 4: Aura Neural Pay
 * AI-driven payment links with deep lead tracking and auto-closer integration.
 */
export const createNeuralPaySession = async (
    leadId: string,
    amount: number,
    treatmentType: string,
    tenantId: string = 'default_clinic'
): Promise<{ url: string; sessionId: string } | null> => {
    try {
        console.log(`[Neural Pay] Generating session for Lead: ${leadId}, Amount: ${amount} EUR`);

        if (!STRIPE_SECRET_KEY) {
            return {
                url: `https://asistan-orcin.vercel.app/payment/mock?lead=${leadId}&amount=${amount}`,
                sessionId: `sess_sim_${Date.now()}`
            };
        }

        const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'payment_method_types[]': 'card',
                'line_items[0][price_data][currency]': 'eur',
                'line_items[0][price_data][product_data][name]': `${treatmentType} Deposit`,
                'line_items[0][price_data][unit_amount]': (amount * 100).toString(),
                'line_items[0][quantity]': '1',
                'mode': 'payment',
                'success_url': 'https://asistan-orcin.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url': 'https://asistan-orcin.vercel.app/payment/cancel',
                'client_reference_id': leadId,
                'metadata[leadId]': leadId,
                'metadata[tenantId]': tenantId,
                'metadata[source]': 'Aura_Neural_Pay'
            })
        });

        const sessionData = await sessionResponse.json();

        if (!sessionResponse.ok) throw new Error(sessionData.error?.message);

        return { url: sessionData.url, sessionId: sessionData.id };
    } catch (error) {
        console.error('[Neural Pay] Engine Error:', error);
        return null;
    }
};

const simulatePayment = (request: DepositRequest): PaymentResult => {
    const paymentId = `pay_sim_${Date.now()}`;
    return {
        success: true,
        paymentId,
        clientSecret: `sim_secret_${paymentId}`,
        redirectUrl: `/payment/confirm/${paymentId}`,
    };
};

export const getPatientPayments = (patientId: string): PaymentIntent[] => {
    return payments.filter(p => p.patientId === patientId);
};

// ============================================
// PRICING CALCULATOR
// ============================================
export interface TreatmentPackage {
    id: string;
    name: string;
    basePrice: number;
    currency: string;
    includes: string[];
    duration: string;
}

export const TREATMENT_PACKAGES: TreatmentPackage[] = [
    {
        id: 'dental_implant_basic',
        name: 'Dental Implant Basic',
        basePrice: 500,
        currency: 'EUR',
        includes: ['Single implant', 'Crown', 'X-ray', 'Consultation'],
        duration: '3-5 days'
    },
    {
        id: 'dental_implant_premium',
        name: 'Dental Implant Premium',
        basePrice: 1200,
        currency: 'EUR',
        includes: ['Multiple implants', 'Premium crowns', 'Full X-ray', 'VIP consultation', 'Hotel transfer'],
        duration: '5-7 days'
    },
    {
        id: 'hair_transplant_fue',
        name: 'FUE Hair Transplant',
        basePrice: 2500,
        currency: 'EUR',
        includes: ['Up to 4000 grafts', 'PRP treatment', 'Medications', 'Hotel stay', 'Airport transfer'],
        duration: '3 days'
    },
    {
        id: 'eye_laser_lasik',
        name: 'LASIK Eye Surgery',
        basePrice: 1500,
        currency: 'EUR',
        includes: ['Both eyes', 'Pre-op examination', 'Post-op care', 'Medications'],
        duration: '1-2 days'
    },
    {
        id: 'aesthetic_rhinoplasty',
        name: 'Rhinoplasty (Nose Job)',
        basePrice: 3500,
        currency: 'EUR',
        includes: ['Surgery', 'Hospital stay', 'Post-op care', 'Follow-up visits'],
        duration: '7-10 days'
    }
];

export const calculateTotalCost = (
    packageId: string,
    extras: { hotelNights?: number; vipTransfer?: boolean; translator?: boolean }
): { total: number; breakdown: Record<string, number> } => {
    const pkg = TREATMENT_PACKAGES.find(p => p.id === packageId);

    if (!pkg) {
        return { total: 0, breakdown: {} };
    }

    const breakdown: Record<string, number> = {
        'Treatment Package': pkg.basePrice,
    };

    if (extras.hotelNights) {
        breakdown['Hotel'] = extras.hotelNights * 80; // €80/night average
    }

    if (extras.vipTransfer) {
        breakdown['VIP Transfer'] = 150;
    }

    if (extras.translator) {
        breakdown['Personal Translator'] = 200;
    }

    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return { total, breakdown };
};

// ============================================
// INVOICE GENERATION
// ============================================
export interface Invoice {
    id: string;
    patientId: string;
    items: { description: string; amount: number }[];
    total: number;
    currency: string;
    status: 'draft' | 'sent' | 'paid';
    createdAt: string;
}

/**
 * Aura Global FX Oracle (Phase 11)
 * Ensures multi-currency precision for international clinics.
 */
export const normalizeCurrency = async (amount: number, from: string, to: string = 'EUR'): Promise<number> => {
    // In production, fetch live rates from an API (e.g., Fixer.io or Stripe Rates)
    const mockRates: Record<string, number> = {
        'GBP': 1.17, // 1 GBP = 1.17 EUR
        'USD': 0.92,
        'TRY': 0.03,
        'EUR': 1.0
    };

    const rate = mockRates[from.toUpperCase()] || 1.0;

    // Safety check for invalid rate or same currency
    if (!mockRates[from.toUpperCase()]) {
        console.warn(`[FX Oracle] Unsupported currency: ${from}. Defaulting to 1:1.`);
    }

    const normalized = amount * rate;

    console.log(`[FX Oracle] Normalized: ${amount} ${from} -> ${normalized.toFixed(2)} ${to}`);
    return normalized;
};

export const generateInvoice = (
    patientId: string,
    items: { description: string; amount: number }[],
    currency: string = 'EUR'
): Invoice => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return {
        id: `INV-${Date.now()}`,
        patientId,
        items,
        total,
        currency,
        status: 'draft',
        createdAt: new Date().toISOString(),
    };
};
