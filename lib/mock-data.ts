import type { Product, ProductCategory, UserProfile } from "@/types";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: ProductCategory[] = [
  "Women",
  "Men",
  "Kids Women",
  "Kids Men",
];

export const products: Product[] = [
  {
    id: "prd-001",
    slug: "kaos-oversize-essential",
    name: "Kaos Oversize Essential",
    brand: "B'OLSHOP Basics",
    description:
      "Kaos katun organik 240 gsm dengan potongan oversize dan jahitan rantai yang nyaman dipakai harian.",
    price: 149000,
    category: "Men",
    image: image("photo-1521572163474-6864f9cf17ab"),
    sizes: ["S", "M", "L", "XL"],
    stock: 42,
    featured: true,
  },
  {
    id: "prd-002",
    slug: "kemeja-linen-relaxed",
    name: "Kemeja Linen Relaxed",
    brand: "B'OLSHOP Studio",
    description:
      "Kemeja linen premium dengan kerah campuran dan potongan relaxed untuk tampilan santai yang rapi.",
    price: 249000,
    category: "Men",
    image: image("photo-1596755094514-f87e34085b2c"),
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    featured: true,
  },
  {
    id: "prd-003",
    slug: "hoodie-heavyweight",
    name: "Hoodie Heavyweight",
    brand: "B'OLSHOP Studio",
    description:
      "Hoodie fleece 380 gsm dengan hood berlapis dan kantong kanguru, hangat tanpa terasa berat.",
    price: 329000,
    category: "Men",
    image: image("photo-1620799140408-edc6dcb6d633"),
    sizes: ["M", "L", "XL"],
    stock: 9,
    featured: true,
  },
  {
    id: "prd-004",
    slug: "jaket-bomber-classic",
    name: "Jaket Bomber Classic",
    brand: "B'OLSHOP Heritage",
    description:
      "Jaket bomber dengan bahan tahan angin, rib knit pada manset, dan lapisan dalam yang ringan.",
    price: 459000,
    category: "Men",
    image: image("photo-1591047139829-d91aecb6caea"),
    sizes: ["M", "L", "XL"],
    stock: 0,
  },
  {
    id: "prd-005",
    slug: "celana-jeans-slim",
    name: "Celana Jeans Slim",
    brand: "B'OLSHOP Denim",
    description:
      "Denim stretch 12 oz dengan potongan slim dan warna indigo gelap yang mudah dipadukan.",
    price: 379000,
    category: "Men",
    image: image("photo-1542272604-787c3835535d"),
    sizes: ["28", "30", "32", "34", "36"],
    stock: 26,
  },
  {
    id: "prd-006",
    slug: "celana-chino-tapered",
    name: "Celana Chino Tapered",
    brand: "B'OLSHOP Studio",
    description:
      "Chino katun twill dengan potongan tapered, cocok untuk gaya kantor maupun akhir pekan.",
    price: 289000,
    category: "Men",
    image: image("photo-1594633312681-425c7b97ccd1"),
    sizes: ["28", "30", "32", "34", "36"],
    stock: 31,
  },
  {
    id: "prd-007",
    slug: "sneakers-court-white",
    name: "Sneakers Court White",
    brand: "B'OLSHOP Footwear",
    description:
      "Sneakers kulit sintetis premium dengan sol karet vulkanisir dan bantalan insole yang empuk.",
    price: 799000,
    category: "Men",
    image: image("photo-1549298916-b41d501d3772"),
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 14,
    featured: true,
  },
  {
    id: "prd-008",
    slug: "sneakers-runner-grey",
    name: "Sneakers Runner Grey",
    brand: "B'OLSHOP Footwear",
    description:
      "Sepatu lari ringan dengan mesh breathable dan midsole responsif untuk pemakaian sepanjang hari.",
    price: 899000,
    category: "Men",
    image: image("photo-1600185365483-26d7a4cc7519"),
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 6,
  },
  {
    id: "prd-009",
    slug: "tas-ransel-urban",
    name: "Tas Ransel Urban",
    brand: "B'OLSHOP Goods",
    description:
      "Ransel 22 liter dengan kompartemen laptop 15 inci, bahan water repellent, dan tali bahu berlapis.",
    price: 349000,
    category: "Men",
    audience: "unisex",
    image: image("photo-1553062407-98eeb64c6a62"),
    sizes: ["One Size"],
    stock: 22,
  },
  {
    id: "prd-010",
    slug: "jam-tangan-minimalis",
    name: "Jam Tangan Minimalis",
    brand: "B'OLSHOP Goods",
    description:
      "Jam tangan analog dengan dial bersih, strap kulit asli, dan tahan air hingga 3 ATM.",
    price: 599000,
    category: "Men",
    audience: "unisex",
    image: image("photo-1523275335684-37898b6baf30"),
    sizes: ["One Size"],
    stock: 11,
  },
  {
    id: "prd-011",
    slug: "blouse-linen-wanita",
    name: "Blouse Linen Wanita",
    brand: "B'OLSHOP Studio",
    description:
      "Blouse linen dengan siluet jatuh dan kancing tersembunyi, ringan dipakai sepanjang hari.",
    price: 269000,
    category: "Women",
    audience: "wanita",
    image: image("photo-1595777457583-95e059d581b8"),
    sizes: ["S", "M", "L"],
    stock: 17,
    featured: true,
  },
  {
    id: "prd-012",
    slug: "rok-midi-pleated",
    name: "Rok Midi Pleated",
    brand: "B'OLSHOP Studio",
    description:
      "Rok midi berlipit dengan pinggang elastis dan bahan flowy yang nyaman untuk berbagai acara.",
    price: 319000,
    category: "Women",
    audience: "wanita",
    image: image("photo-1583496661160-fb5886a13d44"),
    sizes: ["S", "M", "L"],
    stock: 13,
  },
  {
    id: "prd-013",
    slug: "cardigan-rajut-oversize",
    name: "Cardigan Rajut Oversize",
    brand: "B'OLSHOP Studio",
    description:
      "Cardigan rajut bertekstur lembut dengan potongan oversize, lapisan sempurna untuk cuaca sejuk.",
    price: 359000,
    category: "Women",
    audience: "wanita",
    image: image("photo-1576566588028-4147f3842f27"),
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    featured: true,
  },
];

export const mockUser: UserProfile = {
  id: "usr-001",
  name: "Brilian Faatih",
  email: "brilian@bolshop.id",
  phone: "+62 812-3456-7890",
  role: "customer",
  memberSince: "2024-08-17",
  loyaltyPoints: 1250,
};

export const featuredProducts = products.filter((product) => product.featured);
