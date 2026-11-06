"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { UserRole } from "@/types";

const STORAGE_KEY = "bolshop-auth-v1";

export type AuthAccount = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  memberSince: string;
  loyaltyPoints: number;
  isDemo?: boolean;
};

export type AuthUser = Omit<AuthAccount, "password" | "isDemo">;

export type LoginResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export type SignupInput = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type SignupResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export const demoAccounts: AuthAccount[] = [
  {
    id: "usr-pengguna",
    username: "pengguna",
    password: "pengguna123",
    name: "Pengguna Demo",
    email: "pengguna@bolshop.id",
    phone: "+62 812-3456-7890",
    role: "customer",
    memberSince: "2024-08-17",
    loyaltyPoints: 1250,
    isDemo: true,
  },
  {
    id: "usr-admin",
    username: "admin",
    password: "admin123",
    name: "Admin B'OLSHOP",
    email: "admin@bolshop.id",
    phone: "+62 812-0000-0000",
    role: "admin",
    memberSince: "2023-01-01",
    loyaltyPoints: 0,
    isDemo: true,
  },
];

function toAuthUser(account: AuthAccount): AuthUser {
  return {
    id: account.id,
    username: account.username,
    name: account.name,
    email: account.email,
    phone: account.phone,
    role: account.role,
    memberSince: account.memberSince,
    loyaltyPoints: account.loyaltyPoints,
  };
}

function isAuthAccount(value: unknown): value is AuthAccount {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const account = value as Partial<AuthAccount>;

  return (
    typeof account.id === "string" &&
    typeof account.username === "string" &&
    typeof account.password === "string" &&
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.phone === "string" &&
    (account.role === "customer" || account.role === "admin") &&
    typeof account.memberSince === "string" &&
    typeof account.loyaltyPoints === "number"
  );
}

type AuthState = {
  accounts: AuthAccount[];
  currentUser: AuthUser | null;
  hasHydrated: boolean;
  login: (username: string, password: string) => LoginResult;
  signup: (input: SignupInput) => SignupResult;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accounts: demoAccounts,
      currentUser: null,
      hasHydrated: false,

      login: (username, password) => {
        const normalizedUsername = username.trim().toLowerCase();
        const account = get().accounts.find(
          (item) => item.username.toLowerCase() === normalizedUsername,
        );

        if (!account || account.password !== password) {
          return {
            ok: false,
            message:
              "Username atau password salah. Gunakan akun demo yang tertera di bawah kolom.",
          };
        }

        const user = toAuthUser(account);
        set({ currentUser: user });

        return { ok: true, user };
      },

      signup: ({ name, username, email, phone, password }) => {
        const normalizedUsername = username.trim().toLowerCase();
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();

        if (
          !normalizedUsername ||
          !normalizedName ||
          !normalizedEmail ||
          !normalizedPhone
        ) {
          return { ok: false, message: "Semua kolom wajib diisi." };
        }

        if (!/^[a-z0-9._-]{3,20}$/.test(normalizedUsername)) {
          return {
            ok: false,
            message:
              "Username harus 3-20 karakter dan hanya boleh berisi huruf, angka, titik, garis bawah, atau strip.",
          };
        }

        if (password.length < 8) {
          return { ok: false, message: "Password minimal 8 karakter." };
        }

        const accounts = get().accounts;

        if (
          accounts.some(
            (account) =>
              account.username.toLowerCase() === normalizedUsername,
          )
        ) {
          return { ok: false, message: "Username sudah dipakai. Coba yang lain." };
        }

        if (
          accounts.some(
            (account) => account.email.toLowerCase() === normalizedEmail,
          )
        ) {
          return { ok: false, message: "Email sudah terdaftar. Gunakan email lain." };
        }

        const account: AuthAccount = {
          id: `usr-${Date.now()}`,
          username: normalizedUsername,
          password,
          name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          role: "customer",
          memberSince: new Date().toISOString().slice(0, 10),
          loyaltyPoints: 0,
        };

        const user = toAuthUser(account);
        set({ accounts: [...accounts, account], currentUser: user });

        return { ok: true, user };
      },

      logout: () => {
        set({ currentUser: null });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as
          | { accounts?: unknown; currentUser?: unknown }
          | undefined;
        const savedAccounts = Array.isArray(persisted?.accounts)
          ? persisted.accounts.filter(isAuthAccount)
          : [];

        const demoUsernames = new Set(
          demoAccounts.map((account) => account.username.toLowerCase()),
        );

        const accounts = [
          ...savedAccounts.filter(
            (account) =>
              !demoUsernames.has(account.username.toLowerCase()),
          ),
          ...demoAccounts,
        ];

        const savedUser = persisted?.currentUser as
          | Partial<AuthUser>
          | undefined;
        const matchingAccount = savedUser
          ? accounts.find(
              (account) =>
                account.username.toLowerCase() ===
                String(savedUser.username ?? "").toLowerCase(),
            )
          : undefined;

        return {
          ...currentState,
          accounts,
          currentUser: matchingAccount ? toAuthUser(matchingAccount) : null,
        };
      },
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    },
  ),
);

export const demoCredentials = demoAccounts.map((account) => ({
  role: account.role,
  username: account.username,
  password: account.password,
  name: account.name,
}));
