export type ProductCategory = "Women" | "Men" | "Kids Women" | "Kids Men";

export type ProductAudience = "pria" | "wanita" | "unisex";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: ProductCategory;
  audience?: ProductAudience;
  image: string;
  sizes: string[];
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export type UserRole = "customer" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  memberSince: string;
  loyaltyPoints: number;
  avatarUrl?: string;
}

export type OrderStatus = "Diproses" | "Dikirim" | "Selesai";

export interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  itemCount: number;
  total: number;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
}
