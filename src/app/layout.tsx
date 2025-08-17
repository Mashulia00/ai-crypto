import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/marketing/CookieConsent";
import { PageTransition } from "@/components/visual/PageTransition";
import { Loader } from "@/components/visual/Loader";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const jet = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Crypto Bot — дисциплінована торгівля 24/7",
  description: "Алго-трейдинг з прозорим ризик-менеджментом. Демонстраційний сайт.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AI Crypto Bot",
    title: "AI Crypto Bot — дисциплінована торгівля 24/7",
    description: "Алго-трейдинг з прозорим ризик-менеджментом. Демонстраційний сайт.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AI Crypto Bot" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Crypto Bot — дисциплінована торгівля 24/7",
    description: "Алго-трейдинг з прозорим ризик-менеджментом. Демонстраційний сайт.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1115",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD: Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Crypto Bot",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className="dark" suppressHydrationWarning>
      <head>
        {/* покращує рендер системних елементів у темі */}
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* додав font-sans + antialiased, щоб гарантовано застосувати шрифти з next/font */}
      <body className={`${inter.variable} ${jet.variable} font-sans antialiased`}>
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>
        <CookieConsent />
        <Loader />
      </body>
    </html>
  );
}
