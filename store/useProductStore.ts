"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/types";
import { products as seedProducts } from "@/lib/mock-data";

const STORAGE_KEY = "bolshop-products-v1";

export type NewProduct = Omit<Product, "id">;

type ProductState = {
  products: Product[];
  hasHydrated: boolean;
  addProduct: (input: NewProduct) => string;
  updateProduct: (id: string, input: Partial<NewProduct>) => boolean;
  deleteProduct: (id: string) => boolean;
  getProduct: (id: string) => Product | undefined;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Partial<Product>;

  return (
    typeof product.id === "string" &&
    typeof product.slug === "string" &&
    typeof product.name === "string" &&
    typeof product.brand === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    (product.category === "Women" ||
      product.category === "Men" ||
      product.category === "Kids Women" ||
      product.category === "Kids Men") &&
    typeof product.image === "string" &&
    Array.isArray(product.sizes) &&
    typeof product.stock === "number"
  );
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      hasHydrated: false,

      addProduct: (input) => {
        const id = `prd-${Date.now()}`;
        const product: Product = {
          ...input,
          id,
        };

        set({ products: [product, ...get().products] });
        return id;
      },

      updateProduct: (id, input) => {
        const products = get().products;
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) return false;

        const updated = { ...products[index], ...input };
        set({
          products: [...products.slice(0, index), updated, ...products.slice(index + 1)],
        });
        return true;
      },

      deleteProduct: (id) => {
        const products = get().products;
        const filtered = products.filter((p) => p.id !== id);

        if (filtered.length === products.length) return false;

        set({ products: filtered });
        return true;
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ products: state.products }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { products?: unknown } | undefined;
        const savedProducts = Array.isArray(persisted?.products)
          ? persisted.products.filter(isProduct)
          : [];

        const byId = new Map<string, Product>();

        for (const product of seedProducts) {
          byId.set(product.id, product);
        }

        for (const product of savedProducts) {
          byId.set(product.id, product);
        }

        const products = [...byId.values()];

        return { ...currentState, products };
      },
      onRehydrateStorage: () => () => {
        useProductStore.setState({ hasHydrated: true });
      },
    },
  ),
);
