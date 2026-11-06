import { Suspense } from "react";

import { ProductCatalog } from "@/components/features/product-catalog";

const fallbackKeys = ["satu", "dua", "tiga", "empat"];

async function getProducts() {
  // Since product store is client-side, we'll use mock-data server-side
  // and let ProductCatalog use product store on client
  const { products } = await import("@/lib/mock-data");
  return products;
}

export default async function HomePage() {
  const initialProducts = await getProducts();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl space-y-2">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
          Katalog
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Temukan gaya yang sempurna untuk Anda
        </h1>
        <p className="text-muted-foreground">
          Jelajahi koleksi pakaian terlengkap kami. Pilih kategori atau cari
          produk favorit Anda.
        </p>
      </div>

      <Suspense
        fallback={
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-hidden="true"
          >
            {fallbackKeys.map((key) => (
              <div key={key} className="space-y-4">
                <div className="bg-muted aspect-[4/5] animate-pulse rounded-xl" />
                <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
                <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
              </div>
            ))}
          </div>
        }
      >
        <ProductCatalog products={initialProducts} />
      </Suspense>
    </div>
  );
}
