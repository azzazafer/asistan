import { openai } from './openai';

export interface VisionAnalysisResult {
    type: 'hair' | 'dental' | 'unknown' | 'unsupported';
    severity: string;
    diagnosis: string;
    suggestedTreatment: string;
    estimatedCostRange?: string; // e.g. "2000-2500 EUR"
    disclaimer: string;
}

export class VisionAnalysisService {

    /**
     * Analyzes a medical image (Base64 or URL) and returns structured data.
     */
    static async analyzeMedicalImage(imageData: string): Promise<VisionAnalysisResult> {
        try {
            console.log('[Vision Service] Converting image to analysis...');

            // Construct payload for GPT-4o Vision
            // We use a simpler model call just for analysis
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are a world-class AI Medical Screener for Hair Transplant and Dental Aesthetics. 
                        Your job is to look at the user's photo and output a STRICT JSON analysis.
                        
                        - If it's a head/scalp: Diagnose hair loss level (Norwood scale), graft estimation, and donor area quality.
                        - If it's teeth/smile: Diagnose dental aesthetic issues (alignment, color, gaps) and suggest treatments (Zirconia, Laminate, Implants).
                        - If it's irrelevant (cat, car, landscape): Return type: 'unsupported'.

                        JSON FORMAT:
                        {
                            "type": "hair" | "dental" | "unsupported",
                            "severity": "Norwood III / High Discoloration / etc.",
                            "diagnosis": "Detailed medical observation of the visual data.",
                            "suggestedTreatment": "FUE Sapphire 3500 Grafts / 20 Zirconia Crowns / etc.",
                            "disclaimer": "This allows for a preliminary assessment only. Physical consultation is required."
                        }`
                    },
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: "Analyze this image for medical aesthetic assessment." },
                            { type: 'image_url', image_url: { url: imageData.startsWith('http') ? imageData : `data:image/jpeg;base64,${imageData}` } }
                        ]
                    }
                ],
                max_tokens: 500,
                response_format: { type: 'json_object' }
            });

            const content = response.choices[0].message.content;
            if (!content) throw new Error('No content from Vision AI');

            const result = JSON.parse(content) as VisionAnalysisResult;
            console.log('[Vision Service] Analysis complete:', result.type);

            return result;

        } catch (error: any) {
            console.error('[Vision Service] Error:', error);
            return {
                type: 'unsupported',
                severity: 'Unknown',
                diagnosis: 'Could not process image.',
                suggestedTreatment: 'Please upload a clearer photo.',
                disclaimer: 'System Error during analysis.'
            };
        }
    }
}
