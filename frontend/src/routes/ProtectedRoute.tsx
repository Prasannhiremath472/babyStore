import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAppSelector(s => s.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <Outlet />;
}
