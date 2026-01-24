import { encryptAES256, decryptAES256 } from '../lib/security';
import { saveLeadToCloud, fetchLeadsFromCloud } from '../lib/db';

async function verifyShieldV3() {
    console.log('=== AURA OS: SHIELD V3 - DEEP SECURITY VERIFICATION ===\n');

    const plainText = 'Hassas Hasta Verisi: +905001234567';
    console.log('Original Text:', plainText);

    // 1. Encryption Round-trip
    console.log('\n[1] Testing AES-256-GCM Encryption...');
    const encrypted = encryptAES256(plainText);
    console.log('Encrypted (with GCM tag):', encrypted);

    const decrypted = decryptAES256(encrypted);
    console.log('Decrypted:', decrypted);

    if (plainText === decrypted && encrypted !== plainText) {
        console.log('✅ Encryption Round-trip: PASSED');
    } else {
        console.log('❌ Encryption Round-trip: FAILED');
    }

    // 2. Database Encryption Layer
    console.log('\n[2] Testing DB Layer Encryption (Amnesia Mode Simulation)...');
    const mockLead = {
        name: 'Safe Patient',
        phone: '+905555555555',
        notes: 'Bu not şifreli olmalıdır.',
        tenant_id: 'shield_test'
    };

    const saveSuccess = await saveLeadToCloud(mockLead);
    console.log('Save Lead Success:', saveSuccess);

    const leads = await fetchLeadsFromCloud('shield_test');
    if (leads && leads.length > 0) {
        const retrievedLead = leads[0];
        console.log('Retrieved Phone:', retrievedLead.phone);
        if (retrievedLead.phone === '+905555555555') {
            console.log('✅ DB Encryption/Decryption Transparently: PASSED');
        } else {
            console.log('❌ DB Decryption Failure');
        }
    }

    console.log('\n=== SHIELD V3 VERIFICATION FINISHED ===');
}

verifyShieldV3();
