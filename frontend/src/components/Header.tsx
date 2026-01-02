import { useAuth } from '../auth/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header
      style={{
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#111',
        color: '#fff',
      }}
    >
      <h3>SaaS App</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span
          style={{
            padding: '0.3rem 0.6rem',
            borderRadius: '12px',
            background:
              user.role === 'PRO' ? '#16a34a' : '#475569',
            fontSize: '12px',
          }}
        >
          {user.role}
        </span>

        <button
          onClick={logout}
          style={{
            padding: '0.4rem 0.8rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
