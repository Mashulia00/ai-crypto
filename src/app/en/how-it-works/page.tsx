"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionReveal } from "@/components/visual/SectionReveal";
import { Button } from "@/components/ui/button";
import { RiskBanner } from "@/components/marketing/RiskBanner";

type Step = { title: string; desc: string };

/* scroll progress inside section (0..1) */
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const h = Math.max(1, r.height - window.innerHeight);
        const seen = Math.min(Math.max(-r.top, 0), h);
        setP(seen / h);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/* reveal element when entering viewport */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.dataset.shown = "true";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* step card with mobile tap effects */
function StepCard({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative feature-card rounded-2xl p-5 md:p-6 touch-manipulation"
      onPointerDown={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--px", `${e.clientX - rect.left}px`);
        el.style.setProperty("--py", `${e.clientY - rect.top}px`);
        el.classList.add("pressed");
      }}
      onPointerUp={(e) => e.currentTarget.classList.remove("pressed")}
      onPointerCancel={(e) => e.currentTarget.classList.remove("pressed")}
      onPointerLeave={(e) => e.currentTarget.classList.remove("pressed")}
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-base font-semibold text-aqua shadow-[0_0_0_1px_rgba(57,208,255,.15)]">
          {index}
        </span>
        <div className="min-w-0">
          <h3 className="title text-lg font-semibold md:text-xl">{title}</h3>
          <p className="mt-2 text-platinum-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const steps: Step[] = [
    {
      title: "Data collection",
      desc:
        "Prices volumes derivative metrics market regimes Data is normalized and filtered",
    },
    {
      title: "AI signals",
      desc:
        "Classification of regimes trend flat high volatility probabilistic entryexit signals",
    },
    {
      title: "Trade management",
      desc:
        "Position sizing stop loss take profit risk per trade Portfolio level limits",
    },
    {
      title: "Monitoring 24/7",
      desc:
        "Alerts on events strategy health checks connection and exchange limit control",
    },
    {
      title: "Security",
      desc:
        "In demo read only In production trade only keys without withdrawal rights",
    },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useSectionProgress(sectionRef); // 0..1

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-6xl px-4 py-10 md:py-12">
      {/* neon aura behind heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 top-2 h-16 opacity-60"
        style={{
          background:
            "radial-gradient(600px 80px at 18% 50%, rgba(57,208,255,.20), transparent 70%)",
        }}
      />

      <SectionReveal>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          How it <span className="mark-underline mark-underline--thick">works</span>
        </h1>
        <p className="mt-3 max-w-3xl text-platinum-300">
          From data streams to signals and risk control Built mobile first
          with focus on transparency and reliability
        </p>

        {/* section progress line */}
        <div className="relative mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(57,208,255,0), rgba(57,208,255,1))",
              boxShadow: "0 0 22px rgba(57,208,255,.35)",
              transition: "width .15s ease-out",
            }}
            aria-hidden
          />
          <span
            className="absolute -top-1 h-3 w-3 rounded-full bg-aqua"
            style={{
              left: `calc(${Math.round(progress * 100)}% - 6px)`,
              boxShadow: "0 0 20px rgba(57,208,255,.7)",
              transition: "left .15s ease-out",
            }}
            aria-hidden
          />
        </div>
      </SectionReveal>

      <div className="mt-8 space-y-5">
        {steps.map((s, i) => (
          <StepCard key={i} index={i + 1} title={s.title} desc={s.desc} />
        ))}
      </div>

      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="cta-cyber rounded-2xl p-5 md:p-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="badge-chip">Demo and transparent charts</span>
              <h2 className="mt-3 text-xl font-semibold">
                Want to see the results
              </h2>
              <p className="mt-1 text-platinum-300">
                Go to performance page — live PnL and Drawdown with explanations
              </p>
            </div>
            <Link href="/performance">
              <Button className="cta-button">
                View performance demo
                <span className="arrow">→</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <RiskBanner />
        </div>
      </div>
    </section>
  );
}
