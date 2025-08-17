"use client";

import type { ReactNode } from "react";

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export function Accent({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "bg-clip-text text-transparent bg-gradient-to-br",
        "from-aqua/90 to-platinum-200",
        "drop-shadow-[0_1px_1px_rgba(57,208,255,0.25)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function H1({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cx("text-4xl md:text-6xl font-semibold tracking-tight", className)}>
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cx("text-2xl md:text-3xl font-semibold", className)}>{children}</h2>
  );
}

export function H3({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return <h3 className={cx("text-xl md:text-2xl font-semibold", className)}>{children}</h3>;
}

export function Lead({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return <p className={cx("text-lg md:text-xl text-platinum-200/90", className)}>{children}</p>;
}

export function Muted({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return <p className={cx("text-sm text-platinum-500", className)}>{children}</p>;
}

export function Disclaimer({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cx(
        "mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3",
        "text-sm text-platinum-400",
        className
      )}
    >
      {children}
    </div>
  );
}
