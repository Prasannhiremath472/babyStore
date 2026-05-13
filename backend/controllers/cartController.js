const db   = require('../models/db');
const { v4: uuid } = require('uuid');

const getOrCreateCart = async (userId) => {
  const [rows] = await db.query('SELECT id FROM carts WHERE userId = ?', [userId]);
  if (rows.length) return rows[0].id;
  const id = uuid();
  await db.query('INSERT INTO carts (id, userId, createdAt, updatedAt) VALUES (?,?,NOW(),NOW())', [id, userId]);
  return id;
};

// GET /cart
exports.get = async (req, res) => {
  const cartId = await getOrCreateCart(req.user.id);
  const [items] = await db.query(
    `SELECT ci.id, ci.quantity, ci.productId, ci.variantId,
            p.name as productName, p.slug,
            pv.name as variantName, pv.price, pv.comparePrice, pv.sku,
            (SELECT url FROM product_images WHERE productId = ci.productId AND isPrimary = 1 LIMIT 1) as imageUrl,
            inv.quantity as stock
     FROM cart_items ci
     JOIN products p ON p.id = ci.productId
     JOIN product_variants pv ON pv.id = ci.variantId
     LEFT JOIN inventory inv ON inv.variantId = ci.variantId
     WHERE ci.cartId = ?`, [cartId]
  );
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
  res.json({ success: true, data: { id: cartId, items, subtotal, itemCount: items.reduce((s, i) => s + i.quantity, 0) } });
};

// POST /cart/items
exports.addItem = async (req, res) => {
  const { productId, variantId, quantity = 1 } = req.body;
  if (!productId || !variantId) return res.status(400).json({ success: false, message: 'productId and variantId required' });
  const cartId = await getOrCreateCart(req.user.id);

  const [existing] = await db.query('SELECT id, quantity FROM cart_items WHERE cartId = ? AND variantId = ?', [cartId, variantId]);
  if (existing.length) {
    await db.query('UPDATE cart_items SET quantity = quantity + ?, updatedAt = NOW() WHERE id = ?', [quantity, existing[0].id]);
  } else {
    await db.query('INSERT INTO cart_items (id, cartId, productId, variantId, quantity, createdAt, updatedAt) VALUES (?,?,?,?,?,NOW(),NOW())', [uuid(), cartId, productId, variantId, quantity]);
  }
  await db.query('UPDATE carts SET updatedAt = NOW() WHERE id = ?', [cartId]);

  const [items] = await db.query('SELECT COUNT(*) as count, SUM(quantity) as total FROM cart_items WHERE cartId = ?', [cartId]);
  res.json({ success: true, data: { itemCount: parseInt(items[0].total) || 0 } });
};

// PATCH /cart/items/:itemId
exports.updateItem = async (req, res) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    await db.query('DELETE FROM cart_items WHERE id = ?', [req.params.itemId]);
  } else {
    await db.query('UPDATE cart_items SET quantity = ?, updatedAt = NOW() WHERE id = ?', [quantity, req.params.itemId]);
  }
  res.json({ success: true });
};

// DELETE /cart/items/:itemId
exports.removeItem = async (req, res) => {
  await db.query('DELETE FROM cart_items WHERE id = ?', [req.params.itemId]);
  res.json({ success: true });
};

// DELETE /cart/clear
exports.clear = async (req, res) => {
  const cartId = await getOrCreateCart(req.user.id);
  await db.query('DELETE FROM cart_items WHERE cartId = ?', [cartId]);
  res.json({ success: true });
};
