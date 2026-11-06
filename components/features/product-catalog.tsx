"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchX, X } from "lucide-react";

import { ProductGrid } from "@/components/features/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mock-data";
import type { Product, ProductCategory } from "@/types";

type ProductCatalogProps = {
  products: Product[];
};

type CategoryFilter = ProductCategory | "Semua";

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const [category, setCategory] = useState<CategoryFilter>("Semua");

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "Semua" || product.category === category;
      const searchable =
        `${product.name} ${product.brand} ${product.category}`.toLowerCase();
      const matchesSearch =
        normalizedTerm === "" || searchable.includes(normalizedTerm);

      return matchesCategory && matchesSearch;
    });
  }, [products, category, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter kategori produk"
          className="flex flex-wrap gap-2"
        >
          <Button
            type="button"
            size="sm"
            variant={category === "Semua" ? "default" : "outline"}
            aria-pressed={category === "Semua"}
            onClick={() => setCategory("Semua")}
          >
            Semua
          </Button>
          {categories.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={category === item ? "default" : "outline"}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <p
          className="text-muted-foreground text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredProducts.length} produk ditemukan
        </p>
      </div>

      {searchTerm.trim() ? (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 py-1">
            Hasil untuk &ldquo;{searchTerm.trim()}&rdquo;
            <Link
              href="/#katalog"
              aria-label="Hapus pencarian"
              className="rounded-full p-0.5 hover:bg-black/10"
            >
              <X className="size-3" aria-hidden="true" />
            </Link>
          </Badge>
        </div>
      ) : null}

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-6 py-20 text-center">
          <span className="bg-muted grid size-14 place-items-center rounded-full">
            <SearchX
              className="text-muted-foreground size-6"
              aria-hidden="true"
            />
          </span>
          <div className="space-y-1">
            <p className="font-semibold">Produk tidak ditemukan</p>
            <p className="text-muted-foreground text-sm">
              Coba kata kunci lain atau reset filter kategori.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCategory("Semua");
              router.replace("/#katalog");
            }}
          >
            Reset filter
          </Button>
        </div>
      )}
    </div>
  );
}
