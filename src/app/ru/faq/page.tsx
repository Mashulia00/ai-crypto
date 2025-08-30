import type { Metadata } from "next";
import FaqList from "@/components/faq/FaqList";

export const metadata: Metadata = {
  title: "FAQ — AI Crypto Bot",
  description: "Ответы на часто задаваемые вопросы о демо-боте и методологии",
};

const faqs = [
  {
    q: "Безопасно ли подключать ключи биржи?",
    a: "В демо-режиме ключи не используются. Для реального продукта применяются только API-ключи с правами <em>trade</em>, без доступа к выводу средств. Ключи можно отозвать в любое время в кабинете биржи.",
  },
  {
    q: "Гарантирует ли бот прибыль?",
    a: "Нет. Это инструмент для дисциплины и автоматизации. Крипторынок рискован, и прошлые результаты не гарантируют будущей доходности.",
  },
  {
    q: "Откуда берутся данные для графиков?",
    a: "Сайт использует демо-данные и бэктесты. Методология описана в разделе «Результаты», включая комиссии и смоделированное проскальзывание.",
  },
  {
    q: "Требуется ли постоянный контроль?",
    a: "Нет. Бот работает 24/7 с оповещениями, журналом действий и панелью управления.",
  },
  {
    q: "Какие методы оплаты поддерживаются?",
    a: "Криптовалюта через биржи <strong>Binance, Coinbase, Kraken, OKX, Bybit</strong> или кошелёк <strong>MetaMask</strong>.",
  },
  {
    q: "Можно ли отменить подписку?",
    a: "Да. Отмена вступает в силу со следующего расчётного периода. История доступна в журнале платежей.",
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
        <span className="badge-chip">Поддержка</span>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">FAQ</h1>
        <p className="mt-3 text-platinum-200/90">
          Краткие ответы на часто задаваемые вопросы
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
