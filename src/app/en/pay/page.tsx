"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Button } from "@/components/ui/button";

export default function PayPage() {
  const sp = useSearchParams();
  const plan = sp.get("plan") ?? "starter";
  const period = sp.get("period") === "year" ? "year" : "month";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
      <SectionReveal>
        <h1 className="text-3xl font-semibold tracking-tight">
          Pay with crypto
        </h1>
        <p className="mt-2 text-platinum-300">
          Plan: <span className="badge-chip">{plan}</span> • Period:{" "}
          <span className="badge-chip">{period}</span>
        </p>
      </SectionReveal>

      <div className="mt-6 grid gap-5">
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Wallet</h2>
          <p className="mt-1 text-platinum-300">
            MetaMask / other compatible wallets (USDT/USDC).
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button className="bg-aqua text-ink" asChild>
              <Link href="#">Connect MetaMask</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/10">
              <Link href="#">Other wallets</Link>
            </Button>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Through exchange</h2>
          <p className="mt-1 text-platinum-300">
            Supported: Binance, Coinbase, Kraken, OKX, Bybit.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge-chip">Binance</span>
            <span className="badge-chip">Coinbase</span>
            <span className="badge-chip">Kraken</span>
            <span className="badge-chip">OKX</span>
            <span className="badge-chip">Bybit</span>
          </div>
          <p className="mt-3 text-sm text-platinum-400">
            Demo page In production this would be connected to a payment gateway or invoice
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild className="border-white/10">
            <Link href="/pricing">Back to pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
