"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Trash2, Edit, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/types";
import { ProductFormDialog } from "./product-form-dialog";

export function AdminProductsView() {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const productHydrated = useProductStore((state) => state.hasHydrated);
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (hasHydrated && (!currentUser || currentUser.role !== "admin")) {
      router.replace("/");
    }
  }, [hasHydrated, currentUser, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus produk ini?")) {
      deleteProduct(id);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!hasHydrated || !productHydrated || !currentUser || currentUser.role !== "admin") {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="size-4" />
            Tambah Produk
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="size-4" />
            Keluar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-12">
            Tidak ada produk.
          </p>
        ) : (
          filteredProducts.map((product) => {
            const stockVariant =
              product.stock === 0
                ? "destructive"
                : product.stock <= 5
                  ? "secondary"
                  : "outline";

            return (
              <Card key={product.id} className="flex flex-col">
                <CardContent className="flex-1 space-y-3 pt-6">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">
                      {product.brand}
                    </p>
                    <h3 className="line-clamp-2 font-semibold text-sm">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold mt-1">
                      {formatRupiah(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant={stockVariant} className="text-xs">
                      {product.stock} stok
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="size-3.5" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="size-3.5" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <ProductFormDialog
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        initialProduct={editingProduct}
      />
    </div>
  );
}
