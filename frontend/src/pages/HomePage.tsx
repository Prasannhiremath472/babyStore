import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import HeroSection              from '../components/home/HeroSection';
import WhyChooseUs              from '../components/home/WhyChooseUs';
import ShopByCategory           from '../components/home/ShopByCategory';
import ShopByAge                from '../components/home/ShopByAge';
import FlashSaleSection         from '../components/home/FlashSaleSection';
import FeaturedProducts         from '../components/home/FeaturedProducts';
import PromoBanners             from '../components/home/PromoBanners';
import BestsellerSection        from '../components/home/BestsellerSection';
import FeaturedBrands           from '../components/home/FeaturedBrands';
import TestimonialsSection      from '../components/home/TestimonialsSection';
import PremiumBoutiques         from '../components/home/PremiumBoutiques';
import PriceFilterBanner        from '../components/home/PriceFilterBanner';
import CategoryProductSection   from '../components/home/CategoryProductSection';
import ProductCard              from '../components/products/ProductCard';
import ProductCardSkeleton      from '../components/products/ProductCardSkeleton';
import { productsApi }          from '../services/api/products.api';

// Parenting blog posts
const BLOG_POSTS = [
  { title: '10 Must-Have Products for Your Newborn', cat: 'Newborn', time: '5 min read', img: '/images/placeholder.svg', emoji: '👶', slug: 'newborn-must-haves' },
  { title: 'Baby-Led Weaning: Complete Beginners Guide', cat: 'Feeding', time: '7 min read', img: '/images/placeholder.svg', emoji: '🍼', slug: 'baby-led-weaning-guide' },
  { title: 'How to Choose the Right Baby Carrier', cat: 'Baby Gear', time: '4 min read', img: '/images/placeholder.svg', emoji: '🚼', slug: 'choose-baby-carrier' },
  { title: 'Sleep Training Methods That Actually Work', cat: 'Parenting', time: '6 min read', img: '/images/placeholder.svg', emoji: '😴', slug: 'sleep-training-methods' },
];

export default function HomePage() {
  const { data: featuredData, isLoading: featLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.getFeatured(10),
    staleTime: 300000,
  });
  const { data: bestsellersData, isLoading: bsLoading } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: () => productsApi.getBestsellers(12),
    staleTime: 300000,
  });
  const { data: newArrivalsData, isLoading: newLoading } = useQuery({
    queryKey: ['products', 'new'],
    queryFn: () => productsApi.list({ isNew: true, limit: 8, status: 'ACTIVE' }),
    staleTime: 300000,
  });

  const featured    = featuredData?.data?.data || featuredData?.data?.products || [];
  const bestsellers = bestsellersData?.data?.data || bestsellersData?.data?.products || [];
  const newArrivals = (newArrivalsData as any)?.data?.products || (newArrivalsData as any)?.data?.data?.products || [];

  return (
    <>
      <Helmet>
        <title>My Baby — The New Born Baby Shop | Premium Baby & Kids Products India</title>
        <meta name="description" content="Shop India's finest baby & kids products at My Baby. 1500+ premium organic clothing, safe toys, feeding essentials, skincare & baby gear. Free delivery above ₹499." />
      </Helmet>

      <div className="min-h-screen bg-white">

        {/* 1. HERO CAROUSEL */}
        <HeroSection />

        {/* 2. WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 3. CATEGORY ICON GRID */}
        <ShopByCategory />

        {/* 4. FLASH SALE WITH COUNTDOWN */}
        <FlashSaleSection />

        {/* 5. FEATURED PRODUCTS */}
        <section className="py-14 bg-white">
          <div className="section-container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="eyebrow"><span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block animate-pulse" /> Handpicked</div>
                <h2 className="section-heading">Featured Products</h2>
                <div className="section-divider mt-2" />
              </div>
              <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:text-sky-700 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {featLoading
                ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : featured.slice(0, 10).map((p: any, i: number) => (
                    <motion.div key={p.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.05 }}>
                      <ProductCard product={p} />
                    </motion.div>
                  ))
              }
            </div>
          </div>
        </section>

        {/* 6. PREMIUM BOUTIQUES — FirstCry style 2×3 image grid cards */}
        <PremiumBoutiques />

        {/* 7. PROMO BANNERS */}
        <PromoBanners />

        {/* 8. PRICE FILTER BANNER + CLOTHING SUBCATEGORIES */}
        <PriceFilterBanner />

        {/* 9. SHOP BY AGE */}
        <ShopByAge />

        {/* 8. BESTSELLERS */}
        <section className="py-14 bg-gradient-to-b from-orange-50 to-white">
          <div className="section-container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="eyebrow"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse" /> 🔥 Trending</div>
                <h2 className="section-heading">Bestsellers</h2>
                <div className="section-divider mt-2" />
                <p className="text-gray-500 text-sm mt-1">Most loved by parents across India</p>
              </div>
              <Link to="/products?isBestseller=true" className="hidden sm:flex items-center gap-1.5 text-orange-600 font-semibold text-sm hover:text-orange-700 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {bsLoading
                ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : bestsellers.slice(0, 6).map((p: any, i: number) => (
                    <motion.div key={p.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.06 }}>
                      <ProductCard product={p} showBestseller />
                    </motion.div>
                  ))
              }
            </div>
          </div>
        </section>

        {/* 9. NEW ARRIVALS */}
        {(newArrivals.length > 0 || newLoading) && (
          <section className="py-14 bg-white border-t border-gray-50">
            <div className="section-container">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="eyebrow"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" /> ✨ Just In</div>
                  <h2 className="section-heading">New Arrivals</h2>
                  <div className="section-divider mt-2" />
                </div>
                <Link to="/products?isNew=true" className="hidden sm:flex items-center gap-1.5 text-green-600 font-semibold text-sm hover:text-green-700 group">
                  View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {newLoading
                  ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                  : newArrivals.slice(0, 8).map((p: any, i: number) => (
                      <motion.div key={p.id} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: i*0.04 }}>
                        <ProductCard product={p} />
                      </motion.div>
                    ))
                }
              </div>
            </div>
          </section>
        )}

        {/* 10. CATEGORY PRODUCT SECTIONS — FirstCry style image subcategory grids */}
        <CategoryProductSection />

        {/* 11. BRANDS MARQUEE */}
        <FeaturedBrands />

        {/* 11. PARENTING BLOG */}
        <section className="py-14 bg-gray-50">
          <div className="section-container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="eyebrow"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block animate-pulse" /> Parenting Tips</div>
                <h2 className="section-heading">From Our Blog</h2>
                <div className="section-divider mt-2" />
              </div>
              <Link to="/blog" className="hidden sm:flex items-center gap-1.5 text-purple-600 font-semibold text-sm hover:text-purple-700 group">
                All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BLOG_POSTS.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08 }}>
                  <Link to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{post.emoji}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge-blue text-[10px]">{post.cat}</span>
                        <span className="text-[10px] text-gray-400">{post.time}</span>
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-sky-600 transition-colors">{post.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. TESTIMONIALS */}
        <TestimonialsSection />

        {/* 13. APP DOWNLOAD BANNER */}
        <section className="py-14 bg-gradient-to-r from-sky-500 to-blue-600 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="section-container relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="text-white">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-2xl font-display font-black mb-2">Download the My Baby App</h3>
                <p className="text-sky-200 mb-5">Exclusive app-only deals, easy reordering, and order tracking on the go!</p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <button className="flex items-center gap-2 bg-white text-gray-900 font-bold px-5 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                    🍎 App Store
                  </button>
                  <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-5 py-3 rounded-xl text-sm border border-white/30 hover:bg-white/30 transition-colors">
                    🤖 Google Play
                  </button>
                </div>
              </div>
              <div className="flex gap-8 text-center">
                {[['4.8★', 'App Rating'],['1M+','Downloads'],['50K+','Reviews']].map(([v, l]) => (
                  <div key={l} className="text-white">
                    <div className="text-3xl font-black">{v}</div>
                    <div className="text-sky-200 text-xs mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
