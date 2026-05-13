import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '../../store';
import { closeMiniCart } from '../../store/slices/uiSlice';
import { setCart } from '../../store/slices/cartSlice';
import { cartApi } from '../../services/api/cart.api';
import toast from 'react-hot-toast';

export default function MiniCart() {
  const dispatch = useAppDispatch();
  const qc = useQueryClient();
  const { isMiniCartOpen } = useAppSelector(s => s.ui);
  const { isAuthenticated } = useAppSelector(s => s.auth);

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get(),
    enabled: isAuthenticated && isMiniCartOpen,
  });

  const cart = data?.data?.data;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;

  const updateMutation = useMutation({
    mutationFn: ({ itemId, qty }: { itemId: string; qty: number }) =>
      cartApi.updateItem(itemId, qty),
    onSuccess: (res) => { dispatch(setCart(res.data.data)); },
    onError: () => toast.error('Failed to update cart'),
  });

  const removeMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (res) => { dispatch(setCart(res.data.data)); toast.success('Item removed'); },
  });

  return (
    <AnimatePresence>
      {isMiniCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={(e) => { if (e.target === e.currentTarget) dispatch(closeMiniCart()); }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg">Cart ({items.length})</h2>
              </div>
              <button onClick={() => dispatch(closeMiniCart())} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!isAuthenticated ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                  <p className="text-muted-foreground mb-4">Sign in to view your cart</p>
                  <Link to="/login" onClick={() => dispatch(closeMiniCart())} className="btn-primary">Sign In</Link>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl block mb-4">🛒</span>
                  <p className="font-semibold text-lg mb-2">Your cart is empty</p>
                  <p className="text-muted-foreground text-sm mb-6">Add some products for your little one!</p>
                  <Link to="/products" onClick={() => dispatch(closeMiniCart())} className="btn-primary">Shop Now</Link>
                </div>
              ) : (
                items.map((item: any) => (
                  <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                      {item.product?.images?.[0]?.url ? (
                        <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🧸</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-2 mb-1">{item.product?.name}</p>
                      {item.variant?.name && item.variant.name !== 'Default' && (
                        <p className="text-xs text-muted-foreground mb-1">{item.variant.name}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateMutation.mutate({ itemId: item.id, qty: item.quantity - 1 })}
                            className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateMutation.mutate({ itemId: item.id, qty: item.quantity + 1 })}
                            disabled={item.quantity >= item.stock}
                            className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm disabled:opacity-40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeMutation.mutate(item.id)}
                            className="w-6 h-6 bg-red-50 text-red-500 rounded flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold text-lg">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {subtotal < 499 && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-2 text-center">
                    Add ₹{(499 - subtotal).toFixed(0)} more for free delivery
                  </p>
                )}
                <div className="flex gap-3">
                  <Link to="/cart" onClick={() => dispatch(closeMiniCart())} className="flex-1 btn-secondary py-3 justify-center text-sm">
                    View Cart
                  </Link>
                  <Link to="/checkout" onClick={() => dispatch(closeMiniCart())} className="flex-1 btn-primary py-3 justify-center text-sm">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
