import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ShopByCategory from '../components/home/ShopByCategory';
import FlashSaleSection from '../components/home/FlashSaleSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanners from '../components/home/PromoBanners';
import BestsellerSection from '../components/home/BestsellerSection';
import FeaturedBrands from '../components/home/FeaturedBrands';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { productsApi } from '../services/api/products.api';

export default function HomePage() {
  const { data: featuredData, isLoading: featLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.getFeatured(10),
    staleTime: 300000,
  });
  const { data: bestsellersData } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: () => productsApi.getBestsellers(12),
    staleTime: 300000,
  });

  const featured = featuredData?.data?.data || [];
  const bestsellers = bestsellersData?.data?.data || [];

  return (
    <>
      <Helmet>
        <title>My Baby — The New Born Baby Shop | Premium Baby & Kids Products India</title>
        <meta name="description" content="Shop India's finest baby & kids products at My Baby. Premium organic clothing, safe toys, feeding essentials, skincare & baby gear. Free delivery above ₹499. 1500+ products." />
        <meta name="keywords" content="baby products India, baby clothing online, newborn products, baby toys India, baby skincare, organic baby products, baby store online India" />
        <link rel="canonical" href="https://www.mybabystore.net/" />
        <meta property="og:title" content="My Baby — Premium Baby & Kids Products India" />
        <meta property="og:description" content="Shop India's finest baby & kids products. Organic clothing, safe toys, feeding essentials & skincare. Free delivery above ₹499." />
        <meta property="og:url" content="https://www.mybabystore.net/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="My Baby — Premium Baby & Kids Products India" />
        <meta name="twitter:description" content="Shop India's finest baby & kids products. Free delivery above ₹499." />
      </Helmet>

      <div className="min-h-screen">
        {/* 1. Hero slider */}
        <HeroSection />

        {/* 2. Why choose us — trust band */}
        <WhyChooseUs />

        {/* 3. Shop by Category */}
        <ShopByCategory />

        {/* 4. Flash Sale */}
        <FlashSaleSection />

        {/* 5. Featured Products */}
        <FeaturedProducts products={featured} isLoading={featLoading} />

        {/* 6. Promo banners (2 large + 3 mini) */}
        <PromoBanners />

        {/* 7. Bestsellers */}
        <BestsellerSection products={bestsellers} />

        {/* 8. Brands marquee */}
        <FeaturedBrands />

        {/* 9. Testimonials + stats */}
        <TestimonialsSection />
      </div>
    </>
  );
}
