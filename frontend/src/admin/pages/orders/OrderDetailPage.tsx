import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Package, MapPin, CreditCard, Clock, Check, Printer } from 'lucide-react';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function OrderDetailPage() {
  const { id } = useParams();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: () => adminApiClient.get(`/orders/admin/${id}`),
  });

  const updateMutation = useMutation({
    mutationFn: ({ status, message }: any) => adminApiClient.patch(`/orders/admin/${id}/status`, { status, message }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'order', id] }); toast.success('Order updated'); },
  });

  const order = data?.data?.data;
  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="bg-white rounded-xl h-32 admin-skeleton" />)}</div>;
  if (!order) return <div className="text-slate-400">Order not found</div>;

  return (
    <div>
      <div className="section-header">
        <div className="flex items-center gap-3">
          <Link to="/admin/orders" className="p-2 hover:bg-slate-100 rounded-lg"><ArrowLeft className="w-4 h-4" /></Link>
          <div>
            <h1 className="section-title font-mono">{order.orderNumber}</h1>
            <p className="section-subtitle">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-admin-secondary text-xs"><Printer className="w-3.5 h-3.5" /> Invoice</button>
          <select value={order.status} onChange={e => updateMutation.mutate({ status: e.target.value, message: `Updated to ${e.target.value}` })} className="btn-admin-primary text-xs border-0 cursor-pointer">
            {['PENDING','CONFIRMED','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'].map(s => <option key={s} value={s} className="bg-slate-800">{s.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Package className="w-4 h-4 text-indigo-500" /> Order Items</h3>
            <table className="admin-table">
              <thead><tr><th>Product</th><th>SKU</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
              <tbody>
                {order.items.map((item: any) => (
                  <tr key={item.id}>
                    <td><span className="font-medium text-sm">{item.productName}</span></td>
                    <td><code className="text-xs text-slate-500">{item.sku}</code></td>
                    <td>{item.quantity}</td>
                    <td>₹{Number(item.price).toLocaleString('en-IN')}</td>
                    <td className="font-bold">₹{Number(item.totalPrice).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {order.timeline?.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500" /> Timeline</h3>
              <div className="space-y-3">
                {order.timeline.map((t: any) => (
                  <div key={t.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                    <div>
                      <p className="text-sm font-medium">{t.message}</p>
                      <p className="text-xs text-slate-400">{new Date(t.createdAt).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Customer</h3>
            <p className="font-medium">{order.user?.firstName} {order.user?.lastName}</p>
            <p className="text-sm text-slate-500">{order.user?.email}</p>
          </div>
          {order.address && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-500" /> Address</h3>
              <p className="text-sm">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-sm text-slate-500">{order.address.addressLine1}, {order.address.city} - {order.address.pincode}</p>
            </div>
          )}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-indigo-500" /> Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span></div>
              {Number(order.discountAmount) > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-₹{Number(order.discountAmount).toLocaleString('en-IN')}</span></div>}
              <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span>{Number(order.shippingAmount) === 0 ? 'FREE' : `₹${Number(order.shippingAmount)}`}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tax</span><span>₹{Number(order.taxAmount).toLocaleString('en-IN')}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span className="text-indigo-600">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
