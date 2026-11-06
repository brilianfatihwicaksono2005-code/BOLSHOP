"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Landmark,
  LogIn,
  ShieldCheck,
  ShoppingBag,
  Truck,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatRupiah } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";

type PaymentMethod = "transfer" | "cod";

type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
};

const initialFields: CheckoutFields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

const paymentOptions: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    value: "transfer",
    label: "Transfer bank",
    description: "Instruksi pembayaran dikirim setelah pesanan dibuat.",
    icon: Landmark,
  },
  {
    value: "cod",
    label: "Bayar di tempat",
    description: "Bayar tunai saat kurir menyerahkan paket.",
    icon: Wallet,
  },
];

export function CheckoutForm() {
  const cart = useCartStore((state) => state.cart);
  const cartHydrated = useCartStore((state) => state.hasHydrated);
  const clearCart = useCartStore((state) => state.clearCart);

  const currentUser = useAuthStore((state) => state.currentUser);
  const authHydrated = useAuthStore((state) => state.hasHydrated);

  const addOrder = useOrderStore((state) => state.addOrder);
  const orderHydrated = useOrderStore((state) => state.hasHydrated);

  const [fields, setFields] = useState<CheckoutFields>(initialFields);
  const [payment, setPayment] = useState<PaymentMethod>("transfer");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!currentUser) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFields((current) =>
      current.name || current.email || current.phone
        ? current
        : {
            ...current,
            name: currentUser.name,
            email: currentUser.email,
            phone: currentUser.phone,
          },
    );
  }, [currentUser]);

  const updateField = <Key extends keyof CheckoutFields>(
    key: Key,
    value: CheckoutFields[Key],
  ) => {
    setFields((current) => ({ ...current, [key]: value }));
  };

  const handleConfirm = () => {
    const items = cart.map((item) => ({
      name: item.product.name,
      size: item.size,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const id = addOrder({
      userId: currentUser?.id ?? "guest",
      customerName: fields.name || currentUser?.name || "Pelanggan",
      customerEmail: fields.email || currentUser?.email || "",
      itemCount: totalItems,
      total: subtotal,
      items,
    });

    setOrderId(id);
    setOrderPlaced(true);
    setIsDialogOpen(false);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Pesanan diterima</h2>
            <p className="text-muted-foreground max-w-md text-sm">
              Terima kasih, {fields.name || "pelanggan"}. Nomor pesananmu adalah{" "}
              <span className="text-foreground font-mono font-semibold">
                {orderId}
              </span>
              . Pesanan demo akan tersimpan di dashboard akunmu.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/dashboard">Lihat dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#katalog">Belanja lagi</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cartHydrated || !authHydrated || !orderHydrated) {
    return (
      <div
        className="grid gap-8 lg:grid-cols-[1fr_380px]"
        aria-hidden="true"
      >
        <div className="space-y-4">
          <div className="bg-muted h-64 animate-pulse rounded-xl" />
          <div className="bg-muted h-48 animate-pulse rounded-xl" />
        </div>
        <div className="bg-muted h-72 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <span className="bg-muted grid size-16 place-items-center rounded-full">
            <LogIn className="text-muted-foreground size-7" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Masuk untuk melanjutkan</h2>
            <p className="text-muted-foreground text-sm">
              Pesananmu akan tersimpan dan dapat dilihat di dashboard setelah
              masuk.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/login?next=/checkout">Masuk sekarang</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">Buat akun baru</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (cart.length === 0) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
          <span className="bg-muted grid size-16 place-items-center rounded-full">
            <ShoppingBag
              className="text-muted-foreground size-7"
              aria-hidden="true"
            />
          </span>
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Keranjang masih kosong</h2>
            <p className="text-muted-foreground text-sm">
              Tambahkan produk terlebih dahulu sebelum melakukan checkout.
            </p>
          </div>
          <Button asChild>
            <Link href="/#katalog">Jelajahi katalog</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setIsDialogOpen(true);
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Informasi kontak</CardTitle>
              <CardDescription>
                Kami akan mengirim pembaruan pesanan ke detail berikut.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="checkout-name">Nama lengkap</Label>
                <Input
                  id="checkout-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={fields.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-email">Email</Label>
                <Input
                  id="checkout-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-phone">Nomor telepon</Label>
                <Input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={fields.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alamat pengiriman</CardTitle>
              <CardDescription>
                Pastikan alamat lengkap agar kurir tidak kesulitan.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="checkout-address">Alamat</Label>
                <Textarea
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  required
                  rows={3}
                  value={fields.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-city">Kota / kabupaten</Label>
                <Input
                  id="checkout-city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  value={fields.city}
                  onChange={(event) => updateField("city", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-postal">Kode pos</Label>
                <Input
                  id="checkout-postal"
                  name="postalCode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  value={fields.postalCode}
                  onChange={(event) =>
                    updateField("postalCode", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="checkout-notes">Catatan pesanan (opsional)</Label>
                <Textarea
                  id="checkout-notes"
                  name="notes"
                  rows={2}
                  aria-describedby="checkout-notes-hint"
                  value={fields.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                />
                <p
                  id="checkout-notes-hint"
                  className="text-muted-foreground text-xs"
                >
                  Contoh: titip di pos keamanan atau instruksi ukuran khusus.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metode pembayaran</CardTitle>
              <CardDescription>
                Pilih salah satu metode yang tersedia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <fieldset className="space-y-3">
                <legend className="sr-only">Metode pembayaran</legend>
                {paymentOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <label
                      key={option.value}
                      className="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={payment === option.value}
                        onChange={() => setPayment(option.value)}
                        className="mt-1 size-4 accent-neutral-900"
                      />
                      <Icon
                        className="text-muted-foreground mt-0.5 size-5"
                        aria-hidden="true"
                      />
                      <span className="space-y-1">
                        <span className="block text-sm font-medium">
                          {option.label}
                        </span>
                        <span className="text-muted-foreground block text-xs">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Buat pesanan
          </Button>
        </form>

        <aside aria-label="Ringkasan pesanan" className="lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                Ringkasan pesanan
                <Badge variant="secondary">{totalItems} item</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="divide-y">
                {cart.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-3 py-3 first:pt-0"
                  >
                    <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {item.size} · {item.quantity}x
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatRupiah(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2 border-t pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatRupiah(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground flex items-center gap-1.5">
                    <Truck className="size-4" aria-hidden="true" />
                    Pengiriman
                  </dt>
                  <dd className="text-emerald-600 dark:text-emerald-400">
                    Gratis
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t pt-2 text-base font-bold">
                  <dt>Total</dt>
                  <dd>{formatRupiah(subtotal)}</dd>
                </div>
              </dl>

              <p className="text-muted-foreground flex items-start gap-2 text-xs">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                Ini adalah demo. Data pesanan disimpan di akunmu dan tidak ada
                pembayaran sebenarnya.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi pesanan</DialogTitle>
            <DialogDescription>
              Periksa kembali ringkasan pesanan sebelum membuat pesanan demo.
            </DialogDescription>
          </DialogHeader>
          <dl className="bg-muted space-y-2 rounded-lg p-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Jumlah item</dt>
              <dd>{totalItems}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Metode pembayaran</dt>
              <dd>
                {payment === "transfer" ? "Transfer bank" : "Bayar di tempat"}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t pt-2 font-semibold">
              <dt>Total</dt>
              <dd>{formatRupiah(subtotal)}</dd>
            </div>
          </dl>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Periksa lagi
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirm}>
              Buat pesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
