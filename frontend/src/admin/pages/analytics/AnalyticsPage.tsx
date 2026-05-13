import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IndianRupee, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminApiClient } from '../../../services/api/adminClient';
import KPICard from '../../components/shared/KPICard';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');

  const { data: dashData, isLoading } = useQuery({
    queryKey: ['admin','analytics','dashboard'],
    queryFn: () => adminApiClient.get('/analytics/dashboard'),
  });
  const { data: revenueData } = useQuery({
    queryKey: ['admin','analytics','revenue', period],
    queryFn: () => adminApiClient.get('/analytics/revenue', { params: { groupBy: 'day' } }),
  });

  const stats        = dashData?.data?.data;
  const revenueChart = revenueData?.data?.data || [];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Analytics</h1><p className="section-subtitle">Business performance insights</p></div>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="admin-input w-auto">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard title="Total Revenue" value={stats?.revenue?.total || 0} change={stats?.revenue?.growth} icon={IndianRupee} iconColor="text-indigo-600 bg-indigo-50" prefix="₹" isLoading={isLoading} />
        <KPICard title="This Month"    value={stats?.revenue?.thisMonth || 0}                              icon={TrendingUp}   iconColor="text-emerald-600 bg-emerald-50" prefix="₹" isLoading={isLoading} />
        <KPICard title="Total Orders"  value={stats?.orders?.total || 0}                                   icon={ShoppingBag}  iconColor="text-amber-600 bg-amber-50"                 isLoading={isLoading} />
        <KPICard title="Customers"     value={stats?.customers?.total || 0}                                icon={Users}        iconColor="text-purple-600 bg-purple-50"               isLoading={isLoading} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Revenue Trend</h3>
          <p className="text-xs text-slate-500 mb-5">Daily revenue over time</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueChart}>
              <defs><linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-1">Orders Volume</h3>
          <p className="text-xs text-slate-500 mb-5">Daily order count</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="period" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Avg Order Value', value: stats?.revenue?.total && stats?.orders?.total ? `₹${Math.round(stats.revenue.total / stats.orders.total).toLocaleString('en-IN')}` : '₹0', icon: '💰' },
          { label: 'Pending Orders',  value: stats?.orders?.pending || 0,    icon: '⏳' },
          { label: 'Low Stock Items', value: stats?.products?.lowStock || 0, icon: '⚠️' },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <span className="text-3xl">{m.icon}</span>
            <div><p className="text-xs text-slate-500">{m.label}</p><p className="text-xl font-bold text-slate-900">{m.value}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
