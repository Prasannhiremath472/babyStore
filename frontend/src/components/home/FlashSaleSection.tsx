import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const labels = ['HRS', 'MIN', 'SEC'];
  return (
    <div className="flex items-center gap-2">
      {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-secondary text-primary w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-yellow-glow leading-none">
              {String(val).padStart(2, '0')}
            </div>
            <span className="text-white/60 text-[9px] font-bold mt-1 uppercase tracking-wider">{labels[i]}</span>
          </div>
          {i < 2 && <span className="text-secondary font-black text-xl mb-4">:</span>}
        </div>
      ))}
    </div>
  );
}

const SALE_PRODUCTS = [
  { name: 'Baby Carrier Ergonomic Wrap', originalPrice: 3499, salePrice: 1749, discount: 50, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80', slug: 'baby-carrier-ergonomic-wrap', sold: 68 },
  { name: 'Wooden Shape Sorter Cube',    originalPrice: 1299, salePrice:  649, discount: 50, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', slug: 'wooden-shape-sorter-cube',    sold: 82 },
  { name: 'Baby Bath Tub w/ Gauge',      originalPrice: 1799, salePrice:  999, discount: 44, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', slug: 'baby-bath-tub',               sold: 55 },
  { name: 'Kids School Backpack',        originalPrice: 1999, salePrice: 1099, discount: 45, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', slug: 'kids-school-backpack',        sold: 74 },
];

export default function FlashSaleSection() {
  const saleEnd = new Date(Date.now() + 6 * 3600000);

  return (
    <section className="py-14 relative overflow-hidden bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600">
      {/* Gold shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.22),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.10),transparent_50%)] pointer-events-none" />

      <div className="section-container relative">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shadow-yellow-glow">
              <Zap className="w-6 h-6 text-primary fill-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-black text-white">Flash Sale</h2>
              <p className="text-white/65 text-sm">Limited time — don't miss out!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm font-semibold">Ends in</span>
            <CountdownTimer targetDate={saleEnd} />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SALE_PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
            >
              <Link to={`/products/${p.slug}`} className="block bg-white rounded-2xl overflow-hidden group hover:shadow-deep hover:-translate-y-1.5 transition-all duration-300 border border-white/10">
                <div className="relative aspect-square overflow-hidden bg-primary-50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-secondary to-amber-400 text-primary text-xs font-black px-2.5 py-1 rounded-lg shadow-yellow-glow">
                    {p.discount}% OFF
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug">{p.name}</p>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-primary font-black text-base">₹{p.salePrice.toLocaleString('en-IN')}</span>
                    <span className="text-muted-foreground line-through text-xs">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  {/* Stock bar */}
                  <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.sold}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-secondary to-amber-400 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 font-medium">{p.sold}% sold</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products?hasDiscount=true" className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-3 rounded-xl hover:bg-secondary-400 transition-all shadow-yellow-glow hover:shadow-yellow-glow-lg hover:-translate-y-0.5">
            View All Sale Items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
