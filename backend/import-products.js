/**
 * Full product import — maps ALL 247 images to products by exact name
 * Run: node import-products.js  (from inside backend/ folder)
 */
const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const SRC  = path.join(__dirname, '..', 'drive-download-20260515T140054Z-3-001');
const DEST = path.join(__dirname, '..', 'frontend', 'public', 'images');
const XL   = path.join(__dirname, '..', 'BABY SHOP STOCK PACHBANGLA 2026 - Copy.xlsx');
const OUT  = path.join(__dirname, '..', 'products-seed.sql');

const mk = (...a) => path.join(SRC, ...a);

function copyImg(src, category, name) {
  if (!src || !fs.existsSync(src)) return null;
  const ext = path.extname(src).toLowerCase();
  const dir = path.join(DEST, category);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, name + ext);
  fs.copyFileSync(src, dest);
  return `/images/${category}/${name}${ext}`;
}

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').substring(0,80);
const esc = s => s == null ? 'NULL' : "'"+String(s).replace(/'/g,"''").replace(/\\/g,'\\\\')+"'";

// ── COMPLETE IMAGE MAP — every folder/file mapped to product name + category ──
const KNOWN = [
  // NURSERY — CRADLES (8 cradles × multiple images)
  { name:'CRADEL 1', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 1','1.jpg'),mk('Cradle 1','my baby 2.jpg'),mk('Cradle 1','my baby 3.jpg'),mk('Cradle 1','my baby 4.jpg'),mk('Cradle 1','my baby 5.jpg'),mk('Cradle 1','my baby 6.jpg')] },
  { name:'CRADEL 2', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 2','my baby 1.jpg'),mk('Cradle 2','my baby 2.jpg'),mk('Cradle 2','my baby 3.jpg'),mk('Cradle 2','my baby 4.jpg'),mk('Cradle 2','my baby 5.jpg'),mk('Cradle 2','my baby 6.jpg'),mk('Cradle 2','my baby 7.jpg'),mk('Cradle 2','my baby 8.jpg'),mk('Cradle 2','my baby 9.jpg')] },
  { name:'CRADEL 3', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 3','my baby 1.jpg'),mk('Cradle 3','my baby 2.jpg'),mk('Cradle 3','my baby 3.jpg'),mk('Cradle 3','my baby 4.jpg'),mk('Cradle 3','my baby 5.jpg'),mk('Cradle 3','my baby 6.jpg'),mk('Cradle 3','my baby 7.jpg'),mk('Cradle 3','my baby 8.jpg'),mk('Cradle 3','my baby 9.jpg'),mk('Cradle 3','my baby 10.jpg')] },
  { name:'CRADEL 4', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 4','my baby 1.jpg'),mk('Cradle 4','my baby 2.jpg'),mk('Cradle 4','my baby 3.jpg'),mk('Cradle 4','my baby 4.jpg'),mk('Cradle 4','my baby 5.jpg'),mk('Cradle 4','my baby 6.jpg'),mk('Cradle 4','my baby7.jpg')] },
  { name:'CRADEL 5', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 5','1.jpg'),mk('Cradle 5','2.jpg'),mk('Cradle 5','3.jpg'),mk('Cradle 5','4.jpg'),mk('Cradle 5','5.jpg'),mk('Cradle 5','6.jpg'),mk('Cradle 5','7.jpg')] },
  { name:'CRADEL 6', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 6','my baby 1.jpg'),mk('Cradle 6','my baby2.jpg'),mk('Cradle 6','my baby 3.jpg'),mk('Cradle 6','my baby 4.jpg'),mk('Cradle 6','my baby 5.jpg'),mk('Cradle 6','my baby 7.jpg'),mk('Cradle 6','my baby8.jpg'),mk('Cradle 6','my baby 9.jpg'),mk('Cradle 6','my baby 10.jpg'),mk('Cradle 6','my baby 11.jpg')] },
  { name:'CRADEL 7', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 7','my baby 1.jpg'),mk('Cradle 7','my baby 2.jpg'),mk('Cradle 7','my baby 3.jpg'),mk('Cradle 7','my baby 4.jpg'),mk('Cradle 7','my baby 5.jpg'),mk('Cradle 7','my baby 6.jpg'),mk('Cradle 7','my baby 7.jpg'),mk('Cradle 7','my baby 8.jpg'),mk('Cradle 7','my baby 9.jpg')] },
  { name:'CRADEL 8', brand:'br-01', cat:'nursery', catId:'cat-09', mrp:3799,
    imgs:[mk('Cradle 8','my baby 1.jpg'),mk('Cradle 8','my baby 2.jpg'),mk('Cradle 8','my baby 3.jpg'),mk('Cradle 8','my baby 4.jpg'),mk('Cradle 8','my baby 5.jpg'),mk('Cradle 8','my baby 6.jpg'),mk('Cradle 8','my baby 7.jpg'),mk('Cradle 8','my baby 8.jpg'),mk('Cradle 8','my baby 9.jpg'),mk('Cradle 8','my baby 10.jpg'),mk('Cradle 8','my baby 11.jpg'),mk('Cradle 8','my baby 12.jpg')] },

  // BABY GEAR — LUVLAP
  { name:'LUV LAP BREAST PUMP MANUAL 799', brand:'br-14', cat:'baby-gear', catId:'cat-07', mrp:799, imgs:[mk('LUV LAP BREST PUMP MANUAL 799.webp')] },
  { name:'LUV LAP CAR SEAT CUM CARRYCOT', brand:'br-14', cat:'baby-gear', catId:'cat-07', mrp:0, imgs:[mk('LUV LAP CAR SET CUM CARRICOT.webp')] },
  { name:'LUV LAP CARRIER GALAXY 1N', brand:'br-14', cat:'baby-gear', catId:'cat-07', mrp:0, imgs:[mk('LUV LAP CARRIER GALAXY 1N.webp')] },
  { name:'LUV LAP HIGHCHAIR WITH WHEEL', brand:'br-14', cat:'baby-gear', catId:'cat-07', mrp:0, imgs:[mk('LUV LAP HIGCHAIR WITH WHEEL.webp')] },
  { name:'LUV LAP WOODEN COT C-90 1PCS', brand:'br-14', cat:'nursery', catId:'cat-09', mrp:0, imgs:[mk('LUV LAP WOODEN COT C 90 1PCS.webp')] },
  { name:'LUV LAP WOODEN COT C-80 18999 1PCS', brand:'br-14', cat:'nursery', catId:'cat-09', mrp:18999, imgs:[mk('LUV LAP WOODEN COT C-80 18999 1PCS.webp')] },
  { name:'LUV TRAVEL BED NEST 1PCS', brand:'br-14', cat:'nursery', catId:'cat-09', mrp:0, imgs:[mk('LUV TRAVEL BED NEST 1PCS.jpg')] },

  // FEEDING — LUVLAP
  { name:'LUV LAP FEEDER PLAIN 2PC 250ML', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUV LAP FEEDER PLAIN 2PC 250M 250ML.jpg')] },
  { name:'LUVLAP BREAST PUMP ELECTRIC ADORA 1PC', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUVLAP BREAST PUMP ELECT ADORA 1PC.jpg')] },
  { name:'LUVLAP FEEDER FLOWER PRINT 125ML', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUVLAP FEEDER FLOWR PRINT18903 125ML.jpg')] },
  { name:'LUVLAP FEEDER FLOWER PRINT 250ML', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUVLAP FEEDER FLOWR PRINT18904 250ML.jpg')] },
  { name:'LUVLAP FEEDER JUNGLE PRINT 125ML', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUVLAP FEEDER JUNGL PRINT18904 125ML.webp')] },
  { name:'LUVLAP FEEDER JUNGLE PRINT 250ML', brand:'br-14', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LUVLAP FEEDER JUNGL PRINT18906 250ML.webp')] },

  // BATH — LUVLAP
  { name:'LUVLAP BABY TOOTHPASTE BUBBLE FRUIT 100GM', brand:'br-14', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('LUVLAP BABY PASTE BUBBLE FRUIT 100GM.jpg')] },
  { name:'LUVLAP BABY TOOTHPASTE BUBBLE FRUIT 50GM', brand:'br-14', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('LUVLAP BABY PASTE BUBBLE FRUIT 50GM.jpg')] },

  // CHICCO BATH & SKIN
  { name:'CH BODY WASH 200ML', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH BODY WASH 200L','1.webp'),mk('CH BODY WASH 200L','2.webp')] },
  { name:'CH BUDS', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH BUDS','CH BUDS.webp'),mk('CH BUDS','1.webp'),mk('CH BUDS','2.webp')] },
  { name:'CH POWDER 75G 99RS', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:99, imgs:[mk('CH POWDER 75G 99RS','CH POWDER 75G 99RS.webp'),mk('CH POWDER 75G 99RS','CH POWDER 75G.webp')] },
  { name:'CH SOAP 125G', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH SOAP 125G.webp')] },
  { name:'CH SOAP GLYCERIN 75GM', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH SOAP GLYCERIN 75GM 75GM FRONT','CH SOAP GLYCERIN 75GM 75GM FRONT.jpg'),mk('CH SOAP GLYCERIN 75GM 75GM FRONT','CH SOAP GLYCERIN 75GM.webp')] },
  { name:'CH TOOTHBRUSH BLUE 6-36M 1PCS', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTH BRUSH BLUE 6-36 1PCS FRONT.webp'),mk('CH TOOTH BRUSH BLUE 6-36 1PCS BACK.webp')] },
  { name:'CH TOOTHBRUSH BLUE 3-8 YEARS 1N', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTHBRUSH BLUE 3-8 YEARS 1 FRONT.webp'),mk('CH TOOTHBRUSH BLUE 3-8 YEARS 1 BACK.webp')] },
  { name:'CH TOOTHBRUSH ORANGE 3-8 YEAR 1N', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTHBRUSH ORANGE 3-8 YEAR 1 FRONT.webp')] },
  { name:'CH TOOTHBRUSH PINK 3-8 YEARS 1N', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTHBRUSH PINK 3-8 YEARS 1 FRONT.webp'),mk('CH TOOTHBRUSH PINK 3-8 YEARS 1 BACK.webp')] },
  { name:'CH TOOTHPASTE MILD MINT 50GM', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTHPASTE MILD MINT 50GM BACK','CH TOOTHPASTE MILD MINT 50GM FRONT.webp'),mk('CH TOOTHPASTE MILD MINT 50GM BACK','CH TOOTHPASTE MILD MINT 50GM BACK.webp')] },
  { name:'CH TOOTHPASTE MIXFRUIT 50G', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH TOOTHPASTE MIXFRUIT 50G BACK','CH TOOTHPASTE MIXFRUIT 50G.webp'),mk('CH TOOTHPASTE MIXFRUIT 50G BACK','CH TOOTHPASTE MIXFRUIT 50G BACK.webp')] },
  { name:'CH BABY ANTI MOSQUITO GEL 100ML', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH-BABY ANTI MOSQUITO GEL 100ML BACK','CH-BABY ANTI MOSQUITO GEL 100ML FRONT.avif'),mk('CH-BABY ANTI MOSQUITO GEL 100ML BACK','CH-BABY ANTI MOSQUITO GEL 100ML BACK.avif')] },
  { name:'CHICCO ANTI MOSQUITO PATCHES 24PCS', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CHICCO ANTI MOSQUITO PATCES 1 24PCS BACK','CHICCO ANTI MOSQUITO PATCES 1 24PCS.webp'),mk('CHICCO ANTI MOSQUITO PATCES 1 24PCS BACK','CHICCO ANTI MOSQUITO PATCES 1 24PCS BACK.webp')] },
  { name:'CH BODY LOTION 500ML', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('CH BADY LOTION 500ML.webp'),mk('100-carolina-herrera-ch-body-lotion-.webp')] },
  { name:'CAROLINA HERRERA CH BODY LOTION 200ML', brand:'br-04', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('Carolina Herrera CH Body Lotion 200L.avif')] },

  // CHICCO SOOTHER / ACCESSORIES
  { name:'CH SOOTHER COMFORT 0-6M BLUE 1PC', brand:'br-04', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('CH SOOTHER COMFERT 0-6M BLU 1PC.webp')] },
  { name:'CH SOOTHER COMFORT 6-16M BLUE 1N', brand:'br-04', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('CH SOOTHER COMFERT 6-16M BLU 1N.webp')] },
  { name:'CH SOOTHER COMFORT 0-6M PINK 1N', brand:'br-04', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('CH SOOTHER COMFORT 0-6M PINK 1N.webp')] },
  { name:'CH SOOTHER COMFORT 6-16M PINK 1N', brand:'br-04', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('CH SOOTHER COMFORT 6-16M PINK 1N.webp')] },
  { name:'CHICCO SOOTHER PHYSIO BLUE 1N', brand:'br-04', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('CHICCO SOOTHER PHBLU 1N.webp')] },

  // CHICCO FEEDING
  { name:'CH GLASS BOTTLE BLUE 2+M 240ML', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CH GLASS BOTTLE BLUE 2+M 240ML.webp')] },
  { name:'CH MANUAL BREAST PUMP 1999', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:1999, imgs:[mk('CH MANUAL BREAST PUMP 1999','CH MANUAL BREAST PUMP 1999.webp'),mk('CH MANUAL BREAST PUMP 1999','CH MANUAL BREAST PUMP.webp')] },
  { name:'CH SPORT CUP 14+ 1PC', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CH SPORT CUP 14+ 1PC.webp')] },
  { name:'CH STERINATURAL 3IN1 4299RS 1N', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:4299, imgs:[mk('CH STERINATURAL 3IN1 4299RS 1N.webp')] },
  { name:'CH WB BOTTLE PINK PHYSIO 250ML', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CH WB BOTTLE PINK PHYSIO 250ML 250ML.webp')] },
  { name:'CH WB GLASS BOTTLE PINK 0+M 120ML', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CH WB GLASS BOTTLE PINK 0+M 120ML.webp')] },
  { name:'CH WELLBEING TEAT 2M+ MEDIUM 139 1N', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:139, imgs:[mk('CH WELLBEING TEAT 2M+ MED 139 1N.webp')] },
  { name:'CH WELLBEING TEAT 4M+ FAST 139 1N', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:139, imgs:[mk('CH WELLBEING TEAT 4M+ FAST139 1N.webp')] },
  { name:'CH WELLBEING TEAT 6M+ FOOD 139 1N', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:139, imgs:[mk('CH WELLBEING TEAT 6M+FOOD 139 1N.webp')] },
  { name:'CHICCO BOTTLE FEED EASY BLUE 125ML', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CHICCO BOTTLE FEEAD EASY BLUE 125ML.avif')] },
  { name:'CHICCO FEEDEASY SLOW 0+ NIPPLE 1PCS', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CHICCO FEEDEASY SLOW 0+ NIPPLE 1PCS.webp')] },
  { name:'CHICCO TRAVEL BOTTLE WARMER 1N', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CHICCO TRAVEL BOTTLE WARMER 1.webp')] },
  { name:'CHICO FEED EASY 2+M NIPPLE 1PCS', brand:'br-04', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('CHICO FEAD EASY 2+M NIPPLE 1PCS.webp')] },

  // HIMALAYA BATH & SKIN
  { name:'HIM BABY POWDER 50GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM BABY POWDER 50GM 50GM.webp')] },
  { name:'HIM BABY POWDER 100GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIMALAYA Baby powder','1.webp'),mk('HIMALAYA Baby powder','2.webp')] },
  { name:'HIM BABY POWDER 200GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIMALAYA Baby powder 200g','1.webp'),mk('HIMALAYA Baby powder 200g','2.webp')] },
  { name:'HIM BABY POWDER 400GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM BABY POWDER 400GM 400GM','HIM BABY POWDER 400GM 400GM.jpg'),mk('HIM BABY POWDER 400GM 400GM','2.jpg')] },
  { name:'HIM COCOA BUTTER LOTION 200ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM COCOA BUTTER LOTION 200ML 200ML.jpg')] },
  { name:'HIM COLD BALM 10G', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM COLD BALM 10G.webp')] },
  { name:'HIM CREME CLEANSING BABY BAR 75GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM CREME CLEANSING BABY BAR 75GM.webp')] },
  { name:'HIM CUCUMBER COCONUT SOAP 75G', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM CUCUMBER&COCONUT SOAP 75G 75G.webp')] },
  { name:'HIM DIAPER RASH CREAM 20GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM DIAPER RASH CREAM 20GM 20GM.webp')] },
  { name:'HIM DIAPER RASH CREAM 50GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM DIAPER RASH CREAM 50GM 50GM.webp')] },
  { name:'HIM GENTLE BABY SOAP 25GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE B SOAP 25GM 25GM.webp')] },
  { name:'HIM GENTLE BABY WASH 100ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BABY WASH 100ML 100ML.jpg')] },
  { name:'HIM GENTLE BABY WASH 200ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BABY WASH 200ML 200ML.webp')] },
  { name:'HIM GENTLE BABY WIPES 12PCS', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BABY WIPES 12PCS 12PCS.webp')] },
  { name:'HIM GENTLE BABY WIPES 24PCS', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BABY WIPES 24PCS 24PCS','1.webp'),mk('HIM GENTLE BABY WIPES 24PCS 24PCS','2.webp')] },
  { name:'HIM GENTLE BABY WIPES 72PCS', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BABY WIPES 72PCS 72PCS.jpg')] },
  { name:'HIM GENTLE BABY SHAMPOO 100ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BSHAMPOO 100ML 100ML','1.webp'),mk('HIM GENTLE BSHAMPOO 100ML 100ML','2.webp')] },
  { name:'HIM GENTLE BABY SHAMPOO 200ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE BSHAMPOO 200ML 200ML','1.webp'),mk('HIM GENTLE BSHAMPOO 200ML 200ML','2.webp')] },
  { name:'HIM GENTLE BABY SHAMPOO 400ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE HAMPOO 400ML.jpg')] },
  { name:'HIM GENTLE SOAP 125GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM GENTLE SOAP 125GM 125GM.jpg')] },
  { name:'HIM EXT MOISTURIZING BABY SOAP 125GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM EXT MOISTURIZING BSOAP 12 125GM','1.webp'),mk('HIM EXT MOISTURIZING BSOAP 12 125GM','2.webp'),mk('HIM EXT MOISTURIZING BSOAP 12 125GM','3.webp'),mk('HIM EXT MOISTURIZING BSOAP 12 125GM','4.webp')] },
  { name:'HIM EXT MOISTURIZING BABY SOAP 75GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM EXT MOISTURIZING BSOAP 75 75GM','1.webp'),mk('HIM EXT MOISTURIZING BSOAP 75 75GM','2.webp'),mk('HIM EXT MOISTURIZING BSOAP 75 75GM','3.webp'),mk('HIM EXT MOISTURIZING BSOAP 75 75GM','4.webp')] },
  { name:'HIM NOURISHING BABY SOAP 125GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM NOURISHING B SOAP 125GM 125GM.webp')] },
  { name:'HIM NOURISHING BABY SOAP 75GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM NOURISHING B SOAP75GM 75GM.webp')] },
  { name:'HIM REFRESHING BABY SOAP 75GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM REFRESHING B SOAP 75GM 75GM.webp')] },
  { name:'HIM REFRESHING BABY SOAP 125GM', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM REFRESHING BABY SOAP 125GM 125GM.webp')] },
  { name:'HIMALAYA BABY MASSAGE OIL 200ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIMALAYA BABY MASSAGE OIL 200M 200M.jpg')] },
  { name:'HIMALAYA BABY MASSAGE OIL 50ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIMALAYA BABY MASSAGE OIL 50M 50ML.webp')] },
  { name:'HIMALAYA BABY PANTS S 9PCS', brand:'br-08', cat:'diapers-wipes', catId:'cat-05', mrp:0, imgs:[mk('HIMALAYA BABY PANTS S9 S9.webp')] },
  { name:'HIMALAYA BABY RUB 15ML', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIMALAYA BABY RUB 15ML 15ML','1.webp'),mk('HIMALAYA BABY RUB 15ML 15ML','2.webp')] },
  { name:'HIM TOOTHPASTE KIDS BUBBLEGUM 80G', brand:'br-08', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('HIM TOOTHPASTE KIDS BUBBLEGUM 80G','1.webp'),mk('HIM TOOTHPASTE KIDS BUBBLEGUM 80G','2.webp')] },

  // JOHNSONS
  { name:'JOHNSONS BABY BATH 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY BATH 100ML 100ML.webp')] },
  { name:'JOHNSONS BABY BUDS 50 30N', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:50, imgs:[mk('JOHNSONS BABY BUDS 50- 30N.webp')] },
  { name:'JOHNSONS BABY HAIR OIL 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY HAIR OIL 100ML 100ML.jpg')] },
  { name:'JOHNSONS BABY LOTION 200ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY LOTION 200ML 200ML.jpg')] },
  { name:'JOHNSONS BABY LOTION 50ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY LOTION 50ML','1.webp'),mk('JOHNSONS BABY LOTION 50ML','2.webp')] },
  { name:'JOHNSONS BABY OIL 50ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY OIL 50ML 50ML.webp')] },
  { name:'JOHNSONS BABY OIL 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY OIL 100ML 100ML.jpg')] },
  { name:'JOHNSONS BABY OIL 200ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY OIL 200ML 200ML.jpg')] },
  { name:'JOHNSONS BABY OIL 500ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY OIL 500ML 500ML.jpg')] },
  { name:'JOHNSONS BABY SHAMPOO 50ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SHAMPOO 50ML 50ML.webp')] },
  { name:'JOHNSONS BABY SHAMPOO 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SHAMPOO 100ML 100ML.jpg')] },
  { name:'JOHNSONS BABY SHAMPOO 200ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SHAMPOO 200ML 200ML.jpg')] },
  { name:'JOHNSONS BABY SHAMPOO 500ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SHAMPOO 500ML.jpg')] },
  { name:'JOHNSONS BABY SOAP MILK 75GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SOAP MILK 75GM 75GM.avif')] },
  { name:'JOHNSONS BABY SOAP 50GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SOAP 50GM 50GM','1.avif'),mk('JOHNSONS BABY SOAP 50GM 50GM','2.avif')] },
  { name:'JOHNSONS BABY SOAP 75GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SOAP 75GM 75GM','1.avif'),mk('JOHNSONS BABY SOAP 75GM 75GM','2.avif')] },
  { name:'JOHNSONS BABY SOAP 100GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY SOAP 100GM 100GM','1.webp'),mk('JOHNSONS BABY SOAP 100GM 100GM','2.webp')] },
  { name:'JOHNSONS BABY POWDER 50GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY POWDER 50GM 50GM','1.webp'),mk('JOHNSONS BABY POWDER 50GM 50GM','2.webp')] },
  { name:'JOHNSONS BABY POWDER 100GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY POWDER 100GM 100GM','1.jpg'),mk('JOHNSONS BABY POWDER 100GM 100GM','2.webp')] },
  { name:'JOHNSONS BABY POWDER 200GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY POWDER 200GM 200GM','1.jpg'),mk('JOHNSONS BABY POWDER 200GM 200GM','2.jpg')] },
  { name:'JOHNSONS BABY POWDER BLOSSOM 100GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY POWDER BLOS 100G 100GM','1.jpg'),mk('JOHNSONS BABY POWDER BLOS 100G 100GM','2.jpg')] },
  { name:'JOHNSONS BABY POWDER BLOSSOM 50GM', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BABY POWDER BLOSS 50G 50G','1.avif')] },
  { name:'JOHNSONS KIDS SHAMPOO CF 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS KIDS SHAMPOO C F 100M 100ML.webp')] },
  { name:'JOHNSONS KIDS SHAMPOO CF 200ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS KIDS SHAMPOO C F 200ML.jpg')] },
  { name:'JOHNSONS MILK RICE LOTION 100ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS MILK+RICE LOT 100ML 100ML','1.avif'),mk('JOHNSONS MILK+RICE LOT 100ML 100ML','2.avif')] },
  { name:'JOHNSONS MILK RICE LOTION 200ML', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS MILK+RICE LOT 200ML 200ML.jpg')] },
  { name:'JOHNSONS BABY GIFT SET 10PC', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHSONS BABY GIFT SET 10PC 10N.jpg')] },
  { name:'JOHNSONS BUDS 15N', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS BUDS 15N 15N','1.avif'),mk('JOHNSONS BUDS 15N 15N','2.avif')] },
  { name:'JOHNSONS COTTON BUDS JAR 150N', brand:'br-07', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('JOHNSONS COTTON BUDS JAR 1150N','1.avif'),mk('JOHNSONS COTTON BUDS JAR 1150N','2.avif')] },

  // DABUR
  { name:'DABUR BABY SHAMPOO 60ML', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR BABY SHAMPOO 60ML.webp')] },
  { name:'DABUR BABY SOAP 50G', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR BABY SOAP 50G.webp')] },
  { name:'DABUR BABY WASH 60ML', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR BABY WASH 60ML.webp')] },
  { name:'DABUR JANMA GHUNTI 30ML', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR JANMA GHUNTI 30ML 30ML.webp')] },
  { name:'DABUR JANMA GHUNTI 60ML', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR JANMA GHUNTI 60ML 60ML.webp')] },
  { name:'DABUR LAL TAIL 200ML', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DABUR LAL TAIL 200ML 200ML.webp')] },
  { name:'DABUR BABY GIFT PACK', brand:'br-18', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('DUBER BABY GIFT PACK','Gemini_Generated_Image_6hu8s36hu8s36hu8.png'),mk('DUBER BABY GIFT PACK','Gemini_Generated_Image_lc7fpdlc7fpdlc7f.png')] },

  // LACTOGEN / NESTLE
  { name:'LACTOGEN 1 REFILL 400G', brand:'br-21', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LACTOGEN 1 REFILL 400G','1.webp'),mk('LACTOGEN 1 REFILL 400G','2.webp'),mk('LACTOGEN 1 REFILL 400G','3.webp'),mk('LACTOGEN 1 REFILL 400G','4.webp')] },
  { name:'LACTOGEN 2 REFILL PACK 400G', brand:'br-21', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LACTOGEN 2 REFILL PACK 400G','1.avif'),mk('LACTOGEN 2 REFILL PACK 400G','2.avif'),mk('LACTOGEN 2 REFILL PACK 400G','3.avif'),mk('LACTOGEN 2 REFILL PACK 400G','4.avif')] },
  { name:'LACTOGEN 3 REFILL 400G', brand:'br-21', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LACTOGEN 3 REFIL 400G 400G','1.avif'),mk('LACTOGEN 3 REFIL 400G 400G','2.avif'),mk('LACTOGEN 3 REFIL 400G 400G','3.avif'),mk('LACTOGEN 3 REFIL 400G 400G','4.avif')] },
  { name:'LACTOGEN 4 REFILL 400G', brand:'br-21', cat:'feeding-essentials', catId:'cat-04', mrp:0, imgs:[mk('LACTOGEN 4 REFIL 400G 400G','1.avif'),mk('LACTOGEN 4 REFIL 400G 400G','2.avif'),mk('LACTOGEN 4 REFIL 400G 400G','3.avif'),mk('LACTOGEN 4 REFIL 400G 400G','4.avif')] },

  // MISC
  { name:'BABY SOAP 75G', brand:'br-01', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('BABY SOAP 75G.png')] },
  { name:'BABY POWDER 200G', brand:'br-01', cat:'bath-skin-care', catId:'cat-06', mrp:0, imgs:[mk('baby powder.png')] },
  { name:'BABY PANTS L', brand:'br-01', cat:'diapers-wipes', catId:'cat-05', mrp:0, imgs:[mk('baby-pants-l-9.webp')] },
  { name:'JOJO BABY DRESS', brand:'br-01', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('JOJO BABY DRESS.jpg')] },
  { name:'51 INFANT WEAR 1', brand:'br-01', cat:'baby-clothing', catId:'cat-01', mrp:0, imgs:[mk('51-PCukdksL._SL1080_.jpg')] },
];

// ── Category rules for Excel products without images ──────────────────────────
const CAT_RULES = [
  { k:['INFANT WEAR','LANGOT','NAPPY','WRAPPER','FROCK','ROMPER','SUIT','FRILL','JABLA','KURTA','PYJAMA','DUNGAREE','BABA','CAP ','MITTEN','SOCK','BOOTIE','BIB ','NAPPY'], cat:'baby-clothing', catId:'cat-01', brand:'br-01' },
  { k:['PAMPERS','MAMY POKO','POKO','DIAPER PANT','SOOO GOOD','PANTS S','PANTS M','PANTS L','PANTS XL'], cat:'diapers-wipes', catId:'cat-05', brand:'br-01' },
  { k:['BOTTLE','FEEDER','NIPPLE','TEAT','SIPPER','STRAW CUP','BREAST PUMP','BREAST PAD','BOWL','SPOON','STERIL','WARMER','HIGH CHAIR','LACTOGEN','CERELAC','APTAMIL','DEXOLAC','NAN PRO','NESTUM','KHICH','RAGI','RICE CEREAL','FORMULA'], cat:'feeding-essentials', catId:'cat-04', brand:'br-01' },
  { k:['SOAP','SHAMPOO','LOTION','OIL ','POWDER','CREAM','WASH','WIPE','RASH','BODY WASH','BUDS','TOOTHPASTE','TOOTHBRUSH','TONGUE','NAIL','NASAL','GROOMING','THERMOM','DROPPER','ASPIRAT','MOSQUITO','BALM','MASSAGE','HAIR OIL'], cat:'bath-skin-care', catId:'cat-06', brand:'br-01' },
  { k:['TOY','RATTLE','TEETHER','MUSICAL','BALL','PUZZLE','BLOCK','GYM MAT','SWING','BOUNCER'], cat:'toys-games', catId:'cat-03', brand:'br-01' },
  { k:['CRADEL','CRADLE','COT ','WOODEN COT','STROLLER','PRAM','CARRIER','SLING','ROCKER','BLANKET','PILLOW','MATTRESS','NET ','BED ','CAR SEAT','TRAVEL BED'], cat:'nursery', catId:'cat-09', brand:'br-01' },
  { k:['BAG','BACKPACK','DIAPER BAG','HANGER','BELT','CORSET','MONITOR','SAFETY','GATE'], cat:'baby-gear', catId:'cat-07', brand:'br-01' },
  { k:['BREAST PAD','NURSING PAD','MATERNITY'], cat:'maternity', catId:'cat-12', brand:'br-01' },
];

function getCat(name) {
  const u = name.toUpperCase();
  for (const r of CAT_RULES) if (r.k.some(k => u.includes(k))) return r;
  return { cat:'baby-clothing', catId:'cat-01', brand:'br-01' };
}

async function main() {
  console.log('📖 Reading Excel...');
  const wb   = XLSX.readFile(XL);
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header:1, defval:'' });
  const xlAll = rows.slice(3).filter(r => r[1]&&String(r[1]).trim()).map(r => ({
    name: String(r[1]).trim(),
    qty:  r[2] ? parseInt(r[2]) : 10,
    mrp:  r[3] ? parseFloat(String(r[3]).replace(/[₹,\s]/g,'')) : 0,
  }));
  console.log(`✅ Excel: ${xlAll.length} products | Image mappings: ${KNOWN.length}`);

  const sql = [];
  const seen = new Set();
  let skuN = 3000, imgC = 0, imgT = 0;

  sql.push('-- My Baby Store — Complete Products + All Images');
  sql.push(`-- Generated: ${new Date().toISOString()}`);
  sql.push('SET FOREIGN_KEY_CHECKS = 0;\n');
  sql.push("INSERT IGNORE INTO `brands` (`id`,`name`,`slug`,`description`,`isFeatured`,`isActive`,`createdAt`,`updatedAt`) VALUES");
  sql.push("('br-14','LuvLap','luvlap','LuvLap baby products',0,1,NOW(),NOW()),");
  sql.push("('br-18','Dabur Baby','dabur-baby','Dabur baby care',0,1,NOW(),NOW()),");
  sql.push("('br-21','Nestle Baby','nestle-baby','Nestlé nutrition',1,1,NOW(),NOW());\n");

  const pI=[], cI=[], vI=[], invI=[], imgI=[];
  const knownUpper = new Set(KNOWN.map(k => k.name.toUpperCase().trim()));

  // Products WITH images
  for (const kp of KNOWN) {
    const sku = `MB-${++skuN}`;
    let sl = slugify(kp.name), s2 = sl, n = 1;
    while(seen.has(s2)) s2=`${sl}-${++n}`;
    seen.add(s2);
    const xlRow = xlAll.find(x => x.name.toUpperCase().includes(kp.name.toUpperCase().substring(0,12)));
    const price = kp.mrp || xlRow?.mrp || 99;
    const qty   = xlRow?.qty || 10;
    const id    = uuid();
    pI.push(`(${esc(id)},${esc(kp.name)},${esc(s2)},${esc(kp.name)},${esc(sku)},${esc(kp.brand)},'ACTIVE',0,0,0,'[]',NOW(),NOW())`);
    cI.push(`(${esc(id)},${esc(kp.catId)},1)`);
    const vid = uuid();
    vI.push(`(${esc(vid)},${esc(id)},'Default',${esc(sku+'-1')},${price},NULL,1,1,'{}',NOW(),NOW())`);
    invI.push(`(${esc(uuid())},${esc(vid)},${qty},0,5,NOW())`);
    for (let i=0; i<kp.imgs.length; i++) {
      imgT++;
      const w = copyImg(kp.imgs[i], kp.cat, `${sku.toLowerCase()}-${i+1}`);
      if (w) { imgC++; imgI.push(`(${esc(uuid())},${esc(id)},${esc(w)},${esc(kp.name)},${i===0?1:0},${i},NOW())`); }
    }
  }

  // Products WITHOUT images (rest of Excel)
  for (const xp of xlAll) {
    if (knownUpper.has(xp.name.toUpperCase().trim())) continue;
    const { cat, catId, brand } = getCat(xp.name);
    const sku = `MB-${++skuN}`;
    let sl = slugify(xp.name)||`product-${skuN}`, s2=sl, n=1;
    while(seen.has(s2)) s2=`${sl}-${++n}`;
    seen.add(s2);
    const id = uuid(); const vid = uuid();
    pI.push(`(${esc(id)},${esc(xp.name)},${esc(s2)},${esc(xp.name)},${esc(sku)},${esc(brand)},'ACTIVE',0,0,0,'[]',NOW(),NOW())`);
    cI.push(`(${esc(id)},${esc(catId)},1)`);
    vI.push(`(${esc(vid)},${esc(id)},'Default',${esc(sku+'-1')},${xp.mrp||99},NULL,1,1,'{}',NOW(),NOW())`);
    invI.push(`(${esc(uuid())},${esc(vid)},${xp.qty||10},0,5,NOW())`);
  }

  const batch = (a,n) => { const o=[]; for(let i=0;i<a.length;i+=n) o.push(a.slice(i,i+n)); return o; };
  const hdr = {
    pI: 'INSERT INTO `products` (`id`,`name`,`slug`,`description`,`sku`,`brandId`,`status`,`isFeatured`,`isBestseller`,`isNew`,`tags`,`createdAt`,`updatedAt`) VALUES',
    cI: 'INSERT IGNORE INTO `product_categories` (`productId`,`categoryId`,`isPrimary`) VALUES',
    vI: 'INSERT INTO `product_variants` (`id`,`productId`,`name`,`sku`,`price`,`comparePrice`,`isDefault`,`isActive`,`attributes`,`createdAt`,`updatedAt`) VALUES',
    invI:'INSERT INTO `inventory` (`id`,`variantId`,`quantity`,`reservedQuantity`,`lowStockAlert`,`updatedAt`) VALUES',
    imgI:'INSERT INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`) VALUES',
  };

  for (const [k, arr] of Object.entries({pI,cI,vI,invI,imgI})) {
    if (!arr.length) continue;
    for (const ch of batch(arr, 200)) { sql.push(hdr[k]); sql.push(ch.join(',\n')+';'); sql.push(''); }
  }

  sql.push('SET FOREIGN_KEY_CHECKS = 1;');
  sql.push(`-- Products with images: ${KNOWN.length}, Total: ${pI.length}, Images: ${imgC}/${imgT}`);
  fs.writeFileSync(OUT, sql.join('\n'), 'utf8');

  console.log(`\n✅ COMPLETE`);
  console.log(`   Products with images : ${KNOWN.length}`);
  console.log(`   Total products       : ${pI.length}`);
  console.log(`   Images copied        : ${imgC} / ${imgT}`);
  console.log(`   SQL output           : products-seed.sql`);
  console.log(`\n📌 Steps:`);
  console.log(`   1. Run products-seed.sql in phpMyAdmin`);
  console.log(`   2. git add frontend/public/images && git push`);
}
main().catch(e => { console.error(e); process.exit(1); });
