import { supabase } from '../db';
import { logAudit } from '../security';

export interface Auction {
    id: string;
    lead_id: string;
    min_price: number;
    status: 'active' | 'claimed' | 'expired' | 'cancelled';
    expires_at: string;
    winner_agent_id?: string;
}

export class AuctionEngine {
    /**
     * Publishes a high-value lead to the Market Network auction
     */
    static async publishToAuction(leadId: string, minPrice: number = 0) {
        if (!supabase) return null;

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const { data, error } = await supabase
            .from('auctions')
            .insert({
                lead_id: leadId,
                min_price: minPrice,
                status: 'active',
                expires_at: expiresAt.toISOString(),
                tenant_id: 'default_clinic' // Should be dynamic in full SaaS
            })
            .select()
            .single();

        if (error) {
            console.error('[AuctionEngine] Publish Failure:', error.message);
            return null;
        }

        await logAudit({
            action: 'LEAD_AUCTION_PUBLISHED',
            userId: 'SYSTEM',
            resource: `Lead:${leadId}`,
            details: `Lead published to auction with min price ${minPrice}`,
            clearance: 'ADMIN'
        });

        // Trigger notifications would go here (e.g., WhatsApp to all active agents)
        return data as Auction;
    }

    /**
     * Agent claims a lead from the auction (Fastest Finger First)
     */
    static async claimLead(auctionId: string, agentId: string) {
        if (!supabase) return { success: false, message: 'Database offline' };

        // Transactional update to prevent double-claiming
        const { data: auction, error: fetchError } = await supabase
            .from('auctions')
            .select('*')
            .eq('id', auctionId)
            .single();

        if (fetchError || !auction) return { success: false, message: 'Auction not found' };
        if (auction.status !== 'active') return { success: false, message: 'Auction already closed' };

        const { error: updateError } = await supabase
            .from('auctions')
            .update({
                status: 'claimed',
                winner_agent_id: agentId,
                claimed_at: new Date().toISOString()
            })
            .eq('id', auctionId)
            .eq('status', 'active'); // Double check lock

        if (updateError) {
            return { success: false, message: 'Failed to claim lead. Possibly already taken.' };
        }

        // Assign agent to lead
        await supabase
            .from('leads')
            .update({ agent_id: agentId })
            .eq('id', auction.lead_id);

        await logAudit({
            action: 'LEAD_AUCTION_CLAIMED',
            userId: agentId,
            resource: `Auction:${auctionId}`,
            details: `Lead claimed by agent ${agentId}`,
            clearance: 'ADMIN'
        });

        return { success: true, message: 'Lead successfully claimed!' };
    }

    /**
     * Lists active auctions for the Market Network
     */
    static async getAvailableAuctions() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('auctions')
            .select('*, leads(*)')
            .eq('status', 'active')
            .gt('expires_at', new Date().toISOString());

        return error ? [] : data;
    }
}
