import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const qc = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', icon: '', parentId: '', isFeatured: false, sortOrder: 0 });

  const { data, isLoading } = useQuery({ queryKey: ['admin','categories'], queryFn: () => adminApiClient.get('/categories') });
  const categories = data?.data?.data || [];

  const createMutation = useMutation({
    mutationFn: (d: any) => adminApiClient.post('/categories', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','categories'] }); setIsAdding(false); toast.success('Category created'); },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Failed'),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.delete(`/categories/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','categories'] }); toast.success('Deleted'); },
  });

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Categories</h1><p className="section-subtitle">{categories.length} categories</p></div>
        <button onClick={() => setIsAdding(true)} className="btn-admin-primary"><Plus className="w-4 h-4" /> Add Category</button>
      </div>

      {isLoading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-14 admin-skeleton rounded-xl" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="admin-table">
            <thead><tr><th>Category</th><th>Icon</th><th>Products</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat.id}>
                  <td><div className="font-medium">{cat.name}</div><div className="text-xs text-slate-400 truncate max-w-xs">{cat.description}</div></td>
                  <td><span className="text-2xl">{cat.icon || '📦'}</span></td>
                  <td>{cat._count?.products || 0}</td>
                  <td><span className={`status-badge ${cat.isActive ? 'badge-active' : 'badge-inactive'}`}>{cat.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(cat.id); }} className="p-1.5 hover:text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg mb-4">Add Category</h3>
            <div className="space-y-3">
              <div><label className="admin-label">Name *</label><input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">Icon (emoji)</label><input value={form.icon} onChange={e => setForm(f => ({...f, icon: e.target.value}))} className="admin-input" placeholder="👕" /></div>
              <div><label className="admin-label">Description</label><textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="admin-input resize-none" rows={2} /></div>
              <div>
                <label className="admin-label">Parent Category</label>
                <select value={form.parentId} onChange={e => setForm(f => ({...f, parentId: e.target.value}))} className="admin-input">
                  <option value="">Root category</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({...f, isFeatured: e.target.checked}))} className="accent-indigo-600" /><span className="text-sm">Featured</span></label>
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
