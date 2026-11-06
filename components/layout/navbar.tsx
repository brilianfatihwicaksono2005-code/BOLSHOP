"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

import { CartSheet } from "@/components/features/cart-sheet";
import { useCart } from "@/components/features/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

const mobileLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function NavbarSearch({
  id,
  className,
  onSubmitted,
}: {
  id: string;
  className?: string;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [term, setTerm] = useState("");

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const query = term.trim();
        router.push(
          query ? `/?q=${encodeURIComponent(query)}#katalog` : "/#katalog",
        );
        onSubmitted?.();
      }}
    >
      <Label htmlFor={id} className="sr-only">
        Cari produk
      </Label>
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        id={id}
        name="q"
        type="search"
        autoComplete="off"
        placeholder="Cari produk, brand, kategori..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        className="bg-background h-10 rounded-full pr-10 pl-9"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        aria-label="Cari"
      >
        <Search aria-hidden="true" />
      </Button>
    </form>
  );
}

export function Navbar() {
  const router = useRouter();
  const { setOpen } = useCart();
  const cart = useCartStore((state) => state.cart);
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="B'OLSHOP, kembali ke beranda"
            className="flex items-center gap-2"
          >
            <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-lg text-sm font-black">
              B
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-lg font-black tracking-tight">
                B&apos;OLSHOP
              </span>
              <span className="text-muted-foreground text-[10px] font-medium tracking-[0.28em]">
                MENSWEAR
              </span>
            </span>
          </Link>

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 md:flex"
          >
            {hasHydrated && currentUser?.role !== "admin" ? (
              <>
                <Link
                  href="/#katalog"
                  className="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  Katalog
                </Link>
                <Link
                  href="/#tentang"
                  className="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                >
                  Tentang
                </Link>
                {currentUser ? (
                  <Link
                    href="/dashboard"
                    className="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : null}
              </>
            ) : null}
          </nav>
        </div>

        <NavbarSearch
          id="navbar-product-search"
          className="hidden w-full max-w-md lg:block"
        />

        <div className="flex items-center gap-1">
          {hasHydrated && currentUser?.role !== "admin" ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setOpen(true)}
              aria-label={`Buka keranjang belanja, ${totalItems} item`}
            >
              <ShoppingBag aria-hidden="true" />
              {totalItems > 0 ? (
                <Badge
                  className="absolute -top-0.5 -right-0.5 min-w-5 rounded-full px-1 py-0 text-[10px] leading-4"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              ) : null}
            </Button>
          ) : null}

          {hasHydrated && currentUser ? (
            <>
              {currentUser.role === "admin" ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() => router.push("/admin/products")}
                >
                  <UserRound aria-hidden="true" />
                  Admin Panel
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link href="/dashboard">
                    <UserRound aria-hidden="true" />
                    {currentUser.name.split(" ")[0]}
                  </Link>
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                onClick={handleLogout}
                aria-label="Keluar dari akun"
              >
                <LogOut aria-hidden="true" />
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden sm:inline-flex"
            >
              <Link href="/login">
                <UserRound aria-hidden="true" />
                Masuk
              </Link>
            </Button>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 gap-0 p-0">
              <SheetHeader className="border-b p-6 pr-14">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Jelajahi katalog dan kelola akun B&apos;OLSHOP.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Navigasi mobile" className="flex flex-col gap-1 p-4">
                <NavbarSearch
                  id="mobile-product-search"
                  className="mb-3"
                  onSubmitted={() => setMobileOpen(false)}
                />
                <SheetClose asChild>
                  <Link href="/" className={mobileLinkClass}>
                    Katalog
                  </Link>
                </SheetClose>
                {hasHydrated && currentUser ? (
                  <>
                    {currentUser.role === "admin" ? (
                      <SheetClose asChild>
                        <Link href="/admin/products" className={mobileLinkClass}>
                          Admin Panel
                        </Link>
                      </SheetClose>
                    ) : null}
                    <SheetClose asChild>
                      <Link href="/checkout" className={mobileLinkClass}>
                        Checkout
                      </Link>
                    </SheetClose>
                    <div className="my-2 border-t" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={mobileLinkClass}
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <div className="my-2 border-t" />
                    <SheetClose asChild>
                      <Link href="/login" className={mobileLinkClass}>
                        Masuk
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className={mobileLinkClass}>
                        Daftar akun
                      </Link>
                    </SheetClose>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartSheet />
    </header>
  );
}
