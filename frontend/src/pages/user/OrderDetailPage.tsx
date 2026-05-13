import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../../services/api/orders.api';
import { Package, MapPin, CreditCard, ArrowLeft, Check } from 'lucide-react';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getMyOrder(id!),
    enabled: !!id,
  });
  const order = data?.data?.data;

  if (isLoading) return <div className="section-container py-12"><div className="skeleton h-96 rounded-2xl" /></div>;
  if (!order) return <div className="section-container py-12 text-center"><p>Order not found</p></div>;

  return (
    <>
      <Helmet><title>Order {order.orderNumber} - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-4xl">
          <Link to="/account/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold">{order.orderNumber}</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm">{order.status.replace(/_/g, ' ')}</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Items</h3>
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-3 py-3 border-b last:border-0">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">🧸</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary">₹{Number(item.totalPrice).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              {/* Timeline */}
              {order.timeline?.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-semibold mb-4">Order Timeline</h3>
                  <div className="space-y-3">
                    {order.timeline.map((t: any, i: number) => (
                      <div key={t.id} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                        <div>
                          <p className="text-sm font-medium">{t.message}</p>
                          <p className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {/* Address */}
              {order.address && (
                <div className="bg-white rounded-2xl p-5 shadow-card">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Delivery Address</h3>
                  <p className="text-sm">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-sm text-muted-foreground">{order.address.addressLine1}</p>
                  <p className="text-sm text-muted-foreground">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                </div>
              )}
              {/* Summary */}
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Payment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{Number(order.subtotal).toLocaleString('en-IN')}</span></div>
                  {Number(order.discountAmount) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{Number(order.discountAmount).toLocaleString('en-IN')}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{Number(order.shippingAmount) === 0 ? 'FREE' : `₹${Number(order.shippingAmount)}`}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>₹{Number(order.taxAmount).toLocaleString('en-IN')}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span className="text-primary">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
