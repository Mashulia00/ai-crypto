import type { Metadata } from "next";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { TiltCard } from "@/components/visual/TiltCard";
import { Button } from "@/components/ui/button";
import { RiskBanner } from "@/components/marketing/RiskBanner";

export const metadata: Metadata = {
  title: "Ціни — AI Crypto Bot",
  description:
    "Плани для старту та зростання. Демо-дані, дашборд read-only, прозора методологія.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    name: "Starter",
    price: "—",
    period: "",
    features: [
      "Демо-дашборд (read-only)",
      "Журнал угод (плейсхолдер)",
      "Ризик-параметри за замовч.",
    ],
    cta: "Запросити демо",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/міс",
    features: [
      "Повний дашборд (демо-дані)",
      "Метрики PnL / DD / WinRate",
      "Експорт звітів (плейсхолдер)",
    ],
    cta: "Запросити демо",
    highlight: true,
  },
  {
    name: "Institutional",
    price: "—",
    period: "",
    features: [
      "Кастомні метрики/репорти",
      "Пілот із командою (опис)",
      "Підтримка інтеграцій",
    ],
    cta: "Звʼязатися",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionReveal>
        <h1 className="text-3xl font-semibold">Ціни</h1>
        <p className="mt-2 text-platinum-300">
          Стримано, прозоро, без маркетингової «води». Усі дані на сайті — демо.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.12}>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const card = (
              <div
                className={[
                  "rounded-2xl p-6 glass h-full flex flex-col",
                  p.highlight ? "ring-1 ring-aqua/40 shadow-lg" : "",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  {p.highlight && (
                    <span className="rounded-full bg-aqua/15 px-2 py-1 text-xs text-aqua">
                      Рекомендовано
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="text-3xl font-semibold">
                    {p.price} <span className="text-base font-normal">{p.period}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-platinum-200">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-aqua/70" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    className={p.highlight ? "bg-aqua text-ink hover:opacity-90" : ""}
                    variant={p.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href="/contact">{p.cta}</a>
                  </Button>
                </div>

                <div className="flex-1" />
              </div>
            );

            return (
              <TiltCard key={p.name} glare={false} max={3}>
                {card}
              </TiltCard>
            );
          })}
        </div>
      </SectionReveal>

      <div className="mt-10">
        <RiskBanner />
      </div>
    </div>
  );
}
