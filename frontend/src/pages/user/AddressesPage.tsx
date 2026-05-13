import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import apiClient from '../../services/api/client';
import toast from 'react-hot-toast';

export default function AddressesPage() {
  const qc = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ label: 'Home', firstName: '', lastName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '', isDefault: false });

  const { data } = useQuery({ queryKey: ['addresses'], queryFn: () => apiClient.get('/users/addresses') });
  const addresses = data?.data?.data || [];

  const addMutation = useMutation({
    mutationFn: (d: any) => apiClient.post('/users/addresses', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); setIsAdding(false); toast.success('Address added'); },
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/users/addresses/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['addresses'] }); toast.success('Address deleted'); },
  });

  return (
    <>
      <Helmet><title>Addresses - LittleNest</title></Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold">Saved Addresses</h1>
            <button onClick={() => setIsAdding(true)} className="btn-primary py-2 px-4 text-sm gap-1.5">
              <Plus className="w-4 h-4" /> Add Address
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((addr: any) => (
              <div key={addr.id} className="bg-white rounded-2xl p-5 shadow-card relative">
                {addr.isDefault && <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{addr.firstName} {addr.lastName}</p>
                    <p className="text-sm text-muted-foreground">{addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-sm text-muted-foreground">{addr.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Edit2 className="w-3 h-3" /> Edit</button>
                  <button onClick={() => delMutation.mutate(addr.id)} className="flex items-center gap-1 text-xs text-red-500 hover:underline ml-2"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
          {isAdding && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                <h3 className="font-bold text-lg mb-4">Add New Address</h3>
                <div className="space-y-3">
                  {[
                    { key: 'firstName', label: 'First Name', type: 'text' },
                    { key: 'lastName', label: 'Last Name', type: 'text' },
                    { key: 'phone', label: 'Phone', type: 'tel' },
                    { key: 'addressLine1', label: 'Address', type: 'text' },
                    { key: 'city', label: 'City', type: 'text' },
                    { key: 'state', label: 'State', type: 'text' },
                    { key: 'pincode', label: 'Pincode', type: 'text' },
                  ].map(f => (
                    <input key={f.key} type={f.type} placeholder={f.label} value={(form as any)[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} className="input-base" />
                  ))}
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setIsAdding(false)} className="flex-1 btn-secondary py-3 justify-center">Cancel</button>
                  <button onClick={() => addMutation.mutate(form)} className="flex-1 btn-primary py-3 justify-center">Save Address</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
