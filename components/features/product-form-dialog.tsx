"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore, type NewProduct } from "@/store/useProductStore";
import type { Product, ProductCategory } from "@/types";

const categories: ProductCategory[] = ["Women", "Men", "Kids Women", "Kids Men"];

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProduct?: Product | null;
};

export function ProductFormDialog({
  open,
  onOpenChange,
  initialProduct,
}: ProductFormDialogProps) {
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [brand, setBrand] = useState(initialProduct?.brand ?? "");
  const [price, setPrice] = useState(initialProduct?.price.toString() ?? "");
  const [category, setCategory] = useState<ProductCategory>(
    initialProduct?.category ?? "Men"
  );
  const [description, setDescription] = useState(
    initialProduct?.description ?? ""
  );
  const [stock, setStock] = useState(initialProduct?.stock.toString() ?? "");
  const [image, setImage] = useState(initialProduct?.image ?? "");
  const [sizes, setSizes] = useState(initialProduct?.sizes.join(", ") ?? "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !brand || !price || !stock || !image) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    const newProduct: NewProduct = {
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      brand,
      price: Number(price),
      category,
      description,
      stock: Number(stock),
      image,
      sizes: sizes.split(",").map((s) => s.trim()),
    };

    if (initialProduct) {
      updateProduct(initialProduct.id, newProduct);
    } else {
      addProduct(newProduct);
    }

    setError("");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setBrand("");
    setPrice("");
    setCategory("Men");
    setDescription("");
    setStock("");
    setImage("");
    setSizes("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk mengelola produk katalog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">Nama Produk</Label>
              <Input
                id="product-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama produk"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-brand">Brand</Label>
              <Input
                id="product-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-price">Harga (Rp)</Label>
              <Input
                id="product-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-stock">Stok</Label>
              <Input
                id="product-stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-category">Kategori</Label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-description">Deskripsi</Label>
              <Textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi produk"
                rows={2}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-image">URL Gambar</Label>
              <Input
                id="product-image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-sizes">Ukuran (pisahkan dengan koma)</Label>
              <Input
                id="product-sizes"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="S, M, L, XL"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-destructive text-sm">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Batal
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            {initialProduct ? "Update" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
