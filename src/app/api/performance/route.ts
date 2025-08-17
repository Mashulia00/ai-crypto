// src/app/api/performance/route.ts
import { NextResponse } from "next/server";

export function GET() {
  const now = Date.now();
  const pnl = Array.from({ length: 40 }, (_, i) => ({
    t: now - (40 - i) * 86400000,
    pnl: Math.round((Math.sin(i / 4) * 15 + i * 0.8) * 100) / 100,
  }));
  const drawdown = pnl.map(p => ({
    t: p.t,
    dd: Math.min(0, Math.round((Math.cos(p.pnl) * -12) * 100) / 100),
  }));
  const stats = { sharpe: 1.2, sortino: 1.8, maxDD: -12.3, winRate: 56.4 };

  return NextResponse.json({ pnl, drawdown, stats });
}
