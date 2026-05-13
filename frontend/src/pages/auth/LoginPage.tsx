import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginThunk } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(s => s.auth);
  const redirect = searchParams.get('redirect') || '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      toast.success('Welcome back!');
      navigate(redirect);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground">Welcome back!</h2>
        <p className="text-muted-foreground mt-2">Sign in to your LittleNest account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="input-base pl-12"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold">Password</label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="input-base pl-12 pr-12"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 text-base justify-center">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Sign In'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-muted-foreground">Demo Credentials</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1.5">
          <div className="flex justify-between"><span className="text-muted-foreground">Admin:</span> <code className="text-xs">admin@littlenest.in / Admin@123</code></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Customer:</span> <code className="text-xs">demo@littlenest.in / Customer@123</code></div>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">Create one free</Link>
      </p>
    </div>
  );
}
