-- Mark top products as featured and bestsellers
-- Run in phpMyAdmin after products-seed.sql

-- Mark first 20 products with images as FEATURED
UPDATE `products` SET `isFeatured` = 1
WHERE `id` IN (
  SELECT productId FROM (
    SELECT DISTINCT pi.productId FROM `product_images` pi
    JOIN `products` p ON p.id = pi.productId
    WHERE p.status = 'ACTIVE' AND p.deletedAt IS NULL
    ORDER BY p.createdAt DESC
    LIMIT 20
  ) t
);

-- Mark next 20 products as BESTSELLER
UPDATE `products` SET `isBestseller` = 1
WHERE `id` IN (
  SELECT productId FROM (
    SELECT DISTINCT pi.productId FROM `product_images` pi
    JOIN `products` p ON p.id = pi.productId
    WHERE p.status = 'ACTIVE' AND p.deletedAt IS NULL AND p.isFeatured = 0
    ORDER BY RAND()
    LIMIT 20
  ) t
);

-- Mark 15 products as NEW
UPDATE `products` SET `isNew` = 1
WHERE `id` IN (
  SELECT productId FROM (
    SELECT DISTINCT pi.productId FROM `product_images` pi
    JOIN `products` p ON p.id = pi.productId
    WHERE p.status = 'ACTIVE' AND p.deletedAt IS NULL AND p.isFeatured = 0 AND p.isBestseller = 0
    ORDER BY p.createdAt DESC
    LIMIT 15
  ) t
);

-- Verify
SELECT
  SUM(isFeatured) as featured,
  SUM(isBestseller) as bestsellers,
  SUM(isNew) as new_arrivals,
  COUNT(*) as total
FROM products WHERE status = 'ACTIVE';
