import { VisionAnalysisService } from './lib/vision';
import fs from 'fs';
import path from 'path';

// Manual .env parser
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error("❌ .env.local not found at", envPath);
            return;
        }

        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '').replace(/\r$/, ''); // Remove quotes and carriage returns
                process.env[key] = value;
            }
        });
    } catch (e) { console.error("Env error", e); }
}

async function testVision() {
    loadEnv();
    console.log("👁️ Testing Aura Vision Cortex...");

    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ OPENAI_API_KEY missing");
        return;
    }

    // Force re-initialization of OpenAI client in vision.ts for this test context
    const { openai } = require('./lib/openai');
    openai.apiKey = process.env.OPENAI_API_KEY; // Monkey patch the key


    // Mock a small white pixel image just to test the API connection and basic flow
    // In a real test we would upload a real hair image, but for a swift automated test:
    const mockImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

    try {
        console.log("📤 Sending test image...");
        const result = await VisionAnalysisService.analyzeMedicalImage(mockImage);

        console.log("\n✅ Analysis Result:");
        console.log(JSON.stringify(result, null, 2));

        if (result.diagnosis) {
            console.log("\n🚀 Vision Module is ONLINE and responding.");
        } else {
            console.log("⚠️ Response format unexpected.");
        }

    } catch (error) {
        console.error("❌ Vision Test Failed:", error);
    }
}

testVision();
