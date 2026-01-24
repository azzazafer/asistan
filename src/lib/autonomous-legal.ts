/**
 * Aura Autonomous Legal Safeguard v1.0
 * Real-time monitoring of KVKK/GDPR compliance and medical liability risks.
 */

import { redactPII } from './security';

export interface LegalRisk {
    level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    type: 'PRIVACY_BREACH' | 'MEDICAL_LIABILITY' | 'CONSENT_MISSING';
    details: string;
    mitigationApplied: boolean;
}

export class LegalSafeguard {
    /**
     * Scans AI response for potential medical liability
     */
    static auditAIResponse(text: string): { safeText: string; risks: LegalRisk[] } {
        const risks: LegalRisk[] = [];
        let safeText = text;

        // 1. Mandatory Medical Disclaimer Injection
        const disclaimer = "\n\n---\n*Disclaimer: This is an AI-powered pre-assessment and not a official medical diagnosis. Please consult a qualified doctor for final decision.*";

        if (!text.includes("Disclaimer")) {
            safeText += disclaimer;
        }

        // 2. Identify dangerous medical prescriptions
        const dangerousPatterns = [/tanınız şudur/i, /your diagnosis is/i, /ilaç yazıyorum/i];
        for (const pattern of dangerousPatterns) {
            if (pattern.test(text)) {
                risks.push({
                    level: 'HIGH',
                    type: 'MEDICAL_LIABILITY',
                    details: 'AI attempted direct diagnosis or prescription.',
                    mitigationApplied: true
                });
            }
        }

        // 3. GDPR/KVKK Check (Leak Detection)
        const redacted = redactPII(text);
        if (redacted !== text) {
            risks.push({
                level: 'CRITICAL',
                type: 'PRIVACY_BREACH',
                details: 'PII detected in AI output context.',
                mitigationApplied: true
            });
            safeText = redacted;
        }

        return { safeText, risks };
    }
}
