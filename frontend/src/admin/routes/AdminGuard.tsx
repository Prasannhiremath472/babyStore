import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT'];

export default function AdminGuard() {
  const { isAuthenticated, user } = useAppSelector(s => s.adminAuth);
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (user && !ADMIN_ROLES.includes(user.role)) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
