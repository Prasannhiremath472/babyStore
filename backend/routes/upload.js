const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const db      = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

// ── Storage config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, '..', 'uploads', req.body.folder || 'misc');
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
  if (allowed.test(path.extname(file.originalname))) cb(null, true);
  else cb(new Error('Only image files allowed (jpg, jpeg, png, gif, webp)'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// ── POST /api/v1/upload/product-image ─────────────────────────────────────────
// Body (form-data):
//   image     — file field
//   productId — product UUID
//   folder    — optional subfolder name (default: "products")
//   isPrimary — "true" / "false"
router.post('/product-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });

  const { productId, isPrimary = 'false', folder = 'products' } = req.body;
  const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;
  const url     = `${baseUrl}/uploads/${folder}/${req.file.filename}`;

  if (productId) {
    // If marking as primary, unset existing primary first
    if (isPrimary === 'true') {
      await db.query('UPDATE product_images SET isPrimary = 0 WHERE productId = ?', [productId]);
    }
    const [existing] = await db.query('SELECT COUNT(*) as cnt FROM product_images WHERE productId = ?', [productId]);
    const sortOrder  = existing[0].cnt;

    await db.query(
      'INSERT INTO product_images (id, productId, url, altText, isPrimary, sortOrder, createdAt) VALUES (?,?,?,?,?,?,NOW())',
      [uuid(), productId, url, req.body.altText || null, isPrimary === 'true' ? 1 : (sortOrder === 0 ? 1 : 0), sortOrder]
    );
  }

  res.json({ success: true, url, filename: req.file.filename });
});

// ── POST /api/v1/upload/multiple ──────────────────────────────────────────────
// Upload up to 10 images at once
router.post('/multiple', authenticate, isAdmin, upload.array('images', 10), async (req, res) => {
  if (!req.files || !req.files.length) return res.status(400).json({ success: false, message: 'No images uploaded' });

  const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;
  const folder  = req.body.folder || 'products';

  const urls = req.files.map(f => ({
    url:      `${baseUrl}/uploads/${folder}/${f.filename}`,
    filename: f.filename,
    size:     f.size,
  }));

  res.json({ success: true, urls });
});

// ── POST /api/v1/upload/category-image ────────────────────────────────────────
router.post('/category-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });

  const { categoryId, folder = 'categories' } = req.body;
  const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;
  const url     = `${baseUrl}/uploads/${folder}/${req.file.filename}`;

  if (categoryId) {
    await db.query('UPDATE categories SET image = ?, updatedAt = NOW() WHERE id = ?', [url, categoryId]);
  }

  res.json({ success: true, url, filename: req.file.filename });
});

// ── POST /api/v1/upload/banner-image ──────────────────────────────────────────
router.post('/banner-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });

  const { folder = 'banners' } = req.body;
  const baseUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`;
  const url     = `${baseUrl}/uploads/${folder}/${req.file.filename}`;

  res.json({ success: true, url, filename: req.file.filename });
});

// ── DELETE /api/v1/upload/product-image/:imageId ──────────────────────────────
router.delete('/product-image/:imageId', authenticate, isAdmin, async (req, res) => {
  const [rows] = await db.query('SELECT url FROM product_images WHERE id = ?', [req.params.imageId]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Image not found' });

  // Delete physical file
  try {
    const urlPath  = new URL(rows[0].url).pathname;           // /uploads/products/xxx.jpg
    const filePath = path.join(__dirname, '..', urlPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {}

  await db.query('DELETE FROM product_images WHERE id = ?', [req.params.imageId]);
  res.json({ success: true, message: 'Image deleted' });
});

module.exports = router;
