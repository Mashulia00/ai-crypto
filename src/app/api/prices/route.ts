import { NextResponse } from "next/server";
import type { Candle, PricesResponse } from "@/lib/types";

function genCandles(n: number, startTs: number, stepMs: number, startPrice = 60000): Candle[] {
  const out: Candle[] = [];
  let p = startPrice;
  for (let i = 0; i < n; i++) {
    const t = startTs + i * stepMs;
    // рандом-вок + хвиля
    const drift = 0.0006;
    const wave = Math.sin(i / 10) * 0.005;
    const ret = drift + wave + (Math.random() - 0.5) * 0.01;

    const o = p;
    const c = p * (1 + ret);
    const h = Math.max(o, c) * (1 + Math.random() * 0.004);
    const l = Math.min(o, c) * (1 - Math.random() * 0.004);
    const v = 100 + Math.random() * 50;

    out.push({ t, o, h, l, c, v });
    p = c;
  }
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pair = searchParams.get("pair") || "BTCUSDT";
  const tf = searchParams.get("tf") || "1h";
  const step = tf === "1h" ? 60 * 60 * 1000 : 5 * 60 * 1000;
  const n = 200;
  const start = Date.now() - (n - 1) * step;

  const body: PricesResponse = { pair, tf, candles: genCandles(n, start, step) };
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
