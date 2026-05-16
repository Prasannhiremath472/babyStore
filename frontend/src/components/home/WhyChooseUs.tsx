import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Award, Headphones, CreditCard, Leaf, Star } from 'lucide-react';

const FEATURES = [
  { icon: Truck,       title: 'Free Delivery',       desc: 'On orders above ₹499',         color: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-100' },
  { icon: Shield,      title: '100% Authentic',       desc: 'BIS & GOTS certified',         color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
  { icon: RotateCcw,   title: 'Easy Returns',         desc: '7-day hassle-free',            color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: Award,       title: 'Premium Quality',      desc: 'Curated & quality tested',     color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { icon: Headphones,  title: '24/7 Support',         desc: 'Expert baby care advice',      color: 'text-pink-600',   bg: 'bg-pink-50',   border: 'border-pink-100' },
  { icon: CreditCard,  title: 'Secure Payments',      desc: 'Razorpay & UPI protected',     color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-100' },
  { icon: Leaf,        title: 'Organic Options',      desc: 'Natural & eco-friendly',       color: 'text-emerald-600',bg: 'bg-emerald-50',border: 'border-emerald-100' },
  { icon: Star,        title: '4.9★ Rated',           desc: '50,000+ happy parents',        color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-100' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="section-container">
        <div className="text-center mb-10">
          <div className="eyebrow mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block animate-pulse" /> Why My Baby
          </div>
          <h2 className="section-heading">Why Parents Trust Us</h2>
          <div className="section-divider mx-auto mt-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.06 }}
              className={`flex flex-col items-center text-center gap-3 p-4 rounded-2xl ${f.bg} border ${f.border} hover:shadow-soft transition-all group cursor-default`}>
              <div className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <div className="font-bold text-xs text-gray-900 leading-tight">{f.title}</div>
              <div className="text-[10px] text-gray-500 leading-snug">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
