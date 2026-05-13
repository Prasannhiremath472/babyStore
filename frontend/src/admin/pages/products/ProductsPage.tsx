import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Search, Edit2, Trash2, Check } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'badge-active', DRAFT: 'badge-inactive',
  PENDING_APPROVAL: 'badge-pending', ARCHIVED: 'badge-error',
};

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'products', page, search, status],
    queryFn: () => adminApiClient.get('/products', { params: { page, limit: 20, search, status: status || undefined } }),
  });

  const products = data?.data?.data?.products || [];
  const total = data?.data?.meta?.total || 0;

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.patch(`/products/${id}/approve`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); toast.success('Product approved'); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.delete(`/products/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'products'] }); toast.success('Deleted'); },
  });

  const columns: ColumnDef<any>[] = [
    {
      header: 'Product', accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
            {row.original.images?.[0]?.url
              ? <img src={row.original.images[0].url} alt="" className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-lg">🧸</div>
            }
          </div>
          <div>
            <div className="font-medium text-sm text-slate-900 max-w-[200px] truncate">{row.original.name}</div>
            <div className="text-xs text-slate-400 font-mono">{row.original.sku}</div>
          </div>
        </div>
      ),
    },
    { header: 'Brand', accessorKey: 'brand', cell: ({ getValue }) => (getValue() as any)?.name || '—' },
    {
      header: 'Price', id: 'price',
      cell: ({ row }) => {
        const v = row.original.variants?.[0];
        return v ? <span className="font-semibold text-slate-800">₹{Number(v.price).toLocaleString('en-IN')}</span> : '—';
      },
    },
    {
      header: 'Stock', id: 'stock',
      cell: ({ row }) => {
        const s = row.original.totalStock || 0;
        return <span className={`font-semibold ${s <= 10 ? 'text-red-500' : s <= 20 ? 'text-amber-500' : 'text-slate-700'}`}>{s}</span>;
      },
    },
    {
      header: 'Status', accessorKey: 'status',
      cell: ({ getValue }) => (
        <span className={`status-badge ${STATUS_STYLES[getValue() as string] || 'badge-inactive'}`}>
          {(getValue() as string).replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      header: 'Actions', id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link to={`/admin/products/${row.original.id}/edit`} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded">
            <Edit2 className="w-3.5 h-3.5" />
          </Link>
          {row.original.status === 'PENDING_APPROVAL' && (
            <button onClick={() => approveMutation.mutate(row.original.id)} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="Approve">
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(row.original.id); }} className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Products</h1><p className="section-subtitle">{total.toLocaleString()} products in catalog</p></div>
        <Link to="/admin/products/new" className="btn-admin-primary"><Plus className="w-4 h-4" /> Add Product</Link>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search products, SKU..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="admin-input pl-9" />
        </div>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="admin-input w-auto">
          <option value="">All Status</option>
          {['ACTIVE','DRAFT','PENDING_APPROVAL','ARCHIVED'].map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={products} columns={columns} isLoading={isLoading} pagination={{ page, limit: 20, total, onPageChange: setPage }} />
      </div>
    </div>
  );
}
