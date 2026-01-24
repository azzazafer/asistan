/**
 * Aura Config Guard - Production Environment Validation
 */

const CRITICAL_KEYS = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'OPENAI_API_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN'
];

export const validateConfig = () => {
    const missing: string[] = [];

    CRITICAL_KEYS.forEach(key => {
        if (!process.env[key]) {
            missing.push(key);
        }
    });

    if (missing.length > 0) {
        const errorMsg = `[CONFIG_ERROR] Missing Critical Environment Variables: ${missing.join(', ')}`;
        console.error(errorMsg);

        // In development, we might want to just warn, but in production, this is fatal
        if (process.env.NODE_ENV === 'production') {
            throw new Error(errorMsg);
        }
    } else {
        console.log('✅ System Configuration Verified: All neural pathways secure.');
    }
};

// Auto-run if imported (Singleton behavior)
if (typeof window === 'undefined') {
    validateConfig();
}
