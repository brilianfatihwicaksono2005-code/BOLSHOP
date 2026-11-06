"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { LoginGateModal } from "@/components/features/login-gate-modal";
import { useCart } from "@/components/features/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatRupiah } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const currentUser = useAuthStore((state) => state.currentUser);
  const authHydrated = useAuthStore((state) => state.hasHydrated);
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [showLoginGate, setShowLoginGate] = useState(false);
  
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isAdmin = authHydrated && currentUser?.role === "admin";

  const handleAddToCart = () => {
    if (!authHydrated || !currentUser) {
      setShowLoginGate(true);
      return;
    }
    addItem(product, selectedSize);
  };

  return (
    <>
      <Card className="group flex h-full flex-col gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <div className="bg-muted relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} dari ${product.brand}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge>{product.category}</Badge>
          {isLowStock ? (
            <Badge variant="secondary">Sisa {product.stock}</Badge>
          ) : null}
          {isOutOfStock ? (
            <Badge variant="destructive">Stok habis</Badge>
          ) : null}
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-1">
          <p className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
            {product.brand}
          </p>
          <h3
            id={`product-${product.id}-name`}
            className="line-clamp-2 text-sm leading-snug font-semibold"
          >
            {product.name}
          </h3>
          <p className="text-base font-bold">{formatRupiah(product.price)}</p>
        </div>

        <fieldset className="space-y-2">
          <legend className="sr-only">
            Pilih ukuran untuk {product.name}
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Ukuran ${size}`}
                  onClick={() => setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={cn(
                    "min-w-8 rounded-md border px-2 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {size === "One Size" ? "All" : size}
                </button>
              );
            })}
          </div>
        </fieldset>

        {!isAdmin && (
          <Button
            type="button"
            variant={isOutOfStock ? "secondary" : "default"}
            className="mt-auto w-full"
            disabled={isOutOfStock || !selectedSize}
            onClick={handleAddToCart}
          >
            <ShoppingBag aria-hidden="true" />
            {isOutOfStock ? "Stok habis" : "Tambah ke tas"}
          </Button>
        )}
      </CardContent>
    </Card>

    <LoginGateModal open={showLoginGate} onOpenChange={setShowLoginGate} />
    </>
  );
}
