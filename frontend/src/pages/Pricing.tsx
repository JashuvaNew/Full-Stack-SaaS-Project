import UpgradeButton from '../components/upgradeButton';
import { useAuth } from '../auth/AuthContext';

function Pricing() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>Pricing</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        {/* FREE PLAN */}
        <div style={{ border: '1px solid #ddd', padding: '2rem', width: '250px' }}>
          <h2>FREE</h2>
          <p>$0 / month</p>
          <ul>
            <li>Basic access</li>
            <li>Limited usage</li>
          </ul>
        </div>

        {/* PRO PLAN */}
        <div
          style={{
            border: '2px solid #2563eb',
            padding: '2rem',
            width: '250px',
          }}
        >
          <h2>PRO 🚀</h2>
          <p>$10 / month</p>
          <ul>
            <li>Unlimited usage</li>
            <li>PRO features</li>
            <li>Priority access</li>
          </ul>

          {/* CTA */}
          {user?.role === 'FREE' && <UpgradeButton />}
          {!user && <p>Login to upgrade</p>}
          {user?.role === 'PRO' && <p>✅ You are PRO</p>}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
