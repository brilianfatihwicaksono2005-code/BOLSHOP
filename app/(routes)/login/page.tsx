import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/features/login-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun B'OLSHOP untuk melihat dashboard dan pesananmu.",
};

function LoginFormFallback() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="bg-muted h-9 animate-pulse rounded-md" />
      <div className="bg-muted h-9 animate-pulse rounded-md" />
      <div className="bg-muted h-32 animate-pulse rounded-lg" />
      <div className="bg-muted h-10 animate-pulse rounded-md" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
      <div className="bg-muted relative hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
        <Image
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
          alt="Pria mengenakan pakaian kasual"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 space-y-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Akun
          </p>
          <h1 className="text-3xl font-bold tracking-tight">
            Masuk ke dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Kelola pesanan dan pantau aktivitas belanjamu. Gunakan salah satu
            akun demo di bawah untuk mencoba website ini.
          </p>
        </div>

        <Card>
          <CardContent>
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Belum punya akun?{" "}
          <Link
            href="/signup"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
