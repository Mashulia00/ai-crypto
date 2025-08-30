import type { Metadata } from "next";
import { Prose } from "@/components/visual/Prose";

export const metadata: Metadata = {
  title: "Risks — AI Crypto Bot",
  description:
    "Risk disclosure regarding algorithmic trading of crypto assets Past performance does not guarantee future results",
  alternates: { canonical: "/legal/risk" },
};

export default function RiskPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Prose>
        <h1>Risk Disclosure</h1>

        <p>
          <strong>Algorithmic trading does not guarantee profit</strong> Past
          results do not guarantee future performance Trading crypto assets
          involves high risk
        </p>

        <ul>
          <li>
            <strong>Volatility:</strong> significant price swings can lead to
            drawdowns and liquidations
          </li>
          <li>
            <strong>Liquidity:</strong> wide spreads and slippage may occur
            during high volatility
          </li>
          <li>
            <strong>Technical failures:</strong> software bugs network issues
            exchange or data provider outages can impact execution
          </li>
          <li>
            <strong>Counterparty risk:</strong> risks associated with exchanges
            and custodians
          </li>
          <li>
            <strong>Regulatory changes:</strong> may affect service
            availability
          </li>
        </ul>

        <p>
          Only use funds where the risk level is acceptable to you All
          information on this site is for informational purposes only and is
          not investment advice
        </p>
      </Prose>
    </div>
  );
}
