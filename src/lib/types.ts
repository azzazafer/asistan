export type SubjectRank = 'S' | 'A' | 'B' | 'C';

export interface Lead {
    id?: string;
    tenant_id: string;
    name: string;
    phone: string;
    email?: string;
    status: 'Beklemede' | 'İletişime Geçildi' | 'Randevu Alındı' | 'Randevu Onaylandı' | 'Ödeme Bekliyor' | 'Tedavi Tamamlandı' | 'İptal';
    treatment: string;
    source: string;
    channel: 'WhatsApp' | 'Instagram' | 'Telegram' | 'Web';
    date: string;
    score?: number;
    score_rank?: SubjectRank;
    rank?: SubjectRank;
    culture?: string;
    agent_id?: string;
    attribution_source?: string;
    is_referral?: boolean;
    last_message?: string;
    history?: Array<{ role: string; content: string; timestamp: string }>;
    summary?: string;
    ai_paused?: boolean;
    last_message_at?: string;
}
