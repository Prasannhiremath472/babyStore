import { Request, Response } from 'express';
import { productService } from './product.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { sendSuccess, sendCreated } from '../../utils/response.util';
import { prisma } from '../../configs/database';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function resolveCategoryId(raw: string | undefined): Promise<string | undefined> {
  if (!raw) return undefined;
  if (UUID_RE.test(raw)) return raw;
  const cat = await prisma.category.findUnique({ where: { slug: raw }, select: { id: true } });
  return cat?.id;
}

export class ProductController {
  async create(req: AuthRequest, res: Response) {
    const product = await productService.create(req.body, req.user!.id);
    sendCreated(res, product, 'Product created successfully');
  }

  async list(req: Request, res: Response) {
    const categoryId = await resolveCategoryId(req.query.categoryId as string | undefined);
    const result = await productService.findAll({
      search: req.query.search as string,
      categoryId,
      brandId: req.query.brandId as string,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      ageGroup: req.query.ageGroup as string,
      inStock: req.query.inStock === 'true',
      isNew: req.query.isNew === 'true',
      isBestseller: req.query.isBestseller === 'true',
      hasDiscount: req.query.hasDiscount === 'true',
      status: req.query.status as any,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 20,
      sortBy: req.query.sortBy as string,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    });
    res.json({ success: true, ...result });
  }

  async getBySlug(req: Request, res: Response) {
    const product = await productService.findBySlug(req.params.slug);
    sendSuccess(res, product);
  }

  async getById(req: Request, res: Response) {
    const product = await productService.findById(req.params.id);
    sendSuccess(res, product);
  }

  async update(req: AuthRequest, res: Response) {
    const product = await productService.update(req.params.id, req.body, req.user!.role);
    sendSuccess(res, product, 'Product updated');
  }

  async approve(req: AuthRequest, res: Response) {
    const product = await productService.approveProduct(req.params.id, req.user!.id);
    sendSuccess(res, product, 'Product approved');
  }

  async delete(req: AuthRequest, res: Response) {
    await productService.deleteProduct(req.params.id);
    sendSuccess(res, null, 'Product deleted');
  }

  async getFeatured(req: Request, res: Response) {
    const products = await productService.getFeaturedProducts(Number(req.query.limit) || 8);
    sendSuccess(res, products);
  }

  async getBestsellers(req: Request, res: Response) {
    const products = await productService.getBestsellers(Number(req.query.limit) || 8);
    sendSuccess(res, products);
  }

  async getRelated(req: Request, res: Response) {
    const products = await productService.getRelatedProducts(req.params.id);
    sendSuccess(res, products);
  }

  async updateInventory(req: AuthRequest, res: Response) {
    const { quantity, reason } = req.body;
    const result = await productService.updateInventory(
      req.params.variantId, quantity, reason, req.user!.id
    );
    sendSuccess(res, result, 'Inventory updated');
  }
}

export const productController = new ProductController();
