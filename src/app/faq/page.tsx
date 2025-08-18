import type { Metadata } from "next";
import FaqList from "@/components/faq/FaqList";

export const metadata: Metadata = {
  title: "FAQ — AI Crypto Bot",
  description: "Відповіді на часті запитання про демо-бота та методологію.",
};

const faqs = [
  {
    q: "Чи безпечно підключати біржові ключі?",
    a: "У демо ключі не використовуються. Для реального продукту — тільки API-ключі з правами <em>trade</em> без виведення коштів. Ключі можна відкликати будь-коли в кабінеті біржі.",
  },
  {
    q: "Чи гарантує бот прибуток?",
    a: "Ні. Це інструмент для дисципліни та автоматизації. Крипторинок ризиковий, а минулі результати не гарантують майбутніх.",
  },
  {
    q: "Звідки беруться дані для графіків?",
    a: "На сайті використано демо-дані/бек-тести. У розділі «Продуктивність» описана методологія з урахуванням комісій і умовного проскальзування.",
  },
  {
    q: "Чи потрібен постійний моніторинг?",
    a: "Ні. Бот працює 24/7; є алерти, журнали дій та дашборд для контролю.",
  },
  {
    q: "Які способи оплати підтримуються?",
    a: "Криптовалюта з бірж <strong>Binance, Coinbase, Kraken, OKX, Bybit</strong> або гаманець <strong>MetaMask</strong>.",
  },
  {
    q: "Чи можна скасувати підписку?",
    a: "Так. Скасування діє з наступного розрахункового періоду. Історія доступна в журналі платежів.",
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

      {/* Хедер із бейджем і акцентною лінією */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
        <span className="badge-chip">Підтримка</span>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">FAQ</h1>
        <p className="mt-3 text-platinum-200/90">
          Короткі відповіді на часті запитання.
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

      {/* Список FAQ */}
      <div className="mt-6">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
