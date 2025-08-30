import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Демо Дашборд — AI Crypto Bot",
  description:
    "Панель с демо-данными: цена, PnL, открытые позиции и история сделок. Это демо, не инвестиционная рекомендация.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
