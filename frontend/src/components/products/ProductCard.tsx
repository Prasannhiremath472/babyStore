import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Clock, Bookmark } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { cartApi } from '../../services/api/cart.api';
import { setCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

interface Props {
  product: any;
  showBestseller?: boolean;
}

export default function ProductCard({ product, showBestseller }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(s => s.auth);

  const image = product.images?.[0]?.url;
  const defaultVariant = product.variants?.[0];
  const price = Number(defaultVariant?.price || product.minPrice || 0);
  const comparePrice = Number(defaultVariant?.comparePrice || product.comparePrice || 0);
  const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const isInStock = (defaultVariant?.inventory?.quantity ?? 1) > 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please sign in to add to cart'); return; }
    if (!defaultVariant?.id) return;
    setIsAddingToCart(true);
    try {
      const { data } = await cartApi.addItem({ productId: product.id, variantId: defaultVariant.id, quantity: 1 });
      dispatch(setCart(data.data));
      toast.success('Added to cart!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { toast.error('Please sign in to save items'); return; }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist!');
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-200"
    >
      {/* ── Image area ── */}
      <div className="relative bg-gray-50" style={{ aspectRatio: '1/1' }}>

        {/* Discount ribbon — top left, orange like Wellness Forever */}
        {discount > 0 && (
          <div className="absolute top-0 left-0 z-10">
            <div
              className="text-white text-[10px] font-black px-2 py-1 leading-none"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ef4444)',
                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
                paddingRight: '14px',
              }}
            >
              {discount}% Off
            </div>
          </div>
        )}

        {/* Bookmark / wishlist — top right */}
        <button
          onClick={handleWishlist}
          className="absolute top-1.5 right-1.5 z-10 w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm border border-gray-100 hover:border-primary/30 transition-all"
          title={isWishlisted ? 'Remove from wishlist' : 'Save'}
        >
          <Bookmark
            className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-primary text-primary' : 'text-gray-400'}`}
          />
        </button>

        {/* Product image */}
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl p-4">🧸</div>
        )}

        {/* Out of stock overlay */}
        {!isInStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* ── Product info ── */}
      <div className="p-2.5">

        {/* Brand */}
        {product.brand?.name && (
          <p className="text-[10px] text-primary font-semibold uppercase tracking-wide mb-0.5 truncate">
            {product.brand.name}
          </p>
        )}

        {/* Name — 2 lines max, small font like Wellness Forever */}
        <h3 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="text-sm font-black text-gray-900">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {comparePrice > price && (
            <span className="text-[10px] text-gray-400 line-through">
              ₹{comparePrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Inclusive of taxes */}
        <p className="text-[9px] text-gray-400 mb-1.5">Inclusive of all taxes</p>

        {/* Delivery time */}
        <div className="flex items-center gap-1 mb-2.5">
          <Clock className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-[10px] text-gray-500 font-medium">Delivery within 2 hrs</span>
        </div>

        {/* Add to Cart button — full width like Wellness Forever */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || isAddingToCart}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          {isAddingToCart ? (
            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              {isInStock ? 'Add to cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
