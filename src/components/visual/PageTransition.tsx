"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 320);
    return () => clearTimeout(t);
  }, [pathname, prefersReduced]);

  return (
    <>
      {children}
      {!prefersReduced && show && (
        <motion.div
          initial={{ x: "-100%", opacity: 0.6 }}
          animate={{ x: 0, opacity: 0.9 }}
          exit={{ x: "100%", opacity: 0.6 }}
          transition={{ duration: 0.32, ease: [0.16, 0.84, 0.44, 1] }}
          className={[
            "pointer-events-none fixed inset-0 z-[9998]",
            // лінейний градієнт + блюр через tailwind arbitrary values
            "[background:linear-gradient(90deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.04)_60%,rgba(57,208,255,0.20)_61%,rgba(57,208,255,0)_100%)]",
            "backdrop-blur-[6px]",
          ].join(" ")}
        />
      )}
    </>
  );
}
