import { supabase } from './db';

export interface Agent {
    id: string;
    name: string;
    referral_code: string;
    commission_rate: number;
    status: string;
}

export const getAgentByCode = async (code: string): Promise<Agent | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('referral_code', code.toUpperCase())
        .eq('status', 'active')
        .maybeSingle();

    if (error) {
        console.error("[Agents] Error fetching agent by code:", error.message);
        return null;
    }

    return data;
};

export const getAgentStats = async (agentId: string) => {
    if (!supabase) return { totalLeads: 0, activeLeads: 0, pendingCommissions: 0, totalEarnings: 0 };

    // 1. Get total directed leads
    const { count: leadCount, error: leadError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', agentId);

    // 2. Get commission stats
    const { data: commissions, error: commissionError } = await supabase
        .from('commissions')
        .select('amount_commission, status')
        .eq('agent_id', agentId);

    // 3. Get active leads (leads not archived or completed)
    const { count: activeCount, error: activeError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', agentId)
        .not('status', 'in', '("Tamamlandı","Arşivlendi")');

    if (leadError || commissionError || activeError) {
        console.error("[Agents] Error fetching stats:", leadError || commissionError || activeError);
    }

    const pending = commissions
        ?.filter((c: any) => c.status === 'pending')
        .reduce((sum: number, c: any) => sum + Number(c.amount_commission), 0) || 0;

    const total = commissions
        ?.filter((c: any) => c.status === 'paid')
        .reduce((sum: number, c: any) => sum + Number(c.amount_commission), 0) || 0;

    return {
        totalLeads: leadCount || 0,
        activeLeads: activeCount || 0,
        pendingCommissions: pending,
        totalEarnings: total
    };
};

export const getAgentLeads = async (agentId: string) => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('agent_id', agentId)
        .order('date', { ascending: false });

    if (error) {
        console.error("[Agents] Error fetching leads:", error.message);
        return [];
    }
    return data || [];
};

export const getAgentCommissions = async (agentId: string) => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("[Agents] Error fetching commissions:", error.message);
        return [];
    }
    return data || [];
};

export const recordCommission = async (
    agentId: string,
    leadId: string,
    amountTotal: number,
    commissionRate: number,
    currency: string = 'EUR'
) => {
    if (!supabase) return null;

    const commissionAmount = amountTotal * commissionRate;

    const { data, error } = await supabase
        .from('commissions')
        .insert({
            agent_id: agentId,
            lead_id: leadId,
            amount_total: amountTotal,
            amount_commission: commissionAmount,
            currency: currency,
            status: 'pending',
            created_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error("[Agents] Error recording commission:", error.message);
        return null;
    }

    return data;
};

export const getAgentRecentMessages = async (agentId: string, limit: number = 5) => {
    if (!supabase) return [];

    // 1. Get agent's leads (specifically their phones to match patient_id)
    const { data: leads } = await supabase
        .from('leads')
        .select('phone')
        .eq('agent_id', agentId);

    if (!leads || leads.length === 0) return [];

    const phones = leads.map((l: any) => l.phone);

    // 2. Fetch recent messages
    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .in('patient_id', phones)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("[Agents] Error fetching recent messages:", error.message);
        return [];
    }

    return messages;
};

export const getAvailableAuctions = async () => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('auctions')
        .select(`
            *,
            leads (
                name,
                treatment,
                culture
            )
        `)
        .eq('status', 'active')
        .gt('expires_at', new Date().toISOString());

    if (error) {
        console.error("[Agents] Error fetching auctions:", error.message);
        return [];
    }

    return data;
};

export const claimAuction = async (auctionId: string, agentId: string) => {
    if (!supabase) return false;

    // Use RPC or transaction if available, but for now simple update with check
    const { error } = await supabase
        .from('auctions')
        .update({
            status: 'claimed',
            winner_agent_id: agentId,
            claimed_at: new Date().toISOString()
        })
        .eq('id', auctionId)
        .eq('status', 'active');

    if (error) {
        console.error("[Agents] Error claiming auction:", error.message);
        return false;
    }

    return true;
};


