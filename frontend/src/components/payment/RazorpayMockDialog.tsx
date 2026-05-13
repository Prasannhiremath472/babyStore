import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Shield, CreditCard, Smartphone, Building2,
  Wallet, ChevronRight, CheckCircle2, XCircle, Loader2, Lock
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  orderData: {
    amount: number;       // in paise
    orderId: string;
    orderNumber: string;
    businessName?: string;
    description?: string;
    prefillName?: string;
    prefillEmail?: string;
    prefillPhone?: string;
  };
  onSuccess: (paymentId: string, signature: string) => void;
  onDismiss: () => void;
}

type PayMode = 'upi' | 'card' | 'netbanking' | 'wallet';
type Step = 'select' | 'pay' | 'processing' | 'success' | 'failed';

const UPI_APPS = [
  { name: 'Google Pay', icon: '🇬', color: '#4285F4', id: 'gpay' },
  { name: 'PhonePe',    icon: '💜', color: '#5F259F', id: 'phonepe' },
  { name: 'Paytm',      icon: '💙', color: '#00B9F1', id: 'paytm' },
  { name: 'BHIM',       icon: '🇮🇳', color: '#138808', id: 'bhim' },
];

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'];

const PAYMENT_METHODS = [
  { id: 'upi',        label: 'UPI',         sub: 'GPay, PhonePe, Paytm & more', icon: Smartphone },
  { id: 'card',       label: 'Card',         sub: 'Debit / Credit / Prepaid',   icon: CreditCard  },
  { id: 'netbanking', label: 'Net Banking',  sub: '60+ banks supported',         icon: Building2   },
  { id: 'wallet',     label: 'Wallets',      sub: 'Paytm, Amazon Pay & more',   icon: Wallet      },
];

export default function RazorpayMockDialog({ isOpen, orderData, onSuccess, onDismiss }: Props) {
  const [step, setStep]           = useState<Step>('select');
  const [payMode, setPayMode]     = useState<PayMode>('upi');
  const [upiId, setUpiId]         = useState('');
  const [upiApp, setUpiApp]       = useState('');
  const [cardNum, setCardNum]     = useState('');
  const [cardExp, setCardExp]     = useState('');
  const [cardCvv, setCardCvv]     = useState('');
  const [cardName, setCardName]   = useState('');
  const [bank, setBank]           = useState('');
  const [otp, setOtp]             = useState('');
  const [showOtp, setShowOtp]     = useState(false);
  const [error, setError]         = useState('');
  const [progress, setProgress]   = useState(0);

  const amount = (orderData.amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('select'); setUpiId(''); setCardNum(''); setCardExp('');
        setCardCvv(''); setCardName(''); setBank(''); setOtp('');
        setShowOtp(false); setError(''); setProgress(0); setUpiApp('');
      }, 400);
    }
  }, [isOpen]);

  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExp  = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const simulateProcessing = (willSucceed: boolean) => {
    setStep('processing');
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (willSucceed) {
            setStep('success');
            setTimeout(() => {
              const payId = `pay_DEMO${Date.now()}`;
              const sig   = `sig_DEMO${Math.random().toString(36).slice(2)}`;
              onSuccess(payId, sig);
            }, 1800);
          } else {
            setStep('failed');
          }
        }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 120);
  };

  const handleUpiPay = () => {
    if (!upiId && !upiApp) { setError('Please enter UPI ID or select an app'); return; }
    if (upiId && !upiId.includes('@')) { setError('Invalid UPI ID. Example: name@upi'); return; }
    setError('');
    setShowOtp(true);
  };

  const handleOtpVerify = () => {
    if (otp.length < 4) { setError('Enter valid OTP'); return; }
    setError('');
    simulateProcessing(true);
  };

  const handleCardPay = () => {
    const clean = cardNum.replace(/\s/g, '');
    if (clean.length < 16) { setError('Enter valid 16-digit card number'); return; }
    if (!cardExp || cardExp.length < 5) { setError('Enter valid expiry date'); return; }
    if (cardCvv.length < 3) { setError('Enter valid CVV'); return; }
    if (!cardName.trim()) { setError('Enter cardholder name'); return; }
    setError('');
    setShowOtp(true);
  };

  const handleNetBankingPay = () => {
    if (!bank) { setError('Please select your bank'); return; }
    setError('');
    simulateProcessing(true);
  };

  const handleWalletPay = () => simulateProcessing(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={step === 'select' || step === 'pay' ? onDismiss : undefined}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full sm:w-[420px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
          >

            {/* ── Processing screen ── */}
            {step === 'processing' && (
              <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="relative w-20 h-20 mb-6">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E8E4FF" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#3D35A8" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.15s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-sm text-gray-500 text-center">Please wait while we confirm your payment securely…</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-6 overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {/* ── Success screen ── */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-14 px-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15, stiffness: 300 }}>
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-5" />
                </motion.div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-sm text-gray-500 text-center mb-1">₹{amount} paid successfully</p>
                <p className="text-xs text-gray-400">Redirecting to your order…</p>
              </div>
            )}

            {/* ── Failed screen ── */}
            {step === 'failed' && (
              <div className="flex flex-col items-center justify-center py-14 px-8">
                <XCircle className="w-20 h-20 text-red-500 mb-5" />
                <h3 className="text-xl font-black text-gray-900 mb-2">Payment Failed</h3>
                <p className="text-sm text-gray-500 text-center mb-6">Your payment could not be processed. Please try again.</p>
                <button onClick={() => { setStep('select'); setShowOtp(false); setOtp(''); setError(''); }} className="btn-primary px-8 py-3">
                  Try Again
                </button>
              </div>
            )}

            {/* ── Main payment UI ── */}
            {(step === 'select' || step === 'pay') && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-lg font-black text-primary">MB</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{orderData.businessName || 'My Baby'}</p>
                      <p className="text-xs text-gray-400">{orderData.description || `Order ${orderData.orderNumber}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="font-black text-gray-900 text-base">₹{amount}</p>
                    </div>
                    <button onClick={onDismiss} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Left: Payment method list */}
                  <div className="w-36 border-r border-gray-100 flex flex-col shrink-0 bg-gray-50/50">
                    {PAYMENT_METHODS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setPayMode(m.id as PayMode); setStep('pay'); setShowOtp(false); setOtp(''); setError(''); }}
                        className={`flex flex-col items-center gap-1.5 px-3 py-4 text-center transition-all border-l-2 ${
                          payMode === m.id && step === 'pay'
                            ? 'bg-white border-l-primary text-primary'
                            : 'border-l-transparent text-gray-500 hover:bg-white hover:text-gray-800'
                        }`}
                      >
                        <m.icon className={`w-5 h-5 ${payMode === m.id && step === 'pay' ? 'text-primary' : 'text-gray-400'}`} />
                        <span className="text-[11px] font-semibold leading-tight">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Right: Payment form */}
                  <div className="flex-1 overflow-y-auto">
                    {step === 'select' && (
                      <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-center">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                          <Shield className="w-7 h-7 text-primary" />
                        </div>
                        <p className="font-semibold text-gray-800 mb-1">Secure Checkout</p>
                        <p className="text-xs text-gray-400">Select a payment method to continue</p>
                      </div>
                    )}

                    {/* UPI */}
                    {step === 'pay' && payMode === 'upi' && (
                      <div className="p-4 space-y-4">
                        {!showOtp ? (
                          <>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pay via UPI App</p>
                            <div className="grid grid-cols-4 gap-2">
                              {UPI_APPS.map(app => (
                                <button
                                  key={app.id}
                                  onClick={() => { setUpiApp(app.id); setUpiId(''); }}
                                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${
                                    upiApp === app.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <span className="text-xl">{app.icon}</span>
                                  <span className="text-[9px] font-semibold text-center text-gray-600 leading-tight">{app.name}</span>
                                </button>
                              ))}
                            </div>

                            <div className="relative flex items-center gap-3">
                              <div className="flex-1 h-px bg-gray-200" />
                              <span className="text-xs text-gray-400 font-medium">or enter UPI ID</span>
                              <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            <div>
                              <input
                                value={upiId}
                                onChange={e => { setUpiId(e.target.value); setUpiApp(''); setError(''); }}
                                placeholder="yourname@upi"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                              />
                              {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
                            </div>

                            <button onClick={handleUpiPay} className="w-full btn-primary py-3 text-sm font-bold">
                              Verify & Pay ₹{amount}
                            </button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                              <Smartphone className="w-4 h-4 text-green-600 shrink-0" />
                              <p className="text-xs text-green-700 font-medium">
                                OTP sent to registered mobile number. Enter below to confirm.
                              </p>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-600 mb-1.5">Enter OTP</label>
                              <input
                                value={otp}
                                onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                                placeholder="6-digit OTP"
                                maxLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-center tracking-[0.4em] font-bold focus:outline-none focus:border-primary transition-all"
                              />
                              {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
                              <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                                For demo, enter any 4+ digit number
                              </p>
                            </div>
                            <button onClick={handleOtpVerify} className="w-full btn-primary py-3 text-sm font-bold">
                              Confirm Payment ₹{amount}
                            </button>
                            <button onClick={() => { setShowOtp(false); setOtp(''); }} className="w-full text-xs text-gray-500 hover:text-primary transition-colors py-1">
                              ← Back
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card */}
                    {step === 'pay' && payMode === 'card' && (
                      <div className="p-4 space-y-3">
                        {!showOtp ? (
                          <>
                            {/* Card preview */}
                            <div className="relative h-32 bg-gradient-to-br from-primary to-accent rounded-2xl p-4 text-white overflow-hidden mb-2">
                              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -mr-8 -mt-8" />
                              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 -ml-6 -mb-6" />
                              <div className="relative">
                                <div className="flex justify-between items-start mb-3">
                                  <span className="text-xs font-semibold opacity-80">DEBIT / CREDIT</span>
                                  <span className="text-lg">💳</span>
                                </div>
                                <p className="font-mono text-sm tracking-widest mb-2">
                                  {cardNum || '•••• •••• •••• ••••'}
                                </p>
                                <div className="flex justify-between text-xs">
                                  <span className="opacity-80">{cardName || 'CARDHOLDER NAME'}</span>
                                  <span>{cardExp || 'MM/YY'}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Card Number</label>
                              <input value={cardNum} onChange={e => { setCardNum(formatCard(e.target.value)); setError(''); }}
                                placeholder="1234 5678 9012 3456" maxLength={19}
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-primary transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Expiry</label>
                                <input value={cardExp} onChange={e => { setCardExp(formatExp(e.target.value)); setError(''); }}
                                  placeholder="MM/YY" maxLength={5}
                                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">CVV</label>
                                <input value={cardCvv} onChange={e => { setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                                  placeholder="•••" maxLength={4} type="password"
                                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Name on Card</label>
                              <input value={cardName} onChange={e => { setCardName(e.target.value.toUpperCase()); setError(''); }}
                                placeholder="JOHN DOE"
                                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all" />
                            </div>
                            {error && <p className="text-red-500 text-xs">{error}</p>}
                            <button onClick={handleCardPay} className="w-full btn-primary py-3 text-sm font-bold">
                              Pay ₹{amount} Securely
                            </button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                              <p className="text-xs text-blue-700 font-semibold mb-0.5">3D Secure Authentication</p>
                              <p className="text-xs text-blue-600">Enter OTP sent to your bank registered mobile</p>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-600 mb-1.5">Enter OTP</label>
                              <input value={otp} onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                                placeholder="6-digit OTP" maxLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-center tracking-[0.4em] font-bold focus:outline-none focus:border-primary" />
                              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                              <p className="text-[10px] text-gray-400 mt-1.5 text-center">For demo, enter any 4+ digit number</p>
                            </div>
                            <button onClick={handleOtpVerify} className="w-full btn-primary py-3 text-sm font-bold">
                              Authenticate & Pay ₹{amount}
                            </button>
                            <button onClick={() => { setShowOtp(false); setOtp(''); }} className="w-full text-xs text-gray-500 hover:text-primary py-1">← Back</button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Net Banking */}
                    {step === 'pay' && payMode === 'netbanking' && (
                      <div className="p-4 space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Your Bank</p>
                        <div className="space-y-2">
                          {BANKS.map(b => (
                            <button key={b} onClick={() => { setBank(b); setError(''); }}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                                bank === b ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Building2 className="w-4 h-4 shrink-0" />
                                {b}
                              </div>
                              {bank === b && <ChevronRight className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        <button onClick={handleNetBankingPay} className="w-full btn-primary py-3 text-sm font-bold">
                          Proceed to Bank
                        </button>
                      </div>
                    )}

                    {/* Wallet */}
                    {step === 'pay' && payMode === 'wallet' && (
                      <div className="p-4 space-y-3">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Wallet</p>
                        {[
                          { name: 'Paytm', emoji: '💙', bal: '₹1,250' },
                          { name: 'Amazon Pay', emoji: '🟠', bal: '₹350' },
                          { name: 'Mobikwik', emoji: '🔵', bal: '₹0' },
                          { name: 'FreeCharge', emoji: '🟢', bal: '₹0' },
                        ].map(w => (
                          <button key={w.name} onClick={handleWalletPay}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{w.emoji}</span>
                              <div className="text-left">
                                <p className="text-sm font-semibold text-gray-800">{w.name}</p>
                                <p className="text-xs text-gray-400">Balance: {w.bal}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 py-3 border-t border-gray-100 shrink-0">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <p className="text-[10px] text-gray-400">Secured by <span className="font-bold text-gray-600">Razorpay</span> · 256-bit SSL encryption</p>
                  <img src="https://razorpay.com/favicon.ico" alt="Razorpay" className="w-3.5 h-3.5 rounded-sm" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
