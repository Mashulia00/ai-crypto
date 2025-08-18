"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // неонова аура за курсором/пальцем (легка, mobile-first)
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  return (
    <section className="relative overflow-hidden">
      {/* аури/градієнти + реакція на курсор */}
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hero-auras"
      >
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10">
          <h1 className="headline-glow text-balance text-5xl/tight font-extrabold sm:text-6xl/tight md:text-7xl/tight">
            <span>ШІ-бот, що торгує&nbsp;</span>
            <span className="inline-block relative">
              24/7
              <i aria-hidden className="mark-bar" />
            </span>
            <br className="hidden sm:block" />
            <span>Прозоро</span>
            <br className="hidden sm:block" />
            <span>
              З&nbsp;<b className="accent-word">ризик-менеджментом</b>
            </span>
          </h1>

          {/* неоновий “скан” під заголовком */}
          <div className="hero-surge mt-4" />

          <p className="mt-5 max-w-3xl text-lg text-platinum-200/90 md:text-xl">
            Алгоритмічні стратегії з машинним навчанням допомагають
            автоматизувати рутинні рішення та дисципліновано працювати з
            ризиком.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button className="bg-aqua text-ink hover:opacity-90 btn-ripple">
                Спробувати демо
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                className="glass border-white/10 btn-ripple"
              >
                Дізнатися як це працює
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
