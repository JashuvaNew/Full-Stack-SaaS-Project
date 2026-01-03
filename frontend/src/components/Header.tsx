import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import UpgradeButton from './upgradeButton';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#e7eff8ff',
      }}
    >
      {/* Left */}
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        SaaS App
      </Link>

      {/* Right */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!user && (
          <>
          <button style={{backgroundColor:'blue',color:'black',padding:'8px', border:'0px', borderRadius:'6px'}}>
            <Link to="/login" style={{color:'white'}}>Login</Link>
          </button>
          <button style={{backgroundColor:'blue',color:'black',padding:'8px', border:'0px', borderRadius:'6px'}}>
            <Link to="/register" style={{color:'white'}}>Register</Link>
          </button>
          <button style={{backgroundColor:'blue',color:'black',padding:'8px', border:'0px', borderRadius:'6px'}}>
            <Link to="/pricing" style={{color:'white'}}>Pricing</Link>
          </button>
           
          </>
        )}

        {user && (
          <>
            {/* Role badge */}
            <span
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                background: user.role === 'PRO' ? '#22c55e' : '#e5e7eb',
                color: user.role === 'PRO' ? '#fff' : '#000',
              }}
            >
              {user.role}
            </span>

            {/* Upgrade button only for FREE */}
            {user.role === 'FREE' && <UpgradeButton />}

            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
