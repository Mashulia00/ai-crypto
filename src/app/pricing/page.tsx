"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/* ---------- data ---------- */
type Plan = {
  id: "starter" | "pro" | "institutional";
  title: string;
  monthly: number;
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    title: "Starter",
    monthly: 75,
    features: [
      "Демо-дашборд (read-only)",
      "Журнал угод (плейсхолдер)",
      "Ризик-параметри за замовч.",
    ],
  },
  {
    id: "pro",
    title: "Pro",
    monthly: 125,
    popular: true,
    features: [
      "Повний дашборд (демо-дані)",
      "Метрики PnL / DD / WinRate",
      "Експорт звітів (плейсхолдер)",
      "API-ключі read-only",
    ],
  },
  {
    id: "institutional",
    title: "Institutional",
    monthly: 300,
    features: [
      "Кастомні метрики/репорти",
      "Пілот із командою (опис)",
      "Підтримка інтеграцій",
      "SLA та пріоритетні оновлення",
    ],
  },
];

/* ---------- helpers ---------- */
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function priceBlock(monthly: number, yearly: boolean) {
  if (!yearly) {
    return {
      lineThrough: null as number | null,
      current: monthly,
      sub: "/міс",
      perMonthSaved: null as number | null,
    };
  }
  const oldYear = monthly * 12;
  const currentYear = Math.round(oldYear * 0.8); // -20%
  const approxPerMonth = Math.round(monthly * 0.8);
  return {
    lineThrough: oldYear,
    current: currentYear,
    sub: "/рік",
    perMonthSaved: approxPerMonth,
  };
}

/* ---------- tiny count animation ---------- */
function useAnimatedNumber(target: number | null, duration = 500) {
  const [val, setVal] = useState<number | null>(target);
  const fromRef = useRef<number>(target ?? 0);
  const toRef = useRef<number | null>(target);
  useEffect(() => {
    if (target === null) {
      setVal(null);
      toRef.current = null;
      fromRef.current = 0;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = (val ?? target) as number;
    fromRef.current = from;
    toRef.current = target;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = ease(p);
      const cur = Math.round(from + (target - from) * eased);
      setVal(cur);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/* ---------- UI ---------- */
function PlanCard({
  plan,
  yearly,
  index,
}: {
  plan: Plan;
  yearly: boolean;
  index: number;
}) {
  const p = priceBlock(plan.monthly, yearly);

  const currAnim = useAnimatedNumber(p.current, 520);
  const oldAnim = useAnimatedNumber(p.lineThrough, 520);
  const pmAnim = useAnimatedNumber(p.perMonthSaved, 520);

  return (
    <div
      data-shown="true"
      className="relative feature-card rounded-2xl p-5 md:p-6 touch-manipulation"
      style={{ animationDelay: `${index * 70}ms` }}
      onPointerDown={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", `${e.clientX - r.left}px`);
        el.style.setProperty("--py", `${e.clientY - r.top}px`);
        el.classList.add("pressed");
      }}
      onPointerUp={(e) => e.currentTarget.classList.remove("pressed")}
      onPointerLeave={(e) => e.currentTarget.classList.remove("pressed")}
      onPointerCancel={(e) => e.currentTarget.classList.remove("pressed")}
    >
      {plan.popular && (
        <span className="absolute right-4 top-4 badge-chip">Рекомендовано</span>
      )}

      <h3 className="text-xl font-semibold md:text-2xl">{plan.title}</h3>

      <div className="mt-4 flex items-baseline gap-3">
        {/* стара річна */}
        <span
          className={`text-platinum-500 line-through transition-opacity duration-300 ${
            yearly ? "opacity-100" : "opacity-0"
          }`}
        >
          {oldAnim !== null ? money(oldAnim) : ""}
        </span>

        {/* поточна */}
        <div className="text-4xl font-semibold tracking-tight">
          {currAnim !== null ? money(currAnim) : ""}
          <span className="ml-1 text-base font-normal text-platinum-300">
            {p.sub}
          </span>
        </div>

        {/* ≈/міс для річного */}
        <span
          className={`badge-chip transition-opacity duration-300 ${
            yearly ? "opacity-100" : "opacity-0"
          }`}
        >
          ≈ {pmAnim !== null ? money(pmAnim) : ""}/міс
        </span>
      </div>

      <div className="my-5 h-px w-full bg-white/10" />

      <ul className="space-y-2">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <Check className="mt-[2px] h-4 w-4 text-aqua" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="bg-aqua text-ink hover:opacity-90">
          <Link href={`/pay?plan=${plan.id}&period=${yearly ? "year" : "month"}`}>
            Оплатити криптою
          </Link>
        </Button>
        <Button variant="outline" asChild className="border-white/10">
          <Link href={`/how-it-works`}>Деталі</Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-platinum-400">
        <span className="badge-chip">Binance</span>
        <span className="badge-chip">Coinbase</span>
        <span className="badge-chip">Kraken</span>
        <span className="badge-chip">OKX</span>
        <span className="badge-chip">Bybit</span>
        <span className="badge-chip">MetaMask</span>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  const headerAura = useMemo(
    () => ({
      background:
        "radial-gradient(700px 320px at 12% -10%, rgba(255,255,255,.07), transparent 60%), radial-gradient(600px 240px at 88% 0%, rgba(57,208,255,.14), transparent 60%)",
    }),
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <SectionReveal>
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="mark-underline mark-underline--thick">Ціни</span>
          </h1>
          <p className="mt-3 max-w-3xl text-platinum-200/90 md:text-lg">
            Стримано, прозоро, без маркетингової «води». Усі дані на сайті — демо.
          </p>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
            style={headerAura}
          />
        </header>
      </SectionReveal>

      {/* Segmented toggle (centered, no border, smooth slider + shadow) */}
      <div className="mt-8 text-center">
        <div className="text-sm text-platinum-400/80">Період оплати</div>

        <div
          role="tablist"
          aria-label="Період оплати"
          className="relative mx-auto mt-3 inline-flex rounded-2xl bg-white/5 p-1 backdrop-blur-xl shadow-[0_12px_34px_rgba(0,0,0,.38),0_0_30px_rgba(57,208,255,.12)]"
        >
          {/* slider */}
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 w-1/2 rounded-xl bg-aqua shadow-[0_10px_34px_rgba(57,208,255,.35)] transition-transform duration-300 will-change-transform"
            style={{ transform: yearly ? "translateX(100%)" : "translateX(0%)" }}
          />

          <button
            role="tab"
            aria-selected={!yearly}
            onClick={() => setYearly(false)}
            className={`relative z-10 rounded-xl px-6 py-2 text-sm transition ${
              !yearly ? "text-ink" : "text-white/90"
            }`}
          >
            Місячно
          </button>

          <button
            role="tab"
            aria-selected={yearly}
            onClick={() => setYearly(true)}
            className={`relative z-10 rounded-xl px-6 py-2 text-sm transition ${
              yearly ? "text-ink" : "text-white/90"
            }`}
          >
            Річно (-20%)
          </button>
        </div>
      </div>

      {/* plans */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((pl, i) => (
          <PlanCard key={pl.id} plan={pl} yearly={yearly} index={i} />
        ))}
      </div>

      <p className="mt-10 text-sm text-platinum-400">
        * Оплата криптовалютою. Підтримуємо біржі Binance, Coinbase, Kraken, OKX, Bybit і гаманці
        (MetaMask/ін.). Після успішного платежу доступ активується автоматично або протягом 24 год
        (демо-режим).
      </p>
    </div>
  );
}
