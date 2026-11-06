"use client";

import { useEffect, type ReactNode } from "react";

import { useCartStore } from "@/store/useCartStore";

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!useCartStore.persist.hasHydrated()) {
      void useCartStore.persist.rehydrate();
    }
  }, []);

  return <>{children}</>;
}

export const useCart = () => useCartStore();
