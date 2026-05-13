import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { registerThunk } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(s => s.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerThunk(form));
    if (registerThunk.fulfilled.match(result)) {
      toast.success('Account created! Please verify your email.');
      navigate('/login');
    } else {
      toast.error((result.payload as string) || 'Registration failed');
    }
  };

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold">Create Account</h2>
        <p className="text-muted-foreground mt-2">Join the LittleNest family today</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'firstName', label: 'First Name', placeholder: 'Priya', icon: User },
            { key: 'lastName', label: 'Last Name', placeholder: 'Sharma', icon: User },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-semibold mb-1.5">{f.label}</label>
              <div className="relative">
                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={form[f.key as keyof typeof form]} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} required className="input-base pl-10 text-sm" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" required className="input-base pl-12" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Phone (Optional)</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="9876543210" className="input-base pl-12" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min 8 chars, uppercase & number" required className="input-base pl-12 pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 text-base justify-center mt-2">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
