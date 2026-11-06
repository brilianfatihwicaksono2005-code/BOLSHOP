"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  LogOut,
  Mail,
  Package,
  Phone,
  ShoppingBag,
  Sparkles,
  Wallet,
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
import { formatMemberSince, formatOrderDate, orderStatusVariant } from "@/lib/order-utils";
import { formatRupiah } from "@/lib/utils";
import type { AuthUser } from "@/store/useAuthStore";
import type { Order } from "@/types";

type CustomerDashboardProps = {
  user: AuthUser;
  orders: Order[];
  onLogout: () => void;
};

export function CustomerDashboard({
  user,
  orders,
  onLogout,
}: CustomerDashboardProps) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const firstName = user.name.split(" ")[0];

  const myOrders = orders.filter(
    (order) => order.userId === user.id || order.customerEmail === user.email,
  );
  const totalSpent = myOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Halo, {firstName}
          </h1>
          <p className="text-muted-foreground text-sm">
            Berikut ringkasan akun dan aktivitas belanjamu.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/#katalog">
              <ShoppingBag aria-hidden="true" />
              Belanja
            </Link>
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut aria-hidden="true" />
            Keluar
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <Card>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neutral-900 to-neutral-600 text-xl font-bold text-white"
                aria-hidden="true"
              >
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">{user.name}</p>
                <p className="text-muted-foreground truncate text-sm">
                  @{user.username}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>
                <Sparkles aria-hidden="true" />
                {user.loyaltyPoints > 0 ? "Member Gold" : "Member Baru"}
              </Badge>
              <Badge variant="outline">
                Sejak {formatMemberSince(user.memberSince)}
              </Badge>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
                <dt className="sr-only">Email</dt>
                <dd className="truncate">{user.email}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
                <dt className="sr-only">Nomor telepon</dt>
                <dd>{user.phone}</dd>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
                <dt className="sr-only">Bergabung sejak</dt>
                <dd>{formatMemberSince(user.memberSince)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="space-y-1">
                <p className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Package className="size-4" aria-hidden="true" />
                  Total pesanan
                </p>
                <p className="text-2xl font-bold">{myOrders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-1">
                <p className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Sparkles className="size-4" aria-hidden="true" />
                  Poin loyalitas
                </p>
                <p className="text-2xl font-bold">
                  {user.loyaltyPoints.toLocaleString("id-ID")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-1">
                <p className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Wallet className="size-4" aria-hidden="true" />
                  Total belanja
                </p>
                <p className="text-2xl font-bold">{formatRupiah(totalSpent)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pesanan terbaru</CardTitle>
              <CardDescription>
                Riwayat pesanan pada akunmu, termasuk pesanan demo yang baru
                dibuat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myOrders.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed px-6 py-12 text-center">
                  <span className="bg-muted grid size-12 place-items-center rounded-full">
                    <Package className="text-muted-foreground size-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <p className="font-medium">Belum ada pesanan</p>
                    <p className="text-muted-foreground text-sm">
                      Mulai belanja dan pesananmu akan tampil di sini.
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/#katalog">
                      Belanja sekarang
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y">
                  {myOrders.map((order) => (
                    <li
                      key={order.id}
                      className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-mono text-sm font-semibold">
                          {order.id}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatOrderDate(order.date)} · {order.itemCount} item
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
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
              <CardTitle>Aksi cepat</CardTitle>
              <CardDescription>
                Lanjutkan aktivitas belanja atau kelola pesananmu.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              <Button variant="outline" className="justify-between" asChild>
                <Link href="/#katalog">
                  Lihat katalog
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" className="justify-between" asChild>
                <Link href="/checkout">
                  Checkout
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" className="justify-between" asChild>
                <Link href="/login">
                  Ganti akun
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
