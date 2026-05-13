import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, FileText, BarChart2, Users, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminApiClient } from '../../../services/api/adminClient';

const REPORT_TYPES = [
  { title: 'Revenue Report',   desc: 'Sales and revenue breakdown', icon: BarChart2, color: 'text-indigo-600 bg-indigo-50' },
  { title: 'Inventory Report', desc: 'Stock levels and movements',   icon: Package,  color: 'text-emerald-600 bg-emerald-50' },
  { title: 'Customer Report',  desc: 'Customer acquisition data',    icon: Users,    color: 'text-amber-600 bg-amber-50'   },
  { title: 'Order Report',     desc: 'Order fulfillment metrics',    icon: FileText, color: 'text-purple-600 bg-purple-50' },
];

export default function ReportsPage() {
  const [fromDate, setFromDate] = useState(new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]);
  const [toDate,   setToDate]   = useState(new Date().toISOString().split('T')[0]);

  const { data: revenueData, refetch, isFetching } = useQuery({
    queryKey: ['admin','reports','revenue', fromDate, toDate],
    queryFn: () => adminApiClient.get('/analytics/revenue', { params: { from: fromDate, to: toDate, groupBy: 'day' } }),
    enabled: false,
  });

  const revenueChart = revenueData?.data?.data || [];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Reports</h1><p className="section-subtitle">Export and analyse business data</p></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Revenue Report Builder</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div><label className="admin-label">From</label><input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="admin-input w-40" /></div>
          <div><label className="admin-label">To</label><input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="admin-input w-40" /></div>
          <button onClick={() => refetch()} disabled={isFetching} className="btn-admin-primary">{isFetching ? 'Loading…' : 'Generate'}</button>
          {revenueChart.length > 0 && <button className="btn-admin-secondary gap-1.5"><Download className="w-3.5 h-3.5" /> Export CSV</button>}
        </div>
        {revenueChart.length > 0 && (
          <div className="mt-5">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORT_TYPES.map(r => (
          <div key={r.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${r.color} mb-4 group-hover:scale-110 transition-transform`}><r.icon className="w-5 h-5" /></div>
            <h3 className="font-semibold text-slate-900 mb-1">{r.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{r.desc}</p>
            <button className="btn-admin-secondary text-xs gap-1.5 w-full justify-center"><Download className="w-3.5 h-3.5" /> Download CSV</button>
          </div>
        ))}
      </div>
    </div>
  );
}
