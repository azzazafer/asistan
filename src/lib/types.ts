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
    phone_hash?: string;
    // 🔥 Neural Core v2.0 Fields
    pain_point_vault?: string[];
    anchor_value?: number;
    bias_analysis?: { emotional_fear: number; technical_barrier: number };
    cialdini_matrix?: {
        authority: number;
        reciprocity: number;
        scarcity: number;
        social_proof: number;
        liking: number;
        consistency: number;
    };
    suggested_strategy?: string;
    next_diagnostic_question?: string;
    closing_probability?: number;
    neural_status?: 'ACTIVE' | 'GHOSTED' | 'WON' | 'LOST';
}

