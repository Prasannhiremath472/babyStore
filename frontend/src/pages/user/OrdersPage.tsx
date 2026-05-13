import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Package, ChevronRight } from 'lucide-react';
import { ordersApi } from '../../services/api/orders.api';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  RETURNED: 'bg-gray-100 text-gray-700',
  REFUNDED: 'bg-teal-100 text-teal-700',
};

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'my'],
    queryFn: () => ordersApi.getMyOrders({ page: 1, limit: 20 }),
  });

  const orders = data?.data?.data?.orders || [];

  return (
    <>
      <Helmet><title>My Orders - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-4xl">
          <h1 className="text-2xl font-display font-bold mb-6">My Orders</h1>
          {isLoading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl h-28 skeleton" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-24">
              <Package className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">When you place an order, it'll appear here.</p>
              <Link to="/products" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <Link key={order.id} to={`/account/orders/${order.id}`} className="block bg-white rounded-2xl p-5 shadow-card hover:shadow-soft transition-shadow group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-bold text-foreground">{order.orderNumber}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] || 'bg-gray-100'}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {order.items.slice(0, 2).map((i: any) => i.productName).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold text-primary">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
                        <span className="text-muted-foreground">{order.items.length} items</span>
                        <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
