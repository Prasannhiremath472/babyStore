const router = require('express').Router();
const db     = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { type } = req.query;
  let where = 'isActive = 1';
  const params = [];
  if (type) { where += ' AND type = ?'; params.push(type); }
  const [rows] = await db.query(`SELECT * FROM banners WHERE ${where} ORDER BY sortOrder ASC`, params);
  res.json({ success: true, data: rows });
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  const { title, subtitle, image, link, type, sortOrder } = req.body;
  const id = uuid();
  await db.query('INSERT INTO banners (id, title, subtitle, image, link, type, isActive, sortOrder, createdAt, updatedAt) VALUES (?,?,?,?,?,?,1,?,NOW(),NOW())',
    [id, title, subtitle || null, image, link || null, type || 'HERO', sortOrder || 0]);
  res.status(201).json({ success: true, data: { id } });
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  await db.query('DELETE FROM banners WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;
