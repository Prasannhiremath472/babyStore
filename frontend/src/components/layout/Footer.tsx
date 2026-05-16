import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight, Baby, Shield, CreditCard, Truck } from 'lucide-react';

const LINKS = [
  { title: 'Shop', links: [
    { label: 'All Products',   href: '/products' },
    { label: 'New Arrivals',   href: '/products?isNew=true' },
    { label: 'Bestsellers',    href: '/products?isBestseller=true' },
    { label: 'Sale',           href: '/products?hasDiscount=true' },
    { label: 'Baby Care',      href: '/category/bath-skin-care' },
    { label: 'Toys & Games',   href: '/category/toys-games' },
  ]},
  { title: 'Customer Care', links: [
    { label: 'Track Order',    href: '/account/orders' },
    { label: 'Returns Policy', href: '/returns' },
    { label: 'FAQ',            href: '/faq' },
    { label: 'Store Locator',  href: '/store-locator' },
    { label: 'Contact Us',     href: '/contact' },
    { label: 'Size Guide',     href: '/size-guide' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us',       href: '/about' },
    { label: 'Careers',        href: '/careers' },
    { label: 'Blog',           href: '/blog' },
    { label: 'Press',          href: '/press' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use',   href: '/terms' },
  ]},
];

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'UPI', 'Razorpay', 'COD', 'Netbanking'];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl font-display font-black mb-1">Join the My Baby Family</h3>
              <p className="text-sky-200 text-sm">Get exclusive deals, parenting tips & new arrivals directly in your inbox.</p>
            </div>
            <form className="flex gap-3 w-full max-w-md" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-sky-200 focus:outline-none focus:bg-white/25 focus:ring-2 focus:ring-white/30 text-sm transition-all"
                onFocus={e => { e.currentTarget.style.backgroundColor='rgba(255,255,255,0.25)'; }}
                onBlur={e => { e.currentTarget.style.backgroundColor='rgba(255,255,255,0.15)'; }}
              />
              <button type="submit" className="flex items-center gap-2 bg-white text-sky-600 font-bold px-5 py-3 rounded-xl hover:bg-sky-50 transition-colors text-sm whitespace-nowrap">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-gray-800 bg-gray-800/50">
        <div className="section-container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck,      label: 'Free Delivery',    sub: 'On orders above ₹499' },
              { icon: Shield,     label: '100% Authentic',   sub: 'BIS & GOTS Certified' },
              { icon: CreditCard, label: 'Secure Payments',  sub: 'Razorpay & UPI' },
              { icon: Phone,      label: '24/7 Support',     sub: '1800-123-4567 (Toll Free)' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                  <t.icon className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.label}</div>
                  <div className="text-[10px] text-gray-500">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-display font-black text-xl text-white">My <span className="text-sky-400">Baby</span></div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">The New Born Baby Shop</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400 max-w-xs">
              India's premium destination for baby & kids products. Curated with love for 50,000+ happy families across India.
            </p>
            <div className="space-y-2.5 text-xs mb-6">
              <div className="flex items-center gap-2.5 text-gray-400 hover:text-sky-400 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" /> 42 MG Road, Koramangala, Bengaluru 560034
              </div>
              <div className="flex items-center gap-2.5 text-gray-400 hover:text-sky-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-sky-500 shrink-0" /> 1800-123-4567 (Toll Free)
              </div>
              <div className="flex items-center gap-2.5 text-gray-400 hover:text-sky-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-500 shrink-0" /> support@mybabystore.net
              </div>
            </div>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-sky-500 transition-all duration-200 hover:-translate-y-0.5 text-gray-400 hover:text-white">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {LINKS.map(section => (
            <div key={section.title}>
              <h4 className="font-bold text-sky-400 text-xs uppercase tracking-widest mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-xs text-gray-400 hover:text-sky-400 transition-colors hover:pl-1 duration-200 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2025 My Baby Store. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs text-gray-600">Secured by</span>
            {['Razorpay', 'SSL', '256-bit'].map(b => (
              <span key={b} className="text-[10px] bg-gray-800 border border-gray-700 px-2 py-1 rounded text-gray-400 font-mono">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
