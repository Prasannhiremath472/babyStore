import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Truck, Check, Plus, MapPin, X } from 'lucide-react';
import { cartApi } from '../services/api/cart.api';
import { ordersApi } from '../services/api/orders.api';
import apiClient from '../services/api/client';
import toast from 'react-hot-toast';
import RazorpayMockDialog from '../components/payment/RazorpayMockDialog';

declare global { interface Window { Razorpay: any; } }

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh',
];

const EMPTY_ADDR = {
  label: 'Home', firstName: '', lastName: '', phone: '',
  addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', isDefault: true,
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [isPlacing, setIsPlacing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [razorpayOpen, setRazorpayOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [newAddr, setNewAddr] = useState(EMPTY_ADDR);
  const [savingAddr, setSavingAddr] = useState(false);

  const { data: cartData } = useQuery({ queryKey: ['cart'], queryFn: () => cartApi.get() });
  const { data: addrData, refetch: refetchAddr } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => apiClient.get('/users/addresses'),
  });

  const cart = cartData?.data?.data;
  const addresses: any[] = addrData?.data?.data || [];
  const couponCode = location.state?.couponCode;
  const subtotal = cart?.subtotal || 0;
  const shipping = subtotal > 499 ? 0 : 49;
  const tax = Math.round((subtotal + shipping) * 0.18);
  const total = subtotal + shipping + tax;

  // Auto-select default or first address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const def = addresses.find((a: any) => a.isDefault) || addresses[0];
      setSelectedAddress(def.id);
    }
    // Show add form if no addresses exist
    if (addresses.length === 0 && addrData) {
      setShowAddForm(true);
    }
  }, [addresses, addrData]);

  const handleSaveAddress = async () => {
    if (!newAddr.firstName || !newAddr.phone || !newAddr.addressLine1 || !newAddr.city || !newAddr.state || !newAddr.pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    setSavingAddr(true);
    try {
      const { data } = await apiClient.post('/users/addresses', newAddr);
      await refetchAddr();
      setSelectedAddress(data.data?.id || '');
      setShowAddForm(false);
      setNewAddr(EMPTY_ADDR);
      toast.success('Address saved!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save address');
    } finally {
      setSavingAddr(false);
    }
  };

  const field = (key: keyof typeof newAddr, label: string, required = true, type = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={newAddr[key] as string}
        onChange={e => setNewAddr(prev => ({ ...prev, [key]: e.target.value }))}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        placeholder={label}
      />
    </div>
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddress) { toast.error('Please select a delivery address'); return; }
    setIsPlacing(true);
    try {
      const { data } = await ordersApi.create({ addressId: selectedAddress, paymentMethod, couponCode });
      const { order, razorpayOrder } = data.data;

      if (paymentMethod === 'COD') {
        toast.success('Order placed successfully!');
        navigate(`/order-confirmation/${order.id}`);
        return;
      }

      // Open Razorpay mock dialog
      setPendingOrder({ order, razorpayOrder });
      setRazorpayOpen(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacing(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string, signature: string) => {
    setRazorpayOpen(false);
    if (!pendingOrder) return;
    try {
      await ordersApi.verifyPayment({
        orderId: pendingOrder.order.id,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
      });
      toast.success('Payment successful! Order confirmed.');
      navigate(`/order-confirmation/${pendingOrder.order.id}`);
    } catch {
      toast.error('Payment verification failed. Contact support.');
    }
  };

  return (
    <>
      <Helmet><title>Checkout — My Baby</title></Helmet>

      {/* Razorpay Mock Payment Dialog */}
      <RazorpayMockDialog
        isOpen={razorpayOpen}
        orderData={{
          amount: pendingOrder?.razorpayOrder?.amount || total * 100,
          orderId: pendingOrder?.razorpayOrder?.id || '',
          orderNumber: pendingOrder?.order?.orderNumber || '',
          businessName: 'My Baby',
          description: 'The New Born Baby Shop',
        }}
        onSuccess={handlePaymentSuccess}
        onDismiss={() => {
          setRazorpayOpen(false);
          toast('Payment cancelled. Your order is saved — you can retry.', { icon: 'ℹ️' });
        }}
      />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-5xl">
          <h1 className="text-2xl font-display font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">

              {/* ── Delivery Address ── */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Delivery Address
                  </h2>
                  {addresses.length > 0 && !showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add New
                    </button>
                  )}
                </div>

                {/* Saved addresses */}
                {addresses.length > 0 && !showAddForm && (
                  <div className="grid md:grid-cols-2 gap-3">
                    {addresses.map((addr: any) => (
                      <label
                        key={addr.id}
                        className={`flex gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedAddress === addr.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          selectedAddress === addr.id ? 'border-primary' : 'border-gray-300'
                        }`}>
                          {selectedAddress === addr.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-sm">{addr.firstName} {addr.lastName}</p>
                            {addr.label && (
                              <span className="text-[10px] bg-primary-50 text-primary font-bold px-2 py-0.5 rounded-full border border-primary/20">
                                {addr.label}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                            {addr.city}, {addr.state} — {addr.pincode}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* No addresses empty state */}
                {addresses.length === 0 && !showAddForm && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                    <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-3">No saved addresses yet</p>
                    <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm px-5 py-2">
                      <Plus className="w-4 h-4" /> Add Address
                    </button>
                  </div>
                )}

                {/* Add new address form */}
                {showAddForm && (
                  <div className="border-2 border-primary/20 rounded-xl p-5 bg-primary-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" /> Add New Address
                      </h3>
                      {addresses.length > 0 && (
                        <button onClick={() => setShowAddForm(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {field('firstName', 'First Name')}
                      {field('lastName', 'Last Name')}
                      {field('phone', 'Phone Number', true, 'tel')}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Label <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newAddr.label}
                          onChange={e => setNewAddr(prev => ({ ...prev, label: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        >
                          {['Home', 'Work', 'Other'].map(l => <option key={l}>{l}</option>)}
                        </select>
                      </div>
                      <div className="col-span-2">{field('addressLine1', 'Address Line 1')}</div>
                      <div className="col-span-2">{field('addressLine2', 'Address Line 2 (optional)', false)}</div>
                      {field('city', 'City')}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newAddr.state}
                          onChange={e => setNewAddr(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        >
                          <option value="">Select State</option>
                          {STATES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      {field('pincode', 'Pincode', true, 'number')}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveAddress}
                        disabled={savingAddr}
                        className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
                      >
                        {savingAddr
                          ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          : <Check className="w-4 h-4" />
                        }
                        Save & Use This Address
                      </button>
                      {addresses.length > 0 && (
                        <button onClick={() => setShowAddForm(false)} className="btn-secondary text-sm px-5 py-2.5">
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Payment Method ── */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'RAZORPAY', label: 'Pay Online', desc: 'UPI, Cards, Net Banking via Razorpay', icon: '💳' },
                    { value: 'COD',      label: 'Cash on Delivery', desc: 'Pay when your order arrives', icon: '💵' },
                  ].map(pm => (
                    <label
                      key={pm.value}
                      className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        paymentMethod === pm.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.value}
                        checked={paymentMethod === pm.value}
                        onChange={() => setPaymentMethod(pm.value as any)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-2xl">{pm.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{pm.label}</p>
                        <p className="text-xs text-muted-foreground">{pm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Order Summary ── */}
            <div className="bg-white rounded-2xl p-6 shadow-card h-fit sticky top-24">
              <h2 className="font-semibold text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cart?.itemCount || 0} items)</span>
                  <span className="text-foreground font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'text-foreground font-medium'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (18%)</span>
                  <span className="text-foreground font-medium">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary text-lg">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Hint if no address selected */}
              {!selectedAddress && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 flex items-center gap-1.5">
                  ⚠️ Please add or select a delivery address to continue
                </p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing || !selectedAddress || showAddForm}
                className="btn-primary w-full py-4 justify-center text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
              >
                {isPlacing
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : `Place Order · ₹${total.toLocaleString('en-IN')}`
                }
              </button>
              <p className="text-xs text-center text-muted-foreground mt-3">🔒 Secured by Razorpay & SSL</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
