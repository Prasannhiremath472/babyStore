import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { authApi } from '../../services/api/auth.api';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) return (
    <div className="text-center">
      <span className="text-6xl block mb-4">📧</span>
      <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
      <p className="text-muted-foreground mb-6">If an account exists for {email}, you'll receive reset instructions shortly.</p>
      <Link to="/login" className="btn-primary">Back to Sign In</Link>
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2">Forgot Password?</h2>
      <p className="text-muted-foreground mb-8">Enter your email and we'll send reset instructions.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required className="input-base pl-12" />
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 justify-center">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Reset Link'}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link to="/login" className="text-primary font-semibold hover:underline">← Back to Sign In</Link>
      </p>
    </div>
  );
}
