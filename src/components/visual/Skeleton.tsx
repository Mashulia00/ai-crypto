"use client";

type Props = { className?: string };

export function Skeleton({ className = "" }: Props) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/[.06] animate-pulse " +
        className
      }
    />
  );
}
