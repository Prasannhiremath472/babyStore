/**
 * Count products with and without images
 * Run: node count-missing-images.js
 */
const XLSX = require('xlsx');
const path = require('path');
const fs   = require('fs');

const XL = path.join(__dirname, '..', 'BABY SHOP STOCK PACHBANGLA 2026 - Copy.xlsx');

// These are the 132 products that HAVE real images (from import-products.js KNOWN array)
const WITH_IMAGES = new Set([
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

// Read Excel
const wb   = XLSX.readFile(XL);
const ws   = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header:1, defval:'' });
const all  = rows.slice(3).filter(r => r[1] && String(r[1]).trim()).map(r => String(r[1]).trim());

const withImg    = [];
const withoutImg = [];

for (const name of all) {
  if (WITH_IMAGES.has(name)) withImg.push(name);
  else withoutImg.push(name);
}

console.log('='.repeat(60));
console.log('PRODUCT IMAGE STATUS REPORT');
console.log('='.repeat(60));
console.log(`Total products:        ${all.length}`);
console.log(`✅ WITH images:         ${withImg.length}`);
console.log(`❌ WITHOUT images:      ${withoutImg.length}`);
console.log('');

// Group without-image products by category
const groups = {};
const catKeywords = [
  { label:'Infant Wear / Clothing', keys:['INFANT WEAR','LANGOT','NAPPY','WRAPPER','FROCK','ROMPER','SUIT','FRILL','JABLA','KURTA','PYJAMA','DUNGAREE','CAP ','MITTEN','SOCK','BOOTIE','BIB','JOJO','AB9'] },
  { label:'Diapers & Wipes',         keys:['PAMPERS','MAMY POKO','DIAPER','PANTS S','PANTS M','PANTS L','PANTS XL','SOOO GOOD','WIPES'] },
  { label:'Feeding / Bottles',       keys:['BOTTLE','FEEDER','NIPPLE','TEAT','SIPPER','STRAW','BREAST PUMP','BREAST PAD','BOWL','SPOON','STERIL','WARMER','HIGH CHAIR'] },
  { label:'Infant Formula / Food',   keys:['LACTOGEN','CERELAC','APTAMIL','DEXOLAC','NAN PRO','NESTUM','KHICH','RAGI','RICE CEREAL','WHEAT','FORMULA','OATS'] },
  { label:'Bath & Skin Care',        keys:['SOAP','SHAMPOO','LOTION','OIL ','POWDER','CREAM','WASH','RASH','BODY WASH','BUDS','TOOTHPASTE','TOOTHBRUSH','TONGUE','NAIL','NASAL','GROOMING','THERMOM','DROPPER','ASPIRAT','MOSQUITO','BALM','MASSAGE','HAIR OIL','WIPE'] },
  { label:'Toys & Games',            keys:['TOY','RATTLE','TEETHER','MUSICAL','BALL','PUZZLE','BLOCK','GYM','PLAY MAT'] },
  { label:'Nursery / Cradles',       keys:['CRADEL','CRADLE','COT ','WOODEN COT','STROLLER','PRAM','ROCKER','BLANKET','PILLOW','MATTRESS','NET ','BED ','CAR SEAT','TRAVEL BED'] },
  { label:'Baby Gear / Accessories', keys:['BAG','BACKPACK','CARRIER','SLING','HANGER','BELT','CORSET','MONITOR','SAFETY','GATE','GUARD'] },
  { label:'Health & Safety',         keys:['THERMOMETER','MEDICINE','DROPPER','ASPIRATOR','NAIL CLIP','SCISSOR','POTTY'] },
  { label:'Maternity',               keys:['BREAST PAD','NURSING PAD','MATERNITY','CORSET BELT'] },
];

for (const name of withoutImg) {
  const upper = name.toUpperCase();
  let found = false;
  for (const cat of catKeywords) {
    if (cat.keys.some(k => upper.includes(k))) {
      if (!groups[cat.label]) groups[cat.label] = [];
      groups[cat.label].push(name);
      found = true;
      break;
    }
  }
  if (!found) {
    if (!groups['Other']) groups['Other'] = [];
    groups['Other'].push(name);
  }
}

console.log('PRODUCTS WITHOUT IMAGES — by category:');
console.log('-'.repeat(60));
let total = 0;
for (const [cat, names] of Object.entries(groups).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`\n📦 ${cat} (${names.length} products):`);
  names.forEach(n => console.log(`   • ${n}`));
  total += names.length;
}
console.log('\n' + '='.repeat(60));
console.log(`TOTAL WITHOUT IMAGES: ${total}`);

// Save to file too
const report = [];
report.push('PRODUCTS WITHOUT IMAGES');
report.push(`Generated: ${new Date().toISOString()}`);
report.push(`Total without images: ${withoutImg.length} / ${all.length}`);
report.push('');
for (const [cat, names] of Object.entries(groups).sort((a,b) => b[1].length - a[1].length)) {
  report.push(`\n${cat} (${names.length}):`);
  names.forEach(n => report.push(`  ${n}`));
}
fs.writeFileSync(path.join(__dirname,'..','missing-images-report.txt'), report.join('\n'), 'utf8');
console.log('\n📄 Full report saved: missing-images-report.txt');
