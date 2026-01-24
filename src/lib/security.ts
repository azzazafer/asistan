/**
 * Aura Security Layer v2.0
 * Enterprise-grade security: PII Redaction, AES-256 Encryption, Audit Logging, GDPR/HIPAA Compliance
 */

import crypto from 'crypto';

// ============================================
// CONFIGURATION
// ============================================
const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET_KEY || 'aura-default-32-byte-secret-key!'; // Must be 32 bytes for AES-256
const IV_LENGTH = 16;

// ============================================
// PII PATTERNS & REGEX HARDENING
// ============================================
const PII_PATTERNS = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}/g, // Requires at least 3 char TLD
    phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    tcNo: /\b[1-9][0-9]{10}\b/g, // Turkish ID (11 digits, doesn't start with 0)
    creditCard: /\b(?:\d[ -]*?){13,19}\b/g, // Support up to 19 digits
    names: /(?:Adım|İsmim|Sayın|Patient|Mr\.|Ms\.|Mrs\.|Dr\.)\s+([A-ZÇĞİÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][a-zçğıöşü]+)*)/g,
    passport: /\b[A-Z]{1,2}[0-9]{7,9}\b/g, // Standard international passport format
    iban: /[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7,26}/g,
    medicalId: /\b[A-Z0-9]{5,20}\b/g,
    location: /\b(?:Sokak|Caddesi|Apartmanı|No:|Mahallesi|Avenue|Street|Boulevard|Suite)\b/gi,
    tcPassport: /\b[U][0-9]{8}\b/g, // Turkish Passport Format (U + 8 digits)
};

/**
 * Validates Turkish Identification Number (TCKN) using checksum algorithm.
 * Premium hardening step.
 */
export const validateTCKN = (tcNo: string): boolean => {
    if (tcNo.length !== 11) return false;
    if (tcNo[0] === '0') return false;

    const digits = tcNo.split('').map(Number);

    // Sum of digits 1, 3, 5, 7, 9
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    // Sum of digits 2, 4, 6, 8
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

    // 10th digit calculation
    const digit10 = (oddSum * 7 - evenSum) % 10;
    if (digit10 !== digits[9]) return false;

    // 11th digit calculation
    const digit11 = (digits.reduce((acc, curr, idx) => idx < 10 ? acc + curr : acc, 0)) % 10;
    if (digit11 !== digits[10]) return false;

    return true;
};

// ============================================
// PROMPT INJECTION PATTERNS (Anti-Jailbreak)
// ============================================
const INJECTION_PATTERNS = [
    /ignore previous instructions/i,
    /do anything now/i,
    /you are DAN/i,
    /developer mode/i,
    /sistem talimatlarını unut/i,
    /rol yapma/i,
    /gerçek kimliğin/i
];

export const detectPromptInjection = (text: string): { safe: boolean; reason?: string } => {
    for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(text)) {
            return {
                safe: false,
                reason: 'Potential Prompt Injection Attack Detected'
            };
        }
    }
    return { safe: true };
};

// ============================================
// PII REDACTION (Hardened)
// ============================================
export const redactPII = (text: string): string => {
    if (typeof text !== 'string') return text;
    let redacted = text;

    // 1. HIGH SPECIFICITY PATTERNS FIRST

    // Mask TCKN (with Algorithmic Verification)
    redacted = redacted.replace(PII_PATTERNS.tcNo, (match) => {
        return validateTCKN(match) ? '[M-TC_KIMLIK]' : match;
    });

    // Mask IBAN (Starts with letters, very specific)
    redacted = redacted.replace(PII_PATTERNS.iban, (match) => {
        return `TR**${match.slice(-4)}`;
    });

    // Mask Emails
    redacted = redacted.replace(PII_PATTERNS.email, '[M-EMAIL]');

    // Mask Passports & Docs
    redacted = redacted.replace(PII_PATTERNS.tcPassport, '[M-TC_PASAPORT]');
    redacted = redacted.replace(PII_PATTERNS.passport, '[M-BELGE_NO]');

    // 2. MEDIUM SPECIFICITY

    // Mask Names (Context dependent)
    redacted = redacted.replace(PII_PATTERNS.names, (match, p1) => match.replace(p1, '[M-ISIM]'));

    // Mask Credit Cards
    redacted = redacted.replace(PII_PATTERNS.creditCard, '[M-KREDI_KARTI]');

    // 3. LOW SPECIFICITY (Loose Patterns) - DO LAST TO PREVENT OVER-MATCHING

    // Mask Phones (Only if not already part of an IBAN or TCKN)
    redacted = redacted.replace(PII_PATTERNS.phone, '[M-TELEFON]');

    // Mask Locations/Addresses
    redacted = redacted.replace(PII_PATTERNS.location, '[M-LOKASYON]');

    return redacted;
};

/**
 * Recursive PII Redaction for deep objects and arrays.
 * Critical for cleaning AI context and logs.
 */
export const redactDeep = (data: any): any => {
    if (data === null || data === undefined) return data;
    if (typeof data === 'string') return redactPII(data);
    if (Array.isArray(data)) return data.map(item => redactDeep(item));
    if (typeof data === 'object') {
        const cleaned: any = {};
        for (const key in data) {
            // Field-level redaction based on key name (Hardening)
            const lowerKey = key.toLowerCase();
            if (['password', 'secret', 'token', 'key', 'cvv'].includes(lowerKey)) {
                cleaned[key] = '[REDACTED_SENSITIVE]';
            } else {
                cleaned[key] = redactDeep(data[key]);
            }
        }
        return cleaned;
    }
    return data;
};

// ============================================
// SCRAMBLE MODE (for unauthorized eyes)
// ============================================
export const scrambleText = (text: string): string => {
    return text.replace(/[a-zA-Z]/g, () => '•').replace(/[0-9]/g, '∗');
};

// ============================================
// CLEARANCE-BASED ACCESS CONTROL
// ============================================
export type ClearanceLevel = 'SYSTEM' | 'ADMIN' | 'USER' | 'GUEST';

export const processSecurityLayer = (text: string, clearance: ClearanceLevel = 'GUEST'): string => {
    if (clearance === 'SYSTEM' || clearance === 'ADMIN') return text;
    if (clearance === 'USER') return redactPII(text);
    return scrambleText(redactPII(text));
};

// ============================================
// AES-256-GCM ENCRYPTION (Enterprise Grade)
// ============================================
const AUTH_TAG_LENGTH = 16;

export const encryptAES256 = (plainText: string): string => {
    try {
        if (!plainText) return plainText;
        const iv = crypto.randomBytes(IV_LENGTH);
        const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32).padEnd(32, '0'));
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

        let encrypted = cipher.update(plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
        console.error('[Security] Encryption failed:', error);
        return plainText; // Fallback - should not happen in production
    }
};

export const decryptAES256 = (encryptedText: string): string => {
    try {
        if (!encryptedText || !encryptedText.includes(':')) return encryptedText;

        const parts = encryptedText.split(':');
        if (parts.length < 3) return decryptLegacyCBC(encryptedText); // Handle legacy if needed

        const [ivHex, authTagHex, encrypted] = parts;
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32).padEnd(32, '0'));

        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('[Security] Decryption failed:', error);
        return encryptedText;
    }
};

// Legacy CBC support for migration period (Internal use)
const decryptLegacyCBC = (encryptedText: string): string => {
    try {
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32).padEnd(32, '0'));
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        return encryptedText;
    }
};

// ============================================
// AUDIT LOGGING
// ============================================
export interface AuditLogEntry {
    timestamp: string;
    action: string;
    userId: string;
    resource: string;
    details: string;
    ip?: string;
    clearance: ClearanceLevel;
}

const auditLogs: AuditLogEntry[] = [];

export const logAudit = async (entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> => {
    const { supabase } = await import('./db');
    const logEntry: AuditLogEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    };

    // Persistence to DB for compliance
    if (supabase) {
        await supabase.from('audit_logs').insert({
            action: logEntry.action,
            user_id: logEntry.userId,
            details: logEntry.details,
            metadata: { resource: logEntry.resource, clearance: logEntry.clearance }
        });
    }

    console.log(`[AUDIT] ${logEntry.timestamp} | ${logEntry.action} | ${logEntry.userId}`);
};

export const getAuditLogs = (limit: number = 100): AuditLogEntry[] => {
    return auditLogs.slice(-limit);
};

// ============================================
// GDPR/HIPAA/KVKK COMPLIANCE UTILITIES
// ============================================
export interface ComplianceCheck {
    gdpr: boolean;
    hipaa: boolean;
    kvkk: boolean;
    issues: string[];
}

export const checkCompliance = (data: Record<string, any>): ComplianceCheck => {
    const issues: string[] = [];

    // Check for unencrypted sensitive fields
    const sensitiveFields = ['email', 'phone', 'tcNo', 'creditCard', 'passport', 'iban'];
    for (const field of sensitiveFields) {
        if (data[field] && typeof data[field] === 'string' && !data[field].includes(':')) {
            issues.push(`Field '${field}' may contain unencrypted sensitive data`);
        }
    }

    // Check for consent
    if (!data.consentGiven) {
        issues.push('User consent not recorded (GDPR/KVKK requirement)');
    }

    // Check for data retention policy
    if (!data.retentionDate) {
        issues.push('Data retention date not set (GDPR requirement)');
    }

    return {
        gdpr: issues.filter(i => i.includes('GDPR')).length === 0,
        hipaa: issues.filter(i => i.includes('encrypt')).length === 0,
        kvkk: issues.filter(i => i.includes('KVKK')).length === 0,
        issues,
    };
};

// ============================================
// DATA ANONYMIZATION (for analytics)
// ============================================
export const anonymizeData = (data: Record<string, any>): Record<string, any> => {
    const anonymized = { ...data };

    if (anonymized.name) anonymized.name = 'Anonymous User';
    if (anonymized.email) anonymized.email = 'anon@example.com';
    if (anonymized.phone) anonymized.phone = '+90-XXX-XXX-XXXX';
    if (anonymized.tcNo) anonymized.tcNo = 'XXXXXXXXXXX';
    if (anonymized.ip) anonymized.ip = 'XXX.XXX.XXX.XXX';

    return anonymized;
};

// ============================================
// AI RESPONSE VALIDATION (Medical Guardrails)
// ============================================
// ============================================
// AI RESPONSE VALIDATION (Medical Guardrails)
// ============================================
export const validateResponse = (text: string): { safe: boolean; reason?: string } => {
    const dangerousKeywords = [
        'reçete', 'ilaç yazıyorum', 'şu ilacı kullanın', 'tanınız şudur',
        'prescription', 'take this medication', 'your diagnosis is',
        'وصفة طبية', 'تناول هذا الدواء'
    ];

    for (const word of dangerousKeywords) {
        if (text.toLowerCase().includes(word.toLowerCase())) {
            return {
                safe: false,
                reason: 'AI attempted to give direct medical prescription/diagnosis.'
            };
        }
    }

    // Always append disclaimer if medical context is detected and not present
    // Note: This is a backup. The System Prompt should handle this, but code is the final guard.
    /* 
    const medicalTerms = ['implant', 'greft', 'operasyon', 'tedavi'];
    if (medicalTerms.some(t => text.toLowerCase().includes(t)) && !text.includes('ön değerlendirmedir')) {
        // We can optionally force append here, but better to let Prompt handle natural flow.
    }
    */

    return { safe: true };
};

// ============================================
// HASH GENERATION (for data integrity)
// ============================================
export const generateHash = (data: string): string => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export const verifyHash = (data: string, hash: string): boolean => {
    return generateHash(data) === hash;
};

// ============================================
// TOKEN GENERATION (for secure sessions)
// ============================================
export const generateSecureToken = (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex');
};

// ============================================
// MEDIA VAULT (KVKK/GDPR Compliant Encrypted Storage)
// ============================================
export interface EncryptedMedia {
    iv: string;
    authTag: string;
    data: string;
    mimeType: string;
}

/**
 * Encrypts a media buffer (e.g., patient photo) for secure vaulting.
 */
export const encryptMedia = (buffer: Buffer, mimeType: string): EncryptedMedia => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32).padEnd(32, '0'));
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex'),
        data: encrypted.toString('base64'),
        mimeType
    };
};

/**
 * Decrypts media from the vault for AI analysis or human review.
 */
export const decryptMedia = (vaultItem: EncryptedMedia): Buffer => {
    const iv = Buffer.from(vaultItem.iv, 'hex');
    const authTag = Buffer.from(vaultItem.authTag, 'hex');
    const key = Buffer.from(ENCRYPTION_KEY.slice(0, 32).padEnd(32, '0'));
    const encrypted = Buffer.from(vaultItem.data, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

// Legacy compatibility
export const encryptSensitiveData = encryptAES256;
export const decryptSensitiveData = decryptAES256;
