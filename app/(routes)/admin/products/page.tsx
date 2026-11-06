import type { Metadata } from "next";

import { AdminProductsView } from "@/components/features/admin-products-view";

export const metadata: Metadata = {
  title: "Kelola Produk",
  description: "Manajemen katalog produk B'OLSHOP.",
};

export default function AdminProductsPage() {
  return <AdminProductsView />;
}
