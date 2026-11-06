"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LoginGateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LoginGateModal({ open, onOpenChange }: LoginGateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="size-5" />
            Masuk untuk melanjutkan
          </DialogTitle>
          <DialogDescription>
            Silakan login atau daftar akun terlebih dahulu untuk berinteraksi
            dengan produk.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Lanjutkan browsing
            </Button>
          </DialogClose>
          <Button asChild>
            <Link href="/login">Masuk sekarang</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
