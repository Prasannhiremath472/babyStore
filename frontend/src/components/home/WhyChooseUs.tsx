import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Award, Headphones, CreditCard } from 'lucide-react';

const FEATURES = [
  { icon: Truck,        title: 'Free Delivery',    desc: 'On orders above ₹499' },
  { icon: Shield,       title: 'Safe & Certified', desc: 'BIS & GOTS certified' },
  { icon: RotateCcw,    title: 'Easy Returns',     desc: '7-day hassle-free' },
  { icon: Award,        title: 'Premium Quality',  desc: 'Curated & tested' },
  { icon: Headphones,   title: '24/7 Support',     desc: 'Expert baby care advice' },
  { icon: CreditCard,   title: 'Secure Payments',  desc: 'Razorpay & UPI' },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-10 overflow-hidden bg-gradient-to-r from-primary-800 via-primary to-accent">
      {/* Gold radial shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.10),transparent_50%)] pointer-events-none" />

      <div className="section-container relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-0 lg:divide-x lg:divide-white/10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center text-center gap-2.5 px-4 py-3 group"
            >
              <div className="w-12 h-12 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                <f.icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-bold text-sm text-white leading-snug">{f.title}</div>
              <div className="text-xs text-white/65 leading-snug">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
