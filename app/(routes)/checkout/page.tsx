import type { Metadata } from "next";

import { CheckoutForm } from "@/components/features/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Selesaikan pesanan B'OLSHOP dengan alur checkout yang ringkas.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl space-y-2">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
          Checkout
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Selesaikan pesananmu
        </h1>
        <p className="text-muted-foreground">
          Isi data pengiriman dan pilih metode pembayaran. Semua kolom bertanda
          wajib harus dilengkapi.
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}
