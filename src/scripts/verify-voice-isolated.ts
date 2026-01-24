import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment Variables manually
const envPath = path.resolve(__dirname, '../../verify.env');
dotenv.config({ path: envPath });

async function run() {
    console.log("🔊 Initializing Standalone Voice Test...");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!supabaseUrl || !supabaseKey || !openaiKey) {
        console.error("❌ Missing .env credentials (SUPABASE or OPENAI)");
        console.log("Looking for .env at:", envPath);
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const openai = new OpenAI({ apiKey: openaiKey });

    console.log("🤖 Generating Audio with OpenAI (tts-1 / nova)...");

    const text = "Merhaba! Bu Aura'nın yeni, doğal sesi. Şu an canlı sistemden değil, test komutundan konuşuyorum.";
    const userId = "manual_test_verification";

    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        console.log(`📦 Generated ${buffer.length} bytes.`);

        const fileName = `verify_${Date.now()}.mp3`;

        console.log("☁️ Uploading to Supabase Storage...");
        const { data, error } = await supabase
            .storage
            .from('voice-replies')
            .upload(fileName, buffer, {
                contentType: 'audio/mpeg',
                upsert: true
            });

        if (error) {
            console.error("❌ Upload Error:", error.message);
            return;
        }

        const { data: urlData } = supabase.storage
            .from('voice-replies')
            .getPublicUrl(fileName);

        console.log("\n✅ SUCCESS! Listen here:\n");
        console.log(urlData.publicUrl);
        console.log("\n");

    } catch (e: any) {
        console.error("❌ Error:", e.message);
    }
}

run();
