-- ============================================================
-- REMOVE DUMMY/OLD SEED PRODUCTS
-- These were auto-generated demo products, NOT your real stock
-- SKUs: LN-2001 to LN-2020, p-001 to p-020
-- Run this in phpMyAdmin BEFORE running products-seed.sql
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- Remove old LN- SKU products (fake demo products from initial setup)
DELETE FROM `product_images`
  WHERE productId IN (SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t);

DELETE FROM `inventory`
  WHERE variantId IN (SELECT id FROM (SELECT id FROM `product_variants` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t);

DELETE FROM `product_variants`
  WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';

DELETE FROM `product_categories`
  WHERE productId IN (SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t);

DELETE FROM `reviews`
  WHERE productId IN (SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t);

DELETE FROM `wishlists`
  WHERE productId IN (SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t);

DELETE FROM `products`
  WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';

SET FOREIGN_KEY_CHECKS = 1;

-- Verify removal
SELECT COUNT(*) as remaining_dummy FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';
SELECT COUNT(*) as your_real_products FROM `products` WHERE sku LIKE 'MB-%';
