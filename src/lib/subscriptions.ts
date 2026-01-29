import { createClient } from '@supabase/supabase-js';
import { stripe, PackageType, PACKAGES } from './stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null as any;

export interface Subscription {
    id: string;
    tenant_id: string;
    stripe_customer_id: string;
    stripe_subscription_id: string;
    package_type: PackageType;
    status: 'active' | 'past_due' | 'canceled' | 'unpaid';
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    created_at: string;
    updated_at: string;
}

export interface Tenant {
    id: string;
    name: string;
    package_type: PackageType;
    status: 'active' | 'suspended' | 'inactive';
    settings: Record<string, any>;
    created_at: string;
    updated_at: string;
}

/**
 * Get subscription by tenant ID
 */
export async function getSubscriptionByTenant(tenantId: string): Promise<Subscription | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('tenant_id', tenantId)
        .single();

    if (error) {
        console.error('Error fetching subscription:', error);
        return null;
    }

    return data;
}

/**
 * Get tenant by ID
 */
export async function getTenant(tenantId: string): Promise<Tenant | null> {
    const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', tenantId)
        .single();

    if (error) {
        console.error('Error fetching tenant:', error);
        return null;
    }

    return data;
}

/**
 * Get all active tenants
 */
export async function getActiveTenants(): Promise<Tenant[]> {
    const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tenants:', error);
        return [];
    }

    return data || [];
}

/**
 * Check if tenant has active subscription
 */
export async function hasActiveSubscription(tenantId: string): Promise<boolean> {
    const subscription = await getSubscriptionByTenant(tenantId);
    return subscription?.status === 'active';
}

/**
 * Get subscription limits for tenant
 */
export async function getSubscriptionLimits(tenantId: string) {
    const subscription = await getSubscriptionByTenant(tenantId);

    if (!subscription) {
        return { leads: 0, locations: 0 };
    }

    const packageLimits = PACKAGES[subscription.package_type].limits;
    return packageLimits;
}

/**
 * Check if tenant can add more leads
 */
export async function canAddLead(tenantId: string): Promise<boolean> {
    const limits = await getSubscriptionLimits(tenantId);

    // Unlimited
    if (limits.leads === -1) {
        return true;
    }

    // Count current leads this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('tenant_id', tenantId)
        .gte('created_at', startOfMonth.toISOString());

    return (count || 0) < limits.leads;
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(tenantId: string): Promise<boolean> {
    const subscription = await getSubscriptionByTenant(tenantId);

    if (!subscription) {
        return false;
    }

    try {
        // Cancel at period end (don't immediately revoke access)
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
            cancel_at_period_end: true
        });

        // Update local record
        await supabase
            .from('subscriptions')
            .update({ cancel_at_period_end: true })
            .eq('id', subscription.id);

        return true;
    } catch (error) {
        console.error('Error canceling subscription:', error);
        return false;
    }
}

/**
 * Reactivate canceled subscription
 */
export async function reactivateSubscription(tenantId: string): Promise<boolean> {
    const subscription = await getSubscriptionByTenant(tenantId);

    if (!subscription) {
        return false;
    }

    try {
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
            cancel_at_period_end: false
        });

        await supabase
            .from('subscriptions')
            .update({ cancel_at_period_end: false })
            .eq('id', subscription.id);

        return true;
    } catch (error) {
        console.error('Error reactivating subscription:', error);
        return false;
    }
}

/**
 * Upgrade/Downgrade subscription
 */
export async function changeSubscriptionPlan(
    tenantId: string,
    newPackageType: PackageType
): Promise<boolean> {
    const subscription = await getSubscriptionByTenant(tenantId);

    if (!subscription || newPackageType === 'enterprise') {
        return false;
    }

    try {
        const newPriceId = PACKAGES[newPackageType].priceId;

        // Get current subscription from Stripe
        const stripeSubscription = await stripe.subscriptions.retrieve(
            subscription.stripe_subscription_id
        );

        // Update subscription
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
            items: [{
                id: stripeSubscription.items.data[0].id,
                price: newPriceId,
            }],
            proration_behavior: 'create_prorations', // Prorate the cost
        });

        // Update local records
        await supabase
            .from('subscriptions')
            .update({ package_type: newPackageType })
            .eq('id', subscription.id);

        await supabase
            .from('tenants')
            .update({ package_type: newPackageType })
            .eq('id', tenantId);

        return true;
    } catch (error) {
        console.error('Error changing subscription plan:', error);
        return false;
    }
}
