import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Check, X, Star } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

export default function ReviewsPage() {
  const [page, setPage] = useState(1);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin','reviews', page],
    queryFn: () => adminApiClient.get('/reviews/admin/pending', { params: { page, limit: 20 } }),
  });
  const reviews = data?.data?.data || [];
  const meta    = data?.data?.meta;

  const approveMutation = useMutation({ mutationFn: (id: string) => adminApiClient.patch(`/reviews/admin/${id}/approve`), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','reviews'] }); toast.success('Approved'); } });
  const rejectMutation  = useMutation({ mutationFn: (id: string) => adminApiClient.patch(`/reviews/admin/${id}/reject`),  onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','reviews'] }); toast.success('Rejected'); } });

  const columns: ColumnDef<any>[] = [
    {
      header: 'Product', id: 'product',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.product?.images?.[0]?.url && <img src={row.original.product.images[0].url} alt="" className="w-8 h-8 rounded object-cover" />}
          <span className="text-xs font-medium max-w-[150px] truncate">{row.original.product?.name}</span>
        </div>
      ),
    },
    { header: 'Customer', id: 'customer', cell: ({ row }) => <div><div className="text-xs font-medium">{row.original.user?.firstName} {row.original.user?.lastName}</div><div className="text-xs text-slate-400">{row.original.user?.email}</div></div> },
    {
      header: 'Rating', accessorKey: 'rating',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < (getValue() as number) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
        </div>
      ),
    },
    { header: 'Review', id: 'review', cell: ({ row }) => <p className="text-xs text-slate-500 max-w-xs truncate">{row.original.body}</p> },
    { header: 'Verified', accessorKey: 'isVerifiedPurchase', cell: ({ getValue }) => getValue() ? <span className="text-xs text-emerald-600 font-medium">✓ Verified</span> : <span className="text-xs text-slate-400">Unverified</span> },
    { header: 'Date', accessorKey: 'createdAt', cell: ({ getValue }) => <span className="text-xs text-slate-500">{new Date(getValue() as string).toLocaleDateString('en-IN')}</span> },
    {
      header: 'Actions', id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-1">
          <button onClick={() => approveMutation.mutate(row.original.id)} className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded" title="Approve"><Check className="w-3.5 h-3.5" /></button>
          <button onClick={() => rejectMutation.mutate(row.original.id)}  className="p-1.5 text-red-400 hover:bg-red-50 rounded"     title="Reject"><X className="w-3.5 h-3.5" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Reviews Moderation</h1><p className="section-subtitle">Approve or reject customer reviews</p></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={reviews} columns={columns} isLoading={isLoading} pagination={meta ? { page, limit: 20, total: meta.total, onPageChange: setPage } : undefined} />
      </div>
    </div>
  );
}
