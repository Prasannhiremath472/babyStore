import { Bell, Search, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { adminLogout } from '../../../store/slices/adminAuthSlice';
import { setAdminTheme } from '../../../store/slices/adminUiSlice';
import { adminApiClient } from '../../../services/api/adminClient';
import toast from 'react-hot-toast';

export default function AdminTopbar() {
  const { user } = useAppSelector(s => s.adminAuth);
  const { theme, sidebarCollapsed } = useAppSelector(s => s.adminUi);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    try { await adminApiClient.post('/auth/logout'); } catch {}
    dispatch(adminLogout());
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <header
      className="fixed top-0 right-0 z-40 bg-white border-b border-slate-200 flex items-center px-6 gap-4"
      style={{ left: sidebarCollapsed ? 64 : 260, height: 60, transition: 'left 0.25s ease-in-out' }}
    >
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search orders, products..."
          className="admin-input pl-9 py-1.5 text-sm bg-slate-50"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => dispatch(setAdminTheme(theme === 'light' ? 'dark' : 'light'))}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="relative group">
          <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-100">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {user?.firstName[0]}{user?.lastName[0]}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-slate-800">{user?.firstName}</div>
              <div className="text-xs text-slate-500">{user?.role}</div>
            </div>
          </button>
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1.5 z-50">
            <Link to="/admin/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 w-full"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
