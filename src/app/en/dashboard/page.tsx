import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Demo Dashboard — AI Crypto Bot",
  description:
    "Panel with demo data price PnL open positions and trade history This is a demo not investment advice",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
