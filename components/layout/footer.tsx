import Link from "next/link";
import { Briefcase, Camera, Play } from "lucide-react";

import { NewsletterForm } from "@/components/features/newsletter-form";

const footerLinks = [
  { href: "/#katalog", label: "Semua produk" },
  { href: "/#tentang", label: "Tentang kami" },
  { href: "/checkout", label: "Checkout" },
  { href: "/dashboard", label: "Dashboard" },
];

const helpLinks = [
  { href: "/login", label: "Masuk" },
  { href: "/signup", label: "Daftar akun" },
  { href: "/#katalog", label: "Panduan ukuran" },
  { href: "/#katalog", label: "Pengembalian barang" },
];

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram", icon: Camera },
  { href: "https://www.youtube.com", label: "YouTube", icon: Play },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: Briefcase },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5 md:col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-black tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-md bg-white text-sm font-black text-neutral-950">
              B
            </span>
            B&apos;OLSHOP
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-neutral-400">
            Fashion pria modern dengan potongan rapi, bahan nyaman, dan harga
            yang masuk akal. Dikurasi untuk pemakaian sehari-hari.
          </p>
          <div className="max-w-md">
            <p className="mb-2 text-sm font-medium">
              Dapatkan promo eksklusif
            </p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Tautan belanja">
          <h2 className="mb-4 text-sm font-semibold">Belanja</h2>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8">
          <nav aria-label="Bantuan">
            <h2 className="mb-4 text-sm font-semibold">Bantuan</h2>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Terhubung</h2>
            <ul className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="grid size-9 place-items-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:bg-white hover:text-neutral-950"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {process.env.NEXT_PUBLIC_COPYRIGHT_YEAR} B&apos;OLSHOP.
            Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="transition-colors hover:text-white">
              Kebijakan privasi
            </Link>
            <Link href="/" className="transition-colors hover:text-white">
              Syarat penggunaan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
