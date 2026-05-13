import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-100 via-brand-lavender to-brand-sky relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          {['🧸', '🍼', '👶', '🌟', '💕', '🎀', '🐣', '🌈'].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-pulse-soft"
              style={{
                left: `${(i * 13 + 5) % 90}%`,
                top: `${(i * 17 + 10) % 80}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <div className="relative z-10 text-center">
          <Link to="/" className="inline-block mb-8">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-soft">
                <span className="text-3xl">🐣</span>
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">LittleNest</h1>
                <p className="text-sm text-gray-500 font-medium">Premium Baby & Kids</p>
              </div>
            </div>
          </Link>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4 leading-tight">
            Everything your<br />little one needs
          </h2>
          <p className="text-gray-600 text-lg max-w-sm mx-auto">
            Curated premium products for babies and kids, delivered with love to your doorstep.
          </p>
          <div className="mt-12 flex justify-center gap-8">
            {[
              { label: '10,000+', sub: 'Products' },
              { label: '50,000+', sub: 'Happy Families' },
              { label: '4.8★', sub: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-3xl">🐣</span>
              <span className="text-2xl font-display font-bold">LittleNest</span>
            </Link>
          </div>
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
