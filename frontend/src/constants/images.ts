/**
 * Central image registry — all images served from /public/images/
 * Drop your actual image files into the corresponding folders under public/images/
 * and they will be served directly from the frontend without any external dependency.
 */

const BASE = '/images';

// ── Hero slider images ─────────────────────────────────────────────────────
export const HERO_IMAGES = {
  baby:     `${BASE}/hero/hero-baby.jpg`,
  toys:     `${BASE}/hero/hero-toys.jpg`,
  skincare: `${BASE}/hero/hero-skincare.jpg`,
};

// ── Category images ────────────────────────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string> = {
  'baby-clothing':     `${BASE}/categories/baby-clothing.jpg`,
  'kids-fashion':      `${BASE}/categories/kids-fashion.jpg`,
  'toys-games':        `${BASE}/categories/toys-games.jpg`,
  'feeding-essentials':`${BASE}/categories/feeding-essentials.jpg`,
  'baby-gear':         `${BASE}/categories/baby-gear.jpg`,
  'bath-skin-care':    `${BASE}/categories/bath-skin-care.jpg`,
  'diapers-wipes':     `${BASE}/categories/diapers-wipes.jpg`,
  'school-essentials': `${BASE}/categories/school-essentials.jpg`,
  'nursery':           `${BASE}/categories/nursery.jpg`,
  'footwear':          `${BASE}/categories/footwear.jpg`,
  'health-safety':     `${BASE}/categories/health-safety.jpg`,
  'maternity':         `${BASE}/categories/maternity.jpg`,
  'books':             `${BASE}/categories/books.jpg`,
};

// ── Product placeholder images (by category) ──────────────────────────────
export const PRODUCT_IMAGES: Record<string, string> = {
  'baby-clothing':      `${BASE}/products/product-baby-clothing.jpg`,
  'toys-games':         `${BASE}/products/product-toys.jpg`,
  'feeding-essentials': `${BASE}/products/product-feeding.jpg`,
  'bath-skin-care':     `${BASE}/products/product-skincare.jpg`,
  'baby-gear':          `${BASE}/products/product-gear.jpg`,
  'diapers-wipes':      `${BASE}/products/product-diapers.jpg`,
  'school-essentials':  `${BASE}/products/product-school.jpg`,
  'nursery':            `${BASE}/products/product-nursery.jpg`,
  'footwear':           `${BASE}/products/product-footwear.jpg`,
  'health-safety':      `${BASE}/products/product-health.jpg`,
  'maternity':          `${BASE}/products/product-maternity.jpg`,
  'books':              `${BASE}/products/product-books.jpg`,
  'default':            `${BASE}/products/product-default.jpg`,
};

// ── Promo banner images ────────────────────────────────────────────────────
export const BANNER_IMAGES = {
  nursery:   `${BASE}/banners/banner-nursery.jpg`,
  maternity: `${BASE}/banners/banner-maternity.jpg`,
  hero1:     `${BASE}/banners/banner-hero-1.jpg`,
  hero2:     `${BASE}/banners/banner-hero-2.jpg`,
  hero3:     `${BASE}/banners/banner-hero-3.jpg`,
};

// ── Flash sale product images ──────────────────────────────────────────────
export const SALE_IMAGES = {
  carrier:   `${BASE}/products/product-gear.jpg`,
  sorter:    `${BASE}/products/product-toys.jpg`,
  bathtub:   `${BASE}/products/product-skincare.jpg`,
  backpack:  `${BASE}/products/product-school.jpg`,
};

// ── Store images ───────────────────────────────────────────────────────────
export const STORE_IMAGE = `${BASE}/store/store-front.jpg`;

// ── Fallback: use emoji SVG placeholder when image missing ─────────────────
export const FALLBACK_IMAGE = `${BASE}/placeholder.svg`;

/**
 * Returns a category image, falling back to default product image
 */
export function getCategoryImage(slug: string): string {
  return CATEGORY_IMAGES[slug] || PRODUCT_IMAGES['default'];
}

/**
 * Returns a product image URL — if the DB URL is an external Unsplash link,
 * maps it to the appropriate local category image instead.
 */
export function resolveProductImage(
  dbUrl: string | undefined,
  categorySlug?: string
): string {
  if (!dbUrl) return categorySlug ? getCategoryImage(categorySlug) : PRODUCT_IMAGES['default'];
  // If it's already a local path, use as-is
  if (dbUrl.startsWith('/') || dbUrl.startsWith('./')) return dbUrl;
  // If it's an external URL (Unsplash etc.), use local category image
  if (dbUrl.includes('unsplash.com') || dbUrl.includes('http')) {
    return categorySlug ? getCategoryImage(categorySlug) : PRODUCT_IMAGES['default'];
  }
  return dbUrl;
}
