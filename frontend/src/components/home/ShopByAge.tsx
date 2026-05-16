import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AGE_GROUPS = [
  { label: '0-3 Months',  emoji: '👶', color: 'from-blue-400 to-sky-500',    bg: 'bg-blue-50',   ageGroup: '0-3 months',  products: '120+' },
  { label: '3-6 Months',  emoji: '🍼', color: 'from-green-400 to-teal-500',  bg: 'bg-green-50',  ageGroup: '3-6 months',  products: '180+' },
  { label: '6-12 Months', emoji: '🧸', color: 'from-orange-400 to-amber-500',bg: 'bg-orange-50', ageGroup: '6-12 months', products: '250+' },
  { label: '1-3 Years',   emoji: '🚀', color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50', ageGroup: '1-3 years',   products: '350+' },
  { label: '3-7 Years',   emoji: '🎨', color: 'from-red-400 to-rose-500',    bg: 'bg-red-50',    ageGroup: '3-7 years',   products: '280+' },
  { label: '7-12 Years',  emoji: '🎒', color: 'from-indigo-400 to-blue-500', bg: 'bg-indigo-50', ageGroup: '7-12 years',  products: '200+' },
];

export default function ShopByAge() {
  return (
    <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <div className="eyebrow mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse" /> Shop by Age
          </div>
          <h2 className="section-heading">Products For Every Stage</h2>
          <div className="section-divider mx-auto mt-2" />
          <p className="text-gray-500 text-sm mt-3">Curated products for your child's development stage</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {AGE_GROUPS.map((a, i) => (
            <motion.div key={a.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08 }} whileHover={{ y:-6, scale:1.03 }}>
              <Link to={`/products?ageGroup=${encodeURIComponent(a.ageGroup)}`}
                className={`block ${a.bg} rounded-3xl p-5 text-center border-2 border-transparent hover:border-gray-200 hover:shadow-soft transition-all duration-300 group`}>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-md mb-3 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-3xl">{a.emoji}</span>
                </div>
                <div className="font-bold text-sm text-gray-900">{a.label}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-medium">{a.products} products</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
