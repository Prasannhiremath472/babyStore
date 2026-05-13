const router = require('express').Router();
const db     = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

router.post('/validate', authenticate, async (req, res) => {
  const { code, subtotal } = req.body;
  const [rows] = await db.query('SELECT * FROM coupons WHERE code = ? AND isActive = 1 AND startDate <= NOW() AND endDate >= NOW() AND deletedAt IS NULL', [code]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
  const c = rows[0];
  if (c.usageLimit && c.usedCount >= c.usageLimit) return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
  if (c.minOrderAmount && subtotal < c.minOrderAmount) return res.status(400).json({ success: false, message: `Minimum order ₹${c.minOrderAmount} required` });
  let discount = 0;
  if (c.discountType === 'PERCENTAGE') discount = Math.min((subtotal * c.discountValue) / 100, c.maxDiscountAmount || Infinity);
  else if (c.discountType === 'FLAT') discount = Math.min(c.discountValue, subtotal);
  else if (c.discountType === 'FREE_SHIPPING') discount = 49;
  res.json({ success: true, data: { code: c.code, discount: Math.round(discount), description: c.description } });
});

router.get('/', authenticate, isAdmin, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM coupons WHERE deletedAt IS NULL ORDER BY createdAt DESC');
  res.json({ success: true, data: rows });
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  const { code, description, discountType, discountValue, minOrderAmount, maxDiscountAmount, usageLimit, perUserLimit, startDate, endDate } = req.body;
  const id = uuid();
  await db.query('INSERT INTO coupons (id, code, description, discountType, discountValue, minOrderAmount, maxDiscountAmount, usageLimit, perUserLimit, isActive, startDate, endDate, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,1,?,?,NOW(),NOW())',
    [id, code, description, discountType, discountValue, minOrderAmount || null, maxDiscountAmount || null, usageLimit || null, perUserLimit || 1, startDate, endDate]);
  res.status(201).json({ success: true, data: { id } });
});

module.exports = router;
