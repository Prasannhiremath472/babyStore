const router = require('express').Router();
const db     = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM brands WHERE isActive = 1 AND deletedAt IS NULL ORDER BY sortOrder ASC');
  res.json({ success: true, data: rows });
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  const { name, description, isFeatured } = req.body;
  const slugVal = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const id = uuid();
  await db.query('INSERT INTO brands (id, name, slug, description, isFeatured, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,1,NOW(),NOW())', [id, name, slugVal, description || null, isFeatured ? 1 : 0]);
  res.status(201).json({ success: true, data: { id } });
});

module.exports = router;
