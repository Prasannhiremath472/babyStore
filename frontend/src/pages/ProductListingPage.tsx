import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, Grid3X3, List, X, ChevronDown, ChevronRight,
  Search, Filter, Home, Star, ShoppingCart, Heart,
  ChevronLeft
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import { productsApi } from '../services/api/products.api';

const SORT_OPTIONS = [
  { label: 'Relevance',          value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular',       value: 'popular' },
  { label: 'Name A–Z',           value: 'name' },
];

const AGE_FILTERS = [
  '0-3 months', '3-6 months', '6-12 months',
  '1-3 years', '3-7 years', '7-12 years',
];

const PRICE_RANGES = [
  { label: 'Under ₹299',       min: 0,    max: 299 },
  { label: '₹300 – ₹599',     min: 300,  max: 599 },
  { label: '₹600 – ₹999',     min: 600,  max: 999 },
  { label: '₹1000 – ₹1999',   min: 1000, max: 1999 },
  { label: '₹2000 – ₹4999',   min: 2000, max: 4999 },
  { label: '₹5000 & above',   min: 5000, max: undefined },
];

const SIDE_CATEGORIES = [
  { name: 'Baby Clothing',      slug: 'baby-clothing',      sub: ['Bodysuits', 'Rompers', 'Sleepsuits', 'Sets & Combos', 'Winter Wear'] },
  { name: 'Toys & Games',       slug: 'toys-games',          sub: ['Educational', 'Building Blocks', 'Soft Toys', 'Outdoor', 'Musical'] },
  { name: 'Feeding Essentials', slug: 'feeding-essentials',  sub: ['Bottles', 'Breast Pumps', 'Highchairs', 'Bowls', 'Bibs'] },
  { name: 'Bath & Skin Care',   slug: 'bath-skin-care',       sub: ['Baby Wash', 'Massage Oils', 'Rash Creams', 'Grooming', 'Sunscreen'] },
  { name: 'Baby Gear',          slug: 'baby-gear',            sub: ['Strollers', 'Car Seats', 'Carriers', 'Diaper Bags', 'Monitors'] },
  { name: 'Diapers & Wipes',    slug: 'diapers-wipes',        sub: ['Diaper Pants', 'Tape Diapers', 'Water Wipes', 'Dry Wipes'] },
  { name: 'School Essentials',  slug: 'school-essentials',   sub: ['Backpacks', 'Water Bottles', 'Lunch Boxes', 'Art & Craft', 'STEM'] },
  { name: 'Nursery',            slug: 'nursery',              sub: ['Cribs', 'Play Mats', 'Night Lights', 'Curtains', 'Sheets'] },
  { name: 'Footwear',           slug: 'footwear',             sub: ['Pre-Walkers', 'Sneakers', 'Rain Boots', 'Socks'] },
  { name: 'Health & Safety',    slug: 'health-safety',        sub: ['Thermometers', 'Safety Gates', 'Socket Covers', 'Oximeters'] },
  { name: 'Maternity',          slug: 'maternity',            sub: ['Support Pillows', 'Nursing Bras', 'Maternity Wear'] },
  { name: 'Books',              slug: 'books',                sub: ['Board Books', 'Flash Cards', 'Sound Books', 'Comics'] },
];

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<string[]>([slug || '']);
  const [categorySearch, setCategorySearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  // Reset to page 1 when filters/slug change
  useEffect(() => { setPage(1); }, [slug, searchParams.toString()]);

  const filters = {
    search:       searchParams.get('search') || undefined,
    categoryId:   slug || searchParams.get('categoryId') || undefined,
    brandId:      searchParams.get('brandId') || undefined,
    minPrice:     searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice:     searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    ageGroup:     searchParams.get('ageGroup') || undefined,
    inStock:      searchParams.get('inStock') === 'true',
    isNew:        searchParams.get('isNew') === 'true',
    isBestseller: searchParams.get('isBestseller') === 'true',
    hasDiscount:  searchParams.get('hasDiscount') === 'true',
    sortBy:       searchParams.get('sortBy') || 'newest',
    status:       'ACTIVE' as any,
    limit:        20,
    page,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'list', filters],
    queryFn: () => productsApi.list(filters),
    staleTime: 60000,
  });

  // Backend returns { success, products, meta } spread directly
  const products: any[] = (data as any)?.data?.products || (data as any)?.data?.data?.products || [];
  const meta = (data as any)?.data?.meta || (data as any)?.data?.data?.meta || {};
  const total: number = meta.total || 0;
  const totalPages: number = meta.totalPages || 1;

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value); else params.delete(key);
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const activeCount = [
    filters.ageGroup, filters.inStock, filters.isNew,
    filters.isBestseller, filters.hasDiscount, filters.minPrice, filters.maxPrice,
  ].filter(Boolean).length;

  const toggleCat = (s: string) =>
    setExpandedCats(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const currentCatName = SIDE_CATEGORIES.find(c => c.slug === slug)?.name || '';

  const filteredCats = SIDE_CATEGORIES.filter(c =>
    !categorySearch || c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // ── Left sidebar ──────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
        <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-primary" /> FILTERS
        </h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="text-xs text-red-500 font-semibold hover:underline">
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* Category search */}
      <div className="px-4 py-3 border-b border-border/60">
        <p className="font-bold text-xs text-foreground uppercase tracking-wide mb-2">Category</p>
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={categorySearch}
            onChange={e => setCategorySearch(e.target.value)}
            placeholder="Search Categories"
            className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-gray-50"
          />
        </div>
        <div className="space-y-0.5 max-h-72 overflow-y-auto scrollbar-thin">
          {filteredCats.map(cat => (
            <div key={cat.slug}>
              <button
                onClick={() => toggleCat(cat.slug)}
                className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  slug === cat.slug
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-primary-50 hover:text-primary'
                }`}
              >
                <Link to={`/category/${cat.slug}`} className="flex-1 text-left" onClick={e => e.stopPropagation()}>
                  {cat.name}
                </Link>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${expandedCats.includes(cat.slug) ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedCats.includes(cat.slug) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {cat.sub.map(s => (
                      <Link
                        key={s}
                        to={`/category/${cat.slug}?q=${encodeURIComponent(s)}`}
                        className="flex items-center gap-1.5 pl-6 pr-2 py-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-primary-50/50 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-3 h-3 shrink-0" /> {s}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="px-4 py-3 border-b border-border/60">
        <p className="font-bold text-xs text-foreground uppercase tracking-wide mb-3">Price Range</p>
        <div className="space-y-1.5">
          {PRICE_RANGES.map(r => {
            const active = filters.minPrice === r.min && filters.maxPrice === r.max;
            return (
              <label key={r.label} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={active}
                  onChange={() => {
                    if (active) {
                      updateFilter('minPrice', null);
                      updateFilter('maxPrice', null);
                    } else {
                      updateFilter('minPrice', String(r.min));
                      updateFilter('maxPrice', r.max != null ? String(r.max) : null);
                    }
                  }}
                  className="w-3.5 h-3.5 accent-primary"
                />
                <span className={`text-xs transition-colors ${active ? 'text-primary font-bold' : 'text-foreground group-hover:text-primary'}`}>{r.label}</span>
              </label>
            );
          })}
          {/* Custom range */}
          <div className="flex gap-2 mt-2">
            <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => updateFilter('minPrice', e.target.value || null)} className="w-full px-2 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
            <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={e => updateFilter('maxPrice', e.target.value || null)} className="w-full px-2 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>

      {/* Age group */}
      <div className="px-4 py-3 border-b border-border/60">
        <p className="font-bold text-xs text-foreground uppercase tracking-wide mb-3">Age Group</p>
        <div className="space-y-1.5">
          {AGE_FILTERS.map(age => (
            <label key={age} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="ageGroup"
                checked={filters.ageGroup === age}
                onChange={() => updateFilter('ageGroup', filters.ageGroup === age ? null : age)}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className={`text-xs transition-colors ${filters.ageGroup === age ? 'text-primary font-bold' : 'text-foreground group-hover:text-primary'}`}>{age}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick filters */}
      <div className="px-4 py-3">
        <p className="font-bold text-xs text-foreground uppercase tracking-wide mb-3">Quick Filters</p>
        <div className="space-y-2">
          {[
            { label: 'New Arrivals',  key: 'isNew',        icon: '✨' },
            { label: 'Bestsellers',   key: 'isBestseller', icon: '🔥' },
            { label: 'On Sale',       key: 'hasDiscount',  icon: '🏷️' },
            { label: 'In Stock Only', key: 'inStock',      icon: '✅' },
          ].map(f => (
            <label key={f.key} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={searchParams.get(f.key) === 'true'}
                onChange={e => updateFilter(f.key, e.target.checked ? 'true' : null)}
                className="w-3.5 h-3.5 accent-primary rounded"
              />
              <span className={`text-xs transition-colors ${searchParams.get(f.key) === 'true' ? 'text-primary font-bold' : 'text-foreground group-hover:text-primary'}`}>
                {f.icon} {f.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const pageTitle = filters.search
    ? `Results for "${filters.search}"`
    : currentCatName || 'All Products';

  return (
    <>
      <Helmet>
        <title>{pageTitle} — My Baby</title>
      </Helmet>

      <div className="min-h-screen bg-[#F8F7FF]">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-border/40">
          <div className="section-container py-2.5">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              {slug ? (
                <>
                  <Link to="/products" className="hover:text-primary transition-colors">All Products</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-foreground font-semibold capitalize">{currentCatName || slug.replace(/-/g, ' ')}</span>
                </>
              ) : (
                <span className="text-foreground font-semibold">All Products</span>
              )}
            </nav>
          </div>
        </div>

        <div className="section-container py-5">
          <div className="flex gap-5">

            {/* ── Left Sidebar (desktop) ── */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="bg-white rounded-2xl shadow-card border border-border/50 sticky top-24 overflow-hidden">
                <Sidebar />
              </div>
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-card border border-border/50 px-4 py-3 mb-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <div>
                    <h1 className="text-base font-bold text-foreground">{pageTitle}</h1>
                    <p className="text-xs text-muted-foreground">
                      {isLoading ? 'Loading…' : `${total.toLocaleString()} products found`}
                    </p>
                  </div>

                  {/* Active filter chips */}
                  {activeCount > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {filters.ageGroup && (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {filters.ageGroup}
                          <button onClick={() => updateFilter('ageGroup', null)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                      {filters.isNew && (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                          New ✨ <button onClick={() => updateFilter('isNew', null)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                      {filters.hasDiscount && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          On Sale 🏷️ <button onClick={() => updateFilter('hasDiscount', null)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                      {filters.isBestseller && (
                        <span className="inline-flex items-center gap-1 bg-secondary/20 text-secondary-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          Bestsellers 🔥 <button onClick={() => updateFilter('isBestseller', null)}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                      {(filters.minPrice || filters.maxPrice) && (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                          ₹{filters.minPrice || 0}–{filters.maxPrice ? `₹${filters.maxPrice}` : '+'}
                          <button onClick={() => { updateFilter('minPrice', null); updateFilter('maxPrice', null); }}><X className="w-2.5 h-2.5" /></button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={e => updateFilter('sortBy', e.target.value)}
                      className="appearance-none text-xs border border-border rounded-xl px-3 py-2 pr-7 bg-white focus:outline-none focus:ring-1 focus:ring-primary font-semibold cursor-pointer"
                    >
                      {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* View toggle */}
                  <div className="hidden sm:flex border border-border rounded-xl overflow-hidden">
                    <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                      <Grid3X3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-50'}`}>
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Mobile filter */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-xl text-xs font-bold"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filters {activeCount > 0 && `(${activeCount})`}
                  </button>
                </div>
              </div>

              {/* Products */}
              {isLoading ? (
                <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                  {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-card border border-border/50 flex flex-col items-center justify-center py-24 text-center">
                  <span className="text-7xl mb-4">🔍</span>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn-primary text-sm px-6 py-2.5">Clear Filters</button>
                </div>
              ) : (
                <>
                  {/* Product grid */}
                  <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                    {products.map((product: any, i: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.3) }}
                      >
                        {viewMode === 'grid' ? (
                          <ProductCard product={product} />
                        ) : (
                          <div className="bg-white rounded-2xl shadow-card border border-gray-200 flex gap-4 p-4 hover:shadow-elevated transition-all group">
                            <Link to={`/products/${product.slug}`} className="shrink-0">
                              <div className="w-28 h-28 rounded-xl overflow-hidden bg-primary-50">
                                {product.images?.[0]?.url
                                  ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300" />
                                  : <div className="w-full h-full flex items-center justify-center text-3xl">🧸</div>
                                }
                              </div>
                            </Link>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{product.brand?.name}</p>
                              <Link to={`/products/${product.slug}`}>
                                <h3 className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">{product.name}</h3>
                              </Link>
                              {product.averageRating > 0 && (
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, j) => (
                                    <Star key={j} className={`w-3 h-3 ${j < Math.floor(product.averageRating) ? 'fill-secondary text-secondary' : 'fill-gray-200 text-gray-200'}`} />
                                  ))}
                                  <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
                                </div>
                              )}
                              <div className="flex items-baseline gap-2">
                                <span className="text-primary font-black text-base">₹{Number(product.variants?.[0]?.price || product.minPrice).toLocaleString('en-IN')}</span>
                                {product.variants?.[0]?.comparePrice && (
                                  <span className="line-through text-xs text-muted-foreground">₹{Number(product.variants[0].comparePrice).toLocaleString('en-IN')}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                              <button className="w-8 h-8 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition-colors">
                                <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                              </button>
                              <button className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-600 transition-colors shadow-glow">
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* ── Pagination ── */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      <p className="text-xs text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}</span> of <span className="font-semibold text-foreground">{total}</span> products
                      </p>
                      <div className="flex items-center gap-1.5">
                        {/* Prev */}
                        <button
                          onClick={() => goToPage(page - 1)}
                          disabled={page === 1}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                          .reduce((acc: (number | string)[], p, idx, arr) => {
                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('…');
                            acc.push(p);
                            return acc;
                          }, [])
                          .map((p, i) =>
                            p === '…' ? (
                              <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">…</span>
                            ) : (
                              <button
                                key={p}
                                onClick={() => goToPage(p as number)}
                                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                                  page === p
                                    ? 'bg-primary text-white shadow-glow'
                                    : 'border border-gray-200 text-gray-700 hover:bg-primary hover:text-white hover:border-primary'
                                }`}
                              >
                                {p}
                              </button>
                            )
                          )
                        }

                        {/* Next */}
                        <button
                          onClick={() => goToPage(page + 1)}
                          disabled={page === totalPages}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto shadow-deep"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-white z-10">
                <h3 className="font-bold text-foreground">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar />
              <div className="p-4 border-t border-border sticky bottom-0 bg-white">
                <button onClick={() => setMobileFilterOpen(false)} className="btn-primary w-full py-3 text-sm">
                  Apply Filters {activeCount > 0 && `(${activeCount})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
