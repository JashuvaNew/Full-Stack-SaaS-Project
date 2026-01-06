import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
   const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
    
<button style={{ marginRight: 8 , padding: '8px 16px',  color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
           <Link style={{color:'Black', fontWeight:'bold', fontSize:'20px'}} to="/">Talk-With-AI</Link>{' '}
          </button>
      <nav style={{ float: 'right' }}>
        {!isAuthenticated ? (
          <>
          <button style={{ marginRight: 8 , padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
           <Link style={{color:'white'}} to="/pricing">Pricing</Link>{' '}
          </button>
           <button style={{ marginRight: 8 , padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
           <Link style={{color:'white'}}  to="/login">Login</Link>{' '}
          </button>
           <button style={{ marginRight: 8 , padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
           <Link style={{color:'white'}}  to="/register">Register</Link>{' '}
          </button>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>{' '}
            <span style={{ marginRight: 8 }}>
              {user?.role === 'PRO' ? '🚀 PRO' : '🆓 FREE'}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
