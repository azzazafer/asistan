export type Language = 'tr' | 'en' | 'ar';

export const translations = {
    tr: {
        sidebar: {
            title: "TANI MODU",
            subtitle: "Aura OS Süper Yönetici",
            overview: "Genel Bakış",
            tenants: "Kiracılar & Klinikler",
            agents: "Acenta Ağı",
            settings: "Sistem Ayarları",
            statusTitle: "Sistem Durumu",
            statusValue: "Operasyonel"
        },
        header: {
            title: "Yönetim Kontrol Paneli",
            version: "v3.0.0-rc1"
        },
        stats: {
            revenue: "Toplam Gelir",
            activeClinics: "Aktif Klinikler",
            totalLeads: "Toplam Lead",
            systemHealth: "Sistem Sağlığı",
            changeMonth: "geçen aydan",
            changeToday: "Bugün",
            stable: "Stabil"
        },
        feed: {
            title: "Canlı Sistem Akışı",
            liveBadge: "Canlı",
            threat: "Sistem IP 192.168.1.1 üzerinden olağandışı trafik tespit etti.",
            time: "2 dk önce",
            source: "Güvenlik Kalkanı"
        },
        tenants: {
            title: "Kiracı Sağlığı",
            healthy: "Sağlıklı",
            warning: "Uyarı"
        },
        placeholders: {
            tenantsTitle: "Kiracılar ve Klinikler",
            tenantsDesc: "Bu modül yapım aşamasındadır. Burada sistemdeki tüm klinikleri yönetebileceksiniz.",
            agentsTitle: "Acenta Ağı Yönetimi",
            agentsDesc: "Bu modül yapım aşamasındadır. Burada satış ortaklarını ve komisyonları yönetebileceksiniz.",
            settingsTitle: "Sistem Ayarları",
            settingsDesc: "Bu modül yapım aşamasındadır. Global sistem ayarlarını buradan yapılandırabileceksiniz."
        }
    },
    en: {
        sidebar: {
            title: "GOD MODE",
            subtitle: "Aura OS Super Admin",
            overview: "Global Overview",
            tenants: "Tenants & Clinics",
            agents: "Agent Network",
            settings: "System Settings",
            statusTitle: "System Status",
            statusValue: "Operational"
        },
        header: {
            title: "Executive Control Panel",
            version: "v3.0.0-rc1"
        },
        stats: {
            revenue: "Total Revenue",
            activeClinics: "Active Clinics",
            totalLeads: "Total Leads",
            systemHealth: "System Health",
            changeMonth: "from last month",
            changeToday: "Today",
            stable: "Stable"
        },
        feed: {
            title: "Live System Feed",
            liveBadge: "Live",
            threat: "System detected unusual traffic pattern from IP 192.168.1.1",
            time: "2 mins ago",
            source: "Security Shield"
        },
        tenants: {
            title: "Tenant Health",
            healthy: "Healthy",
            warning: "Warning"
        },
        placeholders: {
            tenantsTitle: "Tenants & Clinics",
            tenantsDesc: "This module is under construction. You will manage all clinics here.",
            agentsTitle: "Agent Network Management",
            agentsDesc: "This module is under construction. You will manage sales partners and commissions here.",
            settingsTitle: "System Settings",
            settingsDesc: "This module is under construction. You will configure global system settings here."
        }
    },
    ar: {
        sidebar: {
            title: "وضع الإله",
            subtitle: "مسؤول هالة OS الممتاز",
            overview: "نظرة عامة",
            tenants: "المستأجرين والعيادات",
            agents: "شبكة الوكلاء",
            settings: "إعدادات النظام",
            statusTitle: "حالة النظام",
            statusValue: "يعمل"
        },
        header: {
            title: "لوحة التحكم التنفيذية",
            version: "v3.0.0-rc1"
        },
        stats: {
            revenue: "إجمالي الإيرادات",
            activeClinics: "العيادات النشطة",
            totalLeads: "مجموع العملاء المحتملين",
            systemHealth: "صحة النظام",
            changeMonth: "عن الشهر الماضي",
            changeToday: "اليوم",
            stable: "مستقر"
        },
        feed: {
            title: "تغذية النظام الحية",
            liveBadge: "مباشر",
            threat: "اكتشف النظام نمط مرور غير عادي من IP 192.168.1.1",
            time: "منذ دقيقتين",
            source: "درع الأمن"
        },
        tenants: {
            title: "صحة المستأجر",
            healthy: "صحي",
            warning: "تحذير"
        },
        placeholders: {
            tenantsTitle: "المستأجرين والعيادات",
            tenantsDesc: "هذه الوحدة قيد الإنشاء. ستتمكن من إدارة جميع العيادات من هنا.",
            agentsTitle: "إدارة شبكة الوكلاء",
            agentsDesc: "هذه الوحدة قيد الإنشاء. ستتمكن من إدارة شركاء المبيعات والعمولات من هنا.",
            settingsTitle: "إعدادات النظام",
            settingsDesc: "هذه الوحدة قيد الإنشاء. ستتمكن من تكوين إعدادات النظام العالمية من هنا."
        }
    }
};
