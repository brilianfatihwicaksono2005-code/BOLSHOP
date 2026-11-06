import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/components/features/auth-provider";
import { CartProvider } from "@/components/features/cart-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "B'OLSHOP — Fashion Pria Modern",
    template: "%s | B'OLSHOP",
  },
  description:
    "B'OLSHOP menghadirkan fashion pria modern: atasan, bawahan, sepatu, dan aksesoris pilihan dengan kualitas terbaik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <AuthProvider>
            <a
              href="#main-content"
              className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
            >
              Lewati ke konten utama
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
