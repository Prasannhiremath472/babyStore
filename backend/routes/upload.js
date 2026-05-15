const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const db      = require('../models/db');
const { v4: uuid } = require('uuid');
const { authenticate, isAdmin } = require('../middleware/auth');

// ── Resolve frontend public/images path ───────────────────────────────────────
// On Hostinger: backend and frontend are siblings in the same parent directory
// Structure:  /home/.../backend/   and   /home/.../frontend/public/images/
// Locally:    d:\babyStore\backend\  and  d:\babyStore\frontend\public\images\
const FRONTEND_IMAGES_PATH = process.env.FRONTEND_IMAGES_PATH
  || path.join(__dirname, '..', '..', 'frontend', 'public', 'images');

// Base URL for the frontend (images served from here)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

// ── Multer storage — saves to frontend/public/images/{folder}/ ─────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'products';
    const dest   = path.join(FRONTEND_IMAGES_PATH, folder);
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed: jpg, jpeg, png, gif, webp'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper — build public URL from folder + filename
// Returns: /images/products/filename.jpg  (relative, served by frontend)
const makeUrl = (folder, filename) => `/images/${folder}/${filename}`;

// ── POST /api/v1/upload/product-image ─────────────────────────────────────────
// form-data fields: image(file), productId, folder, isPrimary, altText
router.post('/product-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image file received' });

  const { productId, folder = 'products', isPrimary = 'false', altText = '' } = req.body;
  const url = makeUrl(folder, req.file.filename);

  if (productId) {
    const [countRow] = await db.query('SELECT COUNT(*) as cnt FROM product_images WHERE productId = ?', [productId]);
    const sortOrder  = countRow[0].cnt;
    const primary    = isPrimary === 'true' || sortOrder === 0 ? 1 : 0;

    if (primary) {
      await db.query('UPDATE product_images SET isPrimary = 0 WHERE productId = ?', [productId]);
    }

    await db.query(
      'INSERT INTO product_images (id, productId, url, altText, isPrimary, sortOrder, createdAt) VALUES (?,?,?,?,?,?,NOW())',
      [uuid(), productId, url, altText, primary, sortOrder]
    );
  }

  res.json({ success: true, url, fullUrl: `${FRONTEND_URL}${url}`, filename: req.file.filename });
});

// ── POST /api/v1/upload/multiple ─────────────────────────────────────────────
// form-data: images[](files), folder, productId
router.post('/multiple', authenticate, isAdmin, upload.array('images', 10), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ success: false, message: 'No images received' });

  const { folder = 'products', productId } = req.body;
  const results = [];

  for (let i = 0; i < req.files.length; i++) {
    const f   = req.files[i];
    const url = makeUrl(folder, f.filename);

    if (productId) {
      const [countRow] = await db.query('SELECT COUNT(*) as cnt FROM product_images WHERE productId = ?', [productId]);
      const sortOrder  = countRow[0].cnt;
      const primary    = sortOrder === 0 ? 1 : 0;

      await db.query(
        'INSERT INTO product_images (id, productId, url, altText, isPrimary, sortOrder, createdAt) VALUES (?,?,?,?,?,?,NOW())',
        [uuid(), productId, url, f.originalname, primary, sortOrder]
      );
    }

    results.push({ url, fullUrl: `${FRONTEND_URL}${url}`, filename: f.filename });
  }

  res.json({ success: true, urls: results });
});

// ── POST /api/v1/upload/category-image ────────────────────────────────────────
router.post('/category-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image received' });

  const { categoryId, folder = 'categories' } = req.body;
  const url = makeUrl(folder, req.file.filename);

  if (categoryId) {
    await db.query('UPDATE categories SET image = ?, updatedAt = NOW() WHERE id = ?', [url, categoryId]);
  }

  res.json({ success: true, url, fullUrl: `${FRONTEND_URL}${url}` });
});

// ── POST /api/v1/upload/banner-image ──────────────────────────────────────────
router.post('/banner-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image received' });

  const { folder = 'banners' } = req.body;
  const url = makeUrl(folder, req.file.filename);

  res.json({ success: true, url, fullUrl: `${FRONTEND_URL}${url}` });
});

// ── POST /api/v1/upload/hero-image ────────────────────────────────────────────
router.post('/hero-image', authenticate, isAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No image received' });

  const url = makeUrl('hero', req.file.filename);
  res.json({ success: true, url, fullUrl: `${FRONTEND_URL}${url}` });
});

// ── DELETE /api/v1/upload/product-image/:imageId ──────────────────────────────
router.delete('/product-image/:imageId', authenticate, isAdmin, async (req, res) => {
  const [rows] = await db.query('SELECT url FROM product_images WHERE id = ?', [req.params.imageId]);
  if (!rows.length) return res.status(404).json({ success: false, message: 'Image not found' });

  // Delete physical file from frontend/public/images/
  try {
    const filePath = path.join(FRONTEND_IMAGES_PATH, rows[0].url.replace('/images/', ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (e) {
    console.warn('Could not delete file:', e.message);
  }

  await db.query('DELETE FROM product_images WHERE id = ?', [req.params.imageId]);
  res.json({ success: true, message: 'Image deleted' });
});

// ── GET /api/v1/upload/check ──────────────────────────────────────────────────
// Verify the images folder path is correct
router.get('/check', authenticate, isAdmin, (req, res) => {
  const exists = fs.existsSync(FRONTEND_IMAGES_PATH);
  res.json({
    success: true,
    frontendImagesPath: FRONTEND_IMAGES_PATH,
    pathExists: exists,
    frontendUrl: FRONTEND_URL,
  });
});

module.exports = router;
