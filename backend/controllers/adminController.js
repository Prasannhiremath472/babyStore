const db = require('../models/db');

// GET /admin/dashboard
exports.dashboard = async (req, res) => {
  const [[{ totalOrders }]]   = await db.query("SELECT COUNT(*) as totalOrders FROM orders WHERE status != 'CANCELLED'");
  const [[{ totalRevenue }]]  = await db.query("SELECT COALESCE(SUM(totalAmount),0) as totalRevenue FROM orders WHERE status IN ('CONFIRMED','SHIPPED','DELIVERED')");
  const [[{ totalCustomers }]]= await db.query("SELECT COUNT(*) as totalCustomers FROM users WHERE role = 'CUSTOMER' AND status = 'ACTIVE'");
  const [[{ totalProducts }]] = await db.query("SELECT COUNT(*) as totalProducts FROM products WHERE status = 'ACTIVE' AND deletedAt IS NULL");
  const [[{ pendingOrders }]] = await db.query("SELECT COUNT(*) as pendingOrders FROM orders WHERE status = 'PENDING'");
  const [[{ lowStock }]]      = await db.query("SELECT COUNT(*) as lowStock FROM inventory WHERE quantity <= lowStockAlert");

  const [recentOrders] = await db.query(
    `SELECT o.id, o.orderNumber, o.totalAmount, o.status, o.createdAt,
            u.firstName, u.lastName, u.email
     FROM orders o JOIN users u ON u.id = o.userId
     ORDER BY o.createdAt DESC LIMIT 5`
  );

  const [monthlyRevenue] = await db.query(
    `SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, SUM(totalAmount) as revenue, COUNT(*) as orders
     FROM orders WHERE status IN ('CONFIRMED','SHIPPED','DELIVERED') AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
     GROUP BY month ORDER BY month ASC`
  );

  res.json({
    success: true,
    data: {
      kpis: { totalOrders, totalRevenue: parseFloat(totalRevenue), totalCustomers, totalProducts, pendingOrders, lowStock },
      recentOrders,
      monthlyRevenue,
    },
  });
};

// GET /admin/analytics
exports.analytics = async (req, res) => {
  const { period = '30' } = req.query;
  const days = parseInt(period);

  const [salesByDay] = await db.query(
    `SELECT DATE(createdAt) as date, SUM(totalAmount) as revenue, COUNT(*) as orders
     FROM orders WHERE status != 'CANCELLED' AND createdAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY DATE(createdAt) ORDER BY date ASC`, [days]
  );

  const [topProducts] = await db.query(
    `SELECT p.name, p.slug, SUM(oi.quantity) as sold, SUM(oi.totalPrice) as revenue
     FROM order_items oi JOIN products p ON p.id = oi.productId
     JOIN orders o ON o.id = oi.orderId WHERE o.status != 'CANCELLED' AND o.createdAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY oi.productId ORDER BY sold DESC LIMIT 10`, [days]
  );

  const [topCategories] = await db.query(
    `SELECT c.name, SUM(oi.quantity) as sold
     FROM order_items oi JOIN product_categories pc ON pc.productId = oi.productId
     JOIN categories c ON c.id = pc.categoryId AND pc.isPrimary = 1
     JOIN orders o ON o.id = oi.orderId WHERE o.status != 'CANCELLED'
     GROUP BY c.id ORDER BY sold DESC LIMIT 5`
  );

  res.json({ success: true, data: { salesByDay, topProducts, topCategories } });
};
