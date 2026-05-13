import slugify from 'slugify';
import { prisma } from '../../configs/database';
import { cache } from '../../configs/redis';
import { NotFoundError, ConflictError, ForbiddenError } from '../../middlewares/error.middleware';
import { ProductStatus, UserRole } from '@prisma/client';
import { getPaginationParams, paginate } from '../../utils/response.util';

interface CreateProductDto {
  name: string;
  description?: string;
  shortDescription?: string;
  brandId?: string;
  categoryIds: string[];
  primaryCategoryId: string;
  tags?: string[];
  ageGroup?: string;
  gender?: string;
  material?: string;
  weight?: number;
  warrantyMonths?: number;
  metaTitle?: string;
  metaDesc?: string;
  metaKeywords?: string;
  variants: Array<{
    name: string;
    sku: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    attributes: Record<string, string>;
    isDefault?: boolean;
    initialStock?: number;
  }>;
}

interface ProductFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  ageGroup?: string;
  rating?: number;
  inStock?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  hasDiscount?: boolean;
  status?: ProductStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ProductService {
  async create(dto: CreateProductDto, createdBy: string) {
    const baseSlug = slugify(dto.name, { lower: true, strict: true });
    const slug = await this.generateUniqueSlug(baseSlug);
    const sku = `LN-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const product = await prisma.product.create({
      data: {
        name: dto.name,
        slug,
        sku,
        description: dto.description,
        shortDescription: dto.shortDescription,
        brandId: dto.brandId,
        tags: dto.tags || [],
        ageGroup: dto.ageGroup,
        gender: dto.gender,
        material: dto.material,
        weight: dto.weight,
        warrantyMonths: dto.warrantyMonths || 0,
        metaTitle: dto.metaTitle,
        metaDesc: dto.metaDesc,
        metaKeywords: dto.metaKeywords,
        status: ProductStatus.DRAFT,
        categories: {
          create: dto.categoryIds.map(catId => ({
            categoryId: catId,
            isPrimary: catId === dto.primaryCategoryId,
          })),
        },
        variants: {
          create: dto.variants.map(v => ({
            name: v.name,
            sku: v.sku,
            price: v.price,
            comparePrice: v.comparePrice,
            costPrice: v.costPrice,
            weight: v.weight,
            attributes: v.attributes,
            isDefault: v.isDefault ?? false,
            inventory: {
              create: {
                quantity: v.initialStock || 0,
                reservedQuantity: 0,
              },
            },
          })),
        },
      },
      include: {
        categories: { include: { category: true } },
        variants: { include: { inventory: true } },
        brand: true,
        images: true,
      },
    });

    await cache.delPattern('products:list:*');
    return product;
  }

  async findAll(filters: ProductFilters) {
    const { page = 1, limit = 20, skip } = getPaginationParams({
      page: filters.page,
      limit: filters.limit,
    });

    const where: any = {
      deletedAt: null,
      ...(filters.status && { status: filters.status }),
      ...(filters.brandId && { brandId: filters.brandId }),
      ...(filters.ageGroup && { ageGroup: filters.ageGroup }),
      ...(filters.isNew && { isNew: true }),
      ...(filters.isBestseller && { isBestseller: true }),
      ...(filters.categoryId && {
        categories: { some: { categoryId: filters.categoryId } },
      }),
      ...(filters.search && {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { tags: { has: filters.search } },
          { sku: { contains: filters.search, mode: 'insensitive' } },
        ],
      }),
      ...(filters.inStock && {
        variants: {
          some: {
            inventory: { quantity: { gt: 0 } },
          },
        },
      }),
      ...(filters.hasDiscount && {
        variants: { some: { comparePrice: { not: null } } },
      }),
    };

    if (filters.minPrice || filters.maxPrice) {
      where.variants = {
        some: {
          ...(filters.minPrice && { price: { gte: filters.minPrice } }),
          ...(filters.maxPrice && { price: { lte: filters.maxPrice } }),
        },
      };
    }

    const orderBy = this.buildOrderBy(filters.sortBy, filters.sortOrder);

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          brand: { select: { id: true, name: true, logo: true } },
          categories: {
            where: { isPrimary: true },
            include: { category: { select: { id: true, name: true, slug: true } } },
          },
          images: { where: { isPrimary: true }, take: 1 },
          variants: {
            where: { isActive: true },
            include: { inventory: true },
            orderBy: { isDefault: 'desc' },
          },
          reviews: {
            select: { rating: true },
          },
        },
        skip,
        take: limit,
        orderBy: orderBy as any,
      }),
    ]) as [number, any[]];

    const enriched = products.map((p: any) => ({
      ...p,
      averageRating: p.reviews.length
        ? p.reviews.reduce((s: number, r: any) => s + r.rating, 0) / p.reviews.length
        : 0,
      reviewCount: p.reviews.length,
      minPrice: Math.min(...p.variants.map((v: any) => Number(v.price))),
      maxPrice: Math.max(...p.variants.map((v: any) => Number(v.price))),
      totalStock: p.variants.reduce((s: number, v: any) => s + (v.inventory?.quantity || 0), 0),
    }));

    return { products: enriched, meta: paginate(page, limit, total) };
  }

  async findBySlug(slug: string) {
    const cacheKey = `product:${slug}`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const product = await prisma.product.findUnique({
      where: { slug, deletedAt: null },
      include: {
        brand: true,
        categories: { include: { category: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: {
          where: { isActive: true },
          include: { inventory: true },
        },
        attributes: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { status: 'APPROVED' },
          include: {
            user: { select: { firstName: true, lastName: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) throw new NotFoundError('Product');

    const enriched = {
      ...product,
      averageRating: product.reviews.length
        ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length,
    };

    await cache.set(cacheKey, enriched, 300);
    return enriched;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: {
        brand: true,
        categories: { include: { category: true } },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { include: { inventory: true } },
        attributes: true,
      },
    });
    if (!product) throw new NotFoundError('Product');
    return product;
  }

  async update(id: string, data: Partial<CreateProductDto>, userRole: UserRole) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product');

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.brandId !== undefined && { brandId: data.brandId }),
        ...(data.tags && { tags: data.tags }),
        ...(data.ageGroup !== undefined && { ageGroup: data.ageGroup }),
        ...(data.weight !== undefined && { weight: data.weight }),
        updatedAt: new Date(),
      },
      include: { variants: { include: { inventory: true } }, images: true },
    });

    await cache.del(`product:${product.slug}`);
    await cache.delPattern('products:list:*');
    return updated;
  }

  async approveProduct(id: string, adminId: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product');

    const updated = await prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.ACTIVE,
        approvedAt: new Date(),
        approvedBy: adminId,
      },
    });

    await cache.del(`product:${product.slug}`);
    return updated;
  }

  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundError('Product');

    await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date(), status: ProductStatus.ARCHIVED },
    });

    await cache.del(`product:${product.slug}`);
    await cache.delPattern('products:list:*');
  }

  async getFeaturedProducts(limit = 8) {
    const cacheKey = `products:featured:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const products = await prisma.product.findMany({
      where: { isFeatured: true, status: ProductStatus.ACTIVE, deletedAt: null },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        variants: {
          where: { isDefault: true },
          include: { inventory: true },
          take: 1,
        },
        brand: { select: { name: true, logo: true } },
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    await cache.set(cacheKey, products, 600);
    return products;
  }

  async getBestsellers(limit = 8) {
    const cacheKey = `products:bestsellers:${limit}`;
    const cached = await cache.get(cacheKey);
    if (cached) return cached;

    const products = await prisma.product.findMany({
      where: { isBestseller: true, status: ProductStatus.ACTIVE, deletedAt: null },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        variants: {
          where: { isDefault: true },
          include: { inventory: true },
          take: 1,
        },
      },
      take: limit,
    });

    await cache.set(cacheKey, products, 600);
    return products;
  }

  async getRelatedProducts(productId: string, limit = 6) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true },
    });
    if (!product) return [];

    const categoryIds = product.categories.map(c => c.categoryId);

    return prisma.product.findMany({
      where: {
        id: { not: productId },
        status: ProductStatus.ACTIVE,
        deletedAt: null,
        categories: { some: { categoryId: { in: categoryIds } } },
      },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        variants: { where: { isDefault: true }, take: 1 },
      },
      take: limit,
    });
  }

  async updateInventory(variantId: string, quantity: number, reason: string, adminId: string) {
    const inventory = await prisma.inventory.findUnique({ where: { variantId } });
    if (!inventory) throw new NotFoundError('Inventory');

    const updated = await prisma.inventory.update({
      where: { variantId },
      data: { quantity },
    });

    await prisma.inventoryMovement.create({
      data: {
        inventoryId: inventory.id,
        type: quantity > inventory.quantity ? 'STOCK_IN' : 'STOCK_OUT',
        quantity: Math.abs(quantity - inventory.quantity),
        reason,
        createdBy: adminId,
      },
    });

    return updated;
  }

  private async generateUniqueSlug(base: string): Promise<string> {
    let slug = base;
    let count = 0;
    while (true) {
      const existing = await prisma.product.findUnique({ where: { slug } });
      if (!existing) break;
      slug = `${base}-${++count}`;
    }
    return slug;
  }

  private buildOrderBy(sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc'): any[] {
    const order = sortOrder;
    switch (sortBy) {
      case 'price_asc': return [{ createdAt: 'asc' }];
      case 'price_desc': return [{ createdAt: 'desc' }];
      case 'newest': return [{ createdAt: 'desc' }];
      case 'popular': return [{ isBestseller: 'desc' }, { createdAt: 'desc' }];
      case 'name': return [{ name: order }];
      default: return [{ createdAt: 'desc' }];
    }
  }
}

export const productService = new ProductService();
