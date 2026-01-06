import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { askAI } from '../api/ai';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await askAI(prompt);
      setAnswer(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>

      {/* USER INFO */}
      <div style={{ marginBottom: 16 }}>
        <p><strong>Role:</strong> {user?.role}</p>
        {user?.role === 'PRO' && <span>🚀 PRO Member</span>}
      </div>

      <hr />

      {/* AI SECTION */}
      <h3>AI Assistant</h3>

      {user?.role === 'FREE' ? (
        <>
          <p>Upgrade to PRO to unlock AI features.</p>
          <button onClick={() => navigate('/pricing')}>
            Upgrade to PRO
          </button>
        </>
      ) : (
        <>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
            placeholder="Ask AI something..."
          />

          <button onClick={submit} disabled={loading || !prompt}>
            Ask AI
          </button>

          {answer && (
            <pre style={{ marginTop: 12 }}>{answer}</pre>
          )}

          <button
            style={{ marginTop: 12 }}
            onClick={() => navigate('/ai')}
          >
            Open Full AI →
          </button>
        </>
      )}
    </div>
  );
}
