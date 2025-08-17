"use client";

import { useEffect, useMemo, useState } from "react";
import type { PerformanceResponse, Point } from "@/lib/types";
import { ChartPnL } from "@/components/charts/ChartPnL";
import { ChartDrawdown } from "@/components/charts/ChartDrawdown";

export default function PerformanceClient() {
  const [perf, setPerf] = useState<PerformanceResponse | null>(null);

  useEffect(() => {
    fetch("/api/performance")
      .then((r) => r.json())
      .then(setPerf)
      .catch(() => setPerf(null));
  }, []);

  // 🔧 API => чарти: value -> pnl / dd
  const pnlData = useMemo(
    () => (perf?.pnl ?? []).map((p: Point) => ({ t: p.t, pnl: p.value })),
    [perf]
  );
  const ddData = useMemo(
    () => (perf?.drawdown ?? []).map((p: Point) => ({ t: p.t, dd: p.value })),
    [perf]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Продуктивність (демо)</h1>
      <p className="mt-2 text-platinum-300">
        Графіки PnL і просідання з демо-даними та короткою методологією.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ChartPnL data={pnlData} />
        <ChartDrawdown data={ddData} />
      </div>

      <div className="mt-8 glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Методологія (демо)</h2>
        <ul className="mt-3 list-disc pl-6 text-platinum-200">
          <li>Ураховані комісії та умовне проскальзування.</li>
          <li>Моделюються різні ринкові режими (тренд/флет/вола).</li>
          <li>Дані створено з навчальною метою; це не інвестпорада.</li>
        </ul>
      </div>
    </div>
  );
}
