import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminTopbar from '../components/layout/AdminTopbar';

export default function AdminLayout() {
  const { sidebarCollapsed } = useAppSelector(s => s.adminUi);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 64 : 260 }}
      >
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-auto" style={{ marginTop: 60 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
