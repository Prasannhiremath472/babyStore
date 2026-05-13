"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = exports.AnalyticsService = void 0;
const database_1 = require("../../configs/database");
const redis_1 = require("../../configs/redis");
class AnalyticsService {
    async getDashboardStats() {
        const cacheKey = 'analytics:dashboard';
        const cached = await redis_1.cache.get(cacheKey);
        if (cached)
            return cached;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const [totalRevenue, monthRevenue, lastMonthRevenue, totalOrders, todayOrders, monthOrders, totalCustomers, newCustomersMonth, pendingOrders, totalProducts, lowStockProducts, topProducts, revenueByDay, ordersByStatus,] = await Promise.all([
            database_1.prisma.payment.aggregate({
                where: { status: 'CAPTURED' },
                _sum: { amount: true },
            }),
            database_1.prisma.payment.aggregate({
                where: { status: 'CAPTURED', createdAt: { gte: startOfMonth } },
                _sum: { amount: true },
            }),
            database_1.prisma.payment.aggregate({
                where: { status: 'CAPTURED', createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
                _sum: { amount: true },
            }),
            database_1.prisma.order.count(),
            database_1.prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
            database_1.prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
            database_1.prisma.user.count({ where: { role: 'CUSTOMER' } }),
            database_1.prisma.user.count({
                where: { role: 'CUSTOMER', createdAt: { gte: startOfMonth } },
            }),
            database_1.prisma.order.count({ where: { status: 'PENDING' } }),
            database_1.prisma.product.count({ where: { deletedAt: null } }),
            database_1.prisma.inventory.count({
                where: {
                    quantity: { lte: database_1.prisma.inventory.fields.lowStockAlert },
                },
            }),
            database_1.prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { quantity: true, totalPrice: true },
                orderBy: { _sum: { quantity: 'desc' } },
                take: 5,
            }),
            database_1.prisma.$queryRaw `
        SELECT DATE(created_at) as date, SUM(amount) as revenue
        FROM payments
        WHERE status = 'CAPTURED' AND created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,
            database_1.prisma.order.groupBy({
                by: ['status'],
                _count: true,
            }),
        ]);
        const monthGrowth = lastMonthRevenue._sum.amount
            ? (((Number(monthRevenue._sum.amount) - Number(lastMonthRevenue._sum.amount)) /
                Number(lastMonthRevenue._sum.amount)) * 100).toFixed(1)
            : '0';
        const stats = {
            revenue: {
                total: Number(totalRevenue._sum.amount || 0),
                thisMonth: Number(monthRevenue._sum.amount || 0),
                lastMonth: Number(lastMonthRevenue._sum.amount || 0),
                growth: parseFloat(monthGrowth),
            },
            orders: {
                total: totalOrders,
                today: todayOrders,
                thisMonth: monthOrders,
                pending: pendingOrders,
                byStatus: ordersByStatus,
            },
            customers: {
                total: totalCustomers,
                newThisMonth: newCustomersMonth,
            },
            products: {
                total: totalProducts,
                lowStock: lowStockProducts,
            },
            revenueByDay,
            topProducts,
        };
        await redis_1.cache.set(cacheKey, stats, 300);
        return stats;
    }
    async getRevenueReport(from, to, groupBy = 'day') {
        const format = groupBy === 'month' ? 'YYYY-MM' : groupBy === 'week' ? 'YYYY-WW' : 'YYYY-MM-DD';
        const data = await database_1.prisma.$queryRaw `
      SELECT
        TO_CHAR(p.created_at, ${format}) as period,
        SUM(p.amount) as revenue,
        COUNT(DISTINCT o.id) as orders,
        COUNT(DISTINCT o.user_id) as customers
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      WHERE p.status = 'CAPTURED'
        AND p.created_at >= ${from}
        AND p.created_at <= ${to}
      GROUP BY period
      ORDER BY period ASC
    `;
        return data;
    }
    async getInventoryReport() {
        const items = await database_1.prisma.inventory.findMany({
            include: {
                variant: {
                    include: {
                        product: {
                            include: {
                                brand: { select: { name: true } },
                                images: { where: { isPrimary: true }, take: 1 },
                            },
                        },
                    },
                },
            },
            orderBy: { quantity: 'asc' },
        });
        const lowStock = items.filter(i => i.quantity <= i.lowStockAlert);
        const outOfStock = items.filter(i => i.quantity === 0);
        return { items, lowStock, outOfStock };
    }
    async getCustomerReport(from, to) {
        const [newCustomers, topCustomers, customersByCity] = await Promise.all([
            database_1.prisma.user.groupBy({
                by: ['createdAt'],
                where: {
                    role: 'CUSTOMER',
                    createdAt: { gte: from, lte: to },
                },
                _count: true,
            }),
            database_1.prisma.order.groupBy({
                by: ['userId'],
                where: { createdAt: { gte: from, lte: to }, status: { not: 'CANCELLED' } },
                _sum: { totalAmount: true },
                _count: true,
                orderBy: { _sum: { totalAmount: 'desc' } },
                take: 10,
            }),
            database_1.prisma.$queryRaw `
        SELECT a.city, COUNT(DISTINCT o.user_id) as customers, SUM(o.total_amount) as revenue
        FROM orders o
        JOIN addresses a ON o.address_id = a.id
        WHERE o.created_at >= ${from} AND o.created_at <= ${to}
        GROUP BY a.city
        ORDER BY revenue DESC
        LIMIT 10
      `,
        ]);
        return { newCustomers, topCustomers, customersByCity };
    }
}
exports.AnalyticsService = AnalyticsService;
exports.analyticsService = new AnalyticsService();
//# sourceMappingURL=analytics.service.js.map