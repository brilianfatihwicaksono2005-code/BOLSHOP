import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SignupForm } from "@/components/features/signup-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Daftar",
  description:
    "Buat akun B'OLSHOP untuk pengalaman belanja yang lebih personal.",
};

export default function SignupPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-md lg:order-2">
        <div className="mb-8 space-y-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Akun baru
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Buat akun B&apos;OLSHOP
          </h1>
          <p className="text-muted-foreground text-sm">
            Simpan riwayat pesanan dan dapatkan akses ke promo anggota.
          </p>
        </div>

        <Card>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Masuk
          </Link>
        </p>
      </div>

      <div className="bg-muted relative order-1 hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
          alt="Kantong belanja dan pakaian"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
