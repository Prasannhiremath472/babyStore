const db   = require('../models/db');
const { v4: uuid } = require('uuid');

// GET /users/addresses
exports.getAddresses = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM addresses WHERE userId = ? ORDER BY isDefault DESC, createdAt DESC', [req.user.id]);
  res.json({ success: true, data: rows });
};

// POST /users/addresses
exports.addAddress = async (req, res) => {
  const { label, firstName, lastName, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
  if (!firstName || !phone || !addressLine1 || !city || !state || !pincode)
    return res.status(400).json({ success: false, message: 'All required fields must be provided' });

  if (isDefault) await db.query('UPDATE addresses SET isDefault = 0 WHERE userId = ?', [req.user.id]);
  const id = uuid();
  await db.query(
    'INSERT INTO addresses (id, userId, label, firstName, lastName, phone, addressLine1, addressLine2, city, state, pincode, isDefault, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())',
    [id, req.user.id, label || 'Home', firstName, lastName, phone, addressLine1, addressLine2 || null, city, state, pincode, isDefault ? 1 : 0]
  );
  const [rows] = await db.query('SELECT * FROM addresses WHERE id = ?', [id]);
  res.status(201).json({ success: true, data: rows[0] });
};

// DELETE /users/addresses/:id
exports.deleteAddress = async (req, res) => {
  await db.query('DELETE FROM addresses WHERE id = ? AND userId = ?', [req.params.id, req.user.id]);
  res.json({ success: true });
};

// GET /users/wishlist
exports.getWishlist = async (req, res) => {
  const [rows] = await db.query(
    `SELECT w.id, w.productId, w.createdAt, p.name, p.slug,
            (SELECT url FROM product_images WHERE productId = w.productId AND isPrimary = 1 LIMIT 1) as imageUrl,
            (SELECT price FROM product_variants WHERE productId = w.productId AND isDefault = 1 LIMIT 1) as price
     FROM wishlists w JOIN products p ON p.id = w.productId WHERE w.userId = ? ORDER BY w.createdAt DESC`, [req.user.id]
  );
  res.json({ success: true, data: rows });
};

// POST /users/wishlist
exports.toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  const [existing] = await db.query('SELECT id FROM wishlists WHERE userId = ? AND productId = ?', [req.user.id, productId]);
  if (existing.length) {
    await db.query('DELETE FROM wishlists WHERE id = ?', [existing[0].id]);
    return res.json({ success: true, wishlisted: false });
  }
  await db.query('INSERT INTO wishlists (id, userId, productId, createdAt) VALUES (?,?,?,NOW())', [uuid(), req.user.id, productId]);
  res.json({ success: true, wishlisted: true });
};

// PUT /users/profile
exports.updateProfile = async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  await db.query('UPDATE users SET firstName = ?, lastName = ?, phone = ?, updatedAt = NOW() WHERE id = ?', [firstName, lastName, phone, req.user.id]);
  res.json({ success: true, message: 'Profile updated' });
};

// Admin: GET /users/admin/all
exports.adminAll = async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = "role = 'CUSTOMER' AND deletedAt IS NULL";
  const params = [];
  if (search) { where += ' AND (email LIKE ? OR firstName LIKE ? OR phone LIKE ?)'; const s = `%${search}%`; params.push(s, s, s); }
  const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM users WHERE ${where}`, params);
  const [users] = await db.query(`SELECT id, firstName, lastName, email, phone, status, loyaltyPoints, createdAt FROM users WHERE ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
  res.json({ success: true, data: users, meta: { total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) } });
};
