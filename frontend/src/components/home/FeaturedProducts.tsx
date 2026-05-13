import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import ProductCardSkeleton from '../products/ProductCardSkeleton';

interface Props { products: any[]; isLoading?: boolean; }

export default function FeaturedProducts({ products, isLoading }: Props) {
  return (
    <section className="py-16 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="section-container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Handpicked
            </div>
            <h2 className="section-heading">Featured Products</h2>
            <p className="text-muted-foreground text-sm mt-1">Curated picks loved by parents across India</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-600 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 10).map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
