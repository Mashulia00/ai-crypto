"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TiltCard } from "@/components/visual/TiltCard";

export function FeatureCard({
  title,
  desc,
  icon,
}: { title: string; desc: string; icon: ReactNode }) {
  return (
    <TiltCard max={3}>
      <Card className="glass rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-3">
          <motion.div
            aria-hidden
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 border border-white/10"
          >
            {icon}
          </motion.div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-platinum-300">{desc}</p>
      </Card>
    </TiltCard>
  );
}
