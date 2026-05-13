import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api/client';

const FALLBACK_CATEGORIES = [
  { name: 'Baby Clothing',      icon: '👕', slug: 'baby-clothing',      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&q=80' },
  { name: 'Toys & Games',       icon: '🧸', slug: 'toys-games',          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { name: 'Feeding Essentials', icon: '🍼', slug: 'feeding-essentials',  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
  { name: 'Baby Gear',          icon: '🚼', slug: 'baby-gear',            image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80' },
  { name: 'Bath & Skin Care',   icon: '🛁', slug: 'bath-skin-care',       image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=80' },
  { name: 'School Essentials',  icon: '🎒', slug: 'school-essentials',   image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80' },
  { name: 'Nursery',            icon: '🛏️', slug: 'nursery',              image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80' },
  { name: 'Footwear',           icon: '👟', slug: 'footwear',             image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { name: 'Diapers & Wipes',    icon: '🧷', slug: 'diapers-wipes',        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80' },
  { name: 'Health & Safety',    icon: '🏥', slug: 'health-safety',        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
];

export default function ShopByCategory() {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.get('/categories'),
    staleTime: 3600000,
  });

  const raw = data?.data?.data || FALLBACK_CATEGORIES;
  // merge images into API data
  const categories = raw.map((c: any) => ({
    ...c,
    image: c.image || FALLBACK_CATEGORIES.find(f => f.slug === c.slug)?.image || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80',
  }));

  return (
    <section className="py-14 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="section-container">
        {/* Heading */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Categories
            </div>
            <h2 className="section-heading">Shop by Category</h2>
            <p className="text-muted-foreground text-sm mt-1">Find exactly what your baby needs</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-primary font-semibold text-sm hover:text-primary-600 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat: any, i: number) => (
            <motion.div
              key={cat.slug || cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group block relative rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-transparent hover:border-primary/10"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-primary-50">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80'; }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent opacity-90" />
                </div>

                {/* Arrow badge */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-yellow-glow">
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </div>

                {/* Text at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl drop-shadow-md">{cat.icon}</span>
                    <div>
                      <div className="font-bold text-white text-xs leading-snug drop-shadow">{cat.name}</div>
                      {cat._count?.products > 0 && (
                        <div className="text-white/70 text-[10px]">{cat._count.products} items</div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
