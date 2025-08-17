"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  max?: number; // градуси
  glare?: boolean;
  className?: string;
};

export function TiltCard({ children, max = 3, glare = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * (max * 2);
    const rx = (0.5 - py) * (max * 2);
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (glare) {
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    }
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={
        glare
          ? {
              position: "relative",
              background:
                "radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.08), transparent 40%)",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
