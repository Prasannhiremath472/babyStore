import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-900 to-[#06051A] text-primary-200">

      {/* Newsletter band */}
      <div className="relative bg-gradient-to-r from-primary-700 via-primary to-accent overflow-hidden py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,215,0,0.18),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.08),transparent_50%)] pointer-events-none" />
        <div className="section-container relative text-center text-white">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            ✉️ Newsletter
          </div>
          <h3 className="text-3xl lg:text-4xl font-display font-black mb-2">Join the My Baby Family</h3>
          <p className="mb-7 text-white/75 max-w-md mx-auto">Get exclusive deals, parenting tips, and new arrival alerts straight to your inbox.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl text-white focus:outline-none transition-all text-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
              onFocus={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,215,0,0.25)'; }}
              onBlur={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button
              type="submit"
              className="btn-yellow px-6 py-3.5 shrink-0 text-sm"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs mt-3 text-white/50">Use code <span className="text-secondary font-bold">WELCOME10</span> for 10% off your first order</p>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center border-2 border-secondary/30">
                <span className="text-base font-black text-white">MB</span>
              </div>
              <div>
                <div className="font-display font-black text-xl text-white leading-none">My <span className="text-secondary">BABY</span></div>
                <div className="text-xs text-primary-300 mt-0.5">The New Born Baby Shop</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-primary-300 max-w-xs">
              India's premium destination for newborn & baby products. Curated with love for 50,000+ happy families.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-primary-300 hover:text-secondary transition-colors">
                <MapPin className="w-4 h-4 text-secondary shrink-0" /> 42 MG Road, Bengaluru 560001
              </div>
              <div className="flex items-center gap-2.5 text-primary-300 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 text-secondary shrink-0" /> 1800-123-4567 (Toll Free)
              </div>
              <div className="flex items-center gap-2.5 text-primary-300 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4 text-secondary shrink-0" /> support@mybaby.in
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary text-primary-300 transition-all duration-200 hover:shadow-yellow-glow hover:-translate-y-0.5">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Shop',
              links: [
                { label: 'All Products', href: '/products' },
                { label: 'New Arrivals', href: '/products?isNew=true' },
                { label: 'Bestsellers', href: '/products?isBestseller=true' },
                { label: 'Sale', href: '/products?hasDiscount=true' },
                { label: 'Brands', href: '/products?brand=' },
              ],
            },
            {
              title: 'Customer Care',
              links: [
                { label: 'Track Order', href: '/account/orders' },
                { label: 'Return Policy', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Store Locator', href: '/store-locator' },
                { label: 'Contact Us', href: '/contact' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Blog', href: '/blog' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ],
            },
          ].map(section => (
            <div key={section.title}>
              <h4 className="font-bold text-secondary mb-4 text-sm uppercase tracking-wide">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-primary-300 hover:text-secondary transition-colors hover:pl-1 duration-200 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-400">© 2025 My Baby. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-primary-500">Secured by</span>
            {['Razorpay', 'SSL', '256-bit'].map(badge => (
              <span key={badge} className="text-xs bg-white/8 border border-white/12 px-2.5 py-1 rounded-lg text-primary-300 font-mono">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
