
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error("❌ .env.local not found");
        return null;
    }
    const env: any = {};
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '').replace(/\r$/, '');
        }
    });
    return env;
}

async function verifyLeads() {
    const env = loadEnv();
    if (!env) return;

    const url = env.NEXT_PUBLIC_SUPABASE_URL;
    const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.error("❌ Supabase credentials missing");
        return;
    }

    const { getLeads } = require('./lib/leads');

    console.log("🔍 Testing getLeads('default_clinic')...");
    const leads = await getLeads('default_clinic');
    console.log(`✅ getLeads returned ${leads.length} leads.`);
    if (leads.length > 0) {
        console.log("Sample lead:", JSON.stringify(leads[0], null, 2));
    }

    console.log("🔍 Testing getLeads('non_existent_tenant')...");
    const fallbackLeads = await getLeads('non_existent_tenant');
    console.log(`✅ getLeads (fallback) returned ${fallbackLeads.length} leads.`);
}

verifyLeads();
