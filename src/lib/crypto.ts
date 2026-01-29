import crypto from 'crypto';

/**
 * Aura Field-Level Encryption Utility (AES-256-GCM)
 * Used for securing PII (Name, Phone, Email) at the application layer.
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 32;

// The ENCRYPTION_KEY must be a 32-byte hex string (64 characters)
const ENCRYPTION_SECRET = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_SECRET || ENCRYPTION_SECRET.length !== 64) {
    console.warn('⚠️ [Aura Crypto] ENCRYPTION_KEY is missing or invalid. Encryption will fail if called.');
}

const key = ENCRYPTION_SECRET
    ? Buffer.from(ENCRYPTION_SECRET, 'hex')
    : crypto.scryptSync('development-secret', 'salt', 32);

/**
 * Encrypts a string using AES-256-GCM.
 * Returns a colon-separated string: v1:iv:authTag:encryptedContent
 */
export function encrypt(text: string): string {
    if (!text) return text;

    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        // Prefix with v1 for future-proofing / key rotation support
        return `v1:${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
        console.error("[Crypto] Encryption failed. Reason: Operation interrupted.");
        throw new Error("Encryption failed.");
    }
}

/**
 * Decrypts a colon-separated AES-256-GCM string with version checking.
 */
export function decrypt(encryptedData: string): string {
    if (!encryptedData || !encryptedData.includes(':')) return encryptedData;

    try {
        const parts = encryptedData.split(':');

        // v1 Support
        if (parts[0] === 'v1') {
            const [, ivHex, authTagHex, encryptedHex] = parts;
            const iv = Buffer.from(ivHex, 'hex');
            const authTag = Buffer.from(authTagHex, 'hex');
            const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

            decipher.setAuthTag(authTag);

            let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        }

        // Default / No-version support (Legacy compatibility check)
        // In strict production, we should only support v1+
        return encryptedData;

    } catch (error) {
        // SECURE ERROR LOGGING: Never log the data or the error object if it contains data
        console.error("[Crypto] Decryption failed. Reason: Authentication tag mismatch or corrupt payload.");
        return "[DECRYPTION_FAILED]";
    }
}
