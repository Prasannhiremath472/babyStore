import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'Babyhug',          logo: '🧸', slug: 'babyhug',          color: 'from-pink-50 to-pink-100/60' },
  { name: 'Mee Mee',          logo: '🐣', slug: 'mee-mee',           color: 'from-yellow-50 to-amber-100/60' },
  { name: 'Chicco',           logo: '🍼', slug: 'chicco',            color: 'from-blue-50 to-blue-100/60' },
  { name: 'Fisher-Price',     logo: '🎯', slug: 'fisher-price',      color: 'from-red-50 to-orange-100/60' },
  { name: "Johnson's Baby",   logo: '🌸', slug: 'johnsons-baby',     color: 'from-rose-50 to-pink-100/60' },
  { name: 'Pigeon',           logo: '🕊️', slug: 'pigeon',            color: 'from-sky-50 to-cyan-100/60' },
  { name: 'Himalaya Baby',    logo: '🌿', slug: 'himalaya-baby',     color: 'from-emerald-50 to-green-100/60' },
  { name: 'Lego',             logo: '🧱', slug: 'lego',              color: 'from-yellow-50 to-yellow-100/60' },
  { name: 'Mothercare',       logo: '🤱', slug: 'mothercare',        color: 'from-purple-50 to-violet-100/60' },
  { name: 'Nuby',             logo: '🌟', slug: 'nuby',              color: 'from-teal-50 to-teal-100/60' },
];

// Duplicate for infinite scroll effect
const MARQUEE = [...BRANDS, ...BRANDS];

export default function FeaturedBrands() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="section-container mb-8">
        <div className="text-center">
          <div className="eyebrow mx-auto w-fit">
            <span className="eyebrow-dot" /> Trusted Brands
          </div>
          <h2 className="section-heading mt-1">Shop by Brand</h2>
          <p className="text-muted-foreground text-sm mt-2">Explore our curated selection of premium baby brands</p>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee">
          {MARQUEE.map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/products?brand=${brand.slug}`}
              className={`flex-shrink-0 flex flex-col items-center gap-2.5 p-5 bg-gradient-to-b ${brand.color} rounded-2xl border border-border/50 hover:border-primary/25 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group w-28`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{brand.logo}</span>
              <span className="text-xs font-bold text-foreground text-center leading-tight group-hover:text-primary transition-colors">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Static grid fallback for small screens */}
      <div className="section-container mt-8 sm:hidden">
        <div className="grid grid-cols-4 gap-3">
          {BRANDS.slice(0, 8).map((brand, i) => (
            <motion.div key={brand.slug} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/products?brand=${brand.slug}`} className={`flex flex-col items-center gap-1.5 p-3 bg-gradient-to-b ${brand.color} rounded-xl border border-border/50 group`}>
                <span className="text-3xl">{brand.logo}</span>
                <span className="text-[10px] font-bold text-center text-foreground leading-tight">{brand.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
