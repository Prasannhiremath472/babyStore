import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store';
import { User, Mail, Phone, Save } from 'lucide-react';
import apiClient from '../../services/api/client';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAppSelector(s => s.auth);
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.put('/users/profile', form);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update'); } finally { setIsLoading(false); }
  };

  return (
    <>
      <Helmet><title>Profile Settings - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-lg">
          <h1 className="text-2xl font-display font-bold mb-6">Profile Settings</h1>
          <div className="bg-white rounded-2xl p-6 shadow-card">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              {user?.firstName[0]}{user?.lastName[0]}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">First Name</label>
                  <input value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Last Name</label>
                  <input value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} className="input-base" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input value={user?.email} disabled className="input-base opacity-60 cursor-not-allowed" />
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 justify-center">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
