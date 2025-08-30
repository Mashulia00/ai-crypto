"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

type PnLPoint = { t: number | string; v: number };
type DDPoint  = { t: number | string; dd: number };
type ApiResp = { pnl?: PnLPoint[]; drawdown?: DDPoint[]; stats?: Record<string, any> };

const fetcher = (u: string) => fetch(u).then((r) => r.json()).catch(() => null);

/* ---------- in-view ---------- */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, inView };
}

/* ---------- count-up ---------- */
function useCountUp(target: number, start: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

/* ---------- sparkline ---------- */
function Sparkline({
  values,
  color,
  height = 56,
}: { values: number[]; color: string; height?: number }) {
  if (!values || values.length < 2) return null;
  const width = 280, pad = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (width - pad * 2) / (values.length - 1);

  let d = "";
  let lastX = pad;
  let lastY = height - pad - ((values[0] - min) / range) * (height - pad * 2);

  values.forEach((v, i) => {
    const x = pad + i * step;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    d += i ? ` L ${x} ${y}` : `M ${x} ${y}`;
    lastX = x; lastY = y;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-14 w-full">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} className="opacity-90" />
    </svg>
  );
}

/* ---------- APY from PnL (equity or cumulative %) ---------- */
function apyFromPnl(pointsIn: PnLPoint[]): number {
  if (!pointsIn || pointsIn.length < 2) return 0;

  const points = [...pointsIn]
    .map((p, i) => ({ t: typeof p.t === "number" ? p.t : i, v: Number(p.v) || 0 }))
    .sort((a, b) => a.t - b.t);

  if (points.every((p) => Math.abs(p.v) < 1e-9)) return 0;

  const firstNZ = points.find((p) => Math.abs(p.v) > 1e-9)?.v ?? points[0].v;
  const last    = points.at(-1)!.v;

  const absMax = Math.max(...points.map((p) => Math.abs(p.v)));
  const totalReturn =
    Math.abs(firstNZ) > 1 && Math.abs(last) > 1 && absMax > 10
      ? last / firstNZ - 1
      : (absMax > 2 ? last / 100 : last);

  let days = (points.at(-1)!.t - points[0].t) / 86_400_000;
  if (!isFinite(days) || days <= 0) days = points.length - 1 || 1;

  const annualized = Math.pow(1 + totalReturn, 365 / days) - 1;
  return Number((annualized * 100).toFixed(2));
}

/* if primary series is flat — use fallback for nicer curve */
function pickSeries(primary: number[], fallback: number[]) {
  if (!primary || primary.length < 2) return fallback;
  const min = Math.min(...primary);
  const max = Math.max(...primary);
  return Math.abs(max - min) < 1e-6 ? fallback : primary;
}

function KpiCard({
  label,
  value,
  suffix = "%",
  color = "var(--color-aqua)",
  series,
}: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  series?: number[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const num = useCountUp(value ?? 0, inView, 900);

  const formatted = useMemo(() => {
    const n = Number.isFinite(num) ? num : 0;
    return `${n.toFixed(2)}${suffix}`;
  }, [num, suffix]);

  return (
    <div ref={ref} className="group relative kpi-card rounded-2xl p-5">
      <div className="absolute inset-0 rounded-2xl kpi-shimmer pointer-events-none opacity-0 group-hover:opacity-100" />
      <div className="text-sm text-platinum-300">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
        {formatted}
      </div>
      <Sparkline values={series ?? []} color={color} />
    </div>
  );
}

export function StatsKPI() {
  const { data } = useSWR<ApiResp>("/api/performance", fetcher, { revalidateOnFocus: false });

  const pnl = (data?.pnl ?? []);
  const dd  = (data?.drawdown ?? []);

  const DEFAULT_APY = 28.4;
  const computedApy = typeof (data?.stats as any)?.apy === "number"
    ? (data!.stats as any).apy
    : apyFromPnl(pnl);

  const apy = Number.isFinite(computedApy) && Math.abs(computedApy) > 0.01
    ? computedApy
    : DEFAULT_APY;

  const maxDD   = (data?.stats as any)?.maxDD ?? (data?.stats as any)?.maxDrawdown ?? -12.3;
  const winRate = (data?.stats as any)?.winRate ?? 56.4;

  const pnlVals = pnl.map(p => Number(p.v) || 0);
  const ddVals  = dd.map(p => Number(p.dd) || 0);

  const apySeries  = pickSeries(pnlVals, ddVals);
  const winSeries  = pickSeries(pnlVals, ddVals);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <KpiCard
        label="APY* (demo)"
        value={apy}
        suffix="%"
        color="var(--color-aqua)"
        series={apySeries}
      />
      <KpiCard
        label="Max DD*"
        value={maxDD}
        suffix="%"
        color="#ef4444"
        series={ddVals}
      />
      <KpiCard
        label="Win Rate*"
        value={winRate}
        suffix="%"
        color="var(--color-platinum-500)"
        series={winSeries}
      />
    </div>
  );
}
