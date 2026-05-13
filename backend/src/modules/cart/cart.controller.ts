import { Response } from 'express';
import { cartService } from './cart.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { sendSuccess } from '../../utils/response.util';

export class CartController {
  async getCart(req: AuthRequest, res: Response) {
    const cart = await cartService.getCart(req.user!.id);
    sendSuccess(res, cart);
  }

  async addItem(req: AuthRequest, res: Response) {
    const { productId, variantId, quantity = 1 } = req.body;
    const cart = await cartService.addItem(req.user!.id, productId, variantId, quantity);
    sendSuccess(res, cart, 'Item added to cart');
  }

  async updateItem(req: AuthRequest, res: Response) {
    const { quantity } = req.body;
    const cart = await cartService.updateItem(req.user!.id, req.params.itemId, quantity);
    sendSuccess(res, cart, 'Cart updated');
  }

  async removeItem(req: AuthRequest, res: Response) {
    const cart = await cartService.removeItem(req.user!.id, req.params.itemId);
    sendSuccess(res, cart, 'Item removed');
  }

  async clearCart(req: AuthRequest, res: Response) {
    await cartService.clearCart(req.user!.id);
    sendSuccess(res, null, 'Cart cleared');
  }
}

export const cartController = new CartController();
