import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { JSX } from 'react';

interface Props {
  children: JSX.Element;
  requiredRole?: 'FREE' | 'PRO' | 'PRO_PLUS';
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: Props) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/upgrade" replace />;
  }

  return children;
}
