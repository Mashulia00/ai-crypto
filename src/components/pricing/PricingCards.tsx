"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
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

export function PricingCards() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "ru" ? "ru" : "en";
  }, [pathname]);

  const plans: Plan[] =
    locale === "ru"
      ? [
          {
            name: "Старт",
            price: "$0",
            period: "/демо",
            cta: "Попробовать демо",
            features: [
              "Дашборд (только чтение)",
              "Живые графики PnL/цены (демо-данные)",
              "Описание методологии и рисков",
              "Поддержка по email",
            ],
            note: "Для ознакомления. Без подключения к бирже.",
          },
          {
            name: "Pro",
            price: "$29",
            period: "/месяц",
            highlight: true,
            cta: "В лист ожидания",
            features: [
              "Полный дашборд (демо-режим)",
              "Параметры риска (только чтение)",
              "Оповещения (email/telegram) — демо",
              "Приоритетные обновления",
            ],
            note: "Цены — заглушки. Не являются обещанием доходности.",
          },
          {
            name: "Institutional",
            price: "Индивидуально",
            cta: "Связаться с нами",
            features: [
              "Консультация по методологии",
              "Пилот на демо-данных",
              "Отчётность и риск-фреймворк",
              "Поддержка команды",
            ],
            note: "Только по предварительной договорённости.",
          },
        ]
      : [
          {
            name: "Starter",
            price: "$0",
            period: "/demo",
            cta: "Try demo",
            features: [
              "Dashboard (read-only)",
              "Live PnL/price charts (demo data)",
              "Description of methodology and risks",
              "Email support",
            ],
            note: "For introduction. No exchange connection.",
          },
          {
            name: "Pro",
            price: "$29",
            period: "/month",
            highlight: true,
            cta: "Join waitlist",
            features: [
              "Full dashboard (demo mode)",
              "Risk parameters (read-only)",
              "Alerts (email/telegram) — demo",
              "Priority updates",
            ],
            note: "Prices are placeholders. No investment promises.",
          },
          {
            name: "Institutional",
            price: "Individual",
            cta: "Contact us",
            features: [
              "Methodology consultation",
              "Pilot on demo data",
              "Reporting and risk framework",
              "Team support",
            ],
            note: "By prior agreement only.",
          },
        ];

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
              <li key={i} className="text-platinum-200">
                • {f}
              </li>
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

export default PricingCards;
