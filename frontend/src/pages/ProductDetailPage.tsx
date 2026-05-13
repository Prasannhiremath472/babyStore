import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Heart, Share2, Star, Shield, Truck, RotateCcw,
  ChevronLeft, ChevronRight, Minus, Plus, Package, Check
} from 'lucide-react';
import { productsApi } from '../services/api/products.api';
import { cartApi } from '../services/api/cart.api';
import { useAppSelector, useAppDispatch } from '../store';
import { setCart } from '../store/slices/cartSlice';
import ProductCard from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isAuthenticated } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedData } = useQuery({
    queryKey: ['product', 'related', data?.data?.data?.id],
    queryFn: () => productsApi.getRelated(data!.data.data.id),
    enabled: !!data?.data?.data?.id,
  });

  const product = data?.data?.data;
  const related = relatedData?.data?.data || [];
  const variant = selectedVariant || product?.variants?.find((v: any) => v.isDefault) || product?.variants?.[0];
  const price = Number(variant?.price || 0);
  const comparePrice = Number(variant?.comparePrice || 0);
  const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const stock = variant?.inventory?.quantity || 0;
  const images = product?.images || [];

  const handleAddToCart = async (buyNow = false) => {
    if (!isAuthenticated) { toast.error('Please sign in'); return; }
    if (!variant?.id) return;
    setIsAddingToCart(true);
    try {
      const { data: cartData } = await cartApi.addItem({
        productId: product.id,
        variantId: variant.id,
        quantity,
      });
      dispatch(setCart(cartData.data));
      if (buyNow) {
        window.location.href = '/checkout';
      } else {
        toast.success('Added to cart!');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) return (
    <div className="section-container py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="skeleton aspect-square rounded-3xl" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-6 rounded" />)}
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="section-container py-24 text-center">
      <span className="text-7xl">😕</span>
      <h2 className="text-2xl font-bold mt-4">Product not found</h2>
      <Link to="/products" className="btn-primary mt-6 inline-flex">Browse Products</Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{product.metaTitle || `${product.name} - LittleNest`}</title>
        <meta name="description" content={product.metaDesc || product.shortDescription || ''} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="section-container py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span>/</span>
              <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="section-container py-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 group">
                <img
                  src={images[selectedImage]?.url || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 badge-sale text-sm px-3 py-1">-{discount}%</span>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(i => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {images.map((img: any, i: number) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-primary shadow-glow' : 'border-transparent'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              {product.brand && (
                <Link to={`/brand/${product.brand.slug}`} className="text-primary font-semibold text-sm hover:underline">
                  {product.brand.name}
                </Link>
              )}
              <h1 className="text-2xl lg:text-3xl font-display font-bold mt-1 mb-3">{product.name}</h1>

              {/* Rating */}
              {product.averageRating > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{product.averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">₹{price.toLocaleString('en-IN')}</span>
                {comparePrice > price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">₹{comparePrice.toLocaleString('en-IN')}</span>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded">Save {discount}%</span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className={`inline-flex items-center gap-2 text-sm font-medium mb-6 ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {stock > 0 ? (
                  <><Check className="w-4 h-4" /> In Stock {stock <= 10 && `(Only ${stock} left)`}</>
                ) : (
                  <><Package className="w-4 h-4" /> Out of Stock</>
                )}
              </div>

              {/* Variants */}
              {product.variants?.length > 1 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Select Option</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v: any) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                        disabled={!v.inventory?.quantity}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                          variant?.id === v.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-gray-300'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold text-sm">Quantity:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                    disabled={quantity >= stock}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={!stock || isAddingToCart}
                  className="flex-1 btn-secondary py-4 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToCart(true)}
                  disabled={!stock}
                  className="flex-1 btn-primary py-4 text-base gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-14 border-2 border-border rounded-xl flex items-center justify-center hover:border-red-300 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
                {[
                  { icon: Truck, text: 'Free delivery on orders above ₹499', sub: 'Expected in 3-5 days' },
                  { icon: RotateCcw, text: '7-day easy returns', sub: 'Hassle-free return policy' },
                  { icon: Shield, text: '100% authentic products', sub: 'Quality guaranteed' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                      <div className="text-sm font-medium">{item.text}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
              )}
            </div>
          </div>

          {/* Description & Specs */}
          {(product.description || product.attributes?.length > 0) && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {product.description && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="font-display font-bold text-xl mb-4">Product Description</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              )}
              {product.attributes?.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="font-display font-bold text-xl mb-4">Specifications</h2>
                  <div className="space-y-3">
                    {product.attributes.map((attr: any) => (
                      <div key={attr.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-muted-foreground text-sm">{attr.name}</span>
                        <span className="font-medium text-sm">{attr.value}</span>
                      </div>
                    ))}
                    {product.ageGroup && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-muted-foreground text-sm">Age Group</span>
                        <span className="font-medium text-sm">{product.ageGroup}</span>
                      </div>
                    )}
                    {product.material && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-muted-foreground text-sm">Material</span>
                        <span className="font-medium text-sm">{product.material}</span>
                      </div>
                    )}
                    {product.warrantyMonths > 0 && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-muted-foreground text-sm">Warranty</span>
                        <span className="font-medium text-sm">{product.warrantyMonths} months</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reviews */}
          {product.reviews?.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Customer Reviews</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {review.user.firstName[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{review.user.firstName} {review.user.lastName}</div>
                          {review.isVerifiedPurchase && <span className="text-xs text-green-600">✓ Verified Purchase</span>}
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    {review.title && <p className="font-semibold text-sm mb-1">{review.title}</p>}
                    <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {related.slice(0, 6).map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
