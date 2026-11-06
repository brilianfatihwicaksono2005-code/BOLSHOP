"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useProductStore } from "@/store/useProductStore";

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!useAuthStore.persist.hasHydrated()) {
      void useAuthStore.persist.rehydrate();
    }

    if (!useOrderStore.persist.hasHydrated()) {
      void useOrderStore.persist.rehydrate();
    }

    if (!useProductStore.persist.hasHydrated()) {
      void useProductStore.persist.rehydrate();
    }
  }, []);

  return <>{children}</>;
}
