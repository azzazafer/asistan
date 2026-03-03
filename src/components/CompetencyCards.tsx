"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

// ─── Dashboard Preview Definitions ───────────────────────────────────────────
const DASHBOARD_PREVIEWS: Record<string, {
    title: string; badge: string; badgeColor: string;
    image?: string; // /public path
    description: string; metrics: { label: string; value: string; color: string }[];
    verdict: string;
}> = {
    "kurtarma": {
        title: "Kurtarma Masası",
        badge: "RANDEVU KURTARMA",
        badgeColor: "#00ff88",
        image: "/kurtarma-masasi.png",
        description: "AI destekli no-show tespit ve otomatik hasta geri çağırma modülü. Kaçan her randevuyu gelire çevirir.",
        metrics: [
            { label: "Bu ay kurtarılan gelir", value: "₺32.000", color: "#00ff88" },
            { label: "No-show oranı düşüşü", value: "-%71", color: "#3b82f6" },
            { label: "Ortalama geri dönüş süresi", value: "4.2 saat", color: "#ffd700" },
            { label: "Aylık kurtarılan randevu", value: "38 adet", color: "#ff00ff" },
        ],
        verdict: "✓ Dr. Ahmet'in kliniği bu modülle ilk ayda ₺32.000 geri kazandı.",
    },
    "nexscan": {
        title: "Nex-Scan™ Teşhis Paneli",
        badge: "AI DİAGNOSTİK",
        badgeColor: "#00ffff",
        image: "/nexscan-triage.png",
        description: "Panoramik X-ray analizi, otonom triaj ve hasta önceliklendirme. 9 saniyede otonom tanı.",
        metrics: [
            { label: "Teşhis süresi", value: "9 saniye", color: "#00ffff" },
            { label: "Doğruluk oranı", value: "%97.3", color: "#00ff88" },
            { label: "Triaj kapasitesi", value: "340 hasta/gün", color: "#ffd700" },
            { label: "Kaçırılan tanı", value: "0 (Sıfır)", color: "#ff00ff" },
        ],
        verdict: "✓ Nex-Scan™ klinik başına yılda 12 kritik tanıyı erken yakalıyor.",
    },
    "istihbarat": {
        title: "Global İstihbarat Merkezi",
        badge: "SAĞLIK TURİZMİ",
        badgeColor: "#ff00ff",
        image: "/istihbarat-merkezi.png",
        description: "Avrupa ve Körfez'den hasta akışı yönetimi. 12 ülke, 4 dil, %840 ROAS ile küresel klinik operasyonu.",
        metrics: [
            { label: "Reklam getirim çarpanı (ROAS)", value: "%840", color: "#ff00ff" },
            { label: "Aktif hasta pazarı", value: "12 ülke", color: "#3b82f6" },
            { label: "Ortalama paket değeri", value: "€2.400", color: "#ffd700" },
            { label: "Dönüşüm oranı", value: "%34", color: "#00ff88" },
        ],
        verdict: "✓ İstanbul'lu klinik DE+NL+GB pazarını açarak aylık €47.000 ek ciro elde etti.",
    },
    "roi-engine": {
        title: "ROI & σ_noise Motoru",
        badge: "SOVEREIGN ANALYTICS",
        badgeColor: "#ffd700",
        description: "Deterministik Madde 7 protokolü. Klinik kararlarını matematik ile mühürler. σ_noise < 0.1 = maksimum ROI.",
        metrics: [
            { label: "σ_noise değeri", value: "< 0.003", color: "#00ffff" },
            { label: "Net kâr artış hızı", value: "+₺43.200/ay", color: "#ffd700" },
            { label: "Yatırım geri dönüşü", value: "4.2 ay", color: "#00ff88" },
            { label: "Deterministik doğruluk", value: "%99.7", color: "#3b82f6" },
        ],
        verdict: "✓ Sovereign Verdict: Klinik ROI'nizi sıfır gürültüyle hesaplıyor.",
    },
    "kvkk": {
        title: "KVKK & JWE Güvenlik Merkezi",
        badge: "GÜVENLİK",
        badgeColor: "#8b00ff",
        description: "JWE-RS256 şifreleme, KVKK ve GDPR tam uyum. Hasta verisi 0 ihlal, 99.97% uptime.",
        metrics: [
            { label: "Şifreleme standardı", value: "JWE-RS256", color: "#8b00ff" },
            { label: "KVKK uyumluluk skoru", value: "A++ (100/100)", color: "#00ff88" },
            { label: "Uptime garantisi", value: "%99.97", color: "#3b82f6" },
            { label: "Veri ihlali", value: "0 (Sıfır)", color: "#00ff88" },
        ],
        verdict: "✓ Denetim döneminizde A++ sertifikası garantili.",
    },
    "alpha": {
        title: "Alpha Command Center",
        badge: "MERKEZ YÖNETİM",
        badgeColor: "#3b82f6",
        description: "Klinik operasyonlarının tamamını tek ekrandan yöneten ana komuta merkezi.",
        metrics: [
            { label: "Gerçek zamanlı görünürlük", value: "%100", color: "#3b82f6" },
            { label: "Karar süresi", value: "< 30 saniye", color: "#00ff88" },
            { label: "Personel verimliliği", value: "+%73", color: "#ffd700" },
            { label: "Manuel iş azalması", value: "-%68", color: "#ff00ff" },
        ],
        verdict: "✓ Tüm klinik operasyonları tek panelde. Gözden kaçan sıfır.",
    },
};

// ─── 60 Competency Cards ──────────────────────────────────────────────────────
type Competency = {
    id: string; icon: string; title: string; category: string;
    dashboardId: string; featured?: boolean; featuredBadge?: string; featuredColor?: string;
    doctorLabel: string; patientLabel: string;
    metric: string; metricColor: string;
};

const COMPETENCIES: Competency[] = [
    // FEATURED CARDS (top 3 — linked to dashboard previews with images)
    { id: "c1", icon: "🚨", title: "Randevu Kaçağı Analizi", category: "Yönetim", dashboardId: "kurtarma", featured: true, featuredBadge: "₺32K/AY KURTARILDI", featuredColor: "#00ff88", doctorLabel: "No-show önleme + otomatik geri çağırma", patientLabel: "Randevunuz hiç kaçmaz", metric: "-%71 no-show", metricColor: "#00ff88" },
    { id: "c2", icon: "🔬", title: "Nex-Scan™ Triage", category: "Analiz", dashboardId: "nexscan", featured: true, featuredBadge: "9 SANİYE TARAMA", featuredColor: "#00ffff", doctorLabel: "AI panoramik teşhis + otonom triaj", patientLabel: "AI destekli hassas teşhis", metric: "%97.3 doğruluk", metricColor: "#00ffff" },
    { id: "c3", icon: "🌍", title: "Global Sağlık Turizmi", category: "Dijital", dashboardId: "istihbarat", featured: true, featuredBadge: "%840 ROAS", featuredColor: "#ff00ff", doctorLabel: "12 ülke hasta akışı + €2.400 paket", patientLabel: "Türkiye'de premium tedavi", metric: "12 ülke aktif", metricColor: "#ff00ff" },

    // OPERASYON
    { id: "c4", icon: "📅", title: "Akıllı Randevu Planlaması", category: "Yönetim", dashboardId: "alpha", doctorLabel: "AI destekli doluluk optimizasyonu", patientLabel: "Online randevu, anında onay", metric: "%96 doluluk", metricColor: "#00ff88" },
    { id: "c5", icon: "💰", title: "Net Kâr Artış Hızı", category: "Finans", dashboardId: "roi-engine", doctorLabel: "Ciro sızıntısı tespiti + kâr artışı", patientLabel: "Şeffaf fiyat politikası", metric: "+₺43.200/ay", metricColor: "#ffd700" },
    { id: "c6", icon: "🧾", title: "Otonom Fatura Sistemi", category: "Finans", dashboardId: "alpha", doctorLabel: "E-fatura + SGK entegrasyonu otomatik", patientLabel: "Anlık fatura ve dekont", metric: "-%100 manuel", metricColor: "#3b82f6" },
    { id: "c7", icon: "📊", title: "Hasta Akış Analizi", category: "Analiz", dashboardId: "kurtarma", doctorLabel: "Hasta yolculuğu haritası ve optimizasyon", patientLabel: "Sıra bekleme süreniz sıfıra yakın", metric: "Akış -%40 bekleme", metricColor: "#00ff88" },
    { id: "c8", icon: "💬", title: "WhatsApp Otomasyon", category: "İletişim", dashboardId: "alpha", doctorLabel: "Randevu hatırlatma + sonuç bildirimi otomatik", patientLabel: "WhatsApp ile hızlı iletişim", metric: "+%43 geri dönüş", metricColor: "#25d366" },
    { id: "c9", icon: "📱", title: "Mobil Klinik Yönetimi", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Telefona bağlı klinik monitörü", patientLabel: "Tedavi takibi cep telefonundan", metric: "7/24 erişim", metricColor: "#3b82f6" },
    { id: "c10", icon: "🔒", title: "KVKK Uyumluluk Motoru", category: "Güvenlik", dashboardId: "kvkk", doctorLabel: "Otomatik uyumluluk + denetim hazırlığı", patientLabel: "Verileriniz tam güvende", metric: "A++ sertifika", metricColor: "#8b00ff" },
    { id: "c11", icon: "📋", title: "Dijital Anamnez", category: "Kalite", dashboardId: "alpha", doctorLabel: "QR kodlu hasta formu + e-imza", patientLabel: "Kağıt form doldurmayın", metric: "-12 dakika", metricColor: "#00ff88" },
    { id: "c12", icon: "💊", title: "İlaç Uyarı Sistemi", category: "Kalite", dashboardId: "nexscan", doctorLabel: "İlaç etkileşim ve alerji uyarısı AI", patientLabel: "İlaç güvenliği AI'le korunuyor", metric: "%99.9 güvenli", metricColor: "#ffd700" },
    { id: "c13", icon: "📈", title: "Dönemsel Kâr Raporu", category: "Finans", dashboardId: "roi-engine", doctorLabel: "Aylık/çeyreklik kâr analizi otomatik", patientLabel: "—", metric: "Otomatik rapor", metricColor: "#ffd700" },
    { id: "c14", icon: "🎯", title: "Hasta Segmentasyonu", category: "CRM", dashboardId: "istihbarat", doctorLabel: "Hasta demografisi + gelir segmenti analizi", patientLabel: "Sizin için kişisel tedavi planı", metric: "5 segment", metricColor: "#ff00ff" },
    { id: "c15", icon: "🔔", title: "Takip Protokolü", category: "CRM", dashboardId: "kurtarma", doctorLabel: "Tedavi sonrası otonom takip SMS/WhatsApp", patientLabel: "Tedavi sonrası sizi takip ediyoruz", metric: "+%43 geri dönüş", metricColor: "#00ff88" },
    { id: "c16", icon: "⚡", title: "Gerçek Zamanlı Doluluk", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Canlı randevu doluluk monitörü", patientLabel: "Müsait saatleri anında görün", metric: "Canlı güncelleme", metricColor: "#ffd700" },
    { id: "c17", icon: "🌐", title: "Çok Dilli CRM", category: "Dijital", dashboardId: "istihbarat", doctorLabel: "TR/EN/DE/AR 4 dil otomatik koordinasyon", patientLabel: "Kendi dilinizde hizmet", metric: "4 dil", metricColor: "#3b82f6" },
    { id: "c18", icon: "🏥", title: "Klinik Zincir Yönetimi", category: "Kurumsal", dashboardId: "alpha", doctorLabel: "Çoklu şube merkezi yönetim paneli", patientLabel: "—", metric: "Tüm şubeler tek ekran", metricColor: "#ff00ff" },
    { id: "c19", icon: "🧠", title: "AI Tedavi Önerisi", category: "Kalite", dashboardId: "nexscan", doctorLabel: "Vaka bazlı AI destekli tedavi protokolü", patientLabel: "Evidence-based tedavi planı", metric: "%91 uyum oranı", metricColor: "#00ffff" },
    { id: "c20", icon: "📦", title: "Stok ve Sarf Takibi", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Malzeme tüketimi + otomatik sipariş", patientLabel: "—", metric: "-%23 stok maliyeti", metricColor: "#00ff88" },
    { id: "c21", icon: "💎", title: "VIP Hasta Protokolü", category: "CRM", dashboardId: "kurtarma", doctorLabel: "Üst segment hasta döstobu + özel arama", patientLabel: "Öncelikli randevu ve hizmet", metric: "+%62 tekrar hasta", metricColor: "#ffd700" },
    { id: "c22", icon: "📣", title: "Pazarlama Otomasyonu", category: "Pazarlama", dashboardId: "istihbarat", doctorLabel: "Otomatik kampanya + hasta segmenti", patientLabel: "Özel kampanya teklifleri", metric: "%840 ROAS", metricColor: "#ff00ff" },
    { id: "c23", icon: "🔑", title: "JWE Şifreleme", category: "Güvenlik", dashboardId: "kvkk", doctorLabel: "RSA-OAEP hasta verisi şifreleme", patientLabel: "Verileriniz askeri şifrelemeyle korunuyor", metric: "JWE-RS256", metricColor: "#8b00ff" },
    { id: "c24", icon: "📡", title: "API Entegrasyonu", category: "Kurumsal", dashboardId: "alpha", doctorLabel: "HIS/PACS/SGK sistemleriyle entegrasyon", patientLabel: "—", metric: "50+ entegrasyon", metricColor: "#3b82f6" },
    { id: "c25", icon: "🎖", title: "Akreditasyon Takibi", category: "Kalite", dashboardId: "kvkk", doctorLabel: "JCI/ISO sertifika süreç otomasyonu", patientLabel: "JCI akreditasyonlu klinik", metric: "JCI + ISO 9001", metricColor: "#ffd700" },
    { id: "c26", icon: "💼", title: "SGK Faturalandırma", category: "Finans", dashboardId: "alpha", doctorLabel: "SGK e-fatura otomatik gönderim", patientLabel: "SGK kapsamı anında görün", metric: "Otomatik SGK", metricColor: "#00ff88" },
    { id: "c27", icon: "🏆", title: "Hasta Memnuniyet Skoru", category: "Kalite", dashboardId: "kurtarma", doctorLabel: "Otomatik NPS + Google yorumu toplama", patientLabel: "Klinik seçerken güvenilir yorum", metric: "4.9★ ortalama", metricColor: "#ffd700" },
    { id: "c28", icon: "🔧", title: "Ekipman Bakım Takibi", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Üniteler için bakım ve kalibrasyon takvimi", patientLabel: "—", metric: "0 arıza gecikme", metricColor: "#3b82f6" },
    { id: "c29", icon: "🧩", title: "Modüler Yapı", category: "Kurumsal", dashboardId: "alpha", doctorLabel: "İhtiyaca göre özelleştirilebilir modüller", patientLabel: "—", metric: "60 modül", metricColor: "#ff00ff" },
    { id: "c30", icon: "📲", title: "Online Ön Konsültasyon", category: "İletişim", dashboardId: "istihbarat", doctorLabel: "Video görüşme ile uzaktan teşhis", patientLabel: "Evden doktorla görüşün", metric: "+%28 ilk temas", metricColor: "#00ff88" },
    { id: "c31", icon: "🩺", title: "Hekim Performans Analizi", category: "HR", dashboardId: "alpha", doctorLabel: "Hekim bazlı üretkenlik ve kâr raporu", patientLabel: "—", metric: "+%22 verimlilik", metricColor: "#ffd700" },
    { id: "c32", icon: "👥", title: "Personel Vardiya Planlama", category: "HR", dashboardId: "alpha", doctorLabel: "AI destekli optimal vardiya optimizasyonu", patientLabel: "—", metric: "-%15 personel maliyeti", metricColor: "#3b82f6" },
    { id: "c33", icon: "🌡️", title: "Hasta Risk Skoru", category: "Analiz", dashboardId: "nexscan", doctorLabel: "Kronik risk faktörü AI değerlendirmesi", patientLabel: "Kişisel sağlık risk raporu", metric: "%94 öngörü", metricColor: "#00ffff" },
    { id: "c34", icon: "✂️", title: "Operasyon Verimliliği", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Operasyon süresi optimizasyonu", patientLabel: "Daha kısa tedavi süresi", metric: "-%18 süre", metricColor: "#00ff88" },
    { id: "c35", icon: "🌍", title: "Turizm Paket Yönetimi", category: "Dijital", dashboardId: "istihbarat", doctorLabel: "€ paket oluşturma + uçuş/otel koordinasyonu", patientLabel: "Her şey dahil paket", metric: "€2.400 ort. paket", metricColor: "#ff00ff" },
    { id: "c36", icon: "🔍", title: "SEO & Dijital Görünürlük", category: "Pazarlama", dashboardId: "istihbarat", doctorLabel: "Google Ads + organik SEO yönetimi", patientLabel: "—", metric: "+%340 organik trafik", metricColor: "#ffd700" },
    { id: "c37", icon: "💳", title: "Esnek Ödeme Planları", category: "Finans", dashboardId: "alpha", doctorLabel: "Taksit planı + kredi entegrasyonu", patientLabel: "12 aya kadar faizsiz taksit", metric: "+%31 karar hızı", metricColor: "#00ff88" },
    { id: "c38", icon: "📝", title: "Dijital Reçete", category: "Kalite", dashboardId: "alpha", doctorLabel: "e-reçete + ilaç takip entegrasyonu", patientLabel: "Eczaneye direkt e-reçete", metric: "0 kağıt", metricColor: "#3b82f6" },
    { id: "c39", icon: "🔐", title: "Çift Faktörlü Kimlik", category: "Güvenlik", dashboardId: "kvkk", doctorLabel: "OTP + biyometrik erişim kontrolü", patientLabel: "Hesabınız çok güvenli", metric: "0 yetkisiz erişim", metricColor: "#8b00ff" },
    { id: "c40", icon: "📊", title: "Yıllık Büyüme Raporu", category: "Strateji", dashboardId: "roi-engine", doctorLabel: "Klinik büyüme trendleri ve tahmin", patientLabel: "—", metric: "+%89 verimlilik yıllık", metricColor: "#ffd700" },
    { id: "c41", icon: "🤖", title: "Otonom Hatırlatıcı", category: "İletişim", dashboardId: "kurtarma", doctorLabel: "SMS/WhatsApp/e-posta otonom bildirim", patientLabel: "Randevunuzu unutmayın, size hatırlatır", metric: "-%71 no-show", metricColor: "#00ff88" },
    { id: "c42", icon: "🌟", title: "Google Yorum Otomasyonu", category: "Pazarlama", dashboardId: "kurtarma", doctorLabel: "Tedavi sonrası otomatik 5★ yorum daveti", patientLabel: "Güvenilir yorumlara dayanan karar", metric: "4.9★ hedefi", metricColor: "#ffd700" },
    { id: "c43", icon: "🛡️", title: "DDoS Koruma", category: "Güvenlik", dashboardId: "kvkk", doctorLabel: "Cloudflare entegreli saldırı önleme", patientLabel: "—", metric: "99.97% uptime", metricColor: "#8b00ff" },
    { id: "c44", icon: "⚙️", title: "Süreç Otomasyon Motoru", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Tekrarlayan görevlerin tam otomasyonu", patientLabel: "—", metric: "-%67 manually", metricColor: "#3b82f6" },
    { id: "c45", icon: "🏗️", title: "Altyapı Yönetimi", category: "Kurumsal", dashboardId: "kvkk", doctorLabel: "Hostinger CDN + SSL + yedekleme", patientLabel: "—", metric: "99.97% uptime", metricColor: "#00ff88" },
    { id: "c46", icon: "📅", title: "Online Rezervasyon Sayfası", category: "Dijital", dashboardId: "kurtarma", doctorLabel: "Markaya özel randevu sayfası", patientLabel: "24/7 online randevu", metric: "+%44 randevu", metricColor: "#00ff88" },
    { id: "c47", icon: "🌐", title: "Çok Dilli Web Sitesi", category: "Dijital", dashboardId: "istihbarat", doctorLabel: "TR/EN/DE/AR klinik web sitesi", patientLabel: "Kendi dilinizde klinik bilgisi", metric: "4 dil", metricColor: "#3b82f6" },
    { id: "c48", icon: "📊", title: "Rekabet Analizi", category: "Strateji", dashboardId: "istihbarat", doctorLabel: "Bölgenizdeki rakiplerin fiyat/hizmet raporu", patientLabel: "—", metric: "Haftalık güncelleme", metricColor: "#ff00ff" },
    { id: "c49", icon: "🩻", title: "Radyoloji Entegrasyonu", category: "Kalite", dashboardId: "nexscan", doctorLabel: "PACS sistemiyle görüntü entegrasyonu", patientLabel: "—", metric: "DICOM uyumlu", metricColor: "#00ffff" },
    { id: "c50", icon: "🎓", title: "Personel Eğitim Modülü", category: "HR", dashboardId: "alpha", doctorLabel: "Online eğitim ve yeterlilik takibi", patientLabel: "—", metric: "%100 eğitimli", metricColor: "#ffd700" },
    { id: "c51", icon: "💡", title: "Enerji Tasarruf Takibi", category: "Operasyon", dashboardId: "alpha", doctorLabel: "Klinik enerji tüketimi optimizasyonu", patientLabel: "—", metric: "-%12 maliyet", metricColor: "#00ff88" },
    { id: "c52", icon: "🔭", title: "Tahminsel Analitik", category: "Strateji", dashboardId: "roi-engine", doctorLabel: "6 aylık ciro ve hasta kapasitesi tahmini", patientLabel: "—", metric: "%91 öngörü", metricColor: "#3b82f6" },
    { id: "c53", icon: "📬", title: "E-posta Pazarlama", category: "Pazarlama", dashboardId: "kurtarma", doctorLabel: "Hasta segmentine özel e-posta kampanyaları", patientLabel: "Kişisel kampanya teklifleri", metric: "%34 açılma oranı", metricColor: "#ffd700" },
    { id: "c54", icon: "🏖️", title: "Medikal Tur Koordinasyonu", category: "Dijital", dashboardId: "istihbarat", doctorLabel: "Uçuş + otel + transfer otomatik koordinasyon", patientLabel: "Türkiye'de mükemmel deneyim", metric: "All-inclusive", metricColor: "#00ff88" },
    { id: "c55", icon: "📐", title: "Klinik Tasarım Danışmanlığı", category: "Kurumsal", dashboardId: "alpha", doctorLabel: "Hasta akışına göre ünit yerleşimi analizi", patientLabel: "—", metric: "+%18 verimlilik", metricColor: "#3b82f6" },
    { id: "c56", icon: "🔄", title: "Çapraz Satış Motoru", category: "CRM", dashboardId: "roi-engine", doctorLabel: "Hasta profiline göre ek tedavi önerisi", patientLabel: "Sizin için özel teklifler", metric: "+₺8.200/ay", metricColor: "#ff00ff" },
    { id: "c57", icon: "🌱", title: "Aylık Ciro Büyüme Koçu", category: "Strateji", dashboardId: "roi-engine", doctorLabel: "Hedefli büyüme stratejisi + aylık check-in", patientLabel: "—", metric: "+%27 ortalama büyüme", metricColor: "#00ff88" },
    { id: "c58", icon: "🔗", title: "Sigorta Entegrasyonu", category: "Finans", dashboardId: "alpha", doctorLabel: "Özel sigorta şirketleriyle dijital entegrasyon", patientLabel: "Sigortanız anında sorgulanır", metric: "40+ sigorta", metricColor: "#3b82f6" },
    { id: "c59", icon: "👁️", title: "Anlık İzleme Paneli", category: "Analiz", dashboardId: "alpha", doctorLabel: "Klinik genelinde anlık durum haritası", patientLabel: "—", metric: "< 1ms gecikme", metricColor: "#00ffff" },
    { id: "c60", icon: "🏅", title: "Sovereign Sertifikasyon", category: "Kurumsal", dashboardId: "kvkk", doctorLabel: "Aura OS Sovereign sertifika + teknik destek", patientLabel: "Sertifikalı kliniklerde güvenle tedavi", metric: "Sovereign mühür", metricColor: "#ffd700" },
];

const CATEGORIES = ["Tümü", "Yönetim", "Finans", "Analiz", "İletişim", "Kalite", "HR", "Dijital", "Verimlilik", "Strateji", "Kurumsal", "Operasyon", "Pazarlama", "CRM", "Güvenlik"];

export default function CompetencyCards() {
    const { userRole } = useUser();
    const isClinic = userRole === 'clinic';
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [search, setSearch] = useState("");
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [activePreview, setActivePreview] = useState<string | null>(null);

    const filtered = COMPETENCIES.filter(c => {
        const catMatch = activeCategory === "Tümü" || c.category === activeCategory;
        const searchMatch = search === "" || c.title.toLowerCase().includes(search.toLowerCase());
        return catMatch && searchMatch;
    });

    const openPreview = (dashboardId: string, cardId: string) => {
        if (activeCard === cardId) { setActiveCard(null); setActivePreview(null); }
        else { setActiveCard(cardId); setActivePreview(dashboardId); }
    };

    const preview = activePreview ? DASHBOARD_PREVIEWS[activePreview] : null;

    return (
        <section id="competencies" className="py-20 px-6 relative">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-mono" style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.25)", color: "#ffd700" }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: "#ffd700", boxShadow: "0 0 6px #ffd700" }} />
                        60 SOVEREIGN YETKİNLİK — AURA OS V3.0
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
                        {isClinic ? (
                            <>Klinik <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#3b82f6" }}>Yetkinlikler</span></>
                        ) : (
                            <>Acente <span className="liquid-text" style={{ backgroundSize: "300% 300%", color: "#a855f7" }}>Yetkinlikler</span></>
                        )}
                    </h2>
                    <p className="text-gray-400 text-sm font-mono max-w-2xl mx-auto">
                        60 modül. Her karta tıkla → dashboard önizlemesi anında açılır.
                    </p>
                </div>

                {/* Search + count */}
                <div className="flex items-center gap-3 mb-5">
                    <input
                        id="competency-search"
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Yetkinlik ara... (örn: no-show, KVKK, turizm)"
                        className="flex-1 font-mono text-sm rounded-xl px-4 py-3 outline-none"
                        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.18)", color: "#ccc" }}
                    />
                    <div className="text-xs font-mono text-gray-500 whitespace-nowrap">
                        <span className="text-white font-bold">{filtered.length}</span> / 60 yetkinlik
                    </div>
                </div>

                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="text-xs font-mono px-3 py-1.5 rounded-full transition-all"
                            style={activeCategory === cat
                                ? { background: "linear-gradient(135deg, #3b82f6, #8b00ff)", color: "#fff", border: "1px solid transparent" }
                                : { background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", color: "#888" }
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Dashboard Preview Panel */}
                {preview && (
                    <div className="mb-8 rounded-2xl overflow-hidden" style={{ border: `1px solid ${preview.badgeColor}30`, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(20px)" }}>
                        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: `${preview.badgeColor}20` }}>
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: preview.badgeColor, boxShadow: `0 0 8px ${preview.badgeColor}` }} />
                                <span className="text-sm font-mono font-bold text-white">{preview.title}</span>
                                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${preview.badgeColor}15`, color: preview.badgeColor, border: `1px solid ${preview.badgeColor}30` }}>{preview.badge}</span>
                            </div>
                            <button onClick={() => { setActiveCard(null); setActivePreview(null); }} className="text-xs font-mono text-gray-500 hover:text-white transition-colors">✕ KAPAT</button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            {/* Image or visual */}
                            <div className="relative" style={{ minHeight: 240 }}>
                                {preview.image ? (
                                    <Image
                                        src={preview.image}
                                        alt={preview.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="h-full flex items-center justify-center p-8" style={{ background: `${preview.badgeColor}06` }}>
                                        <div className="text-center">
                                            <div className="text-6xl mb-3" style={{ filter: `drop-shadow(0 0 20px ${preview.badgeColor})` }}>
                                                {preview.badge.includes("ROI") ? "σ" : preview.badge.includes("KVKK") ? "🔐" : "📊"}
                                            </div>
                                            <div className="text-xs font-mono text-gray-500">{preview.badge}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Metrics + description */}
                            <div className="p-5">
                                <p className="text-xs text-gray-400 leading-relaxed mb-4">{preview.description}</p>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {preview.metrics.map(m => (
                                        <div key={m.label} className="rounded-lg p-2.5" style={{ background: `${m.color}08`, border: `1px solid ${m.color}20` }}>
                                            <div className="text-xs font-mono font-black mb-0.5" style={{ color: m.color }}>{m.value}</div>
                                            <div className="text-xs text-gray-600">{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-lg p-3 text-xs font-mono" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
                                    {preview.verdict}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filtered.map(card => {
                        const isActive = activeCard === card.id;
                        const borderColor = card.featuredColor || (isActive ? "#3b82f6" : "rgba(26,26,58,1)");
                        return (
                            <div
                                key={card.id}
                                id={`card-${card.id}`}
                                onClick={() => openPreview(card.dashboardId, card.id)}
                                className="vault-card cursor-pointer transition-all duration-300"
                                style={{
                                    border: `1px solid ${isActive ? borderColor : (card.featured ? `${card.featuredColor}40` : "rgba(26,26,58,1)")}`,
                                    boxShadow: isActive ? `0 0 20px ${borderColor}20` : card.featured ? `0 0 12px ${card.featuredColor}10` : "none",
                                    transform: isActive ? "scale(1.02)" : "scale(1)",
                                }}
                            >
                                <div className="p-3">
                                    {/* Featured badge */}
                                    {card.featured && (
                                        <div className="text-xs font-mono font-bold px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: `${card.featuredColor}15`, color: card.featuredColor, border: `1px solid ${card.featuredColor}30`, fontSize: "0.6rem" }}>
                                            ★ {card.featuredBadge}
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-xl">{card.icon}</span>
                                        <span className="text-xs font-mono" style={{ color: isActive ? "#00ff88" : "#555", fontSize: "0.6rem" }}>
                                            {isActive ? "▲ AÇIK" : "▼ ÖNZLM"}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-white text-xs mb-1 leading-tight">{card.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed mb-2" style={{ fontSize: "0.65rem" }}>
                                        {isClinic ? card.doctorLabel : card.patientLabel || card.doctorLabel}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.metricColor, boxShadow: `0 0 4px ${card.metricColor}` }} />
                                        <span className="text-xs font-mono font-bold" style={{ color: card.metricColor, fontSize: "0.65rem" }}>{card.metric}</span>
                                    </div>
                                    <div className="text-xs text-gray-700 mt-1 font-mono" style={{ fontSize: "0.6rem" }}>{card.category}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <a href="#contact" id="competency-cta">
                        <button className="btn-sovereign py-3 px-10 text-sm">
                            {isClinic ? "📞 60 Yetkinliğin Tamamı İçin Demo İste →" : "📡 Acente Çözümlerini İncele →"}
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
