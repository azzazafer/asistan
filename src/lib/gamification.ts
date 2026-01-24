export type SubjectRank = 'S' | 'A' | 'B' | 'C';

export interface GamificationStats {
    rank: SubjectRank;
    score: number;
    engagementLevel: number; // 0-100
}

export const calculateRank = (score: number): SubjectRank => {
    if (score >= 90) return 'S';
    if (score >= 70) return 'A';
    if (score >= 40) return 'B';
    return 'C';
};

export const getRankColor = (rank: SubjectRank): string => {
    switch (rank) {
        case 'S': return 'text-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_15px_rgba(255,215,0,0.3)]'; // Gold VIP
        case 'A': return 'text-rose-500 bg-rose-500/10'; // High Intent
        case 'B': return 'text-amber-500 bg-amber-500/10'; // Nurture
        case 'C': return 'text-slate-400 bg-slate-400/10'; // Discovery
        default: return 'text-slate-400 bg-slate-400/10';
    }
};

export const getRankLabel = (rank: SubjectRank): string => {
    switch (rank) {
        case 'S': return 'Neural VIP (S-Rank)';
        case 'A': return 'Active Target';
        case 'B': return 'Building Interest';
        case 'C': return 'Cold / Curious';
        default: return 'Subject Detected';
    }
};
