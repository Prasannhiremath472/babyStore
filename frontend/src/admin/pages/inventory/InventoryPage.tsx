import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Search, Edit2 } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import DataTable from '../../components/shared/DataTable';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState<any>(null);
  const [newQty, setNewQty] = useState(0);
  const [reason, setReason] = useState('');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin','inventory'],
    queryFn: () => adminApiClient.get('/analytics/inventory'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ variantId, quantity, reason }: any) => adminApiClient.patch(`/products/inventory/${variantId}`, { quantity, reason }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin','inventory'] }); setEditItem(null); toast.success('Inventory updated'); },
  });

  const allItems = data?.data?.data?.items || [];
  const items = allItems.filter((i: any) =>
    !search || i.variant?.product?.name?.toLowerCase().includes(search.toLowerCase()) || i.variant?.sku?.includes(search)
  );
  const lowStock  = data?.data?.data?.lowStock?.length  || 0;
  const outOfStock = data?.data?.data?.outOfStock?.length || 0;

  const columns: ColumnDef<any>[] = [
    {
      header: 'Product', id: 'product',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {row.original.variant?.product?.images?.[0]?.url && <img src={row.original.variant.product.images[0].url} alt="" className="w-9 h-9 rounded object-cover" />}
          <div>
            <div className="text-sm font-medium max-w-[200px] truncate">{row.original.variant?.product?.name}</div>
            <div className="text-xs text-slate-400 font-mono">{row.original.variant?.sku}</div>
          </div>
        </div>
      ),
    },
    { header: 'Variant', id: 'variant', cell: ({ row }) => row.original.variant?.name !== 'Default' ? row.original.variant?.name : '—' },
    {
      header: 'Stock', accessorKey: 'quantity',
      cell: ({ row }) => {
        const qty   = row.original.quantity;
        const alert = row.original.lowStockAlert;
        return <span className={`font-bold ${qty === 0 ? 'text-red-500' : qty <= alert ? 'text-amber-500' : 'text-emerald-600'}`}>{qty === 0 ? '⚠️ Out' : qty <= alert ? `⚡ ${qty}` : qty}</span>;
      },
    },
    { header: 'Reserved', accessorKey: 'reservedQuantity' },
    { header: 'Alert At',  accessorKey: 'lowStockAlert' },
    {
      header: 'Actions', id: 'actions',
      cell: ({ row }) => (
        <button onClick={() => { setEditItem(row.original); setNewQty(row.original.quantity); setReason(''); }} className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Inventory</h1><p className="section-subtitle">{items.length} SKUs</p></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total SKUs', value: allItems.length, icon: '📦', cls: '' },
          { label: 'Low Stock',  value: lowStock,        icon: '⚡', cls: 'border-amber-200 bg-amber-50' },
          { label: 'Out of Stock', value: outOfStock,    icon: '⚠️', cls: 'border-red-200 bg-red-50' },
        ].map(m => (
          <div key={m.label} className={`kpi-card flex items-center gap-4 ${m.cls}`}>
            <span className="text-3xl">{m.icon}</span>
            <div><p className="text-xs font-semibold text-slate-500">{m.label}</p><p className="text-2xl font-bold text-slate-900">{m.value}</p></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5 shadow-sm">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search products, SKU..." value={search} onChange={e => setSearch(e.target.value)} className="admin-input pl-9" />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <DataTable data={items} columns={columns} isLoading={isLoading} />
      </div>
      {editItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-lg mb-1">Update Inventory</h3>
            <p className="text-sm text-slate-500 mb-4">{editItem.variant?.product?.name} — {editItem.variant?.sku}</p>
            <div className="space-y-3">
              <div><label className="admin-label">New Quantity</label><input type="number" value={newQty} onChange={e => setNewQty(Number(e.target.value))} min="0" className="admin-input" /></div>
              <div><label className="admin-label">Reason *</label><input value={reason} onChange={e => setReason(e.target.value)} className="admin-input" placeholder="e.g. New stock received" /></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditItem(null)} className="flex-1 btn-admin-secondary justify-center">Cancel</button>
              <button onClick={() => updateMutation.mutate({ variantId: editItem.variantId, quantity: newQty, reason })} disabled={!reason} className="flex-1 btn-admin-primary justify-center">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
