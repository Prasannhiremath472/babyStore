import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Sparkles, Shield, Truck, RotateCcw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api/client';
import { HERO_IMAGES } from '../../constants/images';

const FALLBACK_SLIDES = [
  {
    id: '1',
    title: 'Everything Your\nLittle One Needs',
    subtitle: 'The New Born Baby Shop',
    description: 'Curated with love — organic clothing, safe toys, feeding essentials and skincare for your precious baby.',
    image: HERO_IMAGES.baby,
    cta: { label: 'Shop Now', href: '/products' },
    ctaSecondary: { label: 'New Arrivals', href: '/products?isNew=true' },
    badge: '🎁 WELCOME10 — 10% off',
    stat: { value: '1500+', label: 'Products' },
    accent: 'from-primary-50 via-white to-brand-lavender',
  },
  {
    id: '2',
    title: 'Toys That Teach\n& Delight',
    subtitle: 'Up to 50% Off on Toys & Games',
    description: 'BIS-certified, safe and educational toys designed to spark curiosity and creativity in every child.',
    image: HERO_IMAGES.toys,
    cta: { label: 'Shop Toys', href: '/category/toys-games' },
    ctaSecondary: { label: 'View Sale', href: '/products?hasDiscount=true' },
    badge: '⚡ Flash Sale Live',
    stat: { value: '50%', label: 'Off Toys' },
    accent: 'from-primary-50 to-primary-100',
  },
  {
    id: '3',
    title: 'Pure Skincare\nFor Baby Skin',
    subtitle: 'Dermatologist Tested & Approved',
    description: 'Gentle, organic baby skincare — shampoos, lotions, massage oils and rash creams safe for newborns.',
    image: HERO_IMAGES.skincare,
    cta: { label: 'Shop Skincare', href: '/category/bath-skin-care' },
    ctaSecondary: { label: 'Learn More', href: '/products?isNew=true' },
    badge: '🌿 100% Organic',
    stat: { value: '4.9★', label: 'Rating' },
    accent: 'from-primary-50 to-brand-lavender',
  },
];

const TRUST = [
  { icon: Truck, label: 'Free Delivery', sub: 'Above ₹499' },
  { icon: Shield, label: 'BIS Certified', sub: 'Safe products' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '7-day policy' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const { data } = useQuery({
    queryKey: ['banners', 'hero'],
    queryFn: () => apiClient.get('/banners?type=HERO'),
    staleTime: 300000,
  });

  const slides = (data as any)?.data?.data?.length > 0 ? (data as any).data.data : FALLBACK_SLIDES;

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-brand-lavender">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: 'rgba(61,53,168,0.04)' }} />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none" style={{ backgroundColor: 'rgba(255,215,0,0.08)' }} />

      <div className="section-container py-8 lg:py-0 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[560px]">

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="py-12 lg:py-16"
            >
              {/* Badge */}
              {slide.badge && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-black px-4 py-2 rounded-full mb-5 shadow-yellow-glow border border-secondary-400/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {slide.badge}
                </motion.span>
              )}

              {/* Heading */}
              <h1 className="text-4xl lg:text-6xl font-display font-black text-foreground leading-[1.08] tracking-tight mb-4 whitespace-pre-line">
                {slide.title?.split('\n').map((line: string, i: number) => (
                  <span key={i} className="block">
                    {i === 1
                      ? <span className="relative inline-block">
                          <span className="gradient-text">{line}</span>
                          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-amber-400 rounded-full" />
                        </span>
                      : line
                    }
                  </span>
                ))}
              </h1>

              <p className="text-lg font-bold text-primary mb-3">{slide.subtitle}</p>
              <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">{slide.description}</p>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <Link to={slide.cta?.href || '/products'} className="btn-primary text-sm px-7 py-3.5">
                  <ShoppingBag className="w-4 h-4" />
                  {slide.cta?.label || 'Shop Now'}
                </Link>
                {slide.ctaSecondary && (
                  <Link to={slide.ctaSecondary.href} className="btn-secondary text-sm px-7 py-3.5">
                    {slide.ctaSecondary.label}
                  </Link>
                )}
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-primary/10">
                {TRUST.map(t => (
                  <div key={t.label} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-card border border-border/50">
                    <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                      <t.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground leading-none">{t.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{t.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Image ── */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${current}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/8 to-secondary/8 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-secondary/6 rounded-3xl" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="relative w-full h-[500px] object-cover rounded-3xl shadow-deep"
                  loading="eager"
                />

                {/* Floating rating card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="absolute bottom-6 left-6 glass-card px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />)}
                    <span className="text-xs font-black text-foreground ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">50,000+ happy families</p>
                </motion.div>

                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-6 right-6 glass-card px-4 py-3 text-center"
                >
                  <div className="text-2xl font-black text-primary leading-none">{slide.stat?.value || '1500+'}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">{slide.stat?.label || 'Products'}</div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'bg-gradient-to-r from-secondary to-amber-400 w-8 h-2.5 shadow-yellow-glow'
                : 'bg-primary/20 w-2.5 h-2.5 hover:bg-primary/30'
            }`}
          />
        ))}
      </div>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md shadow-soft border border-border/50 rounded-full flex items-center justify-center hover:bg-white hover:shadow-elevated hover:border-primary/20 transition-all z-10">
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md shadow-soft border border-border/50 rounded-full flex items-center justify-center hover:bg-white hover:shadow-elevated hover:border-primary/20 transition-all z-10">
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
    </section>
  );
}
