import type { OrderStatus } from "@/types";

export const orderStatusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "outline"
> = {
  Diproses: "default",
  Dikirim: "secondary",
  Selesai: "outline",
};

export function formatOrderDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function formatMemberSince(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
