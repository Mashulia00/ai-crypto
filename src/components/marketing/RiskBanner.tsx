// src/components/marketing/RiskBanner.tsx

import Tr from "@/components/Tr";

export function RiskBanner({
  text,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={`mt-8 rounded-2xl border border-aqua/40 bg-aqua/10 p-4 text-aqua ${className}`}
    >
      {text ?? (
        <Tr
          en="Algorithmic trading does not guarantee profit. Past results do not guarantee future performance."
          ru="Алгоритмическая торговля не гарантирует прибыль. Прошлые результаты не гарантируют будущую доходность."
        />
      )}
    </div>
  );
}

export default RiskBanner;
