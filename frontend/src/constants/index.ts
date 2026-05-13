export const APP_NAME = 'LittleNest';
export const APP_TAGLINE = 'Premium Baby & Kids Products';
export const APP_URL = 'https://littlenest.in';

export const AGE_GROUPS = [
  '0-3 months',
  '3-6 months',
  '6-12 months',
  '1-3 years',
  '3-7 years',
  '7-12 years',
  '12+ years',
] as const;

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Name A-Z', value: 'name' },
] as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURN_REQUESTED: 'Return Requested',
  RETURNED: 'Returned',
  REFUNDED: 'Refunded',
};

export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_CHARGE = 49;
export const TAX_RATE = 0.18;
export const RETURN_WINDOW_DAYS = 7;
