import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { validateRequest } from '@/lib/shield'

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const path = request.nextUrl.pathname;
    const method = request.method;

    // 0. Global Security Shield Validation
    const security = validateRequest(ip, method, path, userAgent);
    if (!security.valid) {
        return new NextResponse(JSON.stringify({ error: security.error }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Safe Supabase Init for Mock/Local Mode
    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    // Validation: If URL is placeholder text or invalid, use dummy HTTPS URL
    if (!supabaseUrl.startsWith('http')) {
        supabaseUrl = 'https://placeholder.supabase.co';
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
                },
            },
        }
    )

    // [NEW] 0. Multi-Tenant / White-Label Detection
    const host = request.headers.get('host') || '';
    let tenantId = 'default_clinic';

    if (host.includes('.auraos.com') || host.includes('getauraos.com')) {
        tenantId = host.split('.')[0];
        // If it's the root domain, default to master clinic or landing page
        if (tenantId === 'getauraos' || tenantId === 'auraos') tenantId = 'default_clinic';
    } else if (!host.includes('localhost') && !host.includes('vercel.app')) {
        // Custom domain lookup (Pseudo-code for Phase 6 realization)
        // In production, we'd query DB or Edge Config for host -> tenantId map
        tenantId = 'custom_tenant';
    }

    response.headers.set('x-aura-tenant-id', tenantId);

    // [NEW] 0. Referral Code Detection (Phase 3)
    const refCode = request.nextUrl.searchParams.get('ref') || request.nextUrl.searchParams.get('agent');
    if (refCode) {
        console.log(`[Middleware] Referral detected: ${refCode}`);
        response.cookies.set('aura_ref_code', refCode, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
            httpOnly: false, // Accessible by client if needed
            sameSite: 'lax'
        });
    }

    // 1. Refresh Auth Token
    const { data: { user } } = await supabase.auth.getUser()

    // 2. Protect /dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // BYPASS: Eğer 'aura_demo_session' cookie'si varsa, Supabase kontrolünü atla.
        const hasDemoCookie = request.cookies.get('aura_demo_session');

        if (!user && !hasDemoCookie) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // 3. SaaS Subscription Lock
        // Check if the tenant associated with this user is active
        try {
            // Assume 'tenant_id' is in user_metadata OR we query the profile.
            // For Phase 6, we'll check the 'tenants' table via the owner_id or joined profile
            // Optimally: user.app_metadata.tenant_id (if set up).
            // Fallback: Query 'tenants' where owner_id = user.id (Simple 1-to-1)

            const { data: tenant } = await supabase
                .from('tenants')
                .select('status')
                .eq('owner_id', user.id)
                .single()

            if (tenant && tenant.status !== 'active') {
                return NextResponse.redirect(new URL('/payment-locked', request.url))
            }

        } catch (e) {
            // Allow access if check fails (Fail Open) or Block (Fail Closed).
            // For Production: Fail Closed. For Dev: Fail Open.
            console.error('[Middleware] SaaS Check Error', e)
        }
    }

    // 4. Protect Agent Portal Subpages
    if (request.nextUrl.pathname.startsWith('/agent/') && request.nextUrl.pathname !== '/agent') {
        // Agent pages should probably be protected too.
        // For now, let's look for an agent session or ref code
        const hasAgentSession = request.cookies.get('aura_agent_session');
        if (!hasAgentSession && !user) {
            return NextResponse.redirect(new URL('/agent', request.url))
        }
    }

    // 5. Patient Portal Session Hardening (Phase 4)
    if (request.nextUrl.pathname.startsWith('/portal') && request.nextUrl.pathname !== '/portal') {
        const patientSession = request.cookies.get('patient_session');
        if (!patientSession) {
            return NextResponse.redirect(new URL('/portal', request.url))
        }
    }

    // 6. Protect /super-admin
    if (request.nextUrl.pathname.startsWith('/super-admin')) {
        // Simple Email Gate
        if (!user?.email?.includes('admin')) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/super-admin/:path*',
        '/payment-locked',
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
