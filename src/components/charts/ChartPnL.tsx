"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PnLPoint } from "@/lib/types";

export function ChartPnL({ data }: { data: PnLPoint[] }) {
  return (
    <div className="glass rounded-2xl p-4 h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 12, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#39d0ff" stopOpacity={0.30} />
              <stop offset="100%" stopColor="#39d0ff" stopOpacity={0.06} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
          <XAxis
            dataKey="t"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => new Date(Number(v)).toLocaleDateString()}
          />
          <YAxis tickFormatter={(v) => `${Number(v).toFixed(0)} $`} />
          <Tooltip
            labelFormatter={(v) => new Date(Number(v)).toLocaleString()}
            formatter={(v: number) => [`${v.toFixed(2)} $`, "PnL"]}
          />
          <Area
            type="monotone"
            dataKey="pnl"
            stroke="#39d0ff"
            fill="url(#pnlFill)"
            strokeWidth={1.5}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
