"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  LogOut,
  Package,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatOrderDate, orderStatusVariant } from "@/lib/order-utils";
import { formatRupiah } from "@/lib/utils";
import type { AuthAccount, AuthUser } from "@/store/useAuthStore";
import type { Order } from "@/types";
import { products } from "@/lib/mock-data";

type AdminDashboardProps = {
  user: AuthUser;
  orders: Order[];
  accounts: AuthAccount[];
  onLogout: () => void;
};

export function AdminDashboard({
  user,
  orders,
  accounts,
  onLogout,
}: AdminDashboardProps) {
  const firstName = user.name.split(" ")[0];

  const customerCount = accounts.filter((a) => a.role === "customer").length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Admin Panel
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Halo, {firstName}
            </h1>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Kelola data produk, pesanan, dan pelanggan toko B&apos;OLSHOP.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/#katalog">
              <ShoppingBag aria-hidden="true" />
              Lihat katalog
            </Link>
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut aria-hidden="true" />
            Keluar
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-2 text-xs">
                <Package className="size-4" aria-hidden="true" />
                Total produk
              </p>
              <p className="text-2xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-2 text-xs">
                <AlertCircle className="size-4 text-amber-600" aria-hidden="true" />
                Stok rendah
              </p>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-2 text-xs">
                <Truck className="size-4" aria-hidden="true" />
                Total pesanan
              </p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1">
              <p className="text-muted-foreground flex items-center gap-2 text-xs">
                <Users className="size-4" aria-hidden="true" />
                Pelanggan terdaftar
              </p>
              <p className="text-2xl font-bold">{customerCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventori produk</CardTitle>
            <CardDescription>
              Daftar lengkap produk dengan status stok real-time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products.map((product) => {
                const stockStatus =
                  product.stock === 0
                    ? "Stok habis"
                    : product.stock <= 5
                      ? "Stok rendah"
                      : "Aman";
                const stockVariant =
                  product.stock === 0
                    ? "destructive"
                    : product.stock <= 5
                      ? "secondary"
                      : "outline";

                return (
                  <div
                    key={product.id}
                    className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-sm">
                        {product.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {product.category} · {product.brand}
                      </p>
                      <p className="text-sm font-medium">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-mono text-sm font-semibold">
                          {product.stock}
                        </p>
                        <p className="text-muted-foreground text-xs">stok</p>
                      </div>
                      <Badge variant={stockVariant}>{stockStatus}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesanan terbaru</CardTitle>
            <CardDescription>
              Daftar pesanan dari semua pelanggan, termasuk pesanan demo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-center text-sm py-8">
                Belum ada pesanan.
              </p>
            ) : (
              <ul className="divide-y">
                {orders.slice(0, 10).map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-0.5">
                      <p className="font-mono text-sm font-semibold">
                        {order.id}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {order.customerName} · {formatOrderDate(order.date)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <Badge variant={orderStatusVariant[order.status]}>
                        {order.status}
                      </Badge>
                      <p className="text-sm font-semibold">
                        {formatRupiah(order.total)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Catatan admin</CardTitle>
            <CardDescription>Info penting tentang mode demo ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • Data produk, pesanan, dan akun pelanggan disimpan di browser
              lokal (&quot;localStorage&quot;).
            </p>
            <p className="text-muted-foreground">
              • Setiap pengunjung memiliki data terpisah.
            </p>
            <p className="text-muted-foreground">
              • Pesanan baru akan tampil di sini dengan status &quot;Diproses&quot;.
            </p>
            <p className="text-muted-foreground">
              • Akun demo (pengguna/admin) selalu tersedia untuk login.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aksi cepat</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="justify-between" asChild>
              <Link href="/#katalog">
                Lihat katalog
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" className="justify-between" asChild>
              <Link href="/checkout">
                Buat pesanan demo
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
