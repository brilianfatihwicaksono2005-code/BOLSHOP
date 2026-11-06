# B'OLSHOP — Platform E-Commerce Fashion

Platform e-commerce modern untuk katalog pakaian dengan fitur lengkap: autentikasi, manajemen produk (CRUD), keranjang belanja, checkout, dan admin dashboard.

## Fitur Utama

### 👥 Untuk Pengguna
- **Katalog Produk** — Jelajahi koleksi lengkap dengan filter kategori (Women, Men, Kids Women, Kids Men)
- **Pencarian** — Cari produk berdasarkan nama atau brand
- **Autentikasi** — Login/Signup dengan dummy account atau buat akun baru
- **Keranjang Belanja** — Tambah, edit, hapus produk dengan tracking real-time
- **Checkout** — Proses pembelian dengan pilihan metode pembayaran
- **Pesanan** — Lihat riwayat pesanan di dashboard pengguna

### 🔧 Untuk Admin
- **Admin Panel** (`/admin/products`) — Kelola katalog produk
- **CRUD Produk** — Tambah, edit, hapus produk dengan form dialog
- **Search Filter** — Cari produk untuk manajemen cepat
- **Dashboard Admin** — Lihat statistik toko (total produk, stok rendah, pesanan, pelanggan)
- **Inventory View** — Monitor status stok semua produk

## Stack Teknologi

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **State Management:** Zustand (persistent localStorage)
- **UI Components:** Radix UI + shadcn/ui
- **Styling:** Tailwind CSS dengan custom theme
- **Build Tool:** Turbopack (Next.js 16)

## Akun Demo

### Pengguna
- **Username:** pengguna
- **Password:** pengguna123

### Admin
- **Username:** admin
- **Password:** admin123

## Mulai Cepat

### Prerequisites
- Node.js 18+
- npm atau yarn

### Install & Run

```bash
# Clone repository
git clone https://github.com/brilianfatihwicaksono2005-code/BOLSHOP.git
cd BOLSHOP

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build & Deploy

```bash
# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Struktur Project

```
BOLSHOP/
├── app/                          # Next.js app directory
│   ├── (routes)/                 # Route groups
│   │   ├── page.tsx              # Landing page (katalog)
│   │   ├── login/page.tsx        # Login page
│   │   ├── signup/page.tsx       # Signup page
│   │   ├── dashboard/page.tsx    # User dashboard
│   │   ├── checkout/page.tsx     # Checkout page
│   │   └── admin/products/       # Admin products page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── features/                 # Feature components
│   │   ├── auth-provider.tsx     # Auth hydration provider
│   │   ├── login-form.tsx        # Login form dengan dummy credentials
│   │   ├── signup-form.tsx       # Signup form (functional registration)
│   │   ├── product-card.tsx      # Product card dengan login gate
│   │   ├── checkout-form.tsx     # Checkout form dengan auth gate
│   │   ├── cart-sheet.tsx        # Shopping cart sidebar
│   │   ├── dashboard-view.tsx    # User dashboard wrapper
│   │   ├── customer-dashboard.tsx # Customer dashboard UI
│   │   ├── admin-products-view.tsx # Admin products management
│   │   └── ...
│   ├── layout/
│   │   ├── navbar.tsx            # Navigation (role-aware)
│   │   └── footer.tsx            # Footer
│   └── ui/                       # UI primitives (Button, Input, etc.)
├── store/                        # Zustand stores
│   ├── useAuthStore.ts           # Auth state + CRUD users
│   ├── useCartStore.ts           # Cart state
│   ├── useOrderStore.ts          # Orders state
│   └── useProductStore.ts        # Products state + CRUD
├── lib/
│   ├── mock-data.ts              # Seed products & demo user
│   ├── order-utils.ts            # Order formatting utilities
│   └── utils.ts                  # Helper functions
├── types/
│   └── index.ts                  # TypeScript types
└── package.json
```

## Alur Pengguna

### Tidak Login
1. Buka `/` → Lihat katalog lengkap
2. Cari/filter produk
3. Klik "Tambah ke tas" → Modal login muncul
4. Login dengan akun demo atau daftar akun baru

### Setelah Login (Customer)
1. Buka `/` → Lihat katalog
2. Tambah produk ke keranjang
3. Klik cart icon → Lihat keranjang
4. Klik "Checkout" → `/checkout`
5. Isi form pengiriman + pilih metode pembayaran
6. Klik "Buat pesanan" → Pesanan tercatat
7. Klik "Dashboard" → Lihat pesanan & profil

### Admin
1. Login dengan admin/admin123
2. Navbar → "Admin Panel" → `/admin/products`
3. Search/filter produk
4. Klik "Tambah Produk" → Form dialog
5. Edit/Hapus produk dari grid
6. Semua perubahan persisten di localStorage

## Fitur Keamanan

- Autentikasi client-side dengan Zustand + localStorage
- Role-based access control (customer/admin)
- Protected routes (dashboard redirect ke login jika tidak auth)
- Login gate modal pada interaksi produk tanpa auth
- Input validation di form login/signup/checkout
- Password confirmation di signup

## Data Persistence

- **Auth:** Stored di localStorage dengan persist middleware
- **Cart:** Persisten across sessions
- **Orders:** Seed orders + user-created orders disimpan
- **Products:** Seed catalog + admin changes persisten
- **Clear:** Buka DevTools → Application → Clear localStorage untuk reset

## Deployment ke Vercel

```bash
# Push ke GitHub (sudah selesai)
git push origin main

# Di Vercel:
1. Go to vercel.com
2. New Project → Import Git Repository
3. Select BOLSHOP repository
4. Deploy → Live
```

## Catatan Penting

- **Demo Mode:** Login tidak memerlukan backend — semua auth client-side
- **No Backend:** Seluruh data disimpan di browser localStorage
- **Reset Data:** Logout user atau clear browser storage untuk reset
- **Responsive:** Mobile-first design, tested di mobile & desktop
- **Accessibility:** ARIA labels, keyboard navigation, semantic HTML

## Lisensi

MIT License

## Kontak

- GitHub: [@brilianfatihwicaksono2005-code](https://github.com/brilianfatihwicaksono2005-code)
- Repository: [BOLSHOP](https://github.com/brilianfatihwicaksono2005-code/BOLSHOP)
