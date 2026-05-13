import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit2, Image } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function BannersPage() {
  const qc = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', type: 'HERO', sortOrder: 0, isActive: true });

  const { data, isLoading } = useQuery({ queryKey: ['admin','banners'], queryFn: () => adminApiClient.get('/banners/admin') });
  const banners = data?.data?.data || [];

  const createMutation = useMutation({
    mutationFn: (d: any) => adminApiClient.post('/banners/admin', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','banners'] }); setIsAdding(false); toast.success('Banner created'); },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApiClient.delete(`/banners/admin/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','banners'] }); toast.success('Deleted'); },
  });

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Banners</h1><p className="section-subtitle">Homepage & promotional banners</p></div>
        <button onClick={() => setIsAdding(true)} className="btn-admin-primary"><Plus className="w-4 h-4" /> Add Banner</button>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {banners.map((banner: any) => (
          <div key={banner.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
            <div className="relative h-32 bg-slate-100">
              {banner.image
                ? <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-slate-300"><Image className="w-8 h-8" /></div>
              }
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(banner.id); }} className="p-2 bg-white rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
              <span className="absolute top-2 right-2 status-badge badge-info text-xs">{banner.type}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm truncate">{banner.title}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className={`status-badge ${banner.isActive ? 'badge-active' : 'badge-inactive'} text-xs`}>{banner.isActive ? 'Active' : 'Inactive'}</span>
                <span className="text-xs text-slate-400">Order: {banner.sortOrder}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isAdding && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg mb-4">Add Banner</h3>
            <div className="space-y-3">
              <div><label className="admin-label">Title *</label><input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">Subtitle</label><input value={form.subtitle} onChange={e => setForm(f => ({...f, subtitle: e.target.value}))} className="admin-input" /></div>
              <div><label className="admin-label">Image URL *</label><input required value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))} className="admin-input" placeholder="https://..." /></div>
              <div><label className="admin-label">Link URL</label><input value={form.link} onChange={e => setForm(f => ({...f, link: e.target.value}))} className="admin-input" placeholder="/products" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="admin-label">Type</label><select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="admin-input">{['HERO','PROMOTIONAL','CATEGORY','MOBILE_HERO'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="admin-label">Sort Order</label><input type="number" value={form.sortOrder} onChange={e => setForm(f => ({...f, sortOrder: Number(e.target.value)}))} className="admin-input" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setIsAdding(false)} className="flex-1 btn-admin-secondary justify-center">Cancel</button>
              <button onClick={() => createMutation.mutate(form)} className="flex-1 btn-admin-primary justify-center">Create Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
