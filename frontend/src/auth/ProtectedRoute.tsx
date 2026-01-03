import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { JSX } from 'react';

type Props = {
  children: JSX.Element;
  requiredRole?: 'FREE' | 'PRO' | 'PRO_PLUS';
};

function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, loading } = useAuth();

  // 1️⃣ Wait until auth is resolved
  if (loading) {
    return <p>Loading...</p>;
  }

  // 2️⃣ Not logged in → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Role mismatch → upgrade
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/upgrade" replace />;
  }

  // 4️⃣ Allowed
  return children;
}

export default ProtectedRoute;
