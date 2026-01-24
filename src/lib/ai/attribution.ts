import { supabase, getAgentByCode } from '@/lib/db';

export class AttributionService {
    /**
     * Mesajın içinde bir acente kodu olup olmadığını kontrol eder.
     * Eğer varsa, kullanıcı profilini bu acenteye bağlar.
     */
    static async detectAndLinkAgent(userId: string, content: string): Promise<string | null> {
        if (!content || !supabase) return null;

        // Örnek: "Merhaba ZAFER2026", "Bilgi almak istiyorum KOD123"
        // Regex: 4-10 karakter arası, sadece harf ve rakamdan oluşan büyük harf kelimeleri ara
        const potentialCodes = content.match(/[A-Z0-9]{4,12}/g);

        if (!potentialCodes) return null;

        for (const code of potentialCodes) {
            const agent = await getAgentByCode(code);
            if (agent) {
                console.log(`[Attribution] Agent ${agent.name} (${code}) detected for user ${userId}`);

                // Kullanıcı profilini güncelle (Metadata olarak sakla)
                await supabase.from('profiles').update({
                    metadata: { agent_id: agent.id, attribution_source: 'referral_code', attributed_at: new Date().toISOString() }
                }).eq('id', userId);

                return agent.id;
            }
        }

        return null;
    }

    /**
     * Kullanıcının halihazırda bağlı olduğu bir acente olup olmadığını kontrol eder.
     */
    static async getLinkedAgentId(userId: string): Promise<string | null> {
        if (!supabase) return null;
        const { data } = await supabase.from('profiles').select('metadata').eq('id', userId).single();
        return data?.metadata?.agent_id || null;
    }
}
