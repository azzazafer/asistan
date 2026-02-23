
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using anon for public access, or service role if check needed
// Note: In a real script we might need SERVICE_ROLE for insertions if RLS blocks us, 
// but for now let's try to verify connection and inserting via API flow or direct if possible.
// Actually, to setup the mock data (connected_account), we likely need admin rights or RLS allowing insertion.
// Let's assume the user has disabled RLS or we use a service key if available. 
// If not, I will ask user to insert. *Wait*, I can use the API to register? No, registration API isn't built yet.
// I will try to use the ANON key, if it fails, I'll log it.

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runGhostTest() {
    console.log("👻 GHOST TEST: Fintech Architecture Verification");
    console.log("==============================================");

    // 1. CHECK TABLES
    console.log("\n🔍 ADIM 1: Veritabanı Tabloları Kontrolü...");
    const { error: tableError } = await supabase.from('payment_splits').select('id').limit(1);

    if (tableError) {
        if (tableError.code === '42P01') { // undefined_table
            console.error("❌ HATA: Tablolar bulunamadı!");
            console.error("⚠️ LÜTFEN 'supabase/migrations/20260204_stripe_connect_architecture.sql' DOSYASINI SUPABASE SQL EDITOR'DE ÇALIŞTIRIN.");
            process.exit(1);
        } else {
            console.warn("⚠️ Tablo erişim uyarısı (RLS olabilir):", tableError.message);
        }
    } else {
        console.log("✅ Tablolar mevcut (payment_splits algılandı).");
    }

    // 2. SETUP MOCK DATA
    console.log("\n🛠️ ADIM 2: Mock Veri Hazırlığı (Clinic + Connected Account)...");

    // Create/Check Tenant
    const tenantId = 'ghost_clinic_v4';

    // We can't insert directly into 'tenants' easily without Auth/RLS bypass, 
    // BUT we can try to insert into 'connected_accounts' if RLS allows or checks tenant existence.
    // Let's rely on the API call. The API call checks DB.

    // MOCK: We will try to insert a connected account manually via supabase client. 
    // If RLS blocks, we might need manual insert instructions. 
    // However, let's try.

    // First, let's see if we can create a connected account entry.
    // Note: This might fail if 'tenants' strictly requires an FK and we can't create a tenant.
    // Workaround: Use an existing tenant ID from the specific user user context if known? 
    // Let's try to use a dummy UUID. If it fails on FK, we know the SQL is active at least!

    const mockStripeId = 'acct_123456789Ghost';

    // Since I can't guarantee creating a tenant via this script without Service Role key (which is usually hidden),
    // I will try to use the API endpoint to simulate the check.
    // Actually, split-logic.ts *reads* from connected_accounts.

    console.log("   (Skipping direct DB insert due to RLS/Auth constraints in this script)");
    console.log("   Using Tenant ID: 'test_clinic' (Assuming it exists or checks will fail gracefully)");

    // 3. EXECUTE PAYMENT API (CURL SIMULATION)
    console.log("\n💸 ADIM 3: API Testi (POST /api/payments/pay)...");

    try {
        const payload = {
            tenantId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Valid UUID from migration
            amount: 100000, // 1000.00 TL
            packageType: 'professional',
            description: 'Ghost Test Payment'
        };

        console.log("   Payload:", JSON.stringify(payload));

        const response = await fetch('http://localhost:3000/api/payments/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("\n✅ BAŞARILI! API Yanıtı:");
            console.log(JSON.stringify(data, null, 2));
            console.log("\n🎉 ANALİZ:");
            console.log(`   - Toplam: ${(100000 / 100).toFixed(2)} TL`);
            console.log(`   - Klinik Payı: ${data.breakdown?.clinicAmount / 100} TL (Beklenen: 850)`);
            console.log(`   - Aura Payı:   ${data.breakdown?.platformFee / 100} TL (Beklenen: 150)`);
            console.log(`   - Split ID:    ${data.splitId}`);
        } else {
            console.error("\n❌ API HATASI:");
            console.error(data);

            if (data.error?.includes('Clinic default_clinic has no connected Stripe account')) {
                console.log("\nℹ️ NOT: Bu hata BEKLENİYORDU çünkü 'connected_accounts' tablosuna henüz veri girmedik.");
                console.log("   SQL Migration'ı çalıştırdıktan sonra şu SQL'i Supabase'de çalıştırıp tekrar deneyin:");
                console.log(`
                 -- Mock Data
                 INSERT INTO connected_accounts (tenant_id, stripe_account_id, charges_enabled)
                 VALUES ('default_clinic', 'acct_ghost_test_123', true)
                 ON CONFLICT (tenant_id) DO UPDATE SET charges_enabled = true;
                 `);
            }
        }
    } catch (err) {
        console.error("❌ Bağlantı Hatası:", err);
    }
}

runGhostTest();
