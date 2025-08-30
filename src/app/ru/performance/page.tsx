"use client";

import useSWR from "swr";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Skeleton } from "@/components/visual/Skeleton";
import { RiskBanner } from "@/components/marketing/RiskBanner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type PnLPoint = { t: string | number; v: number };
type DrawPoint = { t: string | number; dd: number };
type ApiResp = {
  pnl?: any[];
  drawdown?: any[];
  stats?: { sharpe?: number; winRate?: number; maxDD?: number };
};

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()).catch(() => null);

// demo rows for better visuals
const demoPnL: PnLPoint[] = [
  { t: Date.now() - 36 * 864e5, v: 0 },
  { t: Date.now() - 30 * 864e5, v: 18 },
  { t: Date.now() - 24 * 864e5, v: 2 },
  { t: Date.now() - 18 * 864e5, v: -1 },
  { t: Date.now() - 12 * 864e5, v: 12 },
  { t: Date.now() - 6 * 864e5, v: 34 },
  { t: Date.now(), v: 26 },
];

const demoDD: DrawPoint[] = Array.from({ length: 26 }, (_, i) => {
  const t = Date.now() - (26 - i) * 864e5;
  const dd = -Math.abs((Math.sin(i * 1.2) * 10 + 2) | 0);
  return { t, dd };
});

const toMs = (x: any) => {
  const n = Number(x);
  return n < 1e12 ? n * 1000 : n;
};
const fmtDM = (x: any) =>
  new Date(toMs(x)).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });

// map with flat-series auto-check
function mapPnL(arr?: any[]): PnLPoint[] {
  const src = Array.isArray(arr) && arr.length ? arr : demoPnL;
  const mapped = src.map((p: any) => ({
    t: toMs(p?.t ?? p?.time ?? p?.x ?? Date.now()),
    v: Number(p?.v ?? p?.value ?? p?.pnl ?? p?.y ?? 0),
  }));
  const ys = mapped.map((m) => m.v);
  const min = Math.min(...ys),
    max = Math.max(...ys);
  if (!isFinite(min) || !isFinite(max) || Math.abs(max - min) < 1) return demoPnL;
  return mapped;
}

function mapDD(arr?: any[]): DrawPoint[] {
  const src = Array.isArray(arr) && arr.length ? arr : demoDD;
  const mapped = src.map((p: any) => ({
    t: toMs(p?.t ?? p?.time ?? p?.x ?? Date.now()),
    dd: Number(p?.dd ?? p?.value ?? p?.y ?? 0),
  }));
  return mapped;
}

export default function PerformancePage() {
  const { data, isLoading } = useSWR<ApiResp>("/api/performance", fetcher, {
    revalidateOnFocus: false,
  });

  const pnl = mapPnL(data?.pnl);
  const dd = mapDD(data?.drawdown);

  const pMin = Math.min(...pnl.map((i) => i.v));
  const pMax = Math.max(...pnl.map((i) => i.v));
  const pad = Math.max(2, (pMax - pMin) * 0.1 || 6);
  const pnlDomain: [number, number] = [
    Math.floor(pMin - pad),
    Math.ceil(pMax + pad),
  ];

  const ddMin = Math.min(...dd.map((i) => i.dd));
  const ddDomain: [number, number] = [Math.floor(ddMin - 1), 0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      {/* Заголовок */}
      <SectionReveal cascade>
        <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 p-5 md:p-7">
          <span className="badge-chip">Демо-данные</span>

          <div className="relative mt-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              <span className="mark-underline mark-underline--thick">
                Результаты
              </span>{" "}
              (демо)
            </h1>

            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 left-0 right-0 h-[3px] rounded-full opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, rgba(57,208,255,0), rgba(57,208,255,.9), rgba(57,208,255,0))",
                boxShadow: "0 0 24px rgba(57,208,255,.35)",
              }}
            />
          </div>

          <p className="mt-4 max-w-3xl text-platinum-200/90 md:text-lg">
            Графики прибыли/убытка и просадки с демо-данными и краткой методологией
          </p>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(600px 260px at 92% 0%, rgba(57,208,255,.14), transparent 60%)",
            }}
          />
        </header>
      </SectionReveal>

      {/* Графики */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* PnL */}
        <SectionReveal>
          <div className="group glass rounded-2xl p-4 md:p-5 transition-shadow duration-200 hover:shadow-[0_0_30px_rgba(57,208,255,.08)]">
            <p className="mb-2 text-sm text-platinum-400">PnL (демо)</p>
            {isLoading ? (
              <Skeleton className="h-[280px]" />
            ) : (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnl}>
                    <defs>
                      <linearGradient id="pnlG" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#39d0ff"
                          stopOpacity={0.55}
                        />
                        <stop
                          offset="100%"
                          stopColor="#39d0ff"
                          stopOpacity={0.06}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.06)" />
                    <XAxis
                      dataKey="t"
                      tick={{ fill: "rgba(255,255,255,.65)" }}
                      tickFormatter={fmtDM}
                    />
                    <YAxis
                      domain={pnlDomain}
                      tick={{ fill: "rgba(255,255,255,.65)" }}
                    />
                    <Tooltip
                      labelFormatter={(v) => fmtDM(v)}
                      contentStyle={{
                        background: "rgba(0,0,0,.72)",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 12,
                        color: "white",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#39d0ff"
                      fill="url(#pnlG)"
                      strokeWidth={2.25}
                      dot={{ r: 3, stroke: "transparent", fill: "#39d0ff" }}
                      activeDot={{ r: 4.5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Просадка */}
        <SectionReveal delay={0.08}>
          <div className="group glass rounded-2xl p-4 md:p-5 transition-shadow duration-200 hover:shadow-[0_0_30px_rgba(57,208,255,.08)]">
            <p className="mb-2 text-sm text-platinum-400">Просадка % (демо)</p>
            {isLoading ? (
              <Skeleton className="h-[280px]" />
            ) : (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dd}>
                    <defs>
                      <linearGradient id="ddG" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#39d0ff"
                          stopOpacity={0.45}
                        />
                        <stop
                          offset="100%"
                          stopColor="#39d0ff"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.06)" />
                    <XAxis
                      dataKey="t"
                      tick={{ fill: "rgba(255,255,255,.65)" }}
                      tickFormatter={fmtDM}
                    />
                    <YAxis
                      domain={ddDomain}
                      tick={{ fill: "rgba(255,255,255,.65)" }}
                    />
                    <Tooltip
                      labelFormatter={(v) => fmtDM(v)}
                      contentStyle={{
                        background: "rgba(0,0,0,.72)",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 12,
                        color: "white",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="dd"
                      stroke="#39d0ff"
                      fill="url(#ddG)"
                      strokeWidth={2.25}
                      dot={{ r: 0 }}
                      activeDot={{ r: 3.6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>

      {/* Методология */}
      <SectionReveal delay={0.12}>
        <div className="mt-8 cta-cyber rounded-2xl p-6">
          <h2 className="text-xl font-semibold md:text-2xl">
            <span className="mark-underline">Методология</span> (демо)
          </h2>
          <ul className="mt-3 space-y-2 text-platinum-200">
            <li className="flex items-start gap-2">
              <span className="bullet-dot mt-2" />
              <span>Учитываются комиссии и смоделированный проскальзывание</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bullet-dot mt-2" />
              <span>Смоделированы разные рыночные режимы (тренд, флэт, волатильность)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bullet-dot mt-2" />
              <span>
                Данные созданы исключительно в образовательных целях, это не инвестиционная
                рекомендация
              </span>
            </li>
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.16}>
        <div className="mt-6">
          <RiskBanner />
        </div>
      </SectionReveal>
    </div>
  );
}
