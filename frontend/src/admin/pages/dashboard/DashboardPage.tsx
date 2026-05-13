import { useQuery } from '@tanstack/react-query';
import { IndianRupee, ShoppingBag, Users, Package, Clock, CheckCircle, TruckIcon, XCircle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { adminApiClient } from '../../../services/api/adminClient';
import KPICard from '../../components/shared/KPICard';

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING:          { label: 'Pending',          color: '#f59e0b' },
  CONFIRMED:        { label: 'Confirmed',         color: '#6366f1' },
  PROCESSING:       { label: 'Processing',        color: '#3b82f6' },
  SHIPPED:          { label: 'Shipped',           color: '#8b5cf6' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery',  color: '#f97316' },
  DELIVERED:        { label: 'Delivered',         color: '#10b981' },
  CANCELLED:        { label: 'Cancelled',         color: '#ef4444' },
};

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminApiClient.get('/analytics/dashboard'),
    refetchInterval: 60000,
  });

  const { data: recentOrdersData } = useQuery({
    queryKey: ['admin', 'recent-orders'],
    queryFn: () => adminApiClient.get('/orders/admin/all?limit=8'),
  });

  const stats = data?.data?.data;
  const recentOrders = recentOrdersData?.data?.data?.orders || [];
  const revenueChartData = stats?.revenueByDay || [];
  const orderStatusData = (stats?.orders?.byStatus || []).map((s: any) => ({
    name: STATUS_CONFIG[s.status]?.label || s.status,
    value: s._count,
    color: STATUS_CONFIG[s.status]?.color || '#94a3b8',
  }));

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle">Welcome back! Here's what's happening with LittleNest.</p>
        </div>
        <button className="btn-admin-primary text-xs"><ArrowUpRight className="w-3.5 h-3.5" /> Export</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard title="Total Revenue"  value={stats?.revenue?.total || 0}     change={stats?.revenue?.growth} icon={IndianRupee} iconColor="text-indigo-600 bg-indigo-50" prefix="₹" isLoading={isLoading} />
        <KPICard title="Total Orders"   value={stats?.orders?.total || 0}                                      icon={ShoppingBag} iconColor="text-emerald-600 bg-emerald-50"                              isLoading={isLoading} />
        <KPICard title="Customers"      value={stats?.customers?.total || 0}                                   icon={Users}       iconColor="text-amber-600 bg-amber-50"                                  isLoading={isLoading} />
        <KPICard title="Products"       value={stats?.products?.total || 0}                                    icon={Package}     iconColor="text-purple-600 bg-purple-50"                                isLoading={isLoading} />
      </div>

      {/* Secondary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Orders",     value: stats?.orders?.today || 0,                                             color: 'text-blue-600'  },
          { label: 'Month Revenue',      value: `₹${(stats?.revenue?.thisMonth || 0).toLocaleString('en-IN')}`,       color: 'text-green-600' },
          { label: 'Pending Orders',     value: stats?.orders?.pending || 0,                                           color: 'text-amber-600' },
          { label: 'Low Stock Alerts',   value: stats?.products?.lowStock || 0,                                        color: 'text-red-600'   },
        ].map(m => (
          <div key={m.label} className="kpi-card flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-500 font-semibold">{m.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${m.color}`}>{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Revenue Overview</h3>
          <p className="text-xs text-slate-500 mb-5">Daily revenue — last 30 days</p>
          {revenueChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-56 flex items-center justify-center text-slate-400 text-sm">No revenue data yet.</div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Orders by Status</h3>
          <p className="text-xs text-slate-500 mb-5">Current distribution</p>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {orderStatusData.map((entry: any, i: number) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No order data</div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900">Recent Orders</h3>
            <p className="text-xs text-slate-500">Latest 8 orders</p>
          </div>
          <Link to="/admin/orders" className="btn-admin-secondary text-xs py-1.5">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-400">No orders yet</td></tr>
              ) : recentOrders.map((order: any) => {
                const sc = STATUS_CONFIG[order.status];
                return (
                  <tr key={order.id}>
                    <td>
                      <Link to={`/admin/orders/${order.id}`} className="font-mono text-xs text-indigo-600 hover:underline font-bold">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td>
                      <div className="text-sm font-medium">{order.user?.firstName} {order.user?.lastName}</div>
                      <div className="text-xs text-slate-400">{order.user?.email}</div>
                    </td>
                    <td className="text-sm text-slate-500">{order.items?.length} items</td>
                    <td className="font-bold text-slate-800 text-sm">₹{Number(order.totalAmount).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`status-badge ${sc?.color === '#10b981' ? 'badge-active' : sc?.color === '#ef4444' ? 'badge-error' : sc?.color === '#f59e0b' ? 'badge-pending' : 'badge-info'}`}>
                        {sc?.label || order.status}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
