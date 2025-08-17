"use client";

import { motion } from "framer-motion";

type Props = {
  text: string;
  by?: "word" | "char";
  delay?: number;
  duration?: number;
  className?: string;
};

export function TextReveal({
  text,
  by = "word",
  delay = 0,
  duration = 0.3,
  className,
}: Props) {
  const parts = by === "word" ? text.split(" ") : text.split("");
  const gap = by === "word" ? " " : "";

  return (
    <span className={className} aria-label={text}>
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: "0.6em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration, delay: delay + i * 0.06 }}
        >
          {p}
          {i < parts.length - 1 ? gap : ""}
        </motion.span>
      ))}
    </span>
  );
}
