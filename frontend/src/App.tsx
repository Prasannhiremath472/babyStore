import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import PageLoader from './components/ui/PageLoader';

// ── Customer pages ──────────────────────────────────────────────────────────
const HomePage             = lazy(() => import('./pages/HomePage'));
const ProductListingPage   = lazy(() => import('./pages/ProductListingPage'));
const ProductDetailPage    = lazy(() => import('./pages/ProductDetailPage'));
const CartPage             = lazy(() => import('./pages/CartPage'));
const CheckoutPage         = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));
const LoginPage            = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage         = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage   = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage    = lazy(() => import('./pages/auth/ResetPasswordPage'));
const DashboardPage        = lazy(() => import('./pages/user/DashboardPage'));
const OrdersPage           = lazy(() => import('./pages/user/OrdersPage'));
const OrderDetailPage      = lazy(() => import('./pages/user/OrderDetailPage'));
const WishlistPage         = lazy(() => import('./pages/user/WishlistPage'));
const ProfilePage          = lazy(() => import('./pages/user/ProfilePage'));
const AddressesPage        = lazy(() => import('./pages/user/AddressesPage'));
const NotFoundPage         = lazy(() => import('./pages/NotFoundPage'));
const SearchPage           = lazy(() => import('./pages/SearchPage'));
const StoreLocatorPage     = lazy(() => import('./pages/StoreLocatorPage'));

// ── Admin pages ──────────────────────────────────────────────────────────────
const AdminLoginPage       = lazy(() => import('./admin/pages/auth/LoginPage'));
const AdminLayout          = lazy(() => import('./admin/layouts/AdminLayout'));
const AdminGuard           = lazy(() => import('./admin/routes/AdminGuard'));
const AdminDashboard       = lazy(() => import('./admin/pages/dashboard/DashboardPage'));
const AdminProducts        = lazy(() => import('./admin/pages/products/ProductsPage'));
const AdminProductForm     = lazy(() => import('./admin/pages/products/ProductFormPage'));
const AdminOrders          = lazy(() => import('./admin/pages/orders/OrdersPage'));
const AdminOrderDetail     = lazy(() => import('./admin/pages/orders/OrderDetailPage'));
const AdminCustomers       = lazy(() => import('./admin/pages/customers/CustomersPage'));
const AdminCategories      = lazy(() => import('./admin/pages/categories/CategoriesPage'));
const AdminBrands          = lazy(() => import('./admin/pages/brands/BrandsPage'));
const AdminCoupons         = lazy(() => import('./admin/pages/coupons/CouponsPage'));
const AdminBanners         = lazy(() => import('./admin/pages/banners/BannersPage'));
const AdminReviews         = lazy(() => import('./admin/pages/reviews/ReviewsPage'));
const AdminInventory       = lazy(() => import('./admin/pages/inventory/InventoryPage'));
const AdminAnalytics       = lazy(() => import('./admin/pages/analytics/AnalyticsPage'));
const AdminReports         = lazy(() => import('./admin/pages/reports/ReportsPage'));
const AdminAuditLogs       = lazy(() => import('./admin/pages/audit/AuditLogsPage'));
const AdminSettings        = lazy(() => import('./admin/pages/settings/SettingsPage'));

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ── Customer Website ─────────────────────────────────────────── */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/category/:slug" element={<ProductListingPage />} />
            <Route path="/brand/:slug" element={<ProductListingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<DashboardPage />} />
              <Route path="/account/orders" element={<OrdersPage />} />
              <Route path="/account/orders/:id" element={<OrderDetailPage />} />
              <Route path="/account/wishlist" element={<WishlistPage />} />
              <Route path="/account/profile" element={<ProfilePage />} />
              <Route path="/account/addresses" element={<AddressesPage />} />
            </Route>
          </Route>

          {/* ── Customer Auth ─────────────────────────────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* ── Admin Panel ───────────────────────────────────────────────── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard"        element={<AdminDashboard />} />
              <Route path="/admin/analytics"        element={<AdminAnalytics />} />
              <Route path="/admin/products"         element={<AdminProducts />} />
              <Route path="/admin/products/new"     element={<AdminProductForm />} />
              <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
              <Route path="/admin/orders"           element={<AdminOrders />} />
              <Route path="/admin/orders/:id"       element={<AdminOrderDetail />} />
              <Route path="/admin/customers"        element={<AdminCustomers />} />
              <Route path="/admin/categories"       element={<AdminCategories />} />
              <Route path="/admin/brands"           element={<AdminBrands />} />
              <Route path="/admin/coupons"          element={<AdminCoupons />} />
              <Route path="/admin/banners"          element={<AdminBanners />} />
              <Route path="/admin/reviews"          element={<AdminReviews />} />
              <Route path="/admin/inventory"        element={<AdminInventory />} />
              <Route path="/admin/reports"          element={<AdminReports />} />
              <Route path="/admin/audit-logs"       element={<AdminAuditLogs />} />
              <Route path="/admin/settings"         element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
