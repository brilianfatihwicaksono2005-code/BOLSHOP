"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="space-y-3">
      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubscribed(true);
          setEmail("");
        }}
      >
        <div className="flex-1">
          <Label htmlFor="newsletter-email" className="sr-only">
            Alamat email
          </Label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setIsSubscribed(false);
            }}
            className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white/50 focus-visible:ring-white/20"
          />
        </div>
        <Button type="submit" variant="secondary">
          Berlangganan
        </Button>
      </form>
      <p role="status" aria-live="polite" className="min-h-4 text-xs text-white/60">
        {isSubscribed
          ? "Terima kasih! Promo terbaru akan dikirim ke emailmu."
          : ""}
      </p>
    </div>
  );
}
