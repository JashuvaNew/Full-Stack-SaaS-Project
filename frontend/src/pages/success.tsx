import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Success() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const upgrade = async () => {
      await refreshUser(); // 🔥 THIS updates role
     setTimeout(() => navigate('/'), 2000);
    };

  upgrade()
  }, [navigate, refreshUser]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>✅ Payment Successful</h2>
      <p>Your account has been upgraded to PRO 🚀</p>
    </div>
  );
}

export default Success;
