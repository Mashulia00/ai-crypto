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
import type { DDPoint } from "@/lib/types";

export function ChartDrawdown({ data }: { data: DDPoint[] }) {
  return (
    <div className="glass rounded-2xl p-4 h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 12, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="ddFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#39d0ff" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#39d0ff" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
          <XAxis
            dataKey="t"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => new Date(Number(v)).toLocaleDateString()}
          />
          <YAxis tickFormatter={(v) => `${Number(v).toFixed(0)}%`} />
          <Tooltip
            labelFormatter={(v) => new Date(Number(v)).toLocaleString()}
            formatter={(v: number) => [`${v.toFixed(2)}%`, "Drawdown"]}
          />
          <Area
            type="monotone"
            dataKey="dd"
            stroke="#39d0ff"
            fill="url(#ddFill)"
            strokeWidth={1.5}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
