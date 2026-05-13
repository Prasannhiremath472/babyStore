import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';

interface Props { products: any[] }

export default function BestsellerSection({ products }: Props) {
  if (!products.length) return null;

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#F8F7FF] to-primary-50/40">
      {/* Subtle blobs */}
      <div className="absolute -bottom-16 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(255,215,0,0.08)' }} />
      <div className="absolute top-0 left-10 w-40 h-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <div className="section-container relative">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/25 text-secondary-500 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] mb-3">
              <Flame className="w-3.5 h-3.5 fill-secondary-500 text-secondary-500" />
              Trending Now
            </div>
            <h2 className="section-heading">Bestsellers</h2>
            <p className="text-muted-foreground text-sm mt-1">Most loved by parents across India</p>
          </div>
          <Link to="/products?isBestseller=true" className="hidden sm:flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-600 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <ProductCard product={product} showBestseller />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
