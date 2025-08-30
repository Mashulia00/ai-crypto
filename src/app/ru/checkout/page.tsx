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
    if (period === "monthly") return { amount: base, label: "/мес" };
    const yearly = Math.round(base * 12 * (1 - YEARLY_DISCOUNT));
    return { amount: yearly, label: "/год" };
  }, [plan, period]);

  return { plan, period, amount, label };
}

export default function CheckoutPage() {
  const { plan, period, amount, label } = usePlanPrice();
  const [method, setMethod] = useState<"exchange" | "wallet">("exchange");
  const [network, setNetwork] = useState("USDT (TRC20)");
  const [addr, setAddr] = useState("0xDEMOdEAdBeEF0000000000000000000000000000");

  // detect MetaMask (for button)
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
            Выберите способ: через биржу или криптокошелёк. Поддерживаем USDT/USDC в популярных сетях.
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

      {/* Order summary */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">Тариф</div>
          <div className="mt-1 text-xl font-semibold capitalize">
            {plan === "starter" ? "Starter" : plan === "pro" ? "Pro" : "Institutional"}
          </div>
          <div className="mt-3 text-sm text-platinum-400">Сумма</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">
            ${amount.toLocaleString("en-US")}{" "}
            <span className="text-base text-platinum-300">{label}</span>
          </div>
        </div>

        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">Способ</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => setMethod("exchange")}
              className={`px-3 py-2 rounded-lg border ${
                method === "exchange" ? "bg-aqua text-ink" : "border-white/10 bg-white/5 text-platinum-300"
              }`}
            >
              С биржи
            </button>
            <button
              onClick={() => setMethod("wallet")}
              className={`px-3 py-2 rounded-lg border ${
                method === "wallet" ? "bg-aqua text-ink" : "border-white/10 bg-white/5 text-platinum-300"
              }`}
            >
              Из кошелька
            </button>
          </div>

          {method === "exchange" ? (
            <div className="mt-4">
              <div className="text-sm text-platinum-400">Популярные биржи</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {EXCHANGES.map((e) => (
                  <span key={e} className="badge-chip">
                    {e}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-platinum-300">
                Выведите <span className="text-white font-medium">USDT/USDC</span> на адрес ниже в выбранной сети.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-platinum-300">
                Откройте MetaMask или другой кошелёк и отправьте{" "}
                <span className="text-white font-medium">USDT/USDC</span> на адрес ниже.
              </p>
              {hasMM && (
                <button
                  onClick={async () => {
                    try {
                      // demo only: just request connection
                      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
                      alert("MetaMask подключен (демо). Пожалуйста, отправьте средства на адрес ниже.");
                    } catch {}
                  }}
                  className="mt-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                >
                  Подключить MetaMask (демо)
                </button>
              )}
            </div>
          )}
        </div>

        <div className="feature-card rounded-2xl p-5 md:p-6">
          <div className="text-sm text-platinum-400">Сеть / Токен</div>
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

          <div className="mt-4 text-sm text-platinum-400">Адрес для оплаты</div>
          <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-sm break-all">
            {addr}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(addr)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Копировать
            </button>
            <button
              onClick={() => alert("Демо: проверка платежа выполняется вручную/скриптом")}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              Я оплатил(а)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 p-5 text-sm text-platinum-400 glass">
        После подтверждения в сети мы отправим доступ на email, указанный в запросе демо.
        Эта страница — демо-интерфейс без реальной обработки ончейн-событий.
      </div>
    </div>
  );
}
