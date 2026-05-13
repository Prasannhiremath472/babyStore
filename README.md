# 🐣 LittleNest — Enterprise Baby & Kids Ecommerce Platform

A premium, production-ready ecommerce platform for baby & kids products built with modern enterprise architecture.

---

## 🏗️ Architecture Overview

```
babyStore/
├── backend/          # Node.js + Express + Prisma API
├── frontend/         # React 18 + Vite customer website
├── admin-panel/      # React 18 + Vite enterprise admin dashboard
├── nginx/            # Nginx reverse proxy config
├── docker-compose.yml
└── .env.example
```

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Redis 7+

### 1. Clone & Environment Setup
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev              # http://localhost:4000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev              # http://localhost:3000
```

### 4. Admin Panel Setup
```bash
cd admin-panel
npm install
npm run dev              # http://localhost:3001
```

---

## 🐳 Docker Deployment

```bash
docker-compose up -d postgres redis
# Full production stack:
docker-compose --profile production up -d
```

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@littlenest.in | SuperAdmin@123 |
| Admin | admin@littlenest.in | Admin@123 |
| Customer | demo@littlenest.in | Customer@123 |

**Coupon Codes:** `WELCOME10` (10% off) · `FLAT100` (₹100 off)

---

## 📋 Platform Features

### Customer Website (`localhost:3000`)
- Animated hero slider, shop by age/category/brand
- Advanced product listing with infinite scroll & filters
- Product detail with image gallery, variants, reviews
- Instant search with suggestions & history
- Mini cart + full cart + multi-step checkout
- Razorpay payment + COD support
- Order tracking & user dashboard
- Mobile-first responsive design

### Admin Panel (`localhost:3001`)
- ERP-style dashboard with revenue analytics & charts
- Product management with approval workflow
- Order management with real-time status updates
- Inventory management with low-stock alerts
- Category, brand, coupon, banner management
- Customer management with block/unblock
- Reviews moderation
- System audit logs with IP/device tracking
- Reports & CSV export
- Collapsible sidebar navigation

### Backend API (`localhost:4000/api-docs`)
- JWT auth with refresh token rotation
- Role-based access control (SUPER_ADMIN, ADMIN, MANAGER, CUSTOMER)
- Full product catalog with variants & inventory
- Complete order lifecycle management
- Razorpay payment integration & webhook verification
- Redis caching layer
- Rate limiting & security headers (Helmet)
- WebSocket real-time order updates
- Swagger API documentation

---

## 🔑 Environment Variables

Copy `.env.example` → `.env` and configure:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/littlenest
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-256-bit-secret
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxx
CLOUDINARY_CLOUD_NAME=xxxx
SMTP_HOST=smtp.gmail.com
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

---

## 🛡️ Security

- Helmet.js security headers
- Rate limiting (global + auth-specific)
- JWT with short-lived access tokens + rotating refresh tokens
- bcrypt password hashing (12 rounds)
- Zod input validation on all endpoints
- SQL injection prevention via Prisma ORM
- CORS protection
- Audit logging on all admin actions

---

## 🚢 Production Deployment (Hostinger)

```bash
# 1. Configure environment variables on server
# 2. Run migrations
npx prisma migrate deploy
# 3. Build and start
npm run build && pm2 start dist/server.js --name littlenest-api
# 4. Frontend/admin: build and serve via Nginx
npm run build  # creates dist/ folder for each app
```

---

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| State | Redux Toolkit, React Query |
| UI | Framer Motion, Recharts, Lucide Icons |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL 16, Prisma ORM |
| Cache | Redis (ioredis) |
| Auth | JWT (access + refresh tokens) |
| Payments | Razorpay |
| Realtime | Socket.IO |
| Deployment | Docker, Nginx |