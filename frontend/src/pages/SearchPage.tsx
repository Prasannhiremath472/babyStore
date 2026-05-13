import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/products/ProductCard';
import ProductCardSkeleton from '../components/products/ProductCardSkeleton';
import { productsApi } from '../services/api/products.api';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => productsApi.list({ search: query, status: 'ACTIVE', limit: 24 }),
    enabled: !!query,
  });

  const products = data?.data?.products || data?.data?.data?.products || [];
  const total = data?.data?.meta?.total || data?.data?.data?.meta?.total || 0;

  return (
    <>
      <Helmet>
        <title>{query ? `"${query}" — Search Results` : 'Search'} | My Baby</title>
        <meta name="description" content={query ? `Search results for "${query}" at My Baby. Shop baby products, clothing, toys & more in India.` : 'Search for baby products at My Baby India.'} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="section-container py-6">
            <h1 className="text-2xl font-display font-bold">
              {query ? `Results for "${query}"` : 'Search Products'}
            </h1>
            {!isLoading && query && (
              <p className="text-muted-foreground mt-1">{total} products found</p>
            )}
          </div>
        </div>
        <div className="section-container py-8">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <span className="text-7xl block mb-4">🤔</span>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
