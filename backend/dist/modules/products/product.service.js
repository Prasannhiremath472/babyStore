"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = exports.ProductService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const database_1 = require("../../configs/database");
const redis_1 = require("../../configs/redis");
const error_middleware_1 = require("../../middlewares/error.middleware");
const client_1 = require("@prisma/client");
const response_util_1 = require("../../utils/response.util");
class ProductService {
    async create(dto, createdBy) {
        const baseSlug = (0, slugify_1.default)(dto.name, { lower: true, strict: true });
        const slug = await this.generateUniqueSlug(baseSlug);
        const sku = `LN-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const product = await database_1.prisma.product.create({
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
                status: client_1.ProductStatus.DRAFT,
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
        await redis_1.cache.delPattern('products:list:*');
        return product;
    }
    async findAll(filters) {
        const { page = 1, limit = 20, skip } = (0, response_util_1.getPaginationParams)({
            page: filters.page,
            limit: filters.limit,
        });
        const where = {
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
            database_1.prisma.product.count({ where }),
            database_1.prisma.product.findMany({
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
                orderBy: orderBy,
            }),
        ]);
        const enriched = products.map((p) => ({
            ...p,
            averageRating: p.reviews.length
                ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
                : 0,
            reviewCount: p.reviews.length,
            minPrice: Math.min(...p.variants.map((v) => Number(v.price))),
            maxPrice: Math.max(...p.variants.map((v) => Number(v.price))),
            totalStock: p.variants.reduce((s, v) => s + (v.inventory?.quantity || 0), 0),
        }));
        return { products: enriched, meta: (0, response_util_1.paginate)(page, limit, total) };
    }
    async findBySlug(slug) {
        const cacheKey = `product:${slug}`;
        const cached = await redis_1.cache.get(cacheKey);
        if (cached)
            return cached;
        const product = await database_1.prisma.product.findUnique({
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
        if (!product)
            throw new error_middleware_1.NotFoundError('Product');
        const enriched = {
            ...product,
            averageRating: product.reviews.length
                ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
                : 0,
            reviewCount: product.reviews.length,
        };
        await redis_1.cache.set(cacheKey, enriched, 300);
        return enriched;
    }
    async findById(id) {
        const product = await database_1.prisma.product.findUnique({
            where: { id, deletedAt: null },
            include: {
                brand: true,
                categories: { include: { category: true } },
                images: { orderBy: { sortOrder: 'asc' } },
                variants: { include: { inventory: true } },
                attributes: true,
            },
        });
        if (!product)
            throw new error_middleware_1.NotFoundError('Product');
        return product;
    }
    async update(id, data, userRole) {
        const product = await database_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.NotFoundError('Product');
        const updated = await database_1.prisma.product.update({
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
        await redis_1.cache.del(`product:${product.slug}`);
        await redis_1.cache.delPattern('products:list:*');
        return updated;
    }
    async approveProduct(id, adminId) {
        const product = await database_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.NotFoundError('Product');
        const updated = await database_1.prisma.product.update({
            where: { id },
            data: {
                status: client_1.ProductStatus.ACTIVE,
                approvedAt: new Date(),
                approvedBy: adminId,
            },
        });
        await redis_1.cache.del(`product:${product.slug}`);
        return updated;
    }
    async deleteProduct(id) {
        const product = await database_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            throw new error_middleware_1.NotFoundError('Product');
        await database_1.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date(), status: client_1.ProductStatus.ARCHIVED },
        });
        await redis_1.cache.del(`product:${product.slug}`);
        await redis_1.cache.delPattern('products:list:*');
    }
    async getFeaturedProducts(limit = 8) {
        const cacheKey = `products:featured:${limit}`;
        const cached = await redis_1.cache.get(cacheKey);
        if (cached)
            return cached;
        const products = await database_1.prisma.product.findMany({
            where: { isFeatured: true, status: client_1.ProductStatus.ACTIVE, deletedAt: null },
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
        await redis_1.cache.set(cacheKey, products, 600);
        return products;
    }
    async getBestsellers(limit = 8) {
        const cacheKey = `products:bestsellers:${limit}`;
        const cached = await redis_1.cache.get(cacheKey);
        if (cached)
            return cached;
        const products = await database_1.prisma.product.findMany({
            where: { isBestseller: true, status: client_1.ProductStatus.ACTIVE, deletedAt: null },
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
        await redis_1.cache.set(cacheKey, products, 600);
        return products;
    }
    async getRelatedProducts(productId, limit = 6) {
        const product = await database_1.prisma.product.findUnique({
            where: { id: productId },
            include: { categories: true },
        });
        if (!product)
            return [];
        const categoryIds = product.categories.map(c => c.categoryId);
        return database_1.prisma.product.findMany({
            where: {
                id: { not: productId },
                status: client_1.ProductStatus.ACTIVE,
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
    async updateInventory(variantId, quantity, reason, adminId) {
        const inventory = await database_1.prisma.inventory.findUnique({ where: { variantId } });
        if (!inventory)
            throw new error_middleware_1.NotFoundError('Inventory');
        const updated = await database_1.prisma.inventory.update({
            where: { variantId },
            data: { quantity },
        });
        await database_1.prisma.inventoryMovement.create({
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
    async generateUniqueSlug(base) {
        let slug = base;
        let count = 0;
        while (true) {
            const existing = await database_1.prisma.product.findUnique({ where: { slug } });
            if (!existing)
                break;
            slug = `${base}-${++count}`;
        }
        return slug;
    }
    buildOrderBy(sortBy, sortOrder = 'desc') {
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
exports.ProductService = ProductService;
exports.productService = new ProductService();
//# sourceMappingURL=product.service.js.map