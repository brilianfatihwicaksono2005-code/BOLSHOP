"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Order, OrderStatus } from "@/types";

const STORAGE_KEY = "bolshop-orders-v1";

export const seedOrders: Order[] = [
  {
    id: "BOL-1042",
    date: "2026-10-18",
    status: "Dikirim",
    itemCount: 2,
    total: 628000,
    userId: "usr-pengguna",
    customerName: "Pengguna Demo",
    customerEmail: "pengguna@bolshop.id",
    items: [
      { name: "Kemeja Linen Relaxed", size: "M", quantity: 1, price: 249000 },
      { name: "Celana Jeans Slim", size: "32", quantity: 1, price: 379000 },
    ],
  },
  {
    id: "BOL-1038",
    date: "2026-10-09",
    status: "Selesai",
    itemCount: 1,
    total: 379000,
    userId: "usr-pengguna",
    customerName: "Pengguna Demo",
    customerEmail: "pengguna@bolshop.id",
    items: [
      { name: "Celana Jeans Slim", size: "32", quantity: 1, price: 379000 },
    ],
  },
  {
    id: "BOL-1021",
    date: "2026-09-27",
    status: "Selesai",
    itemCount: 3,
    total: 1397000,
    userId: "usr-pengguna",
    customerName: "Pengguna Demo",
    customerEmail: "pengguna@bolshop.id",
    items: [
      { name: "Sneakers Runner Grey", size: "42", quantity: 1, price: 899000 },
      { name: "Tas Ransel Urban", size: "One Size", quantity: 1, price: 349000 },
      { name: "Kaos Oversize Essential", size: "L", quantity: 1, price: 149000 },
    ],
  },
];

export type NewOrder = {
  userId: string;
  customerName: string;
  customerEmail: string;
  itemCount: number;
  total: number;
  items: Order["items"];
};

type OrderState = {
  orders: Order[];
  hasHydrated: boolean;
  addOrder: (input: NewOrder) => string;
};

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const order = value as Partial<Order>;

  return (
    typeof order.id === "string" &&
    typeof order.date === "string" &&
    (order.status === "Diproses" ||
      order.status === "Dikirim" ||
      order.status === "Selesai") &&
    typeof order.itemCount === "number" &&
    typeof order.total === "number" &&
    typeof order.userId === "string" &&
    typeof order.customerName === "string" &&
    typeof order.customerEmail === "string" &&
    Array.isArray(order.items)
  );
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: seedOrders,
      hasHydrated: false,

      addOrder: (input) => {
        const existingIds = new Set(get().orders.map((order) => order.id));
        let id = `BOL-${Date.now().toString().slice(-6)}`;

        while (existingIds.has(id)) {
          id = `BOL-${Date.now().toString().slice(-6)}${Math.floor(
            Math.random() * 10,
          )}`;
        }

        const order: Order = {
          ...input,
          id,
          date: new Date().toISOString().slice(0, 10),
          status: "Diproses" satisfies OrderStatus,
        };

        set({ orders: [order, ...get().orders] });

        return id;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ orders: state.orders }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { orders?: unknown } | undefined;
        const savedOrders = Array.isArray(persisted?.orders)
          ? persisted.orders.filter(isOrder)
          : [];

        const byId = new Map<string, Order>();

        for (const order of seedOrders) {
          byId.set(order.id, order);
        }

        for (const order of savedOrders) {
          byId.set(order.id, order);
        }

        const orders = [...byId.values()].sort((a, b) =>
          b.date.localeCompare(a.date),
        );

        return { ...currentState, orders };
      },
      onRehydrateStorage: () => () => {
        useOrderStore.setState({ hasHydrated: true });
      },
    },
  ),
);
