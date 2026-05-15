-- ============================================================
-- REMOVE DUMMY/OLD SEED PRODUCTS
-- Run this in phpMyAdmin BEFORE running products-seed.sql
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Cart items referencing dummy variants
DELETE FROM `cart_items`
  WHERE variantId IN (
    SELECT id FROM (SELECT id FROM `product_variants` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 2. Order items referencing dummy products
DELETE FROM `order_items`
  WHERE productId IN (
    SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 3. Product images
DELETE FROM `product_images`
  WHERE productId IN (
    SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 4. Inventory
DELETE FROM `inventory`
  WHERE variantId IN (
    SELECT id FROM (SELECT id FROM `product_variants` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 5. Variants
DELETE FROM `product_variants`
  WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';

-- 6. Product categories
DELETE FROM `product_categories`
  WHERE productId IN (
    SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 7. Reviews
DELETE FROM `reviews`
  WHERE productId IN (
    SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 8. Wishlists
DELETE FROM `wishlists`
  WHERE productId IN (
    SELECT id FROM (SELECT id FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%') t
  );

-- 9. Finally delete the products
DELETE FROM `products`
  WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';

SET FOREIGN_KEY_CHECKS = 1;

-- Verify
SELECT COUNT(*) AS remaining_dummy     FROM `products` WHERE sku LIKE 'LN-%' OR sku LIKE 'p-%';
SELECT COUNT(*) AS your_real_products  FROM `products` WHERE sku LIKE 'MB-%';
