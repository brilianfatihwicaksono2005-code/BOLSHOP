"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export function HeroActions() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!hasHydrated) {
    return (
      <>
        <Button size="lg" asChild>
          <Link href="/#katalog">
            Belanja sekarang
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/login">Masuk / Daftar</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button size="lg" asChild>
        <Link href="/#katalog">
          Belanja sekarang
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
      {!currentUser ? (
        <Button size="lg" variant="outline" asChild>
          <Link href="/login">Masuk / Daftar</Link>
        </Button>
      ) : (
        <Button size="lg" variant="outline" asChild>
          <Link href="/#katalog">Lihat katalog</Link>
        </Button>
      )}
    </>
  );
}
