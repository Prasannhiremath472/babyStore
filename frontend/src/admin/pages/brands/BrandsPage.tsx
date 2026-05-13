import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function BrandsPage() {
  const qc = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', website: '', isFeatured: false });

  const { data, isLoading } = useQuery({ queryKey: ['admin','brands'], queryFn: () => adminApiClient.get('/brands') });
  const brands = data?.data?.data || [];

  const createMutation = useMutation({
    mutationFn: (d: any) => adminApiClient.post('/brands', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','brands'] }); setIsAdding(false); toast.success('Brand created'); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.delete(`/brands/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','brands'] }); toast.success('Deleted'); },
  });

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Brands</h1><p className="section-subtitle">{brands.length} brands</p></div>
        <button onClick={() => setIsAdding(true)} className="btn-admin-primary"><Plus className="w-4 h-4" /> Add Brand</button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand: any) => (
          <div key={brand.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🏷️</div>
              <div className="flex gap-1">
                <button className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(brand.id); }} className="p-1.5 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900">{brand.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{brand._count?.products || 0} products</p>
            {brand.isFeatured && <span className="status-badge badge-active mt-2 text-xs">Featured</span>}
          </div>
        ))}
      </div>
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg mb-4">Add Brand</h3>
            <div className="space-y-3">
              <div><label className="admin-label">Brand Name *</label><input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">Website</label><input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} className="admin-input" placeholder="https://" /></div>
              <div><label className="admin-label">Description</label><textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="admin-input resize-none" rows={2} /></div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} className="accent-indigo-600" /><span className="text-sm">Featured brand</span></label>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setIsAdding(false)} className="flex-1 btn-admin-secondary justify-center">Cancel</button>
              <button onClick={() => createMutation.mutate(form)} disabled={!form.name} className="flex-1 btn-admin-primary justify-center">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
