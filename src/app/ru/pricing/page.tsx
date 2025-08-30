"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/* ---------- data ---------- */
type Plan = {
  id: "trial" | "starter" | "pro" | "institutional";
  title: string;
  monthly: number;
  popular?: boolean;
  features: string[];
  trial?: boolean; // спец. поведение для бесплатного триала
};

// порядок: Free (trial) → Starter → Pro → Institutional
const PLANS: Plan[] = [
  {
    id: "trial",
    title: "Бесплатно",
    monthly: 0,
    trial: true,
    features: [
      "Полный доступ (Pro) на 3 дня",
      "Без привязки карты",
      "Автоматически отключается через 72 часа",
    ],
  },
  {
    id: "starter",
    title: "Старт",
    monthly: 75,
    features: [
      "Демо-панель (только просмотр)",
      "Журнал сделок (заглушка)",
      "Базовые параметры риска",
    ],
  },
  {
    id: "pro",
    title: "Профи",
    monthly: 125,
    popular: true,
    features: [
      "Полная панель (демо-данные)",
      "Метрики PnL / DD / WinRate",
      "Экспорт отчётов (заглушка)",
      "API-ключи только для чтения",
    ],
  },
  {
    id: "institutional",
    title: "Институциональный",
    monthly: 300,
    features: [
      "Кастомные метрики/отчёты",
      "Пилот с командой (обзор)",
      "Поддержка интеграций",
      "SLA и приоритетные обновления",
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
      sub: "/мес",
      perMonthSaved: null as number | null,
    };
  }
  const oldYear = monthly * 12;
  const currentYear = Math.round(oldYear * 0.8); // -20%
  const approxPerMonth = Math.round(monthly * 0.8);
  return {
    lineThrough: oldYear,
    current: currentYear,
    sub: "/год",
    perMonthSaved: approxPerMonth,
  };
}

/* ---------- tiny count animation ---------- */
function useAnimatedNumber(target: number | null, duration = 500) {
  const [val, setVal] = useState<number | null>(target);
  const fromRef = useRef<number>(target ?? 0);
  useEffect(() => {
    if (target === null) {
      setVal(null);
      fromRef.current = 0;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = (val ?? target) as number;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const cur = Math.round(from + (target - from) * ease(p));
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
  // спец. отображение для trial-карточки
  const [trialStatus, setTrialStatus] =
    useState<"idle" | "loading" | "ok" | "error">("idle");

  async function startTrial() {
    try {
      setTrialStatus("loading");
      const res = await fetch("/api/trial", { method: "POST" });
      if (!res.ok) throw new Error("Ошибка");
      setTrialStatus("ok");
    } catch {
      setTrialStatus("error");
    }
  }

  const p = priceBlock(plan.monthly, yearly);
  const currAnim = useAnimatedNumber(plan.trial ? null : p.current, 520);
  const oldAnim = useAnimatedNumber(plan.trial ? null : p.lineThrough, 520);
  const pmAnim = useAnimatedNumber(plan.trial ? null : p.perMonthSaved, 520);

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
        <span className="absolute right-4 top-4 badge-chip">Рекомендуем</span>
      )}

      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        <span className="plan-chip">
          <span className="plan-chip__text">{plan.title}</span>
        </span>
      </h3>

      <div className="mt-4 flex items-baseline gap-3">
        {/* PRICE AREA */}
        {plan.trial ? (
          <div className="text-4xl font-semibold tracking-tight">
            Бесплатно
            <span className="ml-1 text-base font-normal text-platinum-300">
              /3 дня
            </span>
          </div>
        ) : (
          <>
            <span
              className={`text-platinum-500 line-through transition-opacity duration-300 ${
                yearly ? "opacity-100" : "opacity-0"
              }`}
            >
              {oldAnim !== null ? money(oldAnim) : ""}
            </span>

            <div className="text-4xl font-semibold tracking-tight">
              {currAnim !== null ? money(currAnim) : ""}
              <span className="ml-1 text-base font-normal text-platinum-300">
                {p.sub}
              </span>
            </div>

            <span
              className={`badge-chip transition-opacity duration-300 ${
                yearly ? "opacity-100" : "opacity-0"
              }`}
            >
              ≈ {pmAnim !== null ? money(pmAnim) : ""}/мес
            </span>
          </>
        )}
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
        {plan.trial ? (
          <>
            <Button
              onClick={startTrial}
              disabled={trialStatus === "loading" || trialStatus === "ok"}
              className="bg-aqua text-ink hover:opacity-90"
            >
              {trialStatus === "ok"
                ? "Активировано"
                : trialStatus === "loading"
                ? "Активация…"
                : "Начать бесплатный пробный период"}
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white/10"
              disabled
              title="Включено: полный Pro на 3 дня"
            >
              <span>Включено</span>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="bg-aqua text-ink hover:opacity-90">
              <Link
                href={`/pay?plan=${plan.id}&period=${yearly ? "year" : "month"}`}
              >
                Оплатить криптой
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-white/10">
              <Link href={`/how-it-works`}>Подробнее</Link>
            </Button>
          </>
        )}
      </div>

      {/* бейджи — скрываем для trial */}
      {!plan.trial && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-platinum-400">
          <span className="badge-chip">Binance</span>
          <span className="badge-chip">Coinbase</span>
          <span className="badge-chip">Kraken</span>
          <span className="badge-chip">OKX</span>
          <span className="badge-chip">Bybit</span>
          <span className="badge-chip">MetaMask</span>
        </div>
      )}

      {/* trial status messages */}
      {plan.trial && trialStatus === "ok" && (
        <div className="mt-4 text-sm text-emerald-400">
          Триал активирован. Перезагрузите страницу, если функции не появились.
        </div>
      )}
      {plan.trial && trialStatus === "error" && (
        <div className="mt-4 text-sm text-rose-400">
          Что-то пошло не так. Попробуйте снова.
        </div>
      )}
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
            <span className="mark-underline mark-underline--thick">
              Тарифы
            </span>
          </h1>
          <p className="mt-3 max-w-3xl text-platinum-200/90 md:text-lg">
            Просто и прозрачно. Все данные на сайте демонстрационные.
          </p>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
            style={headerAura}
          />
        </header>
      </SectionReveal>

      {/* Переключатель оплаты */}
      <div className="mt-8 text-center">
        <div className="text-sm text-platinum-400/80">Период оплаты</div>

        <div
          role="tablist"
          aria-label="Период оплаты"
          className="relative mx-auto mt-3 inline-flex rounded-2xl bg-white/5 p-1 backdrop-blur-xl shadow-[0_12px_34px_rgba(0,0,0,.38),0_0_30px_rgba(57,208,255,.12)]"
        >
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
            Ежемесячно
          </button>
          <button
            role="tab"
            aria-selected={yearly}
            onClick={() => setYearly(true)}
            className={`relative z-10 rounded-xl px-6 py-2 text-sm transition ${
              yearly ? "text-ink" : "text-white/90"
            }`}
          >
            Ежегодно (-20%)
          </button>
        </div>
      </div>

      {/* тарифные планы */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((pl, i) => (
          <PlanCard key={pl.id} plan={pl} yearly={yearly} index={i} />
        ))}
      </div>

      <p className="mt-10 text-sm text-platinum-400">
        * Оплата криптовалютой. Поддерживаем Binance, Coinbase, Kraken, OKX, Bybit и кошельки
        (MetaMask/другие). После успешной оплаты доступ открывается автоматически или в течение 24 часов
        (демо-режим).
      </p>
    </div>
  );
}
