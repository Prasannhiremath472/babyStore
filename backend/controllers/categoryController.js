const db   = require('../models/db');
const { v4: uuid } = require('uuid');

exports.list = async (req, res) => {
  const [rows] = await db.query(
    `SELECT c.*, COUNT(pc.productId) as productCount
     FROM categories c
     LEFT JOIN product_categories pc ON pc.categoryId = c.id
     WHERE c.isActive = 1 AND c.deletedAt IS NULL
     GROUP BY c.id ORDER BY c.sortOrder ASC`
  );
  res.json({ success: true, data: rows });
};

exports.getBySlug = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE slug = ? AND isActive = 1', [req.params.slug]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Category not found' });
  res.json({ success: true, data: rows[0] });
};

exports.create = async (req, res) => {
  const { name, description, icon, parentId, sortOrder, isFeatured } = req.body;
  const slugVal = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  const id = uuid();
  await db.query('INSERT INTO categories (id, name, slug, description, icon, parentId, sortOrder, isFeatured, isActive, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,1,NOW(),NOW())',
    [id, name, slugVal, description || null, icon || null, parentId || null, sortOrder || 0, isFeatured ? 1 : 0]);
  res.status(201).json({ success: true, data: { id } });
};

exports.update = async (req, res) => {
  const { name, description, icon, sortOrder, isFeatured, isActive } = req.body;
  await db.query('UPDATE categories SET name=?, description=?, icon=?, sortOrder=?, isFeatured=?, isActive=?, updatedAt=NOW() WHERE id=?',
    [name, description, icon, sortOrder, isFeatured ? 1 : 0, isActive ? 1 : 0, req.params.id]);
  res.json({ success: true, message: 'Category updated' });
};

exports.remove = async (req, res) => {
  await db.query('UPDATE categories SET deletedAt = NOW() WHERE id = ?', [req.params.id]);
  res.json({ success: true, message: 'Category deleted' });
};
