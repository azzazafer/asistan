import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
async function checkSchema() {
    const { supabase } = await import('../lib/db');

    console.log("=== CHECKING SCHEMA ===");
    if (!supabase) {
        console.error("Supabase fail");
        return;
    }

    // This is a trick to get column names in PostgREST
    const { data, error } = await supabase
        .from('medical_glossary')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error fetching data:", error.message);
    } else {
        console.log("Success! Data looks like:", data);
        if (data && data.length > 0) {
            console.log("Columns:", Object.keys(data[0]));
        } else {
            console.log("No data in table, but connection works.");
        }
    }
}

checkSchema().catch(console.error);
