import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const PRICE_BUCKETS = [
  { label: 'UNDER', price: '249', href: '/products?maxPrice=249', color: 'from-orange-400 to-red-500' },
  { label: 'UNDER', price: '449', href: '/products?maxPrice=449', color: 'from-pink-400 to-rose-500' },
  { label: 'UNDER', price: '749', href: '/products?maxPrice=749', color: 'from-purple-400 to-indigo-500' },
];

const SUBCATEGORY_GRID = [
  { label: 'Infant Wear',    img: '/images/baby-clothing/dl-0001.jpeg',  href: '/products?q=infant+wear', },
  { label: 'Baby Rompers',   img: '/images/baby-clothing/dl-0003.jpeg',  href: '/products?q=romper', },
  { label: 'Bodysuits',      img: '/images/baby-clothing/dl-0005.jpeg',  href: '/products?q=bodysuit', },
  { label: 'Ethnic Wear',    img: '/images/baby-clothing/dl-0006.jpeg',  href: '/products?q=kurta+pyjama', },
  { label: 'Sets & Combos',  img: '/images/baby-clothing/dl-0008.jpeg',  href: '/products?q=set', },
  { label: 'Caps & Mittens', img: '/images/baby-clothing/dl-0009.jpeg',  href: '/products?q=cap', },
  { label: 'Socks',          img: '/images/baby-clothing/dl-0010.jpeg',  href: '/products?q=socks', },
  { label: 'Winter Wear',    img: '/images/baby-clothing/dl-0011.jpeg',  href: '/products?q=winter', },
];

export default function PriceFilterBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="section-container space-y-8">

        {/* Price filter banner — exactly like FirstCry */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 p-8">
          {/* Sun/summer decoration */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20">☀️</div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '25px 25px' }} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
            <div className="text-white text-center sm:text-left">
              <div className="text-xl font-black uppercase tracking-wider mb-1">☀️ Sunny Play Days</div>
              <div className="text-white/80 text-sm">FLAT <span className="text-yellow-300 font-black text-2xl">40%</span> OFF</div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {PRICE_BUCKETS.map(pb => (
                <Link key={pb.price} to={pb.href}
                  className="group flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/25 hover:bg-white/25 transition-all hover:-translate-y-1">
                  <span className="text-white/80 text-xs font-bold uppercase">{pb.label}</span>
                  <span className="text-white font-black text-4xl leading-none">₹{pb.price}</span>
                  <ChevronRight className="w-4 h-4 text-white/60 mt-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Subcategory image grid — like FirstCry */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Baby Fashion</span>
              <h2 className="text-xl font-display font-black text-gray-900">BABY CLOTHING <span className="text-orange-500">FLAT 40% OFF</span></h2>
            </div>
            <Link to="/category/baby-clothing" className="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:text-sky-700">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {SUBCATEGORY_GRID.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: i*0.05 }}>
                <Link to={item.href} className="group block">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-2 border-2 border-transparent group-hover:border-sky-300 transition-all">
                    <img src={item.img} alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-700 leading-snug group-hover:text-sky-600 transition-colors">{item.label}</p>
                    <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-sky-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
