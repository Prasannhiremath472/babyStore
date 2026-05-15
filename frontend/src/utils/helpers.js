// Convert a DB image URL to a displayable URL
// DB stores either:
//   /images/products/filename.jpg  → served by frontend (mybabystore.net)
//   https://...unsplash.com/...    → external URL (legacy/seed data)
export const imgUrl = (url) => {
  if (!url) return '/images/placeholder.svg';
  // Already a full external URL — use as-is
  if (url.startsWith('http')) return url;
  // Relative path starting with /images/ — served by frontend directly
  if (url.startsWith('/images/')) return url;
  // Relative path without leading slash
  if (url.startsWith('images/')) return `/${url}`;
  // Fallback
  return '/images/placeholder.svg';
};

// Format price to Indian format
export const formatPrice = (amount) => {
  if (!amount) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

// Calculate discount percentage
export const discountPercent = (price, comparePrice) => {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

// Truncate text
export const truncate = (str, len = 60) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
};

// Slugify
export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Order status colors
export const statusColor = (status) => {
  const map = {
    PENDING:          'bg-yellow-100 text-yellow-700',
    CONFIRMED:        'bg-blue-100 text-blue-700',
    PROCESSING:       'bg-indigo-100 text-indigo-700',
    SHIPPED:          'bg-purple-100 text-purple-700',
    OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
    DELIVERED:        'bg-green-100 text-green-700',
    CANCELLED:        'bg-red-100 text-red-700',
    REFUNDED:         'bg-gray-100 text-gray-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
};
