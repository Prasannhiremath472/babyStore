import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { name: 'Baby Care',    emoji: '🧴', slug: 'bath-skin-care',     color: 'from-blue-400 to-cyan-500',    bg: 'bg-blue-50',   border: 'border-blue-100' },
  { name: 'Toys',         emoji: '🧸', slug: 'toys-games',          color: 'from-orange-400 to-pink-500',  bg: 'bg-orange-50', border: 'border-orange-100' },
  { name: 'Fashion',      emoji: '👗', slug: 'baby-clothing',       color: 'from-pink-400 to-rose-500',    bg: 'bg-pink-50',   border: 'border-pink-100' },
  { name: 'Feeding',      emoji: '🍼', slug: 'feeding-essentials',  color: 'from-green-400 to-teal-500',   bg: 'bg-green-50',  border: 'border-green-100' },
  { name: 'Diapers',      emoji: '🧷', slug: 'diapers-wipes',       color: 'from-purple-400 to-violet-500',bg: 'bg-purple-50', border: 'border-purple-100' },
  { name: 'Nursery',      emoji: '🛏️', slug: 'nursery',             color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50',  border: 'border-amber-100' },
  { name: 'Footwear',     emoji: '👟', slug: 'footwear',            color: 'from-teal-400 to-green-500',   bg: 'bg-teal-50',   border: 'border-teal-100' },
  { name: 'School',       emoji: '🎒', slug: 'school-essentials',   color: 'from-indigo-400 to-blue-500',  bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { name: 'Health',       emoji: '🏥', slug: 'health-safety',       color: 'from-red-400 to-orange-500',   bg: 'bg-red-50',    border: 'border-red-100' },
  { name: 'Baby Gear',    emoji: '🚼', slug: 'baby-gear',           color: 'from-sky-400 to-blue-500',     bg: 'bg-sky-50',    border: 'border-sky-100' },
  { name: 'Maternity',    emoji: '🤱', slug: 'maternity',           color: 'from-rose-400 to-pink-500',    bg: 'bg-rose-50',   border: 'border-rose-100' },
  { name: 'Books',        emoji: '📚', slug: 'books',               color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50', border: 'border-yellow-100' },
];

export default function ShopByCategory() {
  return (
    <section className="py-14 bg-white">
      <div className="section-container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block animate-pulse" />
              Shop by Category
            </div>
            <h2 className="section-heading">Find What You Need</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sky-600 font-semibold text-sm hover:text-sky-700 group">
            All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug + cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className={`flex flex-col items-center gap-2.5 p-3 rounded-2xl ${cat.bg} border-2 ${cat.border} hover:shadow-soft transition-all duration-300 group cursor-pointer`}
              >
                {/* Circular gradient icon */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
                  <span className="text-2xl drop-shadow-sm">{cat.emoji}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-700 text-center leading-snug">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
