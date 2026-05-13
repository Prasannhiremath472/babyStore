"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const database_1 = require("../../configs/database");
const error_middleware_1 = require("../../middlewares/error.middleware");
const client_1 = require("@prisma/client");
const response_util_1 = require("../../utils/response.util");
class UserService {
    async getProfile(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true, email: true, firstName: true, lastName: true,
                phone: true, avatar: true, role: true, status: true,
                emailVerified: true, loyaltyPoints: true, referralCode: true,
                createdAt: true, lastLoginAt: true,
                wallet: { select: { balance: true } },
                addresses: { where: {}, orderBy: { isDefault: 'desc' } },
                _count: { select: { orders: true, reviews: true, wishlist: true } },
            },
        });
        if (!user)
            throw new error_middleware_1.NotFoundError('User');
        return user;
    }
    async updateProfile(userId, data) {
        return database_1.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true, email: true, firstName: true, lastName: true,
                phone: true, avatar: true, role: true, updatedAt: true,
            },
        });
    }
    async addAddress(userId, addressData) {
        if (addressData.isDefault) {
            await database_1.prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false },
            });
        }
        return database_1.prisma.address.create({ data: { ...addressData, userId } });
    }
    async updateAddress(userId, addressId, data) {
        const address = await database_1.prisma.address.findFirst({ where: { id: addressId, userId } });
        if (!address)
            throw new error_middleware_1.NotFoundError('Address');
        if (data.isDefault) {
            await database_1.prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
        }
        return database_1.prisma.address.update({ where: { id: addressId }, data });
    }
    async deleteAddress(userId, addressId) {
        const address = await database_1.prisma.address.findFirst({ where: { id: addressId, userId } });
        if (!address)
            throw new error_middleware_1.NotFoundError('Address');
        await database_1.prisma.address.delete({ where: { id: addressId } });
    }
    async getWishlist(userId) {
        return database_1.prisma.wishlist.findMany({
            where: { userId },
            include: {
                product: {
                    include: {
                        images: { where: { isPrimary: true }, take: 1 },
                        variants: { where: { isDefault: true }, take: 1, include: { inventory: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async toggleWishlist(userId, productId) {
        const existing = await database_1.prisma.wishlist.findUnique({
            where: { userId_productId: { userId, productId } },
        });
        if (existing) {
            await database_1.prisma.wishlist.delete({ where: { userId_productId: { userId, productId } } });
            return { wishlisted: false };
        }
        await database_1.prisma.wishlist.create({ data: { userId, productId } });
        return { wishlisted: true };
    }
    async findAll(filters) {
        const { page, limit, skip } = (0, response_util_1.getPaginationParams)(filters);
        const where = { role: 'CUSTOMER' };
        if (filters.search) {
            where.OR = [
                { email: { contains: filters.search, mode: 'insensitive' } },
                { firstName: { contains: filters.search, mode: 'insensitive' } },
                { phone: { contains: filters.search } },
            ];
        }
        if (filters.status)
            where.status = filters.status;
        const [total, users] = await Promise.all([
            database_1.prisma.user.count({ where }),
            database_1.prisma.user.findMany({
                where,
                select: {
                    id: true, email: true, firstName: true, lastName: true, phone: true,
                    status: true, role: true, createdAt: true, lastLoginAt: true,
                    _count: { select: { orders: true } },
                    wallet: { select: { balance: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
        ]);
        return { users, meta: (0, response_util_1.paginate)(page, limit, total) };
    }
    async blockUser(userId) {
        return database_1.prisma.user.update({
            where: { id: userId },
            data: { status: client_1.UserStatus.BANNED },
        });
    }
    async unblockUser(userId) {
        return database_1.prisma.user.update({
            where: { id: userId },
            data: { status: client_1.UserStatus.ACTIVE },
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map