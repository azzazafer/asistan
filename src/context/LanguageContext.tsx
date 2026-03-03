"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "TR" | "EN" | "DE" | "AR";
export type Theme = "CYBER" | "STERILE";

interface TranslationNode {
    [key: string]: string | string[] | { [key: string]: string | string[] }[] | TranslationNode;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    toggleTheme: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (key: string) => any;
}

const translations: Record<Language, TranslationNode> = {
    TR: {
        hero: {
            clinic: [
                "SİZ UYURKEN KASANIZDAN SIZIYOR.",
                "HAYALET HASTALAR KOLTUĞUNUZU İŞGAL EDİYOR.",
                "YANITSIZ WHATSAPP KLİNİĞİNİZİ ERİTİYOR.",
                "TEŞHİSİ DOKTOR KOYAR, AURA CIROYU MÜHÜRLER.",
                "OTONOM EGEMENLİK İLE DÖNÜŞÜM BAŞLADI."
            ],
            agency: [
                "KLİNİKLERİN BECERİKSİZLİĞİ BÜTÇENİZİ YAKIYOR.",
                "HER LEAD'İ CANLI İZLEYİN.",
                "KOMİSYONUN BUHARLAŞMASINA İZİN VERMEYİN.",
                "GLOBAL İKNA HUB'I İLE SINIRLARI YIKIN.",
                "LEAD EGEMENLİĞİ AURA CORE İLE MÜMKÜN."
            ],
            calculator: {
                volume: "AYLIK HACİM",
                leakage_pct: "SIZINTI YÜZDESİ (%)",
            },
            stats: {
                leakage: "TESPİT EDİLEN SİSTEMİK SIZINTI",
                potential: "KURTARMA POTANSİYELİ",
                active_clinics: "KLİNİK SİSTEME BAĞLI",
                seal_leakage: "SIZINTIYI DURDUR"
            }
        },
        funnel: {
            title_clinic: "Sızıntıyı Mühürleyen 6 Kritik Katman",
            title_agency: "Acente Egemenliğini Kuran 6 Silah",
            cta: "SIZINTIYI KAPAT >",
            cards_clinic: [
                { title: "Sekreterya Kaynaklı Ciro Sızıntısı", subtitle: "WhatsApp'ta unutulan hastalar, geç dönülen mesajlar.", solution: "7/24 Otonom AI İkna Hub", metric: "-%40 Kayıp" },
                { title: "İnsan Gözünden Kaçan Teşhisler", subtitle: "Sadece ağrıyan dişe odaklanıp kaçırılan %30 ek ciro.", solution: "Nex-Scan™ X-Ray Analiz", metric: "+%30 Ciro" },
                { title: "No-Show ve Boş Koltuk Maliyeti", subtitle: "İptal olan her saatin maliyeti kliniği eritiyor.", solution: "Otonom Doluluk Optimizasyonu", metric: "-%71 No-Show" },
                { title: "Gece Gelen Lead'lerin Buharlaşması", subtitle: "Siz uyurken gelen hastalar rakiplerinize gidiyor.", solution: "24/7 Global Karşılama", metric: "0ms Response" },
                { title: "Takipsiz Kalan Tedavi Planları", subtitle: "Fiyat alıp bir daha duyulmayan binlerce hasta.", solution: "Otonom Takip Döngüsü", metric: "x3 Geri Dönüş" },
                { title: "Eski Hasta Veritabanının Atıl Kalması", subtitle: "Yıllardır gelmeyen hastalarınızın içinde bir servet yatıyor.", solution: "AI Re-Activation Engine", metric: "%12 Re-Call" }
            ],
            cards_agency: [
                { title: "Kliniğin Beceriksizliğiyle Yanan Leadler", subtitle: "Reklam bütçenizi kliniğin satış becerisine bırakmayın.", solution: "Alpha Command Control Panel", metric: "FULL CONTROL" },
                { title: "Dil Bariyeri ve İkna Kaybı", subtitle: "Yanlış çeviri veya geç yanıtla kaçan kıymetli hastalar.", solution: "Çok Dilli İkna Terminali", metric: "MUTLI-LANG" },
                { title: "Buharlaşan Komisyonlar", subtitle: "Hangi hastanın ödeme yaptığını takip edemediğiniz kaos.", solution: "Hakediş Zırhı ve Takip", metric: "SECURE" },
                { title: "Şeffaf Olmayan Hasta Durum Raporları", subtitle: "Klinikten bilgi almak için saatlerce telefonda beklemek.", solution: "Real-time Lead Dashboard", metric: "LIVE DATA" },
                { title: "7/24 Yanıtsız Kalan Global Talepler", subtitle: "Zaman farkı yüzünden kaçan gece talepleri.", solution: "Sovereign AI Reception", metric: "24/7 ACTIVE" },
                { title: "Manuel Operasyonel Yük ve Hatalar", subtitle: "Excel tablolarında kaybolan randevular ve karışıklıklar.", solution: "Otonom İş Akışı", metric: "AUTOMATED" }
            ]
        },
        nav: {
            solutions: "Çözümlerimiz",
            terminal: "Otonom Terminal",
            roi: "ROI Hesapla",
            labs: "Aura Labs",
            contact: "İletişim",
            core: "Siber Çekirdek"
        },
        footer: {
            desc: "Cironuzu ve zamanınızı çalan sızıntıları mühürleyen otonom zeka. Mış gibi yapmaz, randevu kapatır.",
            platform: "PLATFORM",
            quick_links: "HIZLI ERİŞİM",
            legal: "YASAL",
            links: {
                neural: "Neural Core Terminal",
                funnel: "Otonom Funnel",
                roi: "ROI Hesaplayıcı",
                labs: "Aura Labs",
                core: "Siber Çekirdek",
                sim: "Canlı Simülasyon",
                kvkk: "KVKK & Gizlilik",
                terms: "Kullanım Koşulları"
            },
            rights: "© 2026 AURA OS - TÜM HAKLARI SAKLIDIR"
        },
        legal: {
            kvkk_title: "KVKK & GİZLİLİK POLİTİKASI",
            terms_title: "KULLANIM KOŞULLARI",
            accept: "KABUL EDİYORUM"
        }
    },
    EN: {
        hero: {
            clinic: [
                "LEAKING FROM YOUR VAULT WHILE YOU SLEEP.",
                "GHOST PATIENTS ARE OCCUPYING YOUR CHAIR.",
                "UNANSWERED WHATSAPP MELTS YOUR CLINIC.",
                "DOCTOR DIAGNOSES, AURA SEALS THE REVENUE.",
                "TRANSFORMATION STARTED WITH AUTONOMY."
            ],
            agency: [
                "CLINIC INCOMPETENCE BURNS YOUR BUDGET.",
                "TRACK EVERY LEAD LIVE.",
                "DON'T LET YOUR COMMISSION EVAPORATE.",
                "BREAK BORDERS WITH GLOBAL PERSUASION HUB.",
                "LEAD SOVEREIGNTY IS POSSIBLE WITH AURA CORE."
            ],
            calculator: {
                volume: "MONTHLY VOLUME",
                leakage_pct: "LEAKAGE PERCENTAGE (%)",
            },
            stats: {
                leakage: "DETECTED SYSTEMIC LEAKAGE",
                potential: "RECOVERY POTENTIAL",
                active_clinics: "CLINICS CONNECTED",
                seal_leakage: "STOP THE LEAKAGE"
            }
        },
        funnel: {
            title_clinic: "6 Critical Layers Sealing The Leak",
            title_agency: "6 Weapons Establishing Agency Sovereignty",
            cta: "SEAL THE LEAK >",
            cards_clinic: [
                { title: "Secretary-Sourced Revenue Leak", subtitle: "Forgotten patients on WhatsApp, late replies.", solution: "24/7 Auto AI Persuasion Hub", metric: "-40% Loss" },
                { title: "Missed Diagnoses by Human Eye", subtitle: "Focusing only on the aching tooth missing 30% revenue.", solution: "Nex-Scan™ X-Ray Analysis", metric: "+30% Rev" },
                { title: "No-Show & Empty Chair Cost", subtitle: "Cost of every cancelled hour melts the clinic.", solution: "Autonomous Occupancy Opt.", metric: "-71% No-Show" },
                { title: "Evaporating Night Leads", subtitle: "Patients arriving while you sleep go to competitors.", solution: "24/7 Global Reception", metric: "0ms Response" },
                { title: "Untracked Treatment Plans", subtitle: "Thousands of patients never heard from after getting a price.", solution: "Autonomous Follow-up Loop", metric: "x3 Return" },
                { title: "Idle Old Patient Database", subtitle: "A fortune lays in patients who haven't visited in years.", solution: "AI Re-Activation Engine", metric: "12% Re-Call" }
            ],
            cards_agency: [
                { title: "Leads Burning by Clinic Incompetence", subtitle: "Don't leave your ad budget to clinic's sales skills.", solution: "Alpha Command Control Panel", metric: "FULL CONTROL" },
                { title: "Language Barrier & Persuasion Loss", subtitle: "Precious patients escaping due to bad translation or late reply.", solution: "Multi-Lang Persuasion Term", metric: "MULTI-LANG" },
                { title: "Evaporating Commissions", subtitle: "Chaos of not tracking which patient paid.", solution: "Commission Armor & Track", metric: "SECURE" },
                { title: "Opaque Patient Status Reports", subtitle: "Waiting hours on phone to get info from clinic.", solution: "Real-time Lead Dashboard", metric: "LIVE DATA" },
                { title: "Global Requests Unanswered 24/7", subtitle: "Night requests missed due to time zones.", solution: "Sovereign AI Reception", metric: "24/7 ACTIVE" },
                { title: "Manual Ops Burden & Errors", subtitle: "Appointments lost in Excel sheets and confusion.", solution: "Autonomous Workflow", metric: "AUTOMATED" }
            ]
        },
        nav: {
            solutions: "Solutions",
            terminal: "Autonomous Terminal",
            roi: "Calculate ROI",
            labs: "Aura Labs",
            contact: "Contact",
            core: "Cyber Core"
        },
        footer: {
            desc: "Autonomous intelligence sealing the leaks stealing your revenue and time. It doesn't pretend, it closes the appointment.",
            platform: "PLATFORM",
            quick_links: "QUICK ACCESS",
            legal: "LEGAL",
            links: {
                neural: "Neural Core Terminal",
                funnel: "Autonomous Funnel",
                roi: "ROI Calculator",
                labs: "Aura Labs",
                core: "Cyber Core",
                sim: "Live Simulation",
                kvkk: "Privacy & GDPR",
                terms: "Terms of Use"
            },
            rights: "© 2026 AURA OS - ALL RIGHTS RESERVED"
        },
        legal: {
            kvkk_title: "PRIVACY PORTAL & GDPR",
            terms_title: "TERMS OF USE",
            accept: "I ACCEPT"
        }
    },
    DE: {
        hero: {
            clinic: [
                "LECKAGE AUS IHREM TRESOR, WÄHREND SIE SCHLAFEN.",
                "GEISTERPATIENTEN BESETZEN IHREN STUHL.",
                "UNBEANTWORTETES WHATSAPP SCHMILZT IHRE KLINIK.",
                "DER ARZT DIAGNOSTIZIERT, AURA VERSIEGELT DEN UMSATZ.",
                "DIE TRANSFORMATION BEGANN MIT AUTONOMIE."
            ],
            agency: [
                "INKOMPETENZ DER KLINIK VERBRENNT IHR BUDGET.",
                "VERFOLGEN SIE JEDEN LEAD LIVE.",
                "LASSEN SIE IHRE PROVISION NICHT VERDUNSTEN.",
                "GRENZEN BRECHEN MIT GLOBAL PERSUASION HUB.",
                "LEAD-SOUVERÄNITÄT IST MIT AURA CORE MÖGLICH."
            ],
            calculator: {
                volume: "MONATLICHES VOLUMEN",
                leakage_pct: "LECKAGE-PROZENTSATZ (%)",
            },
            stats: {
                leakage: "SYSTEMISCHE LECKAGE ERKANNT",
                potential: "WIEDERHERSTELLUNGSPOTENZIAL",
                active_clinics: "KLINIKEN VERBUNDEN",
                seal_leakage: "LECKAGE STOPPEN"
            }
        },
        funnel: {
            title_clinic: "6 kritische Schichten, die das Leck versiegeln",
            title_agency: "6 Waffen zur Etablierung der Agentursouveränität",
            cta: "LECKE VERSIEGELN >",
            cards_clinic: [
                { title: "Einnahmenverlust durch Sekretariat", subtitle: "Vergessene Patienten auf WhatsApp, späte Antworten.", solution: "24/7 KI-Überzeugungs-Hub", metric: "-40% Verlust" },
                { title: "Verpasste Diagnosen durch menschliches Auge", subtitle: "Fokussierung nur auf den schmerzenden Zahn verpasst 30% Umsatz.", solution: "Nex-Scan™ Röntgenanalyse", metric: "+30% Umsatz" },
                { title: "No-Show & Kosten für leeren Stuhl", subtitle: "Kosten jeder stornierten Stunde schmelzen die Klinik.", solution: "Autonome Belegungsopt.", metric: "-71% No-Show" },
                { title: "Verdunstende Nacht-Leads", subtitle: "Patienten, die eintreffen, während Sie schlafen, gehen zur Konkurrenz.", solution: "24/7 Globaler Empfang", metric: "0ms Antwort" },
                { title: "Unverfolgte Behandlungspläne", subtitle: "Tausende Patienten, von denen man nach Preisanfrage nichts mehr hört.", solution: "Autonome Follow-up-Schleife", metric: "x3 Rückkehr" },
                { title: "Brachliegende alte Patientendatenbank", subtitle: "Ein Vermögen liegt in Patienten, die seit Jahren nicht mehr da waren.", solution: "KI-Reaktivierungs-Engine", metric: "12% Rückruf" }
            ],
            cards_agency: [
                { title: "Leads verbrennen durch Klinik-Inkompetenz", subtitle: "Überlassen Sie Ihr Werbebudget nicht den Vertriebsfähigkeiten der Klinik.", solution: "Alpha Command Control Panel", metric: "VOLLE KONTROLLE" },
                { title: "Sprachbarriere & Überzeugungsverlust", subtitle: "Wertvolle Patienten entkommen aufgrund schlechter Übersetzung oder später Antwort.", solution: "Multi-Lang Überzeugungsterm", metric: "MEHRSPRACHIG" },
                { title: "Verdunstende Provisionen", subtitle: "Chaos, nicht zu verfolgen, welcher Patient bezahlt hat.", solution: "Provisionspanzer & Tracking", metric: "SICHER" },
                { title: "Undurchsichtige Patientenstatusberichte", subtitle: "Stundenlanges Warten am Telefon auf Infos aus der Klinik.", solution: "Echtzeit-Lead-Dashboard", metric: "LIVE-DATEN" },
                { title: "Globale Anfragen 24/7 unbeantwortet", subtitle: "Nachtanfragen aufgrund von Zeitzonen verpasst.", solution: "Sovereign KI-Empfang", metric: "24/7 AKTIV" },
                { title: "Manuelle Betriebsbelastung & Fehler", subtitle: "Termine verloren in Excel-Listen und Verwirrung.", solution: "Autonomer Workflow", metric: "AUTOMATISIERT" }
            ]
        },
        nav: {
            solutions: "Lösungen",
            terminal: "Autonomes Terminal",
            roi: "ROI berechnen",
            labs: "Aura Labs",
            contact: "Kontakt",
            core: "Cyber-Kern"
        },
        footer: {
            desc: "Autonome Intelligenz, die die Lecks versiegelt, die Ihren Umsatz und Ihre Zeit stehlen. Sie tut nicht nur so, sie schließt den Termin ab.",
            platform: "PLATTFORM",
            quick_links: "SCHNELLER ZUGANG",
            legal: "RECHTLICHES",
            links: {
                neural: "Neural Core Terminal",
                funnel: "Autonomer Trichter",
                roi: "ROI-Rechner",
                labs: "Aura Labs",
                core: "Cyber-Kern",
                sim: "Live-Simulation",
                kvkk: "Datenschutz & DSGVO",
                terms: "Nutzungsbedingungen"
            },
            rights: "© 2026 AURA OS - ALLE RECHTE VORBEHALTEN"
        },
        legal: {
            kvkk_title: "DATENSCHUTZPORTAL & DSGVO",
            terms_title: "NUTZUNGSBEDINGUNGEN",
            accept: "ICH AKZEPTIERE"
        }
    },
    AR: {
        hero: {
            clinic: [
                "تسرب من خزنتك بينما أنت نائم.",
                "مرضى وهميون يشغلون مقعدك.",
                "تطبيق الواتساب غير المسترد يذيب عيادتك.",
                "الطبيب يشخص، أورا تغلق الإيرادات.",
                "بدأ التحول مع الاستقلالية."
            ],
            agency: [
                "عدم كفاءة العيادة يحرق ميزانيتك.",
                "تتبع كل عميل محتمل مباشرة.",
                "لا تدع عمولاتك تتبخر.",
                "كسر الحدود مع مركز الإقناع العالمي.",
                "سيادة العملاء المحتملين ممكنة مع أورا كور."
            ],
            calculator: {
                volume: "الحجم الشهري",
                leakage_pct: "نسبة التسرب (%)",
            },
            stats: {
                leakage: "تم اكتشاف تسرب منهجي",
                potential: "إمكانية الاستعادة",
                active_clinics: "العيادات المتصلة",
                seal_leakage: "وقف التسرب"
            }
        },
        funnel: {
            title_clinic: "6 طبقات حرجة تسد التسرب",
            title_agency: "6 أسلحة לבناء سيادة الوكالة",
            cta: "سد التسريب >",
            cards_clinic: [
                { title: "تسرب الإيرادات من السكرتارية", subtitle: "مرضى منسيون على الواتساب، ردود متأخرة.", solution: "مركز إقناع ذكي 24/7", metric: "-40% خسارة" },
                { title: "تشخيصات غفل عنها العين البشرية", subtitle: "التركيز فقط على السن المؤلم يضيع 30% من الإيرادات.", solution: "تحليل الأشعة السينية Nex-Scan™", metric: "+30% إيرادات" },
                { title: "تأثير عدم الحضور والمقعد الفارغ", subtitle: "تكلفة كل ساعة يتم إلغاؤها تذيب العيادة.", solution: "تحسين الإشغال المستقل", metric: "-71% عدم حضور" },
                { title: "تبخر العملاء المحتملين ليلاً", subtitle: "المرضى الذين يصلون أثناء نومك يذهبون إلى المنافسين.", solution: "استقبال عالمي 24/7", metric: "0ms استجابة" },
                { title: "خطط العلاج غير المتتبعة", subtitle: "آلاف المرضى لم يُسمع عنهم بعد الحصول على سعر.", solution: "حلقة متابعة مستقلة", metric: "x3 عودة" },
                { title: "قاعدة بيانات المرضى القدامى الخاملة", subtitle: "ثروة تكمن في مرضى لم يزوروك منذ سنوات.", solution: "محرك إعادة تنشيط الذكاء الاصطناعي", metric: "12% استدعاء" }
            ],
            cards_agency: [
                { title: "احتراق العملاء المحتملين بسبب عدم كفاءة العيادة", subtitle: "لا تترك ميزانية إعلاناتك لمهارات مبيعات العيادة.", solution: "لوحة تحكم ألفا", metric: "تحكم كامل" },
                { title: "حاجز اللغة وفقدان الإقناع", subtitle: "هروب مرضى ثمينين بسبب سوء الترجمة أو الرد المتأخر.", solution: "محطة إقناع متعددة اللغات", metric: "متعدد اللغات" },
                { title: "تبخر العمولات", subtitle: "فوضى عدم تتبع المريض الذي دفع.", solution: "درع وتتبع العمولات", metric: "آمن" },
                { title: "تقارير حالة مريض مبهمة", subtitle: "الانتظار لساعات على الهاتف للحصول على معلومات من العيادة.", solution: "لوحة تحكم للعملاء في الوقت الفعلي", metric: "بيانات حية" },
                { title: "طلبات عالمية غير مجاب عليها 24/7", subtitle: "ضياع طلبات الليل بسبب المناطق الزمنية.", solution: "استقبال سيادي بالذكاء الاصطناعي", metric: "24/7 نشط" },
                { title: "عبء العمليات اليدوية والأخطاء", subtitle: "ضياع المواعيد في جداول الإكسل والارتباك.", solution: "سير عمل مستقل", metric: "مؤتمت" }
            ]
        },
        nav: {
            solutions: "حلولنا",
            terminal: "المحطة المستقلة",
            roi: "حساب العائد",
            labs: "مختبرات أورا",
            contact: "اتصل بنا",
            core: "النواة السيبرانية"
        },
        footer: {
            desc: "الذكاء الاصطناعي المستقل يسد التسريبات التي تسرق إيراداتك ووقتك. إنه لا يتظاهر، بل يغلق الموعد.",
            platform: "المنصة",
            quick_links: "وصول سريع",
            legal: "قانوني",
            links: {
                neural: "محطة النواة العصبية",
                funnel: "القمع المستقل",
                roi: "حاسبة العائد",
                labs: "مختبرات أورا",
                core: "النواة السيبرانية",
                sim: "محاكاة حية",
                kvkk: "الخصوصية وقانون حماية البيانات",
                terms: "شروط الاستخدام"
            },
            rights: "© 2026 أورا نظام التشغيل - جميع الحقوق محفوظة"
        },
        legal: {
            kvkk_title: "بوابة الخصوصية",
            terms_title: "شروط الاستخدام",
            accept: "أنا أقبل"
        }
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("TR");
    const [theme, setTheme] = useState<Theme>("CYBER");

    // RTL Otonom Entegrasyonu
    useEffect(() => {
        const root = document.documentElement;
        if (language === "AR") {
            root.setAttribute("dir", "rtl");
            root.setAttribute("lang", "ar");
            document.body.classList.add('rtl');
        } else {
            root.setAttribute("dir", "ltr");
            root.setAttribute("lang", language.toLowerCase());
            document.body.classList.remove('rtl');
        }
    }, [language]);

    // Theme Entegrasyonu
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "STERILE") {
            root.classList.add("sterile-mode");
        } else {
            root.classList.remove("sterile-mode");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "CYBER" ? "STERILE" : "CYBER");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const t = (path: string): any => {
        const keys = path.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = translations[language];
        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
