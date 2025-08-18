"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  desc: string;
};

export function FeatureCard({ icon, title, desc }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // Плавна поява коли картка в полі зору
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tap ripple + натиск
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture?.(e.pointerId);
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
    el.classList.add("pressed");
    // легка вібрація якщо доступна
    try {
      // @ts-ignore
      navigator.vibrate?.(8);
    } catch {}
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !el.classList.contains("pressed")) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  }
  function onPointerUp() {
    ref.current?.classList.remove("pressed");
  }

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="feature-card touch-manipulation relative overflow-hidden rounded-2xl p-5"
      role="article"
      tabIndex={0}
      aria-label={title}
    >
      <div className="flex items-start gap-4">
        <div className="icon-wrap grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-aqua">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="title text-lg font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-platinum-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}
