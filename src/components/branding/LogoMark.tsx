"use client";

import Image from "next/image";
import clsx from "clsx";

type Props = {
  size?: number;            
  className?: string;
  priority?: boolean;
};

export function LogoMark({ size = 32, className, priority }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full ring-1 ring-white/10",
        "overflow-hidden bg-transparent", // фон прозорий
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/brand/logo-mark.png"
        alt="AI Crypto Bot"
        width={size}
        height={size}
        sizes={`${size}px`}
        priority={priority}
      />
    </span>
  );
}
