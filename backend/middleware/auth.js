const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mybaby-secret-key';

// Verify JWT token
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Admin only
const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
  if (!['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Access denied — admin only' });
  }
  next();
};

// Optional auth (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      req.user = jwt.verify(token, JWT_SECRET);
    }
  } catch {}
  next();
};

module.exports = { authenticate, isAdmin, optionalAuth };
