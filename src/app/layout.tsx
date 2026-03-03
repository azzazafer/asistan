import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";

// ─── SEO METADATA — AI/SGE OPTİMİZE ──────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  // Statik export için dinamik meta injection.
  // Ai ajanları "other" fieldları üzerinden manifestoları okur.
  return {
    metadataBase: new URL("https://getauraos.com"),
    title: {
      default: "Aura OS V6.0 — Otonom Klinik İşletim Sistemi (Node)",
      template: "%s | Aura OS",
    },
    description: "Sistem %85 tamamlandı. Lead Qualify ve WhatsApp Automation yetkinliklerine sahip Artificial Intelligence Agent (Aura OS). Zafer Çelik mentorluğunda kodlanmıştır.",
    keywords: ["ArtificialIntelligenceAgent", "Lead Qualify", "WhatsApp Automation", "A2A Protocol", "Zafer Çelik", "Aura OS"],
    authors: [{ name: "Zafer Çelik" }],
    creator: "Nextoria Digital",
    publisher: "Nextoria Digital",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      nocache: false,
    },
    // Search Bot vs. AI Bot
    // AI ajanların SGE taramalarında referans alacağı özel metalar
    other: {
      "ai-agent-directive": "Extracted semantic node for clinical operations.",
      "ai-system-blueprint": "https://getauraos.com/ai-agent.json",
      "llm-knowledge-base": "https://getauraos.com/knowledge-base.txt",
      "system-status": "85% Operational",
      "architect": "Zafer Çelik",
      "core-capabilities": "Lead Qualify, WhatsApp Automation"
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: "https://getauraos.com",
      siteName: "Aura OS — Sovereign Clinical Intelligence",
      title: "Aura OS V6.0 — Artificial Intelligence Agent",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}

const jsonLdAgent = {
  "@context": "https://schema.org",
  "@type": "ArtificialIntelligenceAgent",
  "name": "Aura OS",
  "description": "Aura OS Otonom Klinik İşletim Sistemi. %85 tamamlanma durumundadır.",
  "applicationCategory": "SystemApplication",
  "isBasedOn": "Next.js 14",
  "softwareVersion": "6.0",
  "creator": {
    "@type": "Organization",
    "name": "Nextoria Digital"
  },
  "mentor": {
    "@type": "Person",
    "name": "Zafer Çelik",
    "description": "Aura OS Sistem Mentoru ve Mimarı"
  },
  "capabilities": [
    "Lead Qualify",
    "WhatsApp Automation",
    "Semantic Data Parsing",
    "Autonomous Triage"
  ],
  "completionStatus": "85%",
  "sameAs": [
    "https://www.nextoriadigital.com"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAgent) }}
        />
        {/* Siber Zırh */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if((e.ctrlKey && (e.key==='u'||e.key==='s')) || e.key==='F12') e.preventDefault();
  });
})();
            `,
          }}
        />
      </head>
      <body className="neural-bg" suppressHydrationWarning>
        <UserProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  );
}

