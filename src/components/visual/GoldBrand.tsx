"use client";

import Image from "next/image";
import Link from "next/link";

export default function GoldBrand({
  href = "/",
  size = 36,
  src = "/brand/logo-mark.png",
  emph = "xl", // 'normal' | 'xl' | 'xxl'
}: {
  href?: string;
  size?: number;
  src?: string;
  emph?: "normal" | "xl" | "xxl";
}) {
  const s = `${size}px`;
  const nameCls =
    "brand-gold__name" +
    (emph === "xl" ? " brand-gold__name--xl" : emph === "xxl" ? " brand-gold__name--xxl" : "");

  return (
    <Link href={href} className="brand-gold group" aria-label="AI Crypto Bot">
      <span className="brand-gold__icon" style={{ ["--s" as any]: s }}>
        <Image
          src={src}
          alt="AI Crypto Bot"
          width={Math.max(1, size - 8)}
          height={Math.max(1, size - 8)}
          priority
        />
        <span className="brand-gold__orbit" style={{ ["--a" as any]: "0deg" }}>
          <span className="brand-gold__dot" />
        </span>
        <span className="brand-gold__orbit" style={{ ["--a" as any]: "140deg" }}>
          <span className="brand-gold__dot brand-gold__dot--sm" />
        </span>
      </span>

      <span className={nameCls}> </span>
    </Link>
  );
}
