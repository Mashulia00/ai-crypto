export function RiskBanner({ text }: { text?: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-aqua/40 bg-aqua/10 p-4 text-aqua">
      {text ?? "Алгоритмічна торгівля не гарантує прибутку. Минулі результати не гарантують майбутніх."}
    </div>
  );
}
