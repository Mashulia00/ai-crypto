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
  pnl: PnLPoint[];
  drawdown: DrawPoint[];
  stats?: { sharpe?: number; winRate?: number; maxDD?: number };
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PerformancePage() {
  const { data, isLoading } = useSWR<ApiResp>("/api/performance", fetcher);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Продуктивність (демо)</h1>
      <p className="mt-2 text-platinum-300">
        Графіки PnL і просідання з демо-даними та короткою методологією.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* PnL */}
        <SectionReveal>
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 text-sm text-platinum-400">PnL (демо)</p>
            {isLoading ? (
              <Skeleton className="h-[280px]" />
            ) : (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.pnl ?? []}>
                    <defs>
                      <linearGradient id="pnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#39d0ff" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#39d0ff" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.06)" />
                    <XAxis dataKey="t" tick={{ fill: "rgba(255,255,255,.6)" }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,.6)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,.7)",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#39d0ff"
                      fill="url(#pnl)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Drawdown */}
        <SectionReveal delay={0.08}>
          <div className="glass rounded-2xl p-4">
            <p className="mb-2 text-sm text-platinum-400">Drawdown % (демо)</p>
            {isLoading ? (
              <Skeleton className="h-[280px]" />
            ) : (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.drawdown ?? []}>
                    <defs>
                      <linearGradient id="dd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#39d0ff" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#39d0ff" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,.06)" />
                    <XAxis dataKey="t" tick={{ fill: "rgba(255,255,255,.6)" }} />
                    <YAxis tick={{ fill: "rgba(255,255,255,.6)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,.7)",
                        border: "1px solid rgba(255,255,255,.1)",
                        borderRadius: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="dd"
                      stroke="#39d0ff"
                      fill="url(#dd)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>

      {/* Методологія + дисклеймер */}
      <SectionReveal delay={0.12}>
        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Методологія (демо)</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-platinum-200">
            <li>Ураховані комісії та умовне проскальзування.</li>
            <li>Моделюються різні ринкові режими (тренд/флет/вола).</li>
            <li>Дані створено з навчальною метою; це не інвестпорада.</li>
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
