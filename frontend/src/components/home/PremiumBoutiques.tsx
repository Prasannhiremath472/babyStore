import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const BOUTIQUES = [
  {
    title: 'Best Selling Styles',
    desc: 'Shop frocks & dresses, t-shirts & more',
    cta: 'Explore Now',
    href: '/category/baby-clothing',
    badge: null,
    priceBadge: 'STARTING ₹249',
    tag: 'NEW TODAY',
    imgs: ['/images/baby-clothing/dl-0001.jpeg','/images/baby-clothing/dl-0003.jpeg','/images/baby-clothing/dl-0005.jpeg','/images/baby-clothing/dl-0006.jpeg'],
    gradient: 'from-sky-400/80 to-blue-600/60',
  },
  {
    title: 'Diapers & Wipes',
    desc: 'Premium protection for your baby',
    cta: 'Shop Now',
    href: '/category/diapers-wipes',
    badge: 'FLAT 40% OFF',
    priceBadge: null,
    tag: null,
    imgs: ['/images/diapers-wipes/dl-0123.jpeg','/images/diapers-wipes/dl-0124.jpeg','/images/diapers-wipes/dl-0389.jpeg','/images/diapers-wipes/dl-0416.jpeg'],
    gradient: 'from-orange-400/80 to-red-600/60',
  },
  {
    title: 'Bath & Skincare',
    desc: 'Gentle care for delicate baby skin',
    cta: 'Shop Now',
    href: '/category/bath-skin-care',
    badge: 'FLAT 40% OFF',
    priceBadge: null,
    tag: null,
    imgs: ['/images/bath-skin-care/dl-0045.jpeg','/images/bath-skin-care/dl-0048.jpeg','/images/bath-skin-care/dl-0049.jpeg','/images/bath-skin-care/dl-0050.jpeg'],
    gradient: 'from-green-400/80 to-teal-600/60',
  },
  {
    title: 'Baby Toys & Games',
    desc: 'Educational fun for growing minds',
    cta: 'Explore Now',
    href: '/category/toys-games',
    badge: 'UPTO 75% OFF',
    priceBadge: null,
    tag: null,
    imgs: ['/images/toys-games/dl-0012.jpeg','/images/toys-games/dl-0016.jpeg','/images/toys-games/dl-0017.jpeg','/images/toys-games/dl-0036.jpeg'],
    gradient: 'from-purple-400/80 to-pink-600/60',
  },
  {
    title: 'Baby Gear & Activity',
    desc: 'Strollers, carriers & more',
    cta: 'Shop Now',
    href: '/category/baby-gear',
    badge: 'UPTO 80% OFF',
    priceBadge: null,
    tag: null,
    imgs: ['/images/baby-gear/dl-0043.jpeg','/images/baby-gear/dl-0089.jpeg','/images/baby-gear/dl-0118.jpeg','/images/baby-gear/dl-0119.jpeg'],
    gradient: 'from-amber-400/80 to-orange-600/60',
  },
  {
    title: 'Feeding Essentials',
    desc: 'Bottles, breast pumps & baby food',
    cta: 'Shop Now',
    href: '/category/feeding-essentials',
    badge: 'UPTO 50% OFF',
    priceBadge: null,
    tag: null,
    imgs: ['/images/feeding-essentials/dl-0018.jpeg','/images/feeding-essentials/dl-0024.jpeg','/images/feeding-essentials/dl-0025.jpeg','/images/feeding-essentials/dl-0026.jpeg'],
    gradient: 'from-pink-400/80 to-rose-600/60',
  },
];

export default function PremiumBoutiques() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-black text-gray-900 uppercase tracking-wide">Premium Boutiques</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOUTIQUES.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-hover transition-all duration-300 group">
                {/* Image grid — 2x2 */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-0.5 bg-gray-100">
                    {b.imgs.map((img, j) => (
                      <div key={j} className="aspect-square overflow-hidden">
                        <img src={img} alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${b.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

                  {/* Price badge top-right */}
                  {b.badge && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-black px-2.5 py-1.5 rounded-lg leading-none text-center">
                      {b.badge.split(' ').slice(0,1)} <br />
                      <span className="text-lg font-black">{b.badge.match(/\d+/)?.[0]}%</span><br />
                      OFF
                    </div>
                  )}
                  {b.priceBadge && (
                    <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-xs font-black px-2.5 py-1.5 rounded-lg text-center leading-snug border border-gray-200">
                      STARTING<br /><span className="text-base text-green-600">₹249</span>
                    </div>
                  )}

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-black text-base uppercase">{b.title}</h3>
                    <p className="text-white/80 text-xs mt-0.5">{b.desc}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{b.title} | Up To 14Y</p>
                    <Link to={b.href} className="text-sm font-black text-gray-900 hover:text-sky-600 transition-colors uppercase tracking-wide">
                      {b.cta}
                    </Link>
                  </div>
                  {b.tag && (
                    <span className="text-[10px] font-black text-orange-500 border border-orange-200 bg-orange-50 px-2 py-1 rounded-lg">{b.tag}</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
