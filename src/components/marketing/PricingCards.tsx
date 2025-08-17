"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type Plan = {
  name: string;
  price: string;
  period?: string;
  highlight?: boolean;
  cta: string;
  features: ReactNode[];
  note?: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/demo",
    cta: "Спробувати демо",
    features: [
      "Дашборд (read-only)",
      "Живі графіки PnL/ціни (демо-дані)",
      "Опис методології та ризиків",
      "Пошта підтримки",
    ],
    note: "Для ознайомлення. Без підключення бірж."
  },
  {
    name: "Pro",
    price: "$29",
    period: "/місяць",
    highlight: true,
    cta: "У чергу доступу",
    features: [
      "Повний дашборд (демо-режим)",
      "Ризик-параметри (read-only)",
      "Алерти (email/телеграм) — демо",
      "Приорітетні оновлення",
    ],
    note: "Ціни — плейсхолдер. Жодних інвестобіцянок."
  },
  {
    name: "Institutional",
    price: "Індивід.",
    cta: "Звʼязатися",
    features: [
      "Консультація з методології",
      "Пілот на демо-даних",
      "Звітність і ризик-фреймворк",
      "Підтримка команди",
    ],
    note: "Лише за попереднім узгодженням."
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <Card
          key={p.name}
          className={`glass rounded-2xl p-6 ${p.highlight ? "ring-1 ring-aqua/40" : ""}`}
        >
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="text-3xl font-bold">{p.price}</div>
          </div>
          {p.period && <div className="text-platinum-400 mb-4">{p.period}</div>}
          <ul className="space-y-2 mb-6">
            {p.features.map((f, i) => (
              <li key={i} className="text-platinum-200">• {f}</li>
            ))}
          </ul>
          <Button className={`w-full ${p.highlight ? "bg-aqua text-ink hover:opacity-90" : ""}`}>
            {p.cta}
          </Button>
          {p.note && <p className="mt-3 text-sm text-platinum-400">{p.note}</p>}
        </Card>
      ))}
    </div>
  );
}
