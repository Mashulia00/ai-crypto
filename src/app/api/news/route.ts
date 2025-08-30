import { NextResponse } from "next/server";

export async function GET() {
  const items = [
    { title: "AI Crypto Bot presented demo dashboard", url: "https://example.com/news/demo", ts: Date.now() - 86400_000 },
    { title: "Explaining risk management methodology", url: "https://example.com/news/risk", ts: Date.now() - 3 * 86400_000 },
    { title: "Performance charts updated", url: "https://example.com/news/perf", ts: Date.now() - 7 * 86400_000 },
  ];
  return NextResponse.json({ items });
}
