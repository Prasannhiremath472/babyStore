import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BANNERS = [
  {
    title: 'Nursery Collection',
    desc: 'Create the perfect, safe space for your little one',
    cta: 'Shop Nursery',
    href: '/category/nursery',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=85',
    badge: '🛏️ New Season',
    gradient: 'from-primary/70 via-primary/30 to-transparent',
  },
  {
    title: 'Maternity Essentials',
    desc: "Comfort & care for every stage of motherhood",
    cta: 'Shop Maternity',
    href: '/category/maternity',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&q=85',
    badge: '🤱 For New Moms',
    gradient: 'from-primary-800/70 via-primary-600/30 to-transparent',
  },
];

const MINI_BANNERS = [
  { title: 'Organic Skincare', desc: '100% natural baby care', href: '/category/bath-skin-care', color: 'from-emerald-500 to-teal-600', emoji: '🌿' },
  { title: 'Safety Gear',      desc: 'Childproof your home',   href: '/category/health-safety',  color: 'from-primary to-accent',        emoji: '🛡️' },
  { title: 'School Ready',     desc: 'Back to school deals',   href: '/category/school-essentials', color: 'from-amber-500 to-orange-500', emoji: '🎒' },
];

export default function PromoBanners() {
  return (
    <section className="py-14 bg-[#F8F7FF]">
      <div className="section-container space-y-5">
        {/* Main 2-col banners */}
        <div className="grid md:grid-cols-2 gap-5">
          {BANNERS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Link to={b.href} className="group block relative rounded-3xl overflow-hidden h-64 shadow-card hover:shadow-deep transition-all duration-500">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${b.gradient}`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <span className="inline-flex items-center gap-1.5 bg-secondary text-primary text-xs font-black px-3 py-1.5 rounded-full mb-3 w-fit shadow-yellow-glow">
                    {b.badge}
                  </span>
                  <h3 className="text-2xl font-display font-black text-white mb-1.5 drop-shadow">{b.title}</h3>
                  <p className="text-white/80 text-sm mb-4 drop-shadow">{b.desc}</p>
                  <span className="inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-2.5 rounded-xl w-fit group-hover:bg-secondary group-hover:text-primary group-hover:shadow-yellow-glow transition-all duration-300 text-sm">
                    {b.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mini 3-col banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MINI_BANNERS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={b.href}
                className={`group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${b.color} text-white hover:shadow-elevated hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="text-4xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{b.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-base leading-tight">{b.title}</div>
                  <div className="text-white/75 text-xs mt-0.5">{b.desc}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
