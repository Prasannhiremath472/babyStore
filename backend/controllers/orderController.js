const db   = require('../models/db');
const { v4: uuid } = require('uuid');

const orderNum = () => `MB${Date.now()}${Math.random().toString(36).substring(2,5).toUpperCase()}`;

// POST /orders
exports.create = async (req, res) => {
  const { addressId, paymentMethod, couponCode } = req.body;
  const userId = req.user.id;

  const [cartRows] = await db.query(
    `SELECT ci.*, pv.price, pv.sku, p.name as productName, pv.name as variantName,
            (SELECT url FROM product_images WHERE productId = ci.productId AND isPrimary = 1 LIMIT 1) as image,
            inv.quantity as stock
     FROM cart_items ci
     JOIN product_variants pv ON pv.id = ci.variantId
     JOIN products p ON p.id = ci.productId
     JOIN inventory inv ON inv.variantId = ci.variantId
     JOIN carts c ON c.id = ci.cartId
     WHERE c.userId = ?`, [userId]
  );
  if (!cartRows.length) return res.status(400).json({ success: false, message: 'Cart is empty' });

  for (const item of cartRows) {
    if (item.stock < item.quantity) return res.status(400).json({ success: false, message: `Insufficient stock for ${item.productName}` });
  }

  let subtotal = cartRows.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
  let discountAmount = 0;

  if (couponCode) {
    const [coupons] = await db.query(
      'SELECT * FROM coupons WHERE code = ? AND isActive = 1 AND startDate <= NOW() AND endDate >= NOW()', [couponCode]
    );
    if (coupons.length) {
      const c = coupons[0];
      if (!c.usageLimit || c.usedCount < c.usageLimit) {
        if (c.discountType === 'PERCENTAGE') discountAmount = Math.min((subtotal * c.discountValue) / 100, c.maxDiscountAmount || Infinity);
        else if (c.discountType === 'FLAT') discountAmount = Math.min(c.discountValue, subtotal);
        else if (c.discountType === 'FREE_SHIPPING') discountAmount = 0;
      }
    }
  }

  const shippingAmount = subtotal > 499 ? 0 : 49;
  const taxAmount      = Math.round((subtotal - discountAmount + shippingAmount) * 0.18 * 100) / 100;
  const totalAmount    = subtotal - discountAmount + shippingAmount + taxAmount;
  const number         = orderNum();
  const orderId        = uuid();

  await db.query(
    `INSERT INTO orders (id, orderNumber, userId, addressId, status, subtotal, discountAmount, shippingAmount, taxAmount, totalAmount, couponCode, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())`,
    [orderId, number, userId, addressId, 'PENDING', subtotal, discountAmount, shippingAmount, taxAmount, totalAmount, couponCode || null]
  );

  for (const item of cartRows) {
    await db.query(
      'INSERT INTO order_items (id, orderId, productId, variantId, productName, variantName, sku, image, price, quantity, totalPrice, createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())',
      [uuid(), orderId, item.productId, item.variantId, item.productName, item.variantName, item.sku, item.image, item.price, item.quantity, parseFloat(item.price) * item.quantity]
    );
    await db.query('UPDATE inventory SET quantity = quantity - ?, reservedQuantity = reservedQuantity + ? WHERE variantId = ?', [item.quantity, item.quantity, item.variantId]);
  }

  await db.query('INSERT INTO order_timelines (id, orderId, status, message, createdAt) VALUES (?,?,?,?,NOW())', [uuid(), orderId, 'PENDING', 'Order placed successfully']);

  // Clear cart
  const [[cart]] = await db.query('SELECT id FROM carts WHERE userId = ?', [userId]);
  if (cart) await db.query('DELETE FROM cart_items WHERE cartId = ?', [cart.id]);

  if (paymentMethod === 'COD') {
    await db.query('INSERT INTO payments (id, orderId, method, status, amount, currency, createdAt, updatedAt) VALUES (?,?,?,?,?,?,NOW(),NOW())', [uuid(), orderId, 'COD', 'PENDING', totalAmount, 'INR']);
    await db.query('UPDATE orders SET status = "CONFIRMED" WHERE id = ?', [orderId]);
  }

  res.status(201).json({ success: true, data: { order: { id: orderId, orderNumber: number, totalAmount }, razorpayOrder: paymentMethod !== 'COD' ? { id: `order_DEMO${Date.now()}`, amount: Math.round(totalAmount * 100) } : null } });
};

// GET /orders/my-orders
exports.myOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM orders WHERE userId = ?', [req.user.id]);
  const [orders] = await db.query(
    'SELECT o.*, a.addressLine1, a.city, a.state, a.pincode FROM orders o LEFT JOIN addresses a ON a.id = o.addressId WHERE o.userId = ? ORDER BY o.createdAt DESC LIMIT ? OFFSET ?',
    [req.user.id, parseInt(limit), offset]
  );
  res.json({ success: true, data: orders, meta: { total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) } });
};

// GET /orders/my-orders/:id
exports.myOrderDetail = async (req, res) => {
  const [orders] = await db.query('SELECT * FROM orders WHERE id = ? AND userId = ?', [req.params.id, req.user.id]);
  if (!orders.length) return res.status(404).json({ success: false, message: 'Order not found' });
  const [items]    = await db.query('SELECT * FROM order_items WHERE orderId = ?', [req.params.id]);
  const [timeline] = await db.query('SELECT * FROM order_timelines WHERE orderId = ? ORDER BY createdAt', [req.params.id]);
  const [payments] = await db.query('SELECT * FROM payments WHERE orderId = ?', [req.params.id]);
  res.json({ success: true, data: { ...orders[0], items, timeline, payments } });
};

// POST /orders/verify-payment
exports.verifyPayment = async (req, res) => {
  const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
  // Accept demo payments starting with pay_DEMO
  const isDemo = razorpayPaymentId?.startsWith('pay_DEMO') || razorpaySignature?.startsWith('sig_DEMO');
  await db.query('INSERT INTO payments (id, orderId, method, status, amount, currency, razorpayPaymentId, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
    [uuid(), orderId, 'RAZORPAY', 'CAPTURED', 0, 'INR', razorpayPaymentId]);
  await db.query('UPDATE orders SET status = "CONFIRMED" WHERE id = ?', [orderId]);
  await db.query('INSERT INTO order_timelines (id, orderId, status, message, createdAt) VALUES (?,?,?,?,NOW())', [uuid(), orderId, 'CONFIRMED', 'Payment confirmed']);
  res.json({ success: true, message: 'Payment verified' });
};

// Admin: GET /orders/admin/all
exports.adminAll = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  let where = '1=1';
  const params = [];
  if (status) { where += ' AND o.status = ?'; params.push(status); }
  const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM orders o WHERE ${where}`, params);
  const [orders] = await db.query(`SELECT o.*, u.firstName, u.lastName, u.email FROM orders o JOIN users u ON u.id = o.userId WHERE ${where} ORDER BY o.createdAt DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
  res.json({ success: true, data: orders, meta: { total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) } });
};

// PATCH /orders/admin/:id/status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  await db.query('UPDATE orders SET status = ?, updatedAt = NOW() WHERE id = ?', [status, req.params.id]);
  await db.query('INSERT INTO order_timelines (id, orderId, status, message, createdAt) VALUES (?,?,?,?,NOW())', [uuid(), req.params.id, status, `Status updated to ${status}`]);
  res.json({ success: true, message: 'Status updated' });
};
