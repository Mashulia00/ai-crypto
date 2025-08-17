"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { Candle } from "@/lib/types";

export function ChartPrice({ data, title = "Price (демо)" }: { data: Candle[]; title?: string }) {
  const fmtDate = (ts: number) => new Date(ts).toLocaleString();
  return (
    <div className="glass rounded-2xl p-4 h-80">
      <h3 className="mb-2 font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="t" tickFormatter={(v) => new Date(v).toLocaleDateString()} minTickGap={24} />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip
            labelFormatter={(v) => fmtDate(Number(v))}
            formatter={(_, __, { payload }) => [
              `O:${payload.o.toFixed(0)}  H:${payload.h.toFixed(0)}  L:${payload.l.toFixed(0)}  C:${payload.c.toFixed(0)}`,
              "OHLC",
            ]}
          />
          <Line type="monotone" dataKey="c" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
