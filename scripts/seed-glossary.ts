import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seedGlossary() {
    const { MEDICAL_JARGON } = await import('../lib/jargon');
    const { supabase } = await import('../lib/db');

    console.log("=== SEEDING MEDICAL GLOSSARY ===");

    if (!supabase) {
        console.error("Supabase client not initialized.");
        return;
    }

    for (const [key, entry] of Object.entries(MEDICAL_JARGON)) {
        console.log(`Working on: ${key}...`);

        const { error } = await supabase
            .from('medical_glossary')
            .upsert({
                term: key,
                definition_tr: entry.laymanTranslation,
                definition_en: entry.term, // Using the full term as EN definition
                category: entry.context,
                verified_by: 'seed_script',
                confidence_score: 1.0
            }, { onConflict: 'term' });

        if (error) {
            console.error(`Error Upserting ${key}:`, error.message);
        } else {
            console.log(`✅ ${key} Seeded.`);
        }
    }

    console.log("=== SEEDING COMPLETE ===");
}

seedGlossary().catch(console.error);
