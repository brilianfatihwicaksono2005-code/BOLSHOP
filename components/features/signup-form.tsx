"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";

export function SignupForm() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const logout = useAuthStore((state) => state.logout);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [createdName, setCreatedName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormError("Konfirmasi password belum sama.");
      return;
    }

    const result = signup({ name, username, email, phone, password });

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    setFormError("");
    setCreatedName(result.user.name);
    setIsSubmitted(true);
    router.refresh();
  };

  const handleUseAnotherAccount = () => {
    logout();
    setIsSubmitted(false);
    setCreatedName("");
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  if (isSubmitted) {
    return (
      <div className="space-y-5 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Akun berhasil dibuat</h2>
          <p className="text-muted-foreground text-sm">
            Kamu otomatis masuk sebagai{" "}
            <span className="text-foreground font-semibold">
              {createdName}
            </span>
            . Lanjutkan ke dashboard untuk melihat ringkasan akunmu.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button asChild onClick={() => router.refresh()}>
            <Link href="/dashboard">Buka dashboard</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleUseAnotherAccount}
          >
            Masuk dengan akun lain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="signup-name">Nama lengkap</Label>
        <Input
          id="signup-name"
          name="name"
          autoComplete="name"
          placeholder="Nama kamu"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-username">Username</Label>
        <Input
          id="signup-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="username unik kamu"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          aria-invalid={Boolean(formError)}
        />
        <p className="text-muted-foreground text-xs">
          3-20 karakter: huruf, angka, titik, garis bawah, atau strip.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-phone">Nomor telepon</Label>
          <Input
            id="signup-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0812xxxxxxx"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            className="pr-10"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(formError)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">Minimal 8 karakter.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Konfirmasi password</Label>
        <Input
          id="signup-confirm-password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          minLength={8}
          required
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            setFormError("");
          }}
          aria-invalid={Boolean(formError)}
        />
        {formError ? (
          <p
            role="alert"
            className="text-destructive text-xs"
          >
            {formError}
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="signup-terms"
          name="terms"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-input accent-neutral-900"
        />
        <Label
          htmlFor="signup-terms"
          className="text-muted-foreground text-xs leading-relaxed font-normal"
        >
          Saya menyetujui syarat penggunaan dan kebijakan privasi
          B&apos;OLSHOP.
        </Label>
      </div>

      <Button type="submit" className="w-full" size="lg">
        <UserPlus aria-hidden="true" />
        Buat akun
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-foreground font-medium underline underline-offset-4"
        >
          Masuk
        </Link>{" "}
        atau coba akun demo (pengguna / admin).
      </p>
    </form>
  );
}
