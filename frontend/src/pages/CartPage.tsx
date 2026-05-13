import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Trash2, ShoppingBag, Minus, Plus, Tag, ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store';
import { setCart } from '../store/slices/cartSlice';
import { cartApi } from '../services/api/cart.api';
import { productsApi } from '../services/api/products.api';
import { useState } from 'react';
import apiClient from '../services/api/client';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { isAuthenticated } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get(),
    enabled: isAuthenticated,
  });

  const cart = data?.data?.data;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const discount = couponData?.discount || 0;
  const shipping = subtotal - discount > 499 ? 0 : 49;
  const tax = Math.round((subtotal - discount + shipping) * 0.18);
  const total = subtotal - discount + shipping + tax;

  const updateMutation = useMutation({
    mutationFn: ({ id, qty }: { id: string; qty: number }) => cartApi.updateItem(id, qty),
    onSuccess: (res) => { dispatch(setCart(res.data.data)); refetch(); },
    onError: () => toast.error('Failed to update'),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => cartApi.removeItem(id),
    onSuccess: (res) => { dispatch(setCart(res.data.data)); refetch(); toast.success('Removed'); },
  });

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const { data } = await apiClient.post('/coupons/validate', { code: couponCode.trim(), subtotal });
      setCouponData(data.data);
      toast.success(`Coupon applied! Saving ₹${data.data.discount}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
    }
  };

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="text-7xl block mb-4">🛒</span>
        <h2 className="text-2xl font-bold mb-4">Sign in to view your cart</h2>
        <Link to="/login?redirect=/cart" className="btn-primary">Sign In</Link>
      </div>
    </div>
  );

  return (
    <>
      <Helmet><title>Shopping Cart - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container">
          <h1 className="text-2xl font-display font-bold mb-6">Shopping Cart ({items.length})</h1>
          {items.length === 0 ? (
            <div className="text-center py-24">
              <span className="text-8xl block mb-4">🛒</span>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Add some products for your little one!</p>
              <Link to="/products" className="btn-primary px-8 py-4">Shop Now</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item: any) => (
                  <div key={item.id} className="bg-white rounded-2xl p-5 shadow-card flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      {item.product?.images?.[0]?.url ? (
                        <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : <div className="w-full h-full flex items-center justify-center text-3xl">🧸</div>}
                    </div>
                    <div className="flex-1">
                      <Link to={`/products/${item.product?.slug}`} className="font-semibold hover:text-primary transition-colors">
                        {item.product?.name}
                      </Link>
                      {item.variant?.name !== 'Default' && <p className="text-sm text-muted-foreground">{item.variant?.name}</p>}
                      {!item.isInStock && <p className="text-xs text-red-500 mt-1">⚠️ Out of stock</p>}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                          <button onClick={() => updateMutation.mutate({ id: item.id, qty: item.quantity - 1 })} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateMutation.mutate({ id: item.id, qty: item.quantity + 1 })} disabled={item.quantity >= item.stock} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm disabled:opacity-40">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-primary font-bold text-lg">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeMutation.mutate(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-4">
                {/* Coupon */}
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> Apply Coupon</h3>
                  <div className="flex gap-2">
                    <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="WELCOME10" className="input-base text-sm py-2 flex-1" />
                    <button onClick={applyCoupon} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-600">Apply</button>
                  </div>
                  {couponData && (
                    <div className="mt-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2 flex items-center justify-between">
                      <span>✓ {couponData.coupon.code} applied</span>
                      <button onClick={() => { setCouponData(null); setCouponCode(''); }} className="text-xs text-red-500">Remove</button>
                    </div>
                  )}
                </div>

                {/* Order summary */}
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                    {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
                    <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Tax (18% GST)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                    <div className="border-t pt-3 flex justify-between font-bold text-base">
                      <span>Total</span><span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    state={{ couponCode: couponData?.coupon?.code }}
                    className="btn-primary w-full py-4 justify-center mt-4"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                  {subtotal < 499 && (
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Add ₹{(499 - subtotal).toFixed(0)} more for free delivery
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
