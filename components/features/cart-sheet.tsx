"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export function CartSheet() {
  const cart = useCartStore((state) => state.cart);
  const isOpen = useCartStore((state) => state.isOpen);
  const setOpen = useCartStore((state) => state.setOpen);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const subtotal = useCartStore((state) => state.getTotalPrice());

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b p-6 pr-14">
          <SheetTitle className="flex items-center gap-2 text-lg">
            Keranjang belanja
            <Badge variant="secondary">{totalItems} item</Badge>
          </SheetTitle>
          <SheetDescription>
            Periksa ukuran dan jumlah sebelum melanjutkan ke checkout.
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <span className="bg-muted grid size-14 place-items-center rounded-full">
              <ShoppingBag className="text-muted-foreground size-6" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">Keranjang masih kosong</p>
              <p className="text-muted-foreground text-sm">
                Tambahkan produk favoritmu untuk mulai berbelanja.
              </p>
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/#katalog">Jelajahi katalog</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y overflow-y-auto px-6">
            {cart.map((item) => (
              <li
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 py-5"
              >
                <div className="bg-muted relative size-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {item.product.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Ukuran {item.size} &middot; {item.product.brand}
                      </p>
                      <p className="text-sm font-semibold">
                        {formatRupiah(item.product.price)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.product.id, item.size)}
                      aria-label={`Hapus ${item.product.name} ukuran ${item.size} dari keranjang`}
                    >
                      <Trash2 />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Kurangi jumlah ${item.product.name}`}
                      >
                        <Minus />
                      </Button>
                      <span
                        className="w-8 text-center text-sm font-medium"
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                        aria-label={`Tambah jumlah ${item.product.name}`}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatRupiah(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 ? (
          <SheetFooter className="border-t p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">{formatRupiah(subtotal)}</span>
            </div>
            <p className="text-muted-foreground text-xs">
              Ongkos kirim dihitung pada halaman checkout.
            </p>
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout" onClick={() => setOpen(false)}>
                Lanjut ke Checkout
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Lanjut belanja
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
