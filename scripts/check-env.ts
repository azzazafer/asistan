import { z } from 'zod';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const envSchema = z.object({
    // Security & Payments
    STRIPE_SECRET_KEY: z.string().min(1, "Stripe Secret Key is missing"),
    STRIPE_WEBHOOK_SECRET: z.string().min(1, "Stripe Webhook Secret is missing"),

    // Intelligence
    OPENAI_API_KEY: z.string().startsWith('sk-', "Invalid OpenAI API Key format"),

    // High Availability / Database
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is missing"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "Supabase Service Role Key is missing"),

    // Omnichannel Bridge
    TWILIO_ACCOUNT_SID: z.string().min(1, "Twilio SID is missing"),
    TWILIO_AUTH_TOKEN: z.string().min(1, "Twilio Auth Token is missing"),
    TWILIO_PHONE_NUMBER: z.string().min(1, "Twilio Phone is missing"),

    // Infrastructure
    REDIS_URL: z.string().url("Invalid Redis URL"),
});

/**
 * Validates the current machine's environment variables.
 * If --ci flag is passed, it only checks for critical build vars.
 */
function validate() {
    console.log("🔍 Running Aura OS Environment Validation...");

    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        console.error("❌ CRITICAL: Environment Validation Failed!");
        result.error.issues.forEach((err) => {
            console.error(`   - ${err.path.join('.')}: ${err.message}`);
        });

        // In CI or Production, crash immediately to prevent zombie states
        if (process.env.NODE_ENV === 'production' || process.argv.includes('--ci')) {
            process.exit(1);
        }
    } else {
        console.log("✅ Environment Validated successfully.");
    }
}

validate();
