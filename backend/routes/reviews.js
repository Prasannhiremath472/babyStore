const router = require('express').Router();
const db     = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/product/:productId', async (req, res) => {
  const [rows] = await db.query(
    'SELECT r.*, u.firstName, u.lastName FROM reviews r JOIN users u ON u.id = r.userId WHERE r.productId = ? AND r.status = "APPROVED" ORDER BY r.createdAt DESC LIMIT 20',
    [req.params.productId]
  );
  res.json({ success: true, data: rows });
});

router.post('/', authenticate, async (req, res) => {
  const { productId, rating, title, body } = req.body;
  const [existing] = await db.query('SELECT id FROM reviews WHERE productId = ? AND userId = ?', [productId, req.user.id]);
  if (existing.length) return res.status(409).json({ success: false, message: 'Already reviewed' });
  const id = uuid();
  await db.query('INSERT INTO reviews (id, productId, userId, rating, title, body, status, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
    [id, productId, req.user.id, rating, title || null, body || null, 'PENDING']);
  res.status(201).json({ success: true, message: 'Review submitted for approval' });
});

router.patch('/:id/approve', authenticate, isAdmin, async (req, res) => {
  await db.query('UPDATE reviews SET status = "APPROVED", updatedAt = NOW() WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
