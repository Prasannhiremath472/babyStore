import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Priya Sharma',   city: 'Bengaluru', rating: 5, avatar: '👩', tag: 'Verified Buyer', review: 'My Baby is my absolute go-to for everything baby! The quality is outstanding and delivery is always on time. My newborn loves the organic clothing range!' },
  { name: 'Rahul Mehta',    city: 'Mumbai',    rating: 5, avatar: '👨', tag: 'Parent of 2',    review: 'Amazing selection of toys and feeding products. The Luvlap stroller I ordered arrived perfectly packed and works beautifully. Highly recommend!' },
  { name: 'Sneha Patel',    city: 'Delhi',     rating: 5, avatar: '👩', tag: 'New Mom',        review: 'The Himalaya and Chicco skincare products are absolutely worth every rupee. My baby\'s skin is so soft and healthy. Customer service is top-notch!' },
  { name: 'Arjun Nair',     city: 'Hyderabad', rating: 5, avatar: '👨', tag: 'Verified Buyer', review: 'Best baby products website in India! Easy navigation, genuine products, and super fast delivery. The Pampers diapers pack was delivered same day!' },
  { name: 'Kavita Iyer',    city: 'Chennai',   rating: 5, avatar: '👩', tag: 'Loyal Customer', review: 'I\'ve been shopping here for 2 years now. Never disappointed. The variety of products and trusted brands make this my first choice for baby shopping.' },
  { name: 'Vikram Joshi',   city: 'Pune',      rating: 5, avatar: '👨', tag: 'Verified Buyer', review: 'Ordered a baby carrier and wooden cot. Both are excellent quality. The baby cot assembly was easy and the carrier is super comfortable for my 3-month-old.' },
];

const STATS = [
  { value: '50,000+', label: 'Happy Families',   color: 'text-sky-600',    bg: 'bg-sky-50' },
  { value: '1,500+',  label: 'Products',         color: 'text-orange-600', bg: 'bg-orange-50' },
  { value: '4.9★',    label: 'Avg Rating',       color: 'text-green-600',  bg: 'bg-green-50' },
  { value: '98%',     label: 'On-time Delivery', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[200px] font-serif text-gray-100 select-none pointer-events-none leading-none opacity-40">"</div>

      <div className="section-container relative">
        <div className="text-center mb-12">
          <div className="eyebrow mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 inline-block animate-pulse" /> Happy Families
          </div>
          <h2 className="section-heading">What Parents Say</h2>
          <div className="section-divider mx-auto mt-2" />
          <p className="text-gray-500 text-sm mt-3">Join 50,000+ families who trust My Baby</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08 }}
              className={`text-center ${s.bg} rounded-2xl py-5 px-4 border border-gray-100`}>
              <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.09 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-hover transition-all duration-300 group card-hover-top relative overflow-hidden">
              <Quote className="w-8 h-8 text-orange-200 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-xl shrink-0">{t.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.city}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
