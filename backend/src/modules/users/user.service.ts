import { prisma } from '../../configs/database';
import { NotFoundError } from '../../middlewares/error.middleware';
import { UserStatus } from '@prisma/client';
import { getPaginationParams, paginate } from '../../utils/response.util';

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
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
    if (!user) throw new NotFoundError('User');
    return user;
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, avatar: true, role: true, updatedAt: true,
      },
    });
  }

  async addAddress(userId: string, addressData: any) {
    if (addressData.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    return prisma.address.create({ data: { ...addressData, userId } });
  }

  async updateAddress(userId: string, addressId: string, data: any) {
    const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundError('Address');
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.update({ where: { id: addressId }, data });
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!address) throw new NotFoundError('Address');
    await prisma.address.delete({ where: { id: addressId } });
  }

  async getWishlist(userId: string) {
    return prisma.wishlist.findMany({
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

  async toggleWishlist(userId: string, productId: string) {
    const existing = await prisma.wishlist.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      await prisma.wishlist.delete({ where: { userId_productId: { userId, productId } } });
      return { wishlisted: false };
    }

    await prisma.wishlist.create({ data: { userId, productId } });
    return { wishlisted: true };
  }

  // Admin: List all users
  async findAll(filters: any) {
    const { page, limit, skip } = getPaginationParams(filters);
    const where: any = { role: 'CUSTOMER' };
    if (filters.search) {
      where.OR = [
        { email: { contains: filters.search, mode: 'insensitive' } },
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search } },
      ];
    }
    if (filters.status) where.status = filters.status;

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
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

    return { users, meta: paginate(page, limit, total) };
  }

  async blockUser(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.BANNED },
    });
  }

  async unblockUser(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { status: UserStatus.ACTIVE },
    });
  }
}

export const userService = new UserService();
