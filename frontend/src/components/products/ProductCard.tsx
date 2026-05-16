import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Bookmark, Clock, Zap } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { cartApi } from '../../services/api/cart.api';
import { setCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

interface Props { product: any; showBestseller?: boolean; }

export default function ProductCard({ product, showBestseller }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding]         = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(s => s.auth);

  const image        = product.images?.[0]?.url;
  const variant      = product.variants?.[0];
  const price        = Number(variant?.price || product.minPrice || 0);
  const comparePrice = Number(variant?.comparePrice || product.comparePrice || 0);
  const discount     = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const inStock      = (variant?.inventory?.quantity ?? 1) > 0;

  const handleCart = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please sign in to add to cart'); return; }
    if (!variant?.id) return;
    setAdding(true);
    try {
      const { data } = await cartApi.addItem({ productId: product.id, variantId: variant.id, quantity: 1 });
      dispatch(setCart(data.data));
      toast.success('Added to cart! 🛒');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add');
    } finally { setAdding(false); }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please sign in'); return; }
    setWishlisted(!wishlisted);
    toast.success(wishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist');
  };

  return (
    <Link to={`/products/${product.slug}`} className="block group">
      <div className="product-card card-hover-top relative overflow-hidden">

        {/* ── Image ── */}
        <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: '1/1' }}>
          {image ? (
            <img src={image} alt={product.name}
              className="product-image w-full h-full object-contain p-3 transition-transform duration-500"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🧸</div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {!inStock && <span className="badge badge-red text-[9px]">Out of Stock</span>}
            {discount > 0 && <span className="badge-sale text-[9px]">-{discount}%</span>}
            {product.isNew && <span className="badge-new text-[9px]">New</span>}
            {(showBestseller || product.isBestseller) && <span className="badge-hot text-[9px]">🔥 Hot</span>}
          </div>

          {/* Wishlist */}
          <button onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-xl shadow-soft border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
            <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-600/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button onClick={handleCart} disabled={!inStock || adding}
              className="w-full bg-white text-sky-600 text-xs font-bold py-2.5 rounded-xl hover:bg-sky-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
              {adding
                ? <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                : <><ShoppingCart className="w-3.5 h-3.5" />{inStock ? 'Quick Add to Cart' : 'Out of Stock'}</>
              }
            </button>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="p-3">
          {product.brand?.name && (
            <p className="text-[10px] text-sky-600 font-bold uppercase tracking-wider mb-1 truncate">{product.brand.name}</p>
          )}

          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5 min-h-[2.5rem] group-hover:text-sky-700 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.averageRating > 0 && (
            <div className="flex items-center gap-1 mb-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-sm font-black text-gray-900">₹{price.toLocaleString('en-IN')}</span>
            {comparePrice > price && (
              <span className="text-[10px] text-gray-400 line-through">₹{comparePrice.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && <span className="text-[10px] font-bold text-green-600">{discount}% off</span>}
          </div>

          <p className="text-[9px] text-gray-400 mb-2">Incl. of all taxes</p>

          {/* Delivery */}
          <div className="flex items-center gap-1 mb-2.5">
            <Clock className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-[10px] text-gray-500 font-medium">Delivery within 2–4 days</span>
          </div>

          {/* Add to cart button */}
          <button onClick={handleCart} disabled={!inStock || adding}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-sky-500 text-sky-600 text-xs font-bold hover:bg-sky-500 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
            {adding
              ? <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              : <><ShoppingCart className="w-3.5 h-3.5" />{inStock ? 'Add to Cart' : 'Out of Stock'}</>
            }
          </button>
        </div>
      </div>
    </Link>
  );
}
