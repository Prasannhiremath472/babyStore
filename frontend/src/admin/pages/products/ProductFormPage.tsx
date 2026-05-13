import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', description: '', shortDescription: '', brandId: '',
    categoryIds: [''], primaryCategoryId: '', ageGroup: '',
    tags: '', metaTitle: '', metaDesc: '',
    isFeatured: false, isBestseller: false, isNew: false,
    variants: [{ name: 'Default', sku: '', price: 0, comparePrice: 0, costPrice: 0, attributes: {}, isDefault: true, initialStock: 0 }],
  });

  const { data: brandsData } = useQuery({ queryKey: ['brands'], queryFn: () => adminApiClient.get('/brands') });
  const { data: catsData }   = useQuery({ queryKey: ['categories'], queryFn: () => adminApiClient.get('/categories') });
  const brands     = brandsData?.data?.data || [];
  const categories = catsData?.data?.data   || [];

  const { data: productData } = useQuery({
    queryKey: ['product-edit', id],
    queryFn: () => adminApiClient.get(`/products/${id}`),
    enabled: isEdit,
  });

  useEffect(() => {
    if (productData?.data?.data) {
      const p = productData.data.data;
      setForm(f => ({
        ...f, name: p.name, description: p.description || '', shortDescription: p.shortDescription || '',
        brandId: p.brandId || '', ageGroup: p.ageGroup || '',
        isFeatured: p.isFeatured, isBestseller: p.isBestseller, isNew: p.isNew,
        tags: p.tags?.join(', ') || '',
        variants: p.variants.map((v: any) => ({
          name: v.name, sku: v.sku, price: Number(v.price),
          comparePrice: Number(v.comparePrice || 0), costPrice: Number(v.costPrice || 0),
          attributes: v.attributes, isDefault: v.isDefault, initialStock: 0,
        })),
      }));
    }
  }, [productData]);

  const saveMutation = useMutation({
    mutationFn: (d: any) => isEdit ? adminApiClient.put(`/products/${id}`, d) : adminApiClient.post('/products', d),
    onSuccess: () => { toast.success(`Product ${isEdit ? 'updated' : 'created'}!`); navigate('/admin/products'); },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Failed'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      categoryIds: form.categoryIds.filter(Boolean),
      primaryCategoryId: form.categoryIds[0],
    });
  };

  const addVariant    = () => setForm(f => ({ ...f, variants: [...f.variants, { name: '', sku: '', price: 0, comparePrice: 0, costPrice: 0, attributes: {}, isDefault: false, initialStock: 0 }] }));
  const removeVariant = (i: number) => setForm(f => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }));
  const updateVariant = (i: number, key: string, val: any) => setForm(f => ({ ...f, variants: f.variants.map((v, idx) => idx === i ? { ...v, [key]: val } : v) }));
  const set = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="section-header mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <h1 className="section-title">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
            <p className="section-subtitle">{isEdit ? `Editing: ${form.name}` : 'Create a new product'}</p>
          </div>
        </div>
        <button type="submit" disabled={saveMutation.isPending} className="btn-admin-primary">
          <Save className="w-4 h-4" />{saveMutation.isPending ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div><label className="admin-label">Product Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} className="admin-input" placeholder="e.g. Organic Baby Bodysuit" /></div>
              <div><label className="admin-label">Short Description</label><textarea value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} rows={2} className="admin-input resize-none" /></div>
              <div><label className="admin-label">Full Description</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5} className="admin-input resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="admin-label">Tags (comma-separated)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} className="admin-input" placeholder="organic, cotton" /></div>
                <div>
                  <label className="admin-label">Age Group</label>
                  <select value={form.ageGroup} onChange={e => set('ageGroup', e.target.value)} className="admin-input">
                    <option value="">Select</option>
                    {['0-3 months','3-6 months','6-12 months','1-3 years','3-7 years','7-12 years','12+ years'].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Variants & Pricing</h3>
              <button type="button" onClick={addVariant} className="btn-admin-secondary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add Variant</button>
            </div>
            <div className="space-y-4">
              {form.variants.map((variant, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Variant {i + 1}</span>
                    {i > 0 && <button type="button" onClick={() => removeVariant(i)} className="p-1 text-red-400"><Trash2 className="w-4 h-4" /></button>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div><label className="admin-label">Name *</label><input value={variant.name} onChange={e => updateVariant(i, 'name', e.target.value)} className="admin-input" required /></div>
                    <div><label className="admin-label">SKU *</label><input value={variant.sku} onChange={e => updateVariant(i, 'sku', e.target.value)} className="admin-input font-mono" required /></div>
                    <div><label className="admin-label">Sale Price (₹) *</label><input type="number" value={variant.price} onChange={e => updateVariant(i, 'price', Number(e.target.value))} className="admin-input" min="0" required /></div>
                    <div><label className="admin-label">Compare Price (₹)</label><input type="number" value={variant.comparePrice} onChange={e => updateVariant(i, 'comparePrice', Number(e.target.value))} className="admin-input" min="0" /></div>
                    <div><label className="admin-label">Cost Price (₹)</label><input type="number" value={variant.costPrice} onChange={e => updateVariant(i, 'costPrice', Number(e.target.value))} className="admin-input" min="0" /></div>
                    <div><label className="admin-label">Initial Stock</label><input type="number" value={variant.initialStock} onChange={e => updateVariant(i, 'initialStock', Number(e.target.value))} className="admin-input" min="0" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Organization</h3>
            <div className="space-y-3">
              <div>
                <label className="admin-label">Brand</label>
                <select value={form.brandId} onChange={e => set('brandId', e.target.value)} className="admin-input">
                  <option value="">Select brand</option>
                  {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">Category</label>
                <select value={form.categoryIds[0]} onChange={e => set('categoryIds', [e.target.value])} className="admin-input">
                  <option value="">Select category</option>
                  {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Product Flags</h3>
            <div className="space-y-3">
              {[{ key: 'isFeatured', label: 'Featured Product' }, { key: 'isBestseller', label: 'Bestseller' }, { key: 'isNew', label: 'New Arrival' }].map(flag => (
                <label key={flag.key} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={(form as any)[flag.key]} onChange={e => set(flag.key, e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
                  <span className="text-sm text-slate-700">{flag.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">SEO</h3>
            <div className="space-y-3">
              <div><label className="admin-label">Meta Title</label><input value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} className="admin-input" /></div>
              <div><label className="admin-label">Meta Description</label><textarea value={form.metaDesc} onChange={e => set('metaDesc', e.target.value)} rows={3} className="admin-input resize-none" /></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
