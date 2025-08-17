import { NextResponse } from "next/server";

export async function GET() {
  const items = [
    { title: "AI Crypto Bot презентував демо-дашборд", url: "https://example.com/news/demo", ts: Date.now() - 86400_000 },
    { title: "Пояснюємо методологію ризик-менеджменту", url: "https://example.com/news/risk", ts: Date.now() - 3 * 86400_000 },
    { title: "Оновлення графіків продуктивності", url: "https://example.com/news/perf", ts: Date.now() - 7 * 86400_000 },
  ];
  return NextResponse.json({ items });
}
