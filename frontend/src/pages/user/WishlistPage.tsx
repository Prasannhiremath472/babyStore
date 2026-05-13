import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import apiClient from '../../services/api/client';

export default function WishlistPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => apiClient.get('/users/wishlist'),
  });
  const items = data?.data?.data || [];

  return (
    <>
      <Helmet><title>My Wishlist - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container">
          <h1 className="text-2xl font-display font-bold mb-6">My Wishlist ({items.length})</h1>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-64 skeleton" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Save items you love!</p>
              <Link to="/products" className="btn-primary">Explore Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((item: any) => <ProductCard key={item.id} product={item.product} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
