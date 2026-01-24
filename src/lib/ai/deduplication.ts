import { supabase } from '../db';
import { Lead } from '../types';

/**
 * Conflict Resolver (Identity Linker)
 * Detects if a user is contacting from a new channel and merges their identity.
 */
export class ConflictResolver {

    /**
     * Attempts to find an existing lead that matches the new contact info.
     * Strategy: Match by Email, Full Name (Fuzzy), or Metadata.
     */
    static async resolveContact(newContactId: string, source: string, name?: string, email?: string): Promise<string | null> {
        if (!supabase) return null;

        console.log(`[Identity] Resolving identity for ${name || 'Unknown'} (${source})...`);

        // 1. Primary Match: Email (High Confidence)
        if (email) {
            const { data } = await supabase.from('leads').select('phone').eq('email', email).maybeSingle();
            if (data) {
                console.log(`[Identity] Match found via EMAIL: ${data.phone}`);
                return data.phone;
            }
        }

        // 2. Secondary Match: Name & Treatment (Medium Confidence)
        if (name && name.length > 5) {
            const { data } = await supabase
                .from('leads')
                .select('phone, name')
                .ilike('name', `%${name}%`)
                .order('date', { ascending: false })
                .limit(1);

            if (data && data.length > 0) {
                console.log(`[Identity] Potential fuzzy match found via NAME: ${data[0].phone}`);
                // In production, we might trigger a verification check here
                return data[0].phone;
            }
        }

        return null; // Unique user
    }

    /**
     * Merges history and scores from one lead to another.
     */
    static async mergeLeads(primaryPhone: string, secondaryId: string) {
        console.log(`[Identity] Merging ${secondaryId} into ${primaryPhone}...`);
        // Logic to move messages/metadata would go here
    }
}
