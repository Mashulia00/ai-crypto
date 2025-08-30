import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Exo_2, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/marketing/CookieConsent";
import { PageTransition } from "@/components/visual/PageTransition";
import { Loader } from "@/components/visual/Loader";

const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jet = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AI Crypto Bot — disciplined 24/7 trading",
  description: "Algorithmic trading with transparent risk management. Demo website.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "AI Crypto Bot",
    title: "AI Crypto Bot — disciplined 24/7 trading",
    description: "Algorithmic trading with transparent risk management. Demo website.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AI Crypto Bot" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Crypto Bot — disciplined 24/7 trading",
    description: "Algorithmic trading with transparent risk management. Demo website.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f1115",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Crypto Bot",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${exo2.variable} ${jet.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
        </div>

        <CookieConsent />
        <Loader />
        {/* Floating LanguageSwitcher removed — use the one in Navbar only */}
      </body>
    </html>
  );
}
