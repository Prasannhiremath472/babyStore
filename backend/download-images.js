/**
 * Auto-download product images from Flipkart search
 * Run: node download-images.js
 *
 * Searches Flipkart for each product, downloads first image result
 * Saves to frontend/public/images/{category}/
 */
const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const XLSX   = require('xlsx');
const { v4: uuid } = require('uuid');

const DEST   = path.join(__dirname, '..', 'frontend', 'public', 'images');
const XL     = path.join(__dirname, '..', 'BABY SHOP STOCK PACHBANGLA 2026 - Copy.xlsx');
const OUTLOG = path.join(__dirname, '..', 'download-log.json');

// Products already having images — skip these
const ALREADY_HAS_IMAGE = new Set([
  'CRADEL 1','CRADEL 2','CRADEL 3','CRADEL 4','CRADEL 5','CRADEL 6','CRADEL 7','CRADEL 8',
  'LUV LAP BREAST PUMP MANUAL 799','LUV LAP CAR SEAT CUM CARRYCOT','LUV LAP CARRIER GALAXY 1N',
  'LUV LAP HIGHCHAIR WITH WHEEL','LUV LAP WOODEN COT C-90 1PCS','LUV LAP WOODEN COT C-80 18999 1PCS',
  'LUV TRAVEL BED NEST 1PCS','LUV LAP FEEDER PLAIN 2PC 250ML','LUVLAP BREAST PUMP ELECTRIC ADORA 1PC',
  'LUVLAP FEEDER FLOWER PRINT 125ML','LUVLAP FEEDER FLOWER PRINT 250ML',
  'LUVLAP FEEDER JUNGLE PRINT 125ML','LUVLAP FEEDER JUNGLE PRINT 250ML',
  'LUVLAP BABY TOOTHPASTE BUBBLE FRUIT 100GM','LUVLAP BABY TOOTHPASTE BUBBLE FRUIT 50GM',
  'CH BODY WASH 200ML','CH BUDS','CH POWDER 75G 99RS','CH SOAP 125G','CH SOAP GLYCERIN 75GM',
  'CH TOOTHBRUSH BLUE 6-36M 1PCS','CH TOOTHBRUSH BLUE 3-8 YEARS 1N','CH TOOTHBRUSH ORANGE 3-8 YEAR 1N',
  'CH TOOTHBRUSH PINK 3-8 YEARS 1N','CH TOOTHPASTE MILD MINT 50GM','CH TOOTHPASTE MIXFRUIT 50G',
  'CH BABY ANTI MOSQUITO GEL 100ML','CHICCO ANTI MOSQUITO PATCHES 24PCS',
  'CH BODY LOTION 500ML','CAROLINA HERRERA CH BODY LOTION 200ML',
  'CH SOOTHER COMFORT 0-6M BLUE 1PC','CH SOOTHER COMFORT 6-16M BLUE 1N',
  'CH SOOTHER COMFORT 0-6M PINK 1N','CH SOOTHER COMFORT 6-16M PINK 1N','CHICCO SOOTHER PHYSIO BLUE 1N',
  'CH GLASS BOTTLE BLUE 2+M 240ML','CH MANUAL BREAST PUMP 1999','CH SPORT CUP 14+ 1PC',
  'CH STERINATURAL 3IN1 4299RS 1N','CH WB BOTTLE PINK PHYSIO 250ML','CH WB GLASS BOTTLE PINK 0+M 120ML',
  'CH WELLBEING TEAT 2M+ MEDIUM 139 1N','CH WELLBEING TEAT 4M+ FAST 139 1N','CH WELLBEING TEAT 6M+ FOOD 139 1N',
  'CHICCO BOTTLE FEED EASY BLUE 125ML','CHICCO FEEDEASY SLOW 0+ NIPPLE 1PCS',
  'CHICCO TRAVEL BOTTLE WARMER 1N','CHICO FEED EASY 2+M NIPPLE 1PCS',
  'HIM BABY POWDER 50GM','HIM BABY POWDER 100GM','HIM BABY POWDER 200GM','HIM BABY POWDER 400GM',
  'HIM COCOA BUTTER LOTION 200ML','HIM COLD BALM 10G','HIM CREME CLEANSING BABY BAR 75GM',
  'HIM CUCUMBER COCONUT SOAP 75G','HIM DIAPER RASH CREAM 20GM','HIM DIAPER RASH CREAM 50GM',
  'HIM GENTLE BABY SOAP 25GM','HIM GENTLE BABY WASH 100ML','HIM GENTLE BABY WASH 200ML',
  'HIM GENTLE BABY WIPES 12PCS','HIM GENTLE BABY WIPES 24PCS','HIM GENTLE BABY WIPES 72PCS',
  'HIM GENTLE BABY SHAMPOO 100ML','HIM GENTLE BABY SHAMPOO 200ML','HIM GENTLE BABY SHAMPOO 400ML',
  'HIM GENTLE SOAP 125GM','HIM EXT MOISTURIZING BABY SOAP 125GM','HIM EXT MOISTURIZING BABY SOAP 75GM',
  'HIM NOURISHING BABY SOAP 125GM','HIM NOURISHING BABY SOAP 75GM',
  'HIM REFRESHING BABY SOAP 75GM','HIM REFRESHING BABY SOAP 125GM',
  'HIMALAYA BABY MASSAGE OIL 200ML','HIMALAYA BABY MASSAGE OIL 50ML',
  'HIMALAYA BABY PANTS S 9PCS','HIMALAYA BABY RUB 15ML','HIM TOOTHPASTE KIDS BUBBLEGUM 80G',
  'JOHNSONS BABY BATH 100ML','JOHNSONS BABY BUDS 50 30N','JOHNSONS BABY HAIR OIL 100ML',
  'JOHNSONS BABY LOTION 200ML','JOHNSONS BABY LOTION 50ML',
  'JOHNSONS BABY OIL 50ML','JOHNSONS BABY OIL 100ML','JOHNSONS BABY OIL 200ML','JOHNSONS BABY OIL 500ML',
  'JOHNSONS BABY SHAMPOO 50ML','JOHNSONS BABY SHAMPOO 100ML','JOHNSONS BABY SHAMPOO 200ML','JOHNSONS BABY SHAMPOO 500ML',
  'JOHNSONS BABY SOAP MILK 75GM','JOHNSONS BABY SOAP 50GM','JOHNSONS BABY SOAP 75GM','JOHNSONS BABY SOAP 100GM',
  'JOHNSONS BABY POWDER 50GM','JOHNSONS BABY POWDER 100GM','JOHNSONS BABY POWDER 200GM',
  'JOHNSONS BABY POWDER BLOSSOM 100GM','JOHNSONS BABY POWDER BLOSSOM 50GM',
  'JOHNSONS KIDS SHAMPOO CF 100ML','JOHNSONS KIDS SHAMPOO CF 200ML',
  'JOHNSONS MILK RICE LOTION 100ML','JOHNSONS MILK RICE LOTION 200ML',
  'JOHNSONS BABY GIFT SET 10PC','JOHNSONS BUDS 15N','JOHNSONS COTTON BUDS JAR 150N',
  'DABUR BABY SHAMPOO 60ML','DABUR BABY SOAP 50G','DABUR BABY WASH 60ML',
  'DABUR JANMA GHUNTI 30ML','DABUR JANMA GHUNTI 60ML','DABUR LAL TAIL 200ML','DABUR BABY GIFT PACK',
  'LACTOGEN 1 REFILL 400G','LACTOGEN 2 REFILL PACK 400G','LACTOGEN 3 REFILL 400G','LACTOGEN 4 REFILL 400G',
  'BABY SOAP 75G','BABY POWDER 200G','BABY PANTS L','JOJO BABY DRESS','51 INFANT WEAR 1',
]);

// Category mapping
const getCat = (name) => {
  const u = name.toUpperCase();
  if (/INFANT WEAR|LANGOT|NAPPY|WRAPPER|FROCK|ROMPER|SUIT|FRILL|JABLA|KURTA|PYJAMA|DUNGAREE|BABA|CAP |MITTEN|SOCK|BOOTIE|BIB /.test(u)) return 'baby-clothing';
  if (/PAMPERS|MAMY POKO|DIAPER PANT|SOOO GOOD|PANTS S|PANTS M|PANTS L|PANTS XL/.test(u)) return 'diapers-wipes';
  if (/BOTTLE|FEEDER|NIPPLE|TEAT|SIPPER|STRAW|BREAST PUMP|BREAST PAD|BOWL|SPOON|STERIL|WARMER|HIGH CHAIR|LACTOGEN|CERELAC|APTAMIL|DEXOLAC|NAN PRO|NESTUM|KHICH|RAGI|FORMULA/.test(u)) return 'feeding-essentials';
  if (/SOAP|SHAMPOO|LOTION|OIL |POWDER|CREAM|WASH|RASH|BODY WASH|BUDS|TOOTHPASTE|TOOTHBRUSH|TONGUE|NAIL|NASAL|GROOMING|THERMOM|DROPPER|ASPIRAT|MOSQUITO|BALM|MASSAGE|HAIR OIL|WIPE/.test(u)) return 'bath-skin-care';
  if (/TOY|RATTLE|TEETHER|MUSICAL|BALL|PUZZLE|BLOCK|GYM|PLAY MAT/.test(u)) return 'toys-games';
  if (/CRADEL|CRADLE|COT |WOODEN COT|STROLLER|PRAM|ROCKER|BLANKET|PILLOW|MATTRESS|NET |BED |CAR SEAT|TRAVEL BED/.test(u)) return 'nursery';
  if (/BAG|BACKPACK|CARRIER|SLING|HANGER|BELT|CORSET|MONITOR|SAFETY|GATE/.test(u)) return 'baby-gear';
  if (/BREAST PAD|NURSING PAD|MATERNITY/.test(u)) return 'maternity';
  if (/THERMOMETER|MEDICINE|DROPPER|ASPIRATOR|NAIL CLIP|SCISSOR|POTTY/.test(u)) return 'health-safety';
  return 'baby-clothing';
};

// Clean product name for search
const cleanSearch = (name) => {
  return name
    .replace(/\d+ML|\d+GM|\d+G\b|\d+KG|\d+PC[S]?|\d+N\b|\d+MG/gi, '')
    .replace(/\b\d+\b/g, '')
    .replace(/[-\/\\]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .substring(0, 50);
};

// Fetch with timeout + redirect follow
const fetchUrl = (url, timeout = 10000) => new Promise((resolve, reject) => {
  const mod = url.startsWith('https') ? https : http;
  const req = mod.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
      'Accept': 'text/html,application/xhtml+xml,*/*',
      'Accept-Language': 'en-IN,en;q=0.9',
    },
    timeout,
  }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return fetchUrl(res.headers.location, timeout).then(resolve).catch(reject);
    }
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
  });
  req.on('error', reject);
  req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
});

// Download binary file
const downloadFile = (url, destPath, timeout = 15000) => new Promise((resolve, reject) => {
  const mod = url.startsWith('https') ? https : http;
  const req = mod.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' },
    timeout,
  }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadFile(res.headers.location, destPath, timeout).then(resolve).catch(reject);
    }
    if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
    const ct = res.headers['content-type'] || '';
    if (!ct.includes('image')) return reject(new Error(`Not an image: ${ct}`));
    const file = fs.createWriteStream(destPath);
    res.pipe(file);
    file.on('finish', () => { file.close(); resolve(destPath); });
    file.on('error', reject);
  });
  req.on('error', reject);
  req.on('timeout', () => { req.destroy(); reject(new Error('download timeout')); });
});

// Search Flipkart and get first product image URL
async function searchFlipkart(productName) {
  const q = encodeURIComponent(cleanSearch(productName) + ' baby');
  const url = `https://www.flipkart.com/search?q=${q}&otracker=search`;
  try {
    const res = await fetchUrl(url, 12000);
    if (res.status !== 200) return null;
    // Extract first rukminim image URL
    const matches = res.body.match(/https:\/\/rukminim\d+\.flixcart\.com\/image\/[^\s"']+\.(?:jpeg|jpg|png|webp)[^"'\s]*/g);
    if (matches && matches.length > 0) {
      // Get highest quality version (replace thumbnail size with 500)
      return matches[0].replace(/\/\d+\/\d+\//, '/500/500/');
    }
    return null;
  } catch { return null; }
}

// Fallback: search Amazon
async function searchAmazon(productName) {
  const q = encodeURIComponent(cleanSearch(productName) + ' baby');
  const url = `https://www.amazon.in/s?k=${q}`;
  try {
    const res = await fetchUrl(url, 12000);
    if (res.status !== 200) return null;
    const matches = res.body.match(/https:\/\/m\.media-amazon\.com\/images\/[^\s"']+\.(?:jpg|jpeg|png)[^"'\s]*/g);
    if (matches && matches.length > 0) return matches[0];
    return null;
  } catch { return null; }
}

// Sleep helper
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  // Read Excel
  const wb   = XLSX.readFile(XL);
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header:1, defval:'' });
  const all  = rows.slice(3).filter(r => r[1]&&String(r[1]).trim()).map(r => ({
    name: String(r[1]).trim(),
    sku:  null,
  }));

  // Filter only those without images
  const toProcess = all.filter(p => !ALREADY_HAS_IMAGE.has(p.name));
  console.log(`\n🔍 Downloading images for ${toProcess.length} products...\n`);

  // Load previous log if exists
  let log = {};
  if (fs.existsSync(OUTLOG)) {
    try { log = JSON.parse(fs.readFileSync(OUTLOG,'utf8')); } catch {}
  }

  let done = 0, failed = 0, skipped = 0;
  const sqlImgLines = [];

  for (let i = 0; i < toProcess.length; i++) {
    const { name } = toProcess[i];

    // Skip if already downloaded in previous run
    if (log[name]?.status === 'ok') {
      skipped++;
      continue;
    }

    const cat      = getCat(name);
    const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').substring(0,50);
    const skuLike  = `dl-${String(i+1).padStart(4,'0')}`;
    const dir      = path.join(DEST, cat);
    fs.mkdirSync(dir, { recursive: true });

    // Try Flipkart first, then Amazon
    let imgUrl = await searchFlipkart(name);
    if (!imgUrl) imgUrl = await searchAmazon(name);

    if (!imgUrl) {
      console.log(`❌ [${i+1}/${toProcess.length}] NOT FOUND: ${name}`);
      log[name] = { status:'failed', reason:'no image found' };
      failed++;
      await sleep(500);
      continue;
    }

    // Determine extension from URL
    const extMatch = imgUrl.match(/\.(jpg|jpeg|png|webp)/i);
    const ext = extMatch ? '.'+extMatch[1].toLowerCase() : '.jpg';
    const filename  = `${skuLike}${ext}`;
    const destPath  = path.join(dir, filename);
    const webPath   = `/images/${cat}/${filename}`;

    try {
      await downloadFile(imgUrl, destPath);
      const size = fs.statSync(destPath).size;
      if (size < 1000) { // too small = probably error page
        fs.unlinkSync(destPath);
        throw new Error('File too small: ' + size);
      }
      console.log(`✅ [${i+1}/${toProcess.length}] ${name.substring(0,40).padEnd(42)} → ${cat}/${filename}`);
      log[name] = { status:'ok', path: webPath, src: imgUrl };
      sqlImgLines.push({ name, webPath });
      done++;
    } catch (e) {
      console.log(`❌ [${i+1}/${toProcess.length}] DOWNLOAD FAIL: ${name} — ${e.message}`);
      log[name] = { status:'failed', reason: e.message };
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      failed++;
    }

    // Save log every 10 products
    if ((i+1) % 10 === 0) {
      fs.writeFileSync(OUTLOG, JSON.stringify(log, null, 2));
      console.log(`\n   💾 Progress saved. Done:${done} Failed:${failed} Skipped:${skipped}\n`);
    }

    // Polite delay — 1.5s between requests to avoid rate limiting
    await sleep(1500);
  }

  // Final save
  fs.writeFileSync(OUTLOG, JSON.stringify(log, null, 2));

  // Generate SQL update for downloaded images
  if (sqlImgLines.length > 0) {
    const updateSql = ['-- UPDATE product images for downloaded products'];
    updateSql.push('-- Run in phpMyAdmin after running this script');
    updateSql.push('');
    for (const { name, webPath } of sqlImgLines) {
      const escaped = name.replace(/'/g,"''");
      updateSql.push(`INSERT IGNORE INTO \`product_images\` (\`id\`,\`productId\`,\`url\`,\`altText\`,\`isPrimary\`,\`sortOrder\`,\`createdAt\`)`);
      updateSql.push(`  SELECT UUID(), id, '${webPath}', '${escaped}', 1, 0, NOW() FROM \`products\` WHERE name = '${escaped}' LIMIT 1;`);
    }
    const sqlOut = path.join(__dirname,'..','downloaded-images.sql');
    fs.writeFileSync(sqlOut, updateSql.join('\n'), 'utf8');
    console.log(`\n📄 SQL generated: downloaded-images.sql (${sqlImgLines.length} image updates)`);
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Downloaded:  ${done}`);
  console.log(`❌ Failed:      ${failed}`);
  console.log(`⏭️  Skipped:     ${skipped}`);
  console.log(`📁 Images in:  frontend/public/images/`);
  console.log(`📄 Run downloaded-images.sql in phpMyAdmin`);
  console.log(`🔁 Re-run script to retry failed ones`);
}

main().catch(console.error);
