require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://mybabystore.net',
  'https://www.mybabystore.net',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (process.env.NODE_ENV !== 'production') return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (/^https?:\/\/([a-z0-9-]+\.)*mybabystore\.net(:\d+)?$/.test(origin)) return cb(null, true);
    console.warn('CORS blocked:', origin);
    cb(null, true); // allow all during initial deploy
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.options('*', cors());

// ── Security & Parsing ────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Static files (product images) ─────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'My Baby API', env: process.env.NODE_ENV, time: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/v1/auth',        require('./routes/auth'));
app.use('/api/v1/products',    require('./routes/products'));
app.use('/api/v1/categories',  require('./routes/categories'));
app.use('/api/v1/brands',      require('./routes/brands'));
app.use('/api/v1/banners',     require('./routes/banners'));
app.use('/api/v1/cart',        require('./routes/cart'));
app.use('/api/v1/orders',      require('./routes/orders'));
app.use('/api/v1/users',       require('./routes/users'));
app.use('/api/v1/reviews',     require('./routes/reviews'));
app.use('/api/v1/coupons',     require('./routes/coupons'));
app.use('/api/v1/analytics',   require('./routes/analytics'));
app.use('/api/v1/admin',       require('./routes/admin'));

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ My Baby API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   DB_NAME: ${process.env.DB_NAME || 'not set'}`);
});
