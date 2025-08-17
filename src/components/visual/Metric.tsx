"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  duration?: number; // ms
  suffix?: string;
  className?: string;
};

export function Metric({ value, duration = 1000, suffix = "", className }: Props) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      setDisplay(value * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3);
  }

  const formatted =
    Math.abs(value) >= 100
      ? Math.round(display).toString()
      : display.toFixed(2);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {formatted}
      {suffix}
    </span>
  );
}
