"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Eye, EyeOff, KeyRound, LogIn, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoCredentials, useAuthStore } from "@/store/useAuthStore";

const roleLabel: Record<string, string> = {
  customer: "Pengguna",
  admin: "Admin",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);

  const nextParam = searchParams.get("next");
  const nextPath =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    router.push(nextPath);
    router.refresh();
  };

  const fillDemoAccount = (demoUsername: string, demoPassword: string) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="login-username">Username</Label>
        <Input
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="pengguna atau admin"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setError("");
          }}
          aria-invalid={Boolean(error)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="login-password">Password</Label>
          <span className="text-muted-foreground text-xs">
            Case-sensitive
          </span>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            minLength={6}
            required
            className="pr-10"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            aria-invalid={Boolean(error)}
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
      </div>

      {error ? (
        <p
          role="alert"
          className="text-destructive flex items-start gap-2 text-sm"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      <div
        id="akun-demo"
        className="bg-muted/50 space-y-3 rounded-lg border p-4"
      >
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
          <KeyRound className="size-3.5" aria-hidden="true" />
          Akun demo (data dummy)
        </p>
        <ul className="space-y-2 text-sm">
          {demoCredentials.map((credential) => (
            <li
              key={credential.username}
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <p className="flex items-center gap-1.5 text-xs font-medium">
                  <UserRound className="text-muted-foreground size-3" aria-hidden="true" />
                  {roleLabel[credential.role] ?? credential.role}
                </p>
                <p className="text-xs">
                  <code className="bg-background rounded border px-1.5 py-0.5 font-mono">
                    {credential.username}
                  </code>{" "}
                  /{" "}
                  <code className="bg-background rounded border px-1.5 py-0.5 font-mono">
                    {credential.password}
                  </code>
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  fillDemoAccount(credential.username, credential.password)
                }
              >
                Isi otomatis
              </Button>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-xs">
          Salin kredensial di atas ke kolom username dan password, lalu klik
          Masuk.
        </p>
      </div>

      <Button type="submit" className="w-full" size="lg">
        <LogIn aria-hidden="true" />
        Masuk
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        Belum punya akun?{" "}
        <Link
          href="/signup"
          className="text-foreground font-medium underline underline-offset-4"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
