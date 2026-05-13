export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  status: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  tags: string[];
  ageGroup?: string;
  gender?: string;
  material?: string;
  warrantyMonths: number;
  brand?: Brand;
  categories: Array<{ category: Category; isPrimary: boolean }>;
  variants: ProductVariant[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  averageRating?: number;
  reviewCount?: number;
  minPrice?: number;
  maxPrice?: number;
  totalStock?: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  attributes: Record<string, string>;
  isDefault: boolean;
  isActive: boolean;
  inventory?: Inventory;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

export interface Inventory {
  quantity: number;
  reservedQuantity: number;
  lowStockAlert: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode?: string;
  items: OrderItem[];
  address?: Address;
  payments: Payment[];
  timeline: OrderTimeline[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  variantName?: string;
  sku: string;
  image?: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  method: string;
  status: string;
  amount: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

export interface OrderTimeline {
  id: string;
  status: string;
  message: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  comparePrice?: number;
  stock: number;
  isInStock: boolean;
  product: {
    name: string;
    images: ProductImage[];
    slug: string;
  };
  variant: {
    name: string;
    sku: string;
  };
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  body?: string;
  images: string[];
  status: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  user: { firstName: string; lastName: string; avatar?: string };
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: string;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
