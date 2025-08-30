"use client";

const logos = ["CoinJournal", "CryptoNow", "ML Fintech", "AlgoDaily", "DataQuant"];

export default function LogoWall() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] py-4">
      <div className="animate-[marquee_12s_linear_infinite] whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <span key={i} className="mx-6 inline-block text-platinum-300">{l}</span>
        ))}
      </div>
      {/**/}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
