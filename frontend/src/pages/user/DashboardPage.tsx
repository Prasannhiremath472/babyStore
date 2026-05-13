import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store';
import { Package, Heart, MapPin, Star, Wallet, Bell } from 'lucide-react';

const MENU = [
  { label: 'My Orders', desc: 'Track and manage orders', icon: Package, href: '/account/orders', color: 'text-blue-500 bg-blue-50' },
  { label: 'Wishlist', desc: 'Saved items', icon: Heart, href: '/account/wishlist', color: 'text-red-500 bg-red-50' },
  { label: 'Addresses', desc: 'Delivery addresses', icon: MapPin, href: '/account/addresses', color: 'text-green-500 bg-green-50' },
  { label: 'My Reviews', desc: 'Product reviews', icon: Star, href: '/account/reviews', color: 'text-amber-500 bg-amber-50' },
  { label: 'Wallet', desc: 'Balance & history', icon: Wallet, href: '/account/wallet', color: 'text-purple-500 bg-purple-50' },
  { label: 'Notifications', desc: 'Order alerts', icon: Bell, href: '/account/notifications', color: 'text-teal-500 bg-teal-50' },
];

export default function DashboardPage() {
  const { user } = useAppSelector(s => s.auth);
  return (
    <>
      <Helmet><title>My Account - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-4xl">
          {/* Profile card */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl font-bold">
                {user?.firstName[0]}{user?.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Hi, {user?.firstName}! 👋</h1>
                <p className="opacity-90">{user?.email}</p>
              </div>
              <Link to="/account/profile" className="ml-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MENU.map(item => (
              <Link key={item.href} to={item.href} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
