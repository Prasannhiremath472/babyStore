const fs = require('fs');
const path = require('path');

const sqlFile = path.join(__dirname, '..', 'products-seed.sql');
let sql = fs.readFileSync(sqlFile, 'utf8');

// 1. Replace INSERT INTO with INSERT IGNORE INTO for all product tables
sql = sql.replace(/INSERT INTO `products`/g,          'INSERT IGNORE INTO `products`');
sql = sql.replace(/INSERT INTO `product_variants`/g,  'INSERT IGNORE INTO `product_variants`');
sql = sql.replace(/INSERT INTO `inventory`/g,         'INSERT IGNORE INTO `inventory`');
sql = sql.replace(/INSERT INTO `product_images`/g,    'INSERT IGNORE INTO `product_images`');

// 2. Add cleanup block right after SET FOREIGN_KEY_CHECKS = 0;
const cleanup = `
-- ============================================================
-- CLEANUP: remove previous MB- products to avoid duplicates
-- ============================================================
DELETE FROM \`product_images\`    WHERE productId IN (SELECT id FROM (SELECT id FROM \`products\` WHERE sku LIKE 'MB-%') t);
DELETE FROM \`inventory\`         WHERE variantId IN (SELECT id FROM (SELECT id FROM \`product_variants\` WHERE sku LIKE 'MB-%-1' OR sku LIKE 'MB-%-2') t);
DELETE FROM \`product_variants\`  WHERE sku LIKE 'MB-%';
DELETE FROM \`product_categories\` WHERE productId IN (SELECT id FROM (SELECT id FROM \`products\` WHERE sku LIKE 'MB-%') t);
DELETE FROM \`products\`          WHERE sku LIKE 'MB-%';

`;

sql = sql.replace('SET FOREIGN_KEY_CHECKS = 0;\n', 'SET FOREIGN_KEY_CHECKS = 0;\n' + cleanup);

fs.writeFileSync(sqlFile, sql, 'utf8');
console.log('✅ products-seed.sql fixed:');
console.log('   - Added cleanup to remove old MB- products');
console.log('   - Changed INSERT INTO → INSERT IGNORE INTO');
console.log('   - Re-run this file in phpMyAdmin');
