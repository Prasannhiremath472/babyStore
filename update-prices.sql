-- ============================================================
-- UPDATE PRODUCT PRICES extracted from product names in Excel
-- Generated: 2026-05-16T05:19:55.033Z
-- ============================================================

-- 1STP CRADEL 4120 PINK (3799/-) 1PCS → ₹3799
UPDATE `product_variants`
  SET price = 3799, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = '1STP CRADEL 4120 PINK (3799/-) 1PCS' LIMIT 1);

-- AUTOFLOW T36 BABY COMB 15/- 1 → ₹15
UPDATE `product_variants`
  SET price = 15, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AUTOFLOW T36 BABY COMB 15/- 1' LIMIT 1);

-- AVT FEEDER 1M+ 2PC 895/- 260ML → ₹895
UPDATE `product_variants`
  SET price = 895, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT FEEDER 1M+ 2PC 895/- 260ML' LIMIT 1);

-- AVT FEEDER 260ML 495/- 1N → ₹495
UPDATE `product_variants`
  SET price = 495, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT FEEDER 260ML 495/- 1N' LIMIT 1);

-- AVT NIPPLE 0MT 325/- 1N → ₹325
UPDATE `product_variants`
  SET price = 325, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT NIPPLE 0MT 325/- 1N' LIMIT 1);

-- AVT NIPPLE 1MT 325/- 1PCS → ₹325
UPDATE `product_variants`
  SET price = 325, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT NIPPLE 1MT 325/- 1PCS' LIMIT 1);

-- AVT SOOTHER 6-18M 2PCS 405/- 1PCS → ₹405
UPDATE `product_variants`
  SET price = 405, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT SOOTHER 6-18M 2PCS 405/- 1PCS' LIMIT 1);

-- AVT STERILISER 3-1 4495/- 1N → ₹4495
UPDATE `product_variants`
  SET price = 4495, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'AVT STERILISER 3-1 4495/- 1N' LIMIT 1);

-- BABY BAG 725/- 1PCS → ₹725
UPDATE `product_variants`
  SET price = 725, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BAG 725/- 1PCS' LIMIT 1);

-- BABY BASKET 535/- 1PCS → ₹535
UPDATE `product_variants`
  SET price = 535, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BASKET 535/- 1PCS' LIMIT 1);

-- BABY BATH TUB 845/- 1PCS → ₹845
UPDATE `product_variants`
  SET price = 845, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BATH TUB 845/- 1PCS' LIMIT 1);

-- BABY BLANKET 1008/- 1PCS → ₹1008
UPDATE `product_variants`
  SET price = 1008, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BLANKET 1008/- 1PCS' LIMIT 1);

-- BABY BLANKET 1050/- 1PCS → ₹1050
UPDATE `product_variants`
  SET price = 1050, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BLANKET 1050/- 1PCS' LIMIT 1);

-- BABY BLANKET 1155/- 1PCS → ₹1155
UPDATE `product_variants`
  SET price = 1155, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BLANKET 1155/- 1PCS' LIMIT 1);

-- BABY BLANKET 935/- 1PCS → ₹935
UPDATE `product_variants`
  SET price = 935, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BLANKET 935/- 1PCS' LIMIT 1);

-- BABY BRUSH 170/- 1PCS → ₹170
UPDATE `product_variants`
  SET price = 170, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY BRUSH 170/- 1PCS' LIMIT 1);

-- BABY CHANGING MAT 870/- 1PCS → ₹870
UPDATE `product_variants`
  SET price = 870, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY CHANGING MAT 870/- 1PCS' LIMIT 1);

-- BABY EAR PICK 175/- 1PCS1PCS → ₹175
UPDATE `product_variants`
  SET price = 175, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY EAR PICK 175/- 1PCS1PCS' LIMIT 1);

-- BABY FANCY SOCKS 65/- 1PCS → ₹65
UPDATE `product_variants`
  SET price = 65, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY FANCY SOCKS 65/- 1PCS' LIMIT 1);

-- BABY GIFT SET HUB 215/- 1PCS → ₹215
UPDATE `product_variants`
  SET price = 215, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY GIFT SET HUB 215/- 1PCS' LIMIT 1);

-- BABY HAIR BELT 55/- 1PCS → ₹55
UPDATE `product_variants`
  SET price = 55, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY HAIR BELT 55/- 1PCS' LIMIT 1);

-- BABY KANGAROO BAG 599/- 1PCS → ₹599
UPDATE `product_variants`
  SET price = 599, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY KANGAROO BAG 599/- 1PCS' LIMIT 1);

-- BABY KNEE PAD 105/- 1PCS → ₹105
UPDATE `product_variants`
  SET price = 105, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY KNEE PAD 105/- 1PCS' LIMIT 1);

-- BABY KNEE PAD 225/- 1PCS → ₹225
UPDATE `product_variants`
  SET price = 225, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY KNEE PAD 225/- 1PCS' LIMIT 1);

-- BABY MAMA BAG 1125/- 1PCS → ₹1125
UPDATE `product_variants`
  SET price = 1125, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY MAMA BAG 1125/- 1PCS' LIMIT 1);

-- BABY MAMA BAG 625/- 1PCS → ₹625
UPDATE `product_variants`
  SET price = 625, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY MAMA BAG 625/- 1PCS' LIMIT 1);

-- BABY MONKEY CAP 120/- 1PCS → ₹120
UPDATE `product_variants`
  SET price = 120, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY MONKEY CAP 120/- 1PCS' LIMIT 1);

-- BABY NAIL CUTTER JR-6023 75/- 1PCS → ₹75
UPDATE `product_variants`
  SET price = 75, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY NAIL CUTTER JR-6023 75/- 1PCS' LIMIT 1);

-- BABY POTTY 1465/- 1PCS → ₹1465
UPDATE `product_variants`
  SET price = 1465, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY POTTY 1465/- 1PCS' LIMIT 1);

-- BABY RAPPER 0-3 820/- 1PCS → ₹820
UPDATE `product_variants`
  SET price = 820, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY RAPPER 0-3 820/- 1PCS' LIMIT 1);

-- BABY RAPPER VELVET 1422/- 1PCS → ₹1422
UPDATE `product_variants`
  SET price = 1422, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY RAPPER VELVET 1422/- 1PCS' LIMIT 1);

-- BABY RATTLE 185/- 1PCS → ₹185
UPDATE `product_variants`
  SET price = 185, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY RATTLE 185/- 1PCS' LIMIT 1);

-- BABY RATTLE WOODEN 195/- 1PCS → ₹195
UPDATE `product_variants`
  SET price = 195, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY RATTLE WOODEN 195/- 1PCS' LIMIT 1);

-- BABY RATTLE WOODEN 95/- 1PCS → ₹95
UPDATE `product_variants`
  SET price = 95, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY RATTLE WOODEN 95/- 1PCS' LIMIT 1);

-- BABY SHOES 392/- 1PCS → ₹392
UPDATE `product_variants`
  SET price = 392, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SHOES 392/- 1PCS' LIMIT 1);

-- BABY SHOES 478/- 1PCS → ₹478
UPDATE `product_variants`
  SET price = 478, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SHOES 478/- 1PCS' LIMIT 1);

-- BABY SHOES 530/- 1PCS → ₹530
UPDATE `product_variants`
  SET price = 530, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SHOES 530/- 1PCS' LIMIT 1);

-- BABY SILICON TEETHER 80/- 1PCS → ₹80
UPDATE `product_variants`
  SET price = 80, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SILICON TEETHER 80/- 1PCS' LIMIT 1);

-- BABY SOCKS 60/- 1PCS → ₹60
UPDATE `product_variants`
  SET price = 60, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SOCKS 60/- 1PCS' LIMIT 1);

-- BABY SWEATER 625/- 1PCS → ₹625
UPDATE `product_variants`
  SET price = 625, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SWEATER 625/- 1PCS' LIMIT 1);

-- BABY SWEATER 976/- 1PCS → ₹976
UPDATE `product_variants`
  SET price = 976, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY SWEATER 976/- 1PCS' LIMIT 1);

-- BABY TENT HOUSE 1425/- 1PCS → ₹1425
UPDATE `product_variants`
  SET price = 1425, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY TENT HOUSE 1425/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 240/- 1PCS → ₹240
UPDATE `product_variants`
  SET price = 240, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 240/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 258/- 1PCS → ₹258
UPDATE `product_variants`
  SET price = 258, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 258/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 285/- 1PCS → ₹285
UPDATE `product_variants`
  SET price = 285, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 285/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 306/- 1PCS → ₹306
UPDATE `product_variants`
  SET price = 306, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 306/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 330/- 1PCS → ₹330
UPDATE `product_variants`
  SET price = 330, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 330/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 425/- 1PCS → ₹425
UPDATE `product_variants`
  SET price = 425, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 425/- 1PCS' LIMIT 1);

-- BABY WOOLEN CAP 446/- 1PCS → ₹446
UPDATE `product_variants`
  SET price = 446, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WOOLEN CAP 446/- 1PCS' LIMIT 1);

-- BABY WRAPPER 285/- 1PCS → ₹285
UPDATE `product_variants`
  SET price = 285, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WRAPPER 285/- 1PCS' LIMIT 1);

-- BABY WRAPPER WITH TOWEL 595/- 1PCS → ₹595
UPDATE `product_variants`
  SET price = 595, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BABY WRAPPER WITH TOWEL 595/- 1PCS' LIMIT 1);

-- BATH SPONGE 85/- 1PCS → ₹85
UPDATE `product_variants`
  SET price = 85, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BATH SPONGE 85/- 1PCS' LIMIT 1);

-- BATH SPONGE 95/- 1PCS → ₹95
UPDATE `product_variants`
  SET price = 95, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BATH SPONGE 95/- 1PCS' LIMIT 1);

-- BATHING SET 749/- 1PCS → ₹749
UPDATE `product_variants`
  SET price = 749, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BATHING SET 749/- 1PCS' LIMIT 1);

-- BOTTIES 50/- 1PCS → ₹50
UPDATE `product_variants`
  SET price = 50, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BOTTIES 50/- 1PCS' LIMIT 1);

-- BOTTLE BRUSH 185/- 1PCS → ₹185
UPDATE `product_variants`
  SET price = 185, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'BOTTLE BRUSH 185/- 1PCS' LIMIT 1);

-- CH BABY WIPES 72PC 99/- 72PC → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH BABY WIPES 72PC 99/- 72PC' LIMIT 1);

-- CH MANUAL BREAST PUMP 1999/- 1N → ₹1999
UPDATE `product_variants`
  SET price = 1999, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH MANUAL BREAST PUMP 1999/- 1N' LIMIT 1);

-- CH POWDER 75G 99/- 75GM → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH POWDER 75G 99/- 75GM' LIMIT 1);

-- CH SHAMPOO 100ML 99/- 100ML → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH SHAMPOO 100ML 99/- 100ML' LIMIT 1);

-- CH SHAMPOO 200ML 169/- 200ML → ₹169
UPDATE `product_variants`
  SET price = 169, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH SHAMPOO 200ML 169/- 200ML' LIMIT 1);

-- CH SOAP 125GM 79/- 125GM → ₹79
UPDATE `product_variants`
  SET price = 79, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH SOAP 125GM 79/- 125GM' LIMIT 1);

-- CH STERINATURAL 3IN1 4299/- 1N → ₹4299
UPDATE `product_variants`
  SET price = 4299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH STERINATURAL 3IN1 4299/- 1N' LIMIT 1);

-- CH TOOTH BRUSH BOY 199/- 1PCS → ₹199
UPDATE `product_variants`
  SET price = 199, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'CH TOOTH BRUSH BOY 199/- 1PCS' LIMIT 1);

-- ELECTRIC DOLL TOY 880/- 1PCS → ₹880
UPDATE `product_variants`
  SET price = 880, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'ELECTRIC DOLL TOY 880/- 1PCS' LIMIT 1);

-- FEEDING PILLOW 1300/- 1PCS → ₹1300
UPDATE `product_variants`
  SET price = 1300, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'FEEDING PILLOW 1300/- 1PCS' LIMIT 1);

-- FEEDING PILLOW 1270/- 1PCS → ₹1270
UPDATE `product_variants`
  SET price = 1270, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'FEEDING PILLOW 1270/- 1PCS' LIMIT 1);

-- HIM BABY CARE GIFT 3PCS 120/- 3PCS → ₹120
UPDATE `product_variants`
  SET price = 120, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'HIM BABY CARE GIFT 3PCS 120/- 3PCS' LIMIT 1);

-- HIM BABY CARE GIFT PACK 340/- 1N → ₹340
UPDATE `product_variants`
  SET price = 340, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'HIM BABY CARE GIFT PACK 340/- 1N' LIMIT 1);

-- HIM BABY PANTS L9 140/- L9 → ₹140
UPDATE `product_variants`
  SET price = 140, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'HIM BABY PANTS L9 140/- L9' LIMIT 1);

-- JOHNSONS BABY BUDS 50/- 30N → ₹50
UPDATE `product_variants`
  SET price = 50, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'JOHNSONS BABY BUDS 50/- 30N' LIMIT 1);

-- JOHNSONS BABY CARE COLL 610/- 1PCS → ₹610
UPDATE `product_variants`
  SET price = 610, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'JOHNSONS BABY CARE COLL 610/- 1PCS' LIMIT 1);

-- JOJO BABY DRESS 305/- → ₹305
UPDATE `product_variants`
  SET price = 305, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'JOJO BABY DRESS 305/-' LIMIT 1);

-- KIDS BRUSH 30/- 1PCS → ₹30
UPDATE `product_variants`
  SET price = 30, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'KIDS BRUSH 30/- 1PCS' LIMIT 1);

-- KIDS BRUSH 40/- 1PCS → ₹40
UPDATE `product_variants`
  SET price = 40, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'KIDS BRUSH 40/- 1PCS' LIMIT 1);

-- KIDS BRUSH 45/- 1PCS → ₹45
UPDATE `product_variants`
  SET price = 45, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'KIDS BRUSH 45/- 1PCS' LIMIT 1);

-- KIDS BRUSH 55/- 1PCS → ₹55
UPDATE `product_variants`
  SET price = 55, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'KIDS BRUSH 55/- 1PCS' LIMIT 1);

-- LUV LAP PRAM STROLLER 2999/- → ₹2999
UPDATE `product_variants`
  SET price = 2999, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'LUV LAP PRAM STROLLER 2999/-' LIMIT 1);

-- LUVLAP NIPPLE MEDIUM 3M+ 75/- 2N → ₹75
UPDATE `product_variants`
  SET price = 75, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'LUVLAP NIPPLE MEDIUM 3M+ 75/- 2N' LIMIT 1);

-- LUVLAP POTTY SET 435/- 1N → ₹435
UPDATE `product_variants`
  SET price = 435, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'LUVLAP POTTY SET 435/- 1N' LIMIT 1);

-- LUVLAP WOODEN COT C10 7895/- 1PCS → ₹7895
UPDATE `product_variants`
  SET price = 7895, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'LUVLAP WOODEN COT C10 7895/- 1PCS' LIMIT 1);

-- MAMY POKO ANA S10 99/- 1PCS → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MAMY POKO ANA S10 99/- 1PCS' LIMIT 1);

-- MAMY POKO PANTS XL4 62/- XL4 PANTS → ₹62
UPDATE `product_variants`
  SET price = 62, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MAMY POKO PANTS XL4 62/- XL4 PANTS' LIMIT 1);

-- MAMY POKO PANTS XL7 110/- XL7 PANTS → ₹110
UPDATE `product_variants`
  SET price = 110, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MAMY POKO PANTS XL7 110/- XL7 PANTS' LIMIT 1);

-- MITTEN BOTIES SET 110/- 1PCS → ₹110
UPDATE `product_variants`
  SET price = 110, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MITTEN BOTIES SET 110/- 1PCS' LIMIT 1);

-- MITTEN BOTIES SET 150/- 1PCS → ₹150
UPDATE `product_variants`
  SET price = 150, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MITTEN BOTIES SET 150/- 1PCS' LIMIT 1);

-- MITTEN BOTIES SET 65/- 1PCS → ₹65
UPDATE `product_variants`
  SET price = 65, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MITTEN BOTIES SET 65/- 1PCS' LIMIT 1);

-- MM 1030B PNK POWDER PUFF 299/- 1PC → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1030B PNK POWDER PUFF 299/- 1PC' LIMIT 1);

-- MM 1200 BABY SOAP 49/- 1PC → ₹49
UPDATE `product_variants`
  SET price = 49, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1200 BABY SOAP 49/- 1PC' LIMIT 1);

-- MM 1230 A GIFT SET 299/- 1PCS → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1230 A GIFT SET 299/- 1PCS' LIMIT 1);

-- MM 1280 BABY POWDER 179/- 200G → ₹179
UPDATE `product_variants`
  SET price = 179, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1280 BABY POWDER 179/- 200G' LIMIT 1);

-- MM 1280 BABY POWDER 99/- 100G → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1280 BABY POWDER 99/- 100G' LIMIT 1);

-- MM 1290 BABY SHAMPOO 179/- 200ML → ₹179
UPDATE `product_variants`
  SET price = 179, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1290 BABY SHAMPOO 179/- 200ML' LIMIT 1);

-- MM 1290 BABY SHAMPOO 99/- 100ML → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1290 BABY SHAMPOO 99/- 100ML' LIMIT 1);

-- MM 1300 LIQUID CLEANSER 299/- 300ML → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1300 LIQUID CLEANSER 299/- 300ML' LIMIT 1);

-- MM 1300 LIQUID CLEANSER 799/- 1.5LTR → ₹799
UPDATE `product_variants`
  SET price = 799, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1300 LIQUID CLEANSER 799/- 1.5LTR' LIMIT 1);

-- MM 1310 DETERGENT 300ML 299/- 0300ML → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1310 DETERGENT 300ML 299/- 0300ML' LIMIT 1);

-- MM 1310 R1 DETERGENT 349/- 500ML → ₹349
UPDATE `product_variants`
  SET price = 349, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1310 R1 DETERGENT 349/- 500ML' LIMIT 1);

-- MM 1440 COTTON BALLS 179/- 1PCS → ₹179
UPDATE `product_variants`
  SET price = 179, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1440 COTTON BALLS 179/- 1PCS' LIMIT 1);

-- MM 1460 A 04 TEETHER 129/- 1PCS → ₹129
UPDATE `product_variants`
  SET price = 129, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1460 A 04 TEETHER 129/- 1PCS' LIMIT 1);

-- MM 1460 A-14 TEETHER 129/- 1PC → ₹129
UPDATE `product_variants`
  SET price = 129, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1460 A-14 TEETHER 129/- 1PC' LIMIT 1);

-- MM 1460 A-15 TEETHER 129/- 1PC → ₹129
UPDATE `product_variants`
  SET price = 129, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1460 A-15 TEETHER 129/- 1PC' LIMIT 1);

-- MM 1470 7NA TEETHER 229/- 1PCS → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1470 7NA TEETHER 229/- 1PCS' LIMIT 1);

-- MM 1470-1 TEETHER 249/- 1PC → ₹249
UPDATE `product_variants`
  SET price = 249, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 1470-1 TEETHER 249/- 1PC' LIMIT 1);

-- MM 2930 STERILIZER 2999/- 1PC → ₹2999
UPDATE `product_variants`
  SET price = 2999, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 2930 STERILIZER 2999/- 1PC' LIMIT 1);

-- MM 3031(S) RED MAT 179/- 1PCS → ₹179
UPDATE `product_variants`
  SET price = 179, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3031(S) RED MAT 179/- 1PCS' LIMIT 1);

-- MM 3032 M PRP MAT 299/- 1PCS → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3032 M PRP MAT 299/- 1PCS' LIMIT 1);

-- MM 3033 L GREEN MAT 549/- 1PCS → ₹549
UPDATE `product_variants`
  SET price = 549, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3033 L GREEN MAT 549/- 1PCS' LIMIT 1);

-- MM 3033 L PRP MAT 549/- 1PCS → ₹549
UPDATE `product_variants`
  SET price = 549, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3033 L PRP MAT 549/- 1PCS' LIMIT 1);

-- MM 3600 ORG TOOTH PASTE 149/- 70G → ₹149
UPDATE `product_variants`
  SET price = 149, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3600 ORG TOOTH PASTE 149/- 70G' LIMIT 1);

-- MM 3750B PACIFIRE 2PCS 229/- 1PCS → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3750B PACIFIRE 2PCS 229/- 1PCS' LIMIT 1);

-- MM 3830B GRN NAIL CUTTER 199/- 1PC → ₹199
UPDATE `product_variants`
  SET price = 199, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3830B GRN NAIL CUTTER 199/- 1PC' LIMIT 1);

-- MM 3850A TOOTH BRUSH 89/- 1PC → ₹89
UPDATE `product_variants`
  SET price = 89, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3850A TOOTH BRUSH 89/- 1PC' LIMIT 1);

-- MM 3850F TOOTH BRUSH 59/- 1PC → ₹59
UPDATE `product_variants`
  SET price = 59, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3850F TOOTH BRUSH 59/- 1PC' LIMIT 1);

-- MM 3890D BLU COMB&BRUSH 279/- 1PC → ₹279
UPDATE `product_variants`
  SET price = 279, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 3890D BLU COMB&BRUSH 279/- 1PC' LIMIT 1);

-- MM 4010A ORG FEEDING MUG 279/- 150ML → ₹279
UPDATE `product_variants`
  SET price = 279, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 4010A ORG FEEDING MUG 279/- 150ML' LIMIT 1);

-- MM 4010A RED FEEDING MUG 279/- 150ML → ₹279
UPDATE `product_variants`
  SET price = 279, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 4010A RED FEEDING MUG 279/- 150ML' LIMIT 1);

-- MM 4010C BLU FEEDING MUG 229/- 1PC → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 4010C BLU FEEDING MUG 229/- 1PC' LIMIT 1);

-- MM 4010C PNK FEEDING MUG 229/- 1PC → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 4010C PNK FEEDING MUG 229/- 1PC' LIMIT 1);

-- MM 80228 BREAST PUMP 899/- 1PCS → ₹899
UPDATE `product_variants`
  SET price = 899, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 80228 BREAST PUMP 899/- 1PCS' LIMIT 1);

-- MM 80228A BREAST PUMP 999/- 1PCS → ₹999
UPDATE `product_variants`
  SET price = 999, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 80228A BREAST PUMP 999/- 1PCS' LIMIT 1);

-- MM 806C CAR SEAT 4999/- 1PCS → ₹4999
UPDATE `product_variants`
  SET price = 4999, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 806C CAR SEAT 4999/- 1PCS' LIMIT 1);

-- MM 8660 W34B WHT BRA 399/- 1PC → ₹399
UPDATE `product_variants`
  SET price = 399, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 8660 W34B WHT BRA 399/- 1PC' LIMIT 1);

-- MM 8660 W36B WHT BRA 399/- 1PC → ₹399
UPDATE `product_variants`
  SET price = 399, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM 8660 W36B WHT BRA 399/- 1PC' LIMIT 1);

-- MM FP 13A FEEDING BOTTLE 279/- 250ML → ₹279
UPDATE `product_variants`
  SET price = 279, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM FP 13A FEEDING BOTTLE 279/- 250ML' LIMIT 1);

-- MM FP 14A FEEDING BOTTLE 249/- 125ML → ₹249
UPDATE `product_variants`
  SET price = 249, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM FP 14A FEEDING BOTTLE 249/- 125ML' LIMIT 1);

-- MM FP 8D BLU FOOD FEEDER 229/- 1PC → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM FP 8D BLU FOOD FEEDER 229/- 1PC' LIMIT 1);

-- MM FP 8D PNK FOOD FEEDER 229/- 1PC → ₹229
UPDATE `product_variants`
  SET price = 229, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM FP 8D PNK FOOD FEEDER 229/- 1PC' LIMIT 1);

-- MM-3031 S PRP DRY SHEET 179/- 1PCS → ₹179
UPDATE `product_variants`
  SET price = 179, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM-3031 S PRP DRY SHEET 179/- 1PCS' LIMIT 1);

-- MM-3032 M MAROON DRY MAT 299/- 1N → ₹299
UPDATE `product_variants`
  SET price = 299, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'MM-3032 M MAROON DRY MAT 299/- 1N' LIMIT 1);

-- NAPKINES 65/- 1PCS → ₹65
UPDATE `product_variants`
  SET price = 65, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'NAPKINES 65/- 1PCS' LIMIT 1);

-- NET GADI 465/- 1PCS → ₹465
UPDATE `product_variants`
  SET price = 465, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'NET GADI 465/- 1PCS' LIMIT 1);

-- NET GADI VELVET 1380/- 1PCS → ₹1380
UPDATE `product_variants`
  SET price = 1380, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'NET GADI VELVET 1380/- 1PCS' LIMIT 1);

-- NET GADI VELVET BIG 1570/- 1PCS → ₹1570
UPDATE `product_variants`
  SET price = 1570, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'NET GADI VELVET BIG 1570/- 1PCS' LIMIT 1);

-- PAMPERS PANTS L12 199/- L12 → ₹199
UPDATE `product_variants`
  SET price = 199, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PAMPERS PANTS L12 199/- L12' LIMIT 1);

-- PAMPERS PANTS M34 399/- 1PCS → ₹399
UPDATE `product_variants`
  SET price = 399, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PAMPERS PANTS M34 399/- 1PCS' LIMIT 1);

-- PAMPERS PANTS S42 399/- 1PCS → ₹399
UPDATE `product_variants`
  SET price = 399, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PAMPERS PANTS S42 399/- 1PCS' LIMIT 1);

-- PAMPERS PANTS XL 24 399/- 20PANTS → ₹399
UPDATE `product_variants`
  SET price = 399, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PAMPERS PANTS XL 24 399/- 20PANTS' LIMIT 1);

-- PIGEON BABY SOAP 99/- 75G → ₹99
UPDATE `product_variants`
  SET price = 99, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PIGEON BABY SOAP 99/- 75G' LIMIT 1);

-- PIGEON WIPES LID 139/- 1PCS → ₹139
UPDATE `product_variants`
  SET price = 139, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PIGEON WIPES LID 139/- 1PCS' LIMIT 1);

-- PILLOW 270/- 1PCS → ₹270
UPDATE `product_variants`
  SET price = 270, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'PILLOW 270/- 1PCS' LIMIT 1);

-- POWDER PUFF 105/- 1PCS → ₹105
UPDATE `product_variants`
  SET price = 105, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'POWDER PUFF 105/- 1PCS' LIMIT 1);

-- POWDER PUFF 2 IN 1 20/- 1PCS → ₹20
UPDATE `product_variants`
  SET price = 20, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'POWDER PUFF 2 IN 1 20/- 1PCS' LIMIT 1);

-- POWDER PUFF 90/- 1PCS → ₹90
UPDATE `product_variants`
  SET price = 90, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'POWDER PUFF 90/- 1PCS' LIMIT 1);

-- SEBAMED RASH CREAM 470/- 100ML → ₹470
UPDATE `product_variants`
  SET price = 470, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'SEBAMED RASH CREAM 470/- 100ML' LIMIT 1);

-- SPOON 95/- 1PCS → ₹95
UPDATE `product_variants`
  SET price = 95, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'SPOON 95/- 1PCS' LIMIT 1);

-- SWEDDLE 477/- 1PCS → ₹477
UPDATE `product_variants`
  SET price = 477, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'SWEDDLE 477/- 1PCS' LIMIT 1);

-- TORTOISE 545/- 1PCS → ₹545
UPDATE `product_variants`
  SET price = 545, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'TORTOISE 545/- 1PCS' LIMIT 1);

-- TURTLE RATTLE TOY 290/- 1PCS → ₹290
UPDATE `product_variants`
  SET price = 290, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'TURTLE RATTLE TOY 290/- 1PCS' LIMIT 1);

-- VACCUM BOTTLE 880/- 1PCS → ₹880
UPDATE `product_variants`
  SET price = 880, updatedAt = NOW()
  WHERE productId = (SELECT id FROM `products` WHERE name = 'VACCUM BOTTLE 880/- 1PCS' LIMIT 1);

-- ============================================================
-- UPDATE QUANTITIES from Excel
-- ============================================================

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 1 RAGI APPLE 320' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 1 RICE 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 1 WHEAT 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 1 WHEAT APPLE 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 1 WHEAT APPLE CAR 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 2 KHICHDI VEG 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 2 RICE VEG 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 2 WHEAT APPL CHER 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 2 WHEAT ORANGE 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 3 WHEAT HONY DATS 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 4, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 3 WHEAT RICE FRUT 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 3 WHEAT RICE VEG 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 4 MUTIGRN DAL VEG 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 4 MUTIGRN FRUITS 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 4, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 5 GRAINS&FRUITS 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CERELAC 5 GRAINS&VEG. 300G 300G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BABY CREAM ARGAN OIL 0M+ 50GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BABY MASSAGE OIL 100ML 100ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BABY MASSAGE OIL 200ML 200ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BABY WIPES 72PC 99/- 72PC' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BODY LOTION 100ML 100ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BODY LOTION 200ML 200ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH BODY LOTION 500ML 500ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH COTTON BUDS 60PC 60PC' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH GENTLE BODYWASH SHAMPOO 200ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH GLASS BOTTLE BLUE 2+M 240ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH MANUAL BREAST PUMP 1999/- 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH POWDER 75G 99/- 75GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SHAMPOO 100ML 99/- 100ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SHAMPOO 200ML 169/- 200ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOAP 125GM 79/- 125GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOAP GLYCERIN 75GM 75GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOOTHER COMFERT 0-6M BLU 1PC' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOOTHER COMFERT 6-16M BLU 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOOTHER COMFORT 0-6M PINK 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SOOTHER COMFORT 6-16M PINK 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH SPORT CUP 14+ 1PC' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH STERINATURAL 3IN1 4299/- 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTH BRUSH BLUE 6-36 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTH BRUSH BOY 199/- 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTHBRUSH BLUE 3-8 YEARS 1' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTHBRUSH ORANGE 3-8 YEAR 1' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTHBRUSH PINK 3-8 YEARS 1' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTHPASTE MILD MINT 50GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH TOOTHPASTE MIXFRUIT 50G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH WB BOTTLE PINK PHYSIO 250ML 250ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH WB GLASS BOTTLE PINK 0+M 120ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH WELLBEING TEAT 2M+ MED 139/ 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH WELLBEING TEAT 4M+ FAST139/ 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH WELLBEING TEAT 6M+FOOD 139/ 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CH-BABY ANTI MOSQUITO GEL 100ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO ANTI MOSQUITO PATCES 1*24PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO BOTTLE FEEAD EASY BLUE 125ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO BOTTLE FEED EASY PINK 0 125ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO FEED EASY 4+ NIPPLE 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO FEEDEASY SLOW 0+ NIPPLE 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO SOOTHER PHBLU 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICCO TRAVEL BOTTLE WARMER 1' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CHICO FEAD EASY 2+M NIPPLE 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 4, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON BABY TOWEL LARGE 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON BABY TOWEL MEDIUM 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 12, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON CAP M' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 23, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON LANGOT L 0' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 6, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON LANGOT L WHITE 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 9, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON LANGOT S' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON WRAPPER' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON ZABLA BUTTON 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'COTTON ZABLA SIDE KNOT 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CRADLE COTTON MAT 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'CRADLE COTTON MAT BIG 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY CREAM 50G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY GIFT PACK 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY LOTION 60ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY POWDER 150G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 4, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY SHAMPOO 60ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY SOAP 50G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY SOAP 75G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR BABY WASH 60ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR JANMA GHUNTI 30ML 30ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR JANMA GHUNTI 60ML 60ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR LAL TAIL 200ML 200ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR LAL TAIL 500ML 500ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DABUR LAL TAIL 50ML 50ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC 1 200GM TIN 200GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC 1 400GM REFIL 400GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC 1 400GM TIN 400GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC 2 400GM REFIL 400GM' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC 3 400G REFILL 400G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DEXOLAC SPECIAL CARE 400G 400G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DIAPER 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DIAPER PAD 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 6, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'DIPER PIN 1N' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 3, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'EASUM BABY CEREAL 400G' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'ELECTRIC DOLL TOY 880/- 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FEEDING BOTTLE WITH HANDLE 120 120ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FEEDING BOTTLE WITH SIPPER HAN 240ML' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FEEDING PILLOW 1300/- 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FEEDING PILLOW 1270/- 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FEEDING PILLOW WITH BELT 1385/ 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FINGER BRUSH JR-6027' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FINGER BRUSH WITH CASE DG-702' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FINGER BRUSH WITH TRAING BRUSH 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER 1124 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER 2IN 1 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER 6035 1' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 2, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER 6801 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER DG-701 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER HD-6804 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'FOOD FEEDER HD-N7024 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'GADI SET VELVET FRILL 1PCS' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'GIFT SET 8PC' LIMIT 1
  );

UPDATE `inventory`
  SET quantity = 1, updatedAt = NOW()
  WHERE variantId = (
    SELECT pv.id FROM `product_variants` pv
    JOIN `products` p ON p.id = pv.productId
    WHERE p.name = 'GIFT SET 911' LIMIT 1
  );
