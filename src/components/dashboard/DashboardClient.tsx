"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  PricesResponse,
  PerformanceResponse,
  Position,
  Trade,
  PnLPoint,
} from "@/lib/types";
import { ChartPrice } from "@/components/charts/ChartPrice";
import { ChartPnL } from "@/components/charts/ChartPnL";
import { RiskBanner } from "@/components/marketing/RiskBanner";

export function DashboardClient() {
  const [prices, setPrices] = useState<PricesResponse | null>(null);
  const [perf, setPerf] = useState<PerformanceResponse | null>(null);

  useEffect(() => {
    fetch("/api/prices?pair=BTCUSDT&tf=1h")
      .then((r) => r.json())
      .then(setPrices)
      .catch(() => setPrices(null));

    fetch("/api/performance")
      .then((r) => r.json())
      .then(setPerf)
      .catch(() => setPerf(null));
  }, []);

  // ---- МАПІНГ під ChartPnL (очікує { t, pnl }) ----
  const pnlPoints: PnLPoint[] = (perf?.pnl ?? []).map((p) => ({
    t: p.t,
    pnl: p.value,
  }));
  const lastPnlValue = perf?.pnl.at(-1)?.value ?? 0;

  // демо-позиції і угоди
  const positions: Position[] = useMemo(() => {
    const mark = prices?.candles.at(-1)?.c ?? 60000;
    return [
      {
        id: "p1",
        symbol: "BTCUSDT",
        side: "LONG",
        qty: 0.25,
        entry: mark * 0.97,
        mark,
        pnl: +(mark * 0.25 - mark * 0.25 * 0.97).toFixed(2),
        riskPct: 1.2,
      },
      {
        id: "p2",
        symbol: "ETHUSDT",
        side: "SHORT",
        qty: 1.0,
        entry: 3300,
        mark: 3255,
        pnl: +((3300 - 3255) * 1.0).toFixed(2),
        riskPct: 0.8,
      },
    ];
  }, [prices]);

  const trades: Trade[] = useMemo(() => {
    const now = Date.now();
    return [
      {
        id: "t1",
        ts: now - 60 * 60 * 1000,
        symbol: "BTCUSDT",
        side: "BUY",
        qty: 0.1,
        price: 59850,
        fee: 1.1,
        pnl: 12.3,
      },
      {
        id: "t2",
        ts: now - 2 * 60 * 60 * 1000,
        symbol: "BTCUSDT",
        side: "SELL",
        qty: 0.1,
        price: 60220,
        fee: 1.1,
        pnl: 35.5,
      },
      {
        id: "t3",
        ts: now - 3 * 60 * 60 * 1000,
        symbol: "ETHUSDT",
        side: "SELL",
        qty: 0.5,
        price: 3280,
        fee: 0.8,
        pnl: -8.2,
      },
    ];
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Дашборд (демо-дані)</h1>
      <p className="mt-2 text-platinum-300">
        Баланс/позиції/графіки. Всі числа умовні — для демонстрації.
      </p>

      {/* Top stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-4">
          <div className="text-sm text-platinum-300">Баланс</div>
          <div className="text-2xl font-semibold">$10,000</div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-sm text-platinum-300">Поточна еквіті</div>
          <div className="text-2xl font-semibold">
            ${(10000 + lastPnlValue).toFixed(2)}
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="text-sm text-platinum-300">PnL (YTD)</div>
          <div className="text-2xl font-semibold">
            {lastPnlValue.toFixed(2)} $
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ChartPrice data={prices?.candles ?? []} title="BTC/USDT Close (демо)" />
        <ChartPnL data={pnlPoints} />
      </div>

      {/* Positions */}
      <h2 className="mt-10 text-2xl font-semibold">Відкриті позиції</h2>
      <div className="mt-3 overflow-x-auto glass rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="text-left text-platinum-300">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3">Символ</th>
              <th className="px-4 py-3">Сторона</th>
              <th className="px-4 py-3">Кількість</th>
              <th className="px-4 py-3">Entry</th>
              <th className="px-4 py-3">Mark</th>
              <th className="px-4 py-3">PnL</th>
              <th className="px-4 py-3">Ризик</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="px-4 py-3">{p.symbol}</td>
                <td className="px-4 py-3">{p.side}</td>
                <td className="px-4 py-3">{p.qty}</td>
                <td className="px-4 py-3">{p.entry.toFixed(2)}</td>
                <td className="px-4 py-3">{p.mark.toFixed(2)}</td>
                <td className={`px-4 py-3 ${p.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {p.pnl.toFixed(2)}
                </td>
                <td className="px-4 py-3">{p.riskPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trades */}
      <h2 className="mt-10 text-2xl font-semibold">Історія угод</h2>
      <div className="mt-3 overflow-x-auto glass rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="text-left text-platinum-300">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3">Час</th>
              <th className="px-4 py-3">Символ</th>
              <th className="px-4 py-3">Сторона</th>
              <th className="px-4 py-3">Кількість</th>
              <th className="px-4 py-3">Ціна</th>
              <th className="px-4 py-3">Комісія</th>
              <th className="px-4 py-3">PnL</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id} className="border-b border-white/5">
                <td className="px-4 py-3">{new Date(t.ts).toLocaleString()}</td>
                <td className="px-4 py-3">{t.symbol}</td>
                <td className="px-4 py-3">{t.side}</td>
                <td className="px-4 py-3">{t.qty}</td>
                <td className="px-4 py-3">{t.price}</td>
                <td className="px-4 py-3">{t.fee}</td>
                <td className={`px-4 py-3 ${!t.pnl || t.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {t.pnl?.toFixed(2) ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RiskBanner />
    </div>
  );
}
