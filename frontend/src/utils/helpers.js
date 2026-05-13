// Base URL for images
const API_URL = typeof window !== 'undefined' && window.location.hostname.includes('mybabystore.net')
  ? 'https://api.mybabystore.net'
  : 'http://localhost:4000';

// Convert a DB image URL to a full URL
export const imgUrl = (url) => {
  if (!url) return '/images/placeholder.svg';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${API_URL}${url}`;
  return `${API_URL}/${url}`;
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
