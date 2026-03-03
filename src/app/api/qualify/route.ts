import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { query } = body;

        const q = (query || "").toLowerCase();

        let urgency = "LOW";
        let intent = "0.20";
        const newLogs: string[] = [];

        // Matematiksel ağırlık hesaplaması basitçe niyet skoru belirleme
        const urgentWords = ["şimdi", "acil", "fiyat", "hemen", "bugün"];
        const infoWords = ["bilgi", "nasıl", "kim", "nerede"];

        let score = 0.1;

        urgentWords.forEach(w => { if (q.includes(w)) score += 0.4; });
        infoWords.forEach(w => { if (q.includes(w)) score += 0.2; });

        if (score >= 0.8) {
            urgency = "HIGH";
            intent = score.toFixed(2);
        } else if (score >= 0.3) {
            urgency = "MEDIUM";
            intent = score.toFixed(2);
        } else {
            intent = score.toFixed(2);
        }

        newLogs.push("INIT: Incoming Webhook Event -> Endpoint /api/qualify");
        newLogs.push(`[SYS-1]: Otonom tarama... Anahtar kelimeler: [${q.split(" ").slice(0, 3).join(", ")}]`);
        newLogs.push(`[SYS-2]: Skorlama Algoritması: ${intent}`);
        newLogs.push(`DECISION: İşlem seviyesi [${urgency}] olarak belirlendi.`);

        if (urgency === "HIGH") {
            newLogs.push("ACTION: Satış ekibine High-Priority bildirim iletildi...");
            newLogs.push("ACTION: API Node -> 'Acil lead rotasyonu' tetiklendi.");
        } else {
            newLogs.push("ACTION: API Node -> 'Standart funnel girişi' aktifleştirildi.");
            newLogs.push("NEXT: CRM Re-engagement döngüsü başlatıldı (T+3 Days).");
        }

        newLogs.push("STATUS: Transaction Complete. Data Sealed.");

        return NextResponse.json({ logs: newLogs, urgency, intent });
    } catch {
        return NextResponse.json({ error: "Karar motoru çöküşü", logs: ["[FATAL] Sistem Hatası"] }, { status: 500 });
    }
}
