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
    cta: "Try demo",
    features: [
      "Dashboard (read-only)",
      "Live PnL/price charts (demo data)",
      "Description of methodology and risks",
      "Email support",
    ],
    note: "For introduction Only without exchange connection."
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
    note: "Prices are placeholders No investment promises."
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
    note: "By prior agreement only."
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
