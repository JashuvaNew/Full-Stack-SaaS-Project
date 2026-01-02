import { createCheckoutSession } from '../api/stripe';
import { useAuth } from '../auth/AuthContext';

function UpgradeButton() {
  const { user } = useAuth();

  // PRO users should NOT see upgrade button
  if (!user || user.role !== 'FREE') return null;

  const handleUpgrade = async () => {
    try {
      const checkoutUrl = await createCheckoutSession('PRO');
      window.location.href = checkoutUrl; // redirect to Stripe
    } catch (err) {
      alert('Failed to start checkout');
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      style={{
        padding: '0.7rem 1.2rem',
        background: '#2563eb',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      🚀 Upgrade to PRO
    </button>
  );
}

export default UpgradeButton;
