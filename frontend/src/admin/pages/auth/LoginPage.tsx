import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { loginAdmin } from '../../../store/slices/adminAuthSlice';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(s => s.adminAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      const user = result.payload.user;
      const allowed = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT'];
      if (!allowed.includes(user.role)) {
        toast.error('Access denied. Admin credentials required.');
        return;
      }
      toast.success(`Welcome, ${user.firstName}!`);
      navigate('/admin/dashboard');
    } else {
      toast.error((result.payload as string) || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4">🐣</div>
          <h1 className="text-2xl font-bold text-white">LittleNest Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Enterprise Management Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@littlenest.in" required
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password" required
                className="w-full pl-9 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
            {isLoading
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <><Shield className="w-4 h-4" /> Sign In to Admin Panel</>
            }
          </button>
        </form>

        <div className="mt-6 bg-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
          <p className="font-semibold text-slate-300 mb-2">Demo Credentials:</p>
          <div className="flex justify-between"><span>Super Admin:</span><code className="text-indigo-400">superadmin@littlenest.in</code></div>
          <div className="flex justify-between"><span>Password:</span><code className="text-indigo-400">SuperAdmin@123</code></div>
          <div className="flex justify-between mt-1"><span>Admin:</span><code className="text-indigo-400">admin@littlenest.in / Admin@123</code></div>
        </div>
      </motion.div>
    </div>
  );
}
