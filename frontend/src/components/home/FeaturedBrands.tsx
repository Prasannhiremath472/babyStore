import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'Himalaya',     emoji: '🌿', color: 'from-green-400 to-teal-500',   bg: 'bg-green-50',  slug: 'himalaya-baby' },
  { name: "Johnson's",    emoji: '🌸', color: 'from-pink-400 to-rose-500',    bg: 'bg-pink-50',   slug: 'johnsons-baby' },
  { name: 'Chicco',       emoji: '🍼', color: 'from-blue-400 to-sky-500',     bg: 'bg-blue-50',   slug: 'chicco' },
  { name: 'Pampers',      emoji: '🧷', color: 'from-purple-400 to-violet-500',bg: 'bg-purple-50', slug: 'pampers' },
  { name: 'LuvLap',       emoji: '🚼', color: 'from-orange-400 to-amber-500', bg: 'bg-orange-50', slug: 'luvlap' },
  { name: 'Pigeon',       emoji: '🕊️', color: 'from-sky-400 to-cyan-500',     bg: 'bg-sky-50',    slug: 'pigeon' },
  { name: 'Fisher-Price', emoji: '🎯', color: 'from-red-400 to-orange-500',   bg: 'bg-red-50',    slug: 'fisher-price' },
  { name: 'Mee Mee',      emoji: '🐣', color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50', slug: 'mee-mee' },
  { name: 'Dabur',        emoji: '🌱', color: 'from-emerald-400 to-green-500',bg: 'bg-emerald-50',slug: 'dabur-baby' },
  { name: 'Mothercare',   emoji: '🤱', color: 'from-indigo-400 to-blue-500',  bg: 'bg-indigo-50', slug: 'mothercare' },
];

const DOUBLE = [...BRANDS, ...BRANDS];

export default function FeaturedBrands() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="section-container mb-8">
        <div className="flex items-end justify-between">
          <div>
            <div className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block animate-pulse" /> Trusted Brands
            </div>
            <h2 className="section-heading">Shop by Brand</h2>
            <div className="section-divider mt-2" />
          </div>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee">
          {DOUBLE.map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/products?brand=${brand.slug}`}
              className={`flex-shrink-0 flex flex-col items-center gap-3 p-5 ${brand.bg} rounded-2xl border border-gray-100 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group w-32`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                <span className="text-2xl">{brand.emoji}</span>
              </div>
              <span className="text-xs font-bold text-gray-700 text-center leading-snug group-hover:text-sky-600 transition-colors">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Static grid for mobile */}
      <div className="section-container mt-6 sm:hidden">
        <div className="grid grid-cols-4 gap-3">
          {BRANDS.slice(0, 8).map((brand, i) => (
            <motion.div key={brand.slug} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: i*0.05 }}>
              <Link to={`/products?brand=${brand.slug}`}
                className={`flex flex-col items-center gap-2 p-3 ${brand.bg} rounded-xl border border-gray-100 group`}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center`}>
                  <span className="text-xl">{brand.emoji}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-700 text-center">{brand.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
