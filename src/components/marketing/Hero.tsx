"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, Lead, Accent } from "@/components/visual/Heading";
import { TextReveal } from "@/components/visual/TextReveal";
import { SectionReveal } from "@/components/visual/SectionReveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* aura фон */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 opacity-50"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 10%, rgba(57,208,255,.08), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8">
        <SectionReveal>
          <H1>
            <TextReveal
              text="ШІ-бот, що торгує 24/7. Прозоро. З"
              by="word"
              className="block"
            />
            <span className="block">
              <Accent>ризик-менеджментом.</Accent>
            </span>
          </H1>
          <Lead className="mt-6 max-w-3xl">
            Алгоритмічні стратегії з машинним навчанням допомагають автоматизувати
            рутинні рішення та дисципліновано працювати з ризиком.
          </Lead>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-aqua text-ink hover:opacity-90">
              <Link href="/contact">Спробувати демо</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/10">
              <Link href="/how-it-works">Дізнатися як це працює</Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
