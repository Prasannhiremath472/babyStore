import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Search, Download, RefreshCw } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'badge-pending', CONFIRMED: 'badge-info', PROCESSING: 'badge-info',
  SHIPPED: 'badge-info', DELIVERED: 'badge-active', CANCELLED: 'badge-error',
};

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const qc = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin', 'orders', page, search, status],
    queryFn: () => adminApiClient.get('/orders/admin/all', { params: { page, limit: 20, search, status: status || undefined } }),
  });

  const orders = data?.data?.data?.orders || [];
  const total  = data?.data?.data?.total  || 0;

  const updateMutation = useMutation({
    mutationFn: ({ id, status, message }: any) => adminApiClient.patch(`/orders/admin/${id}/status`, { status, message }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'orders'] }); toast.success('Order status updated'); },
  });

  const columns: ColumnDef<any>[] = [
    {
      header: 'Order', accessorKey: 'orderNumber',
      cell: ({ row }) => (
        <div>
          <Link to={`/admin/orders/${row.original.id}`} className="font-mono text-xs text-indigo-600 hover:underline font-bold">{row.original.orderNumber}</Link>
          <div className="text-xs text-slate-400">{new Date(row.original.createdAt).toLocaleDateString('en-IN')}</div>
        </div>
      ),
    },
    {
      header: 'Customer', id: 'customer',
      cell: ({ row }) => (
        <div>
          <div className="text-sm font-medium">{row.original.user?.firstName} {row.original.user?.lastName}</div>
          <div className="text-xs text-slate-400">{row.original.user?.email}</div>
        </div>
      ),
    },
    { header: 'Items', id: 'items', cell: ({ row }) => <span className="text-sm text-slate-600">{row.original.items?.length || 0} items</span> },
    { header: 'Amount', accessorKey: 'totalAmount', cell: ({ getValue }) => <span className="font-bold text-slate-800">₹{Number(getValue()).toLocaleString('en-IN')}</span> },
    {
      header: 'Status', accessorKey: 'status',
      cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={e => updateMutation.mutate({ id: row.original.id, status: e.target.value, message: `Updated to ${e.target.value}` })}
          className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {['PENDING','CONFIRMED','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'].map(s => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      ),
    },
    {
      header: 'Actions', id: 'actions',
      cell: ({ row }) => (
        <Link to={`/admin/orders/${row.original.id}`} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded inline-flex">
          <Eye className="w-3.5 h-3.5" />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Orders</h1><p className="section-subtitle">{total.toLocaleString()} total orders</p></div>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="btn-admin-secondary text-xs"><RefreshCw className="w-3.5 h-3.5" /></button>
          <button className="btn-admin-secondary text-xs"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="admin-input pl-9" />
        </div>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="admin-input w-auto">
          <option value="">All Status</option>
          {['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED'].map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={orders} columns={columns} isLoading={isLoading} pagination={{ page, limit: 20, total, onPageChange: setPage }} />
      </div>
    </div>
  );
}
