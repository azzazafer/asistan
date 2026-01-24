/**
 * Aura Security Middleware
 * Integrates Shield protection with Next.js API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    validateRequest,
    checkBruteForce,
    resetBruteForce,
    checkCircuitBreaker,
    recordCircuitFailure,
    recordCircuitSuccess,
    sanitizeXSS,
    getSecurityDashboard,
} from './shield';

// ============================================
// TYPES
// ============================================
export interface SecureRequestContext {
    ip: string;
    userAgent: string;
    path: string;
    method: string;
    isAuthenticated: boolean;
    userId?: string;
}

export interface SecureResponse {
    success: boolean;
    data?: any;
    error?: string;
    statusCode: number;
}

// ============================================
// IP EXTRACTION
// ============================================
export const getClientIP = (request: NextRequest): string => {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnecting = request.headers.get('cf-connecting-ip');

    if (cfConnecting) return cfConnecting;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();

    return '127.0.0.1';
};

// ============================================
// SECURE API WRAPPER
// ============================================
export const withShield = (
    handler: (request: NextRequest, context: SecureRequestContext) => Promise<Response>,
    options: {
        requireAuth?: boolean;
        serviceName?: string;
        rateLimitOverride?: { maxRequests: number; windowMs: number };
    } = {}
) => {
    return async (request: NextRequest): Promise<Response> => {
        const ip = getClientIP(request);
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const path = request.nextUrl.pathname;
        const method = request.method;

        // Create context
        const context: SecureRequestContext = {
            ip,
            userAgent,
            path,
            method,
            isAuthenticated: false, // Will be set by auth middleware
        };

        try {
            // Validate request through Shield
            const validation = validateRequest(ip, method, path, userAgent);

            if (!validation.valid) {
                console.log(`[Middleware] Request blocked: ${validation.error}`);
                return NextResponse.json(
                    { error: validation.error, blocked: true },
                    { status: 403 }
                );
            }

            // Check circuit breaker for service
            if (options.serviceName) {
                if (!checkCircuitBreaker(options.serviceName)) {
                    return NextResponse.json(
                        { error: 'Service temporarily unavailable', retry: true },
                        { status: 503 }
                    );
                }
            }

            // Execute handler
            const response = await handler(request, context);

            // Record success for circuit breaker
            if (options.serviceName) {
                recordCircuitSuccess(options.serviceName);
            }

            return response;

        } catch (error) {
            // Record failure for circuit breaker
            if (options.serviceName) {
                recordCircuitFailure(options.serviceName);
            }

            console.error(`[Middleware] Handler error:`, error);

            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    };
};

// ============================================
// LOGIN PROTECTION
// ============================================
export const withLoginProtection = (
    handler: (request: NextRequest, context: SecureRequestContext) => Promise<Response>
) => {
    return async (request: NextRequest): Promise<Response> => {
        const ip = getClientIP(request);
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Check brute force protection
        const bruteForceCheck = checkBruteForce('login', ip);

        if (!bruteForceCheck.allowed) {
            const lockedUntil = bruteForceCheck.lockedUntil
                ? new Date(bruteForceCheck.lockedUntil).toISOString()
                : undefined;

            return NextResponse.json(
                {
                    error: 'Too many login attempts. Account temporarily locked.',
                    lockedUntil,
                    attemptsLeft: 0,
                },
                { status: 429 }
            );
        }

        const context: SecureRequestContext = {
            ip,
            userAgent,
            path: request.nextUrl.pathname,
            method: request.method,
            isAuthenticated: false,
        };

        const response = await handler(request, context);

        // If login successful, reset brute force counter
        if (response.status === 200) {
            resetBruteForce('login', ip);
        }

        return response;
    };
};

// ============================================
// SECURITY HEADERS
// ============================================
export const addSecurityHeaders = (response: NextResponse): NextResponse => {
    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS filter
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Content Security Policy
    response.headers.set('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://api.openai.com wss:; " +
        "media-src 'self' https://archive.org https://www.soundhelix.com; " + // Allowed audio sources
        "frame-ancestors 'none';"
    );

    // Strict Transport Security (HTTPS only)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // Permissions Policy
    response.headers.set('Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), payment=()'
    );

    return response;
};

// ============================================
// INPUT SANITIZATION HELPER
// ============================================
export const sanitizeInput = (input: any, ip: string): any => {
    if (typeof input === 'string') {
        return sanitizeXSS(input, ip).sanitized;
    }

    if (Array.isArray(input)) {
        return input.map(item => sanitizeInput(item, ip));
    }

    if (typeof input === 'object' && input !== null) {
        const sanitized: Record<string, any> = {};
        for (const [key, value] of Object.entries(input)) {
            sanitized[key] = sanitizeInput(value, ip);
        }
        return sanitized;
    }

    return input;
};

// ============================================
// HEALTH CHECK ENDPOINT DATA
// ============================================
export const getHealthCheckData = (): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    security: ReturnType<typeof getSecurityDashboard>;
    timestamp: string;
} => {
    const security = getSecurityDashboard();

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (security.threatLevel === 'critical') status = 'unhealthy';
    else if (security.threatLevel === 'high') status = 'degraded';

    return {
        status,
        security,
        timestamp: new Date().toISOString(),
    };
};
