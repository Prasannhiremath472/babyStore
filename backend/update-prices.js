/**
 * Extract prices embedded in product names and generate SQL to update them
 * Run: node update-prices.js
 */
const XLSX = require('xlsx');
const path = require('path');
const fs   = require('fs');

const XL  = path.join(__dirname, '..', 'BABY SHOP STOCK PACHBANGLA 2026 - Copy.xlsx');
const OUT = path.join(__dirname, '..', 'update-prices.sql');

const wb   = XLSX.readFile(XL);
const ws   = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header:1, defval:'' });
const all  = rows.slice(3).filter(r => r[1] && String(r[1]).trim()).map(r => ({
  name: String(r[1]).trim(),
  qty:  r[2] ? parseInt(r[2]) : null,
}));

// Price extraction patterns from product names:
// "99/-"  "1999/-"  "(3799/-)"  "99/- "
const extractPrice = (name) => {
  // Pattern 1: (3799/-)
  let m = name.match(/\((\d{2,5})\s*\/-\)/);
  if (m) return parseInt(m[1]);
  // Pattern 2: 1999/- or 99/-
  m = name.match(/[\s](\d{2,5})\s*\/-/);
  if (m) return parseInt(m[1]);
  return null;
};

const esc = s => "'"+String(s).replace(/'/g,"''")+"'";

const sql = [];
sql.push('-- ============================================================');
sql.push('-- UPDATE PRODUCT PRICES extracted from product names in Excel');
sql.push(`-- Generated: ${new Date().toISOString()}`);
sql.push('-- ============================================================');
sql.push('');

let count = 0;
const updated = [];

for (const p of all) {
  const price = extractPrice(p.name);
  if (!price) continue;

  const escaped = p.name.replace(/'/g, "''");
  sql.push(`-- ${p.name} → ₹${price}`);
  sql.push(`UPDATE \`product_variants\``);
  sql.push(`  SET price = ${price}, updatedAt = NOW()`);
  sql.push(`  WHERE productId = (SELECT id FROM \`products\` WHERE name = '${escaped}' LIMIT 1);`);
  sql.push('');
  updated.push({ name: p.name, price });
  count++;
}

// Also update qty where available
sql.push('-- ============================================================');
sql.push('-- UPDATE QUANTITIES from Excel');
sql.push('-- ============================================================');
sql.push('');
for (const p of all) {
  if (!p.qty || p.qty <= 0) continue;
  const escaped = p.name.replace(/'/g, "''");
  sql.push(`UPDATE \`inventory\``);
  sql.push(`  SET quantity = ${p.qty}, updatedAt = NOW()`);
  sql.push(`  WHERE variantId = (`);
  sql.push(`    SELECT pv.id FROM \`product_variants\` pv`);
  sql.push(`    JOIN \`products\` p ON p.id = pv.productId`);
  sql.push(`    WHERE p.name = '${escaped}' LIMIT 1`);
  sql.push(`  );`);
  sql.push('');
}

fs.writeFileSync(OUT, sql.join('\n'), 'utf8');

console.log('='.repeat(50));
console.log('PRICE UPDATE REPORT');
console.log('='.repeat(50));
console.log(`Products with price in name: ${count}`);
console.log('');
console.log('Sample prices extracted:');
updated.slice(0, 30).forEach(p => {
  console.log(`  ₹${String(p.price).padStart(5)}  ${p.name}`);
});
if (updated.length > 30) console.log(`  ... and ${updated.length - 30} more`);
console.log('');
console.log(`✅ SQL saved: update-prices.sql`);
console.log(`   Run this in phpMyAdmin to update ${count} product prices`);
