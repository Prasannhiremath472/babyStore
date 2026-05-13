const db      = require('../models/db');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { sendOTP } = require('../utils/mailer');

const JWT_SECRET         = process.env.JWT_SECRET          || 'mybaby-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET  || 'mybaby-refresh-secret';
const JWT_EXPIRES        = process.env.JWT_EXPIRES_IN      || '15m';
const JWT_REFRESH_EXPIRES= process.env.JWT_REFRESH_EXPIRES_IN || '7d';

const otpStore = new Map(); // { email: { otp, expires } }

// ── Generate tokens ────────────────────────────────────────────────────────────
const makeTokens = (user) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken  = jwt.sign(payload, JWT_SECRET,         { expiresIn: JWT_EXPIRES });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES });
  return { accessToken, refreshToken };
};

// POST /auth/register
exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !email || !password)
    return res.status(400).json({ success: false, message: 'firstName, email and password are required' });

  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length) return res.status(409).json({ success: false, message: 'Email already registered' });

  const hash = await bcrypt.hash(password, 12);
  const id   = uuid();
  await db.query(
    'INSERT INTO users (id, firstName, lastName, email, phone, passwordHash, role, status, emailVerified, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,NOW(),NOW())',
    [id, firstName, lastName, email, phone || null, hash, 'CUSTOMER', 'ACTIVE', 1]
  );
  // create wallet + cart
  await db.query('INSERT INTO wallets (id, userId, balance, createdAt, updatedAt) VALUES (?,?,0,NOW(),NOW())', [uuid(), id]);
  await db.query('INSERT INTO carts   (id, userId, createdAt, updatedAt)           VALUES (?,?,NOW(),NOW())',   [uuid(), id]);

  const user = { id, firstName, lastName, email, phone: phone || null, role: 'CUSTOMER' };
  const tokens = makeTokens(user);
  res.status(201).json({ success: true, message: 'Account created', data: { user, ...tokens } });
};

// POST /auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' });

  const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND deletedAt IS NULL', [email]);
  if (!rows.length) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const user = rows[0];
  if (user.status === 'BANNED') return res.status(403).json({ success: false, message: 'Account banned' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  await db.query('UPDATE users SET lastLoginAt = NOW() WHERE id = ?', [user.id]);

  const safeUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, role: user.role, avatar: user.avatar };
  const tokens = makeTokens(safeUser);
  res.json({ success: true, message: 'Login successful', data: { user: safeUser, ...tokens } });
};

// POST /auth/refresh
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ success: false, message: 'Refresh token required' });
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const [rows] = await db.query('SELECT id, firstName, lastName, email, phone, role FROM users WHERE id = ?', [decoded.id]);
    if (!rows.length) return res.status(401).json({ success: false, message: 'User not found' });
    const tokens = makeTokens(rows[0]);
    res.json({ success: true, data: tokens });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

// POST /auth/send-otp
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
  await sendOTP(email, otp);
  res.json({ success: true, message: 'OTP sent to ' + email });
};

// POST /auth/verify-otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);
  if (!record || record.otp !== otp || Date.now() > record.expires)
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  otpStore.delete(email);
  res.json({ success: true, message: 'OTP verified' });
};

// GET /auth/me
exports.me = async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, firstName, lastName, email, phone, role, avatar, loyaltyPoints, createdAt FROM users WHERE id = ?',
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: rows[0] });
};
