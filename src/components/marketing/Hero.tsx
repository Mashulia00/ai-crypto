"use client";

import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Tr from "@/components/Tr";
import { useLocale, withLocale } from "@/lib/locale";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

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
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="hero-auras"
      >
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10">
          <h1 className="headline-glow text-balance text-5xl/tight font-extrabold sm:text-6xl/tight md:text-7xl/tight">
            <Tr
              en={
                <>
                  <span>AI bot that trades&nbsp;</span>
                  <span className="inline-block relative">
                    24/7.
                    <i aria-hidden className="mark-bar" />
                  </span>
                  <br className="hidden sm:block" />
                  <span>Transparently</span>
                  <br className="hidden sm:block" />
                  <span>
                    &nbsp;<b className="accent-word">With risk management</b>
                  </span>
                </>
              }
              ru={
                <>
                  <span>AI-бот торгует&nbsp;</span>
                  <span className="inline-block relative">
                    24/7.
                    <i aria-hidden className="mark-bar" />
                  </span>
                  <br className="hidden sm:block" />
                  <span>Прозрачно</span>
                  <br className="hidden sm:block" />
                  <span>
                    &nbsp;<b className="accent-word">С управлением рисками</b>
                  </span>
                </>
              }
            />
          </h1>

          <div className="hero-surge mt-4" />

          <p className="mt-5 max-w-3xl text-lg text-platinum-200/90 md:text-xl">
            <Tr
              en="Algorithmic strategies with machine learning help automate routine decisions and manage risk with discipline."
              ru="Алгоритмические стратегии с машинным обучением помогают автоматизировать рутинные решения и дисциплинированно управлять рисками."
            />
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={withLocale("/contact", locale)}>
              <Button className="bg-aqua text-ink hover:opacity-90 btn-ripple">
                <Tr en="Try demo" ru="Попробовать демо" />
              </Button>
            </Link>

            <Link href={withLocale("/how-it-works", locale)}>
              <Button
                variant="outline"
                className="glass border-white/10 btn-ripple"
              >
                <Tr en="Find out how it works" ru="Узнать, как это работает" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
