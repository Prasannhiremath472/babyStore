import { useState } from 'react';
import { Save, Settings, Mail, CreditCard, Globe, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'general',  label: 'General',      icon: Settings    },
  { id: 'payment',  label: 'Payment',      icon: CreditCard  },
  { id: 'email',    label: 'Email / SMTP', icon: Mail        },
  { id: 'seo',      label: 'SEO',          icon: Globe       },
  { id: 'security', label: 'Security',     icon: Shield      },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [generalForm, setGeneralForm] = useState({
    site_name: 'LittleNest', site_tagline: 'Premium Baby & Kids Products',
    support_email: 'support@littlenest.in', support_phone: '+91-1800-123-4567',
    free_shipping_threshold: 499, return_window_days: 7, tax_rate: 18, currency: 'INR',
  });

  return (
    <div>
      <div className="section-header">
        <div><h1 className="section-title">Settings</h1><p className="section-subtitle">Platform configuration</p></div>
        <button onClick={() => toast.success('Settings saved!')} className="btn-admin-primary"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="flex gap-6">
        <div className="w-52 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                <tab.icon className="w-4 h-4 shrink-0" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          {activeTab === 'general' && (
            <div>
              <h3 className="font-semibold text-lg mb-5">General Settings</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { key: 'site_name',               label: 'Site Name',              type: 'text'   },
                  { key: 'site_tagline',             label: 'Tagline',                type: 'text'   },
                  { key: 'support_email',            label: 'Support Email',          type: 'email'  },
                  { key: 'support_phone',            label: 'Support Phone',          type: 'text'   },
                  { key: 'free_shipping_threshold',  label: 'Free Shipping Above (₹)', type: 'number' },
                  { key: 'return_window_days',       label: 'Return Window (days)',   type: 'number' },
                  { key: 'tax_rate',                 label: 'Tax Rate (%)',           type: 'number' },
                  { key: 'currency',                 label: 'Currency Code',          type: 'text'   },
                ].map(f => (
                  <div key={f.key}>
                    <label className="admin-label">{f.label}</label>
                    <input type={f.type} value={(generalForm as any)[f.key]} onChange={e => setGeneralForm(g => ({ ...g, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} className="admin-input" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div>
              <h3 className="font-semibold text-lg mb-5">Payment Configuration</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="admin-label">Razorpay Key ID</label><input type="text" placeholder="rzp_live_xxxx" className="admin-input" /></div>
                <div><label className="admin-label">Razorpay Key Secret</label><input type="password" placeholder="••••••••" className="admin-input" /></div>
                <div><label className="admin-label">Webhook Secret</label><input type="password" placeholder="••••••••" className="admin-input" /></div>
                <div><label className="admin-label">COD Enabled</label><select className="admin-input"><option>Yes</option><option>No</option></select></div>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">⚠️ Store secrets securely in environment variables, never in code.</div>
            </div>
          )}

          {activeTab === 'email' && (
            <div>
              <h3 className="font-semibold text-lg mb-5">Email / SMTP</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {[{ label:'SMTP Host', ph:'smtp.gmail.com' }, { label:'SMTP Port', ph:'587' }, { label:'SMTP User', ph:'noreply@littlenest.in' }, { label:'SMTP Password', ph:'••••••••', type:'password' }, { label:'From Name', ph:'LittleNest' }, { label:'From Email', ph:'noreply@littlenest.in' }].map(f => (
                  <div key={f.label}><label className="admin-label">{f.label}</label><input type={f.type || 'text'} placeholder={f.ph} className="admin-input" /></div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div>
              <h3 className="font-semibold text-lg mb-5">SEO Settings</h3>
              <div className="space-y-4">
                <div><label className="admin-label">Default Meta Title</label><input type="text" defaultValue="LittleNest - Premium Baby & Kids" className="admin-input" /></div>
                <div><label className="admin-label">Default Meta Description</label><textarea rows={3} className="admin-input resize-none" /></div>
                <div><label className="admin-label">Google Analytics ID</label><input type="text" placeholder="G-XXXXXXXXXX" className="admin-input" /></div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="font-semibold text-lg mb-5">Security</h3>
              <div className="space-y-4">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts' },
                  { label: 'IP Whitelist', desc: 'Restrict admin access by IP address' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div><h4 className="font-semibold text-sm">{s.label}</h4><p className="text-xs text-slate-500">{s.desc}</p></div>
                    <input type="checkbox" className="w-5 h-5 accent-indigo-600 rounded" />
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div><h4 className="font-semibold text-sm">Session Timeout</h4><p className="text-xs text-slate-500">Auto logout after inactivity</p></div>
                  <select className="admin-input w-32"><option>30 min</option><option>1 hour</option><option>4 hours</option></select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
