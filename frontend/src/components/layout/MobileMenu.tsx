import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, User, ShoppingBag, Heart, Home, Search, Tag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { closeMobileMenu } from '../../store/slices/uiSlice';
import { logoutThunk } from '../../store/slices/authSlice';

const MENU_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'All Products', href: '/products', icon: ShoppingBag },
  { label: 'Sale & Offers', href: '/products?hasDiscount=true', icon: Tag },
  { label: 'Baby Clothing', href: '/category/baby-clothing' },
  { label: 'Toys & Games', href: '/category/toys-games' },
  { label: 'Feeding Essentials', href: '/category/feeding-essentials' },
  { label: 'Baby Gear', href: '/category/baby-gear' },
  { label: 'Bath & Skin Care', href: '/category/bath-skin-care' },
];

export default function MobileMenu() {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector(s => s.ui);
  const { isAuthenticated, user } = useAppSelector(s => s.auth);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            onClick={(e) => { if (e.target === e.currentTarget) dispatch(closeMobileMenu()); }}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white z-[70] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b">
              <Link to="/" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-xs font-black text-white">MB</span>
                </div>
                <span className="font-display font-black text-lg">My <span className="text-secondary">BABY</span></span>
              </Link>
              <button onClick={() => dispatch(closeMobileMenu())} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAuthenticated && (
              <div className="p-5 bg-gradient-to-r from-primary-50 to-secondary-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {user?.firstName[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{user?.firstName} {user?.lastName}</div>
                    <Link to="/account" onClick={() => dispatch(closeMobileMenu())} className="text-sm text-primary">View Account</Link>
                  </div>
                </div>
              </div>
            )}

            <nav className="p-4">
              {MENU_ITEMS.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon className="w-4 h-4 text-primary" />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              {isAuthenticated ? (
                <button
                  onClick={() => { dispatch(logoutThunk()); dispatch(closeMobileMenu()); }}
                  className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" onClick={() => dispatch(closeMobileMenu())} className="flex-1 btn-secondary text-sm py-2.5 justify-center">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => dispatch(closeMobileMenu())} className="flex-1 btn-primary text-sm py-2.5 justify-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
