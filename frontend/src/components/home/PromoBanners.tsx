import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MAIN_BANNERS = [
  { title: 'Nursery Essentials', desc: 'Create the perfect safe space for your little one', cta: 'Shop Nursery', href: '/category/nursery',
    gradient: 'from-purple-500 to-indigo-600', emoji: '🛏️', badge: '🆕 New Collection' },
  { title: 'Maternity Must-Haves', desc: 'Comfort & care for every stage of motherhood', cta: 'Shop Maternity', href: '/category/maternity',
    gradient: 'from-pink-500 to-rose-600', emoji: '🤱', badge: '❤️ For New Moms' },
];

const MINI_BANNERS = [
  { title: 'Organic Skincare', desc: 'Natural baby care', href: '/category/bath-skin-care', gradient: 'from-green-500 to-teal-600', emoji: '🌿' },
  { title: 'Safety First',    desc: 'Childproof your home', href: '/category/health-safety', gradient: 'from-sky-500 to-blue-600', emoji: '🛡️' },
  { title: 'Back to School',  desc: 'Bags, bottles & more', href: '/category/school-essentials', gradient: 'from-orange-500 to-amber-600', emoji: '🎒' },
  { title: 'Flash Deals',     desc: 'Up to 50% off today', href: '/products?hasDiscount=true', gradient: 'from-red-500 to-pink-600', emoji: '⚡' },
];

export default function PromoBanners() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="section-container space-y-5">

        {/* 2-col main banners */}
        <div className="grid md:grid-cols-2 gap-5">
          {MAIN_BANNERS.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity:0, x: i===0 ? -20 : 20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}>
              <Link to={b.href} className={`group block relative rounded-3xl overflow-hidden h-52 bg-gradient-to-r ${b.gradient} hover:shadow-hover transition-all duration-500`}>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
                {/* Emoji decoration */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-30 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">{b.emoji}</div>

                <div className="relative p-8 h-full flex flex-col justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit">{b.badge}</span>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white mb-1.5">{b.title}</h3>
                    <p className="text-white/75 text-sm mb-4">{b.desc}</p>
                    <span className="inline-flex items-center gap-2 bg-white text-gray-800 font-bold px-5 py-2.5 rounded-xl text-sm group-hover:bg-white/90 transition-all group-hover:-translate-y-0.5 w-fit">
                      {b.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 4-col mini banners */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MINI_BANNERS.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08 }}>
              <Link to={b.href}
                className={`group flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${b.gradient} text-white hover:shadow-hover hover:-translate-y-1 transition-all duration-300`}>
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{b.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm leading-tight">{b.title}</div>
                  <div className="text-white/70 text-xs mt-0.5">{b.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
