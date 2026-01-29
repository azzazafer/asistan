import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const outfitClassName = "font-sans";

import { getMetadata, SEOManager } from "@/lib/seo";

// Default to English for root layout, dynamic pages will use generateMetadata
const siteMetadata = getMetadata('tr'); // Default to TR since it's a TR-focused brand with global ops

export const metadata: Metadata = {
  title: "Aura OS | The First Autonomous Sales Engine for Medical Tourism",
  description: "Stop managing leads. Start closing them. Aura OS syncs with HBYS in 12ms and closes sales via Stripe autonomously.",
  metadataBase: new URL("https://getauraos.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Aura OS | The First Autonomous Sales Engine for Medical Tourism",
    description: "Stop managing leads. Start closing them. Aura OS syncs with HBYS in 12ms and closes sales via Stripe autonomously.",
    images: ["/images/og-preview.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* SEO Dominance - JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SEOManager.generateSchema('tr')) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-100 bg-[#050505]">
        <Toaster position="top-right" />
        {children}

        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('[Aura] Service Worker registered:', registration.scope);
                  })
                  .catch(function(error) {
                    console.log('[Aura] Service Worker registration failed:', error);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
