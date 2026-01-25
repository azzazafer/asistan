import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const outfitClassName = "font-sans";

import { getMetadata } from "@/lib/seo";

// Default to English for root layout, dynamic pages will use generateMetadata
export const metadata: Metadata = {
  title: "Aura OS | AI-Powered Health Tourism Revenue Engine",
  description: "The world's first autonomous sales engine for health tourism. Increase your lead conversion by 40% with AI-driven diagnostics and integrated payments.",
  keywords: ["Health Tourism AI", "Medical Sales Automation", "Surgical Vision AI", "Aura OS", "Lead Optimization"],
  openGraph: {
    title: "Aura OS | The Healthcare Revenue Engine",
    description: "Convert leads into deposits 24/7 with Aura Intelligence.",
    url: "https://getauraos.com",
    siteName: "Aura OS",
    locale: "en_US",
    type: "website",
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
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
