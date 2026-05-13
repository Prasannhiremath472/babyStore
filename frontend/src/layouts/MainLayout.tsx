import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MiniCart from '../components/cart/MiniCart';
import MobileMenu from '../components/layout/MobileMenu';
import SearchOverlay from '../components/layout/SearchOverlay';

// Pages where footer should be hidden and main fills viewport
const NO_FOOTER_ROUTES = ['/store-locator'];

export default function MainLayout() {
  const { pathname } = useLocation();
  const hideFooter = NO_FOOTER_ROUTES.includes(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={`flex flex-col bg-background ${hideFooter ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Header />
      <main className={hideFooter ? 'flex-1 overflow-hidden flex flex-col' : 'flex-1'}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <MiniCart />
      <MobileMenu />
      <SearchOverlay />
    </div>
  );
}
