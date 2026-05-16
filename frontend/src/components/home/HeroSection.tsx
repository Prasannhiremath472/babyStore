import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Sparkles, Shield, Truck, RotateCcw, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge:      '🎁 Welcome Offer — Use code WELCOME10',
    title:      'Dress Your\nLittle One\nWith Love',
    highlight:  'Little One',
    subtitle:   '1500+ premium baby clothing styles — organic cotton, BIS certified & adorable',
    cta:        { label: 'Shop Baby Clothing', href: '/category/baby-clothing' },
    cta2:       { label: 'New Arrivals', href: '/products?isNew=true' },
    bg:         'from-sky-50 via-blue-50 to-indigo-50',
    accent:     'from-sky-400 to-blue-600',
    image:      '/images/hero/hero-baby.jpg',
    fallback:   '👗',
    stats:      [{ v: '1500+', l: 'Products' }, { v: '50K+', l: 'Happy Parents' }, { v: '4.9★', l: 'Rating' }],
  },
  {
    id: 2,
    badge:      '⚡ Flash Sale — Up to 50% Off on Toys',
    title:      'Toys That\nMake Every\nDay Magic',
    highlight:  'Every\nDay Magic',
    subtitle:   'BIS-certified safe, educational & fun toys — building blocks, soft toys, puzzles & more',
    cta:        { label: 'Shop Toys Now', href: '/category/toys-games' },
    cta2:       { label: 'View All Deals', href: '/products?hasDiscount=true' },
    bg:         'from-orange-50 via-amber-50 to-yellow-50',
    accent:     'from-orange-400 to-pink-500',
    image:      '/images/hero/hero-toys.jpg',
    fallback:   '🧸',
    stats:      [{ v: '50%', l: 'Off Today' }, { v: 'BIS', l: 'Certified Safe' }, { v: '₹499+', l: 'Free Delivery' }],
  },
  {
    id: 3,
    badge:      '🌿 Organic & Dermatologist Approved',
    title:      'Gentle Care\nFor Your\nBaby\'s Skin',
    highlight:  'Baby\'s Skin',
    subtitle:   'Himalaya, Johnson\'s, Chicco & more — tear-free, sulfate-free, safe for newborns',
    cta:        { label: 'Shop Skincare', href: '/category/bath-skin-care' },
    cta2:       { label: 'View Brands', href: '/category/bath-skin-care' },
    bg:         'from-green-50 via-teal-50 to-cyan-50',
    accent:     'from-green-400 to-teal-600',
    image:      '/images/hero/hero-skincare.jpg',
    fallback:   '🧴',
    stats:      [{ v: '100%', l: 'Organic' }, { v: 'Newborn', l: 'Safe' }, { v: 'Doctor', l: 'Approved' }],
  },
];

const TRUST_BADGES = [
  { icon: Truck,    label: 'Free Delivery', sub: 'Above ₹499' },
  { icon: Shield,   label: 'BIS Certified', sub: 'Safe products' },
  { icon: RotateCcw,label: 'Easy Returns',  sub: '7-day policy' },
  { icon: Star,     label: '4.9★ Rating',   sub: '50K+ reviews' },
];

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => { setDir(1); setCur(c => (c + 1) % SLIDES.length); }, []);
  const prev = () => { setDir(-1); setCur(c => (c - 1 + SLIDES.length) % SLIDES.length); };

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[cur];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <div className="relative overflow-hidden">
      {/* Main hero */}
      <div className={`bg-gradient-to-br ${slide.bg} transition-all duration-700`}>
        <div className="section-container py-10 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[520px]">

            {/* ── Content ── */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`content-${cur}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="py-12 lg:py-16"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-bold px-4 py-2 rounded-full shadow-soft border border-white/60 mb-5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  {slide.badge}
                </motion.div>

                {/* Heading */}
                <h1 className="text-4xl lg:text-6xl font-display font-black text-gray-900 leading-[1.08] tracking-tight mb-4 whitespace-pre-line">
                  {slide.title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line === slide.highlight
                        ? <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>{line}</span>
                        : line
                      }
                    </span>
                  ))}
                </h1>

                <p className="text-gray-500 text-lg mb-8 max-w-lg leading-relaxed">{slide.subtitle}</p>

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap mb-10">
                  <Link to={slide.cta.href}
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold px-7 py-3.5 rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-blue">
                    <ShoppingBag className="w-4 h-4" /> {slide.cta.label}
                  </Link>
                  <Link to={slide.cta2.href}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-white hover:-translate-y-0.5 transition-all shadow-soft border border-white/60">
                    {slide.cta2.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  {slide.stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-xl font-black bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>{s.v}</div>
                      <div className="text-xs text-gray-500 font-medium">{s.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Image ── */}
            <div className="relative hidden lg:flex items-center justify-center">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={`image-${cur}`}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-full"
                >
                  {/* Decorative blobs */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${slide.accent} opacity-8 rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] blur-3xl`} />
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-yellow-200/40 rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl" />

                  {/* HD image with premium frame */}
                  <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] aspect-[4/3] border-4 border-white/60">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const p = (e.target as HTMLImageElement).parentElement!;
                        p.innerHTML = `<div class="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-gray-100 to-gray-50">${slide.fallback}</div>`;
                      }}
                    />
                    {/* Subtle shine overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                  </div>

                  {/* Floating card 1 */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 glass-card p-3.5 rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <span className="text-xs font-black text-gray-800">4.9</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">50K+ happy families</p>
                  </motion.div>

                  {/* Floating card 2 */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -top-4 -right-4 glass-card p-3.5 rounded-2xl"
                  >
                    <p className="text-xs font-black text-gray-800">🚀 Just arrived</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">1500+ new products</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
              className={`transition-all duration-300 rounded-full ${i === cur ? 'w-8 h-3 bg-sky-500 shadow-blue' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center hover:shadow-hover transition-all z-10">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass-card rounded-full flex items-center justify-center hover:shadow-hover transition-all z-10">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* ── Trust badges strip ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100">
            {TRUST_BADGES.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 py-4 px-6"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <t.icon className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{t.label}</div>
                  <div className="text-xs text-gray-500">{t.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
