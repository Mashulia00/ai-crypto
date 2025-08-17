"use client";

import { useEffect, useMemo, useState } from "react";
import type { PerformanceResponse } from "@/lib/types";
import { Metric } from "@/components/visual/Metric";

type Props = {
  /** База для розрахунку APY з PnL (демо) */
  baseEquity?: number; // default 10000
};

export function StatsKPI({ baseEquity = 10000 }: Props) {
  const [data, setData] = useState<PerformanceResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/performance");
        const j: PerformanceResponse = await r.json();
        if (alive) setData(j);
      } catch {
        if (alive) setData(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const { apyPct, maxDDPct, winRatePct } = useMemo(() => {
    const pnl = data?.pnl ?? [];
    const stats = data?.stats;
    let apy = 0;

    if (pnl.length >= 2) {
      const first = pnl[0];
      const last = pnl[pnl.length - 1];
      const days = Math.max(1, (last.t - first.t) / 86_400_000);
      const equity0 = baseEquity + (first.value ?? 0);
      const equity1 = baseEquity + (last.value ?? 0);
      const totalReturn = equity1 / equity0;
      // геометрична річна дохідність ~ APY (демо)
      apy = (Math.pow(totalReturn, 365 / days) - 1) * 100;
    }

    return {
      apyPct: Number.isFinite(apy) ? apy : 0,
      maxDDPct: stats ? stats.maxDD : 0,
      winRatePct: stats ? stats.winRate : 0,
    };
  }, [data, baseEquity]);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* APY */}
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-platinum-300">APY* (демо)</div>
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            <Metric value={apyPct} suffix="%" duration={1100} />
          )}
        </div>
      </div>

      {/* Max Drawdown */}
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-platinum-300">Max DD*</div>
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            <Metric value={maxDDPct} suffix="%" duration={1000} />
          )}
        </div>
      </div>

      {/* Win Rate */}
      <div className="glass rounded-2xl p-5">
        <div className="text-sm text-platinum-300">Win Rate*</div>
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            <Metric value={winRatePct} suffix="%" duration={900} />
          )}
        </div>
      </div>
    </div>
  );
}
