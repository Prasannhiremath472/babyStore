import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Priya Sharma',   location: 'Bengaluru', rating: 5, avatar: '👩', tag: 'Verified Buyer', review: "My Baby is my go-to for all baby needs. The quality is exceptional and delivery is always on time. My baby loves everything I've ordered!" },
  { name: 'Rahul Mehta',    location: 'Mumbai',    rating: 5, avatar: '👨', tag: 'Parent of 2',     review: "Amazing range of products! The wooden toys are beautifully crafted and my toddler plays with them all day. Will definitely order again." },
  { name: 'Sneha Patel',    location: 'Delhi',     rating: 5, avatar: '👩', tag: 'New Mom',         review: "The organic baby clothing is worth every rupee. So soft and gentle on my newborn's skin. Customer service is also top-notch!" },
  { name: 'Arjun Nair',     location: 'Hyderabad', rating: 5, avatar: '👨', tag: 'Verified Buyer', review: "Best baby products website in India! Easy to use, great prices, and the products are exactly as described. Highly recommend!" },
];

const STATS = [
  { value: '50,000+', label: 'Happy Families' },
  { value: '1,500+',  label: 'Products' },
  { value: '4.9★',    label: 'Avg Rating' },
  { value: '98%',     label: 'On-time Delivery' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F8F7FF] via-white to-primary-50/30 relative overflow-hidden">
      {/* Decorative large quote */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[180px] font-serif text-primary/3 select-none pointer-events-none leading-none">"</div>

      <div className="section-container relative">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="eyebrow mx-auto w-fit">
            <span className="eyebrow-dot" /> Happy Families
          </div>
          <h2 className="section-heading mt-1">What Parents Say</h2>
          <p className="text-muted-foreground mt-2 text-sm">Join 50,000+ families who trust My Baby</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center bg-white rounded-2xl py-5 px-4 border border-border/60 shadow-card"
            >
              <div className="text-2xl font-black text-primary gradient-text mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="relative backdrop-blur-sm p-6 rounded-3xl hover:shadow-elevated transition-all duration-300 group overflow-hidden card-hover-border" style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(61,53,168,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(61,53,168,0.25)') as any}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(61,53,168,0.08)') as any}
            >
              {/* Quote icon */}
              <Quote className="w-9 h-9 text-secondary/50 mb-4" />

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.review}"</p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xl shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-foreground truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>

              {/* Stars + tag */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="text-[10px] bg-primary-50 text-primary font-bold px-2 py-0.5 rounded-full">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
