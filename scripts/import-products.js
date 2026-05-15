/**
 * Import products from Excel + copy images from drive download folder
 * Run: node scripts/import-products.js
 */
const XLSX  = require('xlsx');
const fs    = require('fs');
const path  = require('path');
const { v4: uuid } = require('uuid');

const ROOT        = path.join(__dirname, '..');
const IMAGES_SRC  = path.join(ROOT, 'drive-download-20260515T140054Z-3-001');
const IMAGES_DEST = path.join(ROOT, 'frontend', 'public', 'images');
const SQL_OUT     = path.join(ROOT, 'products-seed.sql');

// ── Category mapping ───────────────────────────────────────────────────────────
// Maps keywords in product name → { category, subcategory, slug }
const CATEGORY_MAP = [
  // Baby Clothing
  { keys: ['INFANT WEAR','LANGOT','NAPPY','WRAPPER','FROCK','ROMPER','SUIT','FRILL','JABLA','KURTA','PYJAMA','DUNGAREE','BABA SUIT','CAP ','MITTEN','SOCK','BOOTIE','BIB','NAPKIN CLOTH','DIAPER COVER','COTTON CAP','COTTON SOCK','COTTON MITTEN'], cat: 'baby-clothing',      catId: 'cat-01' },
  // Diapers
  { keys: ['PAMPERS','MAMY POKO','PANTS','DIAPER','NAPPY PAD','SOOO GOOD'], cat: 'diapers-wipes',      catId: 'cat-05' },
  // Feeding
  { keys: ['BOTTLE','FEEDER','NIPPLE','TEAT','SIPPER','STRAW CUP','FEEDING','BREAST PUMP','BREAST PAD','NURSING','BOWL','SPOON','STERILIZ','BOTTLE BRUSH','BOTTLE WARMER','FOOD MAKER','HIGH CHAIR'], cat: 'feeding-essentials', catId: 'cat-04' },
  // Infant Formula / Food
  { keys: ['LACTOGEN','CERELAC','APTAMIL','DEXOLAC','NAN PRO','NESTUM','FORMULA','KHICH','ORGANIC','MOONG','OATS','RICE CEREAL','WHEAT','RAGI'], cat: 'feeding-essentials', catId: 'cat-04' },
  // Bath & Skin Care
  { keys: ['SOAP','SHAMPOO','LOTION','OIL','POWDER','CREAM','WASH','WIPE','RASH','BODY WASH','MOISTUR','SUNSCREEN','TALC','BATH','BUDS','TOOTHPASTE','TOOTHBRUSH','TONGUE','NAIL CLIP','NASAL','GROOMING','THERMOMETER','DROPPER','ASPIRATOR'], cat: 'bath-skin-care',     catId: 'cat-06' },
  // Toys
  { keys: ['TOY','RATTLE','TEETHER','MUSICAL','BALL','PUZZLE','BLOCK','GYM','PLAY MAT','SWING','BOUNCER'], cat: 'toys-games',        catId: 'cat-03' },
  // Nursery / Baby Gear
  { keys: ['CRADEL','CRADLE','COT','STROLLER','PRAM','CARRIER','SLING','ROCKER','SWING','BLANKET','PILLOW','MATTRESS','MOSQUITO','NET','BED','CAR SEAT'], cat: 'nursery',           catId: 'cat-09' },
  // Baby Gear / Accessories
  { keys: ['BAG','BACKPACK','DIAPER BAG','HANGER','COMB','BRUSH','BELT','CORSET','MONITOR','SAFETY','GATE','GUARD','SOCKET'], cat: 'baby-gear',         catId: 'cat-07' },
  // Health & Safety
  { keys: ['THERMOMETER','MEDICINE','DROPPER','ASPIRATOR','NAIL','SCISSOR'], cat: 'health-safety',     catId: 'cat-13' },
  // Maternity
  { keys: ['BREAST PAD','NURSING PAD','CORSET','MATERNITY','NEW MOM','BODY BUTTER'], cat: 'maternity', catId: 'cat-12' },
  // Kids Fashion
  { keys: ['FROCK ','FROCK,','SHIRT','PANT ','PANT,','JACKET','HOODIE','SET ','SET,','DRESS'], cat: 'kids-fashion',      catId: 'cat-02' },
];

function getCategory(name) {
  const upper = name.toUpperCase();
  for (const rule of CATEGORY_MAP) {
    if (rule.keys.some(k => upper.includes(k))) {
      return { cat: rule.cat, catId: rule.catId };
    }
  }
  return { cat: 'baby-clothing', catId: 'cat-01' }; // default
}

// ── Brand mapping ──────────────────────────────────────────────────────────────
const BRAND_MAP = {
  'CH ':       'br-04', // Chicco
  'CHICCO':    'br-04',
  'HIM ':      'br-08', // Himalaya
  'HIMALAYA':  'br-08',
  "JOHNSON":   'br-07',
  'JB ':       'br-07',
  'PIGEON':    'br-06',
  'LUVLAP':    'br-14',
  'AUTOFLOW':  'br-15',
  'PAMPERS':   'br-16',
  'MAMY POKO': 'br-17',
  'DABUR':     'br-18',
  'MORISONS':  'br-19',
  'SEBAMED':   'br-20',
  'CERELAC':   'br-21',
  'LACTOGEN':  'br-21',
  'APTAMIL':   'br-22',
  'MM ':       'br-23',
  'NUBY':      'br-12',
};

function getBrand(name) {
  const upper = name.toUpperCase();
  for (const [key, id] of Object.entries(BRAND_MAP)) {
    if (upper.startsWith(key) || upper.includes(key)) return id;
  }
  return 'br-01'; // MyBaby Originals
}

// ── Image mapping ──────────────────────────────────────────────────────────────
// Map product keywords to available images in the download folder
const IMAGE_FOLDER_MAP = [
  { keys: ['CRADEL','CRADLE'],  folder: null, subfolder: 'Cradle 1' },
  { keys: ['CH BUDS'],          folder: 'CH BUDS', file: 'CH BUDS.webp' },
  { keys: ['CH BODY WASH'],     folder: 'CH BODY WASH 200L', file: '1.webp' },
  { keys: ['CH GLASS BOTTLE'],  folder: null, file: 'CH GLASS BOTTLE BLUE 2+M 240ML.webp' },
  { keys: ['CH MANUAL BREAST'], folder: 'CH MANUAL BREAST PUMP 1999', file: 'CH MANUAL BREAST PUMP 1999.webp' },
  { keys: ['CH POWDER'],        folder: 'CH POWDER 75G 99RS', file: 'CH POWDER 75G 99RS.webp' },
  { keys: ['CH SOAP GLYCERIN'], folder: 'CH SOAP GLYCERIN 75GM 75GM FRONT', file: 'CH SOAP GLYCERIN 75GM 75GM FRONT.jpg' },
  { keys: ['CH SOAP'],          folder: null, file: 'CH SOAP 125G.webp' },
  { keys: ['CH SOOTHER COMFERT 0-6M BLU','CH SOOTHER COMFORT 0-6M'], folder: null, file: 'CH SOOTHER COMFERT 0-6M BLU 1PC.webp' },
  { keys: ['CH SOOTHER COMFERT 6-16M','CH SOOTHER COMFORT 6-16M BLU'], folder: null, file: 'CH SOOTHER COMFERT 6-16M BLU 1N.webp' },
  { keys: ['CH SOOTHER COMFORT 0-6M PINK'], folder: null, file: 'CH SOOTHER COMFORT 0-6M PINK 1N.webp' },
  { keys: ['CH SOOTHER COMFORT 6-16M PINK'], folder: null, file: 'CH SOOTHER COMFORT 6-16M PINK 1N.webp' },
  { keys: ['HIM BABY POWDER 400'],  folder: 'HIM BABY POWDER 400GM 400GM', file: 'HIM BABY POWDER 400GM 400GM.jpg' },
  { keys: ['HIMALAYA BABY POWDER 200', 'HIM BABY POWDER 200'], folder: 'HIMALAYA Baby powder 200g', file: '1.webp' },
  { keys: ['HIMALAYA BABY POWDER','HIM BABY POWDER 100','HIM BABY POWDER 50'], folder: 'HIMALAYA Baby powder', file: '1.webp' },
  { keys: ['HIM COCOA BUTTER'], folder: null, file: 'HIM COCOA BUTTER LOTION 200ML 200ML.jpg' },
  { keys: ['CAROLINA HERRERA','CH BODY LOTION 500'], folder: null, file: 'CH BADY LOTION 500ML.webp' },
  { keys: ['BABY PANTS','DIAPER PANTS'], folder: null, file: 'baby-pants-l-9.webp' },
];

function findImageSrc(productName) {
  const upper = productName.toUpperCase();
  for (const rule of IMAGE_FOLDER_MAP) {
    if (rule.keys.some(k => upper.includes(k.toUpperCase()))) {
      if (rule.subfolder) return path.join(IMAGES_SRC, rule.subfolder, '1.jpg');
      if (rule.folder)    return path.join(IMAGES_SRC, rule.folder, rule.file);
      if (rule.file)      return path.join(IMAGES_SRC, rule.file);
    }
  }
  return null;
}

// ── Copy image to frontend/public/images/ ─────────────────────────────────────
function copyImage(srcPath, destCategory, safeFilename) {
  if (!srcPath || !fs.existsSync(srcPath)) return null;
  const ext  = path.extname(srcPath).toLowerCase();
  const dest = path.join(IMAGES_DEST, destCategory);
  fs.mkdirSync(dest, { recursive: true });
  const destFile = path.join(dest, safeFilename + ext);
  fs.copyFileSync(srcPath, destFile);
  return `/images/${destCategory}/${safeFilename}${ext}`;
}

// ── Slugify ────────────────────────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function escSql(str) {
  if (!str) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log('📖 Reading Excel...');
  const wb   = XLSX.readFile(path.join(ROOT, 'BABY SHOP STOCK PACHBANGLA 2026 - Copy.xlsx'));
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

  // Row index 1 = headers, data starts row 3 (index 3)
  const products = rows.slice(3)
    .filter(r => r[1] && String(r[1]).trim())
    .map((r, i) => ({
      srno:     i + 1,
      name:     String(r[1]).trim(),
      quantity: r[2] ? parseInt(r[2]) : 0,
      mrp:      r[3] ? parseFloat(String(r[3]).replace(/[₹,\s]/g, '')) : 0,
    }));

  console.log(`✅ Found ${products.length} products`);

  const sqlLines = [];
  const slugsSeen = new Set();
  let skuCounter  = 3000;
  let copied = 0, notFound = 0;

  sqlLines.push('-- ============================================================');
  sqlLines.push('-- MY BABY STORE — Products from Excel + Images');
  sqlLines.push(`-- Generated: ${new Date().toISOString()}`);
  sqlLines.push('-- ============================================================');
  sqlLines.push('SET FOREIGN_KEY_CHECKS = 0;');
  sqlLines.push('');

  // Extra brands needed
  sqlLines.push("INSERT IGNORE INTO `brands` (`id`,`name`,`slug`,`description`,`isFeatured`,`isActive`,`createdAt`,`updatedAt`) VALUES");
  sqlLines.push("('br-14','LuvLap','luvlap','Premium baby products by LuvLap',0,1,NOW(),NOW()),");
  sqlLines.push("('br-15','AutoFlow','autoflow','Premium baby products by AutoFlow',0,1,NOW(),NOW()),");
  sqlLines.push("('br-16','Pampers','pampers','Premium diapers by Pampers',1,1,NOW(),NOW()),");
  sqlLines.push("('br-17','Mamy Poko','mamy-poko','Premium diapers by Mamy Poko',0,1,NOW(),NOW()),");
  sqlLines.push("('br-18','Dabur Baby','dabur-baby','Ayurvedic baby care by Dabur',0,1,NOW(),NOW()),");
  sqlLines.push("('br-19','Morisons Baby','morisons-baby','Baby products by Morisons',0,1,NOW(),NOW()),");
  sqlLines.push("('br-20','Sebamed','sebamed','Dermatological baby care by Sebamed',1,1,NOW(),NOW()),");
  sqlLines.push("('br-21','Nestle Baby','nestle-baby','Nestlé infant nutrition products',1,1,NOW(),NOW()),");
  sqlLines.push("('br-22','Aptamil','aptamil','Premium infant formula by Aptamil',0,1,NOW(),NOW()),");
  sqlLines.push("('br-23','Minisoul','minisoul','Organic baby products by Minisoul',0,1,NOW(),NOW());");
  sqlLines.push('');

  const productInserts  = [];
  const categoryInserts = [];
  const variantInserts  = [];
  const inventoryInserts= [];
  const imageInserts    = [];

  for (const p of products) {
    const { cat, catId } = getCategory(p.name);
    const brandId        = getBrand(p.name);

    // Unique slug
    let baseSlug = slugify(p.name);
    if (!baseSlug) baseSlug = `product-${p.srno}`;
    let finalSlug = baseSlug;
    let attempt   = 1;
    while (slugsSeen.has(finalSlug)) { finalSlug = `${baseSlug}-${++attempt}`; }
    slugsSeen.add(finalSlug);

    const id   = uuid();
    const sku  = `MB-${++skuCounter}`;
    const price= p.mrp > 0 ? p.mrp : null;
    const qty  = p.quantity > 0 ? p.quantity : 10;

    // Try to copy image
    const imgSrc = findImageSrc(p.name);
    let imgUrl   = null;
    if (imgSrc) {
      const safeFile = `${sku.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
      imgUrl = copyImage(imgSrc, cat, safeFile);
      if (imgUrl) copied++;
      else notFound++;
    } else {
      notFound++;
    }

    // Product INSERT
    productInserts.push(
      `(${escSql(id)},${escSql(p.name)},${escSql(finalSlug)},${escSql(p.name)},${escSql(sku)},${escSql(brandId)},'ACTIVE',0,0,0,'[]',NOW(),NOW())`
    );

    // Category link
    categoryInserts.push(`(${escSql(id)},${escSql(catId)},1)`);

    // Variant
    const vid = uuid();
    const priceVal = price || 99;
    variantInserts.push(
      `(${escSql(vid)},${escSql(id)},'Default',${escSql(sku+'-1')},${priceVal},NULL,1,1,'{}',NOW(),NOW())`
    );

    // Inventory
    inventoryInserts.push(`(${escSql(uuid())},${escSql(vid)},${qty},0,5,NOW())`);

    // Image
    if (imgUrl) {
      imageInserts.push(`(${escSql(uuid())},${escSql(id)},${escSql(imgUrl)},${escSql(p.name)},1,0,NOW())`);
    }
  }

  // Write in batches of 200
  const batch = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  for (const chunk of batch(productInserts, 200)) {
    sqlLines.push('INSERT INTO `products` (`id`,`name`,`slug`,`description`,`sku`,`brandId`,`status`,`isFeatured`,`isBestseller`,`isNew`,`tags`,`createdAt`,`updatedAt`) VALUES');
    sqlLines.push(chunk.join(',\n') + ';');
    sqlLines.push('');
  }

  for (const chunk of batch(categoryInserts, 500)) {
    sqlLines.push('INSERT IGNORE INTO `product_categories` (`productId`,`categoryId`,`isPrimary`) VALUES');
    sqlLines.push(chunk.join(',\n') + ';');
    sqlLines.push('');
  }

  for (const chunk of batch(variantInserts, 200)) {
    sqlLines.push('INSERT INTO `product_variants` (`id`,`productId`,`name`,`sku`,`price`,`comparePrice`,`isDefault`,`isActive`,`attributes`,`createdAt`,`updatedAt`) VALUES');
    sqlLines.push(chunk.join(',\n') + ';');
    sqlLines.push('');
  }

  for (const chunk of batch(inventoryInserts, 500)) {
    sqlLines.push('INSERT INTO `inventory` (`id`,`variantId`,`quantity`,`reservedQuantity`,`lowStockAlert`,`updatedAt`) VALUES');
    sqlLines.push(chunk.join(',\n') + ';');
    sqlLines.push('');
  }

  if (imageInserts.length) {
    for (const chunk of batch(imageInserts, 200)) {
      sqlLines.push('INSERT INTO `product_images` (`id`,`productId`,`url`,`altText`,`isPrimary`,`sortOrder`,`createdAt`) VALUES');
      sqlLines.push(chunk.join(',\n') + ';');
      sqlLines.push('');
    }
  }

  sqlLines.push('SET FOREIGN_KEY_CHECKS = 1;');
  sqlLines.push('');
  sqlLines.push(`-- Done: ${products.length} products inserted`);
  sqlLines.push(`-- Images copied: ${copied}, without image: ${notFound}`);

  fs.writeFileSync(SQL_OUT, sqlLines.join('\n'), 'utf8');

  console.log(`\n✅ Done!`);
  console.log(`   Products:       ${products.length}`);
  console.log(`   Images copied:  ${copied}`);
  console.log(`   Without image:  ${notFound}`);
  console.log(`   SQL file:       products-seed.sql`);
  console.log(`\n📌 Next steps:`);
  console.log(`   1. Run products-seed.sql in phpMyAdmin`);
  console.log(`   2. git add frontend/public/images && git push`);
}

main().catch(console.error);
