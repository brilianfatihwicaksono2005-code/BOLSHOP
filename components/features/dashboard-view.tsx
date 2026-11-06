"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AdminDashboard } from "@/components/features/admin-dashboard";
import { CustomerDashboard } from "@/components/features/customer-dashboard";
import { useAuthStore, type AuthUser } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";

function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="bg-muted h-12 w-64 animate-pulse rounded-lg" />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <div className="bg-muted h-72 animate-pulse rounded-xl" />
        <div className="space-y-6">
          <div className="bg-muted h-28 animate-pulse rounded-xl" />
          <div className="bg-muted h-64 animate-pulse rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DashboardView() {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const accounts = useAuthStore((state) => state.accounts);
  const logout = useAuthStore((state) => state.logout);
  const orderHydrated = useOrderStore((state) => state.hasHydrated);
  const orders = useOrderStore((state) => state.orders);

  useEffect(() => {
    if (hasHydrated && !currentUser) {
      router.replace("/login?next=/dashboard");
    }
  }, [hasHydrated, currentUser, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  if (!hasHydrated || !orderHydrated || !currentUser) {
    return <DashboardSkeleton />;
  }

  const user: AuthUser = currentUser;

  return user.role === "admin" ? (
    <AdminDashboard
      user={user}
      orders={orders}
      accounts={accounts}
      onLogout={handleLogout}
    />
  ) : (
    <CustomerDashboard user={user} orders={orders} onLogout={handleLogout} />
  );
}
