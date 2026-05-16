import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Clock } from 'lucide-react';

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setT({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1.5">
      {[t.h, t.m, t.s].map((val, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-white text-orange-600 font-black text-xl flex items-center justify-center shadow-orange border border-orange-100">
              {String(val).padStart(2, '0')}
            </div>
            <span className="text-[9px] font-bold text-white/70 mt-0.5 uppercase">{['HRS','MIN','SEC'][i]}</span>
          </div>
          {i < 2 && <span className="text-white font-black text-xl mb-4">:</span>}
        </div>
      ))}
    </div>
  );
}

const SALE_PRODUCTS = [
  { name: 'Baby Carrier Ergonomic', original: 3499, sale: 1749, off: 50, img: '/images/baby-gear/mb-3009-1.webp', slug: 'baby-carrier-ergonomic-wrap', sold: 68 },
  { name: 'Wooden Shape Sorter',    original: 1299, sale:  649, off: 50, img: '/images/nursery/mb-3001-1.jpg',    slug: 'wooden-shape-sorter-cube',    sold: 82 },
  { name: 'Baby Bath Tub Set',      original: 1799, sale:  999, off: 44, img: '/images/bath-skin-care/mb-3060-1.jpg',  slug: 'baby-bath-tub',          sold: 55 },
  { name: 'Kids School Backpack',   original: 1999, sale: 1099, off: 45, img: '/images/baby-clothing/mb-3088-1.jpeg', slug: 'kids-school-backpack',  sold: 74 },
  { name: 'Pampers Premium Pants',  original:  899, sale:  649, off: 28, img: '/images/diapers-wipes/dl-0695.jpeg',   slug: 'pampers-aloe-blue-l5-pants-1pcs', sold: 91 },
  { name: 'Himalaya Baby Massage',  original:  399, sale:  249, off: 38, img: '/images/bath-skin-care/mb-3069-1.webp', slug: 'himalaya-baby-massage-oil-200ml', sold: 77 },
];

export default function FlashSaleSection() {
  const saleEnd = new Date(Date.now() + 7 * 3600000 + 23 * 60000);

  return (
    <section className="py-14 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl" />

      <div className="section-container relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Zap className="w-7 h-7 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-black text-white">Flash Sale</h2>
              <p className="text-white/70 text-sm flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Hurry! Limited stock available
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm font-semibold hidden sm:block">Ends in</span>
            <CountdownTimer targetDate={saleEnd} />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SALE_PRODUCTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link to={`/products/${p.slug}`}
                className="block bg-white rounded-2xl overflow-hidden group border border-white/20 hover:shadow-hover transition-all duration-300 card-hover-top relative">
                {/* Discount badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-orange">
                    {p.off}% OFF
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                  />
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 mb-2 leading-snug">{p.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-base font-black text-gray-900">₹{p.sale.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-400 line-through">₹{p.original.toLocaleString('en-IN')}</span>
                  </div>
                  {/* Stock bar */}
                  <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.sold}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">{p.sold}% sold</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/products?hasDiscount=true"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-3 rounded-2xl hover:bg-orange-50 transition-all shadow-orange hover:-translate-y-0.5">
            View All Sale Items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
