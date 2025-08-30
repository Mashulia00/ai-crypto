import type { Metadata } from "next";
import FaqList from "@/components/faq/FaqList";

export const metadata: Metadata = {
  title: "FAQ — AI Crypto Bot",
  description: "Answers to frequently asked questions about the demo bot and methodology",
};

const faqs = [
  {
    q: "Is it safe to connect exchange keys?",
    a: "In demo mode keys are not used For the real product only API keys with <em>trade</em> rights without withdrawal access Keys can be revoked anytime in the exchange cabinet",
  },
  {
    q: "Does the bot guarantee profit?",
    a: "No It is a tool for discipline and automation The crypto market is risky and past results do not guarantee future performance",
  },
  {
    q: "Where does the data for charts come from?",
    a: "The site uses demo data and backtests The methodology is described in the Performance section including commissions and simulated slippage",
  },
  {
    q: "Is constant monitoring required?",
    a: "No The bot runs 247 with alerts action logs and a dashboard for control",
  },
  {
    q: "What payment methods are supported?",
    a: "Cryptocurrency via exchanges <strong>Binance Coinbase Kraken OKX Bybit</strong> or wallet <strong>MetaMask</strong>",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes Cancellation applies from the next billing period History is available in the payments log",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a.replace(/<[^>]+>/g, "") },
  })),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header with badge and accent line */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
        <span className="badge-chip">Support</span>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">FAQ</h1>
        <p className="mt-3 text-platinum-200/90">
          Short answers to frequently asked questions
        </p>
        <div className="mt-4 h-[2px] w-full rounded-full bg-white/10">
          <div
            className="h-full w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(57,208,255,1))",
              boxShadow: "0 0 22px rgba(57,208,255,.35)",
            }}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(700px 320px at 12% -10%, rgba(255,255,255,.07), transparent 60%), radial-gradient(600px 240px at 88% 0%, rgba(57,208,255,.14), transparent 60%)",
          }}
        />
      </div>

      {/* FAQ list */}
      <div className="mt-6">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
