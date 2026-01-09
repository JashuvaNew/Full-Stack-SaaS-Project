import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './header.css';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="header">
      {/* LOGO */}
      <Link to="/" className="logo">
        Talk-With-AI
      </Link>

      {/* NAV */}
      <nav className="nav">
        {!isAuthenticated ? (
          <>
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="btn primary">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>

            <span
              className={`role-badge ${
                user?.role === 'PRO' ? 'pro' : 'free'
              }`}
            >
              {user?.role === 'PRO' ? '🚀 PRO' : '🆓 FREE'}
            </span>

            <button className="btn outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
