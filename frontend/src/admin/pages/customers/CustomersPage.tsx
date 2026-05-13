import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Search, UserX, UserCheck } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'customers', page, search],
    queryFn: () => adminApiClient.get('/users/admin/all', { params: { page, limit: 20, search } }),
  });

  const customers = data?.data?.data?.users || [];
  const total     = data?.data?.meta?.total  || 0;

  const blockMutation   = useMutation({ mutationFn: (id: string) => adminApiClient.patch(`/users/admin/${id}/block`),   onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','customers'] }); toast.success('Blocked');   } });
  const unblockMutation = useMutation({ mutationFn: (id: string) => adminApiClient.patch(`/users/admin/${id}/unblock`), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','customers'] }); toast.success('Unblocked'); } });

  const columns: ColumnDef<any>[] = [
    {
      header: 'Customer', id: 'customer',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
            {row.original.firstName[0]}{row.original.lastName[0]}
          </div>
          <div>
            <div className="font-medium text-sm">{row.original.firstName} {row.original.lastName}</div>
            <div className="text-xs text-slate-400">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    { header: 'Phone',  accessorKey: 'phone',  cell: ({ getValue }) => getValue() || '—' },
    { header: 'Orders', id: 'orders', cell: ({ row }) => <span className="font-semibold">{row.original._count?.orders || 0}</span> },
    { header: 'Wallet', id: 'wallet', cell: ({ row }) => `₹${Number(row.original.wallet?.balance || 0).toLocaleString('en-IN')}` },
    {
      header: 'Status', accessorKey: 'status',
      cell: ({ getValue }) => (
        <span className={`status-badge ${getValue() === 'ACTIVE' ? 'badge-active' : getValue() === 'BANNED' ? 'badge-error' : 'badge-pending'}`}>
          {getValue() as string}
        </span>
      ),
    },
    {
      header: 'Joined', accessorKey: 'createdAt',
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    },
    {
      header: 'Actions', id: 'actions',
      cell: ({ row }) => row.original.status === 'BANNED'
        ? <button onClick={() => unblockMutation.mutate(row.original.id)} className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded" title="Unblock"><UserCheck className="w-3.5 h-3.5" /></button>
        : <button onClick={() => { if (confirm('Block user?')) blockMutation.mutate(row.original.id); }} className="p-1.5 text-red-400 hover:bg-red-50 rounded" title="Block"><UserX className="w-3.5 h-3.5" /></button>,
    },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Customers</h1><p className="section-subtitle">{total.toLocaleString()} registered customers</p></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search customers..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="admin-input pl-9" />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={customers} columns={columns} isLoading={isLoading} pagination={{ page, limit: 20, total, onPageChange: setPage }} />
      </div>
    </div>
  );
}
