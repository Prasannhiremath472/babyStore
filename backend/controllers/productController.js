const db   = require('../models/db');
const { v4: uuid } = require('uuid');

// GET /products
exports.list = async (req, res) => {
  const {
    page = 1, limit = 20, categoryId, brandId, search,
    isNew, isBestseller, hasDiscount, inStock, sortBy = 'newest',
    minPrice, maxPrice, ageGroup, status = 'ACTIVE'
  } = req.query;

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const params = [];
  let where = 'p.status = ? AND p.deletedAt IS NULL';
  params.push(status);

  if (categoryId) {
    // resolve slug → id
    const [catRows] = await db.query('SELECT id FROM categories WHERE slug = ? OR id = ?', [categoryId, categoryId]);
    if (catRows.length) {
      where += ' AND EXISTS (SELECT 1 FROM product_categories pc WHERE pc.productId = p.id AND pc.categoryId = ?)';
      params.push(catRows[0].id);
    }
  }
  if (brandId) { where += ' AND p.brandId = ?'; params.push(brandId); }
  if (ageGroup) { where += ' AND p.ageGroup = ?'; params.push(ageGroup); }
  if (isNew === 'true') { where += ' AND p.isNew = 1'; }
  if (isBestseller === 'true') { where += ' AND p.isBestseller = 1'; }
  if (hasDiscount === 'true') {
    where += ' AND EXISTS (SELECT 1 FROM product_variants pv WHERE pv.productId = p.id AND pv.comparePrice IS NOT NULL AND pv.comparePrice > pv.price)';
  }
  if (inStock === 'true') {
    where += ' AND EXISTS (SELECT 1 FROM product_variants pv JOIN inventory inv ON inv.variantId = pv.id WHERE pv.productId = p.id AND inv.quantity > 0)';
  }
  if (search) {
    where += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  if (minPrice) { where += ' AND EXISTS (SELECT 1 FROM product_variants pv WHERE pv.productId = p.id AND pv.price >= ?)'; params.push(minPrice); }
  if (maxPrice) { where += ' AND EXISTS (SELECT 1 FROM product_variants pv WHERE pv.productId = p.id AND pv.price <= ?)'; params.push(maxPrice); }

  const orderMap = {
    newest: 'p.createdAt DESC',
    price_asc: 'p.createdAt ASC',
    price_desc: 'p.createdAt DESC',
    popular: 'p.isBestseller DESC, p.createdAt DESC',
    name: 'p.name ASC',
  };
  const order = orderMap[sortBy] || 'p.createdAt DESC';

  const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM products p WHERE ${where}`, params);

  const [products] = await db.query(
    `SELECT p.id, p.name, p.slug, p.shortDescription, p.sku, p.isFeatured, p.isBestseller, p.isNew,
            p.ageGroup, p.tags, p.createdAt,
            b.name as brandName, b.id as brandId,
            (SELECT url FROM product_images WHERE productId = p.id AND isPrimary = 1 LIMIT 1) as imageUrl,
            (SELECT price FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as price,
            (SELECT comparePrice FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as comparePrice,
            (SELECT id FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as variantId,
            (SELECT AVG(rating) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as averageRating,
            (SELECT COUNT(*) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as reviewCount
     FROM products p
     LEFT JOIN brands b ON b.id = p.brandId
     WHERE ${where}
     ORDER BY ${order}
     LIMIT ? OFFSET ?`,
    [...params, parseInt(limit), offset]
  );

  const totalPages = Math.ceil(total / parseInt(limit));
  res.json({
    success: true,
    products: products.map(p => ({
      ...p,
      brand: p.brandId ? { id: p.brandId, name: p.brandName } : null,
      images: p.imageUrl ? [{ url: p.imageUrl, isPrimary: true }] : [],
      variants: p.variantId ? [{ id: p.variantId, price: p.price, comparePrice: p.comparePrice, isDefault: true }] : [],
      averageRating: parseFloat(p.averageRating) || 0,
      reviewCount: parseInt(p.reviewCount) || 0,
    })),
    meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages, hasNext: parseInt(page) < totalPages, hasPrev: parseInt(page) > 1 },
  });
};

// GET /products/featured
exports.getFeatured = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  // Try featured first, fall back to latest active products with images
  let [products] = await db.query(
    `SELECT p.id, p.name, p.slug, p.sku, p.isBestseller, p.isNew, p.ageGroup,
            b.name as brandName, b.id as brandId,
            (SELECT url FROM product_images WHERE productId = p.id AND isPrimary = 1 LIMIT 1) as imageUrl,
            (SELECT price FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as price,
            (SELECT comparePrice FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as comparePrice,
            (SELECT id FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as variantId,
            (SELECT AVG(rating) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as averageRating,
            (SELECT COUNT(*) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as reviewCount
     FROM products p LEFT JOIN brands b ON b.id = p.brandId
     WHERE p.isFeatured = 1 AND p.status = 'ACTIVE' AND p.deletedAt IS NULL
     ORDER BY p.createdAt DESC LIMIT ?`, [limit]
  );
  // Fallback: return products that have images
  if (!products.length) {
    [products] = await db.query(
      `SELECT p.id, p.name, p.slug, p.sku, p.isBestseller, p.isNew, p.ageGroup,
              b.name as brandName, b.id as brandId,
              (SELECT url FROM product_images WHERE productId = p.id AND isPrimary = 1 LIMIT 1) as imageUrl,
              (SELECT price FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as price,
              (SELECT comparePrice FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as comparePrice,
              (SELECT id FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as variantId,
              (SELECT AVG(rating) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as averageRating,
              (SELECT COUNT(*) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as reviewCount
       FROM products p LEFT JOIN brands b ON b.id = p.brandId
       WHERE p.status = 'ACTIVE' AND p.deletedAt IS NULL
         AND EXISTS (SELECT 1 FROM product_images pi WHERE pi.productId = p.id AND pi.isPrimary = 1)
         AND EXISTS (SELECT 1 FROM product_variants pv WHERE pv.productId = p.id AND pv.isDefault = 1)
       ORDER BY p.createdAt DESC LIMIT ?`, [limit]
    );
  }
  res.json({ success: true, data: products.map(formatProduct) });
};

// GET /products/bestsellers
exports.getBestsellers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  let [products] = await db.query(
    `SELECT p.id, p.name, p.slug, p.sku, p.isBestseller, p.isNew, p.ageGroup,
            b.name as brandName, b.id as brandId,
            (SELECT url FROM product_images WHERE productId = p.id AND isPrimary = 1 LIMIT 1) as imageUrl,
            (SELECT price FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as price,
            (SELECT comparePrice FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as comparePrice,
            (SELECT id FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as variantId,
            (SELECT AVG(rating) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as averageRating,
            (SELECT COUNT(*) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as reviewCount
     FROM products p LEFT JOIN brands b ON b.id = p.brandId
     WHERE p.isBestseller = 1 AND p.status = 'ACTIVE' AND p.deletedAt IS NULL
     ORDER BY p.createdAt DESC LIMIT ?`, [limit]
  );
  // Fallback: return products with images ordered by newest
  if (!products.length) {
    [products] = await db.query(
      `SELECT p.id, p.name, p.slug, p.sku, p.isBestseller, p.isNew, p.ageGroup,
              b.name as brandName, b.id as brandId,
              (SELECT url FROM product_images WHERE productId = p.id AND isPrimary = 1 LIMIT 1) as imageUrl,
              (SELECT price FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as price,
              (SELECT comparePrice FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as comparePrice,
              (SELECT id FROM product_variants WHERE productId = p.id AND isDefault = 1 LIMIT 1) as variantId,
              (SELECT AVG(rating) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as averageRating,
              (SELECT COUNT(*) FROM reviews WHERE productId = p.id AND status = 'APPROVED') as reviewCount
       FROM products p LEFT JOIN brands b ON b.id = p.brandId
       WHERE p.status = 'ACTIVE' AND p.deletedAt IS NULL
         AND EXISTS (SELECT 1 FROM product_images pi WHERE pi.productId = p.id AND pi.isPrimary = 1)
         AND EXISTS (SELECT 1 FROM product_variants pv WHERE pv.productId = p.id AND pv.isDefault = 1)
       ORDER BY RAND() LIMIT ?`, [limit]
    );
  }
  res.json({ success: true, data: products.map(formatProduct) });
};

// GET /products/slug/:slug
exports.getBySlug = async (req, res) => {
  const [rows] = await db.query(
    `SELECT p.*, b.name as brandName FROM products p LEFT JOIN brands b ON b.id = p.brandId
     WHERE p.slug = ? AND p.deletedAt IS NULL`, [req.params.slug]
  );
  if (!rows.length) return res.status(404).json({ success: false, message: 'Product not found' });
  const p = rows[0];
  const [variants]   = await db.query('SELECT pv.*, inv.quantity, inv.reservedQuantity FROM product_variants pv LEFT JOIN inventory inv ON inv.variantId = pv.id WHERE pv.productId = ? AND pv.isActive = 1', [p.id]);
  const [images]     = await db.query('SELECT * FROM product_images WHERE productId = ? ORDER BY sortOrder', [p.id]);
  const [attributes] = await db.query('SELECT * FROM product_attributes WHERE productId = ? ORDER BY sortOrder', [p.id]);
  const [categories] = await db.query('SELECT c.id, c.name, c.slug, pc.isPrimary FROM product_categories pc JOIN categories c ON c.id = pc.categoryId WHERE pc.productId = ?', [p.id]);
  const [reviews]    = await db.query('SELECT r.*, u.firstName, u.lastName FROM reviews r JOIN users u ON u.id = r.userId WHERE r.productId = ? AND r.status = "APPROVED" ORDER BY r.createdAt DESC LIMIT 10', [p.id]);
  res.json({ success: true, data: { ...p, brand: p.brandId ? { id: p.brandId, name: p.brandName } : null, variants, images, attributes, categories, reviews } });
};

// GET /products/:id
exports.getById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ? AND deletedAt IS NULL', [req.params.id]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: rows[0] });
};

// POST /products (admin)
exports.create = async (req, res) => {
  const { name, description, shortDescription, brandId, categoryIds, primaryCategoryId, sku, tags, ageGroup, status, isFeatured, isBestseller, isNew, variants } = req.body;
  if (!name || !sku) return res.status(400).json({ success: false, message: 'name and sku are required' });
  const slugVal = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  const id = uuid();
  await db.query(
    'INSERT INTO products (id, name, slug, description, shortDescription, sku, brandId, status, isFeatured, isBestseller, isNew, tags, ageGroup, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())',
    [id, name, slugVal, description || null, shortDescription || null, sku, brandId || null, status || 'ACTIVE', isFeatured ? 1 : 0, isBestseller ? 1 : 0, isNew ? 1 : 0, JSON.stringify(tags || []), ageGroup || null]
  );
  if (categoryIds?.length) {
    for (const catId of categoryIds) {
      await db.query('INSERT INTO product_categories (productId, categoryId, isPrimary) VALUES (?,?,?)', [id, catId, catId === primaryCategoryId ? 1 : 0]);
    }
  }
  if (variants?.length) {
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const vid = uuid();
      await db.query('INSERT INTO product_variants (id, productId, name, sku, price, comparePrice, isDefault, isActive, attributes, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,1,?,NOW(),NOW())', [vid, id, v.name, v.sku, v.price, v.comparePrice || null, i === 0 ? 1 : 0, JSON.stringify(v.attributes || {})]);
      await db.query('INSERT INTO inventory (id, variantId, quantity, reservedQuantity, lowStockAlert, updatedAt) VALUES (?,?,?,0,10,NOW())', [uuid(), vid, v.stock || 0]);
    }
  }
  res.status(201).json({ success: true, message: 'Product created', data: { id } });
};

// PUT /products/:id (admin)
exports.update = async (req, res) => {
  const { name, description, shortDescription, brandId, status, isFeatured, isBestseller, isNew, tags, ageGroup } = req.body;
  await db.query(
    'UPDATE products SET name=?, description=?, shortDescription=?, brandId=?, status=?, isFeatured=?, isBestseller=?, isNew=?, tags=?, ageGroup=?, updatedAt=NOW() WHERE id=?',
    [name, description, shortDescription, brandId, status, isFeatured ? 1 : 0, isBestseller ? 1 : 0, isNew ? 1 : 0, JSON.stringify(tags || []), ageGroup, req.params.id]
  );
  res.json({ success: true, message: 'Product updated' });
};

// DELETE /products/:id (admin)
exports.remove = async (req, res) => {
  await db.query('UPDATE products SET deletedAt = NOW() WHERE id = ?', [req.params.id]);
  res.json({ success: true, message: 'Product deleted' });
};

const formatProduct = (p) => ({
  ...p,
  brand: p.brandId ? { id: p.brandId, name: p.brandName } : null,
  images: p.imageUrl ? [{ url: p.imageUrl, isPrimary: true }] : [],
  variants: p.variantId ? [{ id: p.variantId, price: p.price, comparePrice: p.comparePrice, isDefault: true }] : [],
  averageRating: parseFloat(p.averageRating) || 0,
  reviewCount: parseInt(p.reviewCount) || 0,
});
