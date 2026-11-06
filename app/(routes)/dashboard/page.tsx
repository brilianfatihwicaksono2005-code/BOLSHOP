import type { Metadata } from "next";

import { DashboardView } from "@/components/features/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ringkasan akun, pesanan, dan poin loyalitas B'OLSHOP.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
