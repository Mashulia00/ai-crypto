"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  as?: React.ElementType;       // <div> за замовч.
  delay?: number;
  cascade?: boolean;            // анімувати кожну дитину окремо
  className?: string;
  children: React.ReactNode;
};

export function SectionReveal({
  as: Tag = "div",
  delay = 0,
  cascade = false,
  className,
  children,
}: Props) {
  const content =
    cascade && Array.isArray(children)
      ? (children as React.ReactNode[]).map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.28, delay: delay + i * 0.06 }}
          >
            {child}
          </motion.div>
        ))
      : children;

  return (
    <Tag className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.32, delay }}
      >
        {content}
      </motion.div>
    </Tag>
  );
}
