import { textToSpeech } from '@/lib/voice/openai-tts';

async function verifyVoice() {
    console.log("🔊 Testing OpenAI TTS (Model: tts-1, Voice: Nova)...");

    const text = "Merhaba! Ben Aura. Sizinle tanıştığımıza çok memnun oldum. İstanbul'daki kliniğimizde sizi ağırlamaktan onur duyarız.";
    const userId = "test_user_verify_v4";

    const url = await textToSpeech(text, userId);

    if (url) {
        console.log("\n✅ SUCCESS: Audio generated successfully!");
        console.log(`🎧 Listen here: ${url}`);
        console.log("-----------------------------------------");
        console.log("Check for: Natural breathing, warm tone, non-robotic intonation.");
    } else {
        console.error("❌ FAILED: Audio generation returned null.");
    }
}

verifyVoice();
