import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // optional auto redirect after a few seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>✅ Payment Successful</h2>
      <p>Your account is being upgraded to PRO.</p>
      <p>Please refresh or re-login if access doesn’t update immediately.</p>
    </div>
  );
}

export default Success;
