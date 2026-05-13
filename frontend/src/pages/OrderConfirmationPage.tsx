import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '../services/api/orders.api';

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getMyOrder(id!),
    enabled: !!id,
  });
  const order = data?.data?.data;

  return (
    <>
      <Helmet><title>Order Confirmed - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-elevated"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Order Confirmed! 🎉</h1>
          {order && (
            <p className="text-muted-foreground mb-6">
              Your order <span className="font-bold text-foreground font-mono">{order.orderNumber}</span> has been placed successfully!
            </p>
          )}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm font-semibold mb-2 flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> What's Next?</p>
            {[
              'You\'ll receive an email confirmation shortly',
              'Your order will be processed within 24 hours',
              'Expected delivery in 3-5 business days',
              'Track your order in My Orders section',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 mt-2">
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-600">{step}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link to="/account/orders" className="flex-1 btn-secondary py-3 justify-center gap-1.5">
              Track Order <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products" className="flex-1 btn-primary py-3 justify-center">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
