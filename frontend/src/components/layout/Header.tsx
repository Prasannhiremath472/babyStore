import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Search, Heart, User, Menu, X, ChevronDown,
  Phone, Tag, Truck, MapPin, Bell, Sparkles, ChevronRight, Baby
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleMobileMenu, toggleSearch, toggleMiniCart } from '../../store/slices/uiSlice';
import { logoutThunk } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const NAV_CATEGORIES = [
  {
    label: 'Baby Clothing', slug: 'baby-clothing', emoji: '👕',
    sub: ['Bodysuits & Onesies', 'Rompers', 'Sleepsuits', 'Sets & Combos', 'Winter Wear', 'Ethnic Wear'],
  },
  {
    label: 'Toys & Games', slug: 'toys-games', emoji: '🧸',
    sub: ['Educational Toys', 'Building Blocks', 'Soft Toys', 'Outdoor Play', 'Musical Toys', 'Puzzles'],
  },
  {
    label: 'Feeding', slug: 'feeding-essentials', emoji: '🍼',
    sub: ['Feeding Bottles', 'Breast Pumps', 'Highchairs', 'Bowls & Spoons', 'Bibs', 'Steamer & Blenders'],
  },
  {
    label: 'Skin Care', slug: 'bath-skin-care', emoji: '🛁',
    sub: ['Baby Wash', 'Massage Oils', 'Rash Creams', 'Grooming Kits', 'Bath Tubs', 'Sunscreen'],
  },
  {
    label: 'Baby Gear', slug: 'baby-gear', emoji: '🚼',
    sub: ['Strollers', 'Car Seats', 'Baby Carriers', 'Diaper Bags', 'Bouncers', 'Baby Monitors'],
  },
  {
    label: 'School', slug: 'school-essentials', emoji: '🎒',
    sub: ['Backpacks', 'Water Bottles', 'Lunch Boxes', 'Art & Craft', 'STEM Kits', 'Stationery'],
  },
];

const OFFER_ITEMS = [
  '🎁 Use code WELCOME10 for 10% off your first order',
  '🚚 Free delivery on orders above ₹499',
  '⚡ Flash Sale: Up to 50% off on Toys & Games',
  '🌿 New Arrivals: Organic Baby Clothing Collection',
  '🔒 100% Secure Payments via Razorpay & UPI',
  '↩️ Easy 7-day returns on all products',
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(s => s.auth);
  const { itemCount } = useAppSelector(s => s.cart);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleMenuEnter = (slug: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMegaMenu(slug);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMegaMenu(null), 150);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'shadow-deep bg-white/97 backdrop-blur-lg' : 'bg-white'}`}>

      {/* ── Offer ticker strip ── */}
      <div className="bg-gradient-to-r from-primary-800 via-primary to-primary-700 overflow-hidden py-2 hidden sm:block">
        <div className="flex overflow-hidden w-full">
          <div className="ticker-track flex gap-16 text-xs text-secondary font-semibold">
            {[...OFFER_ITEMS, ...OFFER_ITEMS].map((item, i) => (
              <span key={i} className="shrink-0 flex items-center gap-1">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main header row ── */}
      <div className="border-b border-border/40">
        <div className="section-container">
          <div className="flex items-center gap-4 py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-glow ring-2 ring-secondary/30 ring-offset-1 group-hover:shadow-glow-lg transition-all duration-300">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-black text-xl leading-none">
                  <span className="text-primary">My </span>
                  <span className="text-secondary" style={{ WebkitTextStroke: '0.5px #2C2880' }}>BABY</span>
                </div>
                <div className="text-[10px] text-muted-foreground font-medium tracking-wide">The New Born Baby Shop</div>
              </div>
            </Link>

            {/* Location pill */}
            <button className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded-xl px-3 py-2 shrink-0 hover:border-primary/30 hover:bg-primary-50/50">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="font-medium">Deliver to</span>
              <span className="text-foreground font-semibold">560001</span>
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 hidden md:flex">
              <div className={`relative w-full transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search for diapers, toys, clothing, skincare..."
                  className="w-full px-5 py-3 pr-14 rounded-2xl border-2 border-border bg-primary-50/40 focus:bg-white focus:border-primary focus:shadow-[0_0_0_4px_rgba(61,53,168,0.08)] outline-none transition-all text-sm font-medium placeholder-muted-foreground/70"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary-600 text-white p-2.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-glow hover:shadow-glow-lg active:scale-95"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">

              {/* Mobile search */}
              <button onClick={() => dispatch(toggleSearch())} className="md:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Wishlist */}
              {isAuthenticated && (
                <Link to="/account/wishlist" className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors group">
                  <Heart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                </Link>
              )}

              {/* Cart */}
              <button onClick={() => dispatch(toggleMiniCart())} className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors group">
                <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-secondary text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-yellow-glow border border-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-black border-2 border-secondary/40">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-xs text-muted-foreground">Hello,</div>
                      <div className="text-xs font-bold text-foreground leading-none">{user?.firstName}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-deep border border-border/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
                    <div className="px-3 py-2.5 border-b border-border/60 mb-2">
                      <div className="font-bold text-sm text-foreground">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{user?.email}</div>
                    </div>
                    {[
                      { label: '👤 My Account', path: '/account' },
                      { label: '📦 My Orders', path: '/account/orders' },
                      { label: '❤️ Wishlist', path: '/account/wishlist' },
                      { label: '📍 Addresses', path: '/account/addresses' },
                    ].map(item => (
                      <Link key={item.path} to={item.path} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-primary-50 hover:text-primary transition-colors font-medium">
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-border/60 mt-2 pt-2">
                      <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 border-2 border-primary/20 text-primary font-semibold py-2 px-4 rounded-xl text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200">
                    <User className="w-4 h-4" /> Sign In
                  </Link>
                  <Link to="/login" className="sm:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              )}

              {/* Mobile menu */}
              <button onClick={() => dispatch(toggleMobileMenu())} className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50 transition-colors ml-1">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category nav bar ── */}
      <div className="hidden lg:block bg-white border-b border-border/30" ref={megaMenuRef}>
        <div className="section-container">
          <nav className="flex items-center gap-0.5">
            {/* All Products button */}
            <Link
              to="/products"
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-accent rounded-b-none rounded-t-none hover:from-primary-600 hover:to-primary-700 transition-all mr-3 shrink-0 shadow-glow"
            >
              <Menu className="w-4 h-4" /> All Products
            </Link>

            {NAV_CATEGORIES.map(cat => (
              <div
                key={cat.slug}
                className="relative"
                onMouseEnter={() => handleMenuEnter(cat.slug)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-1.5 px-3.5 py-3.5 text-sm font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap nav-link"
                >
                  <span>{cat.emoji}</span> {cat.label}
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </Link>

                {/* Mega-dropdown */}
                <AnimatePresence>
                  {activeMegaMenu === cat.slug && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 bg-white rounded-2xl shadow-deep border border-border/60 p-4 min-w-[220px] z-50 mt-1"
                      onMouseEnter={() => handleMenuEnter(cat.slug)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-border/60">
                        <span className="text-xl">{cat.emoji}</span>
                        <span className="font-bold text-sm text-foreground">{cat.label}</span>
                      </div>
                      <ul className="space-y-0.5">
                        {cat.sub.map(sub => (
                          <li key={sub}>
                            <Link
                              to={`/category/${cat.slug}?q=${encodeURIComponent(sub)}`}
                              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary-50 transition-all font-medium group"
                            >
                              {sub}
                              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-2.5 border-t border-border/60">
                        <Link
                          to={`/category/${cat.slug}`}
                          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-600 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> View all in {cat.label}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="ml-auto flex items-center gap-1">
              <Link to="/products?isBestseller=true" className="flex items-center gap-1.5 px-3.5 py-3.5 text-sm font-bold text-secondary-500 hover:text-secondary-400 whitespace-nowrap transition-colors">
                🔥 Bestsellers
              </Link>
              <Link to="/products?hasDiscount=true" className="flex items-center gap-1.5 px-3.5 py-3.5 text-sm font-bold text-red-500 hover:text-red-600 whitespace-nowrap transition-colors">
                🏷️ Sale
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
