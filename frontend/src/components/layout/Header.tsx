import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  MapPin, Truck, Tag, Phone, Bell, Sparkles, ChevronRight,
  Baby, LogOut, Package, Settings, Star, Mic, ArrowRight,
  Gift, Smartphone, Store, HelpCircle, Percent, Clock
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleMobileMenu, toggleSearch } from '../../store/slices/uiSlice';
import { logoutThunk } from '../../store/slices/authSlice';
import { productsApi } from '../../services/api/products.api';
import toast from 'react-hot-toast';

// ── Mega Menu Categories ────────────────────────────────────────────────────
const MEGA_CATEGORIES = [
  {
    name: 'Baby Care', emoji: '🧴', slug: 'bath-skin-care', color: 'text-blue-600 bg-blue-50',
    featured: ['Baby Wash', 'Baby Oil', 'Diaper Rash Cream', 'Baby Powder', 'Baby Wipes', 'Baby Lotion'],
    brands: ['Himalaya', "Johnson's", 'Chicco', 'Dabur'],
  },
  {
    name: 'Fashion', emoji: '👗', slug: 'baby-clothing', color: 'text-pink-600 bg-pink-50',
    featured: ['Bodysuits', 'Rompers', 'Sets & Combos', 'Ethnic Wear', 'Winter Wear', 'Sleepsuits'],
    brands: ['Babyhug', 'Mee Mee', 'Mothercare'],
  },
  {
    name: 'Toys', emoji: '🧸', slug: 'toys-games', color: 'text-orange-600 bg-orange-50',
    featured: ['Building Blocks', 'Soft Toys', 'Educational', 'Musical Toys', 'Outdoor', 'Puzzles'],
    brands: ['Lego', 'Fisher-Price', 'Funskool'],
  },
  {
    name: 'Feeding', emoji: '🍼', slug: 'feeding-essentials', color: 'text-green-600 bg-green-50',
    featured: ['Feeding Bottles', 'Breast Pumps', 'Highchairs', 'Bibs', 'Baby Food', 'Sterilizers'],
    brands: ['Chicco', 'Pigeon', 'LuvLap', 'Autoflow'],
  },
  {
    name: 'Nursery', emoji: '🛏️', slug: 'nursery', color: 'text-purple-600 bg-purple-50',
    featured: ['Cradles', 'Play Mats', 'Baby Cots', 'Night Lights', 'Bedding', 'Mosquito Nets'],
    brands: ['LuvLap', 'Mothercare', 'MyBaby'],
  },
  {
    name: 'Diapers', emoji: '🧷', slug: 'diapers-wipes', color: 'text-teal-600 bg-teal-50',
    featured: ['Tape Diapers', 'Pants Diapers', 'Diaper Bags', 'Baby Wipes', 'Changing Mats'],
    brands: ['Pampers', 'Himalaya', 'Mamy Poko'],
  },
  {
    name: 'Maternity', emoji: '🤱', slug: 'maternity', color: 'text-rose-600 bg-rose-50',
    featured: ['Nursing Bras', 'Maternity Wear', 'Breast Pads', 'Support Pillows', 'Belly Belts'],
    brands: ['MyBaby Originals', 'Mothercare'],
  },
  {
    name: 'Footwear', emoji: '👟', slug: 'footwear', color: 'text-amber-600 bg-amber-50',
    featured: ['Pre-Walkers', 'Sandals', 'Sneakers', 'Socks', 'Rain Boots', 'School Shoes'],
    brands: ['Mothercare', 'Mee Mee', 'MyBaby'],
  },
  {
    name: 'School', emoji: '🎒', slug: 'school-essentials', color: 'text-indigo-600 bg-indigo-50',
    featured: ['Backpacks', 'Water Bottles', 'Lunch Boxes', 'Art & Craft', 'STEM Kits', 'Stationery'],
    brands: ['Funskool', 'MyBaby Originals'],
  },
  {
    name: 'Health', emoji: '🏥', slug: 'health-safety', color: 'text-red-600 bg-red-50',
    featured: ['Thermometers', 'Safety Gates', 'Oximeters', 'Nasal Aspirators', 'Grooming Kits'],
    brands: ['Chicco', 'Mee Mee', 'Pigeon'],
  },
  {
    name: 'Books', emoji: '📚', slug: 'books', color: 'text-yellow-600 bg-yellow-50',
    featured: ['Board Books', 'Flash Cards', 'Sound Books', 'Activity Books', 'Story Books'],
    brands: ['Fisher-Price', 'MyBaby'],
  },
  {
    name: 'Gifts', emoji: '🎁', slug: 'nursery', color: 'text-fuchsia-600 bg-fuchsia-50',
    featured: ['Gift Sets', 'New Born Hampers', 'Personalized', 'Birthday Gifts', 'Baby Shower'],
    brands: ['Johnson\'s', 'Chicco', 'MyBaby'],
  },
  {
    name: 'Baby Gear', emoji: '🚼', slug: 'baby-gear', color: 'text-sky-600 bg-sky-50',
    featured: ['Strollers', 'Car Seats', 'Baby Carriers', 'Diaper Bags', 'Bouncers', 'Baby Monitors'],
    brands: ['Chicco', 'LuvLap', 'Mothercare'],
  },
];

const OFFER_ITEMS = [
  '🎁 Use WELCOME10 for 10% off your first order',
  '🚚 Free delivery on all orders above ₹499',
  '⚡ Flash Sale: Up to 50% off on Toys & Diapers',
  '🌿 New: Organic Baby Skincare Collection',
  '🔒 100% Safe Payments via Razorpay & UPI',
  '↩️ Easy 7-day returns on all products',
  '📱 Download our app — exclusive app-only deals!',
];

const POPULAR_SEARCHES = ['Baby Diapers', "Johnson's Baby Shampoo", 'Baby Carrier', 'Feeding Bottle', 'Baby Monitor', 'Himalaya Baby Oil', 'Pampers Pants'];

export default function Header() {
  const [scrolled, setScrolled]             = useState(false);
  const [activeMega, setActiveMega]         = useState<string | null>(null);
  const [searchQ, setSearchQ]               = useState('');
  const [searchOpen, setSearchOpen]         = useState(false);
  const [searchResults, setSearchResults]   = useState<any[]>([]);
  const [searching, setSearching]           = useState(false);
  const [profileOpen, setProfileOpen]       = useState(false);
  const dispatch    = useAppDispatch();
  const navigate    = useNavigate();
  const { isAuthenticated, user } = useAppSelector(s => s.auth);
  const { itemCount } = useAppSelector(s => s.cart);
  const searchRef   = useRef<HTMLInputElement>(null);
  const megaTimer   = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Live search
  useEffect(() => {
    if (!searchQ.trim()) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await productsApi.list({ search: searchQ, limit: 6, status: 'ACTIVE' });
        const prods = data?.products || data?.data?.products || [];
        setSearchResults(prods.slice(0, 6));
      } catch { setSearchResults([]); }
      finally { setSearching(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchQ(''); setSearchOpen(false); setSearchResults([]);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    toast.success('Logged out successfully');
    navigate('/');
    setProfileOpen(false);
  };

  const onMegaEnter = (slug: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setActiveMega(slug);
  };
  const onMegaLeave = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 200);
  };

  return (
    <>
      {/* ── 1. TOP UTILITY BAR ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hidden md:block overflow-hidden">
        <div className="ticker-wrap py-1.5">
          <div className="ticker-track text-xs text-white/90 font-medium gap-16 flex">
            {[...OFFER_ITEMS, ...OFFER_ITEMS].map((item, i) => (
              <span key={i} className="shrink-0 flex items-center gap-1.5">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Utility links bar ── */}
      <div className="bg-gray-50 border-b border-gray-100 hidden lg:block">
        <div className="section-container flex items-center justify-between py-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-5">
            <Link to="/store-locator" className="flex items-center gap-1 hover:text-sky-600 transition-colors font-medium">
              <Store className="w-3 h-3" /> Store Locator
            </Link>
            <Link to="/track-order" className="flex items-center gap-1 hover:text-sky-600 transition-colors font-medium">
              <Package className="w-3 h-3" /> Track Order
            </Link>
            <Link to="/help" className="flex items-center gap-1 hover:text-sky-600 transition-colors font-medium">
              <HelpCircle className="w-3 h-3" /> Help
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/offers" className="flex items-center gap-1 hover:text-orange-500 transition-colors font-medium text-orange-500">
              <Percent className="w-3 h-3" /> Today's Offers
            </Link>
            <span className="flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> Download App
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> 1800-123-4567
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN STICKY NAVBAR ──────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.1)]' : 'border-b border-gray-100'}`}>
        <div className="section-container">
          <div className="flex items-center gap-4 py-3.5">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-blue group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-black text-xl leading-none">
                  <span className="text-gray-900">My </span>
                  <span className="gradient-text-blue">Baby</span>
                </div>
                <div className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">The New Born Shop</div>
              </div>
            </Link>

            {/* ── MEGA SEARCH BAR ── */}
            <div className="flex-1 max-w-2xl mx-4 relative hidden md:block">
              <form onSubmit={handleSearch}>
                <div className={`relative transition-all duration-300 ${searchOpen ? 'ring-2 ring-sky-300' : ''}`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    ref={searchRef}
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                    placeholder="Search for diapers, toys, baby clothing..."
                    className="w-full pl-12 pr-24 py-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-sky-400 outline-none text-sm font-medium placeholder-gray-400 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button type="button" className="p-2 text-gray-400 hover:text-sky-500 transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button type="submit" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                      Search
                    </button>
                  </div>
                </div>
              </form>

              {/* Search dropdown */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-hover border border-gray-100 overflow-hidden z-50"
                  >
                    {searchQ.trim() && (searching || searchResults.length > 0) ? (
                      <div>
                        {searching ? (
                          <div className="p-4 space-y-3">
                            {[1,2,3].map(i => <div key={i} className="skeleton h-12 w-full" />)}
                          </div>
                        ) : (
                          <>
                            <div className="p-3 space-y-1">
                              {searchResults.map((p: any) => (
                                <Link
                                  key={p.id}
                                  to={`/products/${p.slug}`}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                    {p.images?.[0]?.url
                                      ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                                      : <div className="w-full h-full flex items-center justify-center text-lg">🧸</div>
                                    }
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-sky-600">{p.name}</p>
                                    <p className="text-xs text-gray-500">₹{Number(p.variants?.[0]?.price || 99).toLocaleString('en-IN')}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sky-400" />
                                </Link>
                              ))}
                            </div>
                            <div className="px-4 py-2 border-t border-gray-50">
                              <button onClick={handleSearch} className="text-xs text-sky-600 font-bold hover:text-sky-700">
                                View all results for "{searchQ}" →
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Searches</p>
                        <div className="flex flex-wrap gap-2">
                          {POPULAR_SEARCHES.map(s => (
                            <button
                              key={s}
                              onClick={() => { setSearchQ(s); navigate(`/search?q=${encodeURIComponent(s)}`); setSearchOpen(false); }}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 transition-all"
                            >
                              <Search className="w-3 h-3 inline mr-1" />{s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center gap-1 ml-auto">

              {/* Wishlist */}
              {isAuthenticated && (
                <Link to="/account/wishlist" className="relative p-2.5 rounded-xl hover:bg-pink-50 transition-colors group">
                  <Heart className="w-5 h-5 text-gray-500 group-hover:text-pink-500 transition-colors" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">3</span>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-orange-50 transition-colors group">
                <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-orange">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              {isAuthenticated && (
                <button className="relative p-2.5 rounded-xl hover:bg-yellow-50 transition-colors group">
                  <Bell className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
              )}

              {/* Account */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-sky-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-black">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-[10px] text-gray-400">Hello,</div>
                      <div className="text-xs font-bold text-gray-800 leading-none">{user?.firstName}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-hover border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-gray-100">
                          <div className="font-bold text-sm text-gray-900">{user?.firstName} {user?.lastName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{user?.email}</div>
                        </div>
                        <div className="p-2">
                          {[
                            { icon: User,    label: 'My Account',  path: '/account' },
                            { icon: Package, label: 'My Orders',   path: '/account/orders' },
                            { icon: Heart,   label: 'Wishlist',    path: '/account/wishlist' },
                            { icon: MapPin,  label: 'Addresses',   path: '/account/addresses' },
                            { icon: Settings,label: 'Settings',    path: '/account/profile' },
                          ].map(item => (
                            <Link key={item.path} to={item.path} onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-sky-50 hover:text-sky-700 transition-colors font-medium text-gray-700">
                              <item.icon className="w-4 h-4" /> {item.label}
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button onClick={handleLogout}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-gray-500 w-full">
                              <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-sky-200 text-sky-600 font-semibold text-sm hover:bg-sky-50 hover:border-sky-400 transition-all">
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}

              {/* Mobile menu */}
              <button onClick={() => dispatch(toggleMobileMenu())} className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors ml-1">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. MEGA CATEGORY MENU ──────────────────────────────────────────── */}
        <div className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="section-container">
            <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
              {/* All Categories */}
              <Link to="/products"
                className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-b-xl mr-3 shrink-0 hover:opacity-90 transition-opacity shadow-blue">
                <Menu className="w-4 h-4" /> All Categories
              </Link>

              {MEGA_CATEGORIES.map(cat => (
                <div
                  key={cat.slug + cat.name}
                  className="relative shrink-0"
                  onMouseEnter={() => onMegaEnter(cat.name)}
                  onMouseLeave={onMegaLeave}
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-1.5 px-3 py-3.5 text-sm font-semibold text-gray-600 hover:text-sky-600 whitespace-nowrap transition-colors group"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </Link>

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {activeMega === cat.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 bg-white rounded-2xl shadow-hover border border-gray-100 p-5 min-w-[280px] z-50 mt-0"
                        onMouseEnter={() => onMegaEnter(cat.name)}
                        onMouseLeave={onMegaLeave}
                      >
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                          <span className="text-2xl">{cat.emoji}</span>
                          <div>
                            <div className="font-bold text-sm text-gray-900">{cat.name}</div>
                            <div className="text-xs text-gray-400">Shop all categories</div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Popular</p>
                          <div className="grid grid-cols-2 gap-0.5">
                            {cat.featured.map(sub => (
                              <Link
                                key={sub}
                                to={`/category/${cat.slug}?q=${encodeURIComponent(sub)}`}
                                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-sky-50 hover:text-sky-700 transition-all group"
                              >
                                {sub}
                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Top Brands</p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.brands.map(b => (
                              <span key={b} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-semibold text-gray-500 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 cursor-pointer transition-all">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link to={`/category/${cat.slug}`}
                          className="flex items-center gap-1.5 mt-3 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors">
                          <Sparkles className="w-3.5 h-3.5" /> View all in {cat.name}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Specials */}
              <div className="ml-auto flex items-center gap-1 shrink-0">
                <Link to="/products?isBestseller=true" className="flex items-center gap-1.5 px-3 py-3.5 text-sm font-bold text-orange-500 whitespace-nowrap">
                  🔥 Hot Deals
                </Link>
                <Link to="/products?hasDiscount=true" className="flex items-center gap-1.5 px-3 py-3.5 text-sm font-bold text-pink-500 whitespace-nowrap">
                  🏷️ Sale
                </Link>
                <Link to="/products?isNew=true" className="flex items-center gap-1.5 px-3 py-3.5 text-sm font-bold text-green-600 whitespace-nowrap">
                  ✨ New In
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
