"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Button } from "@/components/ui/button";

type Period = "monthly" | "yearly";

const PRICES = {
  starter: 75,
  pro: 125,
  institutional: 300,
};

const YEARLY_DISCOUNT = 0.2;

function usePlanPrice() {
  const sp = useSearchParams();
  const plan = (sp.get("plan") || "starter") as keyof typeof PRICES;
  const period = (sp.get("period") || "monthly") as Period;

  const { amount, label } = useMemo(() => {
    const base = PRICES[plan];
    if (period === "monthly") return { amount: base, label: "/міс" };
    const yearly = Math.round(base * 12 * (1 - YEARLY_DISCOUNT));
    return { amount: yearly, label: "/рік" };
  }, [plan, period]);

  return { plan, period, amount, label };
}

export default function CheckoutPage() {
  const { plan, period, amount, label } = usePlanPrice();
  const [method, setMethod] = useState<"exchange" | "wallet">("exchange");
  const [network, setNetwork] = useState("USDT (TRC20)");
  const [addr, setAddr] = useState("0xDEMOdEAdBeEF0000000000000000000000000000");

  // Детект метамаску (для кнопки)
  const [hasMM, setHasMM] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) setHasMM(true);
  }, []);

  const EXCHANGES = ["Binance", "Coinbase", "Kraken", "OKX", "Bybit"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <SectionReveal>
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="mark-underline mark-underline--thick">Оплата</span> (демо)
          </h1>
          <p className="mt-3 max-w-3xl text-platinum-200/90 md:text-lg">
            Виберіть метод: з біржі або з криптогаманця. Підтримуємо USDT/USDC у популярних мережах.
          </p>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(700px 320px at 12% -10%, rgba(255,255,255,.07), transparent 60%), radial-gradient(600px 240px at 88% 0%, rgba(57,208,255,.14), transparent 60%)",
            }}
          />
        </header>
      </SectionReveal>

      {/* Резюме замовлення */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">План</div>
          <div className="mt-1 text-xl font-semibold capitalize">
            {plan === "starter" ? "Starter" : plan === "pro" ? "Pro" : "Institutional"}
          </div>
          <div className="mt-3 text-sm text-platinum-400">Сума</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">
            ${amount.toLocaleString("en-US")} <span className="text-base text-platinum-300">{label}</span>
          </div>
        </div>

        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">Метод</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => setMethod("exchange")}
              className={`px-3 py-2 rounded-lg border ${
                method === "exchange" ? "bg-aqua text-ink" : "border-white/10 bg-white/5 text-platinum-300"
              }`}
            >
              З біржі
            </button>
            <button
              onClick={() => setMethod("wallet")}
              className={`px-3 py-2 rounded-lg border ${
                method === "wallet" ? "bg-aqua text-ink" : "border-white/10 bg-white/5 text-platinum-300"
              }`}
            >
              З гаманця
            </button>
          </div>

          {method === "exchange" ? (
            <div className="mt-4">
              <div className="text-sm text-platinum-400">Популярні біржі</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {EXCHANGES.map((e) => (
                  <span key={e} className="badge-chip">{e}</span>
                ))}
              </div>
              <p className="mt-3 text-sm text-platinum-300">
                Виведіть <span className="text-white font-medium">USDT/USDC</span> на адресу нижче у вибраній мережі.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-platinum-300">
                Відкрийте MetaMask/інший гаманець та надішліть <span className="text-white font-medium">USDT/USDC</span> на адресу нижче.
              </p>
              {hasMM && (
                <button
                  onClick={async () => {
                    try {
                      // лише демо: просто попросимо підключення
                      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
                      alert("MetaMask підключено (демо). Здійсніть переказ на адресу нижче.");
                    } catch {}
                  }}
                  className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                >
                  Підключити MetaMask (демо)
                </button>
              )}
            </div>
          )}
        </div>

        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">Мережа / Токен</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {["USDT (TRC20)", "USDT (ERC20)", "USDC (ERC20)", "USDC (SOL)"].map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  network === n ? "bg-aqua text-ink" : "border-white/10 bg-white/5 text-platinum-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-platinum-400">Адреса для платежу</div>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-sm break-all">
            {addr}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(addr)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Скопіювати
            </button>
            <button
              onClick={() => alert("Демо: перевірка платежу виконується вручну/скриптом.")}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Я оплатив(ла)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 p-5 text-sm text-platinum-400 glass">
        Після підтвердження в мережі надішлемо доступ на e-mail, вказаний під час демо-запиту.
        Ця сторінка — демо інтерфейс без реальної обробки ончейн-подій.
      </div>
    </div>
  );
}
