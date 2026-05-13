"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const response_util_1 = require("../../utils/response.util");
const database_1 = require("../../configs/database");
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function resolveCategoryId(raw) {
    if (!raw)
        return undefined;
    if (UUID_RE.test(raw))
        return raw;
    const cat = await database_1.prisma.category.findUnique({ where: { slug: raw }, select: { id: true } });
    return cat?.id;
}
class ProductController {
    async create(req, res) {
        const product = await product_service_1.productService.create(req.body, req.user.id);
        (0, response_util_1.sendCreated)(res, product, 'Product created successfully');
    }
    async list(req, res) {
        const categoryId = await resolveCategoryId(req.query.categoryId);
        const result = await product_service_1.productService.findAll({
            search: req.query.search,
            categoryId,
            brandId: req.query.brandId,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
            ageGroup: req.query.ageGroup,
            inStock: req.query.inStock === 'true',
            isNew: req.query.isNew === 'true',
            isBestseller: req.query.isBestseller === 'true',
            hasDiscount: req.query.hasDiscount === 'true',
            status: req.query.status,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 20,
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder || 'desc',
        });
        res.json({ success: true, ...result });
    }
    async getBySlug(req, res) {
        const product = await product_service_1.productService.findBySlug(req.params.slug);
        (0, response_util_1.sendSuccess)(res, product);
    }
    async getById(req, res) {
        const product = await product_service_1.productService.findById(req.params.id);
        (0, response_util_1.sendSuccess)(res, product);
    }
    async update(req, res) {
        const product = await product_service_1.productService.update(req.params.id, req.body, req.user.role);
        (0, response_util_1.sendSuccess)(res, product, 'Product updated');
    }
    async approve(req, res) {
        const product = await product_service_1.productService.approveProduct(req.params.id, req.user.id);
        (0, response_util_1.sendSuccess)(res, product, 'Product approved');
    }
    async delete(req, res) {
        await product_service_1.productService.deleteProduct(req.params.id);
        (0, response_util_1.sendSuccess)(res, null, 'Product deleted');
    }
    async getFeatured(req, res) {
        const products = await product_service_1.productService.getFeaturedProducts(Number(req.query.limit) || 8);
        (0, response_util_1.sendSuccess)(res, products);
    }
    async getBestsellers(req, res) {
        const products = await product_service_1.productService.getBestsellers(Number(req.query.limit) || 8);
        (0, response_util_1.sendSuccess)(res, products);
    }
    async getRelated(req, res) {
        const products = await product_service_1.productService.getRelatedProducts(req.params.id);
        (0, response_util_1.sendSuccess)(res, products);
    }
    async updateInventory(req, res) {
        const { quantity, reason } = req.body;
        const result = await product_service_1.productService.updateInventory(req.params.variantId, quantity, reason, req.user.id);
        (0, response_util_1.sendSuccess)(res, result, 'Inventory updated');
    }
}
exports.ProductController = ProductController;
exports.productController = new ProductController();
//# sourceMappingURL=product.controller.js.map