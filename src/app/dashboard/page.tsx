import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Демо-дашборд — AI Crypto Bot",
  description:
    "Панель з демо-даними: ціна, PnL, відкриті позиції та історія угод. Це демонстрація, не інвестпорада.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
