"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "bolshop-cart-v1";

type CartState = {
  cart: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (open: boolean) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<CartItem>;
  const product = candidate.product as Partial<Product> | undefined;

  return (
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0 &&
    typeof candidate.size === "string" &&
    typeof product?.id === "string" &&
    typeof product?.name === "string" &&
    typeof product?.price === "number" &&
    typeof product?.image === "string" &&
    typeof product?.stock === "number"
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,
      hasHydrated: false,

      addItem: (product, size, quantity = 1) => {
        if (!size || product.stock < 1) {
          return;
        }

        const { cart } = get();
        const existingIndex = cart.findIndex(
          (item) => item.product.id === product.id && item.size === size,
        );

        if (existingIndex === -1) {
          set({
            cart: [
              ...cart,
              {
                product,
                size,
                quantity: Math.min(quantity, product.stock),
              },
            ],
            isOpen: true,
          });
          return;
        }

        set({
          cart: cart.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + quantity,
                    item.product.stock,
                  ),
                }
              : item,
          ),
          isOpen: true,
        });
      },

      removeItem: (productId, size) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.product.id === productId && item.size === size),
          ),
        });
      },

      updateQuantity: (productId, size, quantity) => {
        set({
          cart: get().cart.map((item) => {
            if (item.product.id !== productId || item.size !== size) {
              return item;
            }

            return {
              ...item,
              quantity: Math.min(
                Math.max(quantity, 1),
                Math.max(item.product.stock, 1),
              ),
            };
          }),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setOpen: (open) => {
        set({ isOpen: open });
      },

      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),

      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ cart: state.cart }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { cart?: unknown } | undefined;

        return {
          ...currentState,
          cart: Array.isArray(persisted?.cart)
            ? persisted.cart.filter(isCartItem)
            : [],
        };
      },
      onRehydrateStorage: () => () => {
        useCartStore.setState({ hasHydrated: true });
      },
    },
  ),
);
