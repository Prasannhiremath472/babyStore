import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Image, Star,
  BarChart3, Settings, ChevronLeft, ChevronRight, Archive, List,
  Shield, Percent, FileText, Boxes, TrendingUp
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { toggleAdminSidebar } from '../../../store/slices/adminUiSlice';

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
    ],
  },
  {
    label: 'Ecommerce',
    items: [
      { to: '/admin/products', icon: Package, label: 'Products' },
      { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
      { to: '/admin/customers', icon: Users, label: 'Customers' },
      { to: '/admin/inventory', icon: Boxes, label: 'Inventory' },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { to: '/admin/categories', icon: List, label: 'Categories' },
      { to: '/admin/brands', icon: Archive, label: 'Brands' },
      { to: '/admin/coupons', icon: Percent, label: 'Coupons' },
      { to: '/admin/banners', icon: Image, label: 'Banners' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/reviews', icon: Star, label: 'Reviews' },
      { to: '/admin/reports', icon: FileText, label: 'Reports' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/audit-logs', icon: Shield, label: 'Audit Logs' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function AdminSidebar() {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector(s => s.adminUi);
  const { user } = useAppSelector(s => s.adminAuth);

  return (
    <motion.aside
      className="admin-sidebar"
      animate={{ width: sidebarCollapsed ? 64 : 260 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="flex items-center h-[60px] px-4 border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-lg shrink-0">
          🐣
        </div>
        {!sidebarCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-3 overflow-hidden">
            <div className="font-bold text-white text-sm leading-none">LittleNest</div>
            <div className="text-xs text-slate-500 mt-0.5">Admin Panel</div>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="mb-4">
            {!sidebarCollapsed && (
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-600 uppercase tracking-widest">
                {group.label}
              </div>
            )}
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} my-0.5`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3 shrink-0">
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-slate-500 truncate">{user.role}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => dispatch(toggleAdminSidebar())}
          className="sidebar-link w-full justify-center"
          title={sidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!sidebarCollapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
