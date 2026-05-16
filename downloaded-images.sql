-- UPDATE product images for downloaded products
-- Run in phpMyAdmin after running this script

INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0001.jpeg', '1030 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '1030 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0002.jpeg', '1037 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '1037 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0003.jpeg', '164 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '164 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0004.jpeg', '178 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '178 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0005.jpeg', '180 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '180 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0006.jpeg', '187 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '187 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0007.jpeg', '1STP CRADEL 4120 PINK (3799/-) 1PCS', 1, 0, NOW() FROM `products` WHERE name = '1STP CRADEL 4120 PINK (3799/-) 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0008.jpeg', '209 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '209 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0009.jpeg', '219 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '219 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0010.jpeg', '6125 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '6125 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0011.jpeg', '6145 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = '6145 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0012.jpeg', 'A25 AUTOFLOW TOY RATTLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'A25 AUTOFLOW TOY RATTLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0013.jpeg', 'AB 1802 BABY POTTY', 1, 0, NOW() FROM `products` WHERE name = 'AB 1802 BABY POTTY' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0014.jpeg', 'AB906 SMALL F/S T-SHIRT 1N', 1, 0, NOW() FROM `products` WHERE name = 'AB906 SMALL F/S T-SHIRT 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0015.jpeg', 'AB923 XS SHOTS 1N', 1, 0, NOW() FROM `products` WHERE name = 'AB923 XS SHOTS 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0016.jpeg', 'ABC BALL TOY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'ABC BALL TOY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0017.jpeg', 'ANIMAL TOY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'ANIMAL TOY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0018.jpeg', 'APTAMIL 1 REFIL 400GM 400GM', 1, 0, NOW() FROM `products` WHERE name = 'APTAMIL 1 REFIL 400GM 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0019.jpeg', 'APTAMIL 2 REFILL 400G', 1, 0, NOW() FROM `products` WHERE name = 'APTAMIL 2 REFILL 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0020.jpeg', 'APTAMIL 3 REFIL 400GM 400GM', 1, 0, NOW() FROM `products` WHERE name = 'APTAMIL 3 REFIL 400GM 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0021.jpeg', 'APTAMIL PREMIUM 1 400GM', 1, 0, NOW() FROM `products` WHERE name = 'APTAMIL PREMIUM 1 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0022.jpeg', 'AUTO FLOW DM28 TOUNG CLEANER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTO FLOW DM28 TOUNG CLEANER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0023.jpeg', 'AUTO FLOW T8 BOTTLE COVER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'AUTO FLOW T8 BOTTLE COVER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0024.jpeg', 'AUTOFLOW A/1 FEEDERS BOTTLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/1 FEEDERS BOTTLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0025.jpeg', 'AUTOFLOW A/18 ROYAL FDG BOTTLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/18 ROYAL FDG BOTTLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0026.jpeg', 'AUTOFLOW A/2 FEEDERS BOTTOLE 125ML', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/2 FEEDERS BOTTOLE 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0027.jpeg', 'AUTOFLOW A/21 SMART FDG BOTTLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/21 SMART FDG BOTTLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0028.jpeg', 'AUTOFLOW A/22 SMART MINI BOTTL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/22 SMART MINI BOTTL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0029.jpeg', 'AUTOFLOW A/31 SPACE FDG BOTTOL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/31 SPACE FDG BOTTOL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0030.jpeg', 'AUTOFLOW A/7 ROYAL FDG BOTTOLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A/7 ROYAL FDG BOTTOLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0031.jpeg', 'AUTOFLOW A15 DADDY BOTTLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A15 DADDY BOTTLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0032.jpeg', 'AUTOFLOW A16 DADDY BOTTLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A16 DADDY BOTTLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0033.jpeg', 'AUTOFLOW A19 PRIDE BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW A19 PRIDE BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0034.jpeg', 'AUTOFLOW D/7 FEEDING BPTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW D/7 FEEDING BPTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0035.jpeg', 'AUTOFLOW DM21 FRUIT NIBBLER 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW DM21 FRUIT NIBBLER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0036.jpeg', 'AUTOFLOW DM22 SILICON TEETHER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW DM22 SILICON TEETHER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0037.jpeg', 'AUTOFLOW DM24 NASAL ASPIRATOR 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW DM24 NASAL ASPIRATOR 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0038.jpeg', 'AUTOFLOW DM31 MEDICINE DROPPE 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW DM31 MEDICINE DROPPE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0039.png', 'AUTOFLOW E11 ELEGANT FEED.CUP 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW E11 ELEGANT FEED.CUP 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0040.jpeg', 'AUTOFLOW E8 TICTOC FEEDING MUG 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW E8 TICTOC FEEDING MUG 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0041.jpeg', 'AUTOFLOW E9 2IN1 FRNDSHIP CUP 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW E9 2IN1 FRNDSHIP CUP 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0042.jpeg', 'AUTOFLOW G2 SILICON NIPPLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW G2 SILICON NIPPLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0043.jpeg', 'AUTOFLOW J21 ICE BAG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J21 ICE BAG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0044.jpeg', 'AUTOFLOW J27 HAIR DYE BRUSH 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J27 HAIR DYE BRUSH 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0045.jpeg', 'AUTOFLOW J28 MUSICAL POWDERPUF 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J28 MUSICAL POWDERPUF 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0046.jpeg', 'AUTOFLOW J2A 2IN1 BREAST PUMP 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J2A 2IN1 BREAST PUMP 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0047.jpeg', 'AUTOFLOW J2C SILICON BRESTPUMP 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J2C SILICON BRESTPUMP 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0048.jpeg', 'AUTOFLOW J3 DELUX POWDER PUFF 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J3 DELUX POWDER PUFF 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0049.jpeg', 'AUTOFLOW J34 POWDER PUFF 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J34 POWDER PUFF 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0050.jpeg', 'AUTOFLOW J35 POWDER PUFF 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW J35 POWDER PUFF 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0051.jpeg', 'AUTOFLOW N3 DELUX SOOTHER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW N3 DELUX SOOTHER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0052.jpeg', 'AUTOFLOW T2 WATER TEETHER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T2 WATER TEETHER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0053.jpeg', 'AUTOFLOW T3 T.NECKLACE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T3 T.NECKLACE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0054.jpeg', 'AUTOFLOW T36 BABY COMB 15/- 1', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T36 BABY COMB 15/- 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0055.jpeg', 'AUTOFLOW T4 BREAST SHIELD 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T4 BREAST SHIELD 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0056.jpeg', 'AUTOFLOW T7B SILICON TEETHER 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T7B SILICON TEETHER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0057.jpeg', 'AUTOFLOW T7C SILICON TEETHER 1N', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOW T7C SILICON TEETHER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0058.jpeg', 'AUTOFLOWDM29 BOTT&NIPPLE BRUSH 1', 1, 0, NOW() FROM `products` WHERE name = 'AUTOFLOWDM29 BOTT&NIPPLE BRUSH 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0059.jpeg', 'AVT ANRI COLIC FEEDER 1M+ 2PC 1*2PCS', 1, 0, NOW() FROM `products` WHERE name = 'AVT ANRI COLIC FEEDER 1M+ 2PC 1*2PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0060.jpeg', 'AVT ANTI-COLIC 1M+ NIPPLE', 1, 0, NOW() FROM `products` WHERE name = 'AVT ANTI-COLIC 1M+ NIPPLE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0061.png', 'AVT ANTI-COLIC 3M+ NIPPLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT ANTI-COLIC 3M+ NIPPLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0062.png', 'AVT ANTI-COLIC 6M+ NIPPLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT ANTI-COLIC 6M+ NIPPLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0063.jpeg', 'AVT ANTI-COLIC OM+ FEEDER 280/ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT ANTI-COLIC OM+ FEEDER 280/ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0064.jpeg', 'AVT FEEDER 1M+ 2PC 895/- 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT FEEDER 1M+ 2PC 895/- 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0065.jpeg', 'AVT FEEDER 1M+ BOTTLE BLUE 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT FEEDER 1M+ BOTTLE BLUE 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0066.jpeg', 'AVT FEEDER 1M+ BOTTLE PINK 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT FEEDER 1M+ BOTTLE PINK 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0067.jpeg', 'AVT FEEDER 260ML 495/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT FEEDER 260ML 495/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0068.jpeg', 'AVT GROW FEDDING BOTTLE 1M+ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT GROW FEDDING BOTTLE 1M+ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0069.jpeg', 'AVT GROW FEDDING BOTTLE 6M+ 330ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT GROW FEDDING BOTTLE 6M+ 330ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0070.jpeg', 'AVT GROW TEAT 0M+ 2N', 1, 0, NOW() FROM `products` WHERE name = 'AVT GROW TEAT 0M+ 2N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0071.png', 'AVT GROW TEAT 1M+ 2N', 1, 0, NOW() FROM `products` WHERE name = 'AVT GROW TEAT 1M+ 2N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0072.png', 'AVT GROW TEAT 6M+ 2N', 1, 0, NOW() FROM `products` WHERE name = 'AVT GROW TEAT 6M+ 2N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0073.jpeg', 'AVT NAT FEEDER PANDA 1M+ 260ML 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT NAT FEEDER PANDA 1M+ 260ML 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0074.jpeg', 'AVT NATURAL BABY BOTTLE 1M+ 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL BABY BOTTLE 1M+ 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0075.jpeg', 'AVT NATURAL BABY BOTTLE 3M+ 330ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL BABY BOTTLE 3M+ 330ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0076.jpeg', 'AVT NATURAL BABY BOTTLE OM+ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL BABY BOTTLE OM+ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0077.jpeg', 'AVT NATURAL TEAT 3M+', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL TEAT 3M+' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0078.jpeg', 'AVT NATURAL TEAT 3M+ 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL TEAT 3M+ 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0079.jpeg', 'AVT NATURAL TEAT 6M+', 1, 0, NOW() FROM `products` WHERE name = 'AVT NATURAL TEAT 6M+' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0080.jpeg', 'AVT NIPPLE 0MT 325/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT NIPPLE 0MT 325/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0081.jpeg', 'AVT NIPPLE 1MT 325/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'AVT NIPPLE 1MT 325/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0082.jpeg', 'AVT SIPPER 260ML 260ML', 1, 0, NOW() FROM `products` WHERE name = 'AVT SIPPER 260ML 260ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0083.jpeg', 'AVT SIPPER 340ML 1', 1, 0, NOW() FROM `products` WHERE name = 'AVT SIPPER 340ML 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0084.jpeg', 'AVT SOOTHER 6-18M 2PCS 405/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'AVT SOOTHER 6-18M 2PCS 405/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0085.jpeg', 'AVT SOOTHER 6-18M 2PCS 5969', 1, 0, NOW() FROM `products` WHERE name = 'AVT SOOTHER 6-18M 2PCS 5969' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0086.jpeg', 'AVT STERILISER 3-1 4495/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'AVT STERILISER 3-1 4495/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0087.jpeg', 'BABY 2RATTLE WITH DAFALI', 1, 0, NOW() FROM `products` WHERE name = 'BABY 2RATTLE WITH DAFALI' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0088.jpeg', 'BABY ALMARI 5STEP 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY ALMARI 5STEP 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0089.jpeg', 'BABY BAG 725/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BAG 725/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0090.jpeg', 'BABY BASKET 535/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BASKET 535/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0091.jpeg', 'BABY BATH BALL 1 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY BATH BALL 1 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0092.jpeg', 'BABY BATH TUB 845/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BATH TUB 845/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0093.jpeg', 'BABY BED MAT', 1, 0, NOW() FROM `products` WHERE name = 'BABY BED MAT' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0094.jpeg', 'BABY BIRTH FRAME BIG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BIRTH FRAME BIG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0095.jpeg', 'BABY BLANKET 1008/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BLANKET 1008/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0096.jpeg', 'BABY BLANKET 1050/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BLANKET 1050/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0097.jpeg', 'BABY BLANKET 1155/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BLANKET 1155/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0098.jpeg', 'BABY BLANKET 935/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BLANKET 935/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0099.jpeg', 'BABY BOOTIES', 1, 0, NOW() FROM `products` WHERE name = 'BABY BOOTIES' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0100.jpeg', 'BABY BOTTLE DRYING RACK 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BOTTLE DRYING RACK 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0101.jpeg', 'BABY BOWL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BOWL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0102.jpeg', 'BABY BRUSH 170/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY BRUSH 170/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0103.jpeg', 'BABY CAP', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0104.jpeg', 'BABY CAP 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0105.jpeg', 'BABY CAP DORI 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP DORI 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0106.jpeg', 'BABY CAP HOJIARY LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP HOJIARY LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0107.jpeg', 'BABY CAP HOJIARY MEDIUM 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP HOJIARY MEDIUM 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0108.jpeg', 'BABY CAP HOJIARY SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP HOJIARY SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0109.jpeg', 'BABY CAP M 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP M 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0110.jpeg', 'BABY CAP MITTEN BOTTIES SET 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP MITTEN BOTTIES SET 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0111.jpeg', 'BABY CAP MONKEY 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP MONKEY 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0112.jpeg', 'BABY CAP PRIMIUM HOJIARY L 1POCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP PRIMIUM HOJIARY L 1POCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0113.jpeg', 'BABY CAP PRIMIUM HOJIARY M 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP PRIMIUM HOJIARY M 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0114.jpeg', 'BABY CAP SET LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP SET LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0115.jpeg', 'BABY CAP SET PREMIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CAP SET PREMIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0116.jpeg', 'BABY CARIER 450/ 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY CARIER 450/ 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0117.jpeg', 'BABY CHANGING MAT 870/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY CHANGING MAT 870/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0118.jpeg', 'BABY CLOTH HANGER ROUND BIG', 1, 0, NOW() FROM `products` WHERE name = 'BABY CLOTH HANGER ROUND BIG' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0119.jpeg', 'BABY CLOTH HANGER ROUND SMALL', 1, 0, NOW() FROM `products` WHERE name = 'BABY CLOTH HANGER ROUND SMALL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0120.jpeg', 'BABY CLOTH HANGER SQUARE', 1, 0, NOW() FROM `products` WHERE name = 'BABY CLOTH HANGER SQUARE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0121.jpeg', 'BABY COTTON SHIRT 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY COTTON SHIRT 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0122.jpeg', 'BABY CUBIC RATTEL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY CUBIC RATTEL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0123.jpeg', 'BABY DIAPER PANTS 0-24 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY DIAPER PANTS 0-24 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0124.jpeg', 'BABY DIAPER PANTS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY DIAPER PANTS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0125.jpeg', 'BABY DIAPER WASHEBLE SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY DIAPER WASHEBLE SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0126.jpeg', 'BABY DRY SHEET LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY DRY SHEET LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0127.jpeg', 'BABY DRY SHEET M 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY DRY SHEET M 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0128.jpeg', 'BABY DRY SHEET S 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY DRY SHEET S 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0129.jpeg', 'BABY EAR PICK 175/- 1PCS1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY EAR PICK 175/- 1PCS1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0130.jpeg', 'BABY FANCY PILLOW 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FANCY PILLOW 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0131.jpeg', 'BABY FANCY SOCKS 0-1 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FANCY SOCKS 0-1 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0132.jpeg', 'BABY FANCY SOCKS 1-2 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FANCY SOCKS 1-2 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0133.jpeg', 'BABY FANCY SOCKS 65/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FANCY SOCKS 65/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0134.jpeg', 'BABY FOLDING NET 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FOLDING NET 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0135.jpeg', 'BABY FROCK COTTON WITH KNOT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FROCK COTTON WITH KNOT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0136.jpeg', 'BABY FROCK HOSIERY WITH PANT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FROCK HOSIERY WITH PANT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0137.jpeg', 'BABY FROCK KNOT WITH PANT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FROCK KNOT WITH PANT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0138.jpeg', 'BABY FROCK PLANE WITH PANT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FROCK PLANE WITH PANT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0139.jpeg', 'BABY FROCK PRINTED WITH PANT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY FROCK PRINTED WITH PANT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0140.jpeg', 'BABY GIFT SET 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY GIFT SET 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0141.jpeg', 'BABY GIFT SET 5PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY GIFT SET 5PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0142.jpeg', 'BABY GIFT SET HUB 215/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY GIFT SET HUB 215/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0143.jpeg', 'BABY HAIR BELT 55/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAIR BELT 55/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0144.jpeg', 'BABY HAIR BRUSH SET 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAIR BRUSH SET 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0145.jpeg', 'BABY HAIR BRUSH SET HD-8201 1PSC', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAIR BRUSH SET HD-8201 1PSC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0146.jpeg', 'BABY HAIR BRUSH SET HD-8202 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAIR BRUSH SET HD-8202 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0147.jpeg', 'BABY HAIR BRUSH SET SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAIR BRUSH SET SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0148.jpeg', 'BABY HALF PANTS 0-6 MONTH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HALF PANTS 0-6 MONTH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0149.jpeg', 'BABY HALF PANTS 6-12 MONTH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HALF PANTS 6-12 MONTH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0150.jpeg', 'BABY HAND GLOVES 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY HAND GLOVES 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0151.jpeg', 'BABY KANGAROO BAG 599/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY KANGAROO BAG 599/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0152.jpeg', 'BABY KNEE PAD 105/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY KNEE PAD 105/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0153.jpeg', 'BABY KNEE PAD 225/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY KNEE PAD 225/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0154.jpeg', 'BABY LAUNDRY BAG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY LAUNDRY BAG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0155.jpeg', 'BABY LOD BIG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY LOD BIG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0156.jpeg', 'BABY LOD SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY LOD SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0157.jpeg', 'BABY MAMA BAG /SACK 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAMA BAG /SACK 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0158.jpeg', 'BABY MAMA BAG 1125/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAMA BAG 1125/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0159.jpeg', 'BABY MAMA BAG 625/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAMA BAG 625/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0160.jpeg', 'BABY MAT COTTON WITH PLSTIC LA 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAT COTTON WITH PLSTIC LA 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0161.jpeg', 'BABY MAT LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAT LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0162.jpeg', 'BABY MAT SMALL 1pcs', 1, 0, NOW() FROM `products` WHERE name = 'BABY MAT SMALL 1pcs' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0163.jpeg', 'BABY MONKEY CAP 120/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY MONKEY CAP 120/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0164.jpeg', 'BABY MONKEY CAP BIG', 1, 0, NOW() FROM `products` WHERE name = 'BABY MONKEY CAP BIG' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0165.jpeg', 'BABY MUSIC RATTEL 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY MUSIC RATTEL 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0166.jpeg', 'BABY MUSIC RIDER', 1, 0, NOW() FROM `products` WHERE name = 'BABY MUSIC RIDER' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0167.jpeg', 'BABY NAIL CUTTER JR-6023 75/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY NAIL CUTTER JR-6023 75/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0168.jpeg', 'BABY NAPKINES PRINTED 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY NAPKINES PRINTED 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0169.jpeg', 'BABY NET LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY NET LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0170.jpeg', 'BABY NET PRINTED LARGE', 1, 0, NOW() FROM `products` WHERE name = 'BABY NET PRINTED LARGE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0171.jpeg', 'BABY NET PRINTED MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY NET PRINTED MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0172.jpeg', 'BABY NOSE CLEANER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY NOSE CLEANER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0173.jpeg', 'BABY OIL MASSAGE MAT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY OIL MASSAGE MAT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0174.jpeg', 'BABY PANTS 0-3 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY PANTS 0-3 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0175.jpeg', 'BABY PANTS 3-6 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY PANTS 3-6 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0176.jpeg', 'BABY PANTS 6-9 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY PANTS 6-9 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0177.jpeg', 'BABY PANTS REG 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY PANTS REG 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0178.jpeg', 'BABY PILLOW ANGLE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY PILLOW ANGLE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0179.jpeg', 'BABY PILLOW RAI 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY PILLOW RAI 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0180.jpeg', 'BABY PIN 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY PIN 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0181.jpeg', 'BABY POTTY 1465/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY POTTY 1465/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0182.jpeg', 'BABY POTTY 6810 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY POTTY 6810 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0183.jpeg', 'BABY RAINBOW BALL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY RAINBOW BALL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0184.jpeg', 'BABY RAPPER 0-3 820/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RAPPER 0-3 820/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0185.jpeg', 'BABY RAPPER VELVET 1422/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RAPPER VELVET 1422/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0186.jpeg', 'BABY RATTLE 185/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE 185/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0187.jpeg', 'BABY RATTLE DING DONG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE DING DONG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0188.jpeg', 'BABY RATTLE SET 3PCS MINISOUL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE SET 3PCS MINISOUL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0189.jpeg', 'BABY RATTLE SET 4PCS TOYLINE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE SET 4PCS TOYLINE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0190.jpeg', 'BABY RATTLE SET 5PCS MINISOUL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE SET 5PCS MINISOUL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0191.jpeg', 'BABY RATTLE SET 5PCS TOYLINE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE SET 5PCS TOYLINE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0192.jpeg', 'BABY RATTLE TOY SET 5PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE TOY SET 5PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0193.jpeg', 'BABY RATTLE WITH DAFALI 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE WITH DAFALI 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0194.jpeg', 'BABY RATTLE WOODEN 195/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE WOODEN 195/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0195.jpeg', 'BABY RATTLE WOODEN 95/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE WOODEN 95/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0196.jpeg', 'BABY RATTLE WOODEN DAMRU 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY RATTLE WOODEN DAMRU 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0197.jpeg', 'BABY RECORD BOOK 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY RECORD BOOK 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0198.jpeg', 'BABY RECORD BOOK 425/ 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY RECORD BOOK 425/ 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0199.jpeg', 'BABY RECORDE BOOK 425 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY RECORDE BOOK 425 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0200.jpeg', 'BABY ROMPER 9-12 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY ROMPER 9-12 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0201.jpeg', 'BABY SAFTY SCISSORS RK-X4031 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SAFTY SCISSORS RK-X4031 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0202.jpeg', 'BABY SHIRT F/S 0-3 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRT F/S 0-3 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0203.jpeg', 'BABY SHIRT F/S 9-12 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRT F/S 9-12 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0204.jpeg', 'BABY SHIRT SLEEVELESS 0-3 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRT SLEEVELESS 0-3 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0205.jpeg', 'BABY SHIRT SLEEVELESS 3-6 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRT SLEEVELESS 3-6 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0206.jpeg', 'BABY SHIRT SLEEVELESS 6-9 1PS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRT SLEEVELESS 6-9 1PS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0207.jpeg', 'BABY SHIRTS 3-6 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRTS 3-6 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0208.jpeg', 'BABY SHIRTS 6-9 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRTS 6-9 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0209.jpeg', 'BABY SHIRTS FULL SLEEV 12-18 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHIRTS FULL SLEEV 12-18 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0210.jpeg', 'BABY SHOES 392/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOES 392/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0211.jpeg', 'BABY SHOES 3NO 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOES 3NO 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0212.jpeg', 'BABY SHOES 478/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOES 478/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0213.jpeg', 'BABY SHOES 530/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOES 530/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0214.jpeg', 'BABY SHOES 8NO 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOES 8NO 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0215.jpeg', 'BABY SHOWER CAP 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SHOWER CAP 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0216.jpeg', 'BABY SILICON TEETHER 80/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SILICON TEETHER 80/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0217.jpeg', 'BABY SOAP CAES HELLO 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOAP CAES HELLO 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0218.jpeg', 'BABY SOAP CASE', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOAP CASE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0219.jpeg', 'BABY SOCKS 0-1 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 0-1 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0220.jpeg', 'BABY SOCKS 0-6 MONTH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 0-6 MONTH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0221.jpeg', 'BABY SOCKS 125 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 125 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0222.jpeg', 'BABY SOCKS 14-16CM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 14-16CM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0223.jpeg', 'BABY SOCKS 6-12MONTH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 6-12MONTH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0224.jpeg', 'BABY SOCKS 60/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS 60/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0225.jpeg', 'BABY SOCKS FANCY BOY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS FANCY BOY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0226.jpeg', 'BABY SOCKS FANCY GIRL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS FANCY GIRL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0227.jpeg', 'BABY SOCKS NB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SOCKS NB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0228.jpeg', 'BABY SPINNING BALL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY SPINNING BALL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0229.jpeg', 'BABY SPOON 2PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SPOON 2PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0230.jpeg', 'BABY SPOON STAINSTEEL RK-3807', 1, 0, NOW() FROM `products` WHERE name = 'BABY SPOON STAINSTEEL RK-3807' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0231.jpeg', 'BABY SUMMER CAP 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SUMMER CAP 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0232.jpeg', 'BABY SWEATER 1 1', 1, 0, NOW() FROM `products` WHERE name = 'BABY SWEATER 1 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0233.jpeg', 'BABY SWEATER 625/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SWEATER 625/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0234.jpeg', 'BABY SWEATER 976/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY SWEATER 976/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0235.jpeg', 'BABY TEETHER DG-706 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY TEETHER DG-706 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0236.jpeg', 'BABY TEETHER HD-3340', 1, 0, NOW() FROM `products` WHERE name = 'BABY TEETHER HD-3340' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0237.jpeg', 'BABY TENT HOUSE', 1, 0, NOW() FROM `products` WHERE name = 'BABY TENT HOUSE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0238.jpeg', 'BABY TENT HOUSE 1425/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY TENT HOUSE 1425/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0239.jpeg', 'BABY TOY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY TOY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0240.jpeg', 'BABY TRAING BRUSH 8M+ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY TRAING BRUSH 8M+ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0241.jpeg', 'BABY WOOLEN CAP', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0242.jpeg', 'BABY WOOLEN CAP 240/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 240/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0243.jpeg', 'BABY WOOLEN CAP 258/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 258/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0244.jpeg', 'BABY WOOLEN CAP 285/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 285/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0245.jpeg', 'BABY WOOLEN CAP 306/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 306/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0246.jpeg', 'BABY WOOLEN CAP 330/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 330/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0247.jpeg', 'BABY WOOLEN CAP 425/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 425/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0248.jpeg', 'BABY WOOLEN CAP 446/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN CAP 446/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0249.jpeg', 'BABY WOOLEN MONKEY CAP', 1, 0, NOW() FROM `products` WHERE name = 'BABY WOOLEN MONKEY CAP' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0250.jpeg', 'BABY WRAPPER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0251.jpeg', 'BABY WRAPPER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0252.jpeg', 'BABY WRAPPER 285/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER 285/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0253.jpeg', 'BABY WRAPPER TOWEL', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER TOWEL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0254.jpeg', 'BABY WRAPPER WITH TOWEL 595/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER WITH TOWEL 595/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0255.jpeg', 'BABY WRAPPER WITH ZIPPER', 1, 0, NOW() FROM `products` WHERE name = 'BABY WRAPPER WITH ZIPPER' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0256.jpeg', 'BABY ZULA 1PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABY ZULA 1PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0257.jpeg', 'BABYHUG WET WIPES 72PCS', 1, 0, NOW() FROM `products` WHERE name = 'BABYHUG WET WIPES 72PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0258.jpeg', 'BALL TOY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BALL TOY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0259.jpeg', 'BATH CHAIR 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATH CHAIR 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0260.jpeg', 'BATH SPONGE 85/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATH SPONGE 85/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0261.jpeg', 'BATH SPONGE 95/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATH SPONGE 95/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0262.jpeg', 'BATH SPONGE DC 206 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATH SPONGE DC 206 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0263.jpeg', 'BATHING SET 749/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATHING SET 749/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0264.jpeg', 'BATHING SET AL25 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATHING SET AL25 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0265.jpeg', 'BATHING SET F017 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BATHING SET F017 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0266.jpeg', 'BOTTEL BRUSH HD-3501', 1, 0, NOW() FROM `products` WHERE name = 'BOTTEL BRUSH HD-3501' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0267.jpeg', 'BOTTIES 50/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTIES 50/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0268.jpeg', 'BOTTLE BRUSH 185/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE BRUSH 185/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0269.jpeg', 'BOTTLE BRUSH BJ-8215 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE BRUSH BJ-8215 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0270.jpeg', 'BOTTLE BRUSH NT-10-274 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE BRUSH NT-10-274 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0271.jpeg', 'BOTTLE COVER BIG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE COVER BIG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0272.jpeg', 'BOTTLE COVER MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE COVER MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0273.jpeg', 'BOTTLE COVER SMALL', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE COVER SMALL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0274.jpeg', 'BOTTLE COVER SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'BOTTLE COVER SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0275.jpeg', 'CAP BOOTIES SET', 1, 0, NOW() FROM `products` WHERE name = 'CAP BOOTIES SET' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0276.jpeg', 'CEREGROW MULTIGRAIN 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CEREGROW MULTIGRAIN 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0277.jpeg', 'CERELAC 1 RAGI APPLE 320', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 1 RAGI APPLE 320' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0278.jpeg', 'CERELAC 1 RICE 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 1 RICE 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0279.jpeg', 'CERELAC 1 WHEAT 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 1 WHEAT 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0280.jpeg', 'CERELAC 1 WHEAT APPLE 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 1 WHEAT APPLE 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0281.jpeg', 'CERELAC 1 WHEAT APPLE CAR 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 1 WHEAT APPLE CAR 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0282.jpeg', 'CERELAC 2 KHICHDI VEG 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 2 KHICHDI VEG 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0283.jpeg', 'CERELAC 2 RICE VEG 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 2 RICE VEG 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0284.jpeg', 'CERELAC 2 WHEAT APPL CHER 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 2 WHEAT APPL CHER 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0285.jpeg', 'CERELAC 2 WHEAT ORANGE 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 2 WHEAT ORANGE 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0286.jpeg', 'CERELAC 3 WHEAT HONY DATS 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 3 WHEAT HONY DATS 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0287.jpeg', 'CERELAC 3 WHEAT RICE FRUT 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 3 WHEAT RICE FRUT 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0288.jpeg', 'CERELAC 3 WHEAT RICE VEG 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 3 WHEAT RICE VEG 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0289.jpeg', 'CERELAC 4 MUTIGRN DAL VEG 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 4 MUTIGRN DAL VEG 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0290.jpeg', 'CERELAC 4 MUTIGRN FRUITS 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 4 MUTIGRN FRUITS 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0291.jpeg', 'CERELAC 5 GRAINS&FRUITS 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 5 GRAINS&FRUITS 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0292.jpeg', 'CERELAC 5 GRAINS&VEG. 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'CERELAC 5 GRAINS&VEG. 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0293.jpeg', 'CH BABY CREAM ARGAN OIL 0M+ 50GM', 1, 0, NOW() FROM `products` WHERE name = 'CH BABY CREAM ARGAN OIL 0M+ 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0294.jpeg', 'CH BABY MASSAGE OIL 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'CH BABY MASSAGE OIL 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0295.jpeg', 'CH BABY MASSAGE OIL 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'CH BABY MASSAGE OIL 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0296.jpeg', 'CH BABY WIPES 72PC 99/- 72PC', 1, 0, NOW() FROM `products` WHERE name = 'CH BABY WIPES 72PC 99/- 72PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0297.jpeg', 'CH BODY LOTION 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'CH BODY LOTION 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0298.jpeg', 'CH BODY LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'CH BODY LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0299.jpeg', 'CH BODY LOTION 500ML 500ML', 1, 0, NOW() FROM `products` WHERE name = 'CH BODY LOTION 500ML 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0300.jpeg', 'CH COTTON BUDS 60PC 60PC', 1, 0, NOW() FROM `products` WHERE name = 'CH COTTON BUDS 60PC 60PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0301.jpeg', 'CH GENTLE BODYWASH SHAMPOO 200ML', 1, 0, NOW() FROM `products` WHERE name = 'CH GENTLE BODYWASH SHAMPOO 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0302.jpeg', 'CH MANUAL BREAST PUMP 1999/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH MANUAL BREAST PUMP 1999/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0303.jpeg', 'CH POWDER 75G 99/- 75GM', 1, 0, NOW() FROM `products` WHERE name = 'CH POWDER 75G 99/- 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0304.jpeg', 'CH SHAMPOO 100ML 99/- 100ML', 1, 0, NOW() FROM `products` WHERE name = 'CH SHAMPOO 100ML 99/- 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0305.jpeg', 'CH SHAMPOO 200ML 169/- 200ML', 1, 0, NOW() FROM `products` WHERE name = 'CH SHAMPOO 200ML 169/- 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0306.jpeg', 'CH SOAP 125GM 79/- 125GM', 1, 0, NOW() FROM `products` WHERE name = 'CH SOAP 125GM 79/- 125GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0307.jpeg', 'CH SOAP GLYCERIN 75GM 75GM', 1, 0, NOW() FROM `products` WHERE name = 'CH SOAP GLYCERIN 75GM 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0308.jpeg', 'CH SOOTHER COMFERT 0-6M BLU 1PC', 1, 0, NOW() FROM `products` WHERE name = 'CH SOOTHER COMFERT 0-6M BLU 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0309.jpeg', 'CH SOOTHER COMFERT 6-16M BLU 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH SOOTHER COMFERT 6-16M BLU 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0310.jpeg', 'CH STERINATURAL 3IN1 4299/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH STERINATURAL 3IN1 4299/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0311.jpeg', 'CH TOOTH BRUSH BLUE 6-36 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CH TOOTH BRUSH BLUE 6-36 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0312.jpeg', 'CH TOOTH BRUSH BOY 199/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CH TOOTH BRUSH BOY 199/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0313.jpeg', 'CH TOOTHBRUSH BLUE 3-8 YEARS 1', 1, 0, NOW() FROM `products` WHERE name = 'CH TOOTHBRUSH BLUE 3-8 YEARS 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0314.jpeg', 'CH TOOTHBRUSH ORANGE 3-8 YEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'CH TOOTHBRUSH ORANGE 3-8 YEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0315.jpeg', 'CH TOOTHBRUSH PINK 3-8 YEARS 1', 1, 0, NOW() FROM `products` WHERE name = 'CH TOOTHBRUSH PINK 3-8 YEARS 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0316.jpeg', 'CH WB BOTTLE PINK PHYSIO 250ML 250ML', 1, 0, NOW() FROM `products` WHERE name = 'CH WB BOTTLE PINK PHYSIO 250ML 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0317.jpeg', 'CH WELLBEING TEAT 2M+ MED 139/ 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH WELLBEING TEAT 2M+ MED 139/ 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0318.jpeg', 'CH WELLBEING TEAT 4M+ FAST139/ 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH WELLBEING TEAT 4M+ FAST139/ 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0319.jpeg', 'CH WELLBEING TEAT 6M+FOOD 139/ 1N', 1, 0, NOW() FROM `products` WHERE name = 'CH WELLBEING TEAT 6M+FOOD 139/ 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0320.jpeg', 'CH-BABY ANTI MOSQUITO GEL 100ML', 1, 0, NOW() FROM `products` WHERE name = 'CH-BABY ANTI MOSQUITO GEL 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0321.jpeg', 'CHICCO ANTI MOSQUITO PATCES 1*24PCS', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO ANTI MOSQUITO PATCES 1*24PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0322.jpeg', 'CHICCO BOTTLE FEEAD EASY BLUE 125ML', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO BOTTLE FEEAD EASY BLUE 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0323.jpeg', 'CHICCO BOTTLE FEED EASY PINK 0 125ML', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO BOTTLE FEED EASY PINK 0 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0324.jpeg', 'CHICCO FEED EASY 4+ NIPPLE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO FEED EASY 4+ NIPPLE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0325.jpeg', 'CHICCO SOOTHER PHBLU 1N', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO SOOTHER PHBLU 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0326.jpeg', 'CHICCO TRAVEL BOTTLE WARMER 1', 1, 0, NOW() FROM `products` WHERE name = 'CHICCO TRAVEL BOTTLE WARMER 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0327.jpeg', 'CHICO FEAD EASY 2+M NIPPLE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CHICO FEAD EASY 2+M NIPPLE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0328.jpeg', 'COTTON BABY TOWEL LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'COTTON BABY TOWEL LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0329.jpeg', 'COTTON BABY TOWEL MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'COTTON BABY TOWEL MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0330.jpeg', 'COTTON CAP M', 1, 0, NOW() FROM `products` WHERE name = 'COTTON CAP M' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0331.jpeg', 'COTTON LANGOT L 0', 1, 0, NOW() FROM `products` WHERE name = 'COTTON LANGOT L 0' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0332.jpeg', 'COTTON LANGOT L WHITE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'COTTON LANGOT L WHITE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0333.jpeg', 'COTTON LANGOT S', 1, 0, NOW() FROM `products` WHERE name = 'COTTON LANGOT S' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0334.jpeg', 'COTTON WRAPPER', 1, 0, NOW() FROM `products` WHERE name = 'COTTON WRAPPER' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0335.jpeg', 'COTTON ZABLA BUTTON 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'COTTON ZABLA BUTTON 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0336.jpeg', 'COTTON ZABLA SIDE KNOT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'COTTON ZABLA SIDE KNOT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0337.jpeg', 'CRADLE COTTON MAT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CRADLE COTTON MAT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0338.jpeg', 'CRADLE COTTON MAT BIG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'CRADLE COTTON MAT BIG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0339.jpeg', 'DABUR BABY CREAM 50G', 1, 0, NOW() FROM `products` WHERE name = 'DABUR BABY CREAM 50G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0340.jpeg', 'DABUR BABY GIFT PACK 1N', 1, 0, NOW() FROM `products` WHERE name = 'DABUR BABY GIFT PACK 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0341.jpeg', 'DABUR BABY LOTION 60ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR BABY LOTION 60ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0342.jpeg', 'DABUR BABY POWDER 150G', 1, 0, NOW() FROM `products` WHERE name = 'DABUR BABY POWDER 150G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0343.jpeg', 'DABUR BABY SOAP 75G', 1, 0, NOW() FROM `products` WHERE name = 'DABUR BABY SOAP 75G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0344.jpeg', 'DABUR JANMA GHUNTI 30ML 30ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR JANMA GHUNTI 30ML 30ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0345.jpeg', 'DABUR JANMA GHUNTI 60ML 60ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR JANMA GHUNTI 60ML 60ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0346.jpeg', 'DABUR LAL TAIL 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR LAL TAIL 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0347.jpeg', 'DABUR LAL TAIL 500ML 500ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR LAL TAIL 500ML 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0348.jpeg', 'DABUR LAL TAIL 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'DABUR LAL TAIL 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0349.jpeg', 'DEXOLAC 1 200GM TIN 200GM', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC 1 200GM TIN 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0350.jpeg', 'DEXOLAC 1 400GM REFIL 400GM', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC 1 400GM REFIL 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0351.jpeg', 'DEXOLAC 1 400GM TIN 400GM', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC 1 400GM TIN 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0352.jpeg', 'DEXOLAC 2 400GM REFIL 400GM', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC 2 400GM REFIL 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0353.jpeg', 'DEXOLAC 3 400G REFILL 400G', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC 3 400G REFILL 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0354.jpeg', 'DEXOLAC SPECIAL CARE 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'DEXOLAC SPECIAL CARE 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0355.jpeg', 'DIAPER 1N', 1, 0, NOW() FROM `products` WHERE name = 'DIAPER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0356.jpeg', 'DIAPER PAD 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'DIAPER PAD 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0357.jpeg', 'DIPER PIN 1N', 1, 0, NOW() FROM `products` WHERE name = 'DIPER PIN 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0358.jpeg', 'EASUM BABY CEREAL 400G', 1, 0, NOW() FROM `products` WHERE name = 'EASUM BABY CEREAL 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0359.jpeg', 'ELECTRIC DOLL TOY 880/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'ELECTRIC DOLL TOY 880/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0360.jpeg', 'FEEDING BOTTLE WITH HANDLE 120 120ML', 1, 0, NOW() FROM `products` WHERE name = 'FEEDING BOTTLE WITH HANDLE 120 120ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0361.jpeg', 'FEEDING BOTTLE WITH SIPPER HAN 240ML', 1, 0, NOW() FROM `products` WHERE name = 'FEEDING BOTTLE WITH SIPPER HAN 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0362.jpeg', 'FEEDING PILLOW 1300/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FEEDING PILLOW 1300/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0363.jpeg', 'FEEDING PILLOW 1270/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FEEDING PILLOW 1270/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0364.jpeg', 'FEEDING PILLOW WITH BELT 1385/ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FEEDING PILLOW WITH BELT 1385/ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0365.jpeg', 'FINGER BRUSH JR-6027', 1, 0, NOW() FROM `products` WHERE name = 'FINGER BRUSH JR-6027' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0366.jpeg', 'FINGER BRUSH WITH CASE DG-702', 1, 0, NOW() FROM `products` WHERE name = 'FINGER BRUSH WITH CASE DG-702' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0367.jpeg', 'FINGER BRUSH WITH TRAING BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FINGER BRUSH WITH TRAING BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0368.jpeg', 'FOOD FEEDER 1124 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER 1124 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0369.jpeg', 'FOOD FEEDER 2IN 1 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER 2IN 1 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0370.jpeg', 'FOOD FEEDER 6035 1', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER 6035 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0371.jpeg', 'FOOD FEEDER 6801 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER 6801 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0372.jpeg', 'FOOD FEEDER DG-701 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER DG-701 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0373.jpeg', 'FOOD FEEDER HD-6804 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER HD-6804 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0374.jpeg', 'FOOD FEEDER HD-N7024 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'FOOD FEEDER HD-N7024 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0375.jpeg', 'GADI SET VELVET FRILL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'GADI SET VELVET FRILL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0376.jpeg', 'GIFT SET 8PC', 1, 0, NOW() FROM `products` WHERE name = 'GIFT SET 8PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0377.jpeg', 'GIFT SET 911', 1, 0, NOW() FROM `products` WHERE name = 'GIFT SET 911' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0378.jpeg', 'HIM BABY CARE GIFT 3PCS 120/- 3PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY CARE GIFT 3PCS 120/- 3PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0379.jpeg', 'HIM BABY CARE GIFT BASKET 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY CARE GIFT BASKET 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0380.jpeg', 'HIM BABY CARE GIFT PACK 340/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY CARE GIFT PACK 340/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0381.jpeg', 'HIM BABY CREAM 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY CREAM 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0382.jpeg', 'HIM BABY CREAM 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY CREAM 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0383.jpeg', 'HIM BABY DIAPER S 9DIAPER 9PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY DIAPER S 9DIAPER 9PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0384.jpeg', 'HIM BABY HAIR OIL 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY HAIR OIL 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0385.jpeg', 'HIM BABY HAIR OIL 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY HAIR OIL 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0386.jpeg', 'HIM BABY LOTION 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY LOTION 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0387.jpeg', 'HIM BABY LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0388.jpeg', 'HIM BABY LOTION 400ML 400ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY LOTION 400ML 400ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0389.jpeg', 'HIM BABY PANTS L9 140/- L9', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY PANTS L9 140/- L9' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0390.jpeg', 'HIM BABY POWDER 100GM 100GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY POWDER 100GM 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0391.jpeg', 'HIM BABY POWDER 200GM 200GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY POWDER 200GM 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0392.jpeg', 'HIM BABY POWDER 400GM 400GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY POWDER 400GM 400GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0393.jpeg', 'HIM BABY POWDER 50GM 50GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM BABY POWDER 50GM 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0394.jpeg', 'HIM COCOA BUTTER LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM COCOA BUTTER LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0395.jpeg', 'HIM CUCUMBER&COCONUT SOAP 75G 75G', 1, 0, NOW() FROM `products` WHERE name = 'HIM CUCUMBER&COCONUT SOAP 75G 75G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0396.jpeg', 'HIM DIAPER RASH CREAM 20GM 20GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM DIAPER RASH CREAM 20GM 20GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0397.jpeg', 'HIM DIAPER RASH CREAM 50GM 50GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM DIAPER RASH CREAM 50GM 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0398.jpeg', 'HIM EXT MOISTURIZING B/SOAP 12 125GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM EXT MOISTURIZING B/SOAP 12 125GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0399.jpeg', 'HIM EXT MOISTURIZING B/SOAP 75 75GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM EXT MOISTURIZING B/SOAP 75 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0400.jpeg', 'HIM GENTLE B/SHAMPOO 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE B/SHAMPOO 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0401.jpeg', 'HIM GENTLE B/SHAMPOO 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE B/SHAMPOO 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0402.jpeg', 'HIM GENTLE B/SHAMPOO 400ML 400ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE B/SHAMPOO 400ML 400ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0403.jpeg', 'HIM GENTLE B/SOAP 125GM 125GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE B/SOAP 125GM 125GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0404.jpeg', 'HIM GENTLE B/SOAP 25GM 25GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE B/SOAP 25GM 25GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0405.jpeg', 'HIM GENTLE BABY WASH 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE BABY WASH 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0406.jpeg', 'HIM GENTLE BABY WASH 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE BABY WASH 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0407.jpeg', 'HIM GENTLE BABY WIPES 12PCS 12PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE BABY WIPES 12PCS 12PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0408.jpeg', 'HIM GENTLE BABY WIPES 24PCS 24PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE BABY WIPES 24PCS 24PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0409.jpeg', 'HIM GENTLE BABY WIPES 72PCS 72PCS', 1, 0, NOW() FROM `products` WHERE name = 'HIM GENTLE BABY WIPES 72PCS 72PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0410.jpeg', 'HIM NOURISHING B/SOAP 125GM 125GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM NOURISHING B/SOAP 125GM 125GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0411.jpeg', 'HIM NOURISHING B/SOAP75GM 75GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM NOURISHING B/SOAP75GM 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0412.jpeg', 'HIM REFRESHING B/SOAP 75GM 75GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM REFRESHING B/SOAP 75GM 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0413.jpeg', 'HIM REFRESHING BABY SOAP 125GM 125GM', 1, 0, NOW() FROM `products` WHERE name = 'HIM REFRESHING BABY SOAP 125GM 125GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0414.jpeg', 'HIMALAYA BABY MASSAGE OIL 200M 200M', 1, 0, NOW() FROM `products` WHERE name = 'HIMALAYA BABY MASSAGE OIL 200M 200M' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0415.jpeg', 'HIMALAYA BABY MASSAGE OIL 50M 50ML', 1, 0, NOW() FROM `products` WHERE name = 'HIMALAYA BABY MASSAGE OIL 50M 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0416.jpeg', 'HIMALAYA BABY PANTS S9 S9', 1, 0, NOW() FROM `products` WHERE name = 'HIMALAYA BABY PANTS S9 S9' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0417.jpeg', 'HIMALAYA BABY RUB 15ML 15ML', 1, 0, NOW() FROM `products` WHERE name = 'HIMALAYA BABY RUB 15ML 15ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0418.jpeg', 'HOJIARY LANGOT LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HOJIARY LANGOT LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0419.jpeg', 'HOJIARY LANGOT MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HOJIARY LANGOT MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0420.jpeg', 'HOJIARY LANGOT PLANE SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HOJIARY LANGOT PLANE SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0421.jpeg', 'HOJIARY LANGOT PRINTED NB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HOJIARY LANGOT PRINTED NB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0422.jpeg', 'HOJIARY PLANE LANGOT NB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'HOJIARY PLANE LANGOT NB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0423.jpeg', 'JOHNSONS BABY BATH 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY BATH 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0424.jpeg', 'JOHNSONS BABY BUDS 50/- 30N', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY BUDS 50/- 30N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0425.jpeg', 'JOHNSONS BABY CARE COLL 610/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY CARE COLL 610/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0426.jpeg', 'JOHNSONS BABY HAIR OIL 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY HAIR OIL 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0427.jpeg', 'JOHNSONS BABY LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0428.jpeg', 'JOHNSONS BABY OIL 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY OIL 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0429.jpeg', 'JOHNSONS BABY OIL 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY OIL 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0430.jpeg', 'JOHNSONS BABY OIL 500ML 500ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY OIL 500ML 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0431.jpeg', 'JOHNSONS BABY OIL 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY OIL 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0432.jpeg', 'JOHNSONS BABY POWDER 100GM 100GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY POWDER 100GM 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0433.jpeg', 'JOHNSONS BABY POWDER 200GM 200GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY POWDER 200GM 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0434.jpeg', 'JOHNSONS BABY POWDER 50GM 50GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY POWDER 50GM 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0435.jpeg', 'JOHNSONS BABY POWDER BLOS 100G 100GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY POWDER BLOS 100G 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0436.jpeg', 'JOHNSONS BABY POWDER BLOSS 50G 50G', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY POWDER BLOSS 50G 50G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0437.jpeg', 'JOHNSONS BABY SHAMPOO 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SHAMPOO 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0438.jpeg', 'JOHNSONS BABY SHAMPOO 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SHAMPOO 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0439.jpeg', 'JOHNSONS BABY SHAMPOO 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SHAMPOO 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0440.jpeg', 'JOHNSONS BABY SOAP 100GM 100GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SOAP 100GM 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0441.jpeg', 'JOHNSONS BABY SOAP 50GM 50GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SOAP 50GM 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0442.jpeg', 'JOHNSONS BABY SOAP 75GM 75GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SOAP 75GM 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0443.jpeg', 'JOHNSONS BABY SOAP MILK 75GM 75GM', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY SOAP MILK 75GM 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0444.jpeg', 'JOHNSONS BABY WIPES 20N 20N', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BABY WIPES 20N 20N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0445.jpeg', 'JOHNSONS BUDS 15N 15N', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS BUDS 15N 15N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0446.jpeg', 'JOHNSONS COTTON BUDS JAR 1*150N', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS COTTON BUDS JAR 1*150N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0447.jpeg', 'JOHNSONS KIDS SHAMPOO C F 100M 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS KIDS SHAMPOO C F 100M 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0448.jpeg', 'JOHNSONS KIDS SHAMPOO C F 200ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS KIDS SHAMPOO C F 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0449.jpeg', 'JOHNSONS MILK+RICE LOT 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS MILK+RICE LOT 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0450.jpeg', 'JOHNSONS MILK+RICE LOT 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'JOHNSONS MILK+RICE LOT 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0451.jpeg', 'JOHSONS BABY GIFT SET 10PC 10N', 1, 0, NOW() FROM `products` WHERE name = 'JOHSONS BABY GIFT SET 10PC 10N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0452.jpeg', 'JOJO BABY DRESS 305/-', 1, 0, NOW() FROM `products` WHERE name = 'JOJO BABY DRESS 305/-' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0453.jpeg', 'KIDS BRUSH 30/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 30/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0454.jpeg', 'KIDS BRUSH 40/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 40/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0455.jpeg', 'KIDS BRUSH 45/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 45/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0456.jpeg', 'KIDS BRUSH 55/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 55/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0457.jpeg', 'KIDS BRUSH 658', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 658' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0458.jpeg', 'KIDS BRUSH 670 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'KIDS BRUSH 670 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0459.jpeg', 'LACTOGEN 3 REFIL 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'LACTOGEN 3 REFIL 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0460.jpeg', 'LACTOGEN 4 REFIL 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'LACTOGEN 4 REFIL 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0461.jpeg', 'LUV LAP BREST PUMP MANUAL 799/', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP BREST PUMP MANUAL 799/' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0462.jpeg', 'LUV LAP CAR SET CUM CARRICOT', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP CAR SET CUM CARRICOT' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0463.jpeg', 'LUV LAP FEEDER PLAIN 2PC 250M 250ML', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP FEEDER PLAIN 2PC 250M 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0464.jpeg', 'LUV LAP HIGCHAIR WITH WHEEL', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP HIGCHAIR WITH WHEEL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0465.jpeg', 'LUV LAP PRAM STROLLER 2999/-', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP PRAM STROLLER 2999/-' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0466.jpeg', 'LUV LAP WOODEN COT C 90 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP WOODEN COT C 90 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0467.jpeg', 'LUV LAP WOODEN COT C-80 18999/ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'LUV LAP WOODEN COT C-80 18999/ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0468.jpeg', 'LUVLAP BABY PASTE BUBBLE FRUIT 100GM', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP BABY PASTE BUBBLE FRUIT 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0469.jpeg', 'LUVLAP BABY PASTE BUBBLE FRUIT 50GM', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP BABY PASTE BUBBLE FRUIT 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0470.jpeg', 'LUVLAP BREAST PUMP ELECT ADORA 1PC', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP BREAST PUMP ELECT ADORA 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0471.jpeg', 'LUVLAP FEEDER FLOWR PRINT18903 125ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER FLOWR PRINT18903 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0472.jpeg', 'LUVLAP FEEDER FLOWR PRINT18904 250ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER FLOWR PRINT18904 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0473.jpeg', 'LUVLAP FEEDER JUNGL PRINT18904 125ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER JUNGL PRINT18904 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0474.jpeg', 'LUVLAP FEEDER JUNGL PRINT18906 250ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER JUNGL PRINT18906 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0475.png', 'LUVLAP FEEDER PRINT NATUR18907 150ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER PRINT NATUR18907 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0476.jpeg', 'LUVLAP FEEDER PRINT NATUR18908 150ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER PRINT NATUR18908 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0477.jpeg', 'LUVLAP FEEDER PRINT NATUR18909 250ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP FEEDER PRINT NATUR18909 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0478.jpeg', 'LUVLAP JUMBO SIPPER 240ML 1', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP JUMBO SIPPER 240ML 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0479.jpeg', 'LUVLAP LIQUID CLEANSER 500ML 500ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP LIQUID CLEANSER 500ML 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0480.jpeg', 'LUVLAP NAT FLO FEDDER 3M+ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP NAT FLO FEDDER 3M+ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0481.jpeg', 'LUVLAP NIPPLE MEDIUM 3M+ 75/- 2N', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP NIPPLE MEDIUM 3M+ 75/- 2N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0482.jpeg', 'LUVLAP POTTY SET 435/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP POTTY SET 435/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0483.jpeg', 'LUVLAP STEEL BOTTLE PINK 240ML 19279', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP STEEL BOTTLE PINK 240ML 19279' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0484.jpeg', 'LUVLAP WALKER REGULAR 1N', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP WALKER REGULAR 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0485.jpeg', 'LUVLAP WILD WOODS BATHER 1', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP WILD WOODS BATHER 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0486.jpeg', 'LUVLAP WOODEN COT C10 7895/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'LUVLAP WOODEN COT C10 7895/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0487.jpeg', 'MAMY POKO ANA S10 99/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO ANA S10 99/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0488.jpeg', 'MAMY POKO PANTS L30 1N', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS L30 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0489.jpeg', 'MAMY POKO PANTS L4 4 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS L4 4 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0490.jpeg', 'MAMY POKO PANTS L7 8N', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS L7 8N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0491.jpeg', 'MAMY POKO PANTS M4 4 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS M4 4 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0492.jpeg', 'MAMY POKO PANTS M8 8 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS M8 8 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0493.jpeg', 'MAMY POKO PANTS S22 22N', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS S22 22N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0494.jpeg', 'MAMY POKO PANTS S4 4 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS S4 4 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0495.jpeg', 'MAMY POKO PANTS S42 42PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS S42 42PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0496.jpeg', 'MAMY POKO PANTS STANDARD L34', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS STANDARD L34' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0497.jpeg', 'MAMY POKO PANTS XL 11 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS XL 11 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0498.jpeg', 'MAMY POKO PANTS XL26 26N', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS XL26 26N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0499.jpeg', 'MAMY POKO PANTS XL4 62/- XL4 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS XL4 62/- XL4 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0500.jpeg', 'MAMY POKO PANTS XL7 110/- XL7 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'MAMY POKO PANTS XL7 110/- XL7 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0501.jpeg', 'MAMYPOKO PANTS L14 1N', 1, 0, NOW() FROM `products` WHERE name = 'MAMYPOKO PANTS L14 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0502.jpeg', 'MAMYPOKO PANTS M16 1N', 1, 0, NOW() FROM `products` WHERE name = 'MAMYPOKO PANTS M16 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0503.jpeg', 'MAMYPOKO PANTS NEWBORN8', 1, 0, NOW() FROM `products` WHERE name = 'MAMYPOKO PANTS NEWBORN8' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0504.jpeg', 'MEDICINE DROPPER HD-3609 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MEDICINE DROPPER HD-3609 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0505.jpeg', 'MEDICINE DROPPER RJ-6009 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MEDICINE DROPPER RJ-6009 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0506.jpeg', 'MEDICINE DROPPER WITH SPOON 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MEDICINE DROPPER WITH SPOON 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0507.jpeg', 'MINISOUL NIPPLE STRAW BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MINISOUL NIPPLE STRAW BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0508.png', 'MITTEN BOTIES SET 110/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MITTEN BOTIES SET 110/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0509.jpeg', 'MITTEN BOTIES SET 150/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MITTEN BOTIES SET 150/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0510.jpeg', 'MITTEN BOTIES SET 65/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MITTEN BOTIES SET 65/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0511.jpeg', 'MITTEN BOTIES SET SOFTY 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MITTEN BOTIES SET SOFTY 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0512.jpeg', 'MM 1010 C BLUE COMB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1010 C BLUE COMB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0513.png', 'MM 1010 C GRN COMB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1010 C GRN COMB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0514.jpeg', 'MM 1010 C PINK COMB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1010 C PINK COMB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0515.jpeg', 'MM 1020B GRN FINGER BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1020B GRN FINGER BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0516.jpeg', 'MM 1020B ORG FINGER BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1020B ORG FINGER BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0517.jpeg', 'MM 1020B WHT FINGER BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1020B WHT FINGER BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0518.jpeg', 'MM 1020C BLUE FINGER BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1020C BLUE FINGER BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0519.jpeg', 'MM 1020C GRN FINGER BRUSH 1P', 1, 0, NOW() FROM `products` WHERE name = 'MM 1020C GRN FINGER BRUSH 1P' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0520.jpeg', 'MM 1030B PNK POWDER PUFF 299/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 1030B PNK POWDER PUFF 299/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0521.jpeg', 'MM 1140 BABY PLAY GYM MAT 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 1140 BABY PLAY GYM MAT 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0522.jpeg', 'MM 1200 BABY SOAP 49/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 1200 BABY SOAP 49/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0523.jpeg', 'MM 1200E SOAP MOISTURIZING 75GM', 1, 0, NOW() FROM `products` WHERE name = 'MM 1200E SOAP MOISTURIZING 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0524.jpeg', 'MM 1230 A GIFT SET 299/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1230 A GIFT SET 299/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0525.jpeg', 'MM 1250 BABY LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1250 BABY LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0526.jpeg', 'MM 1260 BUBBLE BATH 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1260 BUBBLE BATH 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0527.jpeg', 'MM 1260A BUBBLE BATH 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1260A BUBBLE BATH 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0528.jpeg', 'MM 1270A BABY OIL 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1270A BABY OIL 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0529.jpeg', 'MM 1280 BABY POWDER 179/- 200G', 1, 0, NOW() FROM `products` WHERE name = 'MM 1280 BABY POWDER 179/- 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0530.jpeg', 'MM 1280 BABY POWDER 99/- 100G', 1, 0, NOW() FROM `products` WHERE name = 'MM 1280 BABY POWDER 99/- 100G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0531.jpeg', 'MM 1290 BABY SHAMPOO 179/- 200ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1290 BABY SHAMPOO 179/- 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0532.jpeg', 'MM 1290 BABY SHAMPOO 99/- 100ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1290 BABY SHAMPOO 99/- 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0533.jpeg', 'MM 1300 LIQUID CLEANSER 299/- 300ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1300 LIQUID CLEANSER 299/- 300ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0534.jpeg', 'MM 1300 LIQUID CLEANSER 799/- 1.5LTR', 1, 0, NOW() FROM `products` WHERE name = 'MM 1300 LIQUID CLEANSER 799/- 1.5LTR' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0535.jpeg', 'MM 1300 R1 LIQUID CLEANSER 500ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1300 R1 LIQUID CLEANSER 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0536.jpeg', 'MM 1310 DETERGENT 300ML 299/- 0300ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1310 DETERGENT 300ML 299/- 0300ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0537.jpeg', 'MM 1310 LAUNDRY DETERGENT399/- 500ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1310 LAUNDRY DETERGENT399/- 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0538.jpeg', 'MM 1310 R1 DETERGENT 349/- 500ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 1310 R1 DETERGENT 349/- 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0539.jpeg', 'MM 1440 COTTON BALLS 179/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1440 COTTON BALLS 179/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0540.jpeg', 'MM 1460 A 04 TEETHER 129/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1460 A 04 TEETHER 129/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0541.jpeg', 'MM 1460 A-14 TEETHER 129/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 1460 A-14 TEETHER 129/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0542.jpeg', 'MM 1460 A-15 TEETHER 129/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 1460 A-15 TEETHER 129/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0543.jpeg', 'MM 1470 10 PNK TEETHER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1470 10 PNK TEETHER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0544.jpeg', 'MM 1470 11 BLU TEETHER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 1470 11 BLU TEETHER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0545.jpeg', 'MM 1470 4 TEETHER', 1, 0, NOW() FROM `products` WHERE name = 'MM 1470 4 TEETHER' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0546.jpeg', 'MM 1470 7NA TEETHER 229/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1470 7NA TEETHER 229/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0547.jpeg', 'MM 1470-1 TEETHER 249/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 1470-1 TEETHER 249/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0548.jpeg', 'MM 1480 H DOUBLE SILICON TEETH', 1, 0, NOW() FROM `products` WHERE name = 'MM 1480 H DOUBLE SILICON TEETH' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0549.jpeg', 'MM 1850 A (XL) NIPPLE', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850 A (XL) NIPPLE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0550.jpeg', 'MM 1850 B LARGE 1*2PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850 B LARGE 1*2PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0551.jpeg', 'MM 1850 B SMALL 1*2CS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850 B SMALL 1*2CS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0552.png', 'MM 1850 B SMALL NIPPLE 1*2CS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850 B SMALL NIPPLE 1*2CS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0553.jpeg', 'MM 1850A L NIPPLE', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850A L NIPPLE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0554.jpeg', 'MM 1850A S NIPPLE 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 1850A S NIPPLE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0555.jpeg', 'MM 1860 B L NIPPLE 3M+ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 1860 B L NIPPLE 3M+ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0556.png', 'MM 1870 A (XL) NIPPEL 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 1870 A (XL) NIPPEL 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0557.png', 'MM 2030B NIPPLE SHIELD 2PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 2030B NIPPLE SHIELD 2PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0558.jpeg', 'MM 2030D LARGE NIPPLE SHIELD', 1, 0, NOW() FROM `products` WHERE name = 'MM 2030D LARGE NIPPLE SHIELD' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0559.jpeg', 'MM 2360B BLU POTTY SEAT 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 2360B BLU POTTY SEAT 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0560.jpeg', 'MM 288 B NA COT 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 288 B NA COT 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0561.jpeg', 'MM 288 WOODEN COT 1N+', 1, 0, NOW() FROM `products` WHERE name = 'MM 288 WOODEN COT 1N+' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0562.jpeg', 'MM 2930 STERILIZER 2999/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 2930 STERILIZER 2999/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0563.jpeg', 'MM 300 C THERMOMETER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 300 C THERMOMETER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0564.jpeg', 'MM 3031(S) RED MAT 179/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3031(S) RED MAT 179/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0565.jpeg', 'MM 3032 M PRP MAT 299/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3032 M PRP MAT 299/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0566.jpeg', 'MM 3033 L GREEN MAT 549/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3033 L GREEN MAT 549/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0567.jpeg', 'MM 3033 L NEAVY BLUE MAT 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3033 L NEAVY BLUE MAT 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0568.jpeg', 'MM 3033 L PRP MAT 549/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3033 L PRP MAT 549/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0569.jpeg', 'MM 3070G GIFT SET 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3070G GIFT SET 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0570.jpeg', 'MM 3300 H BEIGE CORSET BELT L 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 3300 H BEIGE CORSET BELT L 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0571.jpeg', 'MM 3300A SKIN CORSET BELT XL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3300A SKIN CORSET BELT XL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0572.jpeg', 'MM 3300A SKIN CORSET BELT XXL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3300A SKIN CORSET BELT XXL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0573.jpeg', 'MM 33020B BLU MEDICINE DROPPER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 33020B BLU MEDICINE DROPPER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0574.jpeg', 'MM 33020B ORG MEDICINE DROPPER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 33020B ORG MEDICINE DROPPER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0575.jpeg', 'MM 3600 ORG TOOTH PASTE 149/- 70G', 1, 0, NOW() FROM `products` WHERE name = 'MM 3600 ORG TOOTH PASTE 149/- 70G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0576.jpeg', 'MM 3600 STB TOOTH PASTE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3600 STB TOOTH PASTE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0577.jpeg', 'MM 3720 12PC BREST PAD 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3720 12PC BREST PAD 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0578.jpeg', 'MM 3720A 24PC BREST PAD 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3720A 24PC BREST PAD 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0579.jpeg', 'MM 3720A 48PC BREST PAD 1*48PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3720A 48PC BREST PAD 1*48PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0580.jpeg', 'MM 3730 A WASHEBLE BREAST PAD 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3730 A WASHEBLE BREAST PAD 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0581.jpeg', 'MM 3750 D BABY PACIFIER 1*2', 1, 0, NOW() FROM `products` WHERE name = 'MM 3750 D BABY PACIFIER 1*2' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0582.jpeg', 'MM 3750B PACIFIRE 2PCS 229/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3750B PACIFIRE 2PCS 229/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0583.jpeg', 'MM 3830A WHOR NAIL CUTTER199/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3830A WHOR NAIL CUTTER199/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0584.jpeg', 'MM 3830B BLU NAIL CUTTER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3830B BLU NAIL CUTTER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0585.jpeg', 'MM 3830B GRN NAIL CUTTER 199/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3830B GRN NAIL CUTTER 199/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0586.jpeg', 'MM 3830C BLUE NAIL CLIPPER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 3830C BLUE NAIL CLIPPER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0587.jpeg', 'MM 3830C PNK NAIL CLIPPER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 3830C PNK NAIL CLIPPER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0588.jpeg', 'MM 3850A TOOTH BRUSH 89/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3850A TOOTH BRUSH 89/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0589.jpeg', 'MM 3850F TOOTH BRUSH 59/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3850F TOOTH BRUSH 59/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0590.jpeg', 'MM 3880 R2 PINK BOTTLE BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 3880 R2 PINK BOTTLE BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0591.jpeg', 'MM 3890D BLU COMB&BRUSH 279/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 3890D BLU COMB&BRUSH 279/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0592.jpeg', 'MM 4010A ORG FEEDING MUG 279/- 150ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 4010A ORG FEEDING MUG 279/- 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0593.jpeg', 'MM 4010A RED FEEDING MUG 279/- 150ML', 1, 0, NOW() FROM `products` WHERE name = 'MM 4010A RED FEEDING MUG 279/- 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0594.jpeg', 'MM 4010C BLU FEEDING MUG 229/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 4010C BLU FEEDING MUG 229/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0595.jpeg', 'MM 4010C PNK FEEDING MUG 229/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 4010C PNK FEEDING MUG 229/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0596.jpeg', 'MM 4080A STRAWBRUSH 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 4080A STRAWBRUSH 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0597.jpeg', 'MM 660E CRADLES 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 660E CRADLES 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0598.jpeg', 'MM 8010 A PK 2 SOCKS 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 8010 A PK 2 SOCKS 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0599.jpeg', 'MM 8010 C PK-1 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 8010 C PK-1 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0600.jpeg', 'MM 80228 BREAST PUMP 899/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 80228 BREAST PUMP 899/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0601.jpeg', 'MM 80228A BREAST PUMP 999/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 80228A BREAST PUMP 999/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0602.jpeg', 'MM 806C CAR SEAT 4999/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 806C CAR SEAT 4999/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0603.jpeg', 'MM 8640 BOTTLE COVER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM 8640 BOTTLE COVER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0604.jpeg', 'MM 8650 GLOVES 149 1', 1, 0, NOW() FROM `products` WHERE name = 'MM 8650 GLOVES 149 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0605.jpeg', 'MM 8660 S34C SKN BRA 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 8660 S34C SKN BRA 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0606.jpeg', 'MM 8660 W34B WHT BRA 399/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 8660 W34B WHT BRA 399/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0607.jpeg', 'MM 8660 W36B WHT BRA 399/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM 8660 W36B WHT BRA 399/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0608.png', 'MM 8715 CARRY COT 2020A 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM 8715 CARRY COT 2020A 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0609.jpeg', 'MM BLANKET 8280B 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM BLANKET 8280B 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0610.jpeg', 'MM BRA 8660 S34B 1', 1, 0, NOW() FROM `products` WHERE name = 'MM BRA 8660 S34B 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0611.jpeg', 'MM FP 13A FEEDING BOTTLE 279/- 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 13A FEEDING BOTTLE 279/- 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0612.jpeg', 'MM FP 14A FEEDING BOTTLE 249/- 125ML', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 14A FEEDING BOTTLE 249/- 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0613.jpeg', 'MM FP 15 FEEDING BOTTLE 250ML 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 15 FEEDING BOTTLE 250ML 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0614.jpeg', 'MM FP 16 FEEEDING BOTTLE 150ML 150ML', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 16 FEEEDING BOTTLE 150ML 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0615.jpeg', 'MM FP 8A RED FOOD FEDDER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 8A RED FOOD FEDDER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0616.jpeg', 'MM FP 8D BLU FOOD FEEDER 229/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 8D BLU FOOD FEEDER 229/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0617.jpeg', 'MM FP 8D PNK FOOD FEEDER 229/- 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM FP 8D PNK FOOD FEEDER 229/- 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0618.jpeg', 'MM GP 4 GRN GLASS FEEDING BOTL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM GP 4 GRN GLASS FEEDING BOTL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0619.jpeg', 'MM GP 4A BLU GLAS FEEDING BOTL 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM GP 4A BLU GLAS FEEDING BOTL 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0620.jpeg', 'MM GP8 BLU GLASS FEEDING BOTLE 240ML', 1, 0, NOW() FROM `products` WHERE name = 'MM GP8 BLU GLASS FEEDING BOTLE 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0621.jpeg', 'MM LP 4C PINK FEEDING BOTTLE 150ML', 1, 0, NOW() FROM `products` WHERE name = 'MM LP 4C PINK FEEDING BOTTLE 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0622.jpeg', 'MM LP 9C GRN FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM LP 9C GRN FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0623.jpeg', 'MM MP 4 BLUE FEEDING BOTTLE 130ML', 1, 0, NOW() FROM `products` WHERE name = 'MM MP 4 BLUE FEEDING BOTTLE 130ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0624.jpeg', 'MM MP 4 PINK FEEDING BOTTLE 130ML', 1, 0, NOW() FROM `products` WHERE name = 'MM MP 4 PINK FEEDING BOTTLE 130ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0625.jpeg', 'MM MP 9 BLUE FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM MP 9 BLUE FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0626.jpeg', 'MM MP 9 PINK FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM MP 9 PINK FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0627.jpeg', 'MM NB DIAPERS 12S 3050 12PC', 1, 0, NOW() FROM `products` WHERE name = 'MM NB DIAPERS 12S 3050 12PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/health-safety/dl-0628.jpeg', 'MM P2360 C GRN POTTY SEAT 599/ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM P2360 C GRN POTTY SEAT 599/ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0629.jpeg', 'MM RP 2C BLU FEEDING BOTTLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 2C BLU FEEDING BOTTLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0630.jpeg', 'MM RP 2C PNK FEEDING BOTTLE 60ML', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 2C PNK FEEDING BOTTLE 60ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0631.jpeg', 'MM RP 4C BLU FEEDING BOTTLE 125ML', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 4C BLU FEEDING BOTTLE 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0632.jpeg', 'MM RP 4C GRN FEEDING BOTTLE 125ML', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 4C GRN FEEDING BOTTLE 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0633.jpeg', 'MM RP 4C PK2 GREEN FEEDING BOT 125ML*2PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 4C PK2 GREEN FEEDING BOT 125ML*2PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0634.jpeg', 'MM RP 9C GRN FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 9C GRN FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0635.jpeg', 'MM RP 9C PNK FEEDING BOTTLE 1PC', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 9C PNK FEEDING BOTTLE 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0636.jpeg', 'MM RP 9C PNK FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM RP 9C PNK FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0637.jpeg', 'MM SP 4 FEEDING BOTTLE', 1, 0, NOW() FROM `products` WHERE name = 'MM SP 4 FEEDING BOTTLE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0638.jpeg', 'MM SP 4 FEEDING BOTTLE 120ML', 1, 0, NOW() FROM `products` WHERE name = 'MM SP 4 FEEDING BOTTLE 120ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0639.jpeg', 'MM SP 9 FEEDING BOTTLE 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MM SP 9 FEEDING BOTTLE 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0640.jpeg', 'MM TRICYCLE 9880A 1', 1, 0, NOW() FROM `products` WHERE name = 'MM TRICYCLE 9880A 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0641.jpeg', 'MM-3031 S PRP DRY SHEET 179/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM-3031 S PRP DRY SHEET 179/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0642.jpeg', 'MM-3032 M MAROON DRY MAT 299/- 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM-3032 M MAROON DRY MAT 299/- 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0643.jpeg', 'MM-3850D TOOTH BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM-3850D TOOTH BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0644.jpeg', 'MM-80220F A ELECTRIC BREAST PU 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM-80220F A ELECTRIC BREAST PU 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0645.jpeg', 'MM-8230 MUSICAL COT MOBILE 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM-8230 MUSICAL COT MOBILE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0646.jpeg', 'MM-C 17A NAVY GRAY CARRIER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'MM-C 17A NAVY GRAY CARRIER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0647.jpeg', 'MM-C 17B NAVY BLUE BABY CARRIE 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM-C 17B NAVY BLUE BABY CARRIE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0648.jpeg', 'MM-FP 8A BLUE FOOD FEDDER 1N', 1, 0, NOW() FROM `products` WHERE name = 'MM-FP 8A BLUE FOOD FEDDER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0649.jpeg', 'MM1000B MILK CONTAINER 1', 1, 0, NOW() FROM `products` WHERE name = 'MM1000B MILK CONTAINER 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0650.jpeg', 'MM3843 RATTLE TOY 1', 1, 0, NOW() FROM `products` WHERE name = 'MM3843 RATTLE TOY 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0651.jpeg', 'MM4010 FEEDING MUG 1', 1, 0, NOW() FROM `products` WHERE name = 'MM4010 FEEDING MUG 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0652.jpeg', 'MORISONS A/C NIPPLE MEDIUM', 1, 0, NOW() FROM `products` WHERE name = 'MORISONS A/C NIPPLE MEDIUM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0653.jpeg', 'MORISONS BOTTLE REGAL SPOO 250 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MORISONS BOTTLE REGAL SPOO 250 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0654.jpeg', 'MORISONS CRYSTAL BOTTLE 250ML 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MORISONS CRYSTAL BOTTLE 250ML 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0655.jpeg', 'MORISONS DESI F/BOTTLE 250ML 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MORISONS DESI F/BOTTLE 250ML 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0656.jpeg', 'MORISONS REG F/BOTTLE 250ML 250ML', 1, 0, NOW() FROM `products` WHERE name = 'MORISONS REG F/BOTTLE 250ML 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0657.jpeg', 'NAN PRO 1 REFIL 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'NAN PRO 1 REFIL 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0658.jpeg', 'NAN PRO 1 TIN 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'NAN PRO 1 TIN 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0659.jpeg', 'NAN PRO 2 REFIL 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'NAN PRO 2 REFIL 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0660.jpeg', 'NAN PRO 3 REFIL 400G 400G', 1, 0, NOW() FROM `products` WHERE name = 'NAN PRO 3 REFIL 400G 400G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0661.jpeg', 'NAPKINES 65/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NAPKINES 65/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0662.jpeg', 'NESTUM 1 RICE 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'NESTUM 1 RICE 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0663.jpeg', 'NESTUM 3 RICE FRUITS 300G 300G', 1, 0, NOW() FROM `products` WHERE name = 'NESTUM 3 RICE FRUITS 300G 300G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0664.jpeg', 'NET GADI 465/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI 465/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0665.jpeg', 'NET GADI COTTON BIG 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI COTTON BIG 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0666.jpeg', 'NET GADI COTTON MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI COTTON MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0667.jpeg', 'NET GADI COTTON SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI COTTON SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0668.jpeg', 'NET GADI PRINTED MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI PRINTED MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0669.jpeg', 'NET GADI VELVET MEDIUM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI VELVET MEDIUM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0670.jpeg', 'NET GADI VELVET 1380/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI VELVET 1380/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0671.jpeg', 'NET GADI VELVET BIG 1570/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI VELVET BIG 1570/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0672.jpeg', 'NET GADI VELVET SMALL', 1, 0, NOW() FROM `products` WHERE name = 'NET GADI VELVET SMALL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0673.jpeg', 'NOSE CLEANER HD-3607', 1, 0, NOW() FROM `products` WHERE name = 'NOSE CLEANER HD-3607' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0674.jpeg', 'NOSE CLEANSER DG 1124 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'NOSE CLEANSER DG 1124 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0675.jpeg', 'NUMNUM BANANA RICE CEREAL 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM BANANA RICE CEREAL 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0676.jpeg', 'NUMNUM INSTANT OATS 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM INSTANT OATS 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0677.jpeg', 'NUMNUM INSTANT RAJGIRA DATES 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM INSTANT RAJGIRA DATES 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0678.jpeg', 'NUMNUM MILLET OATS&DATES 200G', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM MILLET OATS&DATES 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0679.jpeg', 'NUMNUM MULTIGRAIN MILLET CEREA 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM MULTIGRAIN MILLET CEREA 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0680.jpeg', 'NUMNUM ORGANIC MOONG DAL KHICH 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM ORGANIC MOONG DAL KHICH 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0681.jpeg', 'NUMNUM RAGI APPLE ALMONDS 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM RAGI APPLE ALMONDS 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0682.jpeg', 'NUMNUM RAGI BANANA OATS 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM RAGI BANANA OATS 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0683.jpeg', 'NUMNUM RAGI BEETROOT PORRIDGE 200G', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM RAGI BEETROOT PORRIDGE 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0684.jpeg', 'NUMNUM SAATHUMAAVU 200G', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM SAATHUMAAVU 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0685.jpeg', 'NUMNUM WHEAT APPLE ALMONDS 200GM', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM WHEAT APPLE ALMONDS 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0686.jpeg', 'NUMNUM WHEAT DATES&ALMONDS 200G', 1, 0, NOW() FROM `products` WHERE name = 'NUMNUM WHEAT DATES&ALMONDS 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0687.jpeg', 'ONLY BABY BREAST PUMP A240', 1, 0, NOW() FROM `products` WHERE name = 'ONLY BABY BREAST PUMP A240' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0688.jpeg', 'ONLY BABY FEEDER TZ-111 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'ONLY BABY FEEDER TZ-111 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0689.jpeg', 'ONLY BABY FOOD FEEDER 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'ONLY BABY FOOD FEEDER 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0690.jpeg', 'ONLY BABY SIPPER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'ONLY BABY SIPPER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0691.jpeg', 'PACIFIER 7103 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PACIFIER 7103 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0692.jpeg', 'PACIFIER 7105 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PACIFIER 7105 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0693.jpeg', 'PACIFIER LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PACIFIER LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0694.jpeg', 'PACIFIER SMALL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PACIFIER SMALL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0695.jpeg', 'PAMPERS AB DIAPER S 22 1*22DIAPERS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS AB DIAPER S 22 1*22DIAPERS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0696.jpeg', 'PAMPERS AB DIAPERS LG 18 1*18DIAPER', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS AB DIAPERS LG 18 1*18DIAPER' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0697.jpeg', 'PAMPERS ALOE BLUE L5 PANTS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS ALOE BLUE L5 PANTS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0698.jpeg', 'PAMPERS BD LARGE 5 DIAPERS 1*5DIAPERS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS BD LARGE 5 DIAPERS 1*5DIAPERS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0699.jpeg', 'PAMPERS BD MED 5 DIAPERS 1*5DIAPERS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS BD MED 5 DIAPERS 1*5DIAPERS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0700.jpeg', 'PAMPERS BD SMALL 5 DIAPERS 1*5DIAPERS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS BD SMALL 5 DIAPERS 1*5DIAPERS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0701.jpeg', 'PAMPERS DIAPER L18 L 18', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPER L18 L 18' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0702.jpeg', 'PAMPERS DIAPER M20 M 20', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPER M20 M 20' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0703.jpeg', 'PAMPERS DIAPER NB-S 46 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPER NB-S 46 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0704.jpeg', 'PAMPERS DIAPER NB-S22 NB-S 22', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPER NB-S22 NB-S 22' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0705.jpeg', 'PAMPERS DIAPERS 5 STAR NB 24N 24N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPERS 5 STAR NB 24N 24N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0706.jpeg', 'PAMPERS DIAPERS 5 STAR NB 72N 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPERS 5 STAR NB 72N 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0707.jpeg', 'PAMPERS DIAPERS NB-S11 NB-S11 D', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS DIAPERS NB-S11 NB-S11 D' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0708.jpeg', 'PAMPERS PANT ALOE M12', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANT ALOE M12' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0709.jpeg', 'PAMPERS PANTS BLUE L42 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS BLUE L42 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0710.jpeg', 'PAMPERS PANTS L 30 30PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS L 30 30PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0711.jpeg', 'PAMPERS PANTS L12 199/- L12', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS L12 199/- L12' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0712.jpeg', 'PAMPERS PANTS LG 26 SUPERVALUE 26N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS LG 26 SUPERVALUE 26N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0713.jpeg', 'PAMPERS PANTS M 4 4N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS M 4 4N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0714.jpeg', 'PAMPERS PANTS M15 1N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS M15 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0715.jpeg', 'PAMPERS PANTS M34 399/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS M34 399/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0716.jpeg', 'PAMPERS PANTS MD 8 8N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS MD 8 8N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0717.jpeg', 'PAMPERS PANTS NB-10 10N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS NB-10 10N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0718.jpeg', 'PAMPERS PANTS S-10 10N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS S-10 10N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0719.jpeg', 'PAMPERS PANTS S20 S16', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS S20 S16' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0720.jpeg', 'PAMPERS PANTS S42 399/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS S42 399/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0721.jpeg', 'PAMPERS PANTS XL 24 399/- 20PANTS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS XL 24 399/- 20PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0722.jpeg', 'PAMPERS PANTS XL10 10N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS XL10 10N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0723.png', 'PAMPERS PANTS XL6 7N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS XL6 7N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0724.jpeg', 'PAMPERS PANTS-LG 6 1*7PANTS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PANTS-LG 6 1*7PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0725.jpeg', 'PAMPERS PREMI CARE PANTS XL11 11 PANTS', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PREMI CARE PANTS XL11 11 PANTS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0726.jpeg', 'PAMPERS PREMI.CARE PANTS S21 S 21', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PREMI.CARE PANTS S21 S 21' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0727.jpeg', 'PAMPERS PREMIUM CARE PANTS L13 L13', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PREMIUM CARE PANTS L13 L13' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0728.jpeg', 'PAMPERS PREMIUM CARE PANTS L16 1N', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PREMIUM CARE PANTS L16 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0729.jpeg', 'PAMPERS PREMIUM CARE S 46 46', 1, 0, NOW() FROM `products` WHERE name = 'PAMPERS PREMIUM CARE S 46 46' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0730.jpeg', 'PHOTO ALBUM 1', 1, 0, NOW() FROM `products` WHERE name = 'PHOTO ALBUM 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0731.jpeg', 'PIGEON ANTI MOSQUITO LOTION 100ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON ANTI MOSQUITO LOTION 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0732.jpeg', 'PIGEON BABY BODY WASH 200ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY BODY WASH 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0733.jpeg', 'PIGEON BABY GUM WIPES GRAPE 1*20N', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY GUM WIPES GRAPE 1*20N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0734.jpeg', 'PIGEON BABY GUM WIPES NAT.FLO', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY GUM WIPES NAT.FLO' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0735.jpeg', 'PIGEON BABY GUM WIPES STRAWBER 1*20N', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY GUM WIPES STRAWBER 1*20N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0736.jpeg', 'PIGEON BABY LOTION 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY LOTION 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0737.jpeg', 'PIGEON BABY POWDER 100GM 100GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY POWDER 100GM 100GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0738.jpeg', 'PIGEON BABY POWDER 200GM 200GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY POWDER 200GM 200GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0739.jpeg', 'PIGEON BABY SOAP 90GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY SOAP 90GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0740.jpeg', 'PIGEON BABY SOAP 99/- 75G', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BABY SOAP 99/- 75G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0741.jpeg', 'PIGEON BODY MASSAGE CREAM 50GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BODY MASSAGE CREAM 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0742.jpeg', 'PIGEON BOTTLE NIPPLE BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BOTTLE NIPPLE BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0743.jpeg', 'PIGEON BOTTLE FOOD WARMER 1', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BOTTLE FOOD WARMER 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0744.jpeg', 'PIGEON BREAST PADS 12PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BREAST PADS 12PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0745.jpeg', 'PIGEON BREAST PADS 36PCS 36PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BREAST PADS 36PCS 36PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0746.jpeg', 'PIGEON BREASTMILK STORAGE BAGS 1U', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BREASTMILK STORAGE BAGS 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0747.jpeg', 'PIGEON BREST PUMP MANUAL 78123 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON BREST PUMP MANUAL 78123 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0748.jpeg', 'PIGEON COTTON BALLS 100N', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON COTTON BALLS 100N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0749.jpeg', 'PIGEON CREAMY BATHING BAR 75GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON CREAMY BATHING BAR 75GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0750.jpeg', 'PIGEON ELECTRIC BREAST PUMP 1U', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON ELECTRIC BREAST PUMP 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0751.jpeg', 'PIGEON FEEDER 9M+ RED 240ML 240ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FEEDER 9M+ RED 240ML 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0752.jpeg', 'PIGEON FEEDER WITH SPOON 240ML 240ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FEEDER WITH SPOON 240ML 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0753.jpeg', 'PIGEON FINGER BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FINGER BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0754.jpeg', 'PIGEON FLEXIBLE FEEDER 4+ P240 240ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE FEEDER 4+ P240 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0755.jpeg', 'PIGEON FLEXIBLE FEEDER R 0+235 120ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE FEEDER R 0+235 120ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0756.jpeg', 'PIGEON FLEXIBLE FEEDER W 0+ 12 120ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE FEEDER W 0+ 12 120ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0757.jpeg', 'PIGEON FLEXIBLE NIPPLE L 9+ 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE NIPPLE L 9+ 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0758.jpeg', 'PIGEON FLEXIBLE NIPPLE LL 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE NIPPLE LL 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0759.jpeg', 'PIGEON FLEXIBLE NIPPLE M 1', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE NIPPLE M 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0760.jpeg', 'PIGEON FLEXIBLE NIPPLE S 1', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE NIPPLE S 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0761.jpeg', 'PIGEON FLEXIBLE NIPPLE Y 1', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FLEXIBLE NIPPLE Y 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0762.jpeg', 'PIGEON FRUIT PUNCH TOOTHPASTE 45G', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON FRUIT PUNCH TOOTHPASTE 45G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0763.jpeg', 'PIGEON GLASS BOTTLE 200ML PINK 240ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON GLASS BOTTLE 200ML PINK 240ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0764.jpeg', 'PIGEON LIQUID CLEANSER 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON LIQUID CLEANSER 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0765.jpeg', 'PIGEON LIQUID CLEANSER REFIL 2 200ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON LIQUID CLEANSER REFIL 2 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0766.jpeg', 'PIGEON MILD SOAP', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON MILD SOAP' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0767.jpeg', 'PIGEON MOM BODY BUTTER 50GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON MOM BODY BUTTER 50GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0768.jpeg', 'PIGEON NIPPLE PULLER 1PC', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON NIPPLE PULLER 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0769.jpeg', 'PIGEON NIPPLE SHIELD 13-16MM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON NIPPLE SHIELD 13-16MM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0770.jpeg', 'PIGEON NIPPLE SHIELD 16-20MM 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON NIPPLE SHIELD 16-20MM 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0771.png', 'PIGEON NIPPLE SHIELD 16-20MM2P 1*2PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON NIPPLE SHIELD 16-20MM2P 1*2PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0772.png', 'PIGEON NOSE CLEANER 1U', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON NOSE CLEANER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0773.jpeg', 'PIGEON ORANGE TOOTHPASTE 45G', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON ORANGE TOOTHPASTE 45G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0774.jpeg', 'PIGEON SHAMPOO 200ML 200ML', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON SHAMPOO 200ML 200ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0775.jpeg', 'PIGEON STRAW BRUSH 1', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON STRAW BRUSH 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0776.jpeg', 'PIGEON STRAWBERRY TOOTHPASTE 45G', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON STRAWBERRY TOOTHPASTE 45G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0777.jpeg', 'PIGEON TOOTHPASTE APPLE 45GM 45GM', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON TOOTHPASTE APPLE 45GM 45GM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0778.jpeg', 'PIGEON TRANING TOOTH BRUSH 1N', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON TRANING TOOTH BRUSH 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0779.jpeg', 'PIGEON WIPES 72PCS 1*72WIPES', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON WIPES 72PCS 1*72WIPES' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0780.jpeg', 'PIGEON WIPES LID 139/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PIGEON WIPES LID 139/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0781.jpeg', 'PILLOW 210', 1, 0, NOW() FROM `products` WHERE name = 'PILLOW 210' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0782.png', 'PILLOW 270/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PILLOW 270/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0783.jpeg', 'PLASTIC BIB 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PLASTIC BIB 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0784.jpeg', 'PLASTIC BIB LARGE 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'PLASTIC BIB LARGE 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0785.jpeg', 'PLASTIC MAT LARGE', 1, 0, NOW() FROM `products` WHERE name = 'PLASTIC MAT LARGE' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0786.jpeg', 'PLASTIC MAT MEDIUM', 1, 0, NOW() FROM `products` WHERE name = 'PLASTIC MAT MEDIUM' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0787.jpeg', 'PLASTIC MAT XL', 1, 0, NOW() FROM `products` WHERE name = 'PLASTIC MAT XL' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0788.jpeg', 'POWDER PUFF', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0789.jpeg', 'POWDER PUFF 105/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF 105/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0790.jpeg', 'POWDER PUFF 2 IN 1 20/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF 2 IN 1 20/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0791.jpeg', 'POWDER PUFF 3 IN 1 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF 3 IN 1 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0792.jpeg', 'POWDER PUFF 90/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF 90/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0793.jpeg', 'POWDER PUFF A1008 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF A1008 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0794.jpeg', 'POWDER PUFF A808 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF A808 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0795.jpeg', 'POWDER PUFF FZ-200 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF FZ-200 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0796.jpeg', 'POWDER PUFF HD-0740 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'POWDER PUFF HD-0740 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0797.jpeg', 'SEBAMED BABY CLEANSING BAR 150G', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY CLEANSING BAR 150G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0798.jpeg', 'SEBAMED BABY CLEASING BAR 100G', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY CLEASING BAR 100G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0799.jpeg', 'SEBAMED BABY LOTIN 100ML 100ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY LOTIN 100ML 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0800.jpeg', 'SEBAMED BABY LOTION 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY LOTION 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0801.jpeg', 'SEBAMED BABY POWDER 200G 200G', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY POWDER 200G 200G' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0802.jpeg', 'SEBAMED BABY WASH 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED BABY WASH 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0803.jpeg', 'SEBAMED CHILDREN''S SHAMPOO 150 150ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED CHILDREN''S SHAMPOO 150 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0804.jpeg', 'SEBAMED CHILDREN''S SHAMPOO 500 500ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED CHILDREN''S SHAMPOO 500 500ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0805.jpeg', 'SEBAMED CREAM 50ML 50ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED CREAM 50ML 50ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0806.jpeg', 'SEBAMED MASSAGE OIL 150ML 150ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED MASSAGE OIL 150ML 150ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0807.jpeg', 'SEBAMED RASH CREAM 470/- 100ML', 1, 0, NOW() FROM `products` WHERE name = 'SEBAMED RASH CREAM 470/- 100ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0808.jpeg', 'SHOWER CAP', 1, 0, NOW() FROM `products` WHERE name = 'SHOWER CAP' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0809.jpeg', 'SHOWER COMB 1', 1, 0, NOW() FROM `products` WHERE name = 'SHOWER COMB 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0810.jpeg', 'SILICON FOOD FEEDER 7001 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICON FOOD FEEDER 7001 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0811.jpeg', 'SILICON SPOON 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICON SPOON 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0812.jpeg', 'SILICON SPOON 2PCS 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICON SPOON 2PCS 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0813.jpeg', 'SILICON SPOON HD-8502 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICON SPOON HD-8502 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0814.jpeg', 'SILICON TEETHER HD-6711 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICON TEETHER HD-6711 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0815.jpeg', 'SILICONE FACE MASSAGER BRUSH 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SILICONE FACE MASSAGER BRUSH 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0816.jpeg', 'SIPPER 270/ 1', 1, 0, NOW() FROM `products` WHERE name = 'SIPPER 270/ 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0817.jpeg', 'SIPPER HD-8101 1', 1, 0, NOW() FROM `products` WHERE name = 'SIPPER HD-8101 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0818.jpeg', 'SOOO GOOD BABY PANTS L7 7N', 1, 0, NOW() FROM `products` WHERE name = 'SOOO GOOD BABY PANTS L7 7N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0819.jpeg', 'SOOO GOOD BABY PANTS M8 8N', 1, 0, NOW() FROM `products` WHERE name = 'SOOO GOOD BABY PANTS M8 8N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0820.jpeg', 'SOOO GOOD BABY PANTS S10 10N', 1, 0, NOW() FROM `products` WHERE name = 'SOOO GOOD BABY PANTS S10 10N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/diapers-wipes/dl-0821.jpeg', 'SOOO GOOD BABY PANTS S40 40N', 1, 0, NOW() FROM `products` WHERE name = 'SOOO GOOD BABY PANTS S40 40N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0822.jpeg', 'SPOON 95/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SPOON 95/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0823.jpeg', 'ST-1012 DISPOSABLE BREAST PAD 24PCS', 1, 0, NOW() FROM `products` WHERE name = 'ST-1012 DISPOSABLE BREAST PAD 24PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0824.jpeg', 'ST-1014 DRYING RACK 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1014 DRYING RACK 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0825.jpeg', 'ST-1051N BABY CARRYCOT MOS.NET 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1051N BABY CARRYCOT MOS.NET 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0826.jpeg', 'ST-109 BABY BED SET FIX PILLOW 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-109 BABY BED SET FIX PILLOW 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0827.jpeg', 'ST-1119MG GLASS CONTAINER 120ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1119MG GLASS CONTAINER 120ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0828.jpeg', 'ST-1120BL FEEDING SPOONS 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1120BL FEEDING SPOONS 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0829.jpeg', 'ST-1135BL BRUSH WITH SUCTION 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1135BL BRUSH WITH SUCTION 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0830.jpeg', 'ST-1137PK BOTTLE BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1137PK BOTTLE BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0831.jpeg', 'ST-1146BL FEEDING BOWL 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1146BL FEEDING BOWL 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0832.jpeg', 'ST-1146PK FEEDING BOWL 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1146PK FEEDING BOWL 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0833.jpeg', 'ST-115 FEEDING PILLOW BACK COV 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-115 FEEDING PILLOW BACK COV 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0834.jpeg', 'ST-1154BL SILICONE FRUIT FEEDE 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1154BL SILICONE FRUIT FEEDE 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0835.jpeg', 'ST-1154PK SILICONE FRUIT FEEDE 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1154PK SILICONE FRUIT FEEDE 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0836.jpeg', 'ST-1156PK 2 HANDLE CUP SIPPER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1156PK 2 HANDLE CUP SIPPER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0837.jpeg', 'ST-1175BL SIPPY CUP 2 HANDLE 180ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1175BL SIPPY CUP 2 HANDLE 180ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0838.jpeg', 'ST-1175PK SIPPY CUP 2 HANDLE 180ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1175PK SIPPY CUP 2 HANDLE 180ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0839.jpeg', 'ST-1184BL SILICON FINGER BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1184BL SILICON FINGER BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0840.jpeg', 'ST-1184PK SILICON FINGER BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1184PK SILICON FINGER BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0841.jpeg', 'ST-1185GR SILICON FINGER BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1185GR SILICON FINGER BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0842.jpeg', 'ST-1185PK SILICON FINGER BRUSH 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1185PK SILICON FINGER BRUSH 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0843.jpeg', 'ST-1187WH MEDICINE DROPPER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1187WH MEDICINE DROPPER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0844.jpeg', 'ST-119 FEEDING PILLOW WITH COV 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-119 FEEDING PILLOW WITH COV 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0845.jpeg', 'ST-1190PK BABY NAIL CLIPPER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1190PK BABY NAIL CLIPPER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0846.jpeg', 'ST-1192BL BABY SPOON PACK OF2 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1192BL BABY SPOON PACK OF2 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0847.jpeg', 'ST-1198MG NASAL ASPIRATOR 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1198MG NASAL ASPIRATOR 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0848.jpeg', 'ST-1212MG TONGUE CLEANER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1212MG TONGUE CLEANER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0849.jpeg', 'ST-1212OR TONGUE CLEANER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1212OR TONGUE CLEANER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0850.jpeg', 'ST-1213BL TONGUE CLEANER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1213BL TONGUE CLEANER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0851.jpeg', 'ST-1213MG TONGUE CLEANER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1213MG TONGUE CLEANER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0852.jpeg', 'ST-1214BL TOOTH BRUSH 3PACK 3PCS', 1, 0, NOW() FROM `products` WHERE name = 'ST-1214BL TOOTH BRUSH 3PACK 3PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0853.jpeg', 'ST-1214PK TOOTH BRUSH 3PACK 3PCS', 1, 0, NOW() FROM `products` WHERE name = 'ST-1214PK TOOTH BRUSH 3PACK 3PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0854.jpeg', 'ST-1218PK BRUSH COMB SET 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1218PK BRUSH COMB SET 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0855.jpeg', 'ST-123 BABY BED WITH NET PILOW 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-123 BABY BED WITH NET PILOW 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0856.jpeg', 'ST-1230HPK WATER FILLED TEETHR 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1230HPK WATER FILLED TEETHR 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0857.jpeg', 'ST-1236PK BABY TEETHER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1236PK BABY TEETHER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0858.jpeg', 'ST-124 BABY BED WITH NET ZIP 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-124 BABY BED WITH NET ZIP 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0859.jpeg', 'ST-125 BABY CARRYNEST W/HOOD 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-125 BABY CARRYNEST W/HOOD 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0860.jpeg', 'ST-1251BL PACIFIER WITH FLIP C 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1251BL PACIFIER WITH FLIP C 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0861.jpeg', 'ST-1263AP WATER FILLED TEETHER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1263AP WATER FILLED TEETHER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0862.jpeg', 'ST-1263HB WATER FILLED TEETHER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1263HB WATER FILLED TEETHER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0863.jpeg', 'ST-1263WM WATER FILLED TEETHER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1263WM WATER FILLED TEETHER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0864.jpeg', 'ST-1264BL SILICONE PACIFIER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1264BL SILICONE PACIFIER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0865.jpeg', 'ST-130 BABY CARE SHEET S 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-130 BABY CARE SHEET S 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0866.jpeg', 'ST-132 BABY CARE SHEET L 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-132 BABY CARE SHEET L 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0867.jpeg', 'ST-1320BL MANICURE SET 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-1320BL MANICURE SET 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0868.jpeg', 'ST-1320PK MANICURE SET 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-1320PK MANICURE SET 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0869.jpeg', 'ST-1331BL BABY NAIL CLIPPER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1331BL BABY NAIL CLIPPER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0870.jpeg', 'ST-1332GR NAIL CLIP MAGNIFIER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1332GR NAIL CLIP MAGNIFIER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0871.jpeg', 'ST-1333BL NAIL CLIPPER 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-1333BL NAIL CLIPPER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0872.jpeg', 'ST-1333PK NAIL CLIPPER 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-1333PK NAIL CLIPPER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0873.jpeg', 'ST-1500L 2PCS NIPPLE PACK 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1500L 2PCS NIPPLE PACK 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0874.jpeg', 'ST-1500M 2PCS NIPPLE PACK 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1500M 2PCS NIPPLE PACK 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0875.jpeg', 'ST-1500XL-CUT 2PCS NIPPLE PACK 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1500XL-CUT 2PCS NIPPLE PACK 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0876.jpeg', 'ST-1501BL FEEDING BOTTLE 2OZ 60ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1501BL FEEDING BOTTLE 2OZ 60ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0877.jpeg', 'ST-1501PK FEEDING BOTTLE 2OZ 60ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1501PK FEEDING BOTTLE 2OZ 60ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0878.jpeg', 'ST-1502BL FEEDING BOTTLE 4OZ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1502BL FEEDING BOTTLE 4OZ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0879.jpeg', 'ST-1502PK FEEDING BOTTLE 4OZ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1502PK FEEDING BOTTLE 4OZ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0880.jpeg', 'ST-1503BL FEEDING BOTTLE 8OZ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1503BL FEEDING BOTTLE 8OZ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0881.jpeg', 'ST-1503PK FEEDING BOTTLE 8OZ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1503PK FEEDING BOTTLE 8OZ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0882.jpeg', 'ST-1505PK FEEDING BOTTLE 4OZ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1505PK FEEDING BOTTLE 4OZ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0883.jpeg', 'ST-1506BL FEEDING BOTTLE 8OZ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1506BL FEEDING BOTTLE 8OZ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0884.jpeg', 'ST-1521BL N SQUEEZY FOOD FEEDE 90ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1521BL N SQUEEZY FOOD FEEDE 90ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0885.jpeg', 'ST-1527BL BOTTLE WITH RATTLE 125ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1527BL BOTTLE WITH RATTLE 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0886.jpeg', 'ST-1527PK FEEDING BOTTLE 4OZ 125ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1527PK FEEDING BOTTLE 4OZ 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0887.jpeg', 'ST-1528PK FEEDING BOTTLE 8OZ 250ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1528PK FEEDING BOTTLE 8OZ 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0888.jpeg', 'ST-1621BL CUP WITH HARD SPOUT 250ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1621BL CUP WITH HARD SPOUT 250ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0889.jpeg', 'ST-1622OR CUP WITH SOFT SPOUT 220ML', 1, 0, NOW() FROM `products` WHERE name = 'ST-1622OR CUP WITH SOFT SPOUT 220ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0890.jpeg', 'ST-1626BL BRUSH COMB SET 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1626BL BRUSH COMB SET 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0891.jpeg', 'ST-1626PK BRUSH COMB SET 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-1626PK BRUSH COMB SET 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0892.jpeg', 'ST-208 BABY NEW BORN SOCKS 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-208 BABY NEW BORN SOCKS 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0893.jpeg', 'ST-210NBL BABY KNEE PAD 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-210NBL BABY KNEE PAD 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0894.jpeg', 'ST-210PK BABY KNEE PAD 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-210PK BABY KNEE PAD 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0895.jpeg', 'ST-250 FACE NAPKINS 6PCS 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-250 FACE NAPKINS 6PCS 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0896.jpeg', 'ST-3001BR BABY CARRIER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-3001BR BABY CARRIER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0897.jpeg', 'ST-3014OR 5IN1 BABY HIP CARRIE 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-3014OR 5IN1 BABY HIP CARRIE 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0898.jpeg', 'ST-3106 COTTON BALLS 40GM 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-3106 COTTON BALLS 40GM 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0899.jpeg', 'ST-3112 COTTON BUDS MINI 100PC 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-3112 COTTON BUDS MINI 100PC 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0900.jpeg', 'ST-3114 COTTON BUDS MINI 100PC 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-3114 COTTON BUDS MINI 100PC 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0901.jpeg', 'ST-4120PK BABY CRADLE 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-4120PK BABY CRADLE 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0902.jpeg', 'ST-4122BL BABY CRADLE 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-4122BL BABY CRADLE 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0903.jpeg', 'ST-4126PK CRADLE W STOR.BASKET 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-4126PK CRADLE W STOR.BASKET 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0904.jpeg', 'ST-421 BABY CAP 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-421 BABY CAP 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0905.jpeg', 'ST-423 MITTENS 2PCS 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-423 MITTENS 2PCS 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0906.jpeg', 'ST-502 BABY MOSQUITO NET (M) 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-502 BABY MOSQUITO NET (M) 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0907.jpeg', 'ST-513BL POWDER BOX 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-513BL POWDER BOX 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0908.jpeg', 'ST-513PK POWDER BOX 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-513PK POWDER BOX 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/bath-skin-care/dl-0909.jpeg', 'ST-518 BABY SOAP BOX 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-518 BABY SOAP BOX 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0910.jpeg', 'ST-555 BABY FOLDING BATH TUB', 1, 0, NOW() FROM `products` WHERE name = 'ST-555 BABY FOLDING BATH TUB' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0911.jpeg', 'ST-701 MUSLIN BUTTON JABLA 0-3 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-701 MUSLIN BUTTON JABLA 0-3 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0912.jpeg', 'ST-701 MUSLIN BUTTON JABLA NB 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-701 MUSLIN BUTTON JABLA NB 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0913.jpeg', 'ST-705 MUSLIN NAPKIN 8*8 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-705 MUSLIN NAPKIN 8*8 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0914.jpeg', 'ST-708 MUSLIN NAPPY 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-708 MUSLIN NAPPY 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0915.jpeg', 'ST-720 MUSLIN KNOT JABLA 0-3 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-720 MUSLIN KNOT JABLA 0-3 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0916.jpeg', 'ST-720 MUSLIN KNOT JABLA NB 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-720 MUSLIN KNOT JABLA NB 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0917.jpeg', 'ST-721 MUSLIN FROCK 0-3 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-721 MUSLIN FROCK 0-3 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0918.jpeg', 'ST-721 MUSLIN FROCK NB 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-721 MUSLIN FROCK NB 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0919.jpeg', 'ST-726 MUSLIN WRAPPER 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-726 MUSLIN WRAPPER 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0920.jpeg', 'ST-GS 04 4PC GIFT SET PACK 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-GS 04 4PC GIFT SET PACK 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0921.jpeg', 'ST-GS 10 GIFT SET PACK 10PCS 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-GS 10 GIFT SET PACK 10PCS 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0922.jpeg', 'ST-SL-007 BABY BAG 1U', 1, 0, NOW() FROM `products` WHERE name = 'ST-SL-007 BABY BAG 1U' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0923.jpeg', 'ST-SS400 SLEEPSUIT 3PCS (3-6) 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-SS400 SLEEPSUIT 3PCS (3-6) 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0924.jpeg', 'ST-SS400 SLEEPSUIT 3PCS (6-9) 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-SS400 SLEEPSUIT 3PCS (6-9) 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0925.jpeg', 'ST-SS400 SLEEPSUIT 3PCS (NB) 1PACK', 1, 0, NOW() FROM `products` WHERE name = 'ST-SS400 SLEEPSUIT 3PCS (NB) 1PACK' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0926.jpeg', 'ST-WM-001 BABY BOTTLE WARMER 1N', 1, 0, NOW() FROM `products` WHERE name = 'ST-WM-001 BABY BOTTLE WARMER 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0927.jpeg', 'STACK CUBE 1', 1, 0, NOW() FROM `products` WHERE name = 'STACK CUBE 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/nursery/dl-0928.jpeg', 'STAR PILLOW 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'STAR PILLOW 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0929.jpeg', 'STEEL FEEDING BOTTLE 125ML 125ML', 1, 0, NOW() FROM `products` WHERE name = 'STEEL FEEDING BOTTLE 125ML 125ML' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0930.jpeg', 'SWEATER NO 4 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SWEATER NO 4 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0931.jpeg', 'SWEDDLE 477/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'SWEDDLE 477/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0932.jpeg', 'T K FEEDER FOOD 1N', 1, 0, NOW() FROM `products` WHERE name = 'T K FEEDER FOOD 1N' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-gear/dl-0933.jpeg', 'TBL SLIPING BAG CHIKEN 1', 1, 0, NOW() FROM `products` WHERE name = 'TBL SLIPING BAG CHIKEN 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0934.jpeg', 'TOY 1PC', 1, 0, NOW() FROM `products` WHERE name = 'TOY 1PC' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0935.jpeg', 'TOY BOX 240 1', 1, 0, NOW() FROM `products` WHERE name = 'TOY BOX 240 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0936.jpeg', 'TORTOISE 545/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'TORTOISE 545/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/toys-games/dl-0937.jpeg', 'TURTLE RATTLE TOY 290/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'TURTLE RATTLE TOY 290/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/feeding-essentials/dl-0938.jpeg', 'VACCUM BOTTLE 880/- 1PCS', 1, 0, NOW() FROM `products` WHERE name = 'VACCUM BOTTLE 880/- 1PCS' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0939.jpeg', 'VG-01 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-01 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0940.jpeg', 'VG-09 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-09 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0941.jpeg', 'VG-12 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-12 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0942.jpeg', 'VG-15 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-15 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0943.jpeg', 'VG-16 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-16 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0944.jpeg', 'VG-19 INFANT WEAR 1', 1, 0, NOW() FROM `products` WHERE name = 'VG-19 INFANT WEAR 1' LIMIT 1;
INSERT IGNORE INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`)
  SELECT UUID(), id, '/images/baby-clothing/dl-0945.jpeg', 'WHISPER PERIOD PANTY (L) DISP 1*6PANTS', 1, 0, NOW() FROM `products` WHERE name = 'WHISPER PERIOD PANTY (L) DISP 1*6PANTS' LIMIT 1;