import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../../services/api/auth.api';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.resetPassword({ token, password });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2">Reset Password</h2>
      <p className="text-muted-foreground mb-8">Enter your new password below.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5">New Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 chars, uppercase & number" required className="input-base pl-12 pr-12" />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 justify-center">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Reset Password'}
        </button>
      </form>
      <p className="text-center text-sm mt-6"><Link to="/login" className="text-primary font-semibold">← Back to Sign In</Link></p>
    </div>
  );
}
