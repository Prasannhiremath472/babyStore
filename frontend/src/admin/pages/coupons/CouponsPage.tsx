import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Trash2 } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

export default function CouponsPage() {
  const qc = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    code: '', description: '', discountType: 'PERCENTAGE', discountValue: 10,
    minOrderAmount: 499, maxDiscountAmount: 200, usageLimit: 100, perUserLimit: 1,
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  });

  const { data, isLoading } = useQuery({ queryKey: ['admin','coupons'], queryFn: () => adminApiClient.get('/coupons/admin') });
  const coupons = data?.data?.data || [];

  const createMutation = useMutation({
    mutationFn: (d: any) => adminApiClient.post('/coupons/admin', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','coupons'] }); setIsAdding(false); toast.success('Coupon created'); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.delete(`/coupons/admin/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','coupons'] }); toast.success('Deleted'); },
  });

  const columns: ColumnDef<any>[] = [
    { header: 'Code', accessorKey: 'code', cell: ({ getValue }) => <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-600 font-bold text-xs">{getValue() as string}</code> },
    { header: 'Discount', id: 'discount', cell: ({ row }) => `${row.original.discountValue}${row.original.discountType === 'PERCENTAGE' ? '%' : '₹'} off` },
    { header: 'Min Order', accessorKey: 'minOrderAmount', cell: ({ getValue }) => `₹${getValue() || 0}` },
    { header: 'Used', id: 'used', cell: ({ row }) => `${row.original.usedCount}${row.original.usageLimit ? ` / ${row.original.usageLimit}` : ''}` },
    {
      header: 'Validity', id: 'validity',
      cell: ({ row }) => {
        const expired = new Date(row.original.endDate) < new Date();
        return (
          <div>
            <div className="text-xs">{new Date(row.original.startDate).toLocaleDateString('en-IN')} – {new Date(row.original.endDate).toLocaleDateString('en-IN')}</div>
            {expired && <span className="text-xs text-red-500">Expired</span>}
          </div>
        );
      },
    },
    { header: 'Status', accessorKey: 'isActive', cell: ({ getValue }) => <span className={`status-badge ${getValue() ? 'badge-active' : 'badge-inactive'}`}>{getValue() ? 'Active' : 'Inactive'}</span> },
    { header: 'Actions', id: 'actions', cell: ({ row }) => <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(row.original.id); }} className="p-1.5 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button> },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Coupons & Offers</h1><p className="section-subtitle">{coupons.length} coupons</p></div>
        <button onClick={() => setIsAdding(true)} className="btn-admin-primary"><Plus className="w-4 h-4" /> Add Coupon</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={coupons} columns={columns} isLoading={isLoading} />
      </div>
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl my-4">
            <h3 className="font-bold text-lg mb-4">Create Coupon</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="admin-label">Code *</label><input required value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} className="admin-input font-mono" placeholder="WELCOME10" /></div>
              <div className="col-span-2"><label className="admin-label">Description</label><input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">Type</label><select value={form.discountType} onChange={e => setForm(f => ({...f, discountType: e.target.value}))} className="admin-input"><option value="PERCENTAGE">Percentage</option><option value="FLAT">Flat ₹</option><option value="FREE_SHIPPING">Free Shipping</option></select></div>
              <div><label className="admin-label">Value</label><input type="number" value={form.discountValue} onChange={e => setForm(f => ({...f, discountValue: Number(e.target.value)}))} className="admin-input" min="0" /></div>
              <div><label className="admin-label">Min Order (₹)</label><input type="number" value={form.minOrderAmount} onChange={e => setForm(f => ({...f, minOrderAmount: Number(e.target.value)}))} className="admin-input" /></div>
              <div><label className="admin-label">Max Discount (₹)</label><input type="number" value={form.maxDiscountAmount} onChange={e => setForm(f => ({...f, maxDiscountAmount: Number(e.target.value)}))} className="admin-input" /></div>
              <div><label className="admin-label">Usage Limit</label><input type="number" value={form.usageLimit} onChange={e => setForm(f => ({...f, usageLimit: Number(e.target.value)}))} className="admin-input" /></div>
              <div><label className="admin-label">Per User</label><input type="number" value={form.perUserLimit} onChange={e => setForm(f => ({...f, perUserLimit: Number(e.target.value)}))} className="admin-input" /></div>
              <div><label className="admin-label">Start</label><input type="date" value={form.startDate} onChange={e => setForm(f => ({...f, startDate: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">End</label><input type="date" value={form.endDate} onChange={e => setForm(f => ({...f, endDate: e.target.value}))} className="admin-input" /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setIsAdding(false)} className="flex-1 btn-admin-secondary justify-center">Cancel</button>
              <button onClick={() => createMutation.mutate({ ...form, startDate: new Date(form.startDate), endDate: new Date(form.endDate) })} className="flex-1 btn-admin-primary justify-center">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
