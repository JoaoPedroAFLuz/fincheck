import { useAuth } from '@/app/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { loggedIn } = useAuth();

  if (!loggedIn && isPrivate) {
    return <Navigate to={'/login'} replace />;
  }

  if (loggedIn && !isPrivate) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
}

