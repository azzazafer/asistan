/**
 * Aura Rate Limiter v1.0
 * Simple in-memory rate limiting to protect OpenAI API wallet and prevent DDoS.
 */

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};
const REQUEST_LIMIT = 20; // Max requests
const WINDOW_MS = 60 * 1000; // per 1 minute

export const checkRateLimit = (identifier: string): { allowed: boolean; remaining: number } => {
    const now = Date.now();

    if (!store[identifier] || now > store[identifier].resetTime) {
        store[identifier] = {
            count: 0,
            resetTime: now + WINDOW_MS
        };
    }

    store[identifier].count++;

    if (store[identifier].count > REQUEST_LIMIT) {
        return {
            allowed: false,
            remaining: 0
        };
    }

    return {
        allowed: true,
        remaining: REQUEST_LIMIT - store[identifier].count
    };
};
