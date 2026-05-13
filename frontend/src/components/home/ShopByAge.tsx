import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AGE_GROUPS = [
  { label: 'Newborn', range: '0-3 Months', emoji: '👶', color: 'from-pink-100 to-rose-50', link: '/products?ageGroup=0-3 months' },
  { label: 'Infant', range: '3-12 Months', emoji: '🐣', color: 'from-blue-100 to-sky-50', link: '/products?ageGroup=3-12 months' },
  { label: 'Toddler', range: '1-3 Years', emoji: '🧒', color: 'from-green-100 to-emerald-50', link: '/products?ageGroup=1-3 years' },
  { label: 'Kids', range: '3-7 Years', emoji: '👧', color: 'from-yellow-100 to-amber-50', link: '/products?ageGroup=3-7 years' },
  { label: 'Junior', range: '7-12 Years', emoji: '🧑', color: 'from-purple-100 to-violet-50', link: '/products?ageGroup=7-12 years' },
  { label: 'Teen', range: '12+ Years', emoji: '🙋', color: 'from-orange-100 to-red-50', link: '/products?ageGroup=12+ years' },
];

export default function ShopByAge() {
  return (
    <section className="py-14 bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">Personalized Shopping</span>
          <h2 className="section-heading mt-2">Shop by Age Group</h2>
          <p className="text-muted-foreground mt-2">Find the perfect products tailored for your child's stage</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {AGE_GROUPS.map((age, i) => (
            <motion.div
              key={age.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={age.link}
                className={`flex flex-col items-center p-4 md:p-6 rounded-2xl bg-gradient-to-br ${age.color} hover:shadow-soft hover:-translate-y-1 transition-all duration-300 group`}
              >
                <span className="text-4xl md:text-5xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {age.emoji}
                </span>
                <span className="font-semibold text-foreground text-sm md:text-base">{age.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{age.range}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
